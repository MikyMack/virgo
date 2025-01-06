import { useState, useEffect, useMemo } from "react";
import { FaHome, FaShoppingBag } from "react-icons/fa";
import { GiPostStamp } from "react-icons/gi";
import { MdAccountBox } from "react-icons/md";
import { RiContactsBook3Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
    const menus =useMemo(()=> [
        { name: 'Home', icon: <FaHome />, smdis: 'translate-x-3', link: "/" },
        { name: 'Shop', icon: <FaShoppingBag />, smdis: 'translate-x-[76px]', link: "/shop" },
        { name: 'Blogs', icon: <GiPostStamp />, smdis: 'translate-x-[145px]', link: "/blogs" },
        { name: 'Account', icon: <MdAccountBox />, smdis: 'translate-x-[213px]', link: "/register" },
        { name: 'Contact', icon: <RiContactsBook3Line />, smdis: 'translate-x-[280px]', link: "/contact" }
    ],[]);

    const location = useLocation();
    const [active, setActive] = useState(0);

    useEffect(() => {
        const currentPath = location.pathname;
        const activeIndex = menus.findIndex(menu => menu.link === currentPath);
        setActive(activeIndex !== -1 ? activeIndex : 0);
    }, [location.pathname,menus]);

    return (
        <div className="bg-[#9ce0e9] h-[80px] px-6 rounded-t-xl font-abc fixed bottom-0 w-full z-50">
            <ul className="flex relative h-full">
                {menus.map((menu, i) => (
                    <li key={i} className="w-full">
                        <Link to={menu.link} className="flex flex-col items-center justify-center text-center pt-6 cursor-pointer" onClick={() => setActive(i)}>
                            <span className={`text-4xl duration-500 ${i === active ? ' text-gray-700' : 'text-white'}`}>{menu.icon}</span>
                            <span className={`text-sm font-semibold duration-700 ${active === i ? 'text-gray-700' : 'text-gray-700'}`}>{menu.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
