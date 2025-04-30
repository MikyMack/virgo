import { useState, useEffect } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt, FaBars, FaEdit, FaTrash, FaUndo } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader';

export default function AdminCoupons() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [editCoupon, setEditCoupon] = useState(null);

    // Initial coupon data
    const initialCoupons = [
        { id: 1, campaignName: 'New Year Sale', code: 'NY2024', discount: '20%', published: true, startDate: '2024-01-01', endDate: '2024-01-31', status: 'Active' },
        { id: 2, campaignName: 'Summer Sale', code: 'SUMMER2024', discount: '15%', published: false, startDate: '2024-06-01', endDate: '2024-06-30', status: 'Expired' },
        { id: 3, campaignName: 'Winter Sale', code: 'WINTER2024', discount: '15%', published: false, startDate: '2024-06-01', endDate: '2024-06-30', status: 'Expired' },
        { id: 4, campaignName: 'Diwali Sale', code: 'DIWALI2024', discount: '100', published: true, startDate: '2024-06-01', endDate: '2024-06-30', status: 'Expired' },
    ];

    // Load coupons from localStorage or use initial data
    const [coupons, setCoupons] = useState(() => {
        const savedCoupons = localStorage.getItem('coupons');
        return savedCoupons ? JSON.parse(savedCoupons) : initialCoupons;
    });

    // Save coupons to localStorage whenever they change (only 'coupons')
    useEffect(() => {
        localStorage.setItem('coupons', JSON.stringify(coupons));
    }, [coupons]);

    const filteredCoupons = coupons.filter(coupon =>
        (searchTerm === '' || coupon.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) || coupon.code.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleResetSearch = () => {
        setSearchTerm('');
    };

    const handleEditCoupon = (coupon) => {
        setEditCoupon({ ...coupon });
        setEditPopupOpen(true);
    };

    const handleSaveCoupon = () => {
        const updatedCoupons = coupons.map(coupon => 
            coupon.id === editCoupon.id ? { ...editCoupon } : coupon
        );
        setCoupons(updatedCoupons);
        localStorage.setItem('savedCoupons', JSON.stringify(updatedCoupons)); // Save to 'savedCoupons' here
        setEditPopupOpen(false);
        setEditCoupon(null);
    };

    const handleCancelEdit = () => {
        setEditPopupOpen(false);
        setEditCoupon(null);
    };

    const handleDeleteSingleCoupon = (couponId) => {
        setCoupons(coupons.filter(coupon => coupon.id !== couponId));
    };

    const handleTogglePublished = (couponId) => {
        setCoupons(coupons.map(coupon =>
            coupon.id === couponId ? { ...coupon, published: !coupon.published } : coupon
        ));
    };

    const handleRestoreCoupons = () => {
        const savedCoupons = localStorage.getItem('savedCoupons');
        if (savedCoupons) {
            setCoupons(JSON.parse(savedCoupons));
        } else {
            setCoupons(initialCoupons); // Fallback to initialCoupons if no saved data exists
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-72 bg-white shadow-xl z-40 ${menuOpen ? 'block' : 'hidden'} md:block`}>
                <AdminHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>

            {/* Overlay for mobile sidebar */}
            {menuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 md:ml-72">
                {/* Header */}
                <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <button 
                            className="md:hidden text-gray-600 hover:text-gray-800 transition-colors"
                            onClick={() => setMenuOpen(true)}
                        >
                            <FaBars size={24} />
                        </button>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Coupons Management</h1>
                    </div>
                    <div className="relative">
                        <button 
                            className="flex items-center space-x-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                        >
                            <FaUserCircle className="text-2xl text-indigo-600" />
                            <span className="hidden md:inline text-gray-700">Profile</span>
                        </button>
                        {profileMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-20">
                                <Link to="/admin/settings" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    <FaCog className="text-black" /> 
                                    <span>Settings</span>
                                </Link>
                                <Link to="/logout" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    <FaSignOutAlt className="text-red-500" /> 
                                    <span>Logout</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </header>

                {/* Main Content */}
                <main className="p-6 max-w-7xl mx-auto">
                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Search by Campaign name"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full sm:w-60 px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleResetSearch}
                                    className="w-full sm:w-40 px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={handleRestoreCoupons}
                                    className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    <FaUndo className="inline mr-1" /> Restore All
                                </button>
                                <div className="text-sm text-gray-500">
                                    {filteredCoupons.length}/{coupons.length}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Coupons Table */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredCoupons.map((coupon, index) => (
                                        <tr key={coupon.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {coupon.campaignName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coupon.code}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coupon.discount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    <label className="relative inline-flex items-center cursor-pointer">
        <input
            type="checkbox"
            className="sr-only peer"
            checked={coupon.published}
            onChange={() => handleTogglePublished(coupon.id)}
        />
        <div className="w-10 h-5 bg-red-400 rounded-full peer peer-checked:bg-green-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
    </label>
</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coupon.startDate}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coupon.endDate}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 py-1 text-xs rounded-full ${
                                                        coupon.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {coupon.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex space-x-2">
                                                    <button
                                                        className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-colors"
                                                        onClick={() => handleEditCoupon(coupon)}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                                                        onClick={() => handleDeleteSingleCoupon(coupon.id)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>

                {/* Modal for Edit Coupon */}
                {editPopupOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Coupon</h2>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                                    <input
                                        type="text"
                                        value={editCoupon.campaignName}
                                        onChange={(e) => setEditCoupon({ ...editCoupon, campaignName: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                                    <input
                                        type="text"
                                        value={editCoupon.code}
                                        onChange={(e) => setEditCoupon({ ...editCoupon, code: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
                                    <input
                                        type="text"
                                        value={editCoupon.discount}
                                        onChange={(e) => setEditCoupon({ ...editCoupon, discount: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        value={editCoupon.startDate}
                                        onChange={(e) => setEditCoupon({ ...editCoupon, startDate: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        value={editCoupon.endDate}
                                        onChange={(e) => setEditCoupon({ ...editCoupon, endDate: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2 mt-6">
                                <button
                                    onClick={handleCancelEdit}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveCoupon}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}                                              
            </div>
        </div>
    );
}