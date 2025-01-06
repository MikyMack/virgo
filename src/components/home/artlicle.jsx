import img1 from "../../assets/articles/a1.webp";
import img2 from "../../assets/articles/a2.webp";
import prfpic from "../../assets/prfpic.jpg";
import { FaRocketchat } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Article() {
  return (
    <div className="xl:container py-10 font-abc">
      <div className="flex flex-col items-center justify-center">
        <p className="text-gray-500 uppercase tracking-wide py-5 text-sm">
          SHARE BEST NEWS
        </p>
        <span className="text-4xl text-gray-800">Our New Article</span>
        <p className="text-gray-600 m-5">
          Happen, not always the way you like it, not always preferred.
        </p>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          {/* Article Card 1 */}
          <div className="relative flex flex-row shadow-xl w-full h-[350px] md:h-[300px] rounded-lg overflow-hidden">
            <div className="relative w-1/2">
              <img src={img1} alt="article" className="w-full h-full object-cover" />
              <div className="absolute top-7 left-7 w-16 h-16 bg-white bg-opacity-90 rounded-lg flex flex-col justify-center items-center p-1 text-gray-800 font-bold">
                <p className="text-lg">23</p>
                <p className="text-sm">JUL</p>
              </div>
            </div>
            <div className="lg:p-10 p-1 flex flex-col justify-between w-1/2 border border-green-200">
              <h2 className="text-2xl text-center text-gray-800 mb-4">Green Interior Design Inspiration</h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <img
                  className="rounded-full w-10 h-10 object-cover"
                  src={prfpic}
                  alt="profile"
                />
                <p className="text-gray-600 font-medium">Sad Sulmi</p>
                <span className="text-gray-500"><FaRocketchat size={20} /></span>
              </div>
              <p className="text-center text-gray-600 mb-4">
                Vivamus enim sagittis aptent hac mi dui aper aptent suspendisse cras odio bibendum augue rhoncus la...
              </p>
              <button className="text-center uppercase font-bold text-[#b8ccc6]">
                Continue Reading...
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {/* Article Card 2 */}
          <div className="relative flex flex-row shadow-xl w-full h-[350px] md:h-[300px] rounded-lg overflow-hidden">
            <div className="relative w-1/2">
              <img src={img2} alt="article" className="w-full h-full object-cover" />
              <div className="absolute top-7 left-7 w-16 h-16 bg-white bg-opacity-90 rounded-lg flex flex-col justify-center items-center p-1 text-gray-800 font-bold">
                <p className="text-lg">23</p>
                <p className="text-sm">JUL</p>
              </div>
            </div>
            <div className="flex flex-col justify-between w-1/2 p-1 lg:p-10 border border-green-200">
              <h2 className="text-2xl text-center text-gray-800">Minimalist Design Furniture 2024</h2>
              <div className="flex items-center justify-center gap-4">
                <img
                  className="rounded-full w-10 h-10 object-cover"
                  src={prfpic}
                  alt="profile"
                />
                <p className="text-gray-600 font-medium">Achu Jozef</p>
                <span className="text-gray-500"><FaRocketchat size={20} /></span>
              </div>
              <p className="text-center text-gray-600">
                A taciti cras scelerisque scelerisque gravida natoque nulla vestibulum turpis primis adipiscing fauc...
              </p>
              <button className="text-center uppercase font-bold text-[#b8ccc6]">
                Continue Reading...
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
