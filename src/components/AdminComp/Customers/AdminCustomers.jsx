import { useState } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt, FaBars, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader';
import bgim from "../../../assets/banner/dashboarbg.jpg"

export default function AdminCustomers() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [editCustomer, setEditCustomer] = useState(null);

    const customers = [
        { id: 1, joiningDate: '2024-01-01', name: 'Sara', email: 'sara@example.com', phone: '1234567890' },
        { id: 2, joiningDate: '2024-02-01', name: 'Jijomon', email: 'jijomon@example.com', phone: '0987654321' },
        { id: 3, joiningDate: '2024-03-01', name: 'Ajmalsha', email: 'ajmalsha@example.com', phone: '1122334455' },
        { id: 4, joiningDate: '2024-04-01', name: 'Achu', email: 'achu@example.com', phone: '2233445566' },
        { id: 5, joiningDate: '2024-05-01', name: 'Soman Thankan', email: 'soman@example.com', phone: '3344556677' },
        { id: 6, joiningDate: '2024-06-01', name: 'Varkichayan', email: 'varkichayan@example.com', phone: '4455667788' },
        { id: 7, joiningDate: '2024-07-01', name: 'Muhammad Bilal', email: 'bilal@example.com', phone: '5566778899' },
        { id: 8, joiningDate: '2024-08-01', name: 'Shaji Pappan', email: 'shaji@example.com', phone: '6677889900' },
    ];

    const filteredCustomers = customers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    );

    const handleResetSearch = () => {
        setSearchTerm('');
    };

    const handleEditCustomer = (customer) => {
        setEditCustomer(customer);
        setEditPopupOpen(true);
    };

    const handleSaveCustomer = () => {
        // Implement save logic here
        setEditPopupOpen(false);
    };

    const handleCancelEdit = () => {
        setEditPopupOpen(false);
        setEditCustomer(null);
    };

    return (
        <div className="flex flex-col md:flex-row font-abc">
            <div className='md:w-1/3 lg:w-1/3 xl:w-1/5'>
                <AdminHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
            <div className="w-full p-5 py-10" style={{ backgroundImage: `url(${bgim})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <header className="flex items-center justify-between mb-5 md:mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Customers Management</h1>
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
                <header className="flex flex-col md:flex-col mb-5">
                    <div className="space-x-2 flex items-center justify-between">
                        <input type="text" placeholder="Search by name/email/phone" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border-b outline-none p-2 rounded" />
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={handleResetSearch}>Reset Search</button>
                    </div>
                </header>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4">ID</th>
                                <th className="py-2 px-4">Joining Date</th>
                                <th className="py-2 px-4">Name</th>
                                <th className="py-2 px-4">Email</th>
                                <th className="py-2 px-4">Phone</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers?.map(customer => (
                                <tr key={customer.id}>
                                    <td className="border px-4 py-2 text-center">{customer.id}</td>
                                    <td className="border px-4 py-2 text-center">{customer.joiningDate}</td>
                                    <td className="border px-4 py-2 text-center">{customer.name}</td>
                                    <td className="border px-4 py-2 text-center">{customer.email}</td>
                                    <td className="border px-4 py-2 text-center">{customer.phone}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <button className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded text-xl"><FaEye /></button>
                                        <button className="text-green-500 hover:text-green-700 px-2 py-1 rounded text-xl" onClick={() => handleEditCustomer(customer)}><FaEdit /></button>
                                        <button className="text-red-500 hover:text-red-700 px-2 py-1 rounded text-xl"><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {editPopupOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-5 rounded shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Edit Customer</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input type="text" value={editCustomer.name} onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })} className="border p-2 rounded w-full" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input type="email" value={editCustomer.email} onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })} className="border p-2 rounded w-full" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Phone</label>
                                <input type="text" value={editCustomer.phone} onChange={(e) => setEditCustomer({ ...editCustomer, phone: e.target.value })} className="border p-2 rounded w-full" />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={handleCancelEdit}>Cancel</button>
                                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSaveCustomer}>Save</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
