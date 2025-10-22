import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SocialLoginButtons from "@/components/SocialLoginButton";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [check, setCheck] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreeShake, setAgreeShake] = useState(false);

  const MIN_PASSWORD_LENGTH = 8; // minimum length required

  const isStrongPassword = (value) => {
    // ít nhất phải có 1 chữ in hoa, 1 chữ số và 1 ký tự đặc biệt
    return /(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/.test(value);
  };

  const isValidEmail = (value) => {
    // Basic email format validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = {};

    if (!email || email.trim() === "") {
      nextErrors.email = "Email là bắt buộc";
    } else if (!isValidEmail(email.trim())) {
      nextErrors.email = "Email không hợp lệ";
    }

    if (!password || password === "") {
      nextErrors.password = "Mật khẩu là bắt buộc";
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      nextErrors.password = `Mật khẩu phải có ít nhất ${MIN_PASSWORD_LENGTH} ký tự`;
    } else if (!isStrongPassword(password)) {
      nextErrors.password = `Mật khẩu phải chứa ít nhất 1 chữ in hoa, 1 chữ số và 1 ký tự đặc biệt`;
    }

    if (!check) {
      nextErrors.agree = true;
    }

    setErrors(nextErrors);

    const hasErrors = Object.keys(nextErrors).length > 0;
    if (hasErrors) {
      // focus first invalid field (optional)
      const firstKey = Object.keys(nextErrors)[0];
      const el = document.getElementById(firstKey);
      if (el) el.focus();
      // if the missing/invalid field is the agreement checkbox, trigger a shake
      if (nextErrors.agree) {
        setAgreeShake(true);
        setTimeout(() => setAgreeShake(false), 700);
      }
      return;
    }

    // Handle registration logic here (replace with real auth)
    console.log("Register attempt:", { fullName, email, password });
    navigate("/");
  };

  return (
    <section className="flex w-9/20 h-full justify-center items-center p-5">
      <style>{`
      @keyframes shakeX { 
        0% { transform: translateX(0); } 
        20% { transform: translateX(-6px); } 
        40% { transform: translateX(6px); } 
        60% { transform: translateX(-4px); } 
        80% { transform: translateX(4px); } 
        100% { transform: translateX(0); } 
      }
      .shake { animation: shakeX 0.6s ease-in-out; }
      `}</style>
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
            <h1 className="text-[3rem] font-semibold text-color2 max-md:text-[2.25rem]">
              Đăng ký
            </h1>
            <div className="text-[1.25rem] tracking-tight text-black text-normal">
              Bắt đầu hành trình khám phá cùng Wild Step
            </div>
          </header>

          <form
            onSubmit={handleSubmit}
            className="mt-4 w-full max-md:max-w-full"
          >
            <div className="w-full font-medium max-md:max-w-full">
              <label
                htmlFor="fullName"
                className="text-[1rem] text-[#000000]/50"
              >
                Họ và Tên
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="flex flex-col justify-center px-5 py-6 mt-1.5 w-full text-[1.25rem] text-[#000000]/50 tracking-tight whitespace-nowrap rounded-2xl border-2 border-solid bg-opacity-0 border-[#333678]/50 border-opacity-50 min-h-16 max-md:max-w-full focus:outline-none focus:ring-2 focus:ring-color2 focus:border-color2"
                placeholder="Nguyễn Văn A"
                required
                aria-describedby="fullname-help"
              />
            </div>

            <div className="mt-4 w-full font-medium max-md:max-w-full">
              <label htmlFor="email" className="text-[1rem] text-[#000000]/50">
                Email hoặc username
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex flex-col justify-center px-5 py-6 mt-1.5 w-full text-[1.25rem] text-[#000000]/50 tracking-tight whitespace-nowrap rounded-2xl border-2 border-solid bg-opacity-0 border-[#333678]/50 border-opacity-50 min-h-16 max-md:max-w-full focus:outline-none focus:ring-2 focus:ring-color2 focus:border-color2"
                placeholder="info@gmail.com"
                aria-describedby="email-help"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600" id="email-help">
                  {errors.email}
                </p>
              )}
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
                  className="flex flex-col justify-center px-5 py-6 mt-1.5 w-full text-[1.25rem] tracking-tight rounded-2xl border-2 border-solid border-[#333678]/50 min-h-16 max-md:max-w-full focus:outline-none focus:ring-2 focus:ring-color2 focus:border-color2"
                  aria-describedby="password-help"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-color2 rounded cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/93c58a2d6a36e95a20c10d52fdc3abf9c42c8805?placeholderIfAbsent=true&apiKey=7e6ace8706ad423985a91f95c2918220"
                    alt=""
                    className="object-contain shrink-0 aspect-[1.16] w-[1.375rem]"
                  />
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600" id="password-help">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-10 justify-between items-center mt-4 w-full text-[1.25rem] tracking-tight max-md:max-w-full">
              <div className="flex gap-2.5 items-center self-stretch my-auto text-black ">
                <input
                  id="agree"
                  type="checkbox"
                  checked={check}
                  onChange={(e) => setCheck(e.target.checked)}
                  className="sr-only"
                />
                <div
                  role="checkbox"
                  aria-checked={check}
                  tabIndex={0}
                  onClick={() => setCheck((s) => !s)}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      setCheck((s) => !s);
                    }
                  }}
                  className={`w-5 h-5 rounded cursor-pointer flex items-center justify-center border-2
                  ${
                    check
                      ? "bg-color2 border-color2"
                      : agreeShake
                      ? "border-red-500 shake bg-transparent"
                      : "border-color2 bg-transparent"
                  }
                `}
                >
                  {check && (
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

                <span className="self-stretch my-auto text-[1.125rem]">
                  Tôi đồng ý với{" "}
                  <Link
                    to="/terms"
                    className="font-semibold text-color2 hover:underline hover:scale-50"
                  >
                    Điều khoản sử dụng
                  </Link>{" "}
                  và{" "}
                  <Link
                    to="/privacy"
                    className="font-semibold text-color2 hover:underline"
                  >
                    Chính sách bảo mật
                  </Link>
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="flex gap-2.5 justify-center items-center px-[0.0625rem] py-5 mt-4 max-w-full text-[1.5rem] font-semibold tracking-tight text-center text-white bg-color2 rounded-2xl min-h-16 w-full  hover:bg-[#003366] hover:shadow-lg hover:-translate-y-1 
               transition-all duration-200 ease-in-out cursor-pointer"
            >
              <span className="self-stretch my-auto">Đăng ký</span>
            </button>
          </form>

          <div className="flex gap-1.5 items-center self-start text-[1.25rem] tracking-tight">
            <p className="self-stretch my-auto text-black">Đã có tài khoản ?</p>
            <button
              onClick={() => navigate("/login")}
              className="self-stretch my-auto font-semibold text-color2 hover:underline cursor-pointer"
            >
              Đăng nhập
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

          <SocialLoginButtons buttonBg="#1C2541" buttonHoverBg="#003366" />
        </main>
      </div>
    </section>
  );
}

export default LoginForm;
