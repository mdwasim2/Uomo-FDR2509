import React, { useEffect, useState } from "react";
import Title from "../common/Title";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Product from "../common/Product";
const LimitedEditon = () => {
  let [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/product?limit=10")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        throw new Error("someting went wrong !");
      });
  }, []);

  console.log(products);
  return (
    <section className="mt-9.25 lg:mt-22.75">
      <div className="relative container px-2">
        <Title name="LIMITED " namebold="EDITION" />

        <div>
          <Swiper
            slidesPerView={4}

            breakpoints={{
              
              320: {
                slidesPerView: 2,
                spaceBetween: 14,
                
              },
           
      
              1024: {
                slidesPerView: 4,
        
              },
            }}

            modules={[Navigation]}
            className="mySwiper"
            navigation={{
              nextEl: ".next-button",
              prevEl: ".prev-button",
            }}
          >
            {products.map((item) => (
              <SwiperSlide>
                <Product item={item} key={item.id} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="slideBtn">
            <button className="prev-button z-50 absolute top-2/4 left-2 lg:-left-6 translate-y-[-50%]">
              <FaAngleLeft size={25} className="text-gray" />
            </button>
            <button className="next-button z-50 absolute top-2/4 right-2 lg:-right-6 translate-y-[-50%]">
              <FaAngleRight size={25} className="text-gray" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LimitedEditon;
