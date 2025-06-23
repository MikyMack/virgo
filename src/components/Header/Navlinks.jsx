import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { MdOutlineArrowDropDown, MdArrowDropUp, MdSearch, MdExpandMore, MdExpandLess } from "react-icons/md";
import { FaTag } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchPrimaryCategories, fetchSecondaryCategories, fetchTertiaryCategories } from "../Redux/slices/CategoriesSlice";

const Navlinks = () => {
    const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");
    const [dropdownSearch, setDropdownSearch] = useState("");
    const [collapsedSections, setCollapsedSections] = useState({});
    const [isSimpleView, setIsSimpleView] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const dropdownRef = useRef(null);

    const dispatch = useDispatch();
    const { primary, secondary, tertiary, loading, error } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchPrimaryCategories());
        dispatch(fetchSecondaryCategories());
        dispatch(fetchTertiaryCategories());
        

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        handleResize(); 
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);


    const getSecondaryCategories = (primaryId) => {
        return secondary.filter(sec => sec.primaryCategory?._id === primaryId);
    };

 
    const getTernaryCategories = (secondaryId) => {
        return tertiary.filter(ter => ter.secondaryCategory?._id === secondaryId);
    };

   
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!isMobile && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setHeading("");
                setSubHeading("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [isMobile]);


    useEffect(() => {
        if (!heading) {
            setDropdownSearch("");
        }
    }, [heading]);

    const toggleSection = (sectionId) => {
        setCollapsedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const buildCategoryLink = (categoryType, categoryId) => {
        const params = new URLSearchParams();
        params.set(categoryType, categoryId);
        return `/shop?${params.toString()}`;
    };

    const toggleMobileDropdown = (primaryCatName, event) => {
        event.preventDefault();
        event.stopPropagation();
        setHeading(heading === primaryCatName ? "" : primaryCatName);
        setSubHeading("");
        setCollapsedSections({}); 
    };

    const closeMobileSidebar = () => {
        setHeading("");
        setSubHeading("");
        setCollapsedSections({});
       
    };

    const handlePrimaryClick = (primaryCat, event) => {
        const secondaryCats = getSecondaryCategories(primaryCat._id);
        const hasSubmenu = secondaryCats.length > 0;

        if (isMobile && hasSubmenu) {
           
            toggleMobileDropdown(primaryCat.name, event);
        } else if (!isMobile) {
            // Desktop behavior
            if (hasSubmenu) {
                event.preventDefault();
                setHeading(heading !== primaryCat.name ? primaryCat.name : "");
                setSubHeading("");
                setIsSimpleView(false);
            }
       
        }
        
    };

    if (loading) return <div className="flex justify-center items-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div></div>;
    if (error) return <div className="text-red-500 text-center py-4">Error: {error}</div>;

    return (
        <>
            {primary.filter(primaryCat => primaryCat.isActive).map((primaryCat) => {
                const secondaryCats = getSecondaryCategories(primaryCat._id);
                const hasSubmenu = secondaryCats.length > 0;

                return (
                    <div key={primaryCat._id} className="relative">
                        <div className="px-3 text-left cursor-pointer group">
                            <div
                                className="flex justify-between items-center py-3 md:py-1 hover:text-gray-600 transition-colors duration-200 border-b border-gray-100 md:border-none"
                                onClick={(event) => handlePrimaryClick(primaryCat, event)}
                            >
                                <Link 
                                    to={buildCategoryLink('primaryCategory', primaryCat._id)}
                                    className="flex-grow"
                                    onClick={(e) => {
                                        if (isMobile && hasSubmenu) {
                                            e.preventDefault();
                                        } else if (isMobile && !hasSubmenu) {
                                            closeMobileSidebar();
                                        }
                                    }}
                                >
                                    <h1 className="font-bold md:font-normal text-lg md:text-xl text-gray-800 hover:text-gray-600 transition-colors">
                                        {primaryCat.name}
                                    </h1>
                                </Link>
                                {hasSubmenu && (
                                    <button 
                                        className="text-xl md:ml-2 p-2 md:p-0 hover:bg-gray-100 md:hover:bg-transparent rounded-full md:rounded-none transition-all duration-200"
                                        onClick={(event) => {
                                            if (isMobile) {
                                                toggleMobileDropdown(primaryCat.name, event);
                                            }
                                        }}
                                    >
                                        {heading === primaryCat.name ? 
                                            <MdArrowDropUp className="text-blue-600" /> : 
                                            <MdOutlineArrowDropDown className="text-gray-600" />
                                        }
                                    </button>
                                )}
                            </div>

                            {hasSubmenu && (
                                <div 
                                    className={`${
                                        isMobile 
                                            ? `transition-all duration-300 ease-in-out overflow-hidden ${
                                                heading === primaryCat.name 
                                                    ? 'max-h-screen opacity-100' 
                                                    : 'max-h-0 opacity-0'
                                              }`
                                            : `absolute top-full left-0 z-50 transition-all duration-200 ${
                                                heading === primaryCat.name 
                                                    ? 'block opacity-100 transform translate-y-0' 
                                                    : 'hidden opacity-0 transform -translate-y-2 group-hover:block group-hover:opacity-100 group-hover:translate-y-0'
                                              }`
                                    }`}
                                    style={{
                                        maxHeight: isMobile && heading === primaryCat.name ? '70vh' : undefined
                                    }}
                                >
                                    {isMobile ? (
                                        // Mobile dropdown
                                        <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-xl mx-2 mb-3 shadow-lg border border-gray-200 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                            <div className="p-4 space-y-3">
                                                {secondaryCats
                                                    .filter(secondaryCat => secondaryCat.isActive)
                                                    .map((secondaryCat) => {
                                                        const ternaryCats = getTernaryCategories(secondaryCat._id)
                                                            .filter(ternaryCat => ternaryCat.isActive);
                                                        const sectionId = `mobile-section-${secondaryCat._id}`;
                                                        
                                                        return (
                                                            <div key={secondaryCat._id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
                                                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                                                                    <Link 
                                                                        to={buildCategoryLink('secondaryCategory', secondaryCat._id)}  
                                                                        className="font-semibold text-gray-800 hover:text-blue-600 transition-colors flex-grow text-base"
                                                                        onClick={closeMobileSidebar}
                                                                    >
                                                                        {secondaryCat.name}
                                                                    </Link>
                                                                    {ternaryCats.length > 0 && (
                                                                        <button 
                                                                            className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-white/50 transition-all duration-200 ml-2"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                toggleSection(sectionId);
                                                                            }}
                                                                        >
                                                                            {collapsedSections[sectionId] ? 
                                                                                <MdExpandMore className="text-xl" /> : 
                                                                                <MdExpandLess className="text-xl" />
                                                                            }
                                                                        </button>
                                                                    )}
                                                                </div>
                                                                
                                                                {ternaryCats.length > 0 && (
                                                                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                                                        collapsedSections[sectionId] ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
                                                                    }`}>
                                                                        <ul className="p-4 space-y-2 bg-gray-50/50">
                                                                            {ternaryCats.map((ternaryCat) => (
                                                                                <li key={ternaryCat._id}>
                                                                                    <Link 
                                                                                        to={buildCategoryLink('tertiaryCategory', ternaryCat._id)} 
                                                                                        className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-white py-3 px-4 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-200 hover:shadow-sm"
                                                                                        onClick={closeMobileSidebar}
                                                                                    >
                                                                                        • {ternaryCat.name}
                                                                                    </Link>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                    ) : (
                                        // Desktop dropdown 
                                        <div className="absolute top-full left-0 hidden md:block z-50">
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
                                                        {secondaryCats
                                                            .filter(secondaryCat => secondaryCat.isActive)
                                                            .map((secondaryCat) => {
                                                                const ternaryCats = getTernaryCategories(secondaryCat._id)
                                                                    .filter(ternaryCat => ternaryCat.isActive);

                                                                return (
                                                                    <div key={secondaryCat._id} className="p-2 rounded-md hover:bg-gray-100 hover:bg-opacity-50 transition-colors duration-200">
                                                                        <Link to={buildCategoryLink('secondaryCategory', secondaryCat._id)} className="block">
                                                                            <h1 className="text-lg font-semibold whitespace-nowrap mb-2 text-gray-800">
                                                                                {secondaryCat.name}
                                                                            </h1>
                                                                        </Link>
                                                                        {ternaryCats.length > 0 && (
                                                                            <ul>
                                                                                {ternaryCats.map((ternaryCat) => (
                                                                                    <li
                                                                                        className="text-sm text-gray-600 xl:my-2.5 lg:my-0 hover:text-gray-800 transition-colors duration-150 whitespace-nowrap pl-1"
                                                                                        key={ternaryCat._id}
                                                                                    >
                                                                                        <Link 
                                                                                            to={buildCategoryLink('tertiaryCategory', ternaryCat._id)} 
                                                                                            className="block py-1 hover:pl-1 transition-all"
                                                                                        >
                                                                                            {ternaryCat.name}
                                                                                        </Link>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="bg-white bg-opacity-90 backdrop-blur-sm p-6 shadow-xl rounded-xl transition-all duration-300 ease-in-out min-w-[400px] max-w-[600px] border border-gray-200 overflow-hidden">
                                                    <div className="mb-4 pb-2 border-b border-gray-200">
                                                        <div className="flex items-center space-x-2">
                                                            <FaTag className="text-gray-600" />
                                                            <h2 className="text-lg font-semibold text-gray-800">{primaryCat.name}</h2>
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
                                                        {secondaryCats
                                                            .filter(secondaryCat => secondaryCat.isActive)
                                                            .map((secondaryCat) => {
                                                                const ternaryCats = getTernaryCategories(secondaryCat._id);
                                                                const sectionId = `section-${secondaryCat._id}`;
                                                                
                                                                return (
                                                                    <div key={secondaryCat._id} className="bg-gray-50 bg-opacity-50 p-3 rounded-md border border-gray-100">
                                                                        <div className="flex justify-between items-center">
                                                                            <Link to={buildCategoryLink('secondaryCategory', secondaryCat._id)} className="block">
                                                                                <h1 className="text-lg font-semibold whitespace-nowrap text-gray-800">
                                                                                    {secondaryCat.name}
                                                                                </h1>
                                                                            </Link>
                                                                            {ternaryCats.length > 0 && (
                                                                                <button
                                                                                    onClick={() => toggleSection(sectionId)}
                                                                                    className="text-gray-600 hover:text-gray-800"
                                                                                >
                                                                                    {collapsedSections[sectionId] ? <MdExpandMore /> : <MdExpandLess />}
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                        {ternaryCats.length > 0 && !collapsedSections[sectionId] && (
                                                                            <ul className="mt-2">
                                                                                {ternaryCats
                                                                                    .filter(ternaryCat => ternaryCat.isActive)
                                                                                    .map((ternaryCat) => (
                                                                                        <li
                                                                                            className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-150 pl-1"
                                                                                            key={ternaryCat._id}
                                                                                        >
                                                                                            <Link to={buildCategoryLink('tertiaryCategory', ternaryCat._id)} className="block py-1 hover:pl-1 transition-all">
                                                                                                {ternaryCat.name}
                                                                                            </Link>
                                                                                        </li>
                                                                                    ))
                                                                                }
                                                                            </ul>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Navlinks;