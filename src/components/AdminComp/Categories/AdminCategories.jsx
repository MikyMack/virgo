import { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaBars,

} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import AdminHeader from "../Header/AdminHeader";
import {
  getPrimaryCategories,
  createPrimaryCategory,
  updatePrimaryCategory,
  deletePrimaryCategory,
  getSecondaryCategories,
  createSecondaryCategory,
  updateSecondaryCategory,
  deleteSecondaryCategory,
  getTertiaryCategories,
  createTertiaryCategory,
  updateTertiaryCategory,
  deleteTertiaryCategory,
} from "../../../actions/adminactions/categories/categoriesactions";
export default function AdminCategories() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [tertiaryCategoryOptions, setTertiaryCategoryOptions] = useState({});
  const [removedTertiaryCategories, setRemovedTertiaryCategories] = useState(
    {}
  );
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
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
  });

  const [selectedTertiary, setSelectedTertiary] = useState(null);
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSecondarySection, setShowSecondarySection] = useState(false);
  const [showTertiarySection, setShowTertiarySection] = useState(false);
  const [allSecondaryCategories, setAllSecondaryCategories] = useState([]);

const [allTertiaryCategories, setAllTertiaryCategories] = useState([]);
  const handleAddCategory = () => {
    setShowAddCategoryPopup(true);
  };


  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);



  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCategories(categories.map((category) => category.id));
    } else {
      setSelectedCategories([]);
    }
  };




  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.id.toString().includes(searchTerm) ||
      category.subcategories.some(
        (subcategory) =>
          subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          subcategory.id.toString().includes(searchTerm) ||
          subcategory.subcategories.some(
            (subSubcategory) =>
              subSubcategory.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              subSubcategory.id.toString().includes(searchTerm)
          )
      )
  );

 





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
          (category) =>
            category.secondaryCategory &&
            category.secondaryCategory._id === selectedSecondary
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
  const handleSaveOrUpdatePrimaryCategory = async () => {
    if (!newPrimaryCategory.trim()) return;

    setIsLoading(true);
    try {
      if (selectedPrimary) {
        // Update existing
        const updated = await updatePrimaryCategory(selectedPrimary._id, {
          name: newPrimaryCategory,
          description: primaryDescription,
        });

        setPrimaryCategories((prev) =>
          prev.map((cat) => (cat._id === selectedPrimary._id ? updated : cat))
        );
        alert("Primary category updated!");
      } else {
        // Add new
        const data = await createPrimaryCategory({
          name: newPrimaryCategory,
          description: primaryDescription,
        });
        setPrimaryCategories([...primaryCategories, data]);
        alert("Primary category added!");
      }

      // Reset
      setNewPrimaryCategory("");
      setPrimaryDescription("");
      setSelectedPrimary(null);
    } catch (err) {
      setError("Failed to save category");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // delete Primary category
  const handleDeletePrimary = async () => {
    if (!selectedPrimary?._id) {
      alert("Please select a primary category to delete");
      return;
    }
    
    if (!window.confirm(`Are you sure you want to delete "${selectedPrimary.name}" and ALL its associated secondary and tertiary categories?`)) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Step 1: Identify all secondary categories linked to this primary
      const linkedSecondaryCategories = allSecondaryCategories.filter(
        cat => cat.primaryCategory === selectedPrimary._id
      );
      
      // Step 2: Identify all tertiary categories linked to those secondaries
      const secondaryIds = linkedSecondaryCategories.map(cat => cat._id);
      const linkedTertiaryCategories = allTertiaryCategories.filter(
        cat => secondaryIds.includes(cat.secondaryCategory)
      );
      
      // Step 3: Delete all linked tertiary categories
      for (const tertiary of linkedTertiaryCategories) {
        await deleteTertiaryCategory(tertiary._id);
      }
      
      // Step 4: Delete all linked secondary categories
      for (const secondary of linkedSecondaryCategories) {
        await deleteSecondaryCategory(secondary._id);
      }
      
      // Step 5: Delete the primary category
      await deletePrimaryCategory(selectedPrimary._id);
      
      // Step 6: Update all state variables
      setAllTertiaryCategories(prev => 
        prev.filter(cat => !linkedTertiaryCategories.some(t => t._id === cat._id))
      );
      
      setAllSecondaryCategories(prev => 
        prev.filter(cat => cat.primaryCategory !== selectedPrimary._id)
      );
      
      setPrimaryCategories(prev => 
        prev.filter(cat => cat._id !== selectedPrimary._id)
      );
      
      // Clear selections
      setSelectedPrimary(null);
      setSelectedSecondary(null);
      setSelectedTertiary(null);
      setSecondaryCategories([]);
      setTertiaryCategories([]);
      
      alert("Primary category and all its associated categories deleted successfully");
    } catch (err) {
      console.error("Error during cascade deletion:", err);
      alert(`Failed to complete the deletion process: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  // Add new secondary category
  const handleSaveSecondaryCategory = async () => {
    if (!selectedPrimary || !newSecondaryCategory) {
      alert("Please select a primary category and enter a name");
      return;
    }
  
    try {
      setIsLoading(true);
  
      const categoryData = {
        name: newSecondaryCategory,
        description: secondaryDescription,
        primaryCategory: selectedPrimary._id,
      };
  
      if (selectedSecondary) {
        // Update
        const response = await updateSecondaryCategory(selectedSecondary._id, categoryData);
  
        const updatedCategory = {
          ...response,
          primaryCategory: typeof response.primaryCategory === "object"
            ? response.primaryCategory._id
            : response.primaryCategory,
        };
  
        setAllSecondaryCategories(prev =>
          prev.map(cat => (cat._id === selectedSecondary._id ? updatedCategory : cat))
        );
  
        alert("Secondary category updated successfully!");
      } else {
        // Create
        const response = await createSecondaryCategory(categoryData);
  
        const newCategory = {
          ...response,
          primaryCategory: typeof response.primaryCategory === "object"
            ? response.primaryCategory._id
            : response.primaryCategory,
        };
  
        setAllSecondaryCategories(prev => [...prev, newCategory]);
  
        alert("Secondary category created successfully!");
      }
  
      // Reset form
      setNewSecondaryCategory("");
      setSecondaryDescription("");
      setSelectedSecondary(null);
    } catch (err) {
      console.error("Error saving secondary category:", err);
      alert("Failed to save secondary category");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  //   delete secondary category
  const handleDeleteSecondary = async () => {
    if (!selectedSecondary?._id) {
      alert("Please select a secondary category to delete");
      return;
    }
    
    if (!window.confirm(`Are you sure you want to delete "${selectedSecondary.name}" and ALL its associated tertiary categories?`)) {
      return;
    }
    
    try {
      setIsLoading(true);
      
 
      const linkedTertiaryCategories = allTertiaryCategories.filter(
        cat => cat.secondaryCategory === selectedSecondary._id
      );
      
 
      for (const tertiary of linkedTertiaryCategories) {
        await deleteTertiaryCategory(tertiary._id);
      }
      

      await deleteSecondaryCategory(selectedSecondary._id);
      
    
      setAllTertiaryCategories(prev => 
        prev.filter(cat => cat.secondaryCategory !== selectedSecondary._id)
      );
      
      setAllSecondaryCategories(prev => 
        prev.filter(cat => cat._id !== selectedSecondary._id)
      );
      
      setSecondaryCategories(prev => 
        prev.filter(cat => cat._id !== selectedSecondary._id)
      );
      

      setSelectedSecondary(null);
      setSelectedTertiary(null);
      setTertiaryCategories([]);
      
      alert("Secondary category and all its associated tertiary categories deleted successfully");
    } catch (err) {
      console.error("Error deleting secondary category:", err);
      alert(`Failed to delete secondary category: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };





  
  // Add new tertiary category
  const handleAddTertiaryCategory = async () => {
    if (!newTertiaryCategory.trim()) {
      alert("❗ Please enter a category name");
      return;
    }
  
    if (!selectedSecondary) {
      alert("❗ Please select a secondary category");
      return;
    }
  
    setIsLoading(true);
    try {
      const payload = {
        name: newTertiaryCategory.trim(),
        description: tertiaryDescription,
        secondaryCategory: selectedSecondary._id,
      };
  
      if (selectedTertiary) {
        // Update
        const updated = await updateTertiaryCategory(selectedTertiary._id, payload);
        
        setAllTertiaryCategories(prev => 
          prev.map(cat => 
            cat._id === updated._id 
              ? {
                  ...updated,
                  secondaryCategory: updated.secondaryCategory._id || updated.secondaryCategory
                } 
              : cat
          )
        );
  
        alert("✅ Tertiary category updated successfully!");
      } else {
        // Create
        const newCategory = await createTertiaryCategory(payload);
        
        setAllTertiaryCategories(prev => [
          ...prev,
          {
            ...newCategory,
            secondaryCategory: newCategory.secondaryCategory._id || newCategory.secondaryCategory
          }
        ]);
  
        alert("✅ Tertiary category created successfully!");
      }
  
      // Reset form
      setSelectedTertiary(null);
      setNewTertiaryCategory("");
      setTertiaryDescription("");
    } catch (err) {
      alert(`❌ Error: ${err.response?.data?.message || "Operation failed"}`);
    } finally {
      setIsLoading(false);
    }
  };
  
//   delete teritory category
const handleDeleteTertiary = async () => {
    if (!selectedTertiary || !confirm("Delete this category?")) return;
    
    setIsLoading(true);
    try {
      await deleteTertiaryCategory(selectedTertiary._id);
      setAllTertiaryCategories(prev => 
        prev.filter(cat => cat._id !== selectedTertiary._id)
      );
      // Reset form
      setSelectedTertiary(null);
      setNewTertiaryCategory("");
      setTertiaryDescription("");
      alert("✅ Category deleted!");
    } catch (err) {
      alert(`❌ Error: ${err.response?.data?.message || "Deletion failed"}`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchAllCategories = async () => {
      setIsLoading(true);
      try {
        const [primary, secondary, tertiary] = await Promise.all([
          getPrimaryCategories(),
          getSecondaryCategories(),
          getTertiaryCategories()
        ]);
  
        setPrimaryCategories(Array.isArray(primary?.data) ? primary.data : primary);
        setAllSecondaryCategories(Array.isArray(secondary?.data) ? secondary.data : secondary);
  
        const validTertiary = (Array.isArray(tertiary?.data) ? tertiary.data : tertiary).filter(
          cat => cat.secondaryCategory && cat.secondaryCategory._id
        );
        setAllTertiaryCategories(validTertiary);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchAllCategories();
  }, []);
  

  const groupedCategories = primaryCategories.map(primary => {
    const subCategories = allSecondaryCategories.filter(sec => {
      const primaryId = typeof sec.primaryCategory === 'object' ? sec.primaryCategory?._id : sec.primaryCategory;
      return primaryId === primary._id;
    });
  
    const childCategories = subCategories.map(sub => {
      const children = allTertiaryCategories.filter(tc => {
        const secondaryId = typeof tc.secondaryCategory === 'object' ? tc.secondaryCategory?._id : tc.secondaryCategory;
        return secondaryId === sub._id;
      });
  
      return { ...sub, children };
    });
  
    return {
      ...primary,
      subCategories: childCategories
    };
  });
  
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-xl transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
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
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Categories Management
            </h1>
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
                <Link
                  to="/admin/settings"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaCog className="text-black" />
                  <span>Settings</span>
                </Link>
                <Link
                  to="/logout"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
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
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  + Add /Edit/delete Category
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
          <div className="bg-white rounded-xl shadow-sm flex justify-center w-full overflow-y-">
          <div className="overflow-x-auto w-full bg-white max-w-full  p-6 rounded-lg shadow-lg   relative">
  <table className="min-w-full table-auto border border-gray-300 mt-4">
    <thead className="bg-gray-100 text-sm md:text-base">
      <tr>
        <th className="border p-2 text-left"> Category</th>
        <th className="border p-2 text-left">Description</th>
        <th className="border p-2 text-left">Subcategory </th>
        <th className="border p-2 text-left">Child Category </th>
      </tr>
    </thead>
    <tbody>
      {groupedCategories.map(primary => (
        <tr key={primary._id} className="text-sm md:text-base">
          <td className="border p-2 align-top whitespace-nowrap">{primary.name}</td>
          <td className="border p-2 align-top max-w-xs truncate" title={primary.description}>
            {primary.description}
          </td>
          <td className="border p-2 align-top">
            <div className="space-y-1">
              {primary.subCategories.map(sub => (
                <div key={sub._id} className="whitespace-nowrap">{sub.name}</div>
              ))}
            </div>
          </td>
          <td className="border p-2 align-top">
            <div className="space-y-1">
              {primary.subCategories.flatMap(sub =>
                sub.children.map(child => (
                  <div key={child._id} className="whitespace-nowrap">{child.name}</div>
                ))
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
          </div>

          {/* Enhanced Add/Edit Category Modal */}
          {showAddCategoryPopup && (
       <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
       <div className="w-full max-w-4xl mx-auto my-8 bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 transform">
         <div className="p-6 space-y-6">
           <div className="flex justify-between items-center">
             <h1 className="text-3xl font-bold text-gray-800">Category Management</h1>
             <button 
               onClick={()=>setShowAddCategoryPopup(false)} 
               className="p-2 rounded-full hover:bg-gray-100 transition-colors"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
           </div>
     
           {error && (
             <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
               <div className="flex items-center">
                 <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                 </svg>
                 <p className="text-red-700 font-medium">{error}</p>
               </div>
             </div>
           )}
     
           {/* Primary Category Section */}
           <div className="p-6 border border-gray-200 rounded-lg bg-gradient-to-br from-gray-50 to-white">
             <div className="flex items-center justify-between mb-6">
               <h2 className="text-[13px] md:text-xl font-semibold text-gray-800 flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                 </svg>
                 Primary Categories
               </h2>
               <div className="flex space-x-2">
                 <button
                   onClick={() => {
                     setShowSecondarySection(!showSecondarySection);
                     if (!showSecondarySection) setShowTertiarySection(false);
                   }}
                   className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                     showSecondarySection
                       ? "bg-blue-600 text-white shadow-md"
                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                   }`}
                 >
                   <span className="mr-2">
                     {showSecondarySection ? "✓" : "→"}
                   </span>
                   Secondary
                 </button>
               </div>
             </div>
     
             <div className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     {selectedPrimary ? "Edit Category" : "New Category"}
                   </label>
                   <input
                     type="text"
                     value={newPrimaryCategory}
                     onChange={(e) => setNewPrimaryCategory(e.target.value)}
                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                     placeholder="Category name"
                   />
                 </div>
                 
                 <div className="md:col-span-2">
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     Description
                   </label>
                   <textarea
                     value={primaryDescription}
                     onChange={(e) => setPrimaryDescription(e.target.value)}
                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                     rows="2"
                     placeholder="Enter description"
                   />
                 </div>
               </div>
     
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                   Select Primary Category
                 </label>
                 <select
                   value={selectedPrimary?._id || ""}
                   onChange={(e) => {
                     const selectedId = e.target.value;
                     const selectedCat = primaryCategories.find(
                       (cat) => cat._id === selectedId
                     );
                     setSelectedPrimary(selectedCat);
                     setNewPrimaryCategory(selectedCat?.name || "");
                     setPrimaryDescription(selectedCat?.description || "");
                   }}
                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                 >
                   <option value="">Select a category</option>
                   {primaryCategories.map((category) => (
                     <option key={category._id} value={category._id}>
                       {category.name}
                     </option>
                   ))}
                 </select>
               </div>
     
               {!showSecondarySection && !showTertiarySection && (
                 <div className="flex flex-wrap justify-end gap-3 pt-4">
                   {selectedPrimary && (
                     <button
                       onClick={() => {
                         setSelectedPrimary(null);
                         setNewPrimaryCategory("");
                         setPrimaryDescription("");
                       }}
                       className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                     >
                       Cancel
                     </button>
                   )}
                   
                   <button
                     onClick={handleSaveOrUpdatePrimaryCategory}
                     disabled={isLoading}
                     className={`px-6 py-2.5 rounded-lg font-medium text-white transition ${
                       isLoading 
                         ? 'bg-blue-400 cursor-not-allowed' 
                         : 'bg-blue-600 hover:bg-blue-700 shadow-md'
                     }`}
                   >
                     {isLoading ? (
                       <span className="flex items-center justify-center">
                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                         Processing...
                       </span>
                     ) : selectedPrimary ? (
                       "Update Category"
                     ) : (
                       "Save Category"
                     )}
                   </button>
     
                   <button
                     onClick={handleDeletePrimary}
                     disabled={!selectedPrimary || isLoading}
                     className={`px-6 py-2.5 rounded-lg font-medium text-white transition ${
                       !selectedPrimary || isLoading
                         ? 'bg-red-300 cursor-not-allowed'
                         : 'bg-red-600 hover:bg-red-700 shadow-md'
                     }`}
                   >
                     Delete
                   </button>
                 </div>
               )}
             </div>
           </div>
     
           {/* Secondary Category Section */}
           {showSecondarySection && (
             <div className="p-6 border border-gray-200 rounded-lg bg-gradient-to-br from-blue-50 to-white">
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                   </svg>
                   Secondary Categories
                 </h2>
                 <div className="flex space-x-2">
                   <button
                     onClick={() => setShowTertiarySection(!showTertiarySection)}
                     className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                       showTertiarySection
                         ? "bg-blue-600 text-white shadow-md"
                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                     }`}
                   >
                     <span className="mr-2">
                       {showTertiarySection ? "✓" : "→"}
                     </span>
                     Tertiary
                   </button>
                 </div>
               </div>
     
               {selectedPrimary ? (
                 <div className="mb-4 p-3 bg-blue-100 rounded-lg border border-blue-200 flex items-start">
                   <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                   <p className="text-sm text-blue-800">
                     Adding to: <span className="font-semibold">{selectedPrimary.name}</span>
                   </p>
                 </div>
               ) : (
                 <div className="mb-4 p-3 bg-yellow-100 rounded-lg border border-yellow-200 flex items-start">
                   <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                   </svg>
                   <p className="text-sm text-yellow-800">
                     Please select a primary category first
                   </p>
                 </div>
               )}
     
               <div className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="md:col-span-2">
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       {selectedSecondary ? "Edit Category" : "New Category"}
                     </label>
                     <input
                       type="text"
                       value={newSecondaryCategory}
                       onChange={(e) => setNewSecondaryCategory(e.target.value)}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                       placeholder="Category name"
                       disabled={!selectedPrimary}
                     />
                   </div>
                   
                   <div className="md:col-span-2">
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Description
                     </label>
                     <textarea
                       value={secondaryDescription}
                       onChange={(e) => setSecondaryDescription(e.target.value)}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                       rows="2"
                       placeholder="Enter description"
                       disabled={!selectedPrimary}
                     />
                   </div>
                 </div>
     
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     Select Secondary Category
                   </label>
                   <select
                     value={selectedSecondary?._id || ""}
                     onChange={(e) => {
                       const selectedId = e.target.value;
                       const selectedCat = allSecondaryCategories.find(
                         (cat) => cat._id === selectedId
                       );
                       setSelectedSecondary(selectedCat);
                       setNewSecondaryCategory(selectedCat?.name || "");
                       setSecondaryDescription(selectedCat?.description || "");
                     }}
                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                     disabled={!selectedPrimary}
                   >
                     <option value="">Select a category</option>
                     {allSecondaryCategories.map((category) => (
                       <option key={category._id} value={category._id}>
                         {category.name}
                       </option>
                     ))}
                   </select>
                 </div>
     
                 {!showTertiarySection && (
                   <div className="flex flex-wrap justify-end gap-3 pt-4">
                     {selectedSecondary && (
                       <button
                         onClick={() => {
                           setSelectedSecondary(null);
                           setNewSecondaryCategory("");
                           setSecondaryDescription("");
                         }}
                         className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                       >
                         Cancel
                       </button>
                     )}
                     
                     <button
                       onClick={handleSaveSecondaryCategory}
                       disabled={isLoading || !selectedPrimary || !newSecondaryCategory}
                       className={`px-6 py-2.5 rounded-lg font-medium text-white transition ${
                         isLoading || !selectedPrimary || !newSecondaryCategory
                           ? 'bg-blue-400 cursor-not-allowed' 
                           : 'bg-blue-600 hover:bg-blue-700 shadow-md'
                       }`}
                     >
                       {isLoading ? (
                         <span className="flex items-center justify-center">
                           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           Processing...
                         </span>
                       ) : selectedSecondary ? (
                         "Update Category"
                       ) : (
                         "Save Category"
                       )}
                     </button>
     
                     <button
                       onClick={handleDeleteSecondary}
                       disabled={!selectedSecondary || isLoading}
                       className={`px-6 py-2.5 rounded-lg font-medium text-white transition ${
                         !selectedSecondary || isLoading
                           ? 'bg-red-300 cursor-not-allowed'
                           : 'bg-red-600 hover:bg-red-700 shadow-md'
                       }`}
                     >
                       Delete
                     </button>
                   </div>
                 )}
               </div>
             </div>
           )}
     
           {/* Tertiary Category Section */}
           {showTertiarySection && (
             <div className="p-6 border border-gray-200 rounded-lg bg-gradient-to-br from-purple-50 to-white">
               <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                 </svg>
                 Tertiary Categories
               </h2>
     
               {selectedSecondary ? (
                 <div className="mb-4 p-3 bg-purple-100 rounded-lg border border-purple-200 flex items-start">
                   <svg className="h-5 w-5 text-purple-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                   <p className="text-sm text-purple-800">
                     Adding to: <span className="font-semibold">{selectedSecondary.name}</span>
                   </p>
                 </div>
               ) : (
                 <div className="mb-4 p-3 bg-yellow-100 rounded-lg border border-yellow-200 flex items-start">
                   <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                   </svg>
                   <p className="text-sm text-yellow-800">
                     Please select a secondary category first
                   </p>
                 </div>
               )}
     
               <div className="space-y-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     Select Tertiary Category
                   </label>
                   <select
                     value={selectedTertiary?._id || ""}
                     onChange={(e) => {
                       const selectedId = e.target.value;
                       const selectedCat = allTertiaryCategories.find(cat => cat._id === selectedId);
                       setSelectedTertiary(selectedCat || null);
                       if (selectedCat) {
                         setNewTertiaryCategory(selectedCat.name);
                         setTertiaryDescription(selectedCat.description || "");
                       }
                     }}
                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                     disabled={!selectedSecondary}
                   >
                     <option value="">Select a category</option>
                     {allTertiaryCategories
                       .filter(category => !selectedSecondary || category.secondaryCategory === selectedSecondary._id)
                       .map((category) => {
                         const secondaryCat = allSecondaryCategories.find(
                           sec => sec._id === category.secondaryCategory
                         );
                         const secondaryName = secondaryCat ? ` (${secondaryCat.name})` : '';
                         
                         return (
                           <option key={category._id} value={category._id}>
                             {category.name}{secondaryName}
                           </option>
                         );
                       })
                     }
                   </select>
                 </div>
     
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="md:col-span-2">
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       {selectedTertiary ? "Edit Category" : "New Category"}
                     </label>
                     <input
                       type="text"
                       value={newTertiaryCategory}
                       onChange={(e) => setNewTertiaryCategory(e.target.value)}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                       placeholder="Category name"
                       disabled={!selectedSecondary}
                     />
                   </div>
                   
                   <div className="md:col-span-2">
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Description
                     </label>
                     <textarea
                       value={tertiaryDescription}
                       onChange={(e) => setTertiaryDescription(e.target.value)}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                       rows="2"
                       placeholder="Enter description"
                       disabled={!selectedSecondary}
                     />
                   </div>
                 </div>
     
                 <div className="flex flex-wrap justify-end gap-3 pt-4">
                   {selectedTertiary && (
                     <>
                       <button
                         onClick={() => {
                           setSelectedTertiary(null);
                           setNewTertiaryCategory("");
                           setTertiaryDescription("");
                         }}
                         className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                       >
                         Cancel
                       </button>
                       <button
                         onClick={handleDeleteTertiary}
                         disabled={isLoading}
                         className={`px-6 py-2.5 rounded-lg font-medium text-white transition ${
                           isLoading
                             ? 'bg-red-300 cursor-not-allowed'
                             : 'bg-red-600 hover:bg-red-700 shadow-md'
                         }`}
                       >
                         Delete
                       </button>
                     </>
                   )}
                   
                   <button
                     onClick={handleAddTertiaryCategory}
                     disabled={isLoading || !selectedSecondary || !newTertiaryCategory.trim()}
                     className={`px-6 py-2.5 rounded-lg font-medium text-white transition ${
                       isLoading || !selectedSecondary || !newTertiaryCategory.trim()
                         ? 'bg-purple-400 cursor-not-allowed' 
                         : 'bg-purple-600 hover:bg-purple-700 shadow-md'
                     }`}
                   >
                     {isLoading ? (
                       <span className="flex items-center justify-center">
                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                         Processing...
                       </span>
                     ) : selectedTertiary ? (
                       "Update Category"
                     ) : (
                       "Save Category"
                     )}
                   </button>
                 </div>
               </div>
             </div>
           )}
         </div>
       </div>
     </div>
           
          )}
        </main>
      </div>
    </div>
  );
}
