import React from "react";
import { Image } from "../common/Image";
import ShopBg from "../../assets/images/shopbanner.png";
const ShopBanner = () => {
  return (
    <div className="relative px-15">
      <Image className="w-full" src={ShopBg} alt="shopbg" />
      <div className="absolute top-2/4 left-0 w-full translate-y-[-50%] text-center">
        <h2 className="text-primary text-[60px] font-bold uppercase">Shoes</h2>
        <ul className="mt-6.5 flex justify-center gap-7.5">
          <li className="text-primary text-base font-medium">#STAYHOME</li>
          <li className="text-primary text-base font-medium">#STAYHOME</li>
          <li className="text-primary text-base font-medium">#STAYHOME</li>
          <li className="text-primary text-base font-medium">#STAYHOME</li>
        </ul>
      </div>
    </div>
  );
};

export default ShopBanner;
