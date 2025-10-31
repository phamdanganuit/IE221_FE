import React from "react";
import "./BrandLogo.css"; // Import the CSS file for animations

const BrandLogos = () => {
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
  ];

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-900 py-8"
      aria-label="Brand partners"
    >
      <div className="flex animate-scroll-left hover:[animation-play-state:paused]">
        {/* First set of logos */}
        <div className="flex items-center gap-16 px-8 shrink-0">
          {logos.map((logo, index) => (
            <img
              key={`logo-1-${index}`}
              src={logo.src}
              alt={logo.alt}
              className="object-contain h-20 w-28 opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            />
          ))}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex items-center gap-16 px-8 shrink-0">
          {logos.map((logo, index) => (
            <img
              key={`logo-2-${index}`}
              src={logo.src}
              alt={logo.alt}
              className="object-contain h-20 w-28 opacity-90 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;
