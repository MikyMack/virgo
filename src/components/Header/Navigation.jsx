import { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
    const menus = [
        { 
          name: "Home", 
          icon: (isActive) => (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          ),
          link: "/" 
        },
        { 
          name: "Shop", 
          icon: (isActive) => (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          ),
          link: "/shop" 
        },
        { 
          name: "Blog", 
          icon: (isActive) => (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          ),
          link: "/blogs" 
        },
        { 
          name: "Account", 
          icon: (isActive) => (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ),
          link: "/profile" 
        },
        { 
          name: "Contact", 
          icon: (isActive) => (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
          link: "/contact" 
        }
      ];

    const location = useLocation();


    const [active, setActive] = useState(() => {
        const currentPath = location.pathname;
        const activeIndex = menus.findIndex(menu => menu.link === currentPath);
        return activeIndex !== -1 ? activeIndex : 0;
    });
    
    useEffect(() => {
        const currentPath = location.pathname;
        const activeIndex = menus.findIndex(menu => menu.link === currentPath);
        setActive(activeIndex !== -1 ? activeIndex : 0);
    }, [location.pathname, menus])

    return (
        <div className="fixed bottom-0 w-full shadow-lg z-50 overflow-hidden">
        <div className="bg-white shadow-lg rounded-t-xl">
      
          
          <ul className="flex relative">
            {menus.map((menu, i) => (
              <li key={i} className="w-full">
               <Link to={menu.link}> <button
                  onClick={() => handleNavClick(i)}
                  className="w-full flex flex-col items-center py-3"
                >
                  <div className={`p-2 rounded-full mb-1 transition-all duration-300 ${
                    active === i 
                      ? "bg-blue-100 text-blue-600" 
                      : "text-gray-800"
                  }`}>
                    {menu.icon(active === i)}
                  </div>
                  <span className={`text-xs font-medium transition-all duration-300 ${
                    active === i ? "text-blue-600" : "text-gray-500"
                  }`}>
                    {menu.name}
                  </span>
                  {active === i && (
                    <span className="absolute bottom-0 h-1 w-10 bg-blue-500 rounded-t-md transition-all duration-300"></span>
                  )}
                </button></Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}
