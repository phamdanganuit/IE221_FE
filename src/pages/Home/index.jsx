import React from "react";
import { useNavigate } from "react-router-dom";
import shoeImg from "@/assets/shoe.png"; 
export default function Home() {
  const navigate = useNavigate();
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
          <div className="flex items-center bg-white rounded-full px-3 py-1 text-[#0A1E33]">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sm px-2"
            />
            <i className="fa-solid fa-magnifying-glass text-[#0A1E33]"></i>
          </div>
          
          <button onClick={() => navigate('/login')} className="bg-[#50D5C4] text-[#0A1E33] font-semibold px-4 py-1 rounded hover:bg-[#3CB0A3] transition cursor-pointer">
            Đăng nhập
          </button>
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
