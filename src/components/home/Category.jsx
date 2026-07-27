import React from "react";
import categorydata from "../../api/categorydata.json";
import { Image } from "../common/Image";
import { Link } from "react-router";
const Category = () => {
  return (
    <section className="mt-3.75 lg:mt-25">
      <div className="container">
        <div className="flex grid-cols-4 flex-col gap-3.75 lg:grid lg:gap-7.5">
          {categorydata.map((item) => (
            <div
              key={item.id}
              className={`h-71.25 lg:h-auto ${item.id == 1 ? "col-span-2 row-span-2" : item.id == 2 && "col-span-2"} relative w-full`}
            >
              <Image
                className="h-full w-full object-cover object-right"
                src={item.image}
                alt={item.name}
              />
              <div className="absolute bottom-10 left-10">
                <h3 className="text-primary text-sm leading-6 font-normal">
                  HOT LIST
                </h3>
                <h2 className="text-primary text-[22px] font-medium lg:text-[26px]">
                  <span className="block font-bold lg:inline-block">
                    {item.name}
                  </span>{" "}
                  COLLECTION
                </h2>
                {item.id == 4 && (
                  <p>Surprise someone with the gift they really want.</p>
                )}
                <Link className="text-primary after:content-[] after:bg-primary relative text-sm leading-6 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-12.5">
                  {item.id == 4 ? "DISCOVER MORE" : "SHOP NOW "}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
