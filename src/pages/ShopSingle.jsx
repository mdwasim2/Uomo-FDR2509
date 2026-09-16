import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { addtocart } from "../slices/cartSlice";
import Breadcrumb from "../components/common/Breadcrumb";
import { Image } from "../components/common/Image";

const ShopSingle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setActiveImage(0);
        setQuantity(1);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      dispatch(
        addtocart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.thumbnail,
        }),
      );
    }
    toast.success("Product add to Cart");
  };

  if (loading) {
    return (
      <div className="container mt-9 grid animate-pulse grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-15 lg:px-8">
        <div className="h-75 w-full rounded-md bg-gray-200 lg:h-125" />
        <div className="space-y-4">
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="h-6 w-2/3 rounded bg-gray-200" />
          <div className="h-4 w-1/4 rounded bg-gray-200" />
          <div className="h-24 w-full rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-9 px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-primary text-xl font-medium">Product not found</h2>
        <Link to="/shop" className="text-primary mt-4 inline-block underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.thumbnail];

  return (
    <div className="container mt-9 px-4 pb-16 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={true} />
      <Breadcrumb />

      <div className="mt-6 grid grid-cols-1 gap-8 lg:mt-9 lg:grid-cols-2 lg:gap-15">
        {/* Gallery */}
        <div>
          <div className="w-full overflow-hidden">
            <Image
              className="w-full object-cover"
              src={images[activeImage]}
              alt={product.title}
            />
          </div>
          {images.length > 1 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {images.map((img, index) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`h-16 w-16 shrink-0 overflow-hidden border ${
                    activeImage === index
                      ? "border-primary"
                      : "border-black/10"
                  }`}
                >
                  <Image
                    className="h-full w-full object-cover"
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h4 className="text-gray text-sm font-normal capitalize">
            {product.category}
          </h4>
          <h1 className="text-primary mt-2 text-2xl font-medium lg:text-3xl">
            {product.title}
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <h5 className="text-primary text-xl font-medium lg:text-2xl">
              ${product.price}
            </h5>
            {product.discountPercentage > 0 && (
              <span className="text-sm font-medium text-red-600">
                -{Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>

          <p className="text-gray mt-5 text-sm leading-6 lg:text-base">
            {product.description}
          </p>

          <ul className="text-gray mt-5 space-y-1 text-sm">
            <li>
              <span className="text-primary font-medium">Brand: </span>
              {product.brand || "N/A"}
            </li>
            <li>
              <span className="text-primary font-medium">Availability: </span>
              {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
            </li>
            {product.rating && (
              <li>
                <span className="text-primary font-medium">Rating: </span>
                {product.rating} / 5
              </li>
            )}
          </ul>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border border-black/10">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="h-11 w-11 cursor-pointer text-lg"
              >
                -
              </button>
              <span className="w-10 text-center text-sm">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="h-11 w-11 cursor-pointer text-lg"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="h-11 flex-1 cursor-pointer bg-black text-sm font-medium tracking-wide text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSingle;
