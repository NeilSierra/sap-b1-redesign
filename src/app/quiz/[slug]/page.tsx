"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  ClipboardCheck,
  RotateCcw,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { useLms } from "@/context/LmsContext";
import { LESSON_MODULES } from "@/data/lms-data";

function QuizRoute() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "hardware-requirements-guide";
  return <QuizContent key={slug} slug={slug} />;
}

export default function QuizPage() {
  return (
    <Suspense fallback={null}>
      <QuizRoute />
    </Suspense>
  );
}

function QuizContent({ slug }: { slug: string }) {
  const currentModule =
    LESSON_MODULES.find((m) => m.slug === slug) ?? LESSON_MODULES[0];

  const { submitQuizScore } = useLms();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = currentModule.quiz.length;
  const correctCount = currentModule.quiz.reduce(
    (acc, q) => (answers[q.id] === q.correctIndex ? acc + 1 : acc),
    0
  );
  const allAnswered = currentModule.quiz.every(
    (q) => answers[q.id] !== undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allAnswered) return;
    setSubmitted(true);
    submitQuizScore(currentModule.slug, correctCount, total);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <div className="mb-6">
          <Link
            href="/grades"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#5F6368] hover:text-[#A22630]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Grade Summary
          </Link>
          <div className="mt-2 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(162,38,48,0.08)] text-[#A22630]">
              <ClipboardCheck className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-[22px] font-medium text-[#202124]">
                Quiz Assessment: {currentModule.shortTitle}
              </h1>
              <p className="text-xs text-[#5F6368]">
                {total} Questions &bull; Score automatically syncs to Grade
                Summary
              </p>
            </div>
          </div>
        </div>

        {submitted && (
          <div className="classroom-card mb-6 border-l-4 border-l-[#A22630] bg-[#F8F9FA] p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A22630]">
                  Quiz Submitted
                </p>
                <p className="mt-1 font-display text-xl font-semibold text-[#202124]">
                  Score: {correctCount}/{total} (
                  {Math.round((correctCount / total) * 100)}%)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#DADCE0] bg-white px-4 py-2 text-xs font-medium text-[#202124] hover:bg-[#F1F3F4]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Retake
                </button>
                <Link
                  href="/grades"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#A22630] px-4 py-2 text-xs font-medium text-white hover:bg-[#8A1F28]"
                >
                  <Award className="h-3.5 w-3.5" />
                  View Grade Summary
                </Link>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {currentModule.quiz.map((q, index) => {
            const selected = answers[q.id];
            return (
              <div key={q.id} className="classroom-card p-5">
                <p className="text-sm font-medium text-[#202124]">
                  {index + 1}. {q.question}
                </p>

                <div className="mt-3 space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selected === optIdx;
                    const isCorrectOption = q.correctIndex === optIdx;
                    let optionStyle =
                      "border-[#DADCE0] bg-[#F8F9FA] hover:bg-[#F1F3F4]";
                    if (submitted) {
                      if (isCorrectOption) {
                        optionStyle =
                          "border-[#A22630] bg-[rgba(162,38,48,0.08)] font-medium";
                      } else if (isSelected && !isCorrectOption) {
                        optionStyle =
                          "border-[#202124] bg-[rgba(255,178,0,0.14)]";
                      }
                    } else if (isSelected) {
                      optionStyle =
                        "border-[#A22630] bg-[rgba(162,38,48,0.08)]";
                    }

                    return (
                      <label
                        key={optIdx}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2.5 text-sm transition-colors ${optionStyle}`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={optIdx}
                          disabled={submitted}
                          checked={isSelected}
                          onChange={() =>
                            setAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                          }
                          className="accent-[#A22630]"
                        />
                        <span className="text-[#202124]">{opt}</span>
                      </label>
                    );
                  })}
                </div>

                {submitted && (
                  <p className="mt-3 flex items-start gap-2 rounded-md bg-[#F8F9FA] p-3 text-xs text-[#5F6368]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A22630]" />
                    <span>{q.explanation}</span>
                  </p>
                )}
              </div>
            );
          })}

          {!submitted && (
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={!allAnswered}
                className="rounded-full bg-[#A22630] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#8A1F28] disabled:opacity-40"
              >
                Submit Quiz
              </button>
            </div>
          )}
        </form>
      </div>
    </AppShell>
  );
}
