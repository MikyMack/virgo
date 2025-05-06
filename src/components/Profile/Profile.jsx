import  { useState } from "react";
import {
  FaUser,
  FaEdit,
  FaShoppingBag,
  FaHeart,
  FaAddressCard,
  FaSignOutAlt,
  FaCamera,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import profile from "../../assets/icons/profile.jpg";
import Header from "../Header/Header";
import s4 from '../../assets/products/s4.png'
import Navigation from "../Header/Navigation";
import { logout } from "../../actions/useractions/auth/registeraction";
import {  useNavigate } from "react-router-dom";


const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "prasad",
    email: "prasad@123445.com",
    phone: "+91 1234567890",
    dateJoined: "June 15, 2023",
    address: "123 trippanachi, manjeri, Malappuram",
    profileImage: profile,
  });
  const [addressModal, setAddressModal] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempUserData, setTempUserData] = useState({ ...userData });
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUserData({
      ...tempUserData,
      [name]: value,
    });
  };

  const handleSaveProfile = () => {
    setUserData({ ...tempUserData });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setTempUserData({ ...userData });
    setIsEditing(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  // Demo orders data
  const orders = [
    {
      id: "#ORD-2024-0142",
      date: "April 28, 2025",
      total: "₹4,599",
      status: "Delivered",
    },
    {
      id: "#ORD-2024-0128",
      date: "April 15, 2025",
      total: "₹2,199",
      status: "Processing",
    },
    {
      id: "#ORD-2024-0097",
      date: "March 27, 2025",
      total: "₹899",
      status: "Delivered",
    },
  ];

  // Demo wishlist data
  const wishlist = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: "₹2,499",
      image: s4,
    },
    {
      id: 2,
      name: "Smart Fitness Tracker",
      price: "₹1,899",
      image:s4,
    },
    {
      id: 3,
      name: "Bluetooth Portable Speaker",
      price: "₹1,299",
      image:s4,
    },
  ];

  //   address modal
  const handleToggleActive = (index) => {
    const updated = addresses.map((addr, i) => ({
      ...addr,
      active: i === index,
    }));
    setAddresses(updated);
  };
  //   edit
  const handleEdit = (index) => {
    setNewAddress(addresses[index]);
    setEditingIndex(index);
    setAddressModal(true);
  };
  //   delete
  const handleDelete = (index) => {
    const filtered = addresses.filter((_, i) => i !== index);
    setAddresses(filtered);
  };
  const handleSaveAddress = () => {
    const requiredFields = [
      "fullName",
      "phone",
      "street",
      "city",
      "state",
      "zip",
    ];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!newAddress[field]?.trim()) {
        newErrors[field] = `${field} is required`;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    if (editingIndex !== null) {
      const updated = [...addresses];
      updated[editingIndex] = newAddress;
      setAddresses(updated);
    } else {
      setAddresses([...addresses, newAddress]);
    }

    setNewAddress({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    });
    setEditingIndex(null);
    setAddressModal(false);
    setErrors({});
  };
  const handleAddNew = () => {
    setNewAddress({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    });
    setEditingIndex(null);
    setAddressModal(true);
  };

  const handleLogout =()=>{
    logout();
    navigate('/');
  }

  return (
    <>
      <Header />
      <div className="p-4 md:p-6 flex md:mt-[6rem] flex-col  min-h-screen">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <h1 className="text-2xl font-normal">My Account</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Title (hidden on mobile) */}
        <h1 className="hidden md:block text-3xl font-normal mb-6 text-center">
          My Account
        </h1>

        <div className="flex flex-col md:flex-row gap-6 relative">
          {/* Mobile Sidebar Overlay */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            ></div>
          )}

          {/* Sidebar - Mobile (slides in) and Desktop */}
          <div
            className={`fixed md:relative z-40 w-3/4 md:w-1/4 inset-y-0  h-[100vh] left-0  p-0 transform transition-transform duration-300 ease-in-out 
            ${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0`}
          >
            <div className="border rounded-2xl overflow-hidden shadow-xl bg-white h-full md:h-auto">
              <div className="flex flex-col items-center p-6 border-b">
                <div className="relative">
                  <img
                    src={userData.profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gradient-to-r from-green-400 via-blue-500 to-purple-500"
                  />
                  <button className="absolute bottom-0 right-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white p-2 rounded-full hover:opacity-90">
                    <FaCamera size={14} />
                  </button>
                </div>
                <h2 className="text-xl font-normal mt-4">{userData.name}</h2>
                <p className="text-gray-500 text-sm">{userData.email}</p>
              </div>

              <div className="p-4">
                <button
                  onClick={() => handleTabChange("profile")}
                  className={`flex items-center w-full p-3 mb-2 rounded-lg transition-all ${
                    activeTab === "profile"
                      ? "bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FaUser className="mr-3" />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => handleTabChange("orders")}
                  className={`flex items-center w-full p-3 mb-2 rounded-lg transition-all ${
                    activeTab === "orders"
                      ? "bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FaShoppingBag className="mr-3" />
                  <span>Orders</span>
                </button>

                <button
                  onClick={() => handleTabChange("wishlist")}
                  className={`flex items-center w-full p-3 mb-2 rounded-lg transition-all ${
                    activeTab === "wishlist"
                      ? "bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FaHeart className="mr-3" />
                  <span>Wishlist</span>
                </button>

                <button
                  onClick={() => handleTabChange("addresses")}
                  className={`flex items-center w-full p-3 mb-2 rounded-lg transition-all ${
                    activeTab === "addresses"
                      ? "bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FaAddressCard className="mr-3" />
                  <span>Addresses</span>
                </button>

                <hr className="my-4" />

                <button onClick={handleLogout} className="flex items-center w-full p-3 text-red-500 hover:bg-red-50 rounded-lg transition-all">
                  <FaSignOutAlt className="mr-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="border rounded-2xl overflow-hidden shadow-xl bg-white p-4 md:p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl md:text-2xl font-normal">
                      Personal Information
                    </h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-md hover:opacity-90 text-sm md:text-base"
                      >
                        <FaEdit className="mr-2" /> Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-2 md:gap-3">
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 text-sm md:text-base"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          className="flex items-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white px-3 py-1 rounded-md hover:opacity-90 text-sm md:text-base"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>

                  {!isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                        <p className="text-gray-500 text-sm mb-1">Full Name</p>
                        <p className="font-semibold">{userData.name}</p>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                        <p className="text-gray-500 text-sm mb-1">
                          Email Address
                        </p>
                        <p className="font-semibold">{userData.email}</p>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                        <p className="text-gray-500 text-sm mb-1">
                          Phone Number
                        </p>
                        <p className="font-semibold">{userData.phone}</p>
                      </div>
                      <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                        <p className="text-gray-500 text-sm mb-1">
                          Default Address
                        </p>
                        <p className="font-semibold">{userData.address}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-gray-700 text-sm font-normal mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={tempUserData.name}
                          onChange={handleInputChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-normal mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={tempUserData.email}
                          onChange={handleInputChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-normal mb-2">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={tempUserData.phone}
                          onChange={handleInputChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-normal mb-2">
                          Default Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={tempUserData.address}
                          onChange={handleInputChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-xl md:text-2xl font-normal mb-4 md:mb-6">
                    My Orders
                  </h2>
                  {orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white overflow-auto">
                        <thead className="">
                          <tr>
                            <th className="py-2 px-3 md:py-3 md:px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Order ID
                            </th>
                            <th className="py-2 px-3 md:py-3 md:px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="py-2 px-3 md:py-3 md:px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Total
                            </th>
                            <th className="py-2 px-3 md:py-3 md:px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="py-3 px-3 md:py-4 md:px-4 border-b border-gray-200 text-sm">
                                {order.id}
                              </td>
                              <td className="py-3 px-3 md:py-4 md:px-4 border-b border-gray-200 text-sm">
                                {order.date}
                              </td>
                              <td className="py-3 px-3 md:py-4 md:px-4 border-b border-gray-200 text-sm font-semibold">
                                {order.total}
                              </td>
                              <td className="py-3 px-3 md:py-4 md:px-4 border-b border-gray-200">
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      You haven't placed any orders yet.
                    </p>
                  )}
                </div>
              )}

              {/* Wishlist Tab */}

              {activeTab === "wishlist" && (
                <div>
                  <h2 className="text-xl md:text-2xl font-normal mb-4 md:mb-6">
                    My Wishlist
                  </h2>
                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      {wishlist.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 md:p-4 border rounded-lg hover:shadow-md transition-all"
                        >
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-md mr-3 md:mr-4 flex items-center justify-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm md:text-base truncate">
                              {item.name}
                            </h3>
                            <p className="text-gray-600 text-sm md:text-base">
                              {item.price}
                            </p>
                          </div>
                          <div className="flex flex-col space-y-2 ml-2">
                            <button className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-md hover:opacity-90 text-xs md:text-sm">
                              Add to Cart
                            </button>
                            <button className="bg-gray-200 text-gray-700 px-2 py-1 md:px-3 md:py-1 rounded-md hover:bg-gray-300 text-xs md:text-sm">
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      Your wishlist is empty.
                    </p>
                  )}
                </div>
              )}

              {/* Placeholder for other tabs */}
              {activeTab === "addresses" && (
                <div className="flex justify-center flex-col items-center py-8 md:py-12">
                  <div className="text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                      {activeTab === "addresses" && <FaAddressCard size={20} />}
                    </div>
                    <h3 className="text-lg md:text-xl font-normal mb-2">
                      {activeTab === "addresses" && "Manage Addresses"}
                    </h3>
                    <p className="text-gray-500 mb-4 md:mb-6 text-sm md:text-base">
                      This section is currently under development.
                    </p>
                    <button
                      onClick={() => setAddressModal(true)}
                      className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-md hover:opacity-90 text-sm md:text-base"
                    >
                      {activeTab === "addresses" && "Add New Address"}
                    </button>
                  </div>

                  {addresses.length > 0 && (
                    <div className="grid gap-6 md:grid-cols-2  justify-center items-center lg:grid-cols-3 mt-6 px-4">
                      {addresses.map((addr, idx) => (
                        <div
                          key={idx}
                          className={`relative border rounded-lg p-4 overflow-auto flex flex-col w-[100%]   shadow-md ${
                            addr.active
                              ? "border-blue-600 bg-blue-50"
                              : "bg-white"
                          }`}
                        >
                          <div className="flex  items-center mb-2">
                            <h3 className="font-normal text-lg">
                              {addr.fullName}
                            </h3>
                          </div>
                          <p className="text-sm">{addr.phone}</p>
                          <p className="text-sm">{addr.street}</p>
                          <p className="text-sm">
                            {addr.city}, {addr.state} - {addr.zip}
                          </p>

                          <div className="flex flex-wrap gap-2 justify-between items-center mt-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(idx)}
                                className="text-blue-600 text-sm font-medium hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(idx)}
                                className="text-red-500 text-sm font-medium hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                            <button
                              onClick={() => handleToggleActive(idx)}
                              className={`text-xs px-2 py-1 rounded border ${
                                addr.active
                                  ? "bg-blue-600 text-white"
                                  : "bg-white text-blue-600"
                              }`}
                            >
                              {addr.active ? "Active" : "Set Active"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {addressModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6 relative">
                        <button
                          onClick={() => setAddressModal(false)}
                          className="absolute top-2 right-3 text-2xl"
                        >
                          &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4">
                          {editingIndex !== null
                            ? "Edit Address"
                            : "Add New Address"}
                        </h2>

                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={newAddress.fullName}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                fullName: e.target.value,
                              })
                            }
                            className={`w-full border px-3 py-2 rounded ${
                              errors.fullName
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />

                          <input
                            type="tel"
                            placeholder="Phone Number"
                            value={newAddress.phone}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                phone: e.target.value,
                              })
                            }
                            className={`w-full border px-3 py-2 rounded ${
                              errors.phone
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />

                          <input
                            type="text"
                            placeholder="Street Address"
                            value={newAddress.street}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                street: e.target.value,
                              })
                            }
                            className={`w-full border px-3 py-2 rounded ${
                              errors.phone
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />

                          <input
                            type="text"
                            placeholder="City"
                            value={newAddress.city}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                city: e.target.value,
                              })
                            }
                            className={`w-full border px-3 py-2 rounded ${
                              errors.phone
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />

                          <input
                            type="text"
                            placeholder="State"
                            value={newAddress.state}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                state: e.target.value,
                              })
                            }
                            className={`w-full border px-3 py-2 rounded ${
                              errors.phone
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          <input
                            type="text"
                            placeholder="Pin Code"
                            value={newAddress.zip}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                zip: e.target.value,
                              })
                            }
                            className={`w-full border px-3 py-2 rounded ${
                              errors.phone
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                        </div>

                        <button
                          className="mt-5 w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white py-2 rounded hover:opacity-90"
                          onClick={handleSaveAddress}
                        >
                          {editingIndex !== null
                            ? "Update Address"
                            : "Save Address"}
                        </button>
                      </div>
                    </div>
                  )}

                  <div></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
       <Navigation />
    </>
  );
};

export default Profile;
