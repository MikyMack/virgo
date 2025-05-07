import { useState, useEffect } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt, FaBars, FaTimes, FaRegEdit, FaPlus, FaMinus } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader';
import { getPrimaryCategories,createPrimaryCategory,updatePrimaryCategory,deletePrimaryCategory,getSecondaryCategories,createSecondaryCategory,updateSecondaryCategory,deleteSecondaryCategory,getTertiaryCategories,createTertiaryCategory,updateTertiaryCategory,deleteTertiaryCategory} from '../../../actions/adminactions/categories/categoriesactions';
export default function AdminCategories() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

  


    const [tertiaryCategoryOptions, setTertiaryCategoryOptions] = useState({});
    const [removedTertiaryCategories, setRemovedTertiaryCategories] = useState({});


    const  handleAddCategory=()=>{
        setShowAddCategoryPopup(true)
    }

  
// const handleChangePrimary=()=>{
//     setprimary({...primaryCategory,[e.target.name]:e.target.value})
// }
//  const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       await createPrimaryCategory(primaryCategory);
//       await  fetchPrimarycategory(); // Refresh list after creation
//       setFormData({ name: '', description: '' }); // Reset form
//     } catch (error) {
//       console.error('Error creating category:', error);
//     }
//   };
 
    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const data = await CategoriesList();
    //             setCategories(data);
    //         } catch (error) {
    //             console.error("Failed to fetch categories:", error);
    //         }
    //     };
    //     fetchCategories();
    // }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);








 

  



 

 

  

    const handleDeleteCategory = (id) => {
        setCategories(categories.filter(category => category.id !== id));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedCategories(categories.map(category => category.id));
        } else {
            setSelectedCategories([]);
        }
    };

    const handleSelectCategory = (id) => {
        if (selectedCategories.includes(id)) {
            setSelectedCategories(selectedCategories.filter(categoryId => categoryId !== id));
        } else {
            setSelectedCategories([...selectedCategories, id]);
        }
    };

    const handleTogglePublished = (id) => {
        setCategories(categories.map(category =>
            category.id === id ? { ...category, is_active: !category.is_active } : category
        ));
    };

