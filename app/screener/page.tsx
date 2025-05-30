"use client";

import { useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UploadForm } from "@/components/upload-form";
import type { UploadedFile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, Trash, Upload } from "lucide-react";
import { toast } from "sonner";
import { analyzeMatch, validateResume } from "../ai-screener";
import { ResumeClassification } from "../ai-screener/schema";
import { ResultCard } from "@/components/result-card";
import { CSVLink } from "react-csv";
import { ResultCardSkeleton } from "@/components/result-card-skeleton";

export default function ScreenerPage() {
  const [isPending, startTransition] = useTransition();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [results, setResults] = useState<ResumeClassification[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpload = (files: UploadedFile[]) => {
    setUploadedFiles(files);
  };

  const handleAnalyzeMatch = () => {
    if (uploadedFiles.length === 0) {
      console.log("No files uploaded");
      return;
    }
    if (jobDescription.length === 0) {
      console.log("No job description provided");
      return;
    }

    setIsValidating(true);
    startTransition(async () => {
      toast.info("Validating resumes...");
      const validatedResumes = await validateResume(uploadedFiles);
      if (validatedResumes.length === 0) {
        toast.error("No valid resumes found");
        setError("No valid resumes found");
        return;
      }
      setIsValidating(false);

      setIsAnalyzing(true);
      toast.info("Analyzing resumes...");
      const results = await analyzeMatch(jobDescription, validatedResumes);
      setResults(results);

      toast.success("Analysis complete");
      setIsAnalyzing(false);
    });
  };

  const handleClear = () => {
    setUploadedFiles([]);
    setResults([]);
    setJobDescription("");
  };

  // sort the results by status "accepted" should be at top, and the highest confidence should be at the top
  const sortedResults = results.sort((a, b) => {
    if (a.status === "accepted" && b.status === "rejected") return -1;
    if (a.status === "rejected" && b.status === "accepted") return 1;
    return b.confidence - a.confidence;
  });

  const csvFormat = results.map((result) => ({
    name: result.candidate.fullName,
    email: result.candidate.email,
    phone: result.candidate.phone,
    status: result.status,
    reason: result.reason,
  }));

  return (
    <>
      <div className="col-span-1 space-y-6 self-start rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            SmartCV Screener
          </h1>
          <p className="text-sm text-slate-500">
            Upload a resume and a job description to see how AI will screen
            candidates for you.
          </p>
        </div>

        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 transition-all hover:bg-slate-100">
          {uploadedFiles.length === 0 ? (
            <UploadForm onUpload={handleUpload} />
          ) : (
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <FileText className="h-5 w-5 text-emerald-500" />
              <span>
                {uploadedFiles.length} file{uploadedFiles.length > 1 ? "s" : ""}{" "}
                extracted successfully
              </span>
            </div>
          )}
        </div>

        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-medium text-slate-800">
              Job Description & Qualifications
            </h2>
            <Textarea
              placeholder="Enter a job description and qualifications"
              className="max-h-[120px] min-h-[120px] resize-none border-slate-200 focus:border-slate-400 focus:ring-slate-400 lg:max-h-[414px] lg:min-h-[414px]"
              disabled={isPending}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={jobDescription.length === 0 || isPending}
              onClick={handleAnalyzeMatch}
            >
              Analyze Match
              <Upload className="ml-2 h-4 w-4" />
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleClear}
              disabled={isPending}
            >
              <Trash className="h-4 w-4" />
              Clear All
            </Button>
          </div>
        )}
      </div>

      <div className="col-span-1 space-y-5 lg:col-span-8">
        {results.length > 0 && (
          <div className="flex items-center justify-between">
            <Button asChild>
              <CSVLink
                data={csvFormat}
                filename="smartcv-results.csv"
                target="_blank"
              >
                Print Accepted Candidates
              </CSVLink>
            </Button>
          </div>
        )}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {isValidating && (
            <div className="mb-3 flex items-center justify-center gap-2">
              <p className="animate-pulse text-sm text-slate-500">
                Validating resumes...
              </p>
              <Loader2 className="h-10 w-10 animate-spin" />
            </div>
          )}
          {isAnalyzing && (
            <div className="mb-3 flex items-center justify-center gap-2">
              <p className="animate-pulse text-sm text-slate-500">
                Analyzing resumes...
              </p>
              <Loader2 className="h-10 w-10 animate-spin" />
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {isPending ? (
              Array.from({ length: uploadedFiles.length }).map((_, index) => (
                <ResultCardSkeleton key={index} />
              ))
            ) : results.length > 0 ? (
              sortedResults.map((result, index) => (
                <ResultCard key={index} result={result} />
              ))
            ) : (
              <div className="col-span-full text-center">
                {error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <>
                    <h2 className="text-xl font-medium text-slate-700">
                      Results
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      Upload files and a job description to see the analysis
                      results here
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
