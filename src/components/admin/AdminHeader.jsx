import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, User, Home, UserCircle, LogOut, ChevronDown } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { logout } from "../../service/authService";

export default function AdminHeader() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      clearAuth();
      setShowUserMenu(false);
      navigate("/login");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
      clearAuth();
      navigate("/login");
    }
  };

  const handleHome = () => {
    navigate("/");
    setShowUserMenu(false);
  };

  const handleProfile = () => {
    navigate("/profile");
    setShowUserMenu(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile with Dropdown */}
        <div className="relative pl-4 border-l border-gray-300" ref={userMenuRef}>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || "Admin"}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {user?.name || user?.displayName || "Admin"}
              </span>
              <span className="text-xs text-gray-500">
                {user?.role || "Administrator"}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                showUserMenu ? "transform rotate-180" : ""
              }`}
            />
          </div>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 min-w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || user?.displayName || "Admin"}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={handleHome}
                className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-gray-900 hover:bg-gray-100 transition cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Về trang chủ</span>
              </button>
              <button
                onClick={handleProfile}
                className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-gray-900 hover:bg-gray-100 transition cursor-pointer"
              >
                <UserCircle className="w-4 h-4" />
                <span>Hồ sơ</span>
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

