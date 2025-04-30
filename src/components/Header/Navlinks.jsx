import { Link } from "react-router-dom";
import { links } from "./Mylinks";
import { useState, useEffect, useRef } from "react";
import { MdOutlineArrowDropDown, MdArrowDropUp, MdSearch, MdExpandMore, MdExpandLess } from "react-icons/md";
import { FaTag } from "react-icons/fa";

const Navlinks = () => {
    const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");
    const [dropdownSearch, setDropdownSearch] = useState("");
    const [collapsedSections, setCollapsedSections] = useState({});
    const [isSimpleView, setIsSimpleView] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setHeading("");
                setSubHeading("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Clear search when dropdown closes
    useEffect(() => {
        if (!heading) {
            setDropdownSearch("");
        }
    }, [heading]);

    const toggleSection = (sectionId) => {
        setCollapsedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const handleViewAllClick = () => {
        setIsSimpleView(true);
    };

    return (
        <>
            {links.map((link, i) => (
                <div key={i} ref={dropdownRef}>
                    <div className="px-3 text-left md:cursor-pointer group relative">
                        <h1
                            className="flex justify-between items-center md:pr-0 pr-5 py-1 hover:text-gray-600 font-bold md:font-normal text-2xl md:text-xl"
                            onClick={() => {
                                heading !== link.name ? setHeading(link.name) : setHeading("");
                                setSubHeading("");
                                setIsSimpleView(false);
                            }}
                        >
                            {link.name}
                            <span className="text-xl md:ml-2 inline">
                                {heading === link.name ? <MdArrowDropUp /> : <MdOutlineArrowDropDown />}
                            </span>
                        </h1>

                        {link.submenu && (
                            <div>
                                <div className={`absolute top-full left-0 hidden ${heading === link.name ? 'md:block' : 'group-hover:md:block'}`}>
                                    <div className="py-3">
                                        <div className="w-4 h-4 left-3 absolute mt-1 bg-white bg-opacity-90 rotate-45 border-l border-t border-gray-200"></div>
                                    </div>
                                    {isSimpleView ? (
                                        <div className="bg-white bg-opacity-90 backdrop-blur-sm p-6 grid grid-cols-3 gap-6 shadow-lg rounded-lg transition-all duration-300 ease-in-out min-w-max border border-gray-100 overflow-hidden">
                                            <div className="col-span-3 mb-4 relative">
                                                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    placeholder="Filter categories..."
                                                    value={dropdownSearch}
                                                    onChange={(e) => setDropdownSearch(e.target.value)}
                                                    className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                                                />
                                            </div>

                                            <div className="col-span-3 grid grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                                {link.sublinks
                                                    .filter((mysublinks) => 
                                                        dropdownSearch === "" ||
                                                        mysublinks.Head.toLowerCase().includes(dropdownSearch.toLowerCase()) ||
                                                        mysublinks.sublink.some((slink) =>
                                                            slink.name.toLowerCase().includes(dropdownSearch.toLowerCase())
                                                        )
                                                    )
                                                    .map((mysublinks, i) => (
                                                        <div key={i} className="p-2 rounded-md hover:bg-gray-100 hover:bg-opacity-50 transition-colors duration-200">
                                                            <Link to={mysublinks.link || "#"} className="block">
                                                                <h1 className="text-lg font-semibold whitespace-nowrap mb-2 text-gray-800">
                                                                    {mysublinks.Head}
                                                                </h1>
                                                            </Link>
                                                            <ul>
                                                                {mysublinks.sublink
                                                                    .filter((slink) =>
                                                                        dropdownSearch === "" ||
                                                                        slink.name.toLowerCase().includes(dropdownSearch.toLowerCase())
                                                                    )
                                                                    .map((slink, i) => (
                                                                        <li
                                                                            className="text-sm text-gray-600 xl:my-2.5 lg:my-0 hover:text-gray-800 transition-colors duration-150 whitespace-nowrap pl-1"
                                                                            key={i}
                                                                        >
                                                                            <Link to={slink.link || "#"} className="block py-1 hover:pl-1 transition-all">
                                                                                {slink.name}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                            </div>

                                            {link.sublinks.filter((mysublinks) => 
                                                dropdownSearch === "" ||
                                                mysublinks.Head.toLowerCase().includes(dropdownSearch.toLowerCase()) ||
                                                mysublinks.sublink.some((slink) =>
                                                    slink.name.toLowerCase().includes(dropdownSearch.toLowerCase())
                                                )
                                            ).length === 0 && (
                                                <div className="col-span-3 text-center py-4 text-gray-500">
                                                    No results found for "{dropdownSearch}"
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="bg-white bg-opacity-90 backdrop-blur-sm p-6 shadow-xl rounded-xl transition-all duration-300 ease-in-out min-w-[400px] max-w-[600px] border border-gray-200 overflow-hidden">
                                            <div className="mb-4 pb-2 border-b border-gray-200">
                                                <div className="flex items-center space-x-2">
                                                    <FaTag className="text-gray-600" />
                                                    <h2 className="text-lg font-semibold text-gray-800">{link.name}</h2>
                                                </div>
                                            </div>

                                            <div className="mb-4 relative">
                                                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    placeholder="Filter categories..."
                                                    value={dropdownSearch}
                                                    onChange={(e) => setDropdownSearch(e.target.value)}
                                                    className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                                                />
                                            </div>

                                            <div className="space-y-4 max-h-[60vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                                {link.sublinks
                                                    .filter((mysublinks) => 
                                                        dropdownSearch === "" ||
                                                        mysublinks.Head.toLowerCase().includes(dropdownSearch.toLowerCase()) ||
                                                        mysublinks.sublink.some((slink) =>
                                                            slink.name.toLowerCase().includes(dropdownSearch.toLowerCase())
                                                        )
                                                    )
                                                    .map((mysublinks, i) => (
                                                        <div key={i} className="bg-gray-50 bg-opacity-50 p-3 rounded-md border border-gray-100">
                                                            <div className="flex justify-between items-center">
                                                                <Link to={mysublinks.link || "#"} className="block">
                                                                    <h1 className="text-lg font-semibold whitespace-nowrap text-gray-800">
                                                                        {mysublinks.Head}
                                                                    </h1>
                                                                </Link>
                                                                <button
                                                                    onClick={() => toggleSection(`${link.name}-${i}`)}
                                                                    className="text-gray-600 hover:text-gray-800"
                                                                >
                                                                    {collapsedSections[`${link.name}-${i}`] ? <MdExpandMore /> : <MdExpandLess />}
                                                                </button>
                                                            </div>
                                                            {!collapsedSections[`${link.name}-${i}`] && (
                                                                <ul className="mt-2">
                                                                    {mysublinks.sublink
                                                                        .filter((slink) =>
                                                                            dropdownSearch === "" ||
                                                                            slink.name.toLowerCase().includes(dropdownSearch.toLowerCase())
                                                                        )
                                                                        .map((slink, i) => (
                                                                            <li
                                                                                className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-150 pl-1"
                                                                                key={i}
                                                                            >
                                                                                <Link to={slink.link || "#"} className="block py-1 hover:pl-1 transition-all">
                                                                                    {slink.name}
                                                                                </Link>
                                                                            </li>
                                                                        ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    ))}
                                            </div>

                                            {link.sublinks.filter((mysublinks) => 
                                                dropdownSearch === "" ||
                                                mysublinks.Head.toLowerCase().includes(dropdownSearch.toLowerCase()) ||
                                                mysublinks.sublink.some((slink) =>
                                                    slink.name.toLowerCase().includes(dropdownSearch.toLowerCase())
                                                )
                                            ).length === 0 && (
                                                <div className="text-center py-4 text-gray-500">
                                                    No results found for "{dropdownSearch}"
                                                </div>
                                            )}

                                            <div className="mt-4 pt-2 border-t border-gray-200 text-center text-sm text-gray-600">
                                                <Link
                                                    to={`/category/${link.name.toLowerCase()}`}
                                                    className="hover:text-gray-800"
                                                    onClick={handleViewAllClick}
                                                >
                                                    View All
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Mobile sub menu */}
                    <div className={`${heading === link.name ? "md:hidden" : "hidden"}`}>
                        {link.sublinks.map((slinks, i) => (
                            <div key={i}>
                                <div>
                                    <h1
                                        onClick={() =>
                                            subHeading !== slinks.Head ? setSubHeading(slinks.Head) : setSubHeading("")
                                        }
                                        className="flex items-center py-4 pl-7 font-semibold md:pr-0 cursor-pointer"
                                    >
                                        {slinks.Head}
                                        <span className="text-xl md:ml-2 inline">
                                            {subHeading === slinks.Head ? <MdArrowDropUp /> : <MdOutlineArrowDropDown />}
                                        </span>
                                    </h1>
                                    <div className={`${subHeading === slinks.Head ? "md:hidden" : "hidden"}`}>
                                        <ul>
                                            {slinks.sublink.map((slink, i) => (
                                                <li className="py-3 pl-14 hover:bg-gray-50" key={i}>
                                                    <Link to={slink.link || "#"} className="block">
                                                        {slink.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <hr className="border-gray-200" />
                            </div>
                        ))}
                        <hr className="border-gray-200" />
                    </div>
                </div>
            ))}
        </>
    );
};

export default Navlinks;