import React from "react";
import categorydata from "../../api/categorydata.json";
import { Image } from "../common/Image";
import { Link } from "react-router";
const Category = () => {
  return (
    <section className="mt-25">
      <div className="container">
        <div className="grid grid-cols-4 gap-7.5">
          {categorydata.map((item) => (
            <div
              key={item.id}
              className={` ${item.id == 1 ? "col-span-2 row-span-2" : item.id == 2 && "col-span-2"} relative h-full w-full`}
            >
              <Image
                className="h-full w-full"
                src={item.image}
                alt={item.name}
              />
              <div className="absolute bottom-10 left-10">
                <h3 className="text-primary text-sm leading-6">HOT LIST</h3>
                <h2 className="text-primary text-[26px] font-medium">
                  <span className="font-bold">{item.name}</span> COLLECTION
                </h2>
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
