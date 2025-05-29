"use server";

import { UploadedFile } from "@/lib/types";
import { mistral } from "@ai-sdk/mistral";
import { ResumeClassificationSchema } from "./schema";
import { SYSTEM_PROMPT } from "./prompt";
import { generateObject } from "ai";

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

  console.log(object);

  return object;
}
