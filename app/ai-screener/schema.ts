import { z } from "zod";

export const ResumeClassificationSchema = z.object({
  fileName: z.string().describe("The name of the file uploaded."),
  status: z
    .enum(["accepted", "rejected"])
    .describe(
      "Indicates whether the candidate is accepted or rejected based on the resume and job description.",
    ),

  reason: z
    .string()
    .describe(
      "A short, factual explanation for why the candidate was accepted or rejected. Only use information found in the resume.",
    ),

  candidate: z.object({
    fullName: z
      .string()
      .describe(
        'The candidate’s full name as written in the resume. If not found, write "Not provided".',
      ),

    email: z
      .string()
      .describe(
        'The candidate’s email address. If not found, write "Not provided".',
      ),

    phone: z
      .string()
      .describe(
        'The candidate’s phone number. If not found, write "Not provided".',
      ),

    currentTitle: z
      .string()
      .describe(
        'The candidate’s current or most recent job title. If not found, write "Not provided".',
      ),

    yearsOfExperience: z
      .number()
      .describe(
        "Estimated total years of relevant work experience based only on dates in the resume. If unknown, use 0.",
      ),

    education: z
      .string()
      .describe(
        'Candidate’s highest degree or relevant education detail (e.g., "B.Sc. in Computer Science"). If not provided, write "Not provided".',
      ),

    skills: z
      .array(z.string())
      .describe(
        "List of relevant technical or professional skills mentioned in the resume.",
      ),

    summary: z
      .string()
      .describe(
        "A brief 1–2 line summary describing the candidate’s professional profile. Use only data from the resume.",
      ),

    linkedin: z
      .string()
      .describe(
        'LinkedIn profile URL from the resume. If not found, write "Not provided".',
      ),

    github: z
      .string()
      .describe(
        'GitHub profile URL from the resume. If not found, write "Not provided".',
      ),

    website: z
      .string()
      .describe(
        'The candidate’s website URL from the resume. If not found, write "Not provided".',
      ),

    location: z
      .string()
      .describe(
        'The candidate’s location or city as stated in the resume. If not found, write "Not provided".',
      ),

    projects: z
      .array(
        z.object({
          title: z
            .string()
            .describe(
              'Project title as mentioned in the resume. If missing, write "Not provided".',
            ),

          summary: z
            .string()
            .describe(
              "Brief 1–2 line explanation of the project and its purpose. Use only data from the resume.",
            ),

          technologies: z
            .array(z.string())
            .describe(
              "Technologies used in the project, as listed or implied in the resume.",
            ),
        }),
      )
      .describe(
        "List of candidate’s past personal or professional projects based only on resume data.",
      ),

    workExperience: z
      .array(
        z.object({
          jobTitle: z
            .string()
            .describe(
              'The job title the candidate held at the company. If missing, write "Not provided".',
            ),

          company: z
            .string()
            .describe(
              'The name of the company where the candidate worked. If missing, write "Not provided".',
            ),

          summary: z
            .string()
            .describe(
              "A brief summary of the candidate’s responsibilities or achievements in this role. Use only text found in the resume.",
            ),
        }),
      )
      .describe(
        "Work history based on the resume. Each entry should reflect one job position.",
      ),
  }),
});

export type ResumeClassification = z.infer<typeof ResumeClassificationSchema>;
