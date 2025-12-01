import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "../pages/HomePage";
import ViewCourseDetail from "../pages/ViewDetailCourse/ViewDetailCourse";
import Support from "../pages/Support/Support.jsx";
import SupportQuestionDetail from "../pages/Support/Question";
import FeedbackPage from "../pages/Feedback/Feedback";
import SessionDetailPage from "../pages/Session/Session";
export default function AppRouter() {
  const location = useLocation();
  useEffect(() => {
    const pathTitleMap = {
      "/home": "Home | Tutor Support System",
      //   "/change-password": "Change Password | Tutor Support System",
      //   "/reset-password": "Reset Password | Tutor Support System",
      "/view-course-detail": "Course Detail | Tutor Support System",
      "/support": "Support | Tutor Support System",
      "/support/question": "Question Detail | Tutor Support System",
      "/feedback": "Feedback | Tutor Support System",
      "/session": "Session Detail | Tutor Support System",
    };

    document.title = pathTitleMap[location.pathname] || "Tutor Support System";
  }, [location]);

  console.log("AppRouter rendered");

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      {/* <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} /> */}
      <Route path="/Course" element={<ViewCourseDetail />} />
      <Route path="/support" element={<Support />} />
      <Route path="/support/question" element={<SupportQuestionDetail />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/Course/:sessionId" element={<SessionDetailPage />} />
    </Routes>
  );
}
