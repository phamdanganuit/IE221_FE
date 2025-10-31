'use client'

import React from 'react'
import { InfiniteSlider } from "@/components/ui/InfiniteSlider";
import './BrandLogo.css' // nếu cần custom thêm

const logos = [
  {
    src: "https://api.builder.io/api/v1/image/assets/7e6ace8706ad423985a91f95c2918220/30352cea7e3d0b1a7053545724f63f0cdb8a8421?placeholderIfAbsent=true",
    alt: "Brand partner logo 1",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/7e6ace8706ad423985a91f95c2918220/6b5fec7020a8a3fa56036907963652c75728f8d0?placeholderIfAbsent=true",
    alt: "Brand partner logo 2",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/7e6ace8706ad423985a91f95c2918220/30352cea7e3d0b1a7053545724f63f0cdb8a8421?placeholderIfAbsent=true",
    alt: "Brand partner logo 3",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/7e6ace8706ad423985a91f95c2918220/6b5fec7020a8a3fa56036907963652c75728f8d0?placeholderIfAbsent=true",
    alt: "Brand partner logo 4",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/7e6ace8706ad423985a91f95c2918220/30352cea7e3d0b1a7053545724f63f0cdb8a8421?placeholderIfAbsent=true",
    alt: "Brand partner logo 5",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/7e6ace8706ad423985a91f95c2918220/6b5fec7020a8a3fa56036907963652c75728f8d0?placeholderIfAbsent=true",
    alt: "Brand partner logo 6",
  },
]

export default function BrandLogos() {
  return (
    <section className="relative py-8 px-10 md:px-20 bg-slate-900">
      <div className="relative">
        <InfiniteSlider duration={40} durationOnHover={Infinity} gap={112}>
          {/* Nhân đôi mảng để chạy seamless */}
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex">
              <img
                src={logo.src}
                alt={logo.alt}
                className="mx-auto h-20 w-28 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </InfiniteSlider>

        {/* Gradient 2 đầu */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-red-900 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-red-900 pointer-events-none"></div>
      </div>
    </section>
  )
}
