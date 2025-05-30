import { useState, useEffect } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt, FaBars, FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaEye, FaEyeSlash, FaChevronDown, FaChevronUp, FaLock, FaUnlock, FaBell } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader';

// Mock adminAuthenticate action (replace with actual import from AdminSignin.jsx)
const adminAuthenticate = async ({ email, password }) => {
    const response = await fetch('/api/admin/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    if (!response.ok) throw new Error('Authentication failed');
    return await response.json(); // Returns { token }
};

export default function AdminSettings() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [showAddAdminForm, setShowAddAdminForm] = useState(false);
    const [editingAdminId, setEditingAdminId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [verifyPassword, setVerifyPassword] = useState('');
    const [pendingAction, setPendingAction] = useState(null);
    const [pendingAdminId, setPendingAdminId] = useState(null);
    const [loginFormData, setLoginFormData] = useState({ email: '', newPassword: '' });
    const [showLoginPassword, setShowLoginPassword] = useState({ newPassword: false });
    const [loginErrorMsg, setLoginErrorMsg] = useState('');
    const [loginSuccessMsg, setLoginSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [showPasswordAuthSection, setShowPasswordAuthSection] = useState(false);
    const [showActiveSessionsSection, setShowActiveSessionsSection] = useState(false);
    const [showAdminLockSection, setShowAdminLockSection] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [hasProfile, setHasProfile] = useState(false);
    const [admins, setAdmins] = useState([
        { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Super Admin', lastLogin: '2024-07-15 10:30', permissions: { userManagement: true, contentManagement: true, analytics: true }, bio: '' },
        { id: 2, name: 'Manager User', email: 'manager@example.com', role: 'Manager', lastLogin: '2024-07-14 15:45', permissions: { userManagement: false, contentManagement: true, analytics: false }, bio: '' },
        { id: 3, name: 'Support User', email: 'support@example.com', role: 'Support', lastLogin: '2024-07-12 09:20', permissions: { userManagement: false, contentManagement: false, analytics: true }, bio: '' },
    ]);
    const [adminLockStatus, setAdminLockStatus] = useState(
        admins.reduce((acc, admin) => ({
            ...acc,
            [admin.id]: { isLocked: false, failedAttempts: 0 }
        }), {})
    );

    const [adminData, setAdminData] = useState({
        name: 'Admin User',
        email: 'admin@example.com',
        countryCode: '+1',
        phoneNumber: '1234567890',
        role: 'Super Admin',
        address: '',
        department: '',
        description: '',
    });

    const [newAdmin, setNewAdmin] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'Manager',
        password: '',
        confirmPassword: '',
        bio: '',
        permissions: { userManagement: false, contentManagement: false, analytics: false },
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    // Country codes for phone number
    const countryCodes = [
        { code: '+1', country: 'USA' },
        { code: '+91', country: 'India' },
        { code: '+44', country: 'UK' },
        { code: '+81', country: 'Japan' },
    ];

    // Notification sound
    const notificationSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/24/audio_4b988e6c1e.mp3?filename=notification-140890.mp3');

    // Cleanup for profile image URL to prevent memory leaks
    useEffect(() => {
        return () => {
            if (profileImage) {
                URL.revokeObjectURL(profileImage);
            }
        };
    }, [profileImage]);

    // Update adminLockStatus when admins change
    useEffect(() => {
        setAdminLockStatus((prev) => {
            const newStatus = admins.reduce((acc, admin) => ({
                ...acc,
                [admin.id]: prev[admin.id] || { isLocked: false, failedAttempts: 0 }
            }), {});
            return newStatus;
        });
    }, [admins]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateAdminData = (data) => {
        const newErrors = {};
        if (!data.name.trim()) newErrors.name = 'Name is required';
        if (!data.email.trim()) newErrors.email = 'Email is required';
        else if (!validateEmail(data.email)) newErrors.email = 'Invalid email format';
        if (data.password && data.password !== data.confirmPassword) {
            newErrors.confirmPassword = "Passwords don't match";
        }
        return newErrors;
    };

    const addNotification = (message) => {
        const timestamp = new Date().toLocaleString();
        setNotifications((prev) => {
            const newNotifications = [{ id: Date.now(), message, timestamp }, ...prev].slice(0, 10);
            notificationSound.play().catch((error) => console.error('Error playing notification sound:', error));
            return newNotifications;
        });
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNewAdminChange = (e) => {
        const { name, value } = e.target;
        setNewAdmin((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLoginChange = (e) => {
        setLoginFormData({
            ...loginFormData,
            [e.target.name]: e.target.value
        });
        setLoginErrorMsg('');
        setLoginSuccessMsg('');
    };

    const togglePasswordVisibility = (field, isLogin = false) => {
        if (isLogin) {
            setShowLoginPassword((prev) => ({
                ...prev,
                [field]: !prev[field]
            }));
        } else {
            setShowPassword((prev) => ({
                ...prev,
                [field]: !prev[field]
            }));
        }
    };

    const handleVerifyAdmin = () => {
        if (!verifyPassword.trim()) {
            setErrors({ verifyPassword: 'Password is required' });
            return;
        }
        // Simple verification (replace with actual auth logic if needed)
        setIsVerified(true);
        setShowVerifyModal(false);
        setVerifyPassword('');
        setErrors({});

        // Execute the pending action
        if (pendingAction === 'edit' && pendingAdminId) {
            const admin = admins.find((a) => a.id === pendingAdminId);
            if (admin) handleEditAdmin(admin);
        } else if (pendingAction === 'delete' && pendingAdminId) {
            handleDeleteAdmin(pendingAdminId);
        }

        // Reset pending action and admin ID
        setPendingAction(null);
        setPendingAdminId(null);
        alert('Admin verified successfully!');
    };

    const handleVerifyModalClose = () => {
        setShowVerifyModal(false);
        setVerifyPassword('');
        setErrors({});
        setPendingAction(null);
        setPendingAdminId(null);
    };

    const initiateEditAdmin = (admin) => {
        setPendingAction('edit');
        setPendingAdminId(admin.id);
        setShowVerifyModal(true);
    };

    const initiateDeleteAdmin = (id) => {
        setPendingAction('delete');
        setPendingAdminId(id);
        setShowVerifyModal(true);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoginErrorMsg('');
        setLoginSuccessMsg('');
        try {
            // Validate inputs
            if (!loginFormData.email || !validateEmail(loginFormData.email)) {
                setLoginErrorMsg('Please enter a valid email address.');
                setLoading(false);
                return;
            }
            if (!loginFormData.newPassword) {
                setLoginErrorMsg('Please enter a password.');
                setLoading(false);
                return;
            }

            // Set authenticated state and close login modal
            setIsAuthenticated(true);
            setShowLoginModal(false);
            setLoginFormData({ email: '', newPassword: '' });
            setLoginErrorMsg('');
            setLoginSuccessMsg('');
        } catch (error) {
            setLoginErrorMsg(error.message || 'Failed to proceed');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProfile = () => {
        const profileErrors = validateAdminData(adminData);
        if (Object.keys(profileErrors).length > 0) {
            setErrors(profileErrors);
            return;
        }
        setIsEditing(false);
        setHasProfile(true);
        setIsAuthenticated(true);
        setErrors({});
    };

    const handleAddAdmin = () => {
        const adminErrors = validateAdminData(newAdmin);
        if (Object.keys(adminErrors).length > 0) {
            setErrors(adminErrors);
            return;
        }

        const addedAdmin = {
            id: admins.length + 1,
            name: newAdmin.name,
            email: newAdmin.email,
            role: newAdmin.role,
            lastLogin: 'Never',
            bio: newAdmin.bio,
            permissions: newAdmin.permissions,
        };

        setAdmins([...admins, addedAdmin]);
        setAdminLockStatus((prev) => ({
            ...prev,
            [addedAdmin.id]: { isLocked: false, failedAttempts: 0 }
        }));
        setShowAddAdminForm(false);
        setNewAdmin({
            name: '',
            email: '',
            phone: '',
            role: 'Manager',
            password: '',
            confirmPassword: '',
            bio: '',
            permissions: { userManagement: false, contentManagement: false, analytics: false },
        });
        setErrors({});
        addNotification(`New admin added: ${newAdmin.email}`);
        alert(`Welcome email sent to ${newAdmin.email} with login credentials!`);
    };

    const handleEditAdmin = (admin) => {
        setNewAdmin({
            name: admin.name,
            email: admin.email,
            phone: admin.phone || '',
            role: admin.role,
            password: '',
            confirmPassword: '',
            bio: admin.bio || '',
            permissions: admin.permissions,
        });
        setEditingAdminId(admin.id);
        setShowAddAdminForm(true);
    };

    const handleSaveEditedAdmin = () => {
        const adminErrors = validateAdminData(newAdmin);
        if (Object.keys(adminErrors).length > 0) {
            setErrors(adminErrors);
            return;
        }

        setAdmins(
            admins.map((admin) =>
                admin.id === editingAdminId
                    ? {
                          ...admin,
                          name: newAdmin.name,
                          email: newAdmin.email,
                          role: newAdmin.role,
                          bio: newAdmin.bio,
                          permissions: newAdmin.permissions,
                      }
                    : admin
            )
        );
        setShowAddAdminForm(false);
        setEditingAdminId(null);
        setNewAdmin({
            name: '',
            email: '',
            phone: '',
            role: 'Manager',
            password: '',
            confirmPassword: '',
            bio: '',
            permissions: { userManagement: false, contentManagement: false, analytics: false },
        });
        setErrors({});
    };

    const handleCancelAddAdmin = () => {
        setShowAddAdminForm(false);
        setEditingAdminId(null);
        setNewAdmin({
            name: '',
            email: '',
            phone: '',
            role: 'Manager',
            password: '',
            confirmPassword: '',
            bio: '',
            permissions: { userManagement: false, contentManagement: false, analytics: false },
        });
        setErrors({});
    };

    const handleDeleteAdmin = (id) => {
        if (window.confirm('Are you sure you want to delete this admin?')) {
            setAdmins(admins.filter((admin) => admin.id !== id));
            setAdminLockStatus((prev) => {
                const { [id]: _, ...rest } = prev;
                return rest;
            });
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setHasProfile(false);
        setProfileImage(null);
        setAdminData({
            name: 'Admin User',
            email: 'admin@example.com',
            countryCode: '+1',
            phoneNumber: '1234567890',
            role: 'Super Admin',
            address: '',
            department: '',
            description: '',
        });
        alert('Logged out successfully!');
        navigate('/login');
    };

    const handleChangePassword = () => {
        addNotification('Password changed');
        alert('Password change functionality not implemented yet.');
    };

    const handleEnable2FA = () => {
        addNotification('2FA enabled');
        alert('2FA enable functionality not implemented yet.');
    };

    const handleRevokeSession = () => {
        alert('Session revoke functionality not implemented yet.');
    };

    const toggleAdminLock = (adminId) => {
        setAdminLockStatus((prev) => ({
            ...prev,
            [adminId]: {
                ...prev[adminId],
                isLocked: !prev[adminId].isLocked
            }
        }));
    };

    const lockAdminAccount = (adminId) => {
        setAdminLockStatus((prev) => ({
            ...prev,
            [adminId]: {
                ...prev[adminId],
                isLocked: true
            }
        }));
        const admin = admins.find((a) => a.id === adminId);
        addNotification(`Account locked: ${admin.email}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-72 bg-white shadow-xl z-40 ${menuOpen ? 'block' : 'hidden'} md:block`}>
                <AdminHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>

            {/* Overlay for mobile sidebar */}
            {menuOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setMenuOpen(false)} />
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
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Admin Settings</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button
                                className="flex items-center space-x-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative"
                                onClick={() => setShowNotifications(!showNotifications)}
                            >
                                <FaBell className="text-2xl text-indigo-600" />
                                {notifications.length > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                                        {notifications.length}
                                    </span>
                                )}
                            </button>
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-20 max-h-96 overflow-y-auto">
                                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                                        <span className="text-sm font-medium text-gray-900">Notifications</span>
                                        <button
                                            onClick={clearNotifications}
                                            className="text-sm text-indigo-600 hover:text-indigo-800"
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                    {notifications.length === 0 ? (
                                        <p className="px-4 py-2 text-sm text-gray-500">No notifications</p>
                                    ) : (
                                        notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className="px-4 py-2 border-b border-gray-100 hover:bg-gray-50"
                                            >
                                                <p className="text-sm text-gray-700">{notification.message}</p>
                                                <p className="text-xs text-gray-500">{notification.timestamp}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button
                                className="flex items-center space-x-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                            >
                                <FaUserCircle className="text-2xl text-indigo-600" />
                                <span className="hidden md:inline text-gray-700">Profile</span>
                            </button>
                            {profileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-20">
                                    <Link
                                        to="/admin/settings"
                                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        <FaCog className="text-black" />
                                        <span>Settings</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                        <FaSignOutAlt className="text-red-500" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="p-6 max-w-7xl mx-auto">
                    {/* Tabs */}
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                        <div className="flex border-b border-gray-200">
                            <button
                                className={`py-2 px-4 font-medium text-sm ${
                                    currentTab === 'profile'
                                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                                onClick={() => setCurrentTab('profile')}
                            >
                                Profile
                            </button>
                            <button
                                className={`py-2 px-4 font-medium text-sm ${
                                    currentTab === 'admins'
                                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                                onClick={() => setCurrentTab('admins')}
                            >
                                Admins
                            </button>
                            <button
                                className={`py-2 px-4 font-medium text-sm ${
                                    currentTab === 'security'
                                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                                onClick={() => setCurrentTab('security')}
                            >
                                Security
                            </button>
                        </div>
                    </div>

                    {/* Profile Tab */}
                    {currentTab === 'profile' && (
                       <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-sm p-6 mb-6 relative">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-gray-900">Profile Information</h2>
                                {!isAuthenticated ? (
                                    <button
                                        onClick={() => setShowLoginModal(true)}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Log In
                                    </button>
                                ) : (
                                    <div className="flex space-x-3">
                                        {!hasProfile && (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                                            >
                                                <FaPlus /> <span>  Details</span>
                                            </button>
                                        )}
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                                        >
                                            <FaEdit /> <span>Edit </span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Profile Image and Name Section */}
                            {isAuthenticated && (
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative">
                                        <img
                                            src={profileImage || 'https://via.placeholder.com/100'}
                                            className="w-24 h-24 rounded-full object-cover border-2 border-indigo-100"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">{adminData.name}</h2>
                                    </div>
                                </div>
                            )}

                            {!isAuthenticated && (
                                <div className="text-center py-8">
                                    <p className="text-gray-900"> LOG IN TO VIEW PROFILE INFORMATION</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Edit Profile Modal */}
                    {isEditing && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl p-6 w-full max-w-md min-h-[500px] max-h-[80vh] overflow-y-auto scrollbar-hide scroll-smooth border border-gray-200">
                                <div className="border-b border-gray-200 pb-3 mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Edit Profile</h3>
                                </div>
                                <div className="space-y-4">
                                    {/* Profile Image Section */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="relative">
                                            <img
                                                src={profileImage || 'https://via.placeholder.com/100'}
                                                className="w-20 h-20 rounded-lg object-cover border-2 border-indigo-100"
                                                alt="Profile"
                                            />
                                            <label className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-sm cursor-pointer">
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        if (e.target.files[0]) {
                                                            if (profileImage) URL.revokeObjectURL(profileImage);
                                                            setProfileImage(URL.createObjectURL(e.target.files[0]));
                                                        }
                                                    }}
                                                />
                                                <FaEdit className="text-indigo-600" />
                                            </label>
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900">{adminData.name}</h2>
                                            <p className="text-sm text-gray-600">{adminData.role}</p>
                                        </div>
                                    </div>

                                    {/* Profile Edit Form */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">FULL NAME</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={adminData.name}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-2 border text-sm ${
                                                errors.name ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors`}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">EMAIL</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={adminData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-2 border text-sm ${
                                                errors.email ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors`}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">PHONE</label>
                                        <div className="flex space-x-2">
                                            <select
                                                name="countryCode"
                                                value={adminData.countryCode}
                                                onChange={handleInputChange}
                                                className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm"
                                            >
                                                {countryCodes.map((option) => (
                                                    <option key={option.code} value={option.code}>
                                                        {option.code} ({option.country})
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={adminData.phoneNumber}
                                                onChange={handleInputChange}
                                                className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">ROLE</label>
                                        <select
                                            name="role"
                                            value={adminData.role}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm"
                                        >
                                            <option value="Super Admin">Super Admin</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Support">Support</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">ADDRESS</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={adminData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">DEPARTMENT</label>
                                        <input
                                            type="text"
                                            name="department"
                                            value={adminData.department}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">DESCRIPTION</label>
                                        <textarea
                                            name="description"
                                            value={adminData.description}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm"
                                            rows="4"
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-3">
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 hover:shadow-sm transition-colors flex items-center space-x-2 text-sm"
                                            aria-label="Cancel profile edit"
                                        >
                                            <FaTimes /> <span>Cancel</span>
                                        </button>
                                        <button
                                            onClick={handleSaveProfile}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:shadow-sm transition-colors flex items-center space-x-2 text-sm"
                                            aria-label="Save profile changes"
                                        >
                                            <FaSave /> <span>Save</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Admins Tab */}
                    {currentTab === 'admins' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-bold text-gray-900">Admin Users</h2>
                                    <button
                                        onClick={() => {
                                            setEditingAdminId(null);
                                            setShowAddAdminForm(true);
                                        }}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                                    >
                                        <FaPlus /> <span>Add Admin</span>
                                    </button>
                                </div>
                            </div>

                            {/* Verify Admin Modal */}
                            {showVerifyModal && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                                        <h3 className="text-md font-bold text-gray-900 mb-4">Verify Admin</h3>
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    value={verifyPassword}
                                                    onChange={(e) => setVerifyPassword(e.target.value)}
                                                    className={`w-full px-4 py-2 border ${
                                                        errors.verifyPassword ? 'border-red-500' : 'border-gray-200'
                                                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors`}
                                                    placeholder="Enter your password"
                                                />
                                                {errors.verifyPassword && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.verifyPassword}</p>
                                                )}
                                            </div>
                                            <button
                                                onClick={handleVerifyAdmin}
                                                className="mt-6 px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                                            >
                                                Verify
                                            </button>
                                        </div>
                                        <div className="flex justify-end mt-6">
                                            <button
                                                onClick={handleVerifyModalClose}
                                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Add/Edit Admin Modal */}
                            {showAddAdminForm && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                                        <h3 className="text-md font-bold text-gray-900 mb-4">
                                            {editingAdminId ? 'Edit Admin' : 'Add New Admin'}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={newAdmin.name}
                                                    onChange={handleNewAdminChange}
                                                    className={`w-full px-4 py-2 border ${
                                                        errors.name ? 'border-red-500' : 'border-gray-200'
                                                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors`}
                                                />
                                                {errors.name && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={newAdmin.email}
                                                    onChange={handleNewAdminChange}
                                                    className={`w-full px-4 py-2 border ${
                                                        errors.email ? 'border-red-500' : 'border-gray-200'
                                                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors`}
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Phone 
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={newAdmin.phone}
                                                    onChange={handleNewAdminChange}
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Role
                                                </label>
                                                <select
                                                    name="role"
                                                    value={newAdmin.role}
                                                    onChange={handleNewAdminChange}
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                >
                                                    <option value="Super Admin">Super Admin</option>
                                                    <option value="Manager">Manager</option>
                                                    <option value="Support">Support</option>
                                                </select>
                                            </div>
                                            {!editingAdminId && (
                                                <>
                                                </>
                                            )}
                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Bio
                                                </label>
                                                <textarea
                                                    name="bio"
                                                    value={newAdmin.bio}
                                                    onChange={handleNewAdminChange}
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                    rows="4"
                                                    placeholder="Tell us about this admin..."
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Permissions
                                                </label>
                                                <div className="space-y-2">
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            name="userManagement"
                                                            className="rounded text-indigo-600 focus:ring-indigo-500"
                                                            checked={newAdmin.permissions.userManagement}
                                                            onChange={(e) =>
                                                                setNewAdmin({
                                                                    ...newAdmin,
                                                                    permissions: {
                                                                        ...newAdmin.permissions,
                                                                        userManagement: e.target.checked,
                                                                    },
                                                                })
                                                            }
                                                        />
                                                        <span className="text-sm">User Management</span>
                                                    </label>
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            name="contentManagement"
                                                            className="rounded text-indigo-600 focus:ring-indigo-500"
                                                            checked={newAdmin.permissions.contentManagement}
                                                            onChange={(e) =>
                                                                setNewAdmin({
                                                                    ...newAdmin,
                                                                    permissions: {
                                                                        ...newAdmin.permissions,
                                                                        contentManagement: e.target.checked,
                                                                    },
                                                                })
                                                            }
                                                        />
                                                        <span className="text-sm">Content Management</span>
                                                    </label>
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            name="analytics"
                                                            className="rounded text-indigo-600 focus:ring-indigo-500"
                                                            checked={newAdmin.permissions.analytics}
                                                            onChange={(e) =>
                                                                setNewAdmin({
                                                                    ...newAdmin,
                                                                    permissions: {
                                                                        ...newAdmin.permissions,
                                                                        analytics: e.target.checked,
                                                                    },
                                                                })
                                                            }
                                                        />
                                                        <span className="text-sm">Analytics Access</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end space-x-3 mt-6">
                                            <button
                                                onClick={handleCancelAddAdmin}
                                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={editingAdminId ? handleSaveEditedAdmin : handleAddAdmin}
                                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                            >
                                                {editingAdminId ? 'Save Changes' : 'Save Admin'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Admin Management Section */}
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-6">Admin Management</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Email
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Role
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {admins.map((admin) => (
                                                <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {admin.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {admin.email}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {admin.role}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <div className="flex space-x-2">
                                                            <button
                                                                className="px-3 py-1 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors"
                                                                onClick={() => initiateEditAdmin(admin)}
                                                                aria-label={`Edit admin ${admin.name}`}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                                                                onClick={() => initiateDeleteAdmin(admin.id)}
                                                                aria-label={`Delete admin ${admin.name}`}
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
                        </div>
                    )}

                    {/* Security Tab */}
                    {currentTab === 'security' && (
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Security Settings</h2>

                            <div className="space-y-6">
                                {/* Password & Authentication Section */}
                                <div className="border-b border-gray-200">
                                    <div
                                        className="flex items-center justify-between py-3 cursor-pointer"
                                        onClick={() => setShowPasswordAuthSection(!showPasswordAuthSection)}
                                    >
                                        <h3 className="text-md font-medium text-gray-900">Password & Authentication</h3>
                                        <button className="text-gray-500 hover:text-gray-700">
                                            {showPasswordAuthSection ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>
                                    </div>
                                    {showPasswordAuthSection && (
                                        <div className="pb-6 space-y-6">
                                            {/* Manage Your Password */}
                                            <div className="pt-4">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-sm font-medium text-gray-700">Manage Your Password</h4>
                                                    <button
                                                        onClick={() => setShowChangePasswordModal(true)}
                                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                                                    >
                                                        Change Password
                                                    </button>
                                                </div>
                                            </div>
                                            {/* Two-Factor Authentication */}
                                            <div className="pt-4 border-t border-gray-200">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-700">Two-Factor Authentication</h4>
                                                        <p className="text-xs text-gray-500 mt-1">Currently disabled</p>
                                                    </div>
                                                    <button
                                                        onClick={() => setShow2FAModal(true)}
                                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                                                    >
                                                        Enable 2FA
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Active Sessions Section */}
                                <div className="border-b border-gray-200">
                                    <div
                                        className="flex items-center justify-between py-3 cursor-pointer"
                                        onClick={() => setShowActiveSessionsSection(!showActiveSessionsSection)}
                                    >
                                        <h3 className="text-md font-medium text-gray-900">Active Sessions</h3>
                                        <button className="text-gray-500 hover:text-gray-700">
                                            {showActiveSessionsSection ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>
                                    </div>
                                    {showActiveSessionsSection && (
                                        <div className="pb-6 space-y-6">
                                            <div className="pt-4">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-sm font-medium text-gray-700">Login Activity</h4>
                                                </div>
                                                <div className="mt-4 space-y-3">
                                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                Login from Chrome on Windows
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                July 15, 2024 at 10:30 AM
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={handleRevokeSession}
                                                            className="text-sm text-red-600 hover:text-red-800"
                                                        >
                                                            Revoke
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                Login from Safari on iPhone
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                July 10, 2024 at 8:45 AM
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={handleRevokeSession}
                                                            className="text-sm text-red-600 hover:text-red-800"
                                                        >
                                                            Revoke
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Admin Account Lock Section */}
                                <div>
                                    <div
                                        className="flex items-center justify-between py-3 cursor-pointer"
                                        onClick={() => setShowAdminLockSection(!showAdminLockSection)}
                                    >
                                        <h3 className="text-md font-medium text-gray-900">Admin Account Lock</h3>
                                        <button className="text-gray-500 hover:text-gray-700">
                                            {showAdminLockSection ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>
                                    </div>
                                    {showAdminLockSection && (
                                        <div className="pb-6 space-y-6">
                                            <div className="pt-4">
                                                <h4 className="text-sm font-medium text-gray-700 mb-4">Admin Accounts</h4>
                                                <div className="space-y-3">
                                                    {admins.map((admin) => (
                                                        <div key={admin.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                            <div className="flex items-center space-x-3">
                                                                <button
                                                                    onClick={() => toggleAdminLock(admin.id)}
                                                                    className="text-gray-600 hover:text-gray-800"
                                                                    aria-label={adminLockStatus[admin.id]?.isLocked ? `Unlock ${admin.name}` : `Lock ${admin.name}`}
                                                                >
                                                                    {adminLockStatus[admin.id]?.isLocked ? (
                                                                        <FaLock className="text-red-500" />
                                                                    ) : (
                                                                        <FaUnlock className="text-green-500" />
                                                                    )}
                                                                </button>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-900">
                                                                        {admin.name} ({admin.role})
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
                                                                        {admin.email}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500 mt-1">
                                                                        {adminLockStatus[admin.id]?.failedAttempts || 0} attempt{adminLockStatus[admin.id]?.failedAttempts !== 1 ? 's' : ''}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => lockAdminAccount(admin.id)}
                                                                className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                                                aria-label={`Lock account for ${admin.name}`}
                                                            >
                                                                Lock
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Change Password Modal */}
                    {showChangePasswordModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
                                <div className="spaceCULy-4">
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Current Password
                                        </label>
                                        <input
                                            type={showPassword.current ? 'text' : 'password'}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors pr-10"
                                            placeholder="Enter current password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 mt-7"
                                            onClick={() => togglePasswordVisibility('current')}
                                        >
                                            {showPassword.current ? (
                                                <FaEyeSlash className="text-gray-500" />
                                            ) : (
                                                <FaEye className="text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            New Password
                                        </label>
                                        <input
                                            type={showPassword.new ? 'text' : 'password'}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors pr-10"
                                            placeholder="Enter new password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 mt-7"
                                            onClick={() => togglePasswordVisibility('new')}
                                        >
                                            {showPassword.new ? (
                                                <FaEyeSlash className="text-gray-500" />
                                            ) : (
                                                <FaEye className="text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type={showPassword.confirm ? 'text' : 'password'}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors pr-10"
                                            placeholder="Confirm new password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 mt-7"
                                            onClick={() => togglePasswordVisibility('confirm')}
                                        >
                                            {showPassword.confirm ? (
                                                <FaEyeSlash className="text-gray-500" />
                                            ) : (
                                                <FaEye className="text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="flex justify-end space-x-3">
                                        <button
                                            onClick={() => setShowChangePasswordModal(false)}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleChangePassword();
                                                setShowChangePasswordModal(false);
                                            }}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            Save Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2FA Modal */}
                    {show2FAModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Enable Two-Factor Authentication</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                            placeholder="Enter verification code"
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-3">
                                        <button
                                            onClick={() => setShow2FAModal(false)}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleEnable2FA();
                                                setShow2FAModal(false);
                                            }}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            Enable 2FA
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Login Modal (Adapted from AdminSignin.jsx) */}
                    {showLoginModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50">
                            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 transform transition-all">
                                <h3 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-tight">
                                    Admin Login
                                </h3>
                                <form onSubmit={handleLogin} className="space-y-6">
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                            htmlFor="loginEmail"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="loginEmail"
                                            name="email"
                                            value={loginFormData.email}
                                            onChange={handleLoginChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
                                            placeholder="Enter your admin email"
                                            required
                                            autoComplete="username"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                            htmlFor="loginNewPassword"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type={showLoginPassword.newPassword ? 'text' : 'password'}
                                            id="loginNewPassword"
                                            name="newPassword"
                                            value={loginFormData.newPassword}
                                            onChange={handleLoginChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 pr-10"
                                            placeholder="Enter your password"
                                            required
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 mt-8"
                                            onClick={() => togglePasswordVisibility('newPassword', true)}
                                        >
                                            {showLoginPassword.newPassword ? (
                                                <FaEyeSlash className="text-gray-500" />
                                            ) : (
                                                <FaEye className="text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                    {loginErrorMsg && (
                                        <div className="text-red-600 text-sm text-center">{loginErrorMsg}</div>
                                    )}
                                    {loginSuccessMsg && (
                                        <div className="text-green-600 text-sm text-center">{loginSuccessMsg}</div>
                                    )}
                                    <div className="flex justify-between space-x-3">
                                        <button
                                            type="button"
                                            className="w-1/2 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
                                            onClick={() => {
                                                setShowLoginModal(false);
                                                setLoginFormData({ email: '', newPassword: '' });
                                                setLoginErrorMsg('');
                                                setLoginSuccessMsg('');
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="w-1/2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                                            disabled={loading}
                                        >
                                            {loading ? 'Processing...' : 'Login'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}