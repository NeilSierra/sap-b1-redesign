"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ClipboardCheck,
  FileText,
  PlayCircle,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { useLms } from "@/context/LmsContext";
import { LESSON_MODULES } from "@/data/lms-data";

function LessonDetailRoute() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "hardware-requirements-guide";
  return <LessonDetailContent key={slug} slug={slug} />;
}

export default function LessonDetailPage() {
  return (
    <Suspense fallback={null}>
      <LessonDetailRoute />
    </Suspense>
  );
}

function LessonDetailContent({ slug }: { slug: string }) {
  const currentModule =
    LESSON_MODULES.find((m) => m.slug === slug) ?? LESSON_MODULES[0];

  const { progress, markPageRead, toggleVideoWatched } = useLms();

  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [discussionOpen, setDiscussionOpen] = useState(true);
  const [videoOpen, setVideoOpen] = useState(true);
  const [isLoadingResource, setIsLoadingResource] = useState(false);

  const triggerResourceLoad = (nextPage?: number) => {
    setIsLoadingResource(true);
    if (nextPage !== undefined) setCurrentPage(nextPage);
    window.setTimeout(() => setIsLoadingResource(false), 180);
  };

  useEffect(() => {
    markPageRead(currentModule.slug, currentPage);
  }, [currentModule.slug, currentPage, markPageRead]);

  const pageData =
    currentModule.pages[currentPage - 1] ?? currentModule.pages[0];
  const modProgress = progress[currentModule.slug] ?? {
    pagesRead: 1,
    videoWatched: false,
  };

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () =>
    setCurrentPage((p) => Math.min(currentModule.totalPages, p + 1));
  const handleZoomOut = () => setZoom((z) => Math.max(75, z - 10));
  const handleZoomIn = () => setZoom((z) => Math.min(130, z + 10));

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {/* Breadcrumb & Heading */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <Link
              href="/lessons"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#5F6368] hover:text-[#A22630]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Lessons
            </Link>
            <h1 className="mt-1 font-display text-[22px] font-medium text-[#202124]">
              {currentModule.title}
            </h1>
          </div>

          <Link
            href={`/quiz/${currentModule.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#A22630] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#8A1F28]"
          >
            <ClipboardCheck className="h-4 w-4" />
            Take Module Quiz
          </Link>
        </div>

        {/* 2-Column Layout: Document Viewer + Right Lesson Materials */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Document Viewer */}
          <div className="lg:col-span-8">
            <div className="classroom-card overflow-hidden">
              {/* Document Viewer Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DADCE0] bg-[#F8F9FA] px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentPage <= 1}
                    aria-label="Previous Page"
                    className="inline-flex items-center gap-1 rounded-md border border-[#DADCE0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#202124] hover:bg-[#F1F3F4] disabled:opacity-40"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Previous Page</span>
                    <span className="sm:hidden">Prev</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={currentPage >= currentModule.totalPages}
                    aria-label="Next Page"
                    className="inline-flex items-center gap-1 rounded-md border border-[#DADCE0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#202124] hover:bg-[#F1F3F4] disabled:opacity-40"
                  >
                    <span className="hidden sm:inline">Next Page</span>
                    <span className="sm:hidden">Next</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="font-mono-code text-xs font-medium text-[#202124]">
                  Page: {currentPage} / {currentModule.totalPages}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    aria-label="Zoom Out"
                    title="Zoom Out"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[#DADCE0] bg-white text-[#5F6368] hover:bg-[#F1F3F4]"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <span className="min-w-[42px] text-center font-mono-code text-xs text-[#5F6368]">
                    {zoom}%
                  </span>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    aria-label="Zoom In"
                    title="Zoom In"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[#DADCE0] bg-white text-[#5F6368] hover:bg-[#F1F3F4]"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Embedded Document Canvas */}
              <div className="relative overflow-auto bg-[#F1F3F4] p-4 sm:p-6">
                {isLoadingResource && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/75 backdrop-blur-[1px]">
                    <div className="flex items-center gap-2.5 rounded-lg border border-[#DADCE0] bg-white px-4 py-2 text-xs font-medium text-[#202124] shadow-sm">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#A22630] border-t-transparent" />
                      Loading lesson resource...
                    </div>
                  </div>
                )}
                <article
                  style={{ fontSize: `${zoom}%` }}
                  className="mx-auto min-h-[460px] max-w-2xl rounded border border-[#DADCE0] bg-white p-6 shadow-sm transition-all sm:p-8"
                >
                  {/* Document Header */}
                  <div className="border-b border-[#DADCE0] pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[0.7em] font-semibold uppercase tracking-wider text-[#5F6368]">
                      <span className="rounded bg-[#F8F9FA] px-2 py-0.5 border border-[#DADCE0]">
                        {pageData.classification}
                      </span>
                      <span>{pageData.version}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[0.75em] text-[#5F6368]">
                      <span className="font-medium text-[#202124]">
                        {pageData.headerTitle}
                      </span>
                      <span className="font-semibold text-[#A22630]">
                        {pageData.product}
                      </span>
                    </div>
                  </div>

                  {/* Page Title & Subtitle */}
                  {pageData.title && (
                    <div className="mt-5">
                      <h2 className="font-display text-[1.35em] font-semibold leading-snug text-[#202124]">
                        {pageData.title}
                      </h2>
                      {pageData.subtitle && (
                        <p className="mt-1 text-[0.95em] font-medium text-[#A22630]">
                          {pageData.subtitle}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Page Sections */}
                  <div className="mt-5 space-y-5 text-[0.875em] leading-relaxed text-[#202124]">
                    {pageData.sections.map((section, idx) => (
                      <div key={idx} className="space-y-2">
                        {section.heading && (
                          <h3 className="font-display text-[1.05em] font-semibold text-[#202124]">
                            {section.heading}
                          </h3>
                        )}
                        {section.paragraphs?.map((p, pIdx) => (
                          <p key={pIdx} className="text-[#5F6368]">
                            {p}
                          </p>
                        ))}
                        {section.bullets && (
                          <ul className="list-disc space-y-1.5 pl-5 text-[#5F6368]">
                            {section.bullets.map((b, bIdx) => (
                              <li key={bIdx}>{b}</li>
                            ))}
                          </ul>
                        )}
                        {section.table && (
                          <div className="overflow-x-auto rounded border border-[#DADCE0]">
                            <table className="w-full border-collapse text-left text-[0.9em]">
                              <thead>
                                <tr className="border-b border-[#DADCE0] bg-[#F8F9FA]">
                                  {section.table.headers.map((h, hIdx) => (
                                    <th
                                      key={hIdx}
                                      className="px-3 py-2 font-semibold text-[#202124]"
                                    >
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-[#F1F3F4]">
                                {section.table.rows.map((row, rIdx) => (
                                  <tr key={rIdx}>
                                    {row.map((cell, cIdx) => (
                                      <td
                                        key={cIdx}
                                        className="px-3 py-2 text-[#5F6368]"
                                      >
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </div>

          {/* Right Panel: Lesson Materials */}
          <aside className="space-y-4 lg:col-span-4">
            {/* DISCUSSION Collapsible */}
            <div className="classroom-card overflow-hidden">
              <button
                type="button"
                onClick={() => setDiscussionOpen((o) => !o)}
                className="flex w-full items-center justify-between border-b border-[#DADCE0] bg-[#F8F9FA] px-4 py-3 text-left"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-[#A22630]">
                  DISCUSSION
                </span>
                {discussionOpen ? (
                  <ChevronUp className="h-4 w-4 text-[#5F6368]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[#5F6368]" />
                )}
              </button>

              {discussionOpen && (
                <div className="p-3">
                  <button
                    type="button"
                    onClick={() => triggerResourceLoad(1)}
                    className="flex w-full items-center justify-between gap-2 rounded-lg border border-[#DADCE0] bg-[rgba(162,38,48,0.06)] px-3 py-2.5 text-left transition-colors hover:bg-[rgba(162,38,48,0.1)]"
                  >
                    <span className="flex items-center gap-2 text-xs font-medium text-[#202124]">
                      <FileText className="h-4 w-4 shrink-0 text-[#A22630]" />
                      1. {currentModule.shortTitle}
                    </span>
                    <span className="font-mono-code text-[11px] text-[#A22630]">
                      {modProgress.pagesRead}/{currentModule.totalPages}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* NAVIGATION VIDEO Collapsible */}
            <div className="classroom-card overflow-hidden">
              <button
                type="button"
                onClick={() => setVideoOpen((o) => !o)}
                className="flex w-full items-center justify-between border-b border-[#DADCE0] bg-[#F8F9FA] px-4 py-3 text-left"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-[#A22630]">
                  NAVIGATION VIDEO
                </span>
                {videoOpen ? (
                  <ChevronUp className="h-4 w-4 text-[#5F6368]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[#5F6368]" />
                )}
              </button>

              {videoOpen && (
                <div className="space-y-3 p-4">
                  <div className="relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-lg bg-[#202124] p-4 text-center text-white">
                    <img
                      src={currentModule.thumbnail}
                      alt={currentModule.videoTitle}
                      className="absolute inset-0 h-full w-full object-cover opacity-40"
                    />
                    <PlayCircle className="relative z-10 h-10 w-10 text-[#FFB200]" />
                    <p className="relative z-10 mt-2 text-xs font-medium">
                      {currentModule.videoTitle}
                    </p>
                    <span className="relative z-10 mt-1 font-mono-code text-[11px] text-white/80">
                      Duration: {currentModule.videoDuration}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleVideoWatched(currentModule.slug)}
                    className={`flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                      modProgress.videoWatched
                        ? "border-[#A22630] bg-[rgba(162,38,48,0.08)] text-[#A22630]"
                        : "border-[#DADCE0] bg-white text-[#202124] hover:bg-[#F1F3F4]"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {modProgress.videoWatched
                      ? "Marked as Watched"
                      : "Mark Video as Watched"}
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
