import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Users,
  Grid3x3,
  Tag,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { logout } from "../../service/authService";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/admin",
  },
  {
    icon: ShoppingBag,
    label: "Sản phẩm",
    path: "/admin/products",
  },
  {
    icon: ShoppingCart,
    label: "Đơn hàng",
    path: "/admin/orders",
  },
  {
    icon: Users,
    label: "Khách hàng",
    path: "/admin/customers",
  },
  {
    icon: Grid3x3,
    label: "Danh mục",
    path: "/admin/categories",
  },
  {
    icon: Tag,
    label: "Thương hiệu",
    path: "/admin/brands",
  },
  {
    icon: BarChart3,
    label: "Thống kê",
    path: "/admin/analytics",
  },
  {
    icon: Settings,
    label: "Cài đặt",
    path: "/admin/settings",
  },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = async () => {
    try {
      await logout();
      clearAuth();
      navigate("/login");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-900 text-white">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        <img src="/Logo_main.svg" alt="Logo" className="h-8" />
        {/* <span className="ml-2 text-xl font-bold">Admin Panel</span> */}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${
                isActive ? "bg-gray-800 text-white border-l-4 border-blue-500" : ""
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="border-t border-gray-800 p-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}

