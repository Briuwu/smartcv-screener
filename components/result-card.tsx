"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText, CheckCircle, XCircle } from "lucide-react";
import { CandidateModal } from "@/components/candidate-modal";
import { ResumeClassification } from "@/app/ai-screener/schema";

interface ResultCardProps {
  result: ResumeClassification;
}

export function ResultCard({ result }: ResultCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAccepted = result.status === "accepted";

  return (
    <>
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-slate-500" />
              <span className="font-medium text-slate-900">
                {result.fileName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={isAccepted ? "default" : "destructive"}
                className={`flex items-center gap-1 capitalize ${
                  isAccepted
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              >
                {isAccepted ? (
                  <CheckCircle className="h-3 w-3" />
                ) : (
                  <XCircle className="h-3 w-3" />
                )}
                {result.status}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                {result.confidence}%
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex h-full flex-col justify-between space-y-4">
          <div>
            <h4 className="mb-1 text-sm font-medium text-slate-700">Reason</h4>
            <p className="text-sm text-slate-600">{result.reason}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Candidate: {result.candidate.fullName}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>

      <CandidateModal
        candidate={result.candidate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
