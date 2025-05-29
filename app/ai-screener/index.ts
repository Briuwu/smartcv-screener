"use server";

import { UploadedFile } from "@/lib/types";
import { mistral } from "@ai-sdk/mistral";
import { ResumeClassificationSchema } from "./schema";
import { SYSTEM_PROMPT, VALIDATE_RESUME_PROMPT } from "./prompt";
import { generateObject } from "ai";
import { z } from "zod";

export async function analyzeMatch(
  jobDescription: string,
  uploadedFiles: UploadedFile[],
) {
  const result = await Promise.all(
    uploadedFiles.map(async (file) => {
      const { object } = await generateObject({
        model: mistral("mistral-large-latest"),
        schema: ResumeClassificationSchema,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: `Job Description: ${jobDescription}\n\nResumes: ${JSON.stringify(file)}`,
          },
        ],
      });

      const parsedObject = ResumeClassificationSchema.safeParse(object);

      if (!parsedObject.success) {
        return null;
      }

      return parsedObject.data;
    }),
  );

  return result.filter((resume) => resume !== null);
}

export async function validateResume(resume: UploadedFile[]) {
  const validatedResumes = await Promise.all(
    resume.map(async (file) => {
      const { object } = await generateObject({
        model: mistral("mistral-large-latest"),
        schema: z.object({
          status: z.enum(["valid", "invalid"]),
        }),
        messages: [
          {
            role: "system",
            content: VALIDATE_RESUME_PROMPT,
          },
          {
            role: "user",
            content: file.fileContent,
          },
        ],
      });

      if (object.status === "valid") {
        return file;
      } else {
        return null;
      }
    }),
  );

  return validatedResumes.filter((resume) => resume !== null);
}
