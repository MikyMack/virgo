import bgimg from "../../assets/breadcrumps/blogbread.jpg"
import b1 from "../../assets/blogs/b1.webp"
import b2 from "../../assets/blogs/b2.jpg"
import b3 from "../../assets/blogs/b3.webp"
import b4 from "../../assets/blogs/b4.webp"
import b5 from "../../assets/blogs/b5.webp"
import b6 from "../../assets/blogs/b6.webp"
import b7 from "../../assets/blogs/b7.webp"
import b8 from "../../assets/blogs/b8.jpg"
import b9 from "../../assets/blogs/b9.webp"
import b10 from "../../assets/blogs/b10.jpg"
import b11 from "../../assets/blogs/b11.webp"
import b12 from "../../assets/blogs/b12.webp"
import profileImg from "../../assets/prfpic.jpg"
import { useState } from 'react';
import { FaCommentDots } from "react-icons/fa";

const data = [{
    id: 1,
    img: b1,
    title: "Creative Ideas for Home Decor",
    name: "Jijo",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "25th January, 2023"
}, {
    id: 2,
    img: b2,
    name: "Achu jozef",
    title: "Tips for Choosing the Right Home Decor",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "20th January, 2023"
}, {
    id: 3,
    img: b3,
    name: "Ajmalsha",
    title: "Top 5 Home Decor Ideas for Summer",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "15th January, 2023"
}, {
    id: 4,
    img: b4,
    name: "Sahithi",
    title: "5 Essential Home Decor Items for Your Kids",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "10th January, 2023"
}, {
    id: 5,
    img: b5,
    name: "Reshma raj",
    title: "7 Home Decor Tips for a Stylish and Modern Look",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "5th January, 2023"
}, {
    id: 6,
    img: b6,
    name: "Mallyboy",
    title: "10 Home Decor Ideas for a Sustainable and Green Look",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "2nd January, 2023"
}, {
    id: 7,
    img: b7,
    name: "Malbrook",
    title: "12 Home Decor Ideas for a Spacious and Comfortable Look",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "31st December, 2022"
}, {
    id: 8,
    img: b8,
    name: "Javan",
    title: "15 Home Decor Ideas for a Modern and Elegant Look",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "30th December, 2022"
}, {
    id: 9,
    img: b9,
    name: "Officers choice",
    title: "20 Home Decor Ideas for a Chic and Inspiring Look",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "29th December, 2022"
}, {
    id: 10,
    img: b10,
    name: "Rakesh raj",
    title: "25 Home Decor Ideas for a Fresh and Clean Look",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "28th December, 2022"
}, {
    id: 11,
    img: b11,
    name: "amalmohan",
    title: "30 Home Decor Ideas for a Comfortable and Relaxing Look",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "27th December, 2022"
}, {
    id: 12,
    img: b12,
    name: "Dulquar salman",
    title: "35 Home Decor Ideas for a Sustainable and Green Look",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "26th December, 2022"
}]

export default function Blogs() {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <section>
            <div className="relative h-1/2 font-abc">
                <img className="w-full h-[300px] md:h-[350px] lg:h-[350px] object-cover" src={bgimg} alt="shop" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-[30px] lg:text-[60px] md:text-[50px] pb-2">Blogs</h1>
                    <h2 className="flex items-center gap-2 cursor-pointer">Home <span>/</span> <span>Blogs</span></h2>
                </div>
            </div>
            <div className="py-14 lg:container px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-abc">
                {currentPosts.map(blog => (
                    <div key={blog.id} className="bg-white shadow-sm hover:shadow-md rounded-lg overflow-hidden">
                        <div className="relative group">
                            <img className="w-full h-full object-contain duration-500 cursor-pointer group-hover:brightness-50" src={blog.img} alt={blog.title} />
                            <div className="absolute top-2 left-2 bg-white text-black lg:text-xl text-lg p-2">
                                {blog.date}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="flex space-x-1">
                                    <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
                                    <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-500"></div>
                                    <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-1000"></div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 relative">
                            <div className="absolute bg-secondary px-2 py-1 text-white left-[120px] xxs:left-[140px] xs:left-[160px]  md:left-[145px] lg:left-[170px] top-[-14px]">
                                <h1>Text center</h1>
                            </div>
                            <h2 className="text-2xl  mb-2 text-center">{blog.title}</h2>
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <p className="text-sm font-semibold text-gray-500">By</p>
                                <img className="w-7 h-7 object-cover rounded-full" src={profileImg} alt={blog.name} />
                                <div>
                                    <p className="text-sm font-semibold text-gray-500">{blog.name}</p>
                                </div>
                                <span className="text-gray-500 text-xl"><FaCommentDots /></span>
                            </div>

                            <p className="text-gray-700 mb-4">{blog.content}</p>
                            <div className="flex justify-center items-center">
                                <button className="text-secondary font-bold hover:underline uppercase">Continue Reading</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(data.length / postsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 mx-1 border ${currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </section>
    )
}
