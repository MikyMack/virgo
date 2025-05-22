import { useState, useEffect } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt, FaBars, FaEye, FaEdit, FaTrash, FaTimes, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader';

export default function AdminCustomers() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [editCustomer, setEditCustomer] = useState(null);
    const [viewPopupOpen, setViewPopupOpen] = useState(false);
    const [viewCustomer, setViewCustomer] = useState(null);
    const [addPopupOpen, setAddPopupOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({ id: '', joiningDate: '', name: '', email: '', phone: '' });
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [nameError, setNameError] = useState('');
    const [idError, setIdError] = useState('');
    const [dateError, setDateError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const initialCustomers = [
        { id: 1, joiningDate: '2024-01-01', name: 'Sara', email: 'sara@example.com', phone: '1234567890' },
        { id: 2, joiningDate: '2024-02-01', name: 'Jijomon', email: 'jijomon@example.com', phone: '0987654321' },
        { id: 3, joiningDate: '2024-03-01', name: 'Ajmalsha', email: 'ajmalsha@example.com', phone: '1122334455' },
        { id: 4, joiningDate: '2024-04-01', name: 'Achu', email: 'achu@example.com', phone: '2233445566' },
        { id: 5, joiningDate: '2024-05-01', name: 'Soman Thankan', email: 'soman@example.com', phone: '3344556677' },
        { id: 6, joiningDate: '2024-06-01', name: 'Varkichayan', email: 'varkichayan@example.com', phone: '4455667788' },
        { id: 7, joiningDate: '2024-07-01', name: 'Muhammad Bilal', email: 'bilal@example.com', phone: '5566778899' },
        { id: 8, joiningDate: '2024-08-01', name: 'Shaji Pappan', email: 'shaji@example.com', phone: '6677889900' },
    ];

    const [customers, setCustomers] = useState(() => {
        try {
            const savedCustomers = localStorage.getItem('customers');
            const parsedCustomers = savedCustomers ? JSON.parse(savedCustomers) : initialCustomers;
            return parsedCustomers.sort((a, b) => a.id - b.id);
        } catch (error) {
            console.error('Error parsing customers from localStorage:', error);
            return initialCustomers.sort((a, b) => a.id - b.id);
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('customers', JSON.stringify(customers));
        } catch (error) {
            console.error('Error saving customers to localStorage:', error);
        }
    }, [customers]);

    const filteredCustomers = customers
        .filter(customer =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm)
        )
        .sort((a, b) => a.id - b.id);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    const handleResetSearch = () => {
        setSearchTerm('');
        setCurrentPage(1);
    };

    const handleEditCustomer = (customer) => {
        setEditCustomer(customer);
        setEditPopupOpen(true);
        setEmailError('');
        setPhoneError('');
        setNameError('');
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9\s-]*$/;
        return phoneRegex.test(phone) && phone.replace(/[\s-]/g, '').length > 0;
    };

    const validateName = (name) => {
        const nameRegex = /^[A-Za-z\s]+$/;
        return nameRegex.test(name) && name.trim().length > 0;
    };

    const validateId = (id) => {
        const idNum = parseInt(id, 10);
        return !isNaN(idNum) && idNum > 0 && !customers.some(customer => customer.id === idNum);
    };

    const validateDate = (date) => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) return false;
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime()) && parsedDate <= new Date();
    };

    const handleSaveCustomer = () => {
        let isValid = true;

        if (!validateEmail(editCustomer.email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!validatePhone(editCustomer.phone)) {
            setPhoneError('Please enter a valid phone number (numbers only)');
            isValid = false;
        } else {
            setPhoneError('');
        }

        if (!validateName(editCustomer.name)) {
            setNameError('Please enter a valid name (letters only)');
            isValid = false;
        } else {
            setNameError('');
        }

        if (isValid) {
            const updatedCustomers = customers.map(customer =>
                customer.id === editCustomer.id ? editCustomer : customer
            ).sort((a, b) => a.id - b.id);
            setCustomers(updatedCustomers);
            setEditPopupOpen(false);
            setEditCustomer(null);
        }
    };

    const handleCancelEdit = () => {
        setEditPopupOpen(false);
        setEditCustomer(null);
        setEmailError('');
        setPhoneError('');
        setNameError('');
    };

    const handleViewCustomer = (customer) => {
        setViewCustomer(customer);
        setViewPopupOpen(true);
    };

    const handleCloseView = () => {
        setViewPopupOpen(false);
        setViewCustomer(null);
    };

    const handleDeleteCustomer = (customerId) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            const updatedCustomers = customers.filter(customer => customer.id !== customerId).sort((a, b) => a.id - b.id);
            setCustomers(updatedCustomers);
            if (currentCustomers.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        }
    };

    const handleAddCustomer = () => {
        setAddPopupOpen(true);
        setNewCustomer({ id: '', joiningDate: '', name: '', email: '', phone: '' });
        setEmailError('');
        setPhoneError('');
        setNameError('');
        setIdError('');
        setDateError('');
    };

    const handleSaveNewCustomer = () => {
        let isValid = true;

        if (!validateId(newCustomer.id)) {
            setIdError('Please enter a unique, positive integer ID');
            isValid = false;
        } else {
            setIdError('');
        }

        if (!validateDate(newCustomer.joiningDate)) {
            setDateError('Please enter a valid date (YYYY-MM-DD) not in the future');
            isValid = false;
        } else {
            setDateError('');
        }

        if (!validateName(newCustomer.name)) {
            setNameError('Please enter a valid name (letters only)');
            isValid = false;
        } else {
            setNameError('');
        }

        if (!validateEmail(newCustomer.email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!validatePhone(newCustomer.phone)) {
            setPhoneError('Please enter a valid phone number (numbers only)');
            isValid = false;
        } else {
            setPhoneError('');
        }

        if (isValid) {
            const updatedCustomers = [...customers, {
                id: parseInt(newCustomer.id, 10),
                joiningDate: newCustomer.joiningDate,
                name: newCustomer.name,
                email: newCustomer.email,
                phone: newCustomer.phone
            }].sort((a, b) => a.id - b.id);
            setCustomers(updatedCustomers);
            setAddPopupOpen(false);
            setNewCustomer({ id: '', joiningDate: '', name: '', email: '', phone: '' });
            const newTotalPages = Math.ceil((filteredCustomers.length + 1) / itemsPerPage);
            setCurrentPage(newTotalPages);
        }
    };

    const handleCancelAdd = () => {
        setAddPopupOpen(false);
        setNewCustomer({ id: '', joiningDate: '', name: '', email: '', phone: '' });
        setEmailError('');
        setPhoneError('');
        setNameError('');
        setIdError('');
        setDateError('');
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-72 bg-white shadow-xl transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
                <AdminHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>

            {/* Overlay for mobile sidebar */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                />
            )}

            {/* Main Content */}
            <div className="md:ml-72">
                {/* Header */}
                <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden text-gray-600 hover:text-gray-800 transition-colors"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <FaBars size={24} />
                        </button>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Customers Management</h1>
                    </div>
                    <div className="relative">
                        <button
                            className="flex items-center space-x-2 p-2 rounded-full bg-gray-300 transition-colors"
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
                                    <FaSignOutAlt className="text-red-700" />
                                    <span>Logout</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </header>

                {/* Main Content */}
                <main className="p-6 max-w-7xl mx-auto">
                    {/* Controls */}
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                            <input
                                type="text"
                                placeholder="Search by name, email, or phone"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full sm:w-64 px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-800 outline-none transition-colors"
                            />
                            <div className="flex gap-3">
                                <button
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                    onClick={handleResetSearch}
                                >
                                    Reset Search
                                </button>
                                <button
                                    className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                                    onClick={handleAddCustomer}
                                >
                                    <FaPlus size={18} />
                                    Add Customer
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Customers Table */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3 px-4 text-left text-base font-medium text-gray-900">ID</th>
                                        <th className="py-3 px-4 text-left text-base font-medium text-gray-900">Joining Date</th>
                                        <th className="py-3 px-4 text-left text-base font-medium text-gray-900">Name</th>
                                        <th className="py-3 px-4 text-left text-base font-medium text-gray-900">Email</th>
                                        <th className="py-3 px-4 text-left text-base font-medium text-gray-900">Phone</th>
                                        <th className="py-3 px-4 text-left text-base font-medium text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentCustomers.length > 0 ? (
                                        currentCustomers.map((customer) => (
                                            <tr key={customer.id} className="border-b last:border-b-0 hover:bg-gray-50">
                                                <td className="py-4 px-4 text-sm text-gray-600">{customer.id}</td>
                                                <td className="py-4 px-4 text-sm text-gray-600">{customer.joiningDate}</td>
                                                <td className="py-4 px-4 text-sm text-gray-600">{customer.name}</td>
                                                <td className="py-4 px-4 text-sm text-gray-600">{customer.email}</td>
                                                <td className="py-4 px-4 text-sm text-gray-600">{customer.phone}</td>
                                                <td className="py-4 px-4 flex gap-2">
                                                    <button
                                                        onClick={() => handleViewCustomer(customer)}
                                                        className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-colors"
                                                    >
                                                        <FaEye size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditCustomer(customer)}
                                                        className="p-2 text-green-500 hover:bg-green-100 rounded-full transition-colors"
                                                    >
                                                        <FaEdit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCustomer(customer.id)}
                                                        className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                                                    >
                                                        <FaTrash size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="py-4 px-4 text-center text-gray-500">No customers found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {filteredCustomers.length > itemsPerPage && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                                <div className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                                    <span className="font-medium">
                                        {Math.min(indexOfLastItem, filteredCustomers.length)}
                                    </span>{' '}
                                    of <span className="font-medium">{filteredCustomers.length}</span> results
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 border rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        Previous
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                        <button
                                            key={number}
                                            onClick={() => paginate(number)}
                                            className={`px-4 py-2 border rounded-md ${currentPage === number ? 'bg-indigo-800 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 border rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                {/* Edit Customer Modal */}
                {editPopupOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Edit Customer Details</h2>
                                <button
                                    onClick={handleCancelEdit}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <FaTimes size={24} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={editCustomer.name}
                                        onChange={(e) => {
                                            setEditCustomer({ ...editCustomer, name: e.target.value });
                                            if (e.target.value && !validateName(e.target.value)) {
                                                setNameError('Please enter a valid name (letters only)');
                                            } else {
                                                setNameError('');
                                            }
                                        }}
                                        className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${nameError ? 'border-red-500' : ''}`}
                                    />
                                    {nameError && (
                                        <p className="text-red-500 text-sm mt-1">{nameError}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={editCustomer.email}
                                        onChange={(e) => {
                                            setEditCustomer({ ...editCustomer, email: e.target.value });
                                            if (e.target.value && !validateEmail(e.target.value)) {
                                                setEmailError('Please enter a valid email address');
                                            } else {
                                                setEmailError('');
                                            }
                                        }}
                                        className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${emailError ? 'border-red-500' : ''}`}
                                    />
                                    {emailError && (
                                        <p className="text-red-500 text-sm mt-1">{emailError}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="text"
                                        value={editCustomer.phone}
                                        onChange={(e) => {
                                            setEditCustomer({ ...editCustomer, phone: e.target.value });
                                            if (e.target.value && !validatePhone(e.target.value)) {
                                                setPhoneError('Please enter a valid phone number (numbers only)');
                                            } else {
                                                setPhoneError('');
                                            }
                                        }}
                                        className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${phoneError ? 'border-red-500' : ''}`}
                                    />
                                    {phoneError && (
                                        <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-6 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                                    onClick={handleSaveCustomer}
                                    disabled={!!emailError || !!phoneError || !!nameError}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Customer Modal */}
                {addPopupOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Add New Customer</h2>
                                <button
                                    onClick={handleCancelAdd}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <FaTimes size={24} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ID</label>
                                    <input
                                        type="number"
                                        value={newCustomer.id}
                                        onChange={(e) => {
                                            setNewCustomer({ ...newCustomer, id: e.target.value });
                                            if (e.target.value && !validateId(e.target.value)) {
                                                setIdError('Please enter a unique, positive integer ID');
                                            } else {
                                                setIdError('');
                                            }
                                        }}
                                        className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${idError ? 'border-red-500' : ''}`}
                                    />
                                    {idError && (
                                        <p className="text-red-500 text-sm mt-1">{idError}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Joining Date</label>
                                    <input
                                        type="date"
                                        value={newCustomer.joiningDate}
                                        onChange={(e) => {
                                            setNewCustomer({ ...newCustomer, joiningDate: e.target.value });
                                            if (e.target.value && !validateDate(e.target.value)) {
                                                setDateError('Please enter a valid date (YYYY-MM-DD) not in the future');
                                            } else {
                                                setDateError('');
                                            }
                                        }}
                                        className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${dateError ? 'border-red-500' : ''}`}
                                    />
                                    {dateError && (
                                        <p className="text-red-500 text-sm mt-1">{dateError}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={newCustomer.name}
                                        onChange={(e) => {
                                            setNewCustomer({ ...newCustomer, name: e.target.value });
                                            if (e.target.value && !validateName(e.target.value)) {
                                                setNameError('Please enter a valid name (letters only)');
                                            } else {
                                                setNameError('');
                                            }
                                        }}
                                        className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${nameError ? 'border-red-500' : ''}`}
                                    />
                                    {nameError && (
                                        <p className="text-red-500 text-sm mt-1">{nameError}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={newCustomer.email}
                                        onChange={(e) => {
                                            setNewCustomer({ ...newCustomer, email: e.target.value });
                                            if (e.target.value && !validateEmail(e.target.value)) {
                                                setEmailError('Please enter a valid email address');
                                            } else {
                                                setEmailError('');
                                            }
                                        }}
                                        className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${emailError ? 'border-red-500' : ''}`}
                                    />
                                    {emailError && (
                                        <p className="text-red-500 text-sm mt-1">{emailError}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="text"
                                        value={newCustomer.phone}
                                        onChange={(e) => {
                                            setNewCustomer({ ...newCustomer, phone: e.target.value });
                                            if (e.target.value && !validatePhone(e.target.value)) {
                                                setPhoneError('Please enter a valid phone number (numbers only)');
                                            } else {
                                                setPhoneError('');
                                            }
                                        }}
                                        className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${phoneError ? 'border-red-500' : ''}`}
                                    />
                                    {phoneError && (
                                        <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                    onClick={handleCancelAdd}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-6 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                                    onClick={handleSaveNewCustomer}
                                    disabled={!!emailError || !!phoneError || !!nameError || !!idError || !!dateError}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* View Customer Modal */}
                {viewPopupOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
                                <button
                                    onClick={handleCloseView}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <FaTimes size={24} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ID</label>
                                    <p className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50">{viewCustomer.id}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Joining Date</label>
                                    <p className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50">{viewCustomer.joiningDate}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <p className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50">{viewCustomer.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <p className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50">{viewCustomer.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <p className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50">{viewCustomer.phone}</p>
                                </div>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button
                                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                    onClick={handleCloseView}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}