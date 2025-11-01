import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data - Thay thế bằng API calls thực tế
const statsData = [
  {
    title: "Tổng doanh thu",
    value: "₫125,450,000",
    change: "+12.5%",
    isPositive: true,
    icon: DollarSign,
    color: "bg-blue-500",
  },
  {
    title: "Đơn hàng",
    value: "1,234",
    change: "+8.2%",
    isPositive: true,
    icon: ShoppingCart,
    color: "bg-green-500",
  },
  {
    title: "Khách hàng",
    value: "8,549",
    change: "+15.3%",
    isPositive: true,
    icon: Users,
    color: "bg-purple-500",
  },
  {
    title: "Sản phẩm",
    value: "456",
    change: "-2.1%",
    isPositive: false,
    icon: Package,
    color: "bg-orange-500",
  },
];

const revenueData = [
  { month: "T1", revenue: 45000000, orders: 120 },
  { month: "T2", revenue: 52000000, orders: 145 },
  { month: "T3", revenue: 48000000, orders: 132 },
  { month: "T4", revenue: 61000000, orders: 168 },
  { month: "T5", revenue: 55000000, orders: 152 },
  { month: "T6", revenue: 67000000, orders: 189 },
  { month: "T7", revenue: 72000000, orders: 201 },
  { month: "T8", revenue: 68000000, orders: 187 },
  { month: "T9", revenue: 75000000, orders: 215 },
  { month: "T10", revenue: 82000000, orders: 234 },
  { month: "T11", revenue: 89000000, orders: 256 },
  { month: "T12", revenue: 95000000, orders: 278 },
];

const categoryData = [
  { name: "Giày thể thao", value: 45, color: "#3B82F6" },
  { name: "Giày cao gót", value: 25, color: "#10B981" },
  { name: "Giày lười", value: 15, color: "#F59E0B" },
  { name: "Sandal", value: 10, color: "#8B5CF6" },
  { name: "Khác", value: 5, color: "#EF4444" },
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Nguyễn Văn A",
    product: "Nike Air Max 270",
    amount: "₫3,500,000",
    status: "completed",
    date: "2025-11-01",
  },
  {
    id: "ORD-002",
    customer: "Trần Thị B",
    product: "Adidas Ultraboost",
    amount: "₫4,200,000",
    status: "processing",
    date: "2025-11-01",
  },
  {
    id: "ORD-003",
    customer: "Lê Văn C",
    product: "Puma Suede Classic",
    amount: "₫2,800,000",
    status: "pending",
    date: "2025-11-01",
  },
  {
    id: "ORD-004",
    customer: "Phạm Thị D",
    product: "Converse Chuck Taylor",
    amount: "₫1,900,000",
    status: "completed",
    date: "2025-10-31",
  },
  {
    id: "ORD-005",
    customer: "Hoàng Văn E",
    product: "Vans Old Skool",
    amount: "₫2,300,000",
    status: "cancelled",
    date: "2025-10-31",
  },
];

const statusColors = {
  completed: "bg-green-100 text-green-800",
  processing: "bg-blue-100 text-blue-800",
  pending: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels = {
  completed: "Hoàn thành",
  processing: "Đang xử lý",
  pending: "Chờ xác nhận",
  cancelled: "Đã hủy",
};

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("month"); // week, month, year

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Tổng quan về hoạt động kinh doanh</p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">7 ngày qua</option>
            <option value="month">30 ngày qua</option>
            <option value="year">12 tháng qua</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  {stat.isPositive ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stat.isPositive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">so với tháng trước</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Doanh thu & Đơn hàng theo tháng
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => [
                  name === "revenue"
                    ? `₫${value.toLocaleString()}`
                    : value,
                  name === "revenue" ? "Doanh thu" : "Đơn hàng",
                ]}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Doanh thu"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke="#10B981"
                strokeWidth={2}
                name="Đơn hàng"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Phân bố theo danh mục
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Đơn hàng gần đây</h2>
        </div>
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
                  Số tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày đặt
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        statusColors[order.status]
                      }`}
                    >
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

