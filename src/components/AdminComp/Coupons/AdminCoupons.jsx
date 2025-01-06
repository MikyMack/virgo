import { useState } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt, FaBars, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader';
import bgim from "../../../assets/banner/dashboarbg.jpg"

export default function AdminCoupons() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCoupons, setSelectedCoupons] = useState([]);
    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [editCoupon, setEditCoupon] = useState(null);
    const [published,setPublished]=useState(false)

    const coupons = [
        { id: 1, campaignName: 'New Year Sale', code: 'NY2024', discount: '20%', published: true, startDate: '2024-01-01', endDate: '2024-01-31', status: 'Active' },
        { id: 2, campaignName: 'Summer Sale', code: 'SUMMER2024', discount: '15%', published: false, startDate: '2024-06-01', endDate: '2024-06-30', status: 'Expired' },
        { id: 3, campaignName: 'Winter Sale', code: 'WINTER2024', discount: '15%', published: false, startDate: '2024-06-01', endDate: '2024-06-30', status: 'Expired' },
        { id: 4, campaignName: 'Diwali Sale', code: 'DIWALI2024', discount: '100', published: true, startDate: '2024-06-01', endDate: '2024-06-30', status: 'Expired' },
        // Add more coupons as needed
    ];

    const filteredCoupons = coupons.filter(coupon =>
        coupon.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleResetSearch = () => {
        setSearchTerm('');
    };

    const handleEditCoupon = (coupon) => {
        setEditCoupon(coupon);
        setEditPopupOpen(true);
    };

    const handleSaveCoupon = () => {
        // Implement save logic here
        setEditPopupOpen(false);
    };

    const handleCancelEdit = () => {
        setEditPopupOpen(false);
        setEditCoupon(null);
    };

    const handleSelectCoupon = (id) => {
        if (selectedCoupons.includes(id)) {
            setSelectedCoupons(selectedCoupons.filter(couponId => couponId !== id));
        } else {
            setSelectedCoupons([...selectedCoupons, id]);
        }
    };

    const handleSelectAllCoupons = () => {
        if (selectedCoupons.length === coupons.length) {
            setSelectedCoupons([]);
        } else {
            setSelectedCoupons(coupons.map(coupon => coupon.id));
        }
    };

    const handleDeleteCoupons = () => {
        // Implement delete logic here
    };

    const handleTogglePublished = () => {
        setPublished(true)
    };

    return (
        <div className="flex flex-col md:flex-row font-abc">
            <div className='md:w-1/3 lg:w-1/3 xl:w-1/5'>
                <AdminHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
            <div className="w-full p-5 py-10" style={{ backgroundImage: `url(${bgim})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <header className="flex items-center justify-between mb-5 md:mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Coupons Management</h1>
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
                        <input type="text" placeholder="Search by campaign name/code" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border-b outline-none p-2 rounded" />
                        <button className={`px-4 py-2 rounded ${selectedCoupons.length > 0 ? 'bg-red-600 text-white' : 'bg-red-300 text-white'}`} onClick={handleDeleteCoupons}>Delete</button>
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={handleResetSearch}>Reset Search</button>
                    </div>
                </header>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4">
                                    <input type="checkbox" checked={selectedCoupons.length === coupons.length} onChange={handleSelectAllCoupons} />
                                </th>
                                <th className="py-2 px-4">Campaign Name</th>
                                <th className="py-2 px-4">Code</th>
                                <th className="py-2 px-4">Discount</th>
                                <th className="py-2 px-4">Published</th>
                                <th className="py-2 px-4">Start Date</th>
                                <th className="py-2 px-4">End Date</th>
                                <th className="py-2 px-4">Status</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCoupons?.map(coupon => (
                                <tr key={coupon.id}>
                                    <td className="border px-4 py-2 text-center">
                                        <input type="checkbox" checked={selectedCoupons.includes(coupon.id)} onChange={() => handleSelectCoupon(coupon.id)} />
                                    </td>
                                    <td className="border px-4 py-2 text-center">{coupon.campaignName}</td>
                                    <td className="border px-4 py-2 text-center">{coupon.code}</td>
                                    <td className="border px-4 py-2 text-center">{coupon.discount}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" onChange={handleTogglePublished} value={published} />
                                            <div className="w-11 h-6 bg-red-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                        </label>
                                    </td>
                                    <td className="border px-4 py-2 text-center">{coupon.startDate}</td>
                                    <td className="border px-4 py-2 text-center">{coupon.endDate}</td>
                                    <td className={`border px-4 py-2 text-center ${coupon.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{coupon.status}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <button className="text-green-500 hover:text-green-700 px-2 py-1 rounded text-xl" onClick={() => handleEditCoupon(coupon)}><FaEdit /></button>
                                        <button className="text-red-500 hover:text-red-700 px-2 py-1 rounded text-xl" onClick={handleDeleteCoupons}><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {editPopupOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-5 rounded shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Edit Coupon</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700">Campaign Name</label>
                                <input type="text" value={editCoupon.campaignName} onChange={(e) => setEditCoupon({ ...editCoupon, campaignName: e.target.value })} className="border p-2 rounded w-full" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Code</label>
                                <input type="text" value={editCoupon.code} onChange={(e) => setEditCoupon({ ...editCoupon, code: e.target.value })} className="border p-2 rounded w-full" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Discount</label>
                                <input type="text" value={editCoupon.discount} onChange={(e) => setEditCoupon({ ...editCoupon, discount: e.target.value })} className="border p-2 rounded w-full" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Start Date</label>
                                <input type="date" value={editCoupon.startDate} onChange={(e) => setEditCoupon({ ...editCoupon, startDate: e.target.value })} className="border p-2 rounded w-full" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">End Date</label>
                                <input type="date" value={editCoupon.endDate} onChange={(e) => setEditCoupon({ ...editCoupon, endDate: e.target.value })} className="border p-2 rounded w-full" />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={handleCancelEdit}>Cancel</button>
                                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSaveCoupon}>Save</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
