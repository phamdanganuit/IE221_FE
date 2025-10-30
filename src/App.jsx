import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastProvider, useToast } from "./contexts/ToastContext";
import ToastContainer from "./components/Toast";
import { useAuthStore } from "./store/authStore";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile";

function AppContent() {
  const { toasts, removeToast } = useToast();
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  // Khởi tạo auth state khi app load
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
