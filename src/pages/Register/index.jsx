import React from "react";
import bg from "@/assets/register_bg.png";
import RegisterForm from "./RegisterForm";

function RegisterPage() {
  return (
    <div
      className="flex w-full h-full bg-white max-md:flex-col"
      aria-label="Trang đăng nhập Wild Step"
    >
      <RegisterForm />
      <div className="hidden md:flex w-11/20 h-full justify-center items-center">
        <img
          src={bg}
          alt="Register background"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export default RegisterPage;
