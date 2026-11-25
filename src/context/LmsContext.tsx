"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  INITIAL_COMMENTS,
  INITIAL_GRADES,
  INITIAL_MESSAGES,
  INITIAL_NOTIFICATIONS,
  INITIAL_PROGRESS,
  LESSON_MODULES,
} from "@/data/lms-data";
import {
  ChatMessage,
  FeedbackComment,
  GradeItem,
  NotificationItem,
} from "@/types/lms";

const STORAGE_KEY = "erudite-sap-b1-lms-v1";

interface ProgressState {
  [slug: string]: {
    pagesRead: number;
    videoWatched: boolean;
  };
}

interface PersistedState {
  isAuthenticated: boolean;
  progress: ProgressState;
  grades: GradeItem[];
  comments: FeedbackComment[];
  messages: ChatMessage[];
  notifications: NotificationItem[];
}

interface LmsContextValue {
  isHydrated: boolean;
  isAuthenticated: boolean;
  sidebarCollapsed: boolean;
  mobileDrawerOpen: boolean;
  openMenu: "lessons" | "quiz" | null;
  feedbackOpen: boolean;
  helpOpen: boolean;
  securityOpen: boolean;
  notificationsOpen: boolean;
  progress: ProgressState;
  grades: GradeItem[];
  comments: FeedbackComment[];
  messages: ChatMessage[];
  notifications: NotificationItem[];
  login: (email: string) => void;
  logout: () => void;
  toggleSidebar: () => void;
  setMobileDrawerOpen: (open: boolean) => void;
  setOpenMenu: React.Dispatch<
    React.SetStateAction<"lessons" | "quiz" | null>
  >;
  setFeedbackOpen: (open: boolean) => void;
  setHelpOpen: (open: boolean) => void;
  setSecurityOpen: (open: boolean) => void;
  setNotificationsOpen: (open: boolean) => void;
  markPageRead: (slug: string, pageNumber: number) => void;
  toggleVideoWatched: (slug: string) => void;
  submitQuizScore: (slug: string, correct: number, total: number) => void;
  addFeedbackComment: (subject: string, comment: string) => void;
  sendMessage: (text: string) => void;
  markAllNotificationsRead: () => void;
  resetDemoData: () => void;
}

const defaultPersisted: PersistedState = {
  isAuthenticated: false,
  progress: INITIAL_PROGRESS,
  grades: INITIAL_GRADES,
  comments: INITIAL_COMMENTS,
  messages: INITIAL_MESSAGES,
  notifications: INITIAL_NOTIFICATIONS,
};

const LmsContext = createContext<LmsContextValue | null>(null);

export function LmsProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [state, setState] = useState<PersistedState>(defaultPersisted);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"lessons" | "quiz" | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [securityOpen, setSecurityOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<PersistedState>;
          setState({
            isAuthenticated: parsed.isAuthenticated ?? false,
            progress: parsed.progress ?? INITIAL_PROGRESS,
            grades: parsed.grades ?? INITIAL_GRADES,
            comments: parsed.comments ?? INITIAL_COMMENTS,
            messages: parsed.messages ?? INITIAL_MESSAGES,
            notifications: parsed.notifications ?? INITIAL_NOTIFICATIONS,
          });
        }
      } catch {
        // Ignore malformed localStorage
      }
      setIsHydrated(true);
    });
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }, [state, isHydrated]);

  const login = () => {
    setState((prev) => ({ ...prev, isAuthenticated: true }));
  };

  const logout = () => {
    setState((prev) => ({ ...prev, isAuthenticated: false }));
    setMobileDrawerOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const markPageRead = (slug: string, pageNumber: number) => {
    const mod = LESSON_MODULES.find((m) => m.slug === slug);
    const maxPages = mod?.totalPages ?? pageNumber;
    setState((prev) => {
      const current = prev.progress[slug]?.pagesRead ?? 0;
      const nextRead = Math.min(maxPages, Math.max(current, pageNumber));
      if (nextRead === current) return prev;
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [slug]: {
            pagesRead: nextRead,
            videoWatched: prev.progress[slug]?.videoWatched ?? false,
          },
        },
      };
    });
  };

  const toggleVideoWatched = (slug: string) => {
    setState((prev) => {
      const current = prev.progress[slug] ?? { pagesRead: 0, videoWatched: false };
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [slug]: {
            ...current,
            videoWatched: !current.videoWatched,
          },
        },
      };
    });
  };

  const submitQuizScore = (slug: string, correct: number, total: number) => {
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    setState((prev) => ({
      ...prev,
      grades: prev.grades.map((g) =>
        g.slug === slug
          ? {
              ...g,
              score: `${correct}/${total}`,
              rating: String(percentage),
            }
          : g
      ),
      notifications: [
        {
          id: `n-${Date.now()}`,
          title: `Quiz Completed`,
          detail: `Scored ${correct}/${total} (${percentage}%) on ${
            LESSON_MODULES.find((m) => m.slug === slug)?.shortTitle ?? slug
          }.`,
          time: "Just now",
          unread: true,
        },
        ...prev.notifications,
      ],
    }));
  };

  const addFeedbackComment = (subject: string, comment: string) => {
    const item: FeedbackComment = {
      id: `fb-${Date.now()}`,
      subject: subject.trim(),
      comment: comment.trim(),
      createdAt: "Just now",
      author: "NEIL ALFRED JAGORIN SIERRA",
    };
    setState((prev) => ({
      ...prev,
      comments: [item, ...prev.comments],
    }));
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "student",
      senderName: "NEIL ALFRED JAGORIN SIERRA",
      text: trimmed,
      timestamp: "Just now",
    };
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, msg],
    }));
  };

  const markAllNotificationsRead = () => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, unread: false })),
    }));
  };

  const resetDemoData = () => {
    setState(defaultPersisted);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <LmsContext.Provider
      value={{
        isHydrated,
        isAuthenticated: state.isAuthenticated,
        sidebarCollapsed,
        mobileDrawerOpen,
        openMenu,
        feedbackOpen,
        helpOpen,
        securityOpen,
        notificationsOpen,
        progress: state.progress,
        grades: state.grades,
        comments: state.comments,
        messages: state.messages,
        notifications: state.notifications,
        login,
        logout,
        toggleSidebar,
        setMobileDrawerOpen,
        setOpenMenu,
        setFeedbackOpen,
        setHelpOpen,
        setSecurityOpen,
        setNotificationsOpen,
        markPageRead,
        toggleVideoWatched,
        submitQuizScore,
        addFeedbackComment,
        sendMessage,
        markAllNotificationsRead,
        resetDemoData,
      }}
    >
      {children}
    </LmsContext.Provider>
  );
}

export function useLms() {
  const ctx = useContext(LmsContext);
  if (!ctx) {
    throw new Error("useLms must be used within LmsProvider");
  }
  return ctx;
}
