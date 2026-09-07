import { Link , useNavigate } from "react-router";
import { Image } from "../common/Image";
import navData from "../../api/navbardata.json";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { useSelector } from "react-redux";


const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  let cart = useSelector((state) => state.cart.products);
  let navigate = useNavigate()


  const handleCart = ()=>{
    navigate("/cart")
  }

  return (
    <header className="lg:pt-7.25 lg:pb-7">
      <nav>
        <div className="container hidden lg:block">
          <div className="flex">
            <Link to="/">
              <Image src="/images/logo.png" alt="logo" />
            </Link>

            <ul className="ml-14 flex gap-10.75">
              {navData?.map((item) => (
                <li
                  className="text-primary after:bg-primary relative text-sm leading-6 font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:duration-500 after:content-[''] hover:after:w-[70%]"
                  key={item.id}
                >
                  <Link to={item.path}>{item?.title}</Link>
                </li>
              ))}
            </ul>
            {/* icons  */}
            <div className="ml-auto flex items-center gap-8">
              <button className="cursor-pointer">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_6_7)">
                    <path
                      d="M8.82291 0C3.95809 0 0 3.95121 0 8.80758C0 13.6642 3.95809 17.6152 8.82291 17.6152C13.688 17.6152 17.6458 13.6642 17.6458 8.80758C17.6458 3.95121 13.688 0 8.82291 0ZM8.82291 15.9892C4.85613 15.9892 1.62885 12.7675 1.62885 8.80762C1.62885 4.84773 4.85613 1.62602 8.82291 1.62602C12.7897 1.62602 16.017 4.84769 16.017 8.80758C16.017 12.7675 12.7897 15.9892 8.82291 15.9892Z"
                      fill="#222222"
                    />
                    <path
                      d="M19.7962 18.6122L15.1268 13.9509C14.8086 13.6333 14.2934 13.6333 13.9752 13.9509C13.657 14.2683 13.657 14.7832 13.9752 15.1005L18.6446 19.7618C18.8036 19.9206 19.0119 20 19.2204 20C19.4286 20 19.6371 19.9206 19.7962 19.7618C20.1143 19.4444 20.1143 18.9295 19.7962 18.6122Z"
                      fill="#222222"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6_7">
                      <rect width="20.0348" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <Link to="/signin"  className="cursor-pointer">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_6_29)">
                    <path
                      d="M10.0175 11.2652C3.99775 11.2652 0.682495 14.108 0.682495 19.2701C0.682495 19.6732 1.00982 20 1.41369 20H18.6212C19.0251 20 19.3524 19.6732 19.3524 19.2701C19.3524 14.1083 16.0372 11.2652 10.0175 11.2652ZM2.17149 18.5402C2.4591 14.6805 5.09505 12.7251 10.0175 12.7251C14.9399 12.7251 17.5759 14.6805 17.8637 18.5402H2.17149Z"
                      fill="#222222"
                    />
                    <path
                      d="M10.0174 0C7.25222 0 5.16711 2.12336 5.16711 4.93895C5.16711 7.83699 7.34292 10.1944 10.0174 10.1944C12.6918 10.1944 14.8676 7.83699 14.8676 4.93918C14.8676 2.12336 12.7825 0 10.0174 0ZM10.0174 8.7348C8.14917 8.7348 6.6295 7.03211 6.6295 4.93918C6.6295 2.92313 8.05436 1.45984 10.0174 1.45984C11.949 1.45984 13.4053 2.95547 13.4053 4.93918C13.4053 7.03211 11.8856 8.7348 10.0174 8.7348Z"
                      fill="#222222"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6_29">
                      <rect width="20.0348" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>

              <button onClick={handleCart} className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.6562 4.6875H15.2755C14.9652 2.05164 12.7179 0 10 0C7.28215 0 5.0348 2.05164 4.72445 4.6875H2.34375C1.91227 4.6875 1.5625 5.03727 1.5625 5.46875V19.2188C1.5625 19.6502 1.91227 20 2.34375 20H17.6562C18.0877 20 18.4375 19.6502 18.4375 19.2188V5.46875C18.4375 5.03727 18.0877 4.6875 17.6562 4.6875ZM10 1.5625C11.8548 1.5625 13.3992 2.91621 13.6976 4.6875H6.30238C6.60082 2.91621 8.14516 1.5625 10 1.5625ZM16.875 18.4375H3.125V6.25H4.6875V8.59375C4.6875 9.02523 5.03727 9.375 5.46875 9.375C5.90023 9.375 6.25 9.02523 6.25 8.59375V6.25H13.75V8.59375C13.75 9.02523 14.0998 9.375 14.5312 9.375C14.9627 9.375 15.3125 9.02523 15.3125 8.59375V6.25H16.875V18.4375Z"
                    fill="#222222"
                  />
                </svg>
                <span className="absolute -right-2 -bottom-3 block size-4 rounded-full bg-[#B9A16B] text-[10px] font-medium text-white">
                  {cart.length}
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* ==============mobile responsive navbar ============ */}
        <div className="flex items-center justify-between overflow-hidden p-4 lg:hidden">
          <button onClick={() => setMenuActive(true)}>
            <svg
              width="25"
              height="18"
              viewBox="0 0 25 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="25" height="2" fill="#222222" />
              <rect y="8" width="20" height="2" fill="#222222" />
              <rect y="16" width="25" height="2" fill="#222222" />
            </svg>
          </button>

          <ul
            className={`absolute top-0 duration-300 ${menuActive ? "left-0" : "-left-full "} z-50 h-screen w-full bg-black pt-10`}
          >
            <IoMdClose
              onClick={() => setMenuActive(false)}
              size={25}
              className="absolute top-2 right-4 text-white"
            />

            {navData?.map((item) => (
              <li
                className="mt-2 text-center text-sm leading-6 font-medium text-white"
                key={item.id}
              >
                {item?.title}{" "}
              </li>
            ))}
          </ul>

          <Link to="/">
            <Image src="/images/logo.png" alt="logo" />
          </Link>

          <button className="relative">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.6562 4.6875H15.2755C14.9652 2.05164 12.7179 0 10 0C7.28215 0 5.0348 2.05164 4.72445 4.6875H2.34375C1.91227 4.6875 1.5625 5.03727 1.5625 5.46875V19.2188C1.5625 19.6502 1.91227 20 2.34375 20H17.6562C18.0877 20 18.4375 19.6502 18.4375 19.2188V5.46875C18.4375 5.03727 18.0877 4.6875 17.6562 4.6875ZM10 1.5625C11.8548 1.5625 13.3992 2.91621 13.6976 4.6875H6.30238C6.60082 2.91621 8.14516 1.5625 10 1.5625ZM16.875 18.4375H3.125V6.25H4.6875V8.59375C4.6875 9.02523 5.03727 9.375 5.46875 9.375C5.90023 9.375 6.25 9.02523 6.25 8.59375V6.25H13.75V8.59375C13.75 9.02523 14.0998 9.375 14.5312 9.375C14.9627 9.375 15.3125 9.02523 15.3125 8.59375V6.25H16.875V18.4375Z"
                fill="#222222"
              />
            </svg>
            <span className="absolute -right-2 -bottom-3 block size-4 rounded-full bg-[#B9A16B] text-[10px] font-medium text-white">
              2
            </span>
          </button>
        </div>
        {/* ==============mobile responsive navbar ============ */}
      </nav>
    </header>
  );
};

export default Header;
