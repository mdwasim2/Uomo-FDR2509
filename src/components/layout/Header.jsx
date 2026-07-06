import { Link } from "react-router";
import { Image } from "../common/Image";
import navData from "../../api/navbardata.json";

const Header = () => {
  return (
    <header className="pt-7.25 pb-7">
      <nav>
        <div className="container">
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
                  {item?.title}{" "}
                </li>
              ))}
            </ul>
            {/* icons  */}
            <div className="ml-auto flex gap-8">
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
              <button className="cursor-pointer">
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
              </button>
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
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
