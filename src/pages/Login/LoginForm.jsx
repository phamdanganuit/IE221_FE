import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SocialLoginButtons from "@/components/SocialLoginButton";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (you can replace this with real auth)
    console.log("Login attempt:", { email, password, rememberMe });
    // Redirect to /login
    navigate("/");
  };

  return (
    <section className="flex w-full h-full justify-center items-center p-5">
      <div className="flex flex-col justify-center items-center mt-8 max-md:mt-10 max-md:max-w-full">
        <button
          onClick={() => navigate("/")}
          className="flex flex-col justify-center self-end py-5 max-w-full cursor-pointer"
        >
          <img
            src="/Logo.svg"
            alt="Wild Step Logo"
            className="object-contain w-full aspect-[9.52]"
          />
        </button>

        <main className="flex flex-col gap-4 mt-12 w-full max-md:mt-10 max-md:max-w-full">
          <header className="flex flex-col justify-start items-start gap-1">
            <h1 className="text-[3rem] font-semibold text-color4 max-md:text-[2.25rem]">
              Đăng nhập
            </h1>
            <div className="text-[1.25rem] tracking-tight text-black text-normal">
              Trải nghiệm mua sắm tối ưu cùng Wild Step
            </div>
          </header>

          <form
            onSubmit={handleSubmit}
            className="mt-4 w-full max-md:max-w-full"
          >
            <div className="w-full font-medium max-md:max-w-full">
              <label htmlFor="email" className="text-[1rem] text-[#000000]/50">
                Email hoặc username
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex flex-col justify-center px-5 py-6 mt-1.5 w-full text-[1.25rem] text-[#000000]/50 tracking-tight whitespace-nowrap rounded-2xl border-2 border-solid bg-opacity-0 border-[#333678]/50 border-opacity-50 min-h-16 max-md:max-w-full focus:outline-none focus:ring-2 focus:ring-color4 focus:border-color4"
                placeholder="info@gmail.com"
                required
                aria-describedby="email-help"
              />
            </div>

            <div className="mt-4 w-full font-medium text-[#000000]/50 max-md:max-w-full">
              <label htmlFor="password" className="text-[1rem] tracking-tight">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu"
                  className="flex flex-col justify-center px-5 py-6 mt-1.5 w-full text-[1.25rem] tracking-tight rounded-2xl border-2 border-solid border-[#333678]/50 min-h-16 max-md:max-w-full focus:outline-none focus:ring-2 focus:ring-color4 focus:border-color4"
                  required
                  aria-describedby="password-help"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-color4 rounded cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/93c58a2d6a36e95a20c10d52fdc3abf9c42c8805?placeholderIfAbsent=true&apiKey=7e6ace8706ad423985a91f95c2918220"
                    alt=""
                    className="object-contain shrink-0 aspect-[1.16] w-[1.375rem]"
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-10 justify-between items-center mt-4 w-full text-[1.25rem] tracking-tight max-md:max-w-full">
              <div className="flex gap-2.5">
              <label className="flex gap-2.5 items-center self-stretch my-auto text-black ">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 border-2 border-color4 rounded cursor-pointer ${
                    rememberMe ? "bg-color4" : "bg-transparent"
                  } flex items-center justify-center`}
                >
                  {rememberMe && (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                
              </label>
              <span className="self-stretch my-auto text-[1.125rem]">Ghi nhớ</span>
              </div>
              <button
                type="button"
                className="self-stretch my-auto text-[1.125rem] font-medium text-color4 hover:text-hover4 hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-color4 rounded"
              >
                Quên mật khẩu
              </button>
            </div>

            <button
              type="submit"
              className="flex gap-2.5 justify-center items-center px-[0.0625rem] py-5 mt-4 max-w-full text-[1.5rem] font-semibold tracking-tight text-center text-white bg-color4 rounded-2xl min-h-16 w-full hover:bg-hover4 hover:shadow-lg hover:-translate-y-1 
               transition-all duration-200 ease-in-out cursor-pointer"
            >
              <span className="self-stretch my-auto">Đăng nhập</span>
            </button>
          </form>

          <div className="flex gap-1.5 items-center self-start text-[1.25rem] tracking-tight">
            <p className="self-stretch my-auto text-black">
              Chưa có tài khoản ?
            </p>
            <button onClick={() => navigate("/register")} className="self-stretch my-auto font-semibold text-color4 hover:underline cursor-pointer">
              Đăng ký
            </button>
          </div>

          <div className="flex w-full gap-5 items-center justify-between text-[1.25rem] tracking-tight text-black max-md:max-w-full">
            <img
              src="https://api.builder.io/api/v1/image/assets/7e6ace8706ad423985a91f95c2918220/88e5e0c07683d0c404879328cec4e8151ffff570?placeholderIfAbsent=true"
              alt="Social login divider"
              className="object-contain shrink-0 self-stretch my-auto aspect-[76.92] w-[9.6875rem]"
            />
            <span className="self-stretch my-auto text-center">
              Hoặc tiếp tục với
            </span>
            <img
              src="https://api.builder.io/api/v1/image/assets/7e6ace8706ad423985a91f95c2918220/88e5e0c07683d0c404879328cec4e8151ffff570?placeholderIfAbsent=true"
              alt="Social login divider"
              className="object-contain shrink-0 self-stretch my-auto aspect-[76.92] w-[9.6875rem]"
            />
          </div>

          <SocialLoginButtons buttonBg="#5BC0BE" buttonHoverBg="#248F8D" />
        </main>
      </div>
    </section>
  );
}

export default LoginForm;
