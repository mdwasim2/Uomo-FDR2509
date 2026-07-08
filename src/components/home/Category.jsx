import React from "react";
import categorydata from "../../api/categorydata.json"
import { Image } from "../common/Image";
const Category = () => {
  return (
    <section className="mt-25">
      <div className="container">
        <div className=" grid grid-cols-4 gap-2">
          {
            categorydata.map((item)=>(
                <div className={` ${item.id ==1 ? "col-span-2 row-span-2" : item.id == 2 && "col-span-2" } h-full w-full `}>
                   <Image src={item.image} alt={item.name}/>
                </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default Category;
