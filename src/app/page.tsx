"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  LogIn,
  Mail,
  X,
} from "lucide-react";
import { useLms } from "@/context/LmsContext";
import { Footer } from "@/components/layout/Footer";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useLms();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [dialogMode, setDialogMode] = useState<"forgot" | "register" | null>(
    null
  );
  const [dialogEmail, setDialogEmail] = useState("");
  const [dialogSent, setDialogSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both your email address and password.");
      return;
    }
    login(email);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F1F3F4]">
      <main
        className="relative flex min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/lpu-background.jpg?v=2')" }}
      >
        <div className="absolute inset-0 bg-black/75" aria-hidden="true" />

        {/* Left Login Sidebar */}
        <aside className="relative z-10 flex w-full shrink-0 flex-col border-r border-[#5E1319] bg-[#7A1B23] text-white shadow-2xl md:w-[440px] lg:w-[460px]">
          {/* Accent Top Strip */}
          <div className="h-1.5 w-full bg-[#FFB200]" />

          <div className="flex flex-1 flex-col justify-center px-7 py-10 sm:px-10">
            {/* Branding Header */}
            <div className="flex flex-col items-center border-b border-white/15 pb-5 text-center">
              <div className="flex items-center justify-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white p-1.5 shadow-sm">
                  <img
                    src="/assets/lpu-logo.png"
                    alt="Lyceum of the Philippines University"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="h-10 w-px bg-white/25" />
                <img
                  src="/assets/sap-b1-logo.png"
                  alt="SAP Business One"
                  className="h-10 w-auto object-contain"
                />
              </div>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1">
                <GraduationCap className="h-3.5 w-3.5 text-[#FFB200]" />
                <span className="font-display text-xs font-semibold tracking-wider text-white">
                  STUDENT LOGIN
                </span>
              </div>
              <p className="mt-1.5 text-xs text-white/80">
                Erudite SAP Business One Learning Management System
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-1.5 block text-xs font-medium text-white/95"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F6368]" />
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Enter your Email"
                    className="w-full rounded-lg border border-white/25 bg-white py-2.5 pl-10 pr-3.5 text-sm text-[#202124] placeholder:text-[#80868B] focus:border-[#FFB200] focus:outline-none focus:ring-2 focus:ring-[#FFB200]/40"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="mb-1.5 block text-xs font-medium text-white/95"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F6368]" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-white/25 bg-white py-2.5 pl-10 pr-11 text-sm text-[#202124] placeholder:text-[#80868B] focus:border-[#FFB200] focus:outline-none focus:ring-2 focus:ring-[#FFB200]/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#5F6368] hover:bg-[#F1F3F4]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="mt-1.5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setDialogMode("forgot");
                      setDialogSent(false);
                      setDialogEmail("");
                    }}
                    className="text-xs font-medium text-[#FFB200] hover:underline"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

              {error && (
                <p className="rounded-md bg-white/15 px-3 py-2 text-xs font-medium text-[#FFB200]">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FFB200] px-5 py-2.5 text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5A000]"
              >
                <LogIn className="h-4 w-4" />
                Log In
              </button>
            </form>

            <div className="mt-6 border-t border-white/20 pt-4 text-center text-xs text-white/85">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setDialogMode("register");
                  setDialogSent(false);
                  setDialogEmail("");
                }}
                className="font-semibold text-[#FFB200] hover:underline"
              >
                Register Here!
              </button>
            </div>
          </div>
        </aside>

        {/* Right Campus Backdrop Area */}
        <div className="relative z-10 hidden flex-1 items-end p-10 md:flex">
          <div className="max-w-md rounded-xl border border-white/15 bg-black/35 px-6 py-4 text-white backdrop-blur-sm">
            <p className="font-display text-sm font-semibold text-[#FFB200]">
              Lyceum of the Philippines University — Cavite
            </p>
            <p className="mt-1 text-xs leading-relaxed text-white/85">
              Erudite SAP Business One Learning Management System
            </p>
          </div>
        </div>
      </main>

      <Footer variant="login" />

      {dialogMode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="classroom-card w-full max-w-sm bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#DADCE0] pb-3">
              <h2 className="font-display text-base font-semibold text-[#202124]">
                {dialogMode === "forgot"
                  ? "Reset Your Password"
                  : "Student Registration"}
              </h2>
              <button
                type="button"
                onClick={() => setDialogMode(null)}
                className="rounded-lg p-1 text-[#5F6368] hover:bg-[#F1F3F4]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {dialogSent ? (
              <div className="mt-4 space-y-4">
                <p className="rounded-lg bg-[rgba(255,178,0,0.14)] p-3 text-xs text-[#202124]">
                  {dialogMode === "forgot"
                    ? "Password reset instructions have been sent to your LPU email."
                    : "Your registration request has been submitted for IT302-WM verification."}
                </p>
                <button
                  type="button"
                  onClick={() => setDialogMode(null)}
                  className="w-full rounded-full bg-[#A22630] py-2 text-sm font-medium text-white"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (dialogEmail.trim()) setDialogSent(true);
                }}
                className="mt-4 space-y-3"
              >
                <p className="text-xs text-[#5F6368]">
                  {dialogMode === "forgot"
                    ? "Enter your registered LPU email address to receive a reset link."
                    : "Enter your LPU email address to request Erudite SAP B1 LMS access."}
                </p>
                <input
                  type="email"
                  required
                  value={dialogEmail}
                  onChange={(e) => setDialogEmail(e.target.value)}
                  placeholder="student@lpunetwork.edu.ph"
                  className="w-full rounded-lg border border-[#DADCE0] bg-[#F8F9FA] px-3 py-2 text-sm focus:border-[#A22630] focus:bg-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#A22630] py-2 text-sm font-medium text-white hover:bg-[#8A1F28]"
                >
                  {dialogMode === "forgot" ? "Send Reset Link" : "Submit Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
