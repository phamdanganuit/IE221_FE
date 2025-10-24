import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import shoeImg from "@/assets/shoe.png"; 

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    clearAuth();
    setShowUserMenu(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Set loading state when avatar changes
  useEffect(() => {
    if (user?.avatar) {
      setAvatarLoading(true);
    }
  }, [user?.avatar]);
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* NAVBAR */}
      <header className="w-full flex items-center justify-between px-10 py-4 bg-[#0A1E33] text-white">
        <div className="flex items-center gap-2">
          {/* <img src="/Logo.svg" alt="Wild Step Logo" className="h-6" /> */}
          <span className="font-extrabold text-[2rem] tracking-wide text-color4">WILD STEP</span>
        </div>

        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#" className="hover:text-[#50D5C4] transition">Sản phẩm mới</a>
          <a href="#" className="hover:text-[#50D5C4] transition">Nam</a>
          <a href="#" className="hover:text-[#50D5C4] transition">Nữ</a>
          <a href="#" className="hover:text-[#50D5C4] transition">Trẻ em</a>
          <a href="#" className="hover:text-[#50D5C4] transition">Phụ kiện thể thao</a>
          <a href="#" className="text-[#50D5C4] font-semibold">Giảm giá</a>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            // Giao diện khi đã đăng nhập
            <div className="flex items-center gap-2.5">
              {/* Search Bar */}
              <div className="relative w-[180px] h-[36px]">
                <div className="absolute inset-0 bg-[#F5F5F5] rounded-[24px]"></div>
                <input
                  type="text"
                  placeholder="Search Products"
                  className="absolute inset-0 bg-transparent outline-none px-9 py-2 text-[15.9px] text-[#707072] rounded-[24px]"
                />
                <div className="absolute left-0 top-0 w-[36px] h-[36px] bg-[#F5F5F5] rounded-[30px] flex items-center justify-center">
                  <img src="/icon/material-symbols_search-rounded.svg" alt="Search" className="w-6 h-6" />
                </div>
              </div>

              {/* Cart Icon */}
              <div className="w-[36px] h-[36px] rounded-[30px] flex items-center justify-center hover:bg-gray-700 transition cursor-pointer">
                <img src="/icon/mdi_cart-outline.svg" alt="Cart" className="w-6 h-6" />
              </div>

              {/* Wishlist Icon */}
              <div className="w-[36px] h-[36px] rounded-[30px] flex items-center justify-center hover:bg-gray-700 transition cursor-pointer">
                <img src="/icon/mdi_heart-outline.svg" alt="Wishlist" className="w-6 h-6" />
              </div>

              {/* User Profile */}
              <div className="relative" ref={userMenuRef}>
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="w-[36px] h-[36px] rounded-full overflow-hidden flex items-center justify-center">
                    {user?.avatar ? (
                      <>
                        {avatarLoading && (
                          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full"></div>
                        )}
                        <img 
                          src={user.avatar} 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                          onLoad={() => setAvatarLoading(false)}
                          onError={(e) => {
                            setAvatarLoading(false);
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      </>
                    ) : null}
                    <div className={`w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center ${user?.avatar ? 'hidden' : 'flex'}`}>
                      <span className="text-white font-semibold text-sm">
                        {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  </div>
                  <div className="w-[16px] h-[16px] flex items-center justify-center">
                    <img src="/icon/bxs_down-arrow.svg" alt="Dropdown" className="w-4 h-4" />
                  </div>
                </div>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.displayName || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Giao diện khi chưa đăng nhập
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white rounded-full px-3 py-1 text-[#0A1E33]">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent outline-none text-sm px-2"
                />
                <i className="fa-solid fa-magnifying-glass text-[#0A1E33]"></i>
              </div>
              
              <button 
                onClick={() => navigate('/login')} 
                className="bg-[#50D5C4] text-[#0A1E33] font-semibold px-4 py-1 rounded hover:bg-[#3CB0A3] transition cursor-pointer"
              >
                Đăng nhập
              </button>
            </div>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex flex-col md:flex-row items-center justify-between flex-1 px-10 md:px-20 py-10 gap-10">
        {/* LEFT TEXT CONTENT */}
        <div className="flex flex-col items-start justify-center md:w-1/2 text-left">
          <div className="text-[5.625rem] font-extrabold text-[#0A1E33] leading-tight mb-5">
            Find Your
            Sole Mate
            With Us
          </div>

          <p className="text-[#5A5A5A] mb-8 max-w-md">
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit, Sed Do Eiusmod.
          </p>

          <button className="bg-[#50D5C4] hover:bg-[#3CB0A3] text-white font-semibold px-6 py-3 rounded shadow-lg shadow-[#50D5C4]/40 transition">
            Mua Ngay
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative md:w-1/2 flex items-center justify-center">
          <img
            src={shoeImg}
            alt="Trendy Slick Pro"
            className="w-[400px] md:w-[500px] object-contain drop-shadow-xl"
          />
          <div className="absolute bottom-10 right-5 text-right">
            <h2 className="text-[#0A1E33] text-lg font-bold">Trendy Slick Pro</h2>
            <p className="text-[#5A5A5A]">₹ 3999.00</p>
          </div>
          {/* <span className="absolute text-[8rem] md:text-[10rem] font-extrabold text-[#E8E8E8] -rotate-90 opacity-30 right-0">
            ULTIMATE
          </span> */}
        </div>
      </main>
    </div>
  );
}
