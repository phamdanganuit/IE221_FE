import React from "react";
import { FaTwitter, FaFacebook, FaGoogle, FaApple } from "react-icons/fa";

function SocialLoginButtons({ buttonBg, buttonHoverBg }) {
  const socialButtons = [
    { icon: <FaTwitter />, label: "Login with Twitter" },
    { icon: <FaFacebook />, label: "Login with Facebook" },
    { icon: <FaGoogle />, label: "Login with Google" },
    { icon: <FaApple />, label: "Login with Apple" },
  ];

  return (
    <section
      className="flex relative items-center justify-between max-md:gap-4 max-sm:flex-wrap max-sm:gap-5 max-sm:justify-center max-sm:w-full"
      aria-label="Social login options"
    >
      {socialButtons.map((btn, index) => (
        <button
          key={index}
          aria-label={btn.label}
          className={`flex relative flex-col gap-2.5 items-start px-5.5 py-3 rounded-2xl max-md:px-5 max-md:py-3 max-sm:px-5 max-sm:py-4 cursor-pointer hover:shadow-lg hover:-translate-y-1 
              transition-all duration-200 ease-in-out`}
          style={{
            backgroundColor: buttonBg,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = buttonHoverBg)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = buttonBg)
          }
        >
          {React.cloneElement(btn.icon, {
            className: "text-[2.65rem] text-white",
          })}
        </button>
      ))}
    </section>
  );
}

export default SocialLoginButtons;
