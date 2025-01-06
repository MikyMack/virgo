import { Link } from "react-router-dom"
import { links } from "./Mylinks"
import { useState } from "react"
import { MdOutlineArrowDropDown,MdArrowDropUp  } from "react-icons/md";

const Navlinks = () => {
    const [heading, setHeading] = useState("")
    const [subHeading, setSubHeading] = useState("")

    return (
        <>
            {
                links.map((link, i) => (
                    <div key={i}>
                        <div className="px-3 text-left md:cursor-pointer group">
                            
                            <h1 className="flex justify-between items-center md:pr-0 pr-5 py-1 hover:text-gray-600 font-bold md:font-normal text-2xl md:text-xl" onClick={() => {
                                heading !== link.name ? setHeading(link.name) : setHeading("");
                                setSubHeading("");
                            }}>{link.name}
                            <span className="text-xl md:ml-2 inline">{heading===link.name ? <MdArrowDropUp/>:<MdOutlineArrowDropDown />}</span>
                            </h1>
                        
                            

                            {link.submenu && (
                                <div>
                                    <div className="absolute top-50 hidden group-hover:md:block hover:md:block">
                                        <div className="py-3">
                                            <div className="w-4 h-4 left-3 absolute mt-1 bg-green-50 rotate-45"></div>
                                        </div>
                                        <div className="bg-green-50 text-whit p-10 grid grid-cols-3 gap-10">
                                            {link.sublinks.map((mysublinks, i) => (
                                                <div key={i}>
                                                    <Link to="/candleholders">
                                                    <h1 className="text-lg font-abc font-semibold">{mysublinks.Head}</h1>
                                                    </Link>
                                                    {mysublinks.sublink.map((slink, i) => (
                                                        <li className="text-sm text-gray-600 xl:my-2.5 lg:my-0" key={i}>
                                                            <Link to={slink.link} className="hover:text-gray-800">{slink.name}</Link>
                                                        </li>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>)}
                        </div>
                        {/* sub menu  */}
                        <div className={`${heading === link.name ? 'md:hidden' : 'hidden'}`}>
                            {
                                link.sublinks.map((slinks, i) => (
                                    <div key={i}>
                                        <div>
                                            <h1 onClick={() => subHeading !== slinks.Head ? setSubHeading(slinks.Head) : setSubHeading("")} className="flex items-center py-4 pl-7 font-abc font-semibold md:pr-0">{slinks.Head}
                                            <span className="text-xl md:ml-2 inline">{subHeading===slinks.Head ? <MdArrowDropUp/>:<MdOutlineArrowDropDown />}</span>
                                            </h1>
                                            <div className={`${subHeading === slinks.Head ? "md:hidden" : "hidden"}`}>
                                                {slinks.sublink.map((slink, i) => (
                                                    <li className="py-3 pl-14" key={i}>
                                                        <Link to={slink.link}>{slink.name}</Link>
                                                    </li>
                                                ))}
                                            </div>

                                        </div>
                                        <hr />
                                    </div>
                                ))
                            }
                            <hr />
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Navlinks
