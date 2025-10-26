import { create } from "zustand";
import { getStoredToken, clearStoredToken, getProfile } from "../service/authService";

export const useAuthStore = create((set, get) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  // Khởi tạo auth state từ localStorage/sessionStorage
  initializeAuth: async () => {
    const storedToken = getStoredToken();
    if (storedToken) {
      set({ token: storedToken, isAuthenticated: true });
      
      // Lấy thông tin profile để có avatar
      try {
        const profile = await getProfile(storedToken);
        if (profile) {
          set({ user: profile });
        }
      } catch (error) {
        console.error("Lỗi lấy profile:", error);
      }
    }
  },

  // Lưu token & user sau khi đăng nhập
  setAuth: async (token, user = null) => {
    set({ token, user, isAuthenticated: true });
    
    // Nếu chưa có user info hoặc không có avatar, lấy từ API profile
    if (!user || !user.avatar) {
      try {
        const profile = await getProfile(token);
        if (profile) {
          set({ user: profile });
        }
      } catch (error) {
        console.error("Lỗi lấy profile:", error);
      }
    }
  },

  // Xóa token & user khi đăng xuất
  clearAuth: () => {
    clearStoredToken();
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
