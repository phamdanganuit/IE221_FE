import React from 'react';

const HeroSection = () => {
  return (
    <section className="self-end mt-0 w-full max-w-[1354px] max-md:max-w-full" space={54}>
      <div className="flex gap-5 max-md:flex-col max-md:">
        <div className="w-[45%] max-md:ml-0 max-md:w-full">
          <div className="self-stretch my-auto max-md:mt-10 max-md:max-w-full">
            <h1 className="text-8xl capitalize leading-[101px] text-slate-900 max-md:text-4xl max-md:leading-[50px]">
              Find Your
              <br />
              Sole Mate
              <br />
              With Us
            </h1>
            <p className="mt-10 text-3xl leading-10 text-black max-md:max-w-full">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </p>
          </div>
        </div>
        <div className="ml-5 w-[55%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow py-40 font-medium leading-none max-md:py-24 max-md:mt-10 max-md:max-w-full">
            <img
              src="https://api.builder.io/api/v1/image/assets/7e6ace8706ad423985a91f95c2918220/220dd7ad-25cc-47de-93c6-61f9bafd6a74?placeholderIfAbsent=true"
              alt="Trendy Slick Pro shoe"
              className="object-contain w-full aspect-[1.01] shadow-[0px_0px_46px_rgba(0,0,0,0.05)] max-md:max-w-full"
            />
            <div className="self-end mt-3.5 mr-16 max-md:mr-2.5">
              <h2 className="text-4xl capitalize text-slate-900">
                Trendy Slick Pro
              </h2>
              <p className="mt-4 text-3xl text-center text-black">
                ₹ 3999.00
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
