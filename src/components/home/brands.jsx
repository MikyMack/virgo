import dec1 from "../../assets/brands/deco1.webp"
import dec2 from "../../assets/brands/deco2.webp"
import dec3 from "../../assets/brands/deco3.webp"
import 'swiper/css';
import "./brands.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import badge from "../../assets/icons/badge.png"
import reliability from "../../assets/icons/reliability.png"
import handmade from "../../assets/icons/handmade.png"
import ventilation from "../../assets/icons/ventilation.png"
import pour from "../../assets/icons/pour.png"
import cruelty_free from "../../assets/icons/cruelty-free.png"

export default function Brandslogo() {

    return (
        <div className="mx-auto xl:container md:py-10">
            <div className="flex flex-col lg:flex-row overflow-hidden items-center justify-center pt-10 gap-8">
                {/* First Image Container */}
                <div className="relative brandsImage w-full lg:w-auto">
                    <img
                        src={dec1}
                        alt="dec"
                        className="w-full h-auto object-contain hover:animate-hover-animation hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                    <div className="absolute bottom-0 left-0 bg-[#b8ccc6] p-4 w-full text-center lg:w-1/2 lg:h-1/3">
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-[24px] md:text-[30px] xl:text-[40px] text-white">
                                Upto 90% on candles.
                            </p>
                            <button className="mt-2 px-2 py-1 lg:px-4 lg:py-2 text-white font-semibold rounded text-xs lg:text-sm underline hover:underline hover:text-gray-500 uppercase">
                                Lightning deals
                            </button>
                        </div>

                    </div>
                </div>

                {/* Second Column */}
                <div className="flex flex-col items-center gap-4 w-full lg:w-auto">
                    {/* Second Image Container */}
                    <div className="relative brandsImage w-full lg:w-auto">
                        <img
                            src={dec2}
                            alt="dec"
                            className="w-full h-auto object-contain hover:animate-hover-animation hover:scale-105 transition-transform duration-300 ease-in-out"
                        />
                        <div className="absolute bottom-0 left-0 bg-[#b8ccc6] p-4 lg:p-6 w-full text-center lg:w-1/2 lg:h-1/2">
                            <div className="flex flex-col items-center justify-center h-full">
                                <p className="text-[18px] md:text-[20px] lg:text-[20px] text-white">
                                    Upto 90% on candles Holders
                                </p>
                                <button className="mt-2 px-2 py-1 lg:px-4 lg:py-2 text-white font-semibold rounded text-xs lg:text-sm underline hover:underline hover:text-gray-500 uppercase">
                                    Deal Of The Day
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Third Image Container */}
                    <div className="relative brandsImage w-full lg:w-auto">
                        <img
                            src={dec3}
                            alt="dec"
                            className="w-full h-auto object-contain hover:animate-hover-animation hover:scale-105 transition-transform duration-300 ease-in-out"
                        />
                        <div className="absolute bottom-0 left-0 bg-[#b8ccc6] p-4 lg:p-6 w-full lg:w-1/2 lg:h-1/2">
                            <div className="flex flex-col items-center justify-center text-center h-full">
                                <p className="text-[18px] md:text-[20px] lg:text-[20px] text-white">
                                    Upto 90% Off
                                </p>
                                <button className="mt-2 px-2 py-1 lg:py-2 text-white font-semibold rounded text-xs lg:text-sm underline hover:underline hover:text-gray-500 uppercase">
                                    Lowest of all time
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-8">
                <h2 className="text-2xl font-semibold font-body text-gray-700 mb-4 uppercase py-5">Here&apos;s Why You Can Trust Us</h2>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                        },
                        425: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 5,
                        },
                        1440: {
                            slidesPerView: 6,
                        },
                    }}
                    className="flex justify-center"
                >
                    <SwiperSlide>
                        <div className="group flex flex-col items-center justify-center gap-4 bg-green-50 rounded-full w-[150px] h-[150px] mx-auto p-5">
                            <img className="w-16 h-16 group-hover:w-20 group-hover:h-20 transition-all duration-300" src={badge} alt="..." />
                            {/* <FaCheckCircle className="w-16 h-16 mb-2 text-white group-hover:w-20 group-hover:h-20 transition-all duration-300" /> */}
                            <p className="text-sm text-gray-700">Strict quality control</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="group flex flex-col items-center justify-center gap-4 bg-green-50 rounded-full w-[150px] h-[150px] mx-auto p-5">
                        <img className="w-16 h-16 group-hover:w-20 group-hover:h-20 transition-all duration-300" src={reliability} alt="..." />
                            {/* <FaClock className="w-16 h-16 mb-2 text-white group-hover:w-20 group-hover:h-20 transition-all duration-300" /> */}
                            <p className="text-sm text-gray-700">Long lasting aroma</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="group flex flex-col items-center justify-center gap-4 bg-green-50 rounded-full w-[150px] h-[150px] mx-auto p-5">
                        <img className="w-16 h-16 group-hover:w-20 group-hover:h-20 transition-all duration-300" src={handmade} alt="..." />
                            {/* <FaHandHoldingHeart className="w-16 h-16 mb-2 text-white group-hover:w-20 group-hover:h-20 transition-all duration-300" /> */}
                            <p className="text-sm text-gray-700">Handmade</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="group flex flex-col items-center justify-center gap-4 bg-green-50 rounded-full w-[150px] h-[150px] mx-auto p-5">
                        <img className="w-16 h-16 group-hover:w-20 group-hover:h-20 transition-all duration-300" src={ventilation} alt="..." />
                            {/* <FaLeaf className="w-16 h-16 mb-2 text-white group-hover:w-20 group-hover:h-20 transition-all duration-300" /> */}
                            <p className="text-sm text-gray-700">Freshly made</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="group flex flex-col items-center justify-center gap-4 bg-green-50 rounded-full w-[150px] h-[150px] mx-auto p-5">
                        <img className="w-16 h-16 group-hover:w-20 group-hover:h-20 transition-all duration-300" src={pour} alt="..." />
                            {/* <FaSeedling className="w-16 h-16 mb-2 text-white group-hover:w-20 group-hover:h-20 transition-all duration-300" /> */}
                            <p className="text-sm text-gray-700">Ethically sourced ingredients</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="group flex flex-col items-center justify-center gap-4 bg-green-50 rounded-full w-[150px] h-[150px] mx-auto p-5">
                        <img className="w-16 h-16 group-hover:w-20 group-hover:h-20 transition-all duration-300" src={cruelty_free} alt="..." />
                            {/* <FaPaw className="w-16 h-16 mb-2 text-white group-hover:w-20 group-hover:h-20 transition-all duration-300" /> */}
                            <p className="text-sm text-gray-700">Cruelty free</p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}