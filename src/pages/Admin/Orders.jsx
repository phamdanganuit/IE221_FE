import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Download,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

// Mock data
const mockOrders = [
  {
    id: "ORD-001",
    customer: {
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0901234567",
    },
    items: [
      { product: "Nike Air Max 270", quantity: 1, price: 3500000 },
      { product: "Adidas Ultraboost", quantity: 1, price: 4200000 },
    ],
    total: 7700000,
    status: "completed",
    paymentMethod: "credit_card",
    paymentStatus: "paid",
    shippingAddress: "123 Đường ABC, Quận 1, TP.HCM",
    orderDate: "2025-11-01 10:30",
    completedDate: "2025-11-03 14:20",
  },
  {
    id: "ORD-002",
    customer: {
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0912345678",
    },
    items: [{ product: "Puma Suede Classic", quantity: 2, price: 2800000 }],
    total: 5600000,
    status: "processing",
    paymentMethod: "bank_transfer",
    paymentStatus: "paid",
    shippingAddress: "456 Đường XYZ, Quận 3, TP.HCM",
    orderDate: "2025-11-01 15:45",
    completedDate: null,
  },
  {
    id: "ORD-003",
    customer: {
      name: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0923456789",
    },
    items: [{ product: "Converse Chuck Taylor", quantity: 1, price: 1900000 }],
    total: 1900000,
    status: "pending",
    paymentMethod: "cod",
    paymentStatus: "pending",
    shippingAddress: "789 Đường DEF, Quận 5, TP.HCM",
    orderDate: "2025-11-01 18:20",
    completedDate: null,
  },
  {
    id: "ORD-004",
    customer: {
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      phone: "0934567890",
    },
    items: [{ product: "Vans Old Skool", quantity: 1, price: 2300000 }],
    total: 2300000,
    status: "cancelled",
    paymentMethod: "credit_card",
    paymentStatus: "refunded",
    shippingAddress: "321 Đường GHI, Quận 7, TP.HCM",
    orderDate: "2025-10-31 09:15",
    completedDate: null,
  },
  {
    id: "ORD-005",
    customer: {
      name: "Hoàng Văn E",
      email: "hoangvane@email.com",
      phone: "0945678901",
    },
    items: [{ product: "Nike Air Force 1", quantity: 1, price: 3200000 }],
    total: 3200000,
    status: "shipping",
    paymentMethod: "bank_transfer",
    paymentStatus: "paid",
    shippingAddress: "654 Đường JKL, Quận 10, TP.HCM",
    orderDate: "2025-10-31 14:30",
    completedDate: null,
  },
];

const statusConfig = {
  pending: {
    label: "Chờ xác nhận",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  processing: {
    label: "Đang xử lý",
    color: "bg-blue-100 text-blue-800",
    icon: Clock,
  },
  shipping: {
    label: "Đang giao",
    color: "bg-purple-100 text-purple-800",
    icon: Truck,
  },
  completed: {
    label: "Hoàn thành",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Đã hủy",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
};

const paymentStatusConfig = {
  pending: { label: "Chờ thanh toán", color: "text-yellow-600" },
  paid: { label: "Đã thanh toán", color: "text-green-600" },
  refunded: { label: "Đã hoàn tiền", color: "text-blue-600" },
  failed: { label: "Thất bại", color: "text-red-600" },
};

const paymentMethodConfig = {
  cod: "Thanh toán khi nhận hàng",
  credit_card: "Thẻ tín dụng",
  bank_transfer: "Chuyển khoản ngân hàng",
  e_wallet: "Ví điện tử",
};

export default function Orders() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    const matchesPaymentStatus =
      selectedPaymentStatus === "all" ||
      order.paymentStatus === selectedPaymentStatus;
    return matchesSearch && matchesStatus && matchesPaymentStatus;
  });

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getTotalItems = (items) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
          <p className="text-gray-500 mt-1">
            Quản lý và theo dõi các đơn hàng
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-5 h-5" />
          <span>Xuất báo cáo</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = orders.filter((o) => o.status === key).length;
          const Icon = config.icon;
          return (
            <div
              key={key}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{config.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {count}
                  </p>
                </div>
                <Icon className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm theo mã đơn, khách hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span>Bộ lọc</span>
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái đơn hàng
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả trạng thái</option>
                {Object.entries(statusConfig).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái thanh toán
              </label>
              <select
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả</option>
                {Object.entries(paymentStatusConfig).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã đơn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thanh toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày đặt
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {order.customer.name}
                      </div>
                      <div className="text-gray-500">{order.customer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getTotalItems(order.items)} sản phẩm
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₫{order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className={paymentStatusConfig[order.paymentStatus].color}>
                        {paymentStatusConfig[order.paymentStatus].label}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {paymentMethodConfig[order.paymentMethod]}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className={`px-2 py-1 text-xs font-semibold rounded-full border-none ${
                        statusConfig[order.status].color
                      }`}
                    >
                      {Object.entries(statusConfig).map(([key, config]) => (
                        <option key={key} value={key}>
                          {config.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.orderDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Hiển thị <span className="font-medium">1</span> đến{" "}
            <span className="font-medium">{filteredOrders.length}</span> trong{" "}
            <span className="font-medium">{orders.length}</span> kết quả
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Trước
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Sau
            </button>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Chi tiết đơn hàng {selectedOrder.id}
                  </h2>
                  <p className="text-gray-500 mt-1">{selectedOrder.orderDate}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">
                  Thông tin khách hàng
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-gray-600">Tên:</span>{" "}
                    <span className="font-medium">{selectedOrder.customer.name}</span>
                  </p>
                  <p>
                    <span className="text-gray-600">Email:</span>{" "}
                    {selectedOrder.customer.email}
                  </p>
                  <p>
                    <span className="text-gray-600">Số điện thoại:</span>{" "}
                    {selectedOrder.customer.phone}
                  </p>
                  <p>
                    <span className="text-gray-600">Địa chỉ giao hàng:</span>{" "}
                    {selectedOrder.shippingAddress}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Sản phẩm</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.product}
                        </p>
                        <p className="text-sm text-gray-500">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-gray-900">
                        ₫{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Info */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₫{selectedOrder.total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Phương thức:</span>
                  <span>{paymentMethodConfig[selectedOrder.paymentMethod]}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                  <span className="text-gray-600">Trạng thái thanh toán:</span>
                  <span className={paymentStatusConfig[selectedOrder.paymentStatus].color}>
                    {paymentStatusConfig[selectedOrder.paymentStatus].label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

