import React from 'react';

const Banner = () => {
  return (
    <section className="flex flex-col self-center py-16 pr-2 pl-0.5 mt-36 w-full rounded-3xl bg-slate-900 max-w-[1364px] max-md:mt-10 max-md:max-w-full">
      <div className="self-end mr-24 max-w-full font-medium text-white w-[469px] max-md:mr-2.5">
        <h2 className="mr-8 text-6xl max-md:mr-2.5 max-md:max-w-full max-md:text-4xl">
          Are you ready to lead the way
        </h2>
        <p className="mt-2.5 text-2xl max-md:max-w-full">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
        </p>
      </div>
      <div className="flex flex-wrap gap-10 justify-between items-center px-8 mt-1.5 max-md:px-5 max-md:max-w-full">
        <img
          src="https://api.builder.io/api/v1/image/assets/7e6ace8706ad423985a91f95c2918220/991e92eba6e5f3cf25b38784e5de7e8e7aa8adfc?placeholderIfAbsent=true"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/7e6ace8706ad423985a91f95c2918220/15cdd084f60d0706cef9688dec0862c8aec7b098?placeholderIfAbsent=true"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
        />
      </div>
      <div className="flex z-10 flex-col items-center self-end mt-16 mr-60 max-w-full min-h-[118px] w-[328px] max-md:mt-10 max-md:mr-2.5">
        <img
          src="https://api.builder.io/api/v1/image/assets/7e6ace8706ad423985a91f95c2918220/b8e2bcb466ffefe20b1e1584f3476d528d736c02?placeholderIfAbsent=true"
          alt="Featured product showcase"
          className="object-contain flex-1 w-full rounded-none aspect-[3.22]"
        />
        <div className="flex gap-3 items-center mt-2.5">
          <div className="flex self-stretch my-auto w-4 bg-white rounded-xl min-h-1.5" />
        </div>
      </div>
      <div className="self-center mt-0 font-black text-[240px] text-slate-700 max-md:max-w-full max-md:text-4xl">
        WILD STEP
      </div>
    </section>
  );
};

export default Banner;
