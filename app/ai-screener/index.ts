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
  const { object } = await generateObject({
    model: mistral("mistral-large-latest"),
    output: "array",
    schema: ResumeClassificationSchema,
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: `Job Description: ${jobDescription}\n\nResumes: ${JSON.stringify(
          uploadedFiles,
        )}`,
      },
    ],
    maxRetries: 10,
  });

  return object;
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
