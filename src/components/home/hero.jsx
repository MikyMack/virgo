import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Import the images
import asin1 from '../../assets/products/asin1.png'; 
import asin2 from '../../assets/products/asin2.png'; // Adjust the path as needed

const categoryItems = [
    {
        image: asin1,
        title: 'Scented Candles',
    },
    {
        image: asin2,
        title: 'Decorative Candles',
    },
    {
        image: asin1,
        title: 'Aromatic Candles',
    },
    {
        image: asin2,
        title: 'Luxury Candles',
    },
    {
        image: asin1,
        title: 'Eco-Friendly Candles',
    },
    {
        image: asin2,
        title: 'Handmade Candles',
    },
];

const DecorSection = () => {
    return (
        <div className="xl:container mx-auto md:my-20 my-5 px-4 font-abc">
            {/* Section Title */}
            <h2 className="text-3xl md:text-4xl font-bold font-normal text-center mb-10 text-gray-800 relative">
                Explore Popular Categories
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white rounded-full"></span>
            </h2>

            {/* Desktop and Tablet View */}
            <div className="hidden md:flex justify-between items-center gap-6">
                {categoryItems?.map((item, index) => (
                    <div 
                        key={index} 
                        className="flex flex-col items-center justify-center group transition-all duration-300 hover:-translate-y-2"
                    >
                        <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 border-4 border-[#b8ccc6]">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300 rounded-full"
                            />
                        </div>
                        <p className="mt-4 text-gray-700 font-semibold text-center text-lg group-hover:text-amber-600 transition-colors duration-300">
                            {item.title}
                        </p>
                    </div>
                ))}
            </div>

            {/* Mobile Slider View */}
            <div className="md:hidden">
                <Swiper
                    slidesPerView={2.5}
                    spaceBetween={20}
                    loop
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 25,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                    }}
                    className="mySwiper"
                >
                    {categoryItems.map((item, index) => (
                        <SwiperSlide key={index} className="flex flex-col items-center justify-center pb-6">
                            <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-2 border-amber-100">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                            <p className="mt-3 text-gray-700 font-semibold text-center text-base">
                                {item.title}
                            </p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default DecorSection;