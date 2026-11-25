"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Award,
  Bell,
  BookOpen,
  ChevronDown,
  ClipboardCheck,
  HelpCircle,
  LayoutDashboard,
  Lock,
  LogOut,
  Menu,
  MessageSquarePlus,
  X,
} from "lucide-react";
import { useLms } from "@/context/LmsContext";
import { LESSON_MODULES, STUDENT_PROFILE } from "@/data/lms-data";
import { Footer } from "@/components/layout/Footer";
import { FeedbackModal } from "@/components/modals/FeedbackModal";
import { HelpModal, SecurityModal } from "@/components/modals/UtilityModals";
import { Tooltip } from "@/components/ui/Tooltip";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    isHydrated,
    isAuthenticated,
    sidebarCollapsed,
    mobileDrawerOpen,
    openMenu,
    notificationsOpen,
    notifications,
    toggleSidebar,
    setMobileDrawerOpen,
    setOpenMenu,
    setFeedbackOpen,
    setHelpOpen,
    setSecurityOpen,
    setNotificationsOpen,
    markAllNotificationsRead,
    logout,
  } = useLms();

  const lessonsOpen = openMenu === "lessons";
  const quizOpen = openMenu === "quiz";

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFFFF]">
        <div className="flex items-center gap-3 text-sm text-[#5F6368]">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#A22630] border-t-transparent" />
          Loading Erudite SAP Business One LMS...
        </div>
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => n.unread).length;

  const isDashboard = pathname === "/";
  const isGrades = pathname === "/grades";
  const isLessons = pathname.startsWith("/lessons");
  const isQuiz = pathname.startsWith("/quiz");

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navContent = (collapsed: boolean) => (
    <div className="flex h-full flex-col justify-between py-3">
      <div>
        {/* Institution Branding */}
        <div
          className={`flex items-center border-b border-[#DADCE0] pb-3 ${
            collapsed ? "justify-center px-2" : "gap-3 px-4"
          }`}
        >
          <Tooltip
            label={`${STUDENT_PROFILE.institution} — Cavite`}
            side="right"
            disabled={!collapsed}
          >
            <div
              className={`flex shrink-0 items-center justify-center rounded-lg border border-[#DADCE0] bg-white p-1 transition-all ${
                collapsed ? "h-11 w-11" : "h-12 w-12"
              }`}
            >
              <img
                src="/assets/lpu-logo.png"
                alt="LPU Logo"
                className="h-full w-full object-contain"
              />
            </div>
          </Tooltip>
          {collapsed ? (
            <span className="sr-only">{STUDENT_PROFILE.institutionShort}</span>
          ) : (
            <div className="min-w-0">
              <div className="font-display text-sm font-semibold tracking-tight text-[#A22630]">
                {STUDENT_PROFILE.institution} — Cavite
              </div>
              <div className="truncate text-[11px] text-[#5F6368]">
                Erudite SAP Business One
              </div>
            </div>
          )}
        </div>

        {/* Student Profile */}
        {!collapsed && (
          <div className="mx-3 mt-3 rounded-lg border border-[#DADCE0] bg-white p-3 text-[#202124]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#A22630] font-display text-xs font-semibold text-white">
                NS
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-[#202124]">
                  {STUDENT_PROFILE.name}
                </p>
                <p className="font-mono-code text-[11px] text-[#5F6368]">
                  {STUDENT_PROFILE.studentId}
                </p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-[#DADCE0] pt-2 text-[11px]">
              <span className="text-[#5F6368]">Course / Section</span>
              <span className="rounded bg-[rgba(255,178,0,0.14)] px-2 py-0.5 font-mono-code font-semibold text-[#202124]">
                {STUDENT_PROFILE.courseSection}
              </span>
            </div>
          </div>
        )}

        {/* Primary Menu */}
        <nav
          className={`mt-3 space-y-1 ${collapsed ? "px-2" : "pr-2"}`}
          aria-label="Primary Navigation"
        >
          <Tooltip label="Dashboard" side="right" fullWidth disabled={!collapsed}>
            <Link
              href="/"
              onClick={() => setMobileDrawerOpen(false)}
              className={`flex items-center gap-3 transition-colors ${
                isDashboard
                  ? "bg-[rgba(162,38,48,0.08)] font-semibold text-[#A22630]"
                  : "text-[#202124] hover:bg-[#E8EAED]"
              } ${
                collapsed
                  ? "h-11 w-full justify-center rounded-lg px-0"
                  : "rounded-r-full px-4 py-2.5 text-sm font-medium"
              }`}
              title="Dashboard"
            >
              <LayoutDashboard className="h-5 w-5 shrink-0" />
              {!collapsed && <span>Dashboard</span>}
            </Link>
          </Tooltip>

          <Tooltip label="Grade Summary" side="right" fullWidth disabled={!collapsed}>
            <Link
              href="/grades"
              onClick={() => setMobileDrawerOpen(false)}
              className={`flex items-center gap-3 transition-colors ${
                isGrades
                  ? "bg-[rgba(162,38,48,0.08)] font-semibold text-[#A22630]"
                  : "text-[#202124] hover:bg-[#E8EAED]"
              } ${
                collapsed
                  ? "h-11 w-full justify-center rounded-lg px-0"
                  : "rounded-r-full px-4 py-2.5 text-sm font-medium"
              }`}
              title="Grade Summary"
            >
              <Award className="h-5 w-5 shrink-0" />
              {!collapsed && <span>Grade Summary</span>}
            </Link>
          </Tooltip>

          {/* Expandable Lessons */}
          <div>
            <Tooltip label="Lessons" side="right" fullWidth disabled={!collapsed}>
              <div
                className={`flex w-full items-center transition-colors ${
                  isLessons
                    ? "bg-[rgba(162,38,48,0.08)] font-semibold text-[#A22630]"
                    : "text-[#202124] hover:bg-[#E8EAED]"
                } ${
                  collapsed
                    ? "h-11 w-full justify-center rounded-lg"
                    : "justify-between rounded-r-full"
                }`}
              >
                <Link
                  href="/lessons"
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    if (!collapsed) {
                      setOpenMenu((prev) =>
                        prev === "lessons" && pathname === "/lessons"
                          ? null
                          : "lessons"
                      );
                    }
                  }}
                  className={`flex items-center gap-3 ${
                    collapsed
                      ? "h-full w-full justify-center px-0"
                      : "flex-1 px-4 py-2.5 text-sm font-medium"
                  }`}
                  title="Lessons"
                >
                  <BookOpen className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>Lessons</span>}
                </Link>
                {!collapsed && (
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenu((prev) =>
                        prev === "lessons" ? null : "lessons"
                      )
                    }
                    aria-label="Toggle Lessons submenu"
                    className="mr-2 rounded-lg p-1 hover:bg-black/5"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        lessonsOpen ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  </button>
                )}
              </div>
            </Tooltip>

            {!collapsed && (
              <div
                aria-hidden={!lessonsOpen}
                className={`grid transition-all duration-200 ease-out ${
                  lessonsOpen
                    ? "mt-1 grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="space-y-0.5 overflow-hidden">
                  {LESSON_MODULES.map((mod) => {
                    const active = pathname === `/lessons/${mod.slug}`;
                    return (
                      <Link
                        key={mod.slug}
                        href={`/lessons/${mod.slug}`}
                        tabIndex={lessonsOpen ? 0 : -1}
                        onClick={() => setMobileDrawerOpen(false)}
                        className={`flex items-center gap-2.5 rounded-r-full pl-9 pr-3 py-2 text-xs transition-colors ${
                          active
                            ? "bg-[rgba(162,38,48,0.08)] font-semibold text-[#A22630]"
                            : "text-[#5F6368] hover:bg-[#E8EAED] hover:text-[#202124]"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 shrink-0 rounded-full ${
                            active ? "bg-[#A22630]" : "bg-[#9AA0A6]"
                          }`}
                        />
                        <span className="truncate">{mod.shortTitle}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="my-2 border-t border-[#DADCE0]" />

          {/* Assessment Section */}
          {!collapsed && (
            <div className="px-4 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#5F6368]">
              Assessment
            </div>
          )}

          {/* Expandable Quiz */}
          <div>
            <Tooltip label="Quiz Assessments" side="right" fullWidth disabled={!collapsed}>
              <div
                className={`flex w-full items-center transition-colors ${
                  isQuiz
                    ? "bg-[rgba(162,38,48,0.08)] font-semibold text-[#A22630]"
                    : "text-[#202124] hover:bg-[#E8EAED]"
                } ${
                  collapsed
                    ? "h-11 w-full justify-center rounded-lg"
                    : "justify-between rounded-r-full"
                }`}
              >
                <Link
                  href="/quiz"
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    if (!collapsed) {
                      setOpenMenu((prev) =>
                        prev === "quiz" && pathname === "/quiz" ? null : "quiz"
                      );
                    }
                  }}
                  className={`flex items-center gap-3 ${
                    collapsed
                      ? "h-full w-full justify-center px-0"
                      : "flex-1 px-4 py-2.5 text-sm font-medium"
                  }`}
                  title="Quiz"
                >
                  <ClipboardCheck className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>Quiz</span>}
                </Link>
                {!collapsed && (
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenu((prev) => (prev === "quiz" ? null : "quiz"))
                    }
                    aria-label="Toggle Quiz submenu"
                    className="mr-2 rounded-lg p-1 hover:bg-black/5"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        quizOpen ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  </button>
                )}
              </div>
            </Tooltip>

            {!collapsed && (
              <div
                aria-hidden={!quizOpen}
                className={`grid transition-all duration-200 ease-out ${
                  quizOpen
                    ? "mt-1 grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="space-y-0.5 overflow-hidden">
                  {LESSON_MODULES.map((mod) => {
                    const active = pathname === `/quiz/${mod.slug}`;
                    return (
                      <Link
                        key={mod.slug}
                        href={`/quiz/${mod.slug}`}
                        tabIndex={quizOpen ? 0 : -1}
                        onClick={() => setMobileDrawerOpen(false)}
                        className={`flex items-center gap-2.5 rounded-r-full pl-9 pr-3 py-2 text-xs transition-colors ${
                          active
                            ? "bg-[rgba(162,38,48,0.08)] font-semibold text-[#A22630]"
                            : "text-[#5F6368] hover:bg-[#E8EAED] hover:text-[#202124]"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 shrink-0 rounded-full ${
                            active ? "bg-[#A22630]" : "bg-[#9AA0A6]"
                          }`}
                        />
                        <span className="truncate">{mod.shortTitle}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Comments & Feedback */}
          <Tooltip label="Comments & Feedback" side="right" fullWidth disabled={!collapsed}>
            <button
              type="button"
              onClick={() => {
                setMobileDrawerOpen(false);
                setFeedbackOpen(true);
              }}
              className={`flex w-full items-center gap-3 text-[#202124] transition-colors hover:bg-[#E8EAED] ${
                collapsed
                  ? "h-11 justify-center rounded-lg px-0"
                  : "rounded-r-full px-4 py-2.5 text-sm font-medium"
              }`}
              title="Comments & Feedback"
            >
              <MessageSquarePlus className="h-5 w-5 shrink-0 text-[#5F6368]" />
              {!collapsed && <span>Comments &amp; Feedback</span>}
            </button>
          </Tooltip>
        </nav>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#F1F3F4]">
      {/* Sticky Top App Bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-2 border-b border-[#5E1319] bg-[#7A1B23] px-2.5 text-white sm:px-4">
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          {/* Desktop Sidebar Toggle */}
          <Tooltip
            label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            side="bottom"
            align="start"
          >
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
              className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white/90 hover:bg-white/15 lg:flex"
            >
              <Menu className="h-5 w-5" />
            </button>
          </Tooltip>

          {/* Mobile Drawer Toggle */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Open navigation menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white/90 hover:bg-white/15 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="flex min-w-0 items-center gap-2">
            <span className="flex shrink-0 items-center rounded-md bg-[#7A1B23] px-1.5 py-1 sm:px-2">
              <img
                src="/assets/sap-b1-logo.png"
                alt="SAP Business One"
                className="h-5 w-auto object-contain sm:h-6"
              />
            </span>
            <span className="hidden truncate font-display text-sm font-semibold text-white sm:inline xl:hidden">
              Erudite LMS
            </span>
            <div className="hidden items-center gap-1.5 truncate text-sm xl:flex">
              <span className="font-display font-semibold text-white">
                Erudite LMS
              </span>
              <span className="text-white/40">/</span>
              <span className="truncate font-medium text-white/85">
                SAP Business One ({STUDENT_PROFILE.courseSection})
              </span>
            </div>
          </Link>
        </div>

        {/* Center Classroom-style Quick Tabs on Desktop/Tablet */}
        <nav
          aria-label="Workspace Tabs"
          className="hidden h-full shrink-0 items-center gap-0.5 md:flex lg:gap-1"
        >
          {[
            { href: "/", label: "Dashboard", active: isDashboard },
            { href: "/lessons", label: "Lessons", active: isLessons },
            { href: "/grades", label: "Grade Summary", active: isGrades },
          ].map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative flex h-full items-center whitespace-nowrap px-2.5 text-sm font-medium transition-colors lg:px-4 ${
                tab.active
                  ? "font-semibold text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
              {tab.active && (
                <span className="absolute bottom-0 left-2 right-2 h-[3px] rounded-t-full bg-[#FFB200]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Utility Actions */}
        <div className="relative flex shrink-0 items-center gap-0.5 sm:gap-1">
          <Tooltip label="Help & Support" side="bottom">
            <button
              type="button"
              onClick={() => setHelpOpen(true)}
              aria-label="Help"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-white/90 hover:bg-white/15 sm:h-11 sm:px-2.5"
            >
              <HelpCircle className="h-5 w-5" />
              <span className="hidden sm:inline">Help</span>
            </button>
          </Tooltip>

          <Tooltip label="Security & Password" side="bottom">
            <button
              type="button"
              onClick={() => setSecurityOpen(true)}
              aria-label="Security / Password"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/90 hover:bg-white/15 sm:h-11 sm:w-11"
            >
              <Lock className="h-5 w-5" />
            </button>
          </Tooltip>

          <div className="relative">
            <Tooltip label="Notifications" side="bottom" align="end">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Notifications"
                className="relative flex h-9 w-9 items-center justify-center rounded-lg text-white/90 hover:bg-white/15 sm:h-11 sm:w-11"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#FFB200] px-1 text-[10px] font-bold text-[#202124] sm:right-1.5 sm:top-1.5">
                    {unreadCount}
                  </span>
                )}
              </button>
            </Tooltip>

            {notificationsOpen && (
              <div className="classroom-card fixed left-4 right-4 top-16 z-40 bg-white shadow-lg sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-80">
                <div className="flex items-center justify-between border-b border-[#DADCE0] px-4 py-3">
                  <span className="text-sm font-medium text-[#202124]">
                    Notifications
                  </span>
                  <button
                    type="button"
                    onClick={markAllNotificationsRead}
                    className="text-xs font-medium text-[#A22630] hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-72 divide-y divide-[#F1F3F4] overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-3 ${
                        n.unread ? "bg-[rgba(162,38,48,0.04)]" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-medium text-[#202124]">
                          {n.title}
                        </p>
                        {n.unread && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#FFB200]" />
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-[#5F6368]">
                        {n.detail}
                      </p>
                      <span className="mt-1 block text-[10px] text-[#80868B]">
                        {n.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Tooltip label="Sign out" side="bottom" align="end">
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Logout"
              className="ml-0.5 inline-flex h-9 items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-white/20 sm:ml-1 sm:h-10 sm:px-3"
            >
              <LogOut className="h-4 w-4 text-[#FFB200]" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </Tooltip>
        </div>
      </header>

      {/* Main Body with Collapsible Drawer */}
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden shrink-0 border-r border-[#DADCE0] bg-[#F8F9FA] text-[#202124] transition-all duration-200 lg:block ${
            sidebarCollapsed ? "w-[76px]" : "w-[300px]"
          }`}
        >
          <div
            className={`sticky top-16 h-[calc(100vh-4rem)] ${
              sidebarCollapsed
                ? "overflow-visible"
                : "sidebar-scroll overflow-y-auto"
            }`}
          >
            {navContent(sidebarCollapsed)}
          </div>
        </aside>

        {/* Mobile Overlay Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setMobileDrawerOpen(false)}
            />
            <aside className="relative z-10 flex w-[300px] max-w-[85vw] flex-col bg-[#F8F9FA] text-[#202124] shadow-xl">
              <div className="flex h-16 items-center justify-between border-b border-[#DADCE0] px-4">
                <span className="font-display text-sm font-semibold text-[#A22630]">
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[#5F6368] hover:bg-[#E8EAED]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="sidebar-scroll flex-1 overflow-y-auto">
                {navContent(false)}
              </div>
            </aside>
          </div>
        )}

        {/* Page Content + Footer */}
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="min-h-[calc(100vh-4rem)] flex-1 bg-[#F1F3F4]">
            {children}
          </main>
          <Footer variant="authenticated" />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="sticky bottom-0 z-20 flex items-center justify-around border-t border-[#DADCE0] bg-white py-2 md:hidden"
      >
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
            isDashboard ? "text-[#A22630]" : "text-[#5F6368]"
          }`}
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          href="/lessons"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
            isLessons ? "text-[#A22630]" : "text-[#5F6368]"
          }`}
        >
          <BookOpen className="h-5 w-5" />
          Lessons
        </Link>
        <Link
          href="/quiz"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
            isQuiz ? "text-[#A22630]" : "text-[#5F6368]"
          }`}
        >
          <ClipboardCheck className="h-5 w-5" />
          Quiz
        </Link>
        <Link
          href="/grades"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
            isGrades ? "text-[#A22630]" : "text-[#5F6368]"
          }`}
        >
          <Award className="h-5 w-5" />
          Grades
        </Link>
        <button
          type="button"
          onClick={() => setFeedbackOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[11px] font-medium text-[#5F6368]"
        >
          <MessageSquarePlus className="h-5 w-5" />
          Feedback
        </button>
      </nav>

      <FeedbackModal />
      <HelpModal />
      <SecurityModal />
    </div>
  );
}
