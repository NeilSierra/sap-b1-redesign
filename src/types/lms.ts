export interface StudentProfile {
  name: string;
  studentId: string;
  courseSection: string;
  email: string;
  institution: string;
  institutionShort: string;
}

export interface DocumentPageSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface DocumentPage {
  pageNumber: number;
  classification: string;
  headerTitle: string;
  product: string;
  version: string;
  title?: string;
  subtitle?: string;
  sections: DocumentPageSection[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonModule {
  slug: string;
  shortTitle: string;
  title: string;
  startDate: string;
  endDate: string;
  status: "OPEN" | "CLOSED";
  description: string;
  thumbnail: string;
  totalPages: number;
  videoTitle: string;
  videoDuration: string;
  pages: DocumentPage[];
  quiz: QuizQuestion[];
}

export interface GradeItem {
  id: string;
  slug: string;
  topicName: string;
  category: "Quiz Assessment" | "SAP Hands-on Activities";
  score: string;
  rating: string;
}

export interface FeedbackComment {
  id: string;
  subject: string;
  comment: string;
  createdAt: string;
  author: string;
}

export interface ChatMessage {
  id: string;
  sender: "student" | "instructor";
  senderName: string;
  text: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  unread: boolean;
}
