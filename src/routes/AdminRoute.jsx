import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

// Component bảo vệ các routes của admin
// Chỉ cho phép truy cập nếu user đã đăng nhập VÀ có role là admin
export default function AdminRoute() {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  // Đang loading thì hiển thị loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Chưa đăng nhập thì redirect về login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Đã đăng nhập nhưng không phải admin thì redirect về home
  // TODO: Cập nhật logic kiểm tra role khi có API trả về role
  // Hiện tại tạm thời cho phép tất cả user đã đăng nhập truy cập admin
  // if (user?.role !== 'admin') {
  //   return <Navigate to="/" replace />;
  // }

  // Nếu là admin thì cho phép truy cập
  return <Outlet />;
}

