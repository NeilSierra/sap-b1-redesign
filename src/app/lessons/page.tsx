"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  FileText,
  Video,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { useLms } from "@/context/LmsContext";
import { LESSON_MODULES } from "@/data/lms-data";

export default function LessonsIndexPage() {
  const { progress } = useLms();
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <div className="mb-6 flex items-center justify-between border-b border-[#DADCE0] pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(162,38,48,0.08)] text-[#A22630]">
              <BookOpen className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-[22px] font-medium text-[#202124]">
                Lessons &amp; Coursework
              </h1>
              <p className="text-xs text-[#5F6368]">
                SAP Business One Modules (IT302-WM)
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {LESSON_MODULES.map((mod) => {
            const isExpanded = expandedSlug === mod.slug;
            const modProg = progress[mod.slug] ?? {
              pagesRead: 0,
              videoWatched: false,
            };

            return (
              <div
                key={mod.slug}
                className="classroom-card classroom-card-hover overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedSlug(isExpanded ? null : mod.slug)
                  }
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
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
                      <p className="text-xs text-[#5F6368]">
                        {mod.startDate} – {mod.endDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <span className="hidden sm:inline-flex rounded-full bg-[rgba(162,38,48,0.08)] px-2.5 py-0.5 text-xs font-semibold text-[#A22630]">
                      {mod.status}
                    </span>
                    <span className="font-mono-code text-xs text-[#5F6368]">
                      {modProg.pagesRead}/{mod.totalPages}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-[#5F6368]" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[#5F6368]" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-[#DADCE0] bg-[#F8F9FA] px-5 py-4">
                    <p className="text-sm leading-relaxed text-[#5F6368]">
                      {mod.description}
                    </p>

                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Link
                        href={`/lessons/${mod.slug}`}
                        className="flex items-center gap-3 rounded-lg border border-[#DADCE0] bg-white p-3 transition-colors hover:border-[#A22630]"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(162,38,48,0.08)] text-[#A22630]">
                          <FileText className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-[#202124]">
                            Open Document Viewer
                          </p>
                          <p className="text-[11px] text-[#5F6368]">
                            {mod.totalPages} pages &bull; Discussion Guide
                          </p>
                        </div>
                      </Link>

                      <Link
                        href={`/quiz/${mod.slug}`}
                        className="flex items-center gap-3 rounded-lg border border-[#DADCE0] bg-white p-3 transition-colors hover:border-[#A22630]"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(255,178,0,0.14)] text-[#202124]">
                          <ClipboardCheck className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-[#202124]">
                            Module Quiz Assessment
                          </p>
                          <p className="text-[11px] text-[#5F6368]">
                            {mod.quiz.length} questions &bull; Syncs to Grades
                          </p>
                        </div>
                      </Link>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs text-[#5F6368]">
                      <Video className="h-3.5 w-3.5" />
                      <span>
                        Navigation Video: <strong>{mod.videoTitle}</strong> (
                        {mod.videoDuration})
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
