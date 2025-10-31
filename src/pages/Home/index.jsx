import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import shoeImg from "@/assets/shoe.png";
import Header from "@/components/Header";
import HeroSection from "./HeroSection";
import BrandLogos from "./BrandLogo";
import PopularProducts from "./PopularProducts";
import Banner from "./Banner";
import BestSellers from "./BestSeller";
import CustomerReviews from "./CustomerReview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* NAVBAR */}
      <Header />

      {/* HERO SECTION */}
      <main className="flex flex-col items-center justify-between gap-4">
        {/* LEFT TEXT CONTENT */}
        <div className="flex flex-col md:flex-row items-center justify-between flex-1 px-10 md:px-20 py-10 gap-10">
          <div className="flex flex-col items-start justify-center md:w-1/2 text-left">
            <div className="text-[5.625rem] font-extrabold text-[#0A1E33] leading-tight mb-5">
              Find Your Sole Mate With Us
            </div>

            <p className="text-[#5A5A5A] mb-8 max-w-md">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit, Sed Do
              Eiusmod.
            </p>

            <button className="bg-color4 hover:bg-[#3CB0A3] text-white font-semibold px-6 py-3 rounded shadow-2xl  transition cursor-pointer">
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
              <h2 className="text-[#0A1E33] text-lg font-bold">
                Trendy WildStep Pro
              </h2>
              <p className="text-[#5A5A5A]">₹ 3999.00</p>
            </div>
            {/* <span className="absolute text-[8rem] md:text-[10rem] font-extrabold text-[#E8E8E8] -rotate-90 opacity-30 right-0">
            ULTIMATE
          </span> */}
          </div>
        </div>
        <BrandLogos />
        <PopularProducts />
        {/* <Banner /> */}
        <BestSellers />
        <CustomerReviews />
      </main>
      <Footer />
    </div>
  );
}
