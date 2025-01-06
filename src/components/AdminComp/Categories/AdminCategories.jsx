import { useState, useEffect } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt, FaBars, FaTimes, FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader';
import bgim from "../../../assets/banner/dashboarbg.jpg";
import { CategoriesList, CreateCategory } from '../../../actions/adminactions/categories/categoriesactions';

export default function AdminCategories() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
    const [categoryInfo, setCategoryInfo] = useState({ id: null, name: '', description: '', parent: null, is_active: true, subcategories: [] });
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await CategoriesList();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const handleAddCategory = () => {
        setCategoryInfo({ id: null, name: '', description: '', parent: null, is_active: true, subcategories: [] });
        setShowAddCategoryPopup(true);
    };

    const handleCategoryInfoChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCategoryInfo({ ...categoryInfo, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubcategoryChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        const updatedSubcategories = [...categoryInfo.subcategories];
        updatedSubcategories[index] = { ...updatedSubcategories[index], [name]: type === 'checkbox' ? checked : value };
        setCategoryInfo({ ...categoryInfo, subcategories: updatedSubcategories });
    };

    const handleAddSubcategory = () => {
        setCategoryInfo({ ...categoryInfo, subcategories: [...categoryInfo.subcategories, { id: null, name: '', description: '', parent: categoryInfo.id, is_active: false, subcategories: [] }] });
    };

    const handleSaveCategory = async () => {
        try {
            if (categoryInfo.id) {
                // Update existing category logic here
            } else {
                const response = await CreateCategory(categoryInfo);
                if (response) {
                    const data = await CategoriesList();
                    setCategories(data);
                } else {
                    console.error("Failed to create category: No response from API");
                }
            }
            setShowAddCategoryPopup(false);
            setCategoryInfo({ id: null, name: '', description: '', parent: null, is_active: true, subcategories: [] });
        } catch (error) {
            console.error("Failed to save category:", error);
        }
    };

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

    const handleEditCategory = (category) => {
        setCategoryInfo(category);
        setShowAddCategoryPopup(true);
    };

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

    return (
        <div className="flex flex-col md:flex-row font-abc">
            <div className='md:w-1/3 lg:w-1/3 xl:w-1/5'>
                <AdminHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
            <div className="w-full p-5 py-10" style={{ backgroundImage: `url(${bgim})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <header className="flex items-center justify-between mb-5 md:mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Categories Management</h1>
                    <div className="relative">
                        <button className="flex items-center space-x-2 text-white hover:text-gray-300" onClick={toggleProfileMenu}>
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
                    <button className="md:hidden text-gray-800" onClick={toggleMenu}>
                        <FaBars />
                    </button>
                </header>
                <header className="flex flex-col md:flex-row items-center justify-between mb-5">
                    <div className="space-x-2">
                        <button className={`px-4 py-2 rounded ${selectedCategories.length > 0 ? 'bg-red-700 text-white' : 'bg-red-300 text-white'}`}>Delete</button>
                        <button className="bg-green-700 text-white px-4 py-2 rounded" onClick={handleAddCategory}>+ Add Category</button>
                    </div>
                    <div>
                        <input type="text" placeholder="Search by name or ID" value={searchTerm} onChange={handleSearchChange} className="border-b outline-none p-2 rounded" />
                    </div>
                    {showAddCategoryPopup && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-20 overflow-auto">
                            <div className="bg-white w-full h-full md:w-1/2 lg:w-1/3 p-5 overflow-auto">
                                <div className="flex justify-between items-center mb-5">
                                    <h2 className="text-2xl font-bold">{categoryInfo.id ? 'Edit Category' : 'Add Category'}</h2>
                                    <button className="text-gray-700" onClick={() => setShowAddCategoryPopup(false)}>
                                        <FaTimes />
                                    </button>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Category Name</label>
                                    <input type="text" name="name" value={categoryInfo.name} onChange={handleCategoryInfoChange} className="border-b-2  outline-none p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Category Description</label>
                                    <textarea name="description" value={categoryInfo.description} onChange={handleCategoryInfoChange} className="border-b-2  outline-none p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Parent Category</label>
                                    <select name="parent" value={categoryInfo.parent || ''} onChange={handleCategoryInfoChange} className="border-b-2 outline-none p-2 rounded w-full">
                                        <option value="">Select Parent Category</option>
                                        {categories.filter(category => category.parent === null).map(parentCategory => (
                                            <option key={parentCategory.id} value={parentCategory.id}>{parentCategory.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Is Active</label>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" name="is_active" checked={categoryInfo.is_active} onChange={handleCategoryInfoChange} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold">Subcategories</label>
                                    {categoryInfo.subcategories.map((subcategory, index) => (
                                        <div key={index} className="mb-4">
                                            <div className="mb-2">
                                                <label className="block text-gray-700">Subcategory Name</label>
                                                <input type="text" name="name" value={subcategory.name} onChange={(e) => handleSubcategoryChange(index, e)} className="border-b-2  outline-none p-2 rounded w-full" />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-gray-700">Subcategory Description</label>
                                                <textarea name="description" value={subcategory.description} onChange={(e) => handleSubcategoryChange(index, e)} className="border-b-2  outline-none p-2 rounded w-full" />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-gray-700">Parent Category</label>
                                                <select name="parent" value={subcategory.parent || ''} onChange={(e) => handleSubcategoryChange(index, e)} className="border-b-2 outline-none p-2 rounded w-full">
                                                    <option value="">Select Parent Category</option>
                                                    {categories.filter(category => category.parent === null).map(parentCategory => (
                                                        <option key={parentCategory.id} value={parentCategory.id}>{parentCategory.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-gray-700">Is Active</label>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" name="is_active" checked={subcategory.is_active} onChange={(e) => handleSubcategoryChange(index, e)} className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleAddSubcategory}>+ Add Subcategory</button>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-red-500 hover:text-white" onClick={() => setShowAddCategoryPopup(false)}>Cancel</button>
                                    <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-500" onClick={handleSaveCategory}>Save</button>
                                </div>
                            </div>
                        </div>
                    )}
                </header>
          
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-xl">
                        <thead>
                            <tr>
                                <th className="py-2 px-4"><input type="checkbox" onChange={handleSelectAll} checked={selectedCategories.length === categories.length} /></th>
                                <th className="py-2 px-4">ID</th>
                                <th className="py-2 px-4">Category</th>
                                <th className="py-2 px-4">Description</th>
                                <th className="py-2 px-4">Subcategories</th>
                                <th className="py-2 px-4">Children categories</th>
                                <th className="py-2 px-4">Is Active</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.map(category => (
                                <tr key={category.id}>
                                    <td className="border px-4 py-2 text-center"><input type="checkbox" checked={selectedCategories.includes(category.id)} onChange={() => handleSelectCategory(category.id)} /></td>
                                    <td className="border px-4 py-2 text-center">{category.id}</td>
                                    <td className="border px-4 py-2 text-center">{category.name}</td>
                                    <td className="border px-4 py-2 text-center">{category.description}</td>
                                    <td className="border px-4 py-2 text-center">
                                        {category.subcategories.map(subcategory => (
                                            <div key={subcategory.id}>
                                                {subcategory.name}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {category.subcategories.map(subcategory => (
                                            subcategory.subcategories.map(subSubcategory => (
                                                <div key={subSubcategory.id}>
                                                    {subSubcategory.name}
                                                </div>
                                            ))
                                        ))}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={category.is_active} onChange={() => handleTogglePublished(category.id)} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-green-600 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                                        </label>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <button className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded text-xl" onClick={() => handleEditCategory(category)}><FaEdit /></button>
                                        <button className="text-red-500 hover:text-red-700 px-2 py-1 rounded text-xl" onClick={() => handleDeleteCategory(category.id)}><FaTrash /></button>
                                        <button className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded text-xl"><FaEye /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
