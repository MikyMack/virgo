import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './banner.css';
import { Navigation } from "swiper/modules";
import b1 from "../../assets/banner/banner1.png"
import b2 from "../../assets/banner/banner2.png"
import b3 from "../../assets/banner/banner3.png"
// import b4 from "../../assets/banner/bgl1.png"
// import b5 from "../../assets/banner/bgl2.png"
// import b6 from "../../assets/banner/bgl3.png"
import { LiaRupeeSignSolid } from "react-icons/lia";
import SamplePrevArrow from './previousArrow';
import SampleNextArrow from './nextArrow';
import { useRef } from "react";
import bg1 from "../../assets/banner/portrait1.jpg"
import bg2 from "../../assets/banner/portrait2.jpg"

const products = [
  {
      id: 1,
      title: 'Two Bowls',
      description: 'Marble and Brass.',
      price: '250.00',
      image: b1,
      buttonText: 'GO TO SHOP',
      leftImage: bg1,
  },
  {
      id: 2,
      title: 'Candle Set',
      description: 'Elegant and Stylish.',
      price: '180.00',
      image: b2,
      buttonText: 'BUY NOW',
      leftImage: bg2,
  },
  {
      id: 3,
      title: 'Candle Set',
      description: 'Elegant and Stylish.',
      price: '180.00',
      image: b3,
      buttonText: 'BUY NOW',
      leftImage: bg1,
  },
];

export default function Banner() {
    const swiperRef = useRef(null);
   

    return (
        <div className="mx-auto my-1 xl:container font-abc">
            <Swiper
                modules={[Navigation, Pagination, A11y, Autoplay]}
                spaceBetween={40}
                slidesPerView={1}
                autoplay={{ delay: 5000}}
                speed={2000}
                loop={true}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                className="mySwiper"
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <div className="flex flex-row lg:m-0 rounded-lg overflow-hidden transition-transform duration-2000 ease-in-out">
                            {/* Left Side: Product Details */}
                            <div className="flex flex-col items-center w-full md:w-[45%] lg:w-[35%] h-[500px] justify-between py-[6vh] bg-no-repeat bg-cover" style={{ backgroundImage: `url(${product.leftImage})` }}>
                                {/* Title */}
                                <div className="text-center mt-10">
                                    <h4 className="text-white lg:text-4xl text-3xl font-medium mb-0 leading-[46px] uppercase ">
                                        {product.title}
                                    </h4>
                                </div>
                                <div className="text-center mb-10">
                                    <div className="flex items-center text-center text-white mb-5 text-xl font-medium">
                                        <span><LiaRupeeSignSolid /></span>{product.price}
                                    </div>
                                    <a
                                        className="px-5 py-2.5 text-sm font-semibold text-white border-2 border-white rounded-md transition-colors duration-300 hover:text-gray-600 hover:border-white hover:bg-transparent cursor-pointer"
                                    >
                                        {product.buttonText}
                                    </a>
                                </div>
                            </div>
                            <div className="hidden md:block w-[85%]">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-[500px] object-cover"
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                <SamplePrevArrow onClick={() => swiperRef.current?.slidePrev()} />
                <SampleNextArrow onClick={() => swiperRef.current?.slideNext()} />
            </Swiper>
        </div>
    );
}