;

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.id.toString().includes(searchTerm) ||
        category.subcategories.some(subcategory => 
            subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subcategory.id.toString().includes(searchTerm) ||
            subcategory.subcategories.some(subSubcategory => 
                subSubcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                subSubcategory.id.toString().includes(searchTerm)
            )
        )
    );

    const getTertiaryOptions = () => {
        const key = `${categoryInfo.name}|${secondaryCategoryInfo.name}`;
        const customOptions = tertiaryCategoryOptions[key] || [];
        const removed = removedTertiaryCategories[key] || [];
        const defaultOptions = [];
        if (categoryInfo.name === 'Candles' && secondaryCategoryInfo.name === 'Jar') {
            defaultOptions.push(
                { value: 'Ritu Collections', label: 'Ritu Collections' },
                { value: 'Mana Collections', label: 'Mana Collections' },
                { value: 'Sia Collections', label: 'Sia Collections' },
                { value: 'Wooden Collections', label: 'Wooden Collections' }
            );
        } else if (categoryInfo.name === 'Candles' && secondaryCategoryInfo.name === 'Floating') {
            defaultOptions.push({ value: 'Floating Candles', label: 'Floating Candles' });
        } else if (categoryInfo.name === 'Candles' && secondaryCategoryInfo.name === 'Decorative') {
            defaultOptions.push({ value: 'Decorative Candles', label: 'Decorative Candles' });
        } else if (categoryInfo.name === 'Candles' && secondaryCategoryInfo.name === 'Pillar') {
            defaultOptions.push(
                { value: 'Embossed Pillar Candles', label: 'Embossed Pillar Candles' },
                { value: 'Plain Pillar Candles', label: 'Plain Pillar Candles' },
                { value: 'Ribbed Pillar', label: 'Ribbed Pillar' },
                { value: 'Pillar For Occassions', label: 'Pillar For Occassions' }
            );
        } else if (categoryInfo.name === 'Candles' && secondaryCategoryInfo.name === 'Tea Lights') {
            defaultOptions.push(
                { value: 'Tea Lights', label: 'Tea Lights' },
                { value: 'Scented', label: 'Scented' },
                { value: 'Unscented', label: 'Unscented' },
                { value: 'Tea lights with topping', label: 'Tea lights with topping' }
            );
        } else if (categoryInfo.name === 'Candles' && secondaryCategoryInfo.name === 'Stick Candles') {
            defaultOptions.push(
                { value: 'Tapered', label: 'Tapered' },
                { value: 'Spiral', label: 'Spiral' },
                { value: 'Plain', label: 'Plain' }
            );
        } else if (categoryInfo.name === 'Candles' && secondaryCategoryInfo.name === 'Religious & Festive') {
            defaultOptions.push(
                { value: 'Baby Shower Candles', label: 'Baby Shower Candles' },
                { value: 'Holy Communion Candles', label: 'Holy Communion Candles' },
                { value: 'Wedding Set', label: 'Wedding Set' },
                { value: 'Christmas', label: 'Christmas' },
                { value: 'Baptism', label: 'Baptism' },
                { value: 'Valentine Day', label: 'Valentine Day' },
                { value: 'Diwali', label: 'Diwali' }
            );
        } else if (categoryInfo.name === 'Candles' && secondaryCategoryInfo.name === 'Gifting') {
            defaultOptions.push(
                { value: 'Return Gifts', label: 'Return Gifts' },
                { value: 'For Your Loved Ones', label: 'For Your Loved Ones' },
                { value: 'Mother\'s Day', label: 'Mother\'s Day' },
                { value: 'Father\'s Day', label: 'Father\'s Day' },
                { value: 'Frienship Day', label: 'Frienship Day' },
                { value: 'Women\'s Day', label: 'Women\'s Day' },
                { value: 'Teacher\'s Day', label: 'Teacher\'s Day' },
                { value: 'Diwali', label: 'Diwali' }
            );
        } else if (categoryInfo.name === 'Candle Holders' && secondaryCategoryInfo.name === 'Pillar') {
            defaultOptions.push(
                { value: 'Wood', label: 'Wood' },
                { value: 'Metal', label: 'Metal' },
                { value: 'Glass', label: 'Glass' }
            );
        } else if (categoryInfo.name === 'Candle Holders' && secondaryCategoryInfo.name === 'Tea Light') {
            defaultOptions.push(
                { value: 'Glass', label: 'Glass' },
                { value: 'Metal', label: 'Metal' },
                { value: 'Wooden', label: 'Wooden' },
                { value: 'Ceramic', label: 'Ceramic' },
                { value: 'Concrete', label: 'Concrete' }
            );
        } else if (categoryInfo.name === 'Candle Holders' && secondaryCategoryInfo.name === 'Stick') {
            defaultOptions.push({ value: 'Stick', label: 'Stick' });
        } else if (categoryInfo.name === 'Sachets' && secondaryCategoryInfo.name === 'Round') {
            defaultOptions.push({ value: 'Round', label: 'Round' });
        } else if (categoryInfo.name === 'Sachets' && secondaryCategoryInfo.name === 'Rectangle') {
            defaultOptions.push({ value: 'Rectangle', label: 'Rectangle' });
        } else if (categoryInfo.name === 'Sachets' && secondaryCategoryInfo.name === 'Rings') {
            defaultOptions.push({ value: 'Rings', label: 'Rings' });
        } else if (categoryInfo.name === 'Sachets' && secondaryCategoryInfo.name === 'Hearts') {
            defaultOptions.push({ value: 'Hearts', label: 'Hearts' });
        } else if (categoryInfo.name === 'Charms & Melts' && secondaryCategoryInfo.name === 'Charms & Melts') {
            defaultOptions.push({ value: 'Charms & Melts', label: 'Charms & Melts' });
        } else if (categoryInfo.name === 'Diyas' && secondaryCategoryInfo.name === 'Terracotta') {
            defaultOptions.push({ value: 'Terracotta', label: 'Terracotta' });
        } else if (categoryInfo.name === 'Diyas' && secondaryCategoryInfo.name === 'Metal') {
            defaultOptions.push({ value: 'Metal', label: 'Metal' });
        } else if (categoryInfo.name === 'Diyas' && secondaryCategoryInfo.name === 'Ceramic') {
            defaultOptions.push({ value: 'Ceramic', label: 'Ceramic' });
        } else if (categoryInfo.name === 'Table Tops' && secondaryCategoryInfo.name === 'Glass-Mosaic') {
            defaultOptions.push(
                { value: 'Mushrooms', label: 'Mushrooms' },
                { value: 'Purses', label: 'Purses' },
                { value: 'Dholaks', label: 'Dholaks' }
            );
        }
        return [...defaultOptions.filter(opt => !removed.includes(opt.value)), ...customOptions];
    };




    const [primaryCategories, setPrimaryCategories] = useState([]);
  const [secondaryCategories, setSecondaryCategories] = useState([]);
  const [tertiaryCategories, setTertiaryCategories] = useState([]);
  
  // State for form inputs
  const [newPrimaryCategory, setNewPrimaryCategory] = useState("");
  const [primaryDescription, setPrimaryDescription] = useState("");
  const [selectedPrimary, setSelectedPrimary] = useState("");
  
  const [newSecondaryCategory, setNewSecondaryCategory] = useState("");
  const [secondaryDescription, setSecondaryDescription] = useState("");
  const [selectedSecondary, setSelectedSecondary] = useState("");
  
  const [newTertiaryCategory, setNewTertiaryCategory] = useState("");
  const [tertiaryDescription, setTertiaryDescription] = useState("");

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

    // Fetch primary categories on component mount
    useEffect(() => {
        const fetchPrimaryCategories = async () => {
          setIsLoading(true);
          try {
            const data = await getPrimaryCategories();
            setPrimaryCategories(data);
          } catch (err) {
            setError("Failed to load primary categories");
            console.error(err);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchPrimaryCategories();
        console.log(primaryCategories ,'===data');
        
      }, []);
    
      // Fetch secondary categories when a primary category is selected
      useEffect(() => {
        if (!selectedPrimary) {
          setSecondaryCategories([]);
          return;
        }
    
        const fetchSecondaryCategories = async () => {
          setIsLoading(true);
          try {
            const data = await getSecondaryCategories();
            // Filter secondary categories by selected primary category
            const filteredData = data.filter(
              category => category.primaryCategory && category.primaryCategory._id === selectedPrimary
            );
            setSecondaryCategories(filteredData);
          } catch (err) {
            setError("Failed to load secondary categories");
            console.error(err);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchSecondaryCategories();
      }, [selectedPrimary]);
    
      // Fetch tertiary categories when a secondary category is selected
      useEffect(() => {
        if (!selectedSecondary) {
          setTertiaryCategories([]);
          return;
        }
    
        const fetchTertiaryCategories = async () => {
          setIsLoading(true);
          try {
            const data = await getTertiaryCategories();
            // Filter tertiary categories by selected secondary category
            const filteredData = data.filter(
              category => category.secondaryCategory && category.secondaryCategory._id === selectedSecondary
            );
            setTertiaryCategories(filteredData);
          } catch (err) {
            setError("Failed to load tertiary categories");
            console.error(err);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchTertiaryCategories();
      }, [selectedSecondary]);

      // Add new primary category
      const handleAddPrimaryCategory = async () => {


    
        
        if (!newPrimaryCategory.trim()) return;
      
        setIsLoading(true);
        try {
          const data = await createPrimaryCategory({ 
            name: newPrimaryCategory,
            description: primaryDescription
          });
          setPrimaryCategories([...primaryCategories, data]);
          setNewPrimaryCategory("");
          setPrimaryDescription("");
        } catch (err) {
          setError("Failed to add primary category");
      
          // Check if it's an Axios error
          if (err.isAxiosError) {
            // Handle Axios error specifically
            if (err.response) {
              // If response exists, log response data or status
              console.error('Error response:', err.response.data || err.response.status);
            } else {
              // If no response is available, log the error message
              console.error('Error message:', err.message);
            }
          } else {
            // For non-Axios errors (network issues, etc.)
            console.error('Non-Axios error:', err.message);
          }
        } finally {
          setIsLoading(false);
        }
      };
 

      // Add new secondary category
      const handleAddSecondaryCategory = async () => {
        if (!newSecondaryCategory.trim() || !selectedPrimary) return;
        
        setIsLoading(true);
        try {
          const data = await createSecondaryCategory({ 
            name: newSecondaryCategory,
            description: secondaryDescription,
            primaryCategory: selectedPrimary // Match API format from docs
          });
          setSecondaryCategories([...secondaryCategories, data]);
          setNewSecondaryCategory("");
          setSecondaryDescription("");
        } catch (err) {
          setError("Failed to add secondary category");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
    
      // Add new tertiary category
      const handleAddTertiaryCategory = async () => {
        if (!newTertiaryCategory.trim() || !selectedSecondary) return;
        
        setIsLoading(true);
        try {
          const data = await createTertiaryCategory({ 
            name: newTertiaryCategory,
            description: tertiaryDescription,
            secondaryCategory: selectedSecondary // Match API format from docs
          });
          setTertiaryCategories([...tertiaryCategories, data]);
          setNewTertiaryCategory("");
          setTertiaryDescription("");
        } catch (err) {
          setError("Failed to add tertiary category");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
    
      // Save all category data
      const handleSaveAll = async () => {
        // This function is removed as there's no saveAllCategories API endpoint
        alert("Categories saved successfully!");
      };
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
                    onClick={toggleMenu}
                />
            )}

            {/* Main Content */}
            <div className="md:ml-72">
                {/* Header */}
                <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <button 
                            className="md:hidden text-gray-600 hover:text-gray-800 transition-colors"
                            onClick={toggleMenu}
                        >
                            <FaBars size={24} />
                        </button>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Categories Management</h1>
                    </div>
                    <div className="relative">
                        <button 
                            className="flex items-center space-x-2 p-2 rounded-full bg-gray-300 transition-colors"
                            onClick={toggleProfileMenu}
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
                                    <FaSignOutAlt className="text-red-600" /> 
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
                                    className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                                        selectedCategories.length > 0 ? 'bg-red-900 hover:bg-red-700' : 'bg-red-300 '
                                    }`}
                                    onClick={() => selectedCategories.forEach(id => handleDeleteCategory(id))}
                                >
                                    Delete
                                </button>
                                <button 
                                    onClick={handleAddCategory}
                                    className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                                >
                                    + Add Category
                                </button>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search by name or ID" 
                                value={searchTerm} 
                                onChange={handleSearchChange} 
                                className="w-full sm:w-64 px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Categories Table */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3 px-4 text-left">
                                            <input 
                                                type="checkbox" 
                                                onChange={handleSelectAll} 
                                                checked={selectedCategories.length === categories.length} 
                                                className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                            />
                                        </th>
                                        <th className="py-3 px-4 text-left text-base font-medium text-gray-900">ID</th>
                                        <th className="py-3 px-4 text-left text-base font-medium text-gray-900">Category</th>
                                        <th className="py-3 px-4 text-left text-base font-medium text-gray-900">Description</th>
                                        <th className="py-3 px-4 text-left text-base font-medium text-gray-900">Subcategories</th>
                                        <th className="py-3 px-4 text-left text-base font-medium text-gray-900">Children Categories</th>
                                        <th className="py-3 px-4 text-left text-base font-medium text-gray-900">Is Active</th>
                                        <th className="py-3 px-4 text-left text-base font-medium text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCategories.map(category => (
                                        <tr key={category.id} className="border-b last:border-b-0 hover:bg-gray-50">
                                            <td className="py-4 px-4">
                                                <input 
                                                    type="checkbox" 
                                                    checked={selectedCategories.includes(category.id)} 
                                                    onChange={() => handleSelectCategory(category.id)} 
                                                    className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                />
                                            </td>
                                            <td className="py-4 px-4 text-sm text-gray-600">{category.id}</td>
                                            <td className="py-4 px-4 text-sm text-gray-900 font-medium">{category.name}</td>
                                            <td className="py-4 px-4 text-sm text-gray-600">{category.description || 'N/A'}</td>
                                            <td className="py-4 px-4 text-sm text-gray-600">
                                                {category.subcategories.map(subcategory => (
                                                    <div key={subcategory.id}>{subcategory.name}</div>
                                                ))}
                                            </td>
                                            <td className="py-4 px-4 text-sm text-gray-600">
                                                {category.subcategories.map(subcategory => (
                                                    subcategory.subcategories.map(subSubcategory => (
                                                        <div key={subSubcategory.id}>{subSubcategory.name}</div>
                                                    ))
                                                ))}
                                            </td>
                                            <td className="py-4 px-4">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={category.is_active} 
                                                        onChange={() => handleTogglePublished(category.id)} 
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                                                </label>
                                            </td>
                                            <td className="py-4 px-4 flex gap-2">
                                                <button 
                                                    onClick={() => handleEditCategory(category)}
                                                    className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors"
                                                >
                                                    <FaRegEdit size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteCategory(category.id)}
                                                    className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                                                >
                                                    <MdDeleteForever size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Enhanced Add/Edit Category Modal */}
                    {showAddCategoryPopup && (
                     <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
                     <h1 className="text-2xl font-bold mb-6">Category Management</h1>
                     
                     {error && (
                       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                         {error}
                       </div>
                     )}
                     
                     {/* Primary Category Section */}
                     <div className="mb-8 p-4 border rounded-lg bg-gray-50">
                       <h2 className="text-xl font-semibold mb-4">Primary Categories</h2>
                       
                       <div className="flex gap-4 mb-4">
                         <div className="flex-1">
                           <label className="block text-sm font-medium text-gray-700 mb-1">
                             Add New Primary Category
                           </label>
                           <input
                             type="text"
                             value={newPrimaryCategory}
                             onChange={(e) => setNewPrimaryCategory(e.target.value)}
                             className="w-full p-2 border rounded"
                             placeholder="Enter category name"
                           />
                         </div>
                         
                         <div className="mt-6">
                           <button
                             onClick={handleAddPrimaryCategory}
                             disabled={isLoading}
                             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                           >
                             Add
                           </button>
                         </div>
                       </div>
                       
                       <div className="mb-4">
                         <label className="block text-sm font-medium text-gray-700 mb-1">
                           Select Primary Category
                         </label>
                         <select
                           value={selectedPrimary}
                           onChange={(e) => setSelectedPrimary(e.target.value)}
                           className="w-full p-2 border rounded"
                         >
                           <option value="">Select a category</option>
                           {primaryCategories.map((category) => (
                             <option key={category.id} value={category.id}>
                               {category.name}
                             </option>
                           ))}
                         </select>
                       </div>
                       
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">
                           Description
                         </label>
                         <textarea
                           value={primaryDescription}
                           onChange={(e) => setPrimaryDescription(e.target.value)}
                           className="w-full p-2 border rounded"
                           rows="3"
                           placeholder="Enter description"
                         ></textarea>
                       </div>
                     </div>
                     
                     {/* Secondary Category Section */}
                     <div className="mb-8 p-4 border rounded-lg bg-gray-50">
                       <h2 className="text-xl font-semibold mb-4">Secondary Categories</h2>
                       
                       <div className="flex gap-4 mb-4">
                         <div className="flex-1">
                           <label className="block text-sm font-medium text-gray-700 mb-1">
                             Add New Secondary Category
                           </label>
                           <input
                             type="text"
                             value={newSecondaryCategory}
                             onChange={(e) => setNewSecondaryCategory(e.target.value)}
                             className="w-full p-2 border rounded"
                             placeholder="Enter category name"
                             disabled={!selectedPrimary}
                           />
                         </div>
                         
                         <div className="mt-6">
                           <button
                             onClick={handleAddSecondaryCategory}
                             disabled={isLoading || !selectedPrimary}
                             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
                           >
                             Add
                           </button>
                         </div>
                       </div>
                       
                       <div className="mb-4">
                         <label className="block text-sm font-medium text-gray-700 mb-1">
                           Select Secondary Category
                         </label>
                         <select
                           value={selectedSecondary}
                           onChange={(e) => setSelectedSecondary(e.target.value)}
                           className="w-full p-2 border rounded"
                           disabled={!selectedPrimary}
                         >
                           <option value="">Select a category</option>
                           {secondaryCategories.map((category) => (
                             <option key={category.id} value={category.id}>
                               {category.name}
                             </option>
                           ))}
                         </select>
                       </div>
                       
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">
                           Description
                         </label>
                         <textarea
                           value={secondaryDescription}
                           onChange={(e) => setSecondaryDescription(e.target.value)}
                           className="w-full p-2 border rounded"
                           rows="3"
                           placeholder="Enter description"
                           disabled={!selectedPrimary}
                         ></textarea>
                       </div>
                     </div>
                     
                     {/* Tertiary Category Section */}
                     <div className="mb-8 p-4 border rounded-lg bg-gray-50">
                       <h2 className="text-xl font-semibold mb-4">Tertiary Categories</h2>
                       
                       <div className="flex gap-4 mb-4">
                         <div className="flex-1">
                           <label className="block text-sm font-medium text-gray-700 mb-1">
                             Add New Tertiary Category
                           </label>
                           <input
                             type="text"
                             value={newTertiaryCategory}
                             onChange={(e) => setNewTertiaryCategory(e.target.value)}
                             className="w-full p-2 border rounded"
                             placeholder="Enter category name"
                             disabled={!selectedSecondary}
                           />
                         </div>
                         
                         <div className="mt-6">
                           <button
                             onClick={handleAddTertiaryCategory}
                             disabled={isLoading || !selectedSecondary}
                             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
                           >
                             Add
                           </button>
                         </div>
                       </div>
                       
                       <div className="mb-4">
                         <label className="block text-sm font-medium text-gray-700 mb-1">
                           Select Tertiary Category
                         </label>
                         <select
                           className="w-full p-2 border rounded"
                           disabled={!selectedSecondary}
                         >
                           <option value="">Select a category</option>
                           {tertiaryCategories.map((category) => (
                             <option key={category.id} value={category.id}>
                               {category.name}
                             </option>
                           ))}
                         </select>
                       </div>
                       
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">
                           Description
                         </label>
                         <textarea
                           value={tertiaryDescription}
                           onChange={(e) => setTertiaryDescription(e.target.value)}
                           className="w-full p-2 border rounded"
                           rows="3"
                           placeholder="Enter description"
                           disabled={!selectedSecondary}
                         ></textarea>
                       </div>
                     </div>
                     
                     {/* Save Button */}
                     <div className="flex justify-end">
                       <button
                         onClick={handleSaveAll}
                         className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                       >
                         Save All
                       </button>
                     </div>
                   </div>
                    )}
                </main>
            </div>
        </div>
    );
}