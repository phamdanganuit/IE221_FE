import { useState } from "react";
import { Plus, Edit2, Trash2, Image as ImageIcon } from "lucide-react";

// Mock data
const mockBrands = [
  {
    id: 1,
    name: "Nike",
    slug: "nike",
    description: "Thương hiệu thể thao hàng đầu thế giới",
    logo: null,
    website: "https://www.nike.com",
    productCount: 52,
    status: "active",
    country: "USA",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "Adidas",
    slug: "adidas",
    description: "Thương hiệu Đức chuyên về đồ thể thao",
    logo: null,
    website: "https://www.adidas.com",
    productCount: 48,
    status: "active",
    country: "Germany",
    createdAt: "2024-01-12",
  },
  {
    id: 3,
    name: "Puma",
    slug: "puma",
    description: "Thương hiệu thời trang thể thao",
    logo: null,
    website: "https://www.puma.com",
    productCount: 35,
    status: "active",
    country: "Germany",
    createdAt: "2024-01-15",
  },
  {
    id: 4,
    name: "Converse",
    slug: "converse",
    description: "Thương hiệu giày vải iconic",
    logo: null,
    website: "https://www.converse.com",
    productCount: 28,
    status: "active",
    country: "USA",
    createdAt: "2024-02-01",
  },
  {
    id: 5,
    name: "Vans",
    slug: "vans",
    description: "Thương hiệu giày skate nổi tiếng",
    logo: null,
    website: "https://www.vans.com",
    productCount: 24,
    status: "active",
    country: "USA",
    createdAt: "2024-02-10",
  },
  {
    id: 6,
    name: "New Balance",
    slug: "new-balance",
    description: "Giày chạy bộ chất lượng cao",
    logo: null,
    website: "https://www.newbalance.com",
    productCount: 20,
    status: "active",
    country: "USA",
    createdAt: "2024-02-20",
  },
];

const statusConfig = {
  active: { label: "Hoạt động", color: "bg-green-100 text-green-800" },
  inactive: { label: "Tạm ẩn", color: "bg-gray-100 text-gray-800" },
};

export default function Brands() {
  const [brands, setBrands] = useState(mockBrands);
  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    website: "",
    country: "",
    status: "active",
  });

  const handleAdd = () => {
    setEditingBrand(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      website: "",
      country: "",
      status: "active",
    });
    setShowModal(true);
  };

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      slug: brand.slug,
      description: brand.description,
      website: brand.website,
      country: brand.country,
      status: brand.status,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thương hiệu này?")) {
      setBrands(brands.filter((b) => b.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBrand) {
      // Update
      setBrands(
        brands.map((b) =>
          b.id === editingBrand.id ? { ...b, ...formData } : b
        )
      );
    } else {
      // Add new
      const newBrand = {
        id: Math.max(...brands.map((b) => b.id)) + 1,
        ...formData,
        productCount: 0,
        logo: null,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setBrands([...brands, newBrand]);
    }
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Auto-generate slug from name if name changes
      ...(name === "name" && {
        slug: value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/g, "d")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, ""),
      }),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Quản lý thương hiệu
          </h1>
          <p className="text-gray-500 mt-1">
            Quản lý các thương hiệu sản phẩm
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Thêm thương hiệu</span>
        </button>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Logo */}
            <div className="h-40 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-white text-4xl font-bold">
                  {brand.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900">
                  {brand.name}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    statusConfig[brand.status].color
                  }`}
                >
                  {statusConfig[brand.status].label}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {brand.description}
              </p>

              <div className="space-y-1 mb-3">
                {brand.website && (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline block truncate"
                  >
                    {brand.website}
                  </a>
                )}
                {brand.country && (
                  <p className="text-xs text-gray-500">
                    Xuất xứ: {brand.country}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="text-sm text-gray-500">
                  {brand.productCount} sản phẩm
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(brand)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(brand.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingBrand ? "Chỉnh sửa thương hiệu" : "Thêm thương hiệu mới"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên thương hiệu *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: Nike"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  placeholder="nike"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mô tả ngắn về thương hiệu..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://www.example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quốc gia
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: USA, Germany, Vietnam"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingBrand ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

