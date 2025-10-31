import React from "react";

function Sidebar({ isActive, setActive }) {
  return (
    <div className="mt-10 flex flex-col space-y-4 w-[250px] h-[400px] justify-start pr-2 border-r border-[#3A506B] ">
      <button
        className={`${
          isActive === "Hồ sơ" ? "font-bold text-[#0B132B]" : "font-semibold text-zinc-500"
        } px-4 py-2 text-left hover:bg-gray-200 rounded-lg cursor-pointer`}
        onClick={() => setActive("Hồ sơ")}
      >
        Hồ sơ
      </button>
      <button
        className={`${
          isActive === "Địa chỉ" ? "font-bold text-[#0B132B]" : "font-semibold text-zinc-500"
        } px-4 py-2 text-left hover:bg-gray-200 rounded-lg cursor-pointer`}
        onClick={() => setActive("Địa chỉ")}
      >
        Địa chỉ
      </button>
      <button
        className={`${
          isActive === "Đổi mật khẩu" ? "font-bold text-[#0B132B]" : "font-semibold text-zinc-500"
        } px-4 py-2 text-left hover:bg-gray-200 rounded-lg cursor-pointer`}
        onClick={() => setActive("Đổi mật khẩu")}
      >
        Đổi mật khẩu
      </button>
      <button
        className={`${
          isActive === "Liên kết tài khoản" ? "font-bold text-[#0B132B]" : "font-semibold text-zinc-500"
        } px-4 py-2 text-left hover:bg-gray-200 rounded-lg cursor-pointer`}
        onClick={() => setActive("Liên kết tài khoản")}
      >
        Liên kết tài khoản
      </button>
      <button
        className={`${
          isActive === "Cài đặt thông báo" ? "font-bold text-[#0B132B]" : "font-semibold text-zinc-500"
        } px-4 py-2 text-left hover:bg-gray-200 rounded-lg cursor-pointer`}
        onClick={() => setActive("Cài đặt thông báo")}
      >
        Cài đặt thông báo
      </button>
      <div className="border-t border-[#3A506B]" />
      <button
        className={`${
          isActive === "Xóa tài khoản" ? "font-bold text-rose-600" : "font-semibold text-rose-500"
        } px-4 py-2 text-left hover:bg-gray-200 rounded-lg cursor-pointer`}
        onClick={() => setActive("Xóa tài khoản")}
      >
        Xóa tài khoản
      </button>
    </div>
  );
}

export default Sidebar;
