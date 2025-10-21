import React from "react";
import bg from "@/assets/login_bg.png";
import LoginForm from "./LoginForm";

function LoginPage() {
  return (
    <div
        className="flex w-full h-full bg-white max-md:flex-col"
      aria-label="Trang đăng nhập Wild Step"
    >
      <div className="hidden md:flex w-full h-full justify-center items-center">
        <img
          src={bg}
          alt="Login background"
          className="w-full h-full object-cover"
        />
      </div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
