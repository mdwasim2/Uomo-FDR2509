import React from "react";
import SpringImage from "../../assets/images/springcollection.png";
import { Image } from "../common/Image";
import Countdown from "react-countdown";
import { Link } from "react-router";

const SpringCollection = () => {
  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="mt-6.25 lg:mt-29.75 flex gap-5.5">
        <div className="flex gap-3.5 lg:gap-6.25">
          <div>
            <h2 className="text-primary text-lg lg:text-[30px] font-normal">{days}</h2>
            <h3 className="text-gray text-sm lg:text-[16px] font-bold">DAYS</h3>
          </div>
          <h2 className="text-primary text-lg lg:text-[30px] font-normal">:</h2>
        </div>
        <div className="flex gap-6.25">
          <div>
            <h2 className="text-primary text-lg lg:text-[30px] font-normal">{hours}</h2>
            <h3 className="text-gray text-sm lg:text-[16px] font-bold">HOURS</h3>
          </div>
          <h2 className="text-primary text-lg lg:text-[30px] font-normal">:</h2>
        </div>
        <div className="flex gap-6.25">
          <div>
            <h2 className="text-primary text-lg lg:text-[30px] font-normal">{minutes}</h2>
            <h3 className="text-gray text-sm lg:text-[16px] font-bold">MINS</h3>
          </div>
          <h2 className="text-primary text-lg lg:text-[30px] font-normal">:</h2>
        </div>
        <div className="flex gap-6.25">
          <div>
            <h2 className="text-primary text-lg lg:text-[30px] font-normal">{seconds}</h2>
            <h3 className="text-gray text-sm lg:text-[16px] font-bold">SEC</h3>
          </div>
        </div>
      </div>
    );
  };
  return (
    <section className="bg-[#EBEBEB] pt-18.5 pb-6 lg:py-7">
      <div className="container">
        <div className="flex items-end pl-11.5 justify-between">
          <div>
            <h3 className="5 relative ml-15 cursor-pointer text-sm leading-6 font-medium text-[#C32929] after:absolute after:top-2 after:-left-14 after:h-0.5 after:w-10 after:bg-[#C32929] after:duration-500 after:content-['']">
              DEAL OF THE WEEK
            </h3>
            <h2 className="text-primary text-[30px] w-44 lg:w-auto lg:text-[70px] font-normal uppercase">
              <span className="font-bold">Spring</span> Collection
            </h2>
            <Link
              to="/shop"
              className="text-primary after:bg-primary 5 relative cursor-pointer text-sm leading-6 font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:duration-500 after:content-[''] hover:after:w-[70%]"
            >
              Shop Now
            </Link>
            <Countdown
              date={"2026-12-08T14:22:56.397+00:00"}
              renderer={renderer}
            />
          </div>
          <div className="hidden lg:block">
            <Image src={SpringImage} alt="springimage" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpringCollection;
