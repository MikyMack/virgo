import { useState, useEffect } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt, FaBars, FaTimes, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader';
import img1 from "../../../assets/banner/banner1.png";
import img2 from "../../../assets/banner/banner2.png";
import img3 from "../../../assets/banner/banner3.png";
import bgim from "../../../assets/banner/dashboarbg.jpg";

export default function AdminBanners() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [banners, setBanners] = useState([]);
  const [editBannerId, setEditBannerId] = useState(null);
  const [newBannerImage, setNewBannerImage] = useState(null);
  const [showAddBannerPopup, setShowAddBannerPopup] = useState(false);

  // Initialize banners from localStorage or defaults
  useEffect(() => {
    const loadBanners = () => {
      try {
        const storedBanners = localStorage.getItem("banners");
        console.log("Raw localStorage content:", storedBanners);
        
        if (storedBanners) {
          const parsedBanners = JSON.parse(storedBanners);
          if (Array.isArray(parsedBanners) && parsedBanners.length > 0) {
            console.log("Loaded banners from localStorage:", parsedBanners);
            setBanners(parsedBanners);
            return;
          }
        }

        // If no valid banners in localStorage, use defaults
        const defaultBanners = [
          { id: 1, image: img1, published: true },
          { id: 2, image: img2, published: false },
          { id: 3, image: img3, published: true },
        ];
        console.log("Initializing with default banners:", defaultBanners);
        setBanners(defaultBanners);
        localStorage.setItem("banners", JSON.stringify(defaultBanners));
      } catch (error) {
        console.error("Error parsing localStorage:", error);
        const defaultBanners = [
          { id: 1, image: img1, published: true },
          { id: 2, image: img2, published: false },
          { id: 3, image: img3, published: true },
        ];
        setBanners(defaultBanners);
        localStorage.setItem("banners", JSON.stringify(defaultBanners));
      }
    };

    loadBanners();
  }, []);

  const handleResetSearch = () => {
    setSearchTerm('');
  };

  const handleEditBanner = (id) => {
    setEditBannerId(id);
  };

  const handleDeleteBanner = (id) => {
    const updatedBanners = banners.filter(banner => banner.id !== id);
    setBanners(updatedBanners);
    localStorage.setItem("banners", JSON.stringify(updatedBanners));
    console.log("After delete, banners:", updatedBanners);
  };

  const handleTogglePublished = (id) => {
    const updatedBanners = banners.map(banner =>
      banner.id === id ? { ...banner, published: !banner.published } : banner
    );
    setBanners(updatedBanners);
    localStorage.setItem("banners", JSON.stringify(updatedBanners));
    console.log("After toggle, banners:", updatedBanners);
  };

  const handleSaveNewImage = () => {
    if (!newBannerImage) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedBanners = banners.map(banner =>
        banner.id === editBannerId ? { ...banner, image: reader.result } : banner
      );
      setBanners(updatedBanners);
      localStorage.setItem("banners", JSON.stringify(updatedBanners));
      setEditBannerId(null);
      setNewBannerImage(null);
      console.log("After edit, banners:", updatedBanners);
    };
    reader.onerror = () => console.error("Error reading file for edit");
    reader.readAsDataURL(newBannerImage);
  };

  const handleAddNewBanner = () => {
    if (!newBannerImage) {
      console.log("No image selected");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const newBanner = {
        id: Date.now(),
        image: reader.result,
        published: false
      };
      const updatedBanners = [...banners, newBanner];
      try {
        setBanners(updatedBanners);
        localStorage.setItem("banners", JSON.stringify(updatedBanners));
        console.log("After add, banners:", updatedBanners);
        console.log("Stored in localStorage:", JSON.parse(localStorage.getItem("banners")));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
      setShowAddBannerPopup(false);
      setNewBannerImage(null);
    };
    reader.onerror = () => console.error("Error reading file for add");
    reader.readAsDataURL(newBannerImage);
  };

  const filteredBanners = banners.filter(banner =>
    banner.image.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Banner Management</h1>
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
              <div className="flex items-center gap-3">
                <button
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={handleResetSearch}
                >
                  Reset Search
                </button>
                <button
                  className="bg-indigo-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors"
                  onClick={() => setShowAddBannerPopup(true)}
                >
                  <FaPlus /> <span>Add New Banner</span>
                </button>
              </div>
              <input
                type="text"
                placeholder="Search by image file"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 px-4 py-2  bg-gray-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-800 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Banners Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-base font-medium text-gray-900">Index</th>
                    <th className="py-3 px-4 text-left text-base font-medium text-gray-900">Banner Image</th>
                    <th className="py-3 px-4 text-left text-base font-medium text-gray-900">Published</th>
                    <th className="py-3 px-4 text-left text-base font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBanners.length > 0 ? (
                    filteredBanners.map((banner, index) => (
                      <tr key={banner.id} className="border-b last:border-b-0 hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm text-gray-600">{index + 1}</td>
                        <td className="py-4 px-4">
                          <img src={banner.image} alt={`Banner ${index + 1}`} className="h-20 w-20 object-contain" />
                        </td>
                        <td className="py-4 px-4">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={banner.published}
                              onChange={() => handleTogglePublished(banner.id)}
                            />
                            <div className="w-10 h-5 bg-red-400 rounded-full peer peer-checked:bg-green-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                          </label>
                        </td>
                        <td className="py-4 px-4 flex gap-2">
                          <button
                            onClick={() => handleEditBanner(banner.id)}
                            className="p-2 text-green-500 hover:bg-green-100 rounded-full transition-colors"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteBanner(banner.id)}
                            className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                          >
                            <FaTrash size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-4 px-4 text-center text-gray-500">No banners found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Edit Banner Modal */}
        {editBannerId && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit Banner</h2>
                <button
                  onClick={() => setEditBannerId(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewBannerImage(e.target.files[0])}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors mb-4"
              />
              <div className="flex justify-end gap-4">
                <button
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  onClick={() => setEditBannerId(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                  onClick={handleSaveNewImage}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Banner Modal */}
        {showAddBannerPopup && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add New Banner</h2>
                <button
                  onClick={() => setShowAddBannerPopup(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewBannerImage(e.target.files[0])}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors mb-4"
              />
              <div className="flex justify-end gap-4">
                <button
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  onClick={() => setShowAddBannerPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  onClick={handleAddNewBanner}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}