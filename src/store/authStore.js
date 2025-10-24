import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  user: null,

  // Lưu token & user sau khi đăng nhập
  setAuth: (token, user = null) => {
    set({ token,  user });
  },

  // Xóa token & user khi đăng xuất
  clearAuth: () => {
    set({ token: null, user: null });
  },
}));
