const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// ==================== DASHBOARD ====================
export const getDashboardStats = async (token) => {
  try {
    const response = await fetch(`${API_URL}/admin/dashboard/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch dashboard stats");
    return await response.json();
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};

// ==================== PRODUCTS ====================
export const getProducts = async (token, params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/admin/products?${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProduct = async (token, productId) => {
  try {
    const response = await fetch(`${API_URL}/admin/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch product");
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const createProduct = async (token, productData) => {
  try {
    const response = await fetch(`${API_URL}/admin/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error("Failed to create product");
    return await response.json();
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (token, productId, productData) => {
  try {
    const response = await fetch(`${API_URL}/admin/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error("Failed to update product");
    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (token, productId) => {
  try {
    const response = await fetch(`${API_URL}/admin/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to delete product");
    return await response.json();
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// ==================== ORDERS ====================
export const getOrders = async (token, params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/admin/orders?${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch orders");
    return await response.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getOrder = async (token, orderId) => {
  try {
    const response = await fetch(`${API_URL}/admin/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch order");
    return await response.json();
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

export const updateOrderStatus = async (token, orderId, status) => {
  try {
    const response = await fetch(`${API_URL}/admin/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Failed to update order status");
    return await response.json();
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

// ==================== CUSTOMERS ====================
export const getCustomers = async (token, params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/admin/customers?${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch customers");
    return await response.json();
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getCustomer = async (token, customerId) => {
  try {
    const response = await fetch(`${API_URL}/admin/customers/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch customer");
    return await response.json();
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
};

// ==================== CATEGORIES ====================
export const getCategories = async (token, params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/admin/categories?${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch categories");
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (token, categoryData) => {
  try {
    const response = await fetch(`${API_URL}/admin/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) throw new Error("Failed to create category");
    return await response.json();
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (token, categoryId, categoryData) => {
  try {
    const response = await fetch(`${API_URL}/admin/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) throw new Error("Failed to update category");
    return await response.json();
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (token, categoryId) => {
  try {
    const response = await fetch(`${API_URL}/admin/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to delete category");
    return await response.json();
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

// ==================== BRANDS ====================
export const getBrands = async (token, params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/admin/brands?${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch brands");
    return await response.json();
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

export const createBrand = async (token, brandData) => {
  try {
    const response = await fetch(`${API_URL}/admin/brands`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(brandData),
    });
    if (!response.ok) throw new Error("Failed to create brand");
    return await response.json();
  } catch (error) {
    console.error("Error creating brand:", error);
    throw error;
  }
};

export const updateBrand = async (token, brandId, brandData) => {
  try {
    const response = await fetch(`${API_URL}/admin/brands/${brandId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(brandData),
    });
    if (!response.ok) throw new Error("Failed to update brand");
    return await response.json();
  } catch (error) {
    console.error("Error updating brand:", error);
    throw error;
  }
};

export const deleteBrand = async (token, brandId) => {
  try {
    const response = await fetch(`${API_URL}/admin/brands/${brandId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to delete brand");
    return await response.json();
  } catch (error) {
    console.error("Error deleting brand:", error);
    throw error;
  }
};

// ==================== ANALYTICS ====================
export const getAnalytics = async (token, params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/admin/analytics?${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch analytics");
    return await response.json();
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
};

