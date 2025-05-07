
import img1 from "../../assets/footer/story1.webp";
import img2 from "../../assets/footer/story2.webp";
import img3 from "../../assets/footer/story3.webp";
import img4 from "../../assets/footer/story4.webp";
import img5 from "../../assets/footer/story5.webp";
import img6 from "../../assets/footer/story6.webp";
import img7 from "../../assets/footer/story7.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { CiChat1 } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";
import SampleNextArrow from "../home/nextArrow";
import SamplePrevArrow from "../home/previousArrow";
import { useRef } from "react";
import { FaFacebook, FaTwitter, FaYoutube, FaPinterest, FaInstagram } from "react-icons/fa";
import logo from "../../assets/logo/logo.webp"
import { FaRegCopyright } from "react-icons/fa";
import payment from "../../assets/payments.png"
// import './footer.css';
import './footer.css'
const data = [
    { id: 1, image: img1, caption: "Our first story", likes: 120, comments: 30 },
    { id: 2, image: img2, caption: "Our second story", likes: 150, comments: 45 },
    { id: 3, image: img3, caption: "Our third story", likes: 200, comments: 60 },
    { id: 4, image: img4, caption: "Our fourth story", likes: 180, comments: 50 },
    { id: 5, image: img5, caption: "Our fifth story", likes: 220, comments: 70 },
    { id: 6, image: img6, caption: "Our sixth story", likes: 170, comments: 40 },
    { id: 7, image: img7, caption: "Our seventh story", likes: 190, comments: 55 },
];

export default function Footer() {
    const swiperRef = useRef(null);

    return (
        <footer className="">
            {/* Top Section */}
            <div className=" text-center md:py-12">
                <p className="uppercase tracking-wide py-5 text-gray-500">See our Collection</p>
                <h2 className="text-4xl text-gray-800">Our Instagram Stories</h2>
                <p className="text-gray-600 mt-6">Built a tested code base or had them built, you decided on a content.</p>

                <div className="relative md:mt-8">
                    <Swiper
                        slidesPerView={2}
                        loop={true}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            768: { slidesPerView: 3, spaceBetween: 30 },
                            1024: { slidesPerView: 4, spaceBetween: 40 },
                            1280: { slidesPerView: 5, spaceBetween: 50 },
                        }}
                        modules={[Navigation]}
                        onSwiper={(swiper) => { swiperRef.current = swiper; }}
                        className="mySwiper"
                    >
                        {data.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="relative flex items-center justify-center overflow-hidden group">
                                    <img
                                        src={item.image}
                                        alt={item.caption}
                                        className="w-[300px] h-full py-10 object-contain transform duration-300 brightness-100 group-hover:brightness-50 transition-all"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-opacity-30">
                                        <div className="text-white flex gap-16 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="flex items-center cursor-pointer">
                                                <AiOutlineLike className="mr-2 text-xl md:text-3xl" />
                                                <span className="text-xl md:text-2xl">{item.likes}</span>
                                            </div>
                                            <div className="flex items-center cursor-pointer">
                                                <CiChat1 className="mr-2 text-xl md:text-3xl" />
                                                <span className="text-xl md:text-2xl">{item.comments}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <SamplePrevArrow onClick={() => swiperRef.current?.slidePrev()} />
                    <SampleNextArrow onClick={() => swiperRef.current?.slideNext()} />
                </div>
            </div>

            <div className=" bg-gray-100 py-12 font-abc">
                <div className="xl:container ft-sec mx-auto px-4 lg:px-0">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center gap-8">
                        <div  className="ft-sec">
                            <h3 className="font-semibold">My Account</h3>
                            <ul className="text-gray-700 py-2">
                                <li className="cursor-pointer hover:text-gray-800 p-1">Sign in / Sign Up</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">My Orders</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">My Cart</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">Track My Orders</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">My Wishlist</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">Account Setting</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold">About Us</h3>
                            <ul className="text-gray-700 py-2">
                                <li className="cursor-pointer hover:text-gray-800 p-1">Company Profile</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">Resources / Blogs</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">Careers</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">Download Catalogue</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">Contact Us</li>
                            </ul>
                        </div>

                        {/* Column 3 */}
                        <div>
                            <h3 className="font-semibold">Customer Care</h3>
                            <ul className="text-gray-700 py-2">
                                <li className="cursor-pointer hover:text-gray-800 p-1">Payment Method</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">Shipping and Delivery</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">Terms and Conditions</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">FAQ</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">Easy Return</li>
                            </ul>
                        </div>

                        {/* Column 4 */}
                        <div>
                            <h3 className="font-semibold">Explore</h3>
                            <ul className="text-gray-700 py-2">
                                <li className="cursor-pointer hover:text-gray-800 p-1">Shop</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">Featured Products</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">Trending Products</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">Best Sellers</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">Corporate Gifting</li>
                            </ul>
                        </div>

                        {/* Column 5 */}
                        <div>
                            <h3 className="font-semibold">Offers</h3>
                            <ul className="text-gray-700 py-2">
                                <li className="cursor-pointer hover:text-gray-800 p-1">Free Shipping</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">Coupons</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">Deals & Discounts</li>
                                <li className="cursor-pointer hover:text-gray-800 p-1">Current Offers</li>
                            </ul>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 items-center'>
                        <div className='flex justify-center'>
                            <img className="w-24 h-24 lg:w-28 lg:h-28 mb-4 lg:mb-0" src={logo} alt="logo" />
                        </div>
                        <div className="text-center border-2 border-secondary p-2">
                            <h3 className="text-xl">Subscribe to our newsletter to receive news and updates.</h3>
                            <form className="my-5 flex items-center justify-center">
                                <input type="email" className="p-2 border-b-2 border-secondary outline-none" placeholder="Email Address" />
                                <button type="submit" className="bg-[#5fc9d6] p-2 ml-1 text-white cursor-pointer">Subscribe</button>
                            </form>
                            <p className="subscribe-info mt-2 text-gray-500">We dont spam! Read more in our <span className='text-gray-800 cursor-pointer'>privacy policy.</span> </p>
                        </div>
                        <div className='flex flex-col text-center'>
                            <h2 className='font-semibold'>Registered Office Address:</h2>
                            <h2>BMP 105, Ground Floor, 4th Main, G.M. Palya, Bengaluru, INDIA, <br /> Pin Code - 560075</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="xl:container bg-gray-200 pb-[100px] lg:pb-2 pt-2">
                <div className="xl:container mx-auto px-4 lg:px-0 flex flex-col lg:flex-row justify-between items-center">
                    <div className="flex flex-col lg:flex-row items-center mb-4 lg:mb-0 text-center lg:text-left">
                        <p className="text-gray-700">
                            <FaRegCopyright className="inline mr-2" /> Virgo Creation Created By <span className="text-blue-700">Trivlogic</span>
                        </p>
                    </div>
                    <div className="flex space-x-4 mb-4 lg:mb-0">
                        <FaFacebook className="text-gray-700 hover:text-blue-700 cursor-pointer" />
                        <FaTwitter className="text-gray-700 hover:text-blue-700 cursor-pointer" />
                        <FaYoutube className="text-gray-700 hover:text-red-700 cursor-pointer" />
                        <FaPinterest className="text-gray-700 hover:text-red-700 cursor-pointer" />
                        <FaInstagram className="text-gray-700 hover:text-pink-700 cursor-pointer" />
                    </div>
                    <img src={payment} alt="payments" className="payments-image" />
                </div>
            </div>
        </footer>
    );
}
