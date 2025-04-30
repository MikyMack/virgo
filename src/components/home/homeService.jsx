import img1 from "../../assets/banner/homeDec1.webp"
import img2 from "../../assets/banner/homedec2.jpg"
import img3 from "../../assets/banner/homedec3.jpg"
import { Link } from "react-router-dom";

const HomeDecorSection = () => {
    return (
        <section className="xl:container lg:flex justify-between items-center pt-16 p-6 font-abc">
            {/* Left Image */}
            <div className="relative brandsImage w-full lg:w-3/5">
                <img
                    src={img1}
                    alt="Modern Home Decoration"
                    className=" w-full h-auto object-contain hover:animate-hover-animation hover:scale-105 transition-transform duration-300 ease-in-out"
                />
                {/* Overlay text */}
                <div className="absolute bottom-0 left-0 bg-[#b8ccc6] md:p-14 pt-5  text-center xl:w-1/4 xl:h-1/4 w-1/4 h-1/4 ">
                <div className="flex flex-col items-center justify-center h-full">
                <h3 className="text-[15px] md:text-[30px] xl:text-[30px] text-white">Gifting.</h3>
                    <button className="mt-2 px-2 py-1 lg:px-4 lg:py-2 xxs:pb-6 text-white font-semibold rounded text-xs lg:text-sm underline hover:underline hover:text-gray-500 ">
                        View More
                    </button>
                </div>
                </div>
            </div>

            {/* Right Text Content */}
            <div className=" lg:absolute  lg:w-2/5 md:mt-6 lg:right-[100px] p-5 md:p-16 bg-white">
                <div className="flex flex-col justify-between gap-2">
                    <div className="">
                        <h2 className="text-3xl md:text-[40px] text-gray-800 mb-4">
                            New Decoration
                        </h2>
                        <h2 className="text-3xl md:text-[40px] text-gray-800 mb-10">
                            Solutions for Home.
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg mb-8">
                            But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born, and I will give you a complete account of the system, and expound the actual teachings of the great consequences.
                        </p>
                    </div>

                    {/* Small Images/Grid Items */}
                    <div className="flex flex-row items-center justify-center gap-4">
                        <div className="relative brandsImage h-32 sm:h-40 lg:h-[200px] rounded-lg overflow-hidden">
                            <img
                                src={img2} 
                                alt="Interior Decoration"
                                className="w-full h-full
                                 object-contain"
                            />
                        </div>
                        <div className="relative brandsImage h-32 sm:h-40 lg:h-[200px] rounded-lg overflow-hidden">
                            <img
                                src={img3}
                                alt="Interior Decoration"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link to="/shop">
                            <button
                                className="inline-block bg-[#b8ccc6] text-white py-4 px-4 text-sm font-medium hover:bg-gray-800 transition duration-300"
                            >
                                TO SHOP
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeDecorSection;
