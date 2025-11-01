import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
} from "lucide-react";

// Mock data
const dailyRevenueData = [
  { date: "01/11", revenue: 5200000, orders: 45 },
  { date: "02/11", revenue: 6100000, orders: 52 },
  { date: "03/11", revenue: 4800000, orders: 41 },
  { date: "04/11", revenue: 7300000, orders: 63 },
  { date: "05/11", revenue: 5900000, orders: 48 },
  { date: "06/11", revenue: 8200000, orders: 71 },
  { date: "07/11", revenue: 6700000, orders: 55 },
];

const topProductsData = [
  { name: "Nike Air Max", sales: 234, revenue: 819000000 },
  { name: "Adidas Ultraboost", sales: 189, revenue: 793800000 },
  { name: "Puma Suede", sales: 167, revenue: 467600000 },
  { name: "Converse Chuck", sales: 156, revenue: 296400000 },
  { name: "Vans Old Skool", sales: 143, revenue: 328900000 },
];

const customerSegmentData = [
  { name: "Khách mới", value: 35, color: "#3B82F6" },
  { name: "Khách thường xuyên", value: 45, color: "#10B981" },
  { name: "Khách VIP", value: 15, color: "#8B5CF6" },
  { name: "Không hoạt động", value: 5, color: "#EF4444" },
];

const trafficSourceData = [
  { source: "Tìm kiếm tự nhiên", visitors: 12450, percentage: 42 },
  { source: "Trực tiếp", visitors: 8930, percentage: 30 },
  { source: "Mạng xã hội", visitors: 4780, percentage: 16 },
  { source: "Quảng cáo", visitors: 2850, percentage: 10 },
  { source: "Khác", visitors: 590, percentage: 2 },
];

const hourlyOrdersData = [
  { hour: "0h", orders: 5 },
  { hour: "3h", orders: 2 },
  { hour: "6h", orders: 8 },
  { hour: "9h", orders: 25 },
  { hour: "12h", orders: 45 },
  { hour: "15h", orders: 38 },
  { hour: "18h", orders: 52 },
  { hour: "21h", orders: 32 },
];

export default function Analytics() {
  const [dateRange, setDateRange] = useState("7days");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Thống kê & Phân tích</h1>
          <p className="text-gray-500 mt-1">
            Phân tích chi tiết về hiệu suất kinh doanh
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">7 ngày qua</option>
            <option value="30days">30 ngày qua</option>
            <option value="90days">90 ngày qua</option>
            <option value="year">Năm nay</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Calendar className="w-5 h-5" />
            <span>Tùy chỉnh</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Tổng doanh thu</span>
            <DollarSign className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">₫44.2M</p>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+12.5%</span>
            <span className="text-gray-500 ml-1">vs kỳ trước</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Đơn hàng</span>
            <ShoppingCart className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">375</p>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+8.2%</span>
            <span className="text-gray-500 ml-1">vs kỳ trước</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Khách hàng mới</span>
            <Users className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">127</p>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+15.3%</span>
            <span className="text-gray-500 ml-1">vs kỳ trước</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Giá trị TB/Đơn</span>
            <DollarSign className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">₫117.8K</p>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+4.1%</span>
            <span className="text-gray-500 ml-1">vs kỳ trước</span>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Doanh thu theo ngày
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyRevenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value) => `₫${value.toLocaleString()}`}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Segments */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Phân khúc khách hàng
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerSegmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {customerSegmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Top sản phẩm bán chạy
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip
                formatter={(value, name) => [
                  name === "sales" ? value : `₫${value.toLocaleString()}`,
                  name === "sales" ? "Đã bán" : "Doanh thu",
                ]}
              />
              <Bar dataKey="sales" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Orders */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Đơn hàng theo giờ
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyOrdersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ fill: "#8B5CF6", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            Nguồn truy cập website
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {trafficSourceData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-40 text-sm font-medium text-gray-900">
                  {item.source}
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-24 text-right text-sm text-gray-600">
                  {item.visitors.toLocaleString()} ({item.percentage}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

