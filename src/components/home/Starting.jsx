import React from "react";
import { Image } from "../common/Image";
import StartingImage from "../../assets/images/startingimage.png";

const Starting = () => {
  return (
    <section>
      <div className="container">
        <div className="mt-25 flex justify-between">
          <div className="relative h-99.5 w-172.5">
            <Image
              className="h-full w-full"
              src={StartingImage}
              alt="StartingImage"
            />
            <div className="group absolute top-0 left-0 flex h-full w-full items-end duration-500 hover:bg-[#D6001C]">
              <div className="mb-12.5 ml-12.5">
                <h3 className="text-primary text-lg font-medium group-hover:text-white">
                  STARTİNG AT $39
                </h3>
                <h2 className="text-primary text-[26px] font-medium group-hover:text-white">
                  Men’s Sportswear
                </h2>
                <button className="text-primary after:bg-primary 5 relative cursor-pointer text-sm leading-6 font-medium group-hover:text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:duration-500 after:content-[''] group-hover:after:bg-white hover:after:w-[70%]">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
          <div className="relative h-99.5 w-172.5">
            <Image
              className="h-full w-full"
              src={StartingImage}
              alt="StartingImage"
            />
            <div className="group absolute top-0 left-0 flex h-full w-full items-end opacity-80 duration-500 hover:bg-[#D6001C]">
              <div className="mb-12.5 ml-12.5">
                <h3 className="text-primary text-lg font-medium group-hover:text-white">
                  STARTİNG AT $39
                </h3>
                <h2 className="text-primary text-[26px] font-medium group-hover:text-white">
                  Men’s Sportswear
                </h2>
                <button className="text-primary after:bg-primary 5 relative cursor-pointer text-sm leading-6 font-medium group-hover:text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:duration-500 after:content-[''] hover:after:w-[70%]">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Starting;
