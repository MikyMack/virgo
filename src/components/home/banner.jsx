import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./banner.css"; // Assuming this exists for custom styles
import { LiaRupeeSignSolid } from "react-icons/lia";
import SamplePrevArrow from "./previousArrow";
import SampleNextArrow from "./nextArrow";
import { useRef } from "react";
import { Link } from "react-router-dom";
import bg1 from "../../assets/banner/portrait1.jpg";
import bg2 from "../../assets/banner/portrait2.jpg";

export default function Banner() {
  const swiperRef = useRef(null);
  const [banners, setBanners] = useState([]);

  // Static product data for left side (unchanged)
  const products = [
    {
      id: 1,
      title: "Two Bowls",
      description: "Marble and Brass.",
      price: "250.00",
      buttonText: "GO TO SHOP",
      leftImage: bg1,
    },
    {
      id: 2,
      title: "Candle Set",
      description: "Elegant and Stylish.",
      price: "180.00",
      buttonText: "BUY NOW",
      leftImage: bg2,
    },
    {
      id: 3,
      title: "Candle Set",
      description: "Elegant and Stylish.",
      price: "180.00",
      buttonText: "BUY NOW",
      leftImage: bg1,
    },
  ];

  // Fetch banners from localStorage
  useEffect(() => {
    const updateBanners = () => {
      const storedBanners = JSON.parse(localStorage.getItem("banners")) || [];
      const publishedBanners = storedBanners.filter(banner => banner.published);
      setBanners(publishedBanners);
    };

    // Initial fetch
    updateBanners();

    // Poll localStorage for changes (simpler solution for same-tab updates)
    const interval = setInterval(updateBanners, 1000); // Check every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto mt-10 xl:container font-abc w-[95%]">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={40}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        speed={2000}
        loop={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="mySwiper"
      >
        {banners.map((banner, index) => {
          // Use the product data corresponding to the banner index (cycle through products if banners exceed products)
          const product = products[index % products.length];
          return (
            <SwiperSlide key={banner.id}>
              <div className="flex flex-row lg:m-0 rounded-lg overflow-hidden transition-transform duration-2000 ease-in-out w-full">
                {/* Left Side: Product Details (unchanged) */}
                <div
                  className="flex flex-col items-center w-full md:w-[45%] lg:w-[35%] h-[500px] justify-between py-[6vh] bg-no-repeat bg-cover"
                  style={{ backgroundImage: `url(${product.leftImage})` }}
                >
                  {/* Title */}
                  <div className="text-center mt-10">
                    <h4 className="text-white lg:text-4xl text-3xl font-medium mb-0 leading-[46px] uppercase">
                      {product.title}
                    </h4>
                  </div>
                  <div className="text-center mb-10">
                    <div className="flex items-center justify-center text-white mb-5 text-xl font-medium">
                      <span>
                        <LiaRupeeSignSolid />
                      </span>
                      {product.price}
                    </div>
                    <Link
                      to="/shop"
                      className="px-5 py-2.5 text-sm font-semibold text-white border-2 border-white rounded-md transition-colors duration-300 hover:text-gray-600 hover:border-white hover:bg-transparent cursor-pointer"
                    >
                      {product.buttonText}
                    </Link>
                  </div>
                </div>

                {/* Right Side: Dynamic Banner Image from localStorage */}
                <div className="hidden md:block w-full">
                  <img
                    src={banner.image}
                    alt={`Banner ${index + 1}`}
                    className="h-[500px] w-full object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <SamplePrevArrow onClick={() => swiperRef.current?.slidePrev()} />
        <SampleNextArrow onClick={() => swiperRef.current?.slideNext()} />
      </Swiper>
    </div>
  );
}