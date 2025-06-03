import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Users,
  FileText,
  CheckCircle,
  Target,
  Brain,
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-100/40 to-blue-100/40 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-slate-100/60 to-emerald-50/40 blur-3xl"></div>
        <div className="absolute right-1/4 -bottom-40 h-80 w-80 rounded-full bg-gradient-to-tl from-emerald-100/30 to-slate-100/40 blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
              <Sparkles className="h-4 w-4" />
              AI-Powered Resume Screening
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                <span className="text-slate-900">Screen Resumes</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                  10x Faster
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
                Upload candidate resumes, paste your job description, and let
                our AI instantly classify and rank candidates with detailed
                analysis and reasoning.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 font-medium text-white shadow-lg transition-all duration-200 hover:from-emerald-700 hover:to-emerald-800 hover:shadow-xl"
              >
                <Link href="/screener">
                  Start Screening Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 border-slate-200 px-8 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 pt-16 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">95%</div>
                <div className="text-sm text-slate-600">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">10x</div>
                <div className="text-sm text-slate-600">Faster Screening</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">24/7</div>
                <div className="text-sm text-slate-600">Always Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Powerful AI Features
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Everything you need to streamline your recruitment process with
              intelligent automation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="group rounded-2xl border border-slate-200/60 bg-white/70 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 transition-transform duration-200 group-hover:scale-110">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                Intelligent Analysis
              </h3>
              <p className="leading-relaxed text-slate-600">
                Our AI analyzes resumes against job requirements, providing
                detailed reasoning for each decision.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl border border-slate-200/60 bg-white/70 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 transition-transform duration-200 group-hover:scale-110">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                Lightning Fast
              </h3>
              <p className="leading-relaxed text-slate-600">
                Process hundreds of resumes in minutes, not hours. Get instant
                results with confidence scores.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl border border-slate-200/60 bg-white/70 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 transition-transform duration-200 group-hover:scale-110">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                Precise Matching
              </h3>
              <p className="leading-relaxed text-slate-600">
                Match candidates based on skills, experience, and requirements
                with industry-leading accuracy.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group rounded-2xl border border-slate-200/60 bg-white/70 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 transition-transform duration-200 group-hover:scale-110">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                Detailed Reports
              </h3>
              <p className="leading-relaxed text-slate-600">
                Get comprehensive candidate profiles with extracted information
                and match explanations.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group rounded-2xl border border-slate-200/60 bg-white/70 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 transition-transform duration-200 group-hover:scale-110">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                Secure & Private
              </h3>
              <p className="leading-relaxed text-slate-600">
                Your data is protected with enterprise-grade security. No
                storage of sensitive information.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group rounded-2xl border border-slate-200/60 bg-white/70 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 transition-transform duration-200 group-hover:scale-110">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                Bulk Processing
              </h3>
              <p className="leading-relaxed text-slate-600">
                Upload multiple resumes at once and get organized results with
                export capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative bg-slate-50/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Get started with AI-powered resume screening in three simple
              steps.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {/* Step 1 */}
            <div className="space-y-6 text-center">
              <div className="relative">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
                  <FileText className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                  <span className="text-sm font-bold text-emerald-700">1</span>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  Upload Resumes
                </h3>
                <p className="text-slate-600">
                  Upload candidate resumes in PDF format. Our system supports
                  bulk uploads for efficiency.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-6 text-center">
              <div className="relative">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-sm font-bold text-blue-700">2</span>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  Add Job Requirements
                </h3>
                <p className="text-slate-600">
                  Paste your job description with required skills, experience,
                  and qualifications.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-6 text-center">
              <div className="relative">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <span className="text-sm font-bold text-purple-700">3</span>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  Get Results
                </h3>
                <p className="text-slate-600">
                  Receive detailed analysis with accepted/rejected candidates
                  and reasoning for each decision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-200/60 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 shadow-sm">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-900">
                SmartCV
              </span>
            </div>

            <div className="text-sm text-slate-500">
              © 2025 SmartCV Screener. Built by Brian Millonte.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
