const base_url = import.meta.env.VITE_BACKEND_URL;

export const login = async (email, password, rememberMe) => {
  try {
    const res = await fetch(`${base_url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      if (res.status === 401) {
        alert("Thông tin đăng nhập không đúng.");
        throw new Error("Sai email hoặc mật khẩu");
      }
      throw new Error("Đăng nhập thất bại");
    }
    const data = await res.json();
    // Lưu vào localStorage
    if (rememberMe === true) {
      localStorage.setItem("access_token", JSON.stringify(data.access_token));
    }
    alert("Đăng nhập thành công");
    return data;
  } catch (e) {
    console.log("Lỗi đăng nhập: ", e);
    return null;
  }
};

export const register = async (email, password, displayName, admin_key) => {
  try {
    const res = await fetch(`${base_url}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        displayName,
        ...(admin_key && { admin_key }), // chỉ gửi khi có admin_key
      }),
    });
    if (!res.ok) {
      if (res.status === 400) {
        alert("Dữ liệu không hợp lệ");
        throw new Error("Dữ liệu không hợp lệ");
      }
      if (res.status === 409) {
        alert("Email đã được đăng ký");
        throw new Error("Email đã được đăng ký");
      }
      throw new Error("Đăng ký thất bại");
    }
    const data = await res.json();
    return data; // chứa id, email, displayName, role
  } catch (e) {
    console.log("Lỗi đăng ký: ", e);
    return null;
  }
};

export const getProfile = async (token) => {
  try {
    const res = await fetch(`${base_url}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Token không hợp lệ hoặc đã hết hạn");
      }
      if (res.status === 404) {
        throw new Error("Không tìm thấy người dùng");
      }
      throw new Error("Không thể lấy thông tin người dùng");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Lỗi lấy thông tin người dùng:", err);
    return null;
  }
};
