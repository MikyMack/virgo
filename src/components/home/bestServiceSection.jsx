
import { GiCandleFlame, GiCandleHolder, GiCandleLight } from "react-icons/gi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

const BestServiceSection = () => {
    return (
        <section className="lg:container md:py-12 bg-white font-abc">
            {/* Section Title */}
            <div className="text-center mb-12">
                <p className="text-gray-500 uppercase tracking-wide py-5 text-sm">
                    Effective Ways
                </p>
                <h2 className="text-4xl text-gray-800">Our Best Service</h2>
                <p className="text-gray-600 mt-2">
                    Authorities in our business will tell in no uncertain terms.
                </p>
            </div>

            {/* Cards Grid for Desktop */}
            <div className="hidden md:grid container mx-auto px-4 pt-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="relative bg-white border border-[#b8ccc6] p-6 pb-20 text-center transition-transform hover:-translate-y-1 ">
                    {/* Icon */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-full p-4">
                        <span className="text-[70px] text-[#b8ccc6]">
                            <GiCandleLight />
                        </span>
                    </div>
                    <h3 className="mt-10 text-xl font-medium text-gray-800">
                        Decorative Columns
                    </h3>
                    <p className="text-gray-600 mt-4">
                    Cottage out enabled was entered greatly prevent message. No procured
                    unlocked an likewise. Dear but what she been over body.
                    </p>
                    {/* Button */}
                    <button
                        className="absolute lg:bottom-4  md:translate-y-14 sm:left-[30px]  md:left-[60px] lg:left-[65px] xl:left-[140px] xl:transform lg:translate-y-10 bg-[#b8ccc6] text-white font-semibold py-3 px-6  hover:bg-teal-300 transition-colors"
                    >
                        VIEW MORE
                    </button> 
                </div>

                {/* Card 2 */}
                <div className="relative bg-white border border-[#b8ccc6] p-6 pb-20 text-center transition-transform hover:-translate-y-1 ">
                    {/* Icon */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-full p-4">
                        <span className="text-[70px] text-[#b8ccc6]">
                            <GiCandleFlame />
                        </span>
                    </div>
                    <h3 className="mt-10 text-xl font-medium text-gray-800">
                        Home Vases
                    </h3>
                    <p className="text-gray-600 mt-4">
                        Cottage out enabled was entered greatly prevent message. No procured
                        unlocked an likewise. Dear but what she been over body.
                    </p>
                    {/* Button */}
                    <button
                        href="#"
                        className="absolute lg:bottom-4 md:translate-y-14  md:left-[60px] lg:left-[65px] xl:left-[140px] lg:transform lg:translate-y-10 bg-[#b8ccc6] text-white font-semibold py-3 px-6  hover:bg-teal-300 transition-colors"
                    >
                        VIEW MORE
                    </button>
                </div>

                {/* Card 3 */}
                <div className="relative bg-white border border-[#b8ccc6] p-6 pb-20 text-center transition-transform hover:-translate-y-1 ">
                    {/* Icon */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-full p-4">
                        <span className="text-[70px] text-[#b8ccc6]">
                            <GiCandleHolder />
                        </span>
                    </div>
                    <h3 className="mt-10 text-xl font-medium text-gray-800">
                        Aroma Candles
                    </h3>
                    <p className="text-gray-600 mt-4">
                        Facere possimus, omnis voluptas assumenda est, omnis dolor
                        repellendus. Temporibus autem quibusdam et officiis eart.
                    </p>
                    {/* Button */}
                    <button
                        href="#"
                        className="absolute lg:bottom-4 md:translate-y-14  md:left-[60px] lg:left-[65px] xl:left-[140px] lg:transform lg:translate-y-10 bg-[#b8ccc6] text-white font-semibold py-3 px-6  hover:bg-teal-300 transition-colors"
                    >
                        VIEW MORE
                    </button>
                </div>
            </div>

            {/* Cards Slider for Mobile */}
            <div className="md:hidden px-4">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    className="mySwiper"
                >
                    {/* Card 1 */}
                    <SwiperSlide>
                        <div className="relative bg-white border mt-11 border-[#b8ccc6] p-7 pb-15 text-center transition-transform hover:-translate-y-1">
                            {/* Icon */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-md">
                                <span className="text-[50px] text-[#b8ccc6]">
                                    <GiCandleLight />
                                </span>
                            </div>
                            <h3 className="mt-10 text-xl font-medium text-gray-800">
                                Decorative Columns
                            </h3>
                            <p className="text-gray-600 mt-4">
                                Supported neglected met she therefore unwilling discovery
                                remainder. Way sentiments two indulgence uncommonly.
                            </p>
                        </div>
                    </SwiperSlide>

                    {/* Card 2 */}
                    <SwiperSlide>
                        <div className="relative bg-white border mt-11 mb-10 border-[#b8ccc6] p-6 pb-15 text-center transition-transform hover:-translate-y-1">
                            {/* Icon */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-md">
                                <span className="text-[50px] text-[#b8ccc6]">
                                    <GiCandleFlame />
                                </span>
                            </div>
                            <h3 className="mt-10 text-xl font-medium text-gray-800">
                                Home Vases
                            </h3>
                            <p className="text-gray-600 mt-4">
                                Cottage out enabled was entered greatly prevent message. No
                                procured unlocked an likewise. Dear but what she been over body.
                            </p>
                     
                        </div>
                    </SwiperSlide>

                    {/* Card 3 */}
                    <SwiperSlide>
                        <div className="relative bg-white border mt-11 border-[#b8ccc6] p-6 pb-15 text-center transition-transform hover:-translate-y-1">
                            {/* Icon */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-md">
                                <span className="text-[50px] text-[#b8ccc6]">
                                    <GiCandleHolder />
                                </span>
                            </div>
                            <h3 className="mt-10 text-xl font-medium text-gray-800">
                                Aroma Candles
                            </h3>
                            <p className="text-gray-600 mt-4">
                                Facere possimus, omnis voluptas assumenda est, omnis dolor
                                repellendus. Temporibus autem quibusdam et officiis eart.
                            </p>
                       
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
};

export default BestServiceSection;
