"use client";

import React, { useState } from "react";
import { HelpCircle, Lock, RotateCcw, X } from "lucide-react";
import { useLms } from "@/context/LmsContext";
import { SUPPORT_CONTACT } from "@/data/lms-data";

export function HelpModal() {
  const { helpOpen, setHelpOpen } = useLms();
  if (!helpOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
    >
      <div className="classroom-card w-full max-w-md overflow-hidden bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#DADCE0] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(162,38,48,0.08)] text-[#A22630]">
              <HelpCircle className="h-4 w-4" />
            </span>
            <h2
              id="help-modal-title"
              className="font-display text-lg font-medium text-[#202124]"
            >
              LMS Help &amp; Support
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setHelpOpen(false)}
            aria-label="Close Help modal"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#5F6368] hover:bg-[#F1F3F4]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-6 text-sm text-[#202124]">
          <p className="text-[#5F6368]">
            Need assistance with your SAP Business One coursework, lab access, or
            quiz submissions? Reach out to the Erudite Support Team:
          </p>
          <div className="space-y-2 rounded-lg border border-[#DADCE0] bg-[#F8F9FA] p-4 text-xs">
            <div>
              <span className="text-[#5F6368]">Phone: </span>
              <strong className="font-medium">{SUPPORT_CONTACT.phone}</strong>
            </div>
            <div>
              <span className="text-[#5F6368]">Email: </span>
              <strong className="font-medium text-[#A22630]">
                {SUPPORT_CONTACT.email}
              </strong>
            </div>
            <div>
              <span className="text-[#5F6368]">Facebook Page: </span>
              <strong className="font-medium">{SUPPORT_CONTACT.facebook}</strong>
            </div>
            <div>
              <span className="text-[#5F6368]">Operating Hours: </span>
              <strong className="font-medium">{SUPPORT_CONTACT.authHours}</strong>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setHelpOpen(false)}
              className="rounded-full bg-[#A22630] px-5 py-2 text-sm font-medium text-white hover:bg-[#8A1F28]"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SecurityModal() {
  const { securityOpen, setSecurityOpen, resetDemoData } = useLms();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  if (!securityOpen) return null;

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || newPassword !== confirmPassword) {
      setStatusMessage("Please check your password fields and try again.");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setStatusMessage("Password updated for this session.");
  };

  const handleReset = () => {
    resetDemoData();
    setStatusMessage("Demo progress, grades, and comments reset to defaults.");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="security-modal-title"
    >
      <div className="classroom-card w-full max-w-md overflow-hidden bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#DADCE0] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(162,38,48,0.08)] text-[#A22630]">
              <Lock className="h-4 w-4" />
            </span>
            <h2
              id="security-modal-title"
              className="font-display text-lg font-medium text-[#202124]"
            >
              Security &amp; Password
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setSecurityOpen(false)}
            aria-label="Close Security modal"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#5F6368] hover:bg-[#F1F3F4]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handlePasswordUpdate} className="space-y-3.5 p-6">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#5F6368]">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full rounded-lg border border-[#DADCE0] bg-[#F8F9FA] px-3 py-2 text-sm focus:border-[#A22630] focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#5F6368]">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full rounded-lg border border-[#DADCE0] bg-[#F8F9FA] px-3 py-2 text-sm focus:border-[#A22630] focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#5F6368]">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full rounded-lg border border-[#DADCE0] bg-[#F8F9FA] px-3 py-2 text-sm focus:border-[#A22630] focus:bg-white focus:outline-none"
            />
          </div>

          {statusMessage && (
            <p className="rounded-md bg-[rgba(255,178,0,0.14)] px-3 py-2 text-xs font-medium text-[#202124]">
              {statusMessage}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#DADCE0] px-3.5 py-2 text-xs font-medium text-[#5F6368] hover:bg-[#F1F3F4]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Demo Data
            </button>
            <button
              type="submit"
              className="rounded-full bg-[#A22630] px-5 py-2 text-sm font-medium text-white hover:bg-[#8A1F28]"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
