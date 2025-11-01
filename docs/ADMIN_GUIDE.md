# Hướng dẫn sử dụng hệ thống Admin

## Mục lục
1. [Giới thiệu](#giới-thiệu)
2. [Đăng nhập Admin](#đăng-nhập-admin)
3. [Các tính năng](#các-tính-năng)
4. [Cấu trúc hệ thống](#cấu-trúc-hệ-thống)

## Giới thiệu

Hệ thống Admin được thiết kế để quản lý toàn bộ website bán giày, bao gồm sản phẩm, đơn hàng, khách hàng, danh mục, thương hiệu và các cài đặt hệ thống.

## Đăng nhập Admin

1. Truy cập `/admin` hoặc đăng nhập qua `/login`
2. Sử dụng tài khoản có quyền admin
3. Hệ thống sẽ tự động chuyển hướng đến Dashboard

**Lưu ý**: Hiện tại, tất cả user đã đăng nhập đều có thể truy cập admin. Trong production, cần cập nhật logic kiểm tra role trong `src/routes/AdminRoute.jsx`.

## Các tính năng

### 1. Dashboard (`/admin`)
- **Tổng quan thống kê**: Hiển thị các số liệu quan trọng như doanh thu, đơn hàng, khách hàng, sản phẩm
- **Biểu đồ doanh thu**: Theo dõi doanh thu và số lượng đơn hàng theo thời gian
- **Phân bố danh mục**: Thống kê sản phẩm theo từng danh mục
- **Đơn hàng gần đây**: Danh sách các đơn hàng mới nhất

### 2. Quản lý Sản phẩm (`/admin/products`)
- **Danh sách sản phẩm**: Hiển thị tất cả sản phẩm với thông tin chi tiết
- **Tìm kiếm & Lọc**: 
  - Tìm kiếm theo tên sản phẩm
  - Lọc theo danh mục
  - Lọc theo thương hiệu
- **Thao tác**:
  - Thêm sản phẩm mới
  - Chỉnh sửa sản phẩm
  - Xóa sản phẩm
  - Xem chi tiết sản phẩm
- **Thông tin hiển thị**: Hình ảnh, tên, giá, tồn kho, đã bán, trạng thái

### 3. Quản lý Đơn hàng (`/admin/orders`)
- **Danh sách đơn hàng**: Hiển thị tất cả đơn hàng
- **Thống kê nhanh**: Số lượng đơn theo từng trạng thái
- **Tìm kiếm & Lọc**:
  - Tìm kiếm theo mã đơn, khách hàng
  - Lọc theo trạng thái đơn hàng
  - Lọc theo trạng thái thanh toán
- **Quản lý trạng thái**:
  - Chờ xác nhận
  - Đang xử lý
  - Đang giao
  - Hoàn thành
  - Đã hủy
- **Xem chi tiết**: Thông tin khách hàng, sản phẩm, thanh toán

### 4. Quản lý Khách hàng (`/admin/customers`)
- **Danh sách khách hàng**: Hiển thị tất cả khách hàng
- **Thống kê**: Tổng khách hàng, đang hoạt động, VIP, không hoạt động
- **Tìm kiếm**: Theo tên, email, số điện thoại
- **Lọc**: Theo trạng thái khách hàng
- **Thông tin chi tiết**:
  - Thông tin liên hệ
  - Số đơn hàng
  - Tổng chi tiêu
  - Đơn hàng gần nhất
  - Ngày tham gia

### 5. Quản lý Danh mục (`/admin/categories`)
- **Danh sách danh mục**: Hiển thị dạng grid với hình ảnh
- **Thao tác**:
  - Thêm danh mục mới
  - Chỉnh sửa danh mục
  - Xóa danh mục
- **Thông tin**: Tên, mô tả, slug, số lượng sản phẩm, trạng thái
- **Auto-generate slug**: Tự động tạo slug từ tên danh mục

### 6. Quản lý Thương hiệu (`/admin/brands`)
- **Danh sách thương hiệu**: Hiển thị dạng grid với logo
- **Thao tác**:
  - Thêm thương hiệu mới
  - Chỉnh sửa thương hiệu
  - Xóa thương hiệu
- **Thông tin**: Tên, mô tả, slug, website, quốc gia, số lượng sản phẩm
- **Auto-generate slug**: Tự động tạo slug từ tên thương hiệu

### 7. Thống kê & Phân tích (`/admin/analytics`)
- **Chỉ số chính**: Doanh thu, đơn hàng, khách hàng mới, giá trị TB/đơn
- **Biểu đồ doanh thu theo ngày**: Line chart theo dõi xu hướng
- **Phân khúc khách hàng**: Pie chart phân loại khách hàng
- **Top sản phẩm bán chạy**: Bar chart hiển thị sản phẩm hot
- **Đơn hàng theo giờ**: Line chart phân tích giờ cao điểm
- **Nguồn truy cập**: Progress bar hiển thị traffic sources
- **Bộ lọc thời gian**: 7 ngày, 30 ngày, 90 ngày, năm, tùy chỉnh

### 8. Cài đặt Hệ thống (`/admin/settings`)
Được chia thành các tab:

#### Cài đặt chung
- Tên cửa hàng
- Email & Số điện thoại
- Địa chỉ
- Đơn vị tiền tệ
- Múi giờ

#### Email & Thông báo
- Bật/tắt thông báo email
- Xác nhận đơn hàng
- Theo dõi vận chuyển
- Email khuyến mãi

#### Thanh toán
- COD (Thanh toán khi nhận hàng)
- Chuyển khoản ngân hàng
- Thẻ tín dụng
- Ví điện tử

#### Vận chuyển
- Ngưỡng miễn phí vận chuyển
- Phí vận chuyển tiêu chuẩn
- Thời gian giao hàng dự kiến

#### Bảo mật
- Xác thực hai yếu tố (2FA)
- Cho phép nhiều phiên đăng nhập
- Thời gian hết phiên

## Cấu trúc hệ thống

### Components
```
src/components/admin/
├── AdminLayout.jsx      # Layout chính cho admin
├── AdminSidebar.jsx     # Sidebar navigation
└── AdminHeader.jsx      # Header với search & user info
```

### Pages
```
src/pages/Admin/
├── Dashboard.jsx        # Trang chủ admin
├── Products.jsx         # Quản lý sản phẩm
├── Orders.jsx           # Quản lý đơn hàng
├── Customers.jsx        # Quản lý khách hàng
├── Categories.jsx       # Quản lý danh mục
├── Brands.jsx           # Quản lý thương hiệu
├── Analytics.jsx        # Thống kê & phân tích
├── Settings.jsx         # Cài đặt hệ thống
└── index.js            # Export tất cả pages
```

### Services
```
src/service/adminService.js  # API calls cho admin
```

### Routes
```
src/routes/AdminRoute.jsx    # Protected route cho admin
```

## API Integration

Tất cả các functions trong `adminService.js` đều sẵn sàng để kết nối với backend API. Chỉ cần:

1. Cấu hình `VITE_API_URL` trong file `.env`
2. Backend API cung cấp các endpoints theo format:
   - `/api/admin/dashboard/stats`
   - `/api/admin/products`
   - `/api/admin/orders`
   - `/api/admin/customers`
   - `/api/admin/categories`
   - `/api/admin/brands`
   - `/api/admin/analytics`

## Mock Data

Hiện tại, tất cả các trang đều sử dụng mock data để demo. Khi backend API sẵn sàng:

1. Import các functions từ `adminService.js`
2. Thay thế mock data bằng API calls
3. Xử lý loading states và errors

Ví dụ:
```javascript
import { getProducts } from "../../service/adminService";
import { useAuthStore } from "../../store/authStore";

const token = useAuthStore((state) => state.token);
const products = await getProducts(token, { page: 1, limit: 10 });
```

## Responsive Design

Giao diện được thiết kế responsive với Tailwind CSS:
- **Desktop**: Full layout với sidebar
- **Tablet**: Collapsed sidebar
- **Mobile**: Hamburger menu

## Icons

Sử dụng `lucide-react` cho tất cả icons. Xem thêm tại: https://lucide.dev/

## Charts

Sử dụng `recharts` cho tất cả biểu đồ. Xem thêm tại: https://recharts.org/

## Tùy chỉnh

### Thay đổi màu sắc
Sửa trong Tailwind config hoặc trực tiếp trong các class CSS.

### Thêm trang mới
1. Tạo file mới trong `src/pages/Admin/`
2. Thêm route trong `src/App.jsx`
3. Thêm menu item trong `AdminSidebar.jsx`

### Thêm API endpoint
1. Thêm function trong `src/service/adminService.js`
2. Sử dụng trong component tương ứng

## Bảo mật

**QUAN TRỌNG**: Trước khi deploy production:

1. **Cập nhật AdminRoute**: Sửa logic kiểm tra role trong `src/routes/AdminRoute.jsx`:
```javascript
if (user?.role !== 'admin') {
  return <Navigate to="/" replace />;
}
```

2. **Backend validation**: Đảm bảo tất cả API endpoints kiểm tra quyền admin

3. **Token security**: Sử dụng HTTPS và secure cookie storage

4. **Rate limiting**: Áp dụng rate limiting cho admin API

5. **Audit logs**: Log tất cả các thao tác của admin

## Hỗ trợ

Nếu có vấn đề hoặc câu hỏi, vui lòng liên hệ team phát triển.

---

**Phiên bản**: 1.0.0  
**Ngày cập nhật**: November 2025

