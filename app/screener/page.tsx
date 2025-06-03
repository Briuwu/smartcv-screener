"use client";

import { useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { UploadForm } from "@/components/upload-form";
import type { UploadedFile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Loader2,
  Trash,
  Upload,
  Download,
  Sparkles,
} from "lucide-react";
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

  const acceptedCount = results.filter((r) => r.status === "accepted").length;
  const rejectedCount = results.filter((r) => r.status === "rejected").length;

  return (
    <>
      {/* Left Panel - Input Section */}
      <div className="col-span-1 space-y-8 self-start lg:col-span-4">
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-slate-300/60 hover:shadow-md">
          {/* Header with subtle gradient accent */}
          <div className="relative mb-8 space-y-3">
            <div className="absolute -top-4 -left-4 h-20 w-20 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 opacity-20 blur-xl"></div>
            <div className="relative">
              <div className="mb-2 flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 shadow-sm">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                  SmartCV Screener
                </h1>
              </div>
              <p className="leading-relaxed text-slate-600">
                Upload resumes and provide a job description to get AI-powered
                candidate screening with detailed analysis.
              </p>
            </div>
          </div>

          {/* Upload Section */}
          <div className="mb-8">
            <div className="border-slate-250 rounded-xl border border-dashed bg-gradient-to-br from-slate-50/50 to-white/50 p-6 transition-all duration-200 hover:border-slate-300 hover:from-slate-50 hover:to-white">
              {uploadedFiles.length === 0 ? (
                <UploadForm onUpload={handleUpload} />
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                    <FileText className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">
                      {uploadedFiles.length} file
                      {uploadedFiles.length > 1 ? "s" : ""} uploaded
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Ready for analysis
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Job Description Section */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-5">
              <div>
                <h2 className="mb-3 text-lg font-medium text-slate-800">
                  Job Description & Requirements
                </h2>
                <Textarea
                  placeholder="Paste the job description here, including required skills, experience, and qualifications..."
                  className="max-h-[400px] min-h-[140px] resize-none border-slate-200/80 bg-white/50 text-slate-700 backdrop-blur-sm transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
                  disabled={isPending}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  className="h-12 w-full bg-gradient-to-r from-emerald-600 to-emerald-700 font-medium text-white shadow-sm transition-all duration-200 hover:from-emerald-700 hover:to-emerald-800 hover:shadow-md disabled:opacity-50"
                  disabled={jobDescription.length === 0 || isPending}
                  onClick={handleAnalyzeMatch}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Analyze Candidates
                      <Upload className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  className="h-10 w-full border-slate-200 text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-slate-700"
                  onClick={handleClear}
                  disabled={isPending}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Results Section */}
      <div className="col-span-1 space-y-6 lg:col-span-8">
        {/* Results Header with Actions */}
        {results.length > 0 && (
          <div className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-semibold text-emerald-600">
                  {acceptedCount}
                </div>
                <div className="text-sm text-slate-500">Accepted</div>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-slate-400">
                  {rejectedCount}
                </div>
                <div className="text-sm text-slate-500">Rejected</div>
              </div>
            </div>

            <Button
              asChild
              className="bg-slate-900 text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-md"
            >
              <CSVLink
                data={csvFormat}
                filename="smartcv-results.csv"
                target="_blank"
              >
                <Download className="mr-2 h-4 w-4" />
                Export Results
              </CSVLink>
            </Button>
          </div>
        )}

        {/* Results Container */}
        <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-8 shadow-sm backdrop-blur-sm">
          {/* Loading States */}
          {isValidating && (
            <div className="flex flex-col items-center justify-center space-y-4 py-12">
              <div className="relative">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500"></div>
                <div className="animation-delay-150 absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-r-emerald-300"></div>
              </div>
              <p className="font-medium text-slate-600">
                Validating resumes...
              </p>
              <p className="text-sm text-slate-500">
                This may take a few moments
              </p>
            </div>
          )}

          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center space-y-4 py-12">
              <div className="relative">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-blue-500"></div>
                <div className="animation-delay-150 absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-r-blue-300"></div>
              </div>
              <p className="font-medium text-slate-600">
                Analyzing candidates...
              </p>
              <p className="text-sm text-slate-500">
                AI is evaluating each resume
              </p>
            </div>
          )}

          {/* Results Grid */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {isPending && !isValidating && !isAnalyzing
              ? Array.from({ length: uploadedFiles.length }).map((_, index) => (
                  <ResultCardSkeleton key={index} />
                ))
              : results.length > 0
                ? sortedResults.map((result, index) => (
                    <ResultCard key={index} result={result} />
                  ))
                : !isPending && (
                    <div className="col-span-full py-16 text-center">
                      {error ? (
                        <div className="space-y-3">
                          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                              <div className="h-2 w-2 rounded-full bg-red-500"></div>
                            </div>
                          </div>
                          <p className="font-medium text-red-600">{error}</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200">
                            <FileText className="h-8 w-8 text-slate-400" />
                          </div>
                          <div>
                            <h3 className="mb-2 text-xl font-medium text-slate-700">
                              Ready for Analysis
                            </h3>
                            <p className="mx-auto max-w-md leading-relaxed text-slate-500">
                              Upload candidate resumes and provide a job
                              description to see detailed AI-powered screening
                              results here.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
          </div>
        </div>
      </div>
    </>
  );
}
