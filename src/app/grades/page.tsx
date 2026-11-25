"use client";

import React from "react";
import Link from "next/link";
import { Award, ClipboardCheck } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { useLms } from "@/context/LmsContext";

export default function GradesPage() {
  const { grades } = useLms();

  const quizGrades = grades.filter((g) => g.category === "Quiz Assessment");
  const handsOnGrades = grades.filter(
    (g) => g.category === "SAP Hands-on Activities"
  );

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {/* Page Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#DADCE0] pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(162,38,48,0.08)] text-[#A22630]">
              <Award className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-[22px] font-medium text-[#202124]">
                Student Grades
              </h1>
              <p className="text-xs text-[#5F6368]">
                Grade Summary for SAP Business One (IT302-WM)
              </p>
            </div>
          </div>
        </div>

        {/* Grades Data Grid */}
        <div className="classroom-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#DADCE0] bg-[#F8F9FA] text-xs font-medium uppercase tracking-wide text-[#5F6368]">
                  <th className="px-3 py-3 sm:px-6 sm:py-3.5">Topic Name</th>
                  <th className="px-2 py-3 text-center sm:px-4 sm:py-3.5">
                    Score
                  </th>
                  <th className="px-2 py-3 text-center sm:px-4 sm:py-3.5">
                    Ratings
                  </th>
                  <th className="px-3 py-3 text-right sm:px-6 sm:py-3.5">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Quiz Assessment Section */}
                <tr className="border-b border-[#DADCE0] bg-[#F8F9FA]">
                  <td
                    colSpan={4}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#A22630]"
                  >
                    Quiz Assessment
                  </td>
                </tr>

                {quizGrades.map((item) => {
                  const hasNumericScore =
                    item.score !== "/" && item.score !== "0/0";
                  return (
                    <tr
                      key={item.id}
                      className="border-b border-[#F1F3F4] transition-colors hover:bg-[#F8F9FA]"
                    >
                      <td className="px-3 py-3.5 font-medium text-[#202124] sm:px-6 sm:py-4">
                        {item.topicName}
                      </td>
                      <td className="px-2 py-3.5 text-center sm:px-4 sm:py-4">
                        <span
                          className={`inline-flex min-w-[46px] justify-center rounded-md px-2 py-1 font-mono-code text-xs font-medium sm:min-w-[54px] sm:px-2.5 ${
                            hasNumericScore
                              ? "bg-[rgba(162,38,48,0.08)] text-[#A22630]"
                              : "bg-[#F1F3F4] text-[#5F6368]"
                          }`}
                        >
                          {item.score}
                        </span>
                      </td>
                      <td className="px-2 py-3.5 text-center sm:px-4 sm:py-4">
                        {item.rating ? (
                          <span className="inline-flex min-w-[38px] justify-center rounded-md bg-[rgba(255,178,0,0.14)] px-2 py-1 font-mono-code text-xs font-semibold text-[#202124] sm:min-w-[44px] sm:px-2.5">
                            {item.rating}
                          </span>
                        ) : (
                          <span className="text-xs text-[#80868B]">—</span>
                        )}
                      </td>
                      <td className="px-3 py-3.5 text-right sm:px-6 sm:py-4">
                        <Link
                          href={`/quiz/${item.slug}`}
                          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#DADCE0] px-2.5 py-1 text-xs font-medium text-[#A22630] transition-colors hover:bg-[rgba(162,38,48,0.08)] sm:px-3"
                        >
                          <ClipboardCheck className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">
                            {hasNumericScore ? "Retake Quiz" : "Take Quiz"}
                          </span>
                          <span className="sm:hidden">Quiz</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}

                {/* SAP Hands-on Activities Section */}
                <tr className="border-b border-[#DADCE0] bg-[#F8F9FA]">
                  <td
                    colSpan={4}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#A22630]"
                  >
                    SAP Hands-on Activities
                  </td>
                </tr>

                {handsOnGrades.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-6 text-center text-xs text-[#5F6368]"
                    >
                      No SAP Hands-on Activities recorded yet.
                    </td>
                  </tr>
                ) : (
                  handsOnGrades.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#F1F3F4] hover:bg-[#F8F9FA]"
                    >
                      <td className="px-6 py-4 font-medium text-[#202124]">
                        {item.topicName}
                      </td>
                      <td className="px-4 py-4 text-center font-mono-code text-xs">
                        {item.score}
                      </td>
                      <td className="px-4 py-4 text-center font-mono-code text-xs">
                        {item.rating || "—"}
                      </td>
                      <td className="px-6 py-4 text-right text-xs text-[#5F6368]">
                        —
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
