import { addtocart } from "../../slices/cartSlice";
import { Image } from "./Image";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
const Product = ({ item, view }) => {
  let dispatch = useDispatch()

  const handleAddtoCart = (pitem)=>{
    dispatch(addtocart({
      id:pitem.id,
      title:pitem.title,
      price:pitem.price,
      image : pitem.thumbnail
    }))

    toast.success("Product add to Cart ",{
      className:"",
       duration: 5000,
      
    })
  }
  return (
    <div className="group relative w-full">
          <Toaster position="top-center" reverseOrder={true}/>
      <div className="relative overflow-hidden">
        <Image className="w-full" src={item.thumbnail} alt={item.title} />
        <button
          onClick={() => handleAddtoCart(item)}
          className="absolute bottom-3 left-1/2 h-11 w-[90%] max-w-77.5 -translate-x-1/2 cursor-pointer bg-white text-center text-xs font-medium text-black shadow-lg shadow-gray-200 transition-all duration-300 ease-in-out sm:text-sm lg:invisible lg:translate-y-2 lg:opacity-0 lg:group-hover:visible lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
        >
          ADD TO CART
        </button>
      </div>
      <div className="mt-3.5">
        <div className="flex justify-between">
          <h4
            className={`text-gray font-normal capitalize ${
              view === 2 ? "text-base sm:text-lg lg:text-xl" : "text-sm"
            }`}
          >
            {item.category}
          </h4>
          <button>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_31_47)">
                <path
                  d="M14.7145 2.64647C12.9744 0.906815 10.1436 0.906815 8.40393 2.64647L7.99986 3.0503L7.59603 2.64647C5.85637 0.906579 3.02531 0.906579 1.28565 2.64647C-0.418689 4.35081 -0.429756 7.05236 1.25998 8.93071C2.80114 10.6433 7.34643 14.3432 7.53928 14.4998C7.6702 14.6063 7.82773 14.6581 7.98432 14.6581C7.9895 14.6581 7.99468 14.6581 7.99963 14.6578C8.16163 14.6654 8.32481 14.6098 8.45997 14.4998C8.65282 14.3432 13.1986 10.6433 14.7402 8.93048C16.4297 7.05236 16.4186 4.35081 14.7145 2.64647ZM13.69 7.98554C12.4884 9.32042 9.18546 12.0735 7.99963 13.0505C6.8138 12.0738 3.51155 9.32089 2.31018 7.98577C1.13142 6.67561 1.12035 4.80974 2.28452 3.64557C2.87908 3.05125 3.6599 2.75385 4.44072 2.75385C5.22154 2.75385 6.00236 3.05101 6.59693 3.64557L7.48512 4.53377C7.59085 4.6395 7.72412 4.7026 7.86399 4.72474C8.09099 4.77348 8.33729 4.71014 8.51389 4.53401L9.40256 3.64557C10.5919 2.45668 12.5266 2.45692 13.7152 3.64557C14.8794 4.80974 14.8683 6.67561 13.69 7.98554Z"
                  fill="#767676"
                />
              </g>
              <defs>
                <clipPath id="clip0_31_47">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <h3
          className={`text-primary mt-2.25 font-normal ${
            view === 2 ? "text-lg sm:text-xl lg:text-2xl" : "text-sm lg:text-base"
          }`}
        >
          {item.title}
        </h3>
        <h5 className="text-primary text-sm font-normal lg:text-base">
          ${item.price}
        </h5>
      </div>
    </div>
  );
};

export default Product;
