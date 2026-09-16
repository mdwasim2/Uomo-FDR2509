import React from "react";
import { Image } from "../common/Image";
import ShopBg from "../../assets/images/shopbanner.png";
const ShopBanner = () => {
  return (
    <div className="relative px-4 sm:px-8 lg:px-15">
      <Image className="w-full" src={ShopBg} alt="shopbg" />
      <div className="absolute top-2/4 left-0 w-full translate-y-[-50%] px-4 text-center">
        <h2 className="text-primary text-3xl font-bold uppercase sm:text-5xl lg:text-[60px]">
          Shoes
        </h2>
        <ul className="mt-3 flex flex-wrap justify-center gap-3 sm:mt-6.5 sm:gap-7.5">
          <li className="text-primary text-xs font-medium sm:text-base">#STAYHOME</li>
          <li className="text-primary text-xs font-medium sm:text-base">#STAYHOME</li>
          <li className="text-primary text-xs font-medium sm:text-base">#STAYHOME</li>
          <li className="text-primary text-xs font-medium sm:text-base">#STAYHOME</li>
        </ul>
      </div>
    </div>
  );
};

export default ShopBanner;
