import React from "react";
import { FaTwitter, FaFacebook, FaGoogle, FaApple } from "react-icons/fa";

function SocialLoginButtons() {
  return (
    <section
      className="flex relative items-center justify-between max-md:gap-4 max-sm:flex-wrap max-sm:gap-5 max-sm:justify-center max-sm:w-full"
      aria-label="Social login options"
    >
      <button
        className="flex relative flex-col gap-2.5 items-start px-6 py-4 bg-color4 hover:bg-hover4 rounded-2xl max-md:px-5 max-md:py-3 max-sm:px-5 max-sm:py-4 cursor-pointer"
        aria-label="Login with Twitter"
      >
        <FaTwitter className="text-[3.375rem] text-white" />
      </button>
      <button
        className="flex relative flex-col gap-2.5 items-start px-6 py-4 bg-color4 hover:bg-hover4 rounded-2xl max-md:px-5 max-md:py-3 max-sm:px-5 max-sm:py-4 cursor-pointer"
        aria-label="Login with Facebook"
      >
        <FaFacebook className="text-[3.375rem] text-white" />
      </button>
      <button
        className="flex relative flex-col gap-2.5 items-start px-6 py-4 bg-color4 hover:bg-hover4 rounded-2xl max-md:px-5 max-md:py-3 max-sm:px-5 max-sm:py-4 cursor-pointer"
        aria-label="Login with Google"
      >
        <FaGoogle className="text-[3.375rem] text-white" />
      </button>
      <button
        className="flex relative flex-col gap-2.5 items-start px-6 py-4 bg-color4 hover:bg-hover4 rounded-2xl max-md:px-5 max-md:py-3 max-sm:px-5 max-sm:py-4 cursor-pointer"
        aria-label="Login with Apple"
      >
        <FaApple className="text-[3.375rem] text-white" />
      </button>
    </section>
  );
}

export default SocialLoginButtons;
