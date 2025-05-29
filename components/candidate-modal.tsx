"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  GraduationCap,
  Briefcase,
  Code,
  Globe,
} from "lucide-react";
import { ResumeClassification } from "@/app/ai-screener/schema";

interface CandidateModalProps {
  candidate: ResumeClassification["candidate"];
  isOpen: boolean;
  onClose: () => void;
}

export function CandidateModal({
  candidate,
  isOpen,
  onClose,
}: CandidateModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {candidate.fullName}
          </DialogTitle>
          <p className="text-slate-600">{candidate.currentTitle}</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-800">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-500" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-500" />
                <span>{candidate.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-500" />
                <span>{candidate.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-slate-500" />
                <span>{candidate.yearsOfExperience} years experience</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Summary */}
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-800">
              Professional Summary
            </h3>
            <p className="text-sm text-slate-600">{candidate.summary}</p>
          </div>

          <Separator />

          {/* Education */}
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-semibold text-slate-800">
              <GraduationCap className="h-4 w-4" />
              Education
            </h3>
            <p className="text-sm text-slate-600">{candidate.education}</p>
          </div>

          <Separator />

          {/* Skills */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 font-semibold text-slate-800">
              <Code className="h-4 w-4" />
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Work Experience */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-800">Work Experience</h3>
            <div className="space-y-3">
              {candidate.workExperience.map((work, index) => (
                <div key={index} className="border-l-2 border-slate-200 pl-4">
                  <h4 className="font-medium text-slate-800">
                    {work.jobTitle}
                  </h4>
                  <p className="text-sm font-medium text-slate-600">
                    {work.company}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{work.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Projects */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-800">Projects</h3>
            <div className="space-y-3">
              {candidate.projects.map((project, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-slate-200 p-3"
                >
                  <h4 className="font-medium text-slate-800">
                    {project.title}
                  </h4>
                  <p className="mt-1 text-sm text-slate-600">
                    {project.summary}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-800">Links</h3>
            <div className="space-y-2 text-sm">
              {candidate.linkedin !== "Not provided" && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-blue-600" />
                  <a
                    href={candidate.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              )}
              {candidate.github !== "Not provided" && (
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-slate-700" />
                  <a
                    href={candidate.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:underline"
                  >
                    GitHub Profile
                  </a>
                </div>
              )}
              {candidate.website !== "Not provided" && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-slate-700" />
                  <a
                    href={candidate.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:underline"
                  >
                    Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
