import { FaHome, FaRegLightbulb, FaRegImage, FaRegSun, FaRegCalendarAlt } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const decorItems = [
    {
        icon: <FaHome size={30} className="text-[#b8ccc6]" />,
        title: 'Home Decor',
        subtitle: 'But I must plain',
    },
    {
        icon: <FaRegLightbulb size={30} className="text-[#b8ccc6]" />,
        title: 'Ceiling Decor',
        subtitle: 'Pursues or desir',
    },
    {
        icon: <FaRegImage size={30} className="text-[#b8ccc6]" />,
        title: 'Wall Decor',
        subtitle: 'Except to obtain',
    },
    {
        icon: <FaRegSun size={30} className="text-[#b8ccc6]" />,
        title: 'Vase Decor',
        subtitle: 'Cum soluta nob',
    },
    {
        icon: <FaRegCalendarAlt size={30} className="text-[#b8ccc6]" />,
        title: 'Holiday Decor',
        subtitle: 'Sapiente delect',
    },
];

const DecorSection = () => {
    return (
        <div className="xl:container mx-auto md:my-20 my-5 px-4 font-abc">
            {/* Desktop and Tablet View */}
            <div className="hidden md:flex justify-between items-center">
                {decorItems?.map((item, index) => (
                    <div key={index} className="flex flex-row items-center justify-center space-y-2">
                        {item.icon}
                        <div className='flex flex-col items-center justify-center ml-3'>
                            <h2 className="font-medium text-lg lg:text-xl text-black text-center">{item.title}</h2>
                            <p className="text-gray-500 text-center">{item.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Slider View */}
            <div className="md:hidden">
                <Swiper
                    slidesPerView={2}
                    spaceBetween={5}
                    loop
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    }}
                    className="mySwiper"
                >
                    {decorItems.map((item, index) => (
                        <SwiperSlide key={index} className="flex flex-row items-center justify-center space-y-2">
                            {item.icon}
                            <div className='flex flex-col items-center justify-center ml-3'>
                            <h2 className="font-bold text-xl text-black">{item.title}</h2>
                            <p className="text-gray-500">{item.subtitle}</p>
                            </div>
                         
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default DecorSection;
