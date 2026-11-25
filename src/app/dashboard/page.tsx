"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Video,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { useLms } from "@/context/LmsContext";
import {
  INSTRUCTOR_CONTACT,
  LESSON_MODULES,
  STUDENT_PROFILE,
} from "@/data/lms-data";

export default function DashboardPage() {
  const { progress } = useLms();
  const [activeTab, setActiveTab] = useState<"status" | "progress">("status");
  const [selectedModuleSlug, setSelectedModuleSlug] = useState(
    LESSON_MODULES[0].slug
  );

  const selectedModule =
    LESSON_MODULES.find((m) => m.slug === selectedModuleSlug) ??
    LESSON_MODULES[0];
  const modProgress = progress[selectedModule.slug] ?? {
    pagesRead: 0,
    videoWatched: false,
  };
  const isDiscussionDone = modProgress.pagesRead >= selectedModule.totalPages;
  const totalPagesAll = LESSON_MODULES.reduce((sum, m) => sum + m.totalPages, 0);
  const totalPagesRead = LESSON_MODULES.reduce(
    (sum, m) => sum + (progress[m.slug]?.pagesRead ?? 0),
    0
  );
  const overallPercent =
    totalPagesAll > 0 ? Math.round((totalPagesRead / totalPagesAll) * 100) : 0;

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {/* Google Classroom-style Hero Banner */}
        <section className="relative overflow-hidden rounded-lg bg-[#A22630] px-6 py-7 text-white sm:px-8">
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#FFB200]/20"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-0 right-12 h-24 w-24 rounded-tl-full bg-white/10"
            aria-hidden="true"
          />

          <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFB200] px-3 py-0.5 text-xs font-semibold text-[#202124]">
                {STUDENT_PROFILE.courseSection} &bull; {STUDENT_PROFILE.institutionShort}
              </span>
              <h1 className="mt-2.5 font-display text-2xl font-medium tracking-tight sm:text-[32px] sm:leading-[40px]">
                SAP Business One
              </h1>
              <p className="mt-1 text-sm text-white/85">
                Instructor: {INSTRUCTOR_CONTACT.name} &bull; Student:{" "}
                {STUDENT_PROFILE.name}
              </p>
            </div>
            <Link
              href="/lessons/hardware-requirements-guide"
              className="inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#A22630] shadow-sm transition-colors hover:bg-[#F8F9FA] sm:self-auto"
            >
              Continue Lesson
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Main Dashboard Tabs */}
        <div className="mt-6">
          <div className="classroom-card overflow-hidden">
              {/* Classroom Tab Bar */}
              <div className="flex border-b border-[#DADCE0] px-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("status")}
                  className={`relative px-4 py-3.5 text-sm font-medium transition-colors ${
                    activeTab === "status"
                      ? "text-[#A22630]"
                      : "text-[#5F6368] hover:text-[#202124]"
                  }`}
                >
                  Lesson Status
                  {activeTab === "status" && (
                    <span className="absolute bottom-0 left-2 right-2 h-[3px] rounded-t-full bg-[#A22630]" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("progress")}
                  className={`relative px-4 py-3.5 text-sm font-medium transition-colors ${
                    activeTab === "progress"
                      ? "text-[#A22630]"
                      : "text-[#5F6368] hover:text-[#202124]"
                  }`}
                >
                  Student Progress
                  {activeTab === "progress" && (
                    <span className="absolute bottom-0 left-2 right-2 h-[3px] rounded-t-full bg-[#A22630]" />
                  )}
                </button>
              </div>

              {/* Tab 1: Lesson Status */}
              {activeTab === "status" && (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#DADCE0] bg-[#F8F9FA] text-xs font-medium uppercase tracking-wide text-[#5F6368]">
                        <th className="px-4 py-3.5 sm:px-5">Topics</th>
                        <th className="hidden px-4 py-3.5 sm:table-cell">
                          Start Date
                        </th>
                        <th className="hidden px-4 py-3.5 sm:table-cell">
                          End Date
                        </th>
                        <th className="px-4 py-3.5 text-right sm:px-5">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F3F4]">
                      {LESSON_MODULES.map((mod) => (
                        <tr
                          key={mod.slug}
                          className="transition-colors hover:bg-[#F8F9FA]"
                        >
                          <td className="px-4 py-3.5 font-medium text-[#202124] sm:px-5">
                            <Link
                              href={`/lessons/${mod.slug}`}
                              className="inline-flex items-center gap-3 hover:text-[#A22630] hover:underline"
                            >
                              <img
                                src={mod.thumbnail}
                                alt={mod.title}
                                className="h-8 w-12 shrink-0 rounded border border-[#DADCE0] object-cover bg-[#F8F9FA]"
                              />
                              <div className="min-w-0">
                                <span className="block">{mod.title}</span>
                                <span className="mt-0.5 block text-[11px] font-normal text-[#5F6368] sm:hidden">
                                  {mod.startDate} – {mod.endDate}
                                </span>
                              </div>
                            </Link>
                          </td>
                          <td className="hidden whitespace-nowrap px-4 py-3.5 text-xs text-[#5F6368] sm:table-cell">
                            {mod.startDate}
                          </td>
                          <td className="hidden whitespace-nowrap px-4 py-3.5 text-xs text-[#5F6368] sm:table-cell">
                            {mod.endDate}
                          </td>
                          <td className="px-4 py-3.5 text-right sm:px-5">
                            <span className="inline-flex items-center rounded-full bg-[rgba(162,38,48,0.08)] px-2.5 py-0.5 text-xs font-semibold text-[#A22630]">
                              {mod.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 2: Student Progress */}
              {activeTab === "progress" && (
                <div className="divide-y divide-[#DADCE0]">
                  {/* Level 1: Overall Course Progress Summary */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-[#F8F9FA] px-5 py-3.5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#5F6368]">
                        Overall Course Progress
                      </p>
                      <p className="mt-0.5 text-xs text-[#5F6368]">
                        <span className="font-mono-code font-medium text-[#202124]">
                          {totalPagesRead}/{totalPagesAll}
                        </span>{" "}
                        pages completed across {LESSON_MODULES.length} modules
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="h-2.5 w-36 overflow-hidden rounded-full bg-[#DADCE0]">
                        <div
                          className="h-full rounded-full bg-[#A22630] transition-all"
                          style={{ width: `${overallPercent}%` }}
                        />
                      </div>
                      <span className="font-mono-code text-xs font-semibold text-[#A22630]">
                        {overallPercent}%
                      </span>
                    </div>
                  </div>

                  {/* Level 2: Module Selector & Selected Module Context */}
                  <div className="bg-white px-5 py-4">
                    <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#5F6368]">
                      Select Module
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {LESSON_MODULES.map((mod) => {
                        const active = mod.slug === selectedModuleSlug;
                        const mp = progress[mod.slug];
                        const modDone =
                          (mp?.pagesRead ?? 0) >= mod.totalPages &&
                          Boolean(mp?.videoWatched);
                        return (
                          <button
                            key={mod.slug}
                            type="button"
                            onClick={() => setSelectedModuleSlug(mod.slug)}
                            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                              active
                                ? "bg-[#A22630] text-white"
                                : "border border-[#DADCE0] bg-[#F8F9FA] text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]"
                            }`}
                          >
                            {modDone && (
                              <CheckCircle2
                                className={`h-3.5 w-3.5 ${
                                  active ? "text-[#FFB200]" : "text-[#A22630]"
                                }`}
                              />
                            )}
                            {mod.shortTitle}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#DADCE0] bg-[#F8F9FA] px-4 py-2.5">
                      <span className="font-display text-sm font-semibold text-[#202124]">
                        {selectedModule.title}
                      </span>
                      <Link
                        href={`/lessons/${selectedModule.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#A22630] hover:underline"
                      >
                        Open Module
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Level 3: Module Breakdown Table */}
                  <div className="overflow-x-auto bg-white">
                    <table className="w-full border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-[#DADCE0] bg-white text-[11px] font-semibold uppercase tracking-wider text-[#5F6368]">
                          <th className="px-5 py-2.5">Activity / Topic</th>
                          <th className="px-4 py-2.5">Progress</th>
                          <th className="px-5 py-2.5 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* DISCUSSION Group */}
                        <tr className="border-b border-[#DADCE0] bg-[rgba(162,38,48,0.04)]">
                          <td
                            colSpan={3}
                            className="px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#A22630]"
                          >
                            DISCUSSION
                          </td>
                        </tr>
                        <tr className="border-b border-[#F1F3F4] hover:bg-[#F8F9FA]">
                          <td className="py-3.5 pl-8 pr-5 font-medium text-[#202124]">
                            <Link
                              href={`/lessons/${selectedModule.slug}`}
                              className="hover:text-[#A22630] hover:underline"
                            >
                              {selectedModule.title}
                            </Link>
                          </td>
                          <td className="px-4 py-3.5 font-mono-code text-xs text-[#202124]">
                            {modProgress.pagesRead}/{selectedModule.totalPages}
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            {isDiscussionDone ? (
                              <span className="inline-flex items-center gap-1 rounded-full border border-[#DADCE0] bg-[#F8F9FA] px-2.5 py-0.5 text-xs font-medium text-[#202124]">
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#A22630]" />
                                Done
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(255,178,0,0.14)] px-2.5 py-0.5 text-xs font-medium text-[#202124]">
                                <Clock className="h-3.5 w-3.5" />
                                In Progress
                              </span>
                            )}
                          </td>
                        </tr>

                        {/* NAVIGATION VIDEO Group */}
                        <tr className="border-b border-[#DADCE0] bg-[rgba(162,38,48,0.04)]">
                          <td
                            colSpan={3}
                            className="px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#A22630]"
                          >
                            NAVIGATION VIDEO
                          </td>
                        </tr>
                        <tr className="hover:bg-[#F8F9FA]">
                          <td className="py-3.5 pl-8 pr-5 text-sm text-[#202124]">
                            <span className="inline-flex items-center gap-2">
                              <Video className="h-4 w-4 text-[#5F6368]" />
                              {selectedModule.videoTitle}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 font-mono-code text-xs text-[#5F6368]">
                            {modProgress.videoWatched ? "1/1" : "0/1"}
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            {modProgress.videoWatched ? (
                              <span className="inline-flex items-center gap-1 rounded-full border border-[#DADCE0] bg-[#F8F9FA] px-2.5 py-0.5 text-xs font-medium text-[#202124]">
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#A22630]" />
                                Done
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-[#F1F3F4] px-2.5 py-0.5 text-xs font-medium text-[#5F6368]">
                                Pending
                              </span>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
