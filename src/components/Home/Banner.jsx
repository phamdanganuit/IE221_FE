import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import banner1 from "@/assets/banner/banner1.jpg";
import banner2 from "@/assets/banner/banner2.jpg";
import banner3 from "@/assets/banner/banner3.jpg";

const banners = [
  { id: 1, img: banner1},
  { id: 2, img: banner2},
  { id: 3, img: banner3},
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

   useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval); 
  }, [current]);

 return (
    <section className="px-10 md:px-20 mt-12 md:mt-20">
      <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-lg">
        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="w-full flex-shrink-0 relative">
              <img
                src={banner.img}
                alt={`Banner ${banner.id}`}
                className="w-full h-[400px] object-cover"
              />
              {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h2 className="text-white text-3xl font-semibold drop-shadow-lg">
                  {banner.title}
                </h2>
              </div> */}
            </div>
          ))}
        </div>

        {/* Nút điều hướng */}
        <button
          onClick={prevSlide}
          className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow transition-all duration-300 hover:scale-105"
          aria-label="Previous slide"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow transition-all duration-300 hover:scale-105"
          aria-label="Next slide"
        >
          <FaChevronRight />
        </button>

        {/* Dấu chấm chỉ số */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                current === index
                  ? "bg-[#000000]/85 w-4 h-4 scale-115 border-[0.1rem] border-gray-400"
                  : "bg-[#000000]/30 w-4 h-4 hover:bg-[#000000]/60"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
