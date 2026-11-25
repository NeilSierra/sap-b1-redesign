"use client";

import React, { useState } from "react";
import { MessageSquarePlus, X } from "lucide-react";
import { useLms } from "@/context/LmsContext";

export function FeedbackModal() {
  const { feedbackOpen, setFeedbackOpen, comments, addFeedbackComment } =
    useLms();
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  if (!feedbackOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !comment.trim()) {
      setError("Please enter both a subject and a comment.");
      return;
    }
    addFeedbackComment(subject, comment);
    setSubject("");
    setComment("");
    setError("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-modal-title"
    >
      <div className="classroom-card w-full max-w-lg overflow-hidden bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#DADCE0] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(162,38,48,0.08)] text-[#A22630]">
              <MessageSquarePlus className="h-4 w-4" />
            </span>
            <h2
              id="feedback-modal-title"
              className="font-display text-lg font-medium text-[#202124]"
            >
              Comments &amp; Feedback
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setFeedbackOpen(false)}
            aria-label="Close Comments & Feedback"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#5F6368] hover:bg-[#F1F3F4]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <label
              htmlFor="feedback-subject"
              className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#5F6368]"
            >
              Subject / Title
            </label>
            <input
              id="feedback-subject"
              type="text"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter subject or title"
              className="w-full rounded-lg border border-[#DADCE0] bg-[#F8F9FA] px-3.5 py-2.5 text-sm text-[#202124] placeholder:text-[#80868B] focus:border-[#A22630] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="feedback-body"
              className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#5F6368]"
            >
              Comment
            </label>
            <textarea
              id="feedback-body"
              rows={4}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                if (error) setError("");
              }}
              placeholder="Share your thoughts, feedback, or suggestions..."
              className="w-full rounded-lg border border-[#DADCE0] bg-[#F8F9FA] px-3.5 py-2.5 text-sm text-[#202124] placeholder:text-[#80868B] focus:border-[#A22630] focus:bg-white focus:outline-none"
            />
          </div>

          {error && <p className="text-xs font-medium text-[#A22630]">{error}</p>}

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setFeedbackOpen(false)}
              className="rounded-full px-4 py-2 text-sm font-medium text-[#5F6368] hover:bg-[#F1F3F4]"
            >
              Close
            </button>
            <button
              type="submit"
              className="rounded-full bg-[#A22630] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#8A1F28]"
            >
              + Add Comment
            </button>
          </div>
        </form>

        {comments.length > 0 && (
          <div className="max-h-56 overflow-y-auto border-t border-[#DADCE0] bg-[#F8F9FA] px-6 py-4">
            <h3 className="mb-2.5 text-xs font-medium uppercase tracking-wide text-[#5F6368]">
              Recent Submissions ({comments.length})
            </h3>
            <div className="space-y-2.5">
              {comments.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-[#DADCE0] bg-white p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-[#202124]">
                      {item.subject}
                    </span>
                    <span className="text-[11px] text-[#5F6368]">
                      {item.createdAt}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#5F6368]">
                    {item.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
