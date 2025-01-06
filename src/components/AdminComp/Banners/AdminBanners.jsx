import { useState } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt, FaBars, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader';
import img1 from "../../../assets/banner/banner1.png"
import img2 from "../../../assets/banner/banner2.png"
import img3 from "../../../assets/banner/banner3.png"
import bgim from "../../../assets/banner/dashboarbg.jpg"

export default function AdminBanners() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [banners, setBanners] = useState([
        { id: 1, image: img1, published: true },
        { id: 2, image: img2, published: false },
        { id: 3, image: img3, published: true },
        // Add more banners as needed
    ]);
    const [editBannerId, setEditBannerId] = useState(null);
    const [newBannerImage, setNewBannerImage] = useState(null);
    const [showAddBannerPopup, setShowAddBannerPopup] = useState(false);

    const handleResetSearch = () => {
        setSearchTerm('');
    };

    const handleEditBanner = (id) => {
        setEditBannerId(id);
    };

    const handleDeleteBanner = (id) => {
        setBanners(banners.filter(banner => banner.id !== id));
    };

    const handleTogglePublished = (id) => {
        setBanners(banners.map(banner => banner.id === id ? { ...banner, published: !banner.published } : banner));
    };

    const handleSaveNewImage = () => {
        if (newBannerImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBanners(banners.map(banner => banner.id === editBannerId ? { ...banner, image: reader.result } : banner));
                setEditBannerId(null);
                setNewBannerImage(null);
            };
            reader.readAsDataURL(newBannerImage);
        }
    };

    const handleAddNewBanner = () => {
        if (newBannerImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newBanner = {
                    id: banners.length + 1,
                    image: reader.result,
                    published: false
                };
                setBanners([...banners, newBanner]);
                setShowAddBannerPopup(false);
                setNewBannerImage(null);
            };
            reader.readAsDataURL(newBannerImage);
        }
    };

    const filteredBanners = banners.filter(banner =>
        banner.image.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col md:flex-row font-abc">
            <div className='md:w-1/3 lg:w-1/3 xl:w-1/5'>
                <AdminHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
            <div className="w-full p-5 py-10" style={{ backgroundImage: `url(${bgim})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <header className="flex items-center justify-between mb-5 md:mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Banner Management</h1>
                    <div className="relative">
                        <button className="flex items-center space-x-2 text-white hover:text-gray-300" onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
                            <FaUserCircle className="text-2xl" />
                            <span>Profile</span>
                        </button>
                        {profileMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                <Link to="/admin/settings" className="flex items-center space-x-2 px-4 py-2 text-gray-800 hover:bg-gray-100">
                                    <FaCog /> <span>Settings</span>
                                </Link>
                                <Link to="/logout" className="flex items-center space-x-2 px-4 py-2 text-gray-800 hover:bg-gray-100">
                                    <FaSignOutAlt /> <span>Logout</span>
                                </Link>
                            </div>
                        )}
                    </div>
                    <button className="md:hidden text-gray-800" onClick={() => setMenuOpen(!menuOpen)}>
                        <FaBars />
                    </button>
                </header>
                <header className="flex flex-col md:flex-col items-center mb-5">
                    <div className="space-x-2 flex items-center">
                        <input type="text" placeholder="Search by image file" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border-b outline-none p-2 rounded" />
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={handleResetSearch}>Reset Search</button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2" onClick={() => setShowAddBannerPopup(true)}>
                            <FaPlus /> <span>Add New Banner</span>
                        </button>
                    </div>
                </header>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4">Index</th>
                                <th className="py-2 px-4">Banner Image</th>
                                <th className="py-2 px-4">Published</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBanners.map((banner, index) => (
                                <tr key={banner.id}>
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2 flex justify-center items-center">
                                        <img src={banner.image} alt={`Banner ${index + 1}`} className="h-20 w-20 object-contain" />
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked={banner.published} onChange={() => handleTogglePublished(banner.id)} />
                                            <div className="w-11 h-6 bg-red-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                        </label>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <button className="text-green-500 hover:text-green-700 px-2 py-1 rounded text-xl" onClick={() => handleEditBanner(banner.id)}><FaEdit /></button>
                                        <button className="text-red-500 hover:text-red-700 px-2 py-1 rounded text-xl" onClick={() => handleDeleteBanner(banner.id)}><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {editBannerId && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-5 rounded-md shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Edit Banner</h2>
                            <input type="file" onChange={(e) => setNewBannerImage(e.target.files[0])} className="border-b outline-none p-2 rounded mb-4 w-full" />
                            <div className="flex justify-end space-x-2">
                                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={() => setEditBannerId(null)}>Cancel</button>
                                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSaveNewImage}>Save</button>
                            </div>
                        </div>
                    </div>
                )}
                {showAddBannerPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-5 rounded-md shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Add New Banner</h2>
                            <input type="file" onChange={(e) => setNewBannerImage(e.target.files[0])} className="border-b outline-none p-2 rounded mb-4 w-full" />
                            <div className="flex justify-end space-x-2">
                                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={() => setShowAddBannerPopup(false)}>Cancel</button>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddNewBanner}>Add</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
