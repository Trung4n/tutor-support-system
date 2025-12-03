import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "../pages/AuthPage/LoginPage";
import ChangePasswordPage from "../pages/AuthPage/ChangePasswordPage";
import ResetPasswordPage from "../pages/AuthPage/ResetPasswordPage";

export default function AppRouter() {
  const location = useLocation();

  useEffect(() => {
    // Set title theo pathname
    const pathTitleMap = {
      "/login": "Login | Tutor Support System",
      "/change-password": "Change Password | Tutor Support System",
      "/reset-password": "Reset Password | Tutor Support System",
    };
    document.title = pathTitleMap[location.pathname] || "Tutor Support System";

    // Lấy token từ query param nếu có
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      console.log("Token from URL:", token);
      // Bạn có thể lưu vào localStorage hoặc context
      localStorage.setItem("token", token);
    }
  }, [location]);

  console.log("AppRouter rendered");

  return (
    <Routes>
      {/* Redirect "/" sang "/login" */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Các route auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
}
