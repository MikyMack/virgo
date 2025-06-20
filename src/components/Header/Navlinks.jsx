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
    const dropdownRef = useRef(null);

    const dispatch = useDispatch();
    const { primary, secondary, tertiary, loading, error } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchPrimaryCategories());
        dispatch(fetchSecondaryCategories());
        dispatch(fetchTertiaryCategories());
    }, [dispatch]);

    // Get secondary categories for a primary category
    const getSecondaryCategories = (primaryId) => {
        return secondary.filter(sec => sec.primaryCategory?._id === primaryId);
    };

    // Get ternary categories for a secondary category
    const getTernaryCategories = (secondaryId) => {
        return tertiary.filter(ter => ter.secondaryCategory?._id === secondaryId);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setHeading("");
                setSubHeading("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Clear search when dropdown closes
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

    const handleViewAllClick = () => {
        setIsSimpleView(true);
    };

    if (loading) return <div className="loading-spinner">Loading...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <>
            {primary.filter(primaryCat=>primaryCat.isActive).map((primaryCat) => {
                const secondaryCats = getSecondaryCategories(primaryCat._id);
                const hasSubmenu = secondaryCats.length > 0;

                return (
                    <div key={primaryCat._id} ref={dropdownRef}>
                        <div className="px-3 text-left md:cursor-pointer group relative">
                            <h1
                                className="flex justify-between items-center md:pr-0 pr-5 py-1 hover:text-gray-600 font-bold md:font-normal text-2xl md:text-xl"
                                onClick={() => {
                                   
                                     heading !== primaryCat.name ? setHeading(primaryCat.name) : setHeading("");
                                    setSubHeading("");
                                    setIsSimpleView(false);
                                }}
                            >
                                {primaryCat.name}
                                {hasSubmenu && (
                                    <span className="text-xl md:ml-2 inline">
                                        {heading === primaryCat.name ? <MdArrowDropUp /> : <MdOutlineArrowDropDown />}
                                    </span>
                                )}
                            </h1>

                            {hasSubmenu && (
                                <div>
                                    <div className={`absolute top-full left-0 hidden ${heading === primaryCat.name ? 'md:block' : 'group-hover:md:block'}`}>
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
  {secondary
    .filter(secondaryCat => secondaryCat.isActive) // First filter active secondary categories
    .map((secondaryCat) => {
      const ternaryCats = getTernaryCategories(secondaryCat._id)
        .filter(ternaryCat => ternaryCat.isActive); // Then filter active ternary categories

      return (
        <div key={secondaryCat._id} className="p-2 rounded-md hover:bg-gray-100 hover:bg-opacity-50 transition-colors duration-200">
          <Link to={`/category/${secondaryCat._id}`} className="block">
            <h1 className="text-lg font-semibold whitespace-nowrap mb-2 text-gray-800">
              {secondaryCat.name}
            </h1>
          </Link>
          {ternaryCats.length > 0 && (
            <ul>
              {ternaryCats.map((ternaryCat) => (
                <li
                  className="text-sm text-gray-600 xl:my-2.5 lg:my-0 hover:text-gray-800 transition-colors duration-150 whitespace-nowrap pl-1"
                  key={ternaryCat._id} // Always use _id directly for keys
                >
                  <Link 
                    to={`/category/${ternaryCat._id}`} 
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
  {secondary.filter((secondarycat) => secondarycat.isActive).map((secondaryCat) => {
    const ternaryCats = getTernaryCategories(secondaryCat._id);
    
    const sectionId = `section-${secondaryCat._id}`;
    
    return (
      <div key={secondaryCat._id} className="bg-gray-50 bg-opacity-50 p-3 rounded-md border border-gray-100">
        <div className="flex justify-between items-center">
          <Link to={`/category/${secondaryCat._id}`} className="block">
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
            {ternaryCats.filter(ternarycat => ternarycat.isActive).map((ternaryCat) => (
              <li
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-150 pl-1"
                key={ternaryCat._id}
              >
                <Link to={`/category/${ternaryCat._id}`} className="block py-1 hover:pl-1 transition-all">
                  {ternaryCat.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  })}
</div>
                                            </div>
                                        )}
                                    </div>
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