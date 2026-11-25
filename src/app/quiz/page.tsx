"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { useLms } from "@/context/LmsContext";
import { LESSON_MODULES } from "@/data/lms-data";

export default function QuizIndexPage() {
  const { grades } = useLms();

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <div className="mb-6 flex items-center justify-between border-b border-[#DADCE0] pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(162,38,48,0.08)] text-[#A22630]">
              <ClipboardCheck className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-[22px] font-medium text-[#202124]">
                Quiz Assessments
              </h1>
              <p className="text-xs text-[#5F6368]">
                Select a module quiz to complete or review your score
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {LESSON_MODULES.map((mod) => {
            const grade = grades.find((g) => g.slug === mod.slug);
            const hasScore =
              grade && grade.score !== "/" && grade.score !== "0/0";

            return (
              <div
                key={mod.slug}
                className="classroom-card classroom-card-hover flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={mod.thumbnail}
                    alt={mod.title}
                    className="h-11 w-16 shrink-0 rounded-lg border border-[#DADCE0] object-cover bg-[#F8F9FA]"
                  />
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-medium text-[#202124]">
                      {mod.title}
                    </h2>
                    <p className="mt-0.5 text-xs text-[#5F6368]">
                      {mod.quiz.length} Questions &bull; {mod.startDate} –{" "}
                      {mod.endDate}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
                  {hasScore ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(255,178,0,0.14)] px-3 py-1 font-mono-code text-xs font-semibold text-[#202124]">
                      Score: {grade.score}
                      {grade.rating ? ` (${grade.rating}%)` : ""}
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-[#F1F3F4] px-3 py-1 text-xs font-medium text-[#5F6368]">
                      Not attempted
                    </span>
                  )}

                  <Link
                    href={`/quiz/${mod.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#A22630] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#8A1F28]"
                  >
                    {hasScore ? "Retake Quiz" : "Take Quiz"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
