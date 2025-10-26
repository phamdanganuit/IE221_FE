# Hướng dẫn cấu hình Authentication

## Biến môi trường cần thiết

Tạo file `.env` trong thư mục gốc của dự án với nội dung sau:

```env
# Backend API URL
VITE_BACKEND_URL=https://api.shoe-shop.app/api

# Google OAuth Configuration
# Lấy từ Google Cloud Console: https://console.cloud.google.com/
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# Facebook OAuth Configuration  
# Lấy từ Facebook Developers: https://developers.facebook.com/
VITE_FACEBOOK_APP_ID=your_facebook_app_id_here
```

## Cấu hình Google OAuth

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Kích hoạt Google+ API
4. Tạo OAuth 2.0 credentials
5. Thêm domain của bạn vào Authorized JavaScript origins
6. Copy Client ID vào biến `VITE_GOOGLE_CLIENT_ID`

## Cấu hình Facebook OAuth

1. Truy cập [Facebook Developers](https://developers.facebook.com/)
2. Tạo app mới
3. Thêm Facebook Login product
4. Cấu hình Valid OAuth Redirect URIs
5. Copy App ID vào biến `VITE_FACEBOOK_APP_ID`

## Các tính năng đã được tích hợp

### 1. Đăng nhập cơ bản
- Email/Password authentication
- Remember me functionality
- Token được lưu trong localStorage/sessionStorage

### 2. Đăng ký tài khoản
- Validation đầy đủ cho email, password, displayName
- Password strength validation
- Terms & conditions agreement

### 3. Social Login
- Google OAuth integration
- Facebook OAuth integration
- Automatic token management

### 4. Auth Store (Zustand)
- Centralized state management
- Token persistence
- Simple user state

## API Endpoints được sử dụng

- `POST /login` - Đăng nhập cơ bản
- `POST /register` - Đăng ký tài khoản
- `POST /oauth/google` - Đăng nhập Google
- `POST /oauth/facebook` - Đăng nhập Facebook

## Cách sử dụng

### Trong component:
```jsx
import { useAuthStore } from '../store/authStore';

function MyComponent() {
  const { user, isAuthenticated, clearAuth } = useAuthStore();
  
  // Kiểm tra đăng nhập
  if (!isAuthenticated) {
    return <LoginForm />;
  }
  
  return <UserDashboard user={user} />;
}
```

### Khởi tạo auth state:
```jsx
import { useAuthStore } from '../store/authStore';

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  
  useEffect(() => {
    initializeAuth();
  }, []);
  
  return <Router />;
}
```

## Cấu trúc đơn giản

Hệ thống authentication này được thiết kế đơn giản, chỉ tập trung vào:
- ✅ Đăng ký tài khoản
- ✅ Đăng nhập cơ bản (email/password)
- ✅ Đăng nhập Google
- ✅ Đăng nhập Facebook
- ✅ Quản lý token cơ bản
- ✅ Auto-login khi có token

Không có các tính năng phức tạp như profile management, admin roles, hay các API bổ sung.
