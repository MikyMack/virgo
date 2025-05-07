import { useState, useEffect } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt, FaBars, FaTimes, FaRegEdit, FaPlus, FaMinus } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader';

export default function AdminCategories() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
    const [categoryInfo, setCategoryInfo] = useState({ id: null, name: '', description: '', parent: null, is_active: true, type: 'main', subcategories: [] });
    const [secondaryCategoryInfo, setSecondaryCategoryInfo] = useState({ id: null, name: '', description: '', is_active: true, type: 'private', subcategories: [] });
    const [tertiaryCategoryInfo, setTertiaryCategoryInfo] = useState({ id: null, name: '', description: '', is_active: true, type: 'subcategory', subcategories: [] });
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [showSecondaryInput, setShowSecondaryInput] = useState(false);
    const [newSecondaryName, setNewSecondaryName] = useState('');
    const [showTertiaryInput, setShowTertiaryInput] = useState(false);
    const [newTertiaryName, setNewTertiaryName] = useState('');
    const [isRemovingPrimary, setIsRemovingPrimary] = useState(false);
    const [isRemovingSecondary, setIsRemovingSecondary] = useState(false);
    const [isRemovingTertiary, setIsRemovingTertiary] = useState(false);
    const [mainCategoryOptions, setMainCategoryOptions] = useState([
        { value: '', label: 'Select the category', disabled: true },
        { value: 'Candles', label: 'Candles' },
        { value: 'Candle Holders', label: 'Candle Holders' },
        { value: 'Sachets', label: 'Sachets' },
        { value: 'Charms & Melts', label: 'Charms & Melts' },
        { value: 'Diyas', label: 'Diyas' },
        { value: 'Table Tops', label: 'Table Tops' }
    ]);
    const [secondaryCategoryOptionsMap, setSecondaryCategoryOptionsMap] = useState({
        'Candles': [
            'Jar',
            'Floating',
            'Decorative',
            'Pillar',
            'Tea Lights',
            'Stick Candles',
            'Religious & Festive',
            'Gifting'
        ],
        'Candle Holders': [
            'Pillar',
            'Tea Light',
            'Stick'
        ],
        'Sachets': [
            'Round',
            'Rectangle',
            'Rings',
            'Hearts'
        ],
        'Charms & Melts': [
            'Charms & Melts'
        ],
        'Diyas': [
            'Terracotta',
            'Metal',
            'Ceramic'
        ],
        'Table Tops': [
            'Glass-Mosaic'
        ]
    });
    const [tertiaryCategoryOptions, setTertiaryCategoryOptions] = useState({});
    const [removedTertiaryCategories, setRemovedTertiaryCategories] = useState({});

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

    const handleAddCategory = () => {
        setCategoryInfo({ id: null, name: '', description: '', parent: null, is_active: true, type: 'main', subcategories: [] });
        setSecondaryCategoryInfo({ id: null, name: '', description: '', is_active: true, type: 'private', subcategories: [] });
        setTertiaryCategoryInfo({ id: null, name: '', description: '', is_active: true, type: 'subcategory', subcategories: [] });
        setShowAddCategoryPopup(true);
        setShowNewCategoryInput(false);
        setNewCategoryName('');
        setShowSecondaryInput(false);
        setNewSecondaryName('');
        setShowTertiaryInput(false);
        setNewTertiaryName('');
        setIsRemovingPrimary(false);
        setIsRemovingSecondary(false);
        setIsRemovingTertiary(false);
        setRemovedTertiaryCategories({});
    };

    const handleAddNewCategory = () => {
        if (newCategoryName.trim()) {
            const newOption = { value: newCategoryName, label: newCategoryName };
            setMainCategoryOptions([...mainCategoryOptions.filter(opt => !opt.disabled), newOption]);
            setCategoryInfo({ ...categoryInfo, name: newCategoryName });
            setNewCategoryName('');
            setShowNewCategoryInput(false);
        }
    };

    const handleRemoveCategory = (selectedName) => {
        if (selectedName) {
            setMainCategoryOptions(mainCategoryOptions.filter(option => option.value !== selectedName));
            if (categoryInfo.name === selectedName) {
                setCategoryInfo({ ...categoryInfo, name: '' });
            }
            setNewCategoryName('');
            setShowNewCategoryInput(false);
            setIsRemovingPrimary(false);
        }
    };

    const handleAddNewSecondary = () => {
        if (newSecondaryName.trim() && categoryInfo.name) {
            setSecondaryCategoryOptionsMap(prev => ({
                ...prev,
                [categoryInfo.name]: [...(prev[categoryInfo.name] || []), newSecondaryName]
            }));
            setSecondaryCategoryInfo({ ...secondaryCategoryInfo, name: newSecondaryName });
            setNewSecondaryName('');
            setShowSecondaryInput(false);
        }
    };

    const handleRemoveSecondary = (selectedName) => {
        if (selectedName && categoryInfo.name) {
            setSecondaryCategoryOptionsMap(prev => ({
                ...prev,
                [categoryInfo.name]: (prev[categoryInfo.name] || []).filter(name => name !== selectedName)
            }));
            if (secondaryCategoryInfo.name === selectedName) {
                setSecondaryCategoryInfo({ ...secondaryCategoryInfo, name: '' });
            }
            setNewSecondaryName('');
            setShowSecondaryInput(false);
            setIsRemovingSecondary(false);
        }
    };

    const handleAddNewTertiary = () => {
        if (newTertiaryName.trim() && categoryInfo.name && secondaryCategoryInfo.name) {
            const key = `${categoryInfo.name}|${secondaryCategoryInfo.name}`;
            setTertiaryCategoryOptions(prev => ({
                ...prev,
                [key]: [...(prev[key] || []), { value: newTertiaryName, label: newTertiaryName }]
            }));
            setTertiaryCategoryInfo({ ...tertiaryCategoryInfo, name: newTertiaryName });
            setNewTertiaryName('');
            setShowTertiaryInput(false);
        }
    };

    const handleRemoveTertiary = (selectedName) => {
        if (selectedName && categoryInfo.name && secondaryCategoryInfo.name) {
            const key = `${categoryInfo.name}|${secondaryCategoryInfo.name}`;
            setRemovedTertiaryCategories(prev => ({
                ...prev,
                [key]: [...(prev[key] || []), selectedName]
            }));
            setTertiaryCategoryOptions(prev => ({
                ...prev,
                [key]: (prev[key] || []).filter(option => option.value !== selectedName)
            }));
            if (tertiaryCategoryInfo.name === selectedName) {
                setTertiaryCategoryInfo({ ...tertiaryCategoryInfo, name: '' });
            }
            setNewTertiaryName('');
            setShowTertiaryInput(false);
            setIsRemovingTertiary(false);
        }
    };

    const handleCategoryInfoChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCategoryInfo({ ...categoryInfo, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSecondaryCategoryInfoChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSecondaryCategoryInfo({ ...secondaryCategoryInfo, [name]: type === 'checkbox' ? checked : value });
    };

    const handleTertiaryCategoryInfoChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTertiaryCategoryInfo({ ...tertiaryCategoryInfo, [name]: type === 'checkbox' ? checked : value });
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
            const createdCategories = [];
            
            if (categoryInfo.name.trim()) {
                const response = await CreateCategory({
                    ...categoryInfo,
                    parent: categoryInfo.type === 'subcategory' ? categoryInfo.parent : null,
                    subcategories: categoryInfo.type === 'subcategory' ? [] : categoryInfo.subcategories,
                });
                if (response) {
                    createdCategories.push(response);
                } else {
                    console.error("Failed to create first category: No response from API");
                }
            }

            if (secondaryCategoryInfo.name.trim()) {
                const response = await CreateCategory({
                    ...secondaryCategoryInfo,
                    subcategories: secondaryCategoryInfo.subcategories,
                });
                if (response) {
                    createdCategories.push(response);
                } else {
                    console.error("Failed to create second category: No response from API");
                }
            }

            if (tertiaryCategoryInfo.name.trim()) {
                const response = await CreateCategory({
                    ...tertiaryCategoryInfo,
                    parent: tertiaryCategoryInfo.type === 'subcategory' ? tertiaryCategoryInfo.parent : null,
                    subcategories: tertiaryCategoryInfo.subcategories,
                });
                if (response) {
                    createdCategories.push(response);
                } else {
                    console.error("Failed to create tertiary category: No response from API");
                }
            }

            if (createdCategories.length > 0) {
                const data = await CategoriesList();
                setCategories(data);
            }

            setShowAddCategoryPopup(false);
            setCategoryInfo({ id: null, name: '', description: '', parent: null, is_active: true, type: 'main', subcategories: [] });
            setSecondaryCategoryInfo({ id: null, name: '', description: '', is_active: true, type: 'private', subcategories: [] });
            setTertiaryCategoryInfo({ id: null, name: '', description: '', is_active: true, type: 'subcategory', subcategories: [] });
            setShowNewCategoryInput(false);
            setNewCategoryName('');
            setShowSecondaryInput(false);
            setNewSecondaryName('');
            setShowTertiaryInput(false);
            setNewTertiaryName('');
            setIsRemovingPrimary(false);
            setIsRemovingSecondary(false);
            setIsRemovingTertiary(false);
            setRemovedTertiaryCategories({});
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
        setCategoryInfo({ ...category, type: category.parent ? 'subcategory' : (category.is_private ? 'private' : 'main') });
        setSecondaryCategoryInfo({ id: null, name: '', description: '', is_active: true, type: 'private', subcategories: [] });
        setTertiaryCategoryInfo({ id: null, name: '', description: '', is_active: true, type: 'subcategory', subcategories: [] });
        setShowAddCategoryPopup(true);
        setIsRemovingPrimary(false);
        setIsRemovingSecondary(false);
        setIsRemovingTertiary(false);
        setRemovedTertiaryCategories({});
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
                        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
                            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto p-8 shadow-2xl border border-gray-100">
                                <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-indigo-500 to-indigo-700 p-4 rounded-t-xl">
                                    <h2 className="text-2xl font-bold text-white">
                                        {categoryInfo.id ? 'Edit Category' : 'Add New Categories'}
                                    </h2>
                                    <button 
                                        onClick={() => setShowAddCategoryPopup(false)}
                                        className="text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-indigo-800"
                                    >
                                        <FaTimes size={24} />
                                    </button>
                                </div>
                                <form className="space-y-8">
                                    {/* First Form (Primary Category) */}
                                    <div className="border-b pb-6">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                            <span className="bg-indigo-100 text-indigo-800 w-8 h-8 flex items-center justify-center rounded-full font-bold">1</span>
                                            Primary Category
                                        </h3>
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Category Type</label>
                                                <select 
                                                    name="type" 
                                                    value={categoryInfo.type} 
                                                    onChange={handleCategoryInfoChange} 
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white hover:border-gray-300"
                                                >
                                                    <option value="main">Main Category</option>
                                                </select>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <label className="block text-sm font-medium text-gray-700">Category Name</label>
                                                    <div className="flex gap-2">
                                                        <button 
                                                            type="button"
                                                            onClick={() => {
                                                                setShowNewCategoryInput(!showNewCategoryInput);
                                                                setIsRemovingPrimary(false);
                                                                setNewCategoryName('');
                                                            }}
                                                            className="flex items-center gap-1 text-xs px-3 py-1.5 bg-indigo-800 text-white rounded-md hover:bg-emerald-700 transition-colors shadow-sm"
                                                        >
                                                            <FaPlus size={10} /> Add New
                                                        </button>
                                                        <button 
                                                            type="button"
                                                            onClick={() => {
                                                                setShowNewCategoryInput(true);
                                                                setIsRemovingPrimary(true);
                                                                setNewCategoryName('');
                                                            }}
                                                            className="flex items-center gap-1 text-xs px-3 py-1.5 bg-red-800 text-white rounded-md hover:bg-rose-700 transition-colors shadow-sm"
                                                        >
                                                            <FaMinus size={10} /> Remove
                                                        </button>
                                                    </div>
                                                </div>
                                                {(showNewCategoryInput || isRemovingPrimary) ? (
                                                    <div className="flex gap-3 items-center">
                                                        {isRemovingPrimary ? (
                                                            <>
                                                                <select
                                                                    value={newCategoryName}
                                                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                                                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white hover:border-gray-300"
                                                                >
                                                                    <option value="" disabled>Select category to remove</option>
                                                                    {mainCategoryOptions.filter(opt => !opt.disabled).map((option) => (
                                                                        <option key={option.value} value={option.value}>
                                                                            {option.label}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveCategory(newCategoryName)}
                                                                    disabled={!newCategoryName}
                                                                    className="px-4 py-2 bg-red-800 text-white rounded-xl hover:bg-rose-700 transition-colors disabled:bg-rose-300 flex items-center gap-1 shadow-sm"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <input
                                                                    type="text"
                                                                    value={newCategoryName}
                                                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                                                    placeholder="Enter new category name"
                                                                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white hover:border-gray-300"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={handleAddNewCategory}
                                                                    className="px-4 py-2 bg-indigo-800 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-1 shadow-sm"
                                                                >
                                                                     Add
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <select
                                                        name="name"
                                                        value={categoryInfo.name}
                                                        onChange={handleCategoryInfoChange}
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white hover:border-gray-300"
                                                    >
                                                        {mainCategoryOptions.map((option) => (
                                                            <option key={option.value} value={option.value} disabled={option.disabled}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Category Description</label>
                                                <textarea 
                                                    name="description" 
                                                    value={categoryInfo.description} 
                                                    onChange={handleCategoryInfoChange} 
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white hover:border-gray-300"
                                                    rows="4"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <label className="block text-sm font-medium text-gray-700">Is Active</label>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input 
                                                            type="checkbox" 
                                                            name="is_active" 
                                                            checked={categoryInfo.is_active} 
                                                            onChange={handleCategoryInfoChange} 
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                                                    </label>
                                                    <span className="text-sm text-gray-600">
                                                        {categoryInfo.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                                {!categoryInfo.is_active && (
                                                    <button
                                                        type="button"
                                                        onClick={handleSaveCategory}
                                                        className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium shadow-sm"
                                                    >
                                                        Save
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Second Form (Secondary Category) */}
                                    {categoryInfo.type === 'main' && categoryInfo.is_active && !categoryInfo.id && (
                                        <div className="border-b pb-6">
                                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                                <span className="bg-indigo-100 text-indigo-800 w-8 h-8 flex items-center justify-center rounded-full font-bold">2</span>
                                                Secondary Category
                                            </h3>
                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Type</label>
                                                    <select 
                                                        name="type" 
                                                        value={secondaryCategoryInfo.type} 
                                                        onChange={handleSecondaryCategoryInfoChange} 
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white hover:border-gray-300"
                                                    >
                                                        <option value="private">Private Category</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <label className="block text-sm font-medium text-gray-700">Category Name</label>
                                                        <div className="flex gap-2">
                                                            <button 
                                                                type="button"
                                                                onClick={() => {
                                                                    setShowSecondaryInput(!showSecondaryInput);
                                                                    setIsRemovingSecondary(false);
                                                                    setNewSecondaryName('');
                                                                }}
                                                                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-indigo-800 text-white rounded-md hover:bg-emerald-700 transition-colors shadow-sm"
                                                            >
                                                                <FaPlus size={10} /> Add New
                                                            </button>
                                                            <button 
                                                                type="button"
                                                                onClick={() => {
                                                                    setShowSecondaryInput(true);
                                                                    setIsRemovingSecondary(true);
                                                                    setNewSecondaryName('');
                                                                }}
                                                                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-red-800 text-white rounded-md hover:bg-rose-700 transition-colors shadow-sm"
                                                            >
                                                                <FaMinus size={10} /> Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {(showSecondaryInput || isRemovingSecondary) ? (
                                                        <div className="flex gap-3 items-center">
                                                            {isRemovingSecondary ? (
                                                                <>
                                                                    <select
                                                                        value={newSecondaryName}
                                                                        onChange={(e) => setNewSecondaryName(e.target.value)}
                                                                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white hover:border-gray-300"
                                                                    >
                                                                        <option value="" disabled>Select category to remove</option>
                                                                        {secondaryCategoryOptionsMap[categoryInfo.name]?.map((option) => (
                                                                            <option key={option} value={option}>
                                                                                {option}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveSecondary(newSecondaryName)}
                                                                        disabled={!newSecondaryName}
                                                                        className="px-4 py-2 bg-red-800 text-white rounded-xl hover:bg-rose-700 transition-colors disabled:bg-rose-300 flex items-center gap-1 shadow-sm"
                                                                    >
                                                                         Remove
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <input
                                                                        type="text"
                                                                        value={newSecondaryName}
                                                                        onChange={(e) => setNewSecondaryName(e.target.value)}
                                                                        placeholder="Enter new category name"
                                                                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white hover:border-gray-300"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={handleAddNewSecondary}
                                                                        className="px-4 py-2 bg-indigo-800 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-1 shadow-sm"
                                                                    >
                                                                         Add
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <select
                                                            name="name"
                                                            value={secondaryCategoryInfo.name}
                                                            onChange={handleSecondaryCategoryInfoChange}
                                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white hover:border-gray-300"
                                                        >
                                                            <option value="" disabled>Select the category</option>
                                                            {secondaryCategoryOptionsMap[categoryInfo.name]?.map((option) => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Description</label>
                                                    <textarea 
                                                        name="description" 
                                                        value={secondaryCategoryInfo.description} 
                                                        onChange={handleSecondaryCategoryInfoChange} 
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white hover:border-gray-300"
                                                        rows="4"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <label className="block text-sm font-medium text-gray-700">Is Active</label>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input 
                                                                type="checkbox" 
                                                                name="is_active" 
                                                                checked={secondaryCategoryInfo.is_active} 
                                                                onChange={handleSecondaryCategoryInfoChange} 
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                                                        </label>
                                                        <span className="text-sm text-gray-600">
                                                            {secondaryCategoryInfo.is_active ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </div>
                                                    {!secondaryCategoryInfo.is_active && (
                                                        <button
                                                            type="button"
                                                            onClick={handleSaveCategory}
                                                            className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium shadow-sm"
                                                        >
                                                            Save
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Tertiary Form */}
                                    {categoryInfo.type === 'main' && categoryInfo.is_active && secondaryCategoryInfo.is_active && !categoryInfo.id && (
                                        <div className="pb-6">
                                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                                <span className="bg-indigo-100 text-indigo-800 w-8 h-8 flex items-center justify-center rounded-full font-bold">3</span>
                                                Tertiary Category
                                            </h3>
                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Type</label>
                                                    <select 
                                                        name="type" 
                                                        value={tertiaryCategoryInfo.type} 
                                                        onChange={handleTertiaryCategoryInfoChange} 
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white hover:border-gray-300"
                                                    >
                                                        <option value="subcategory">Subcategory</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <label className="block text-sm font-medium text-gray-700">Category Name</label>
                                                        <div className="flex gap-2">
                                                            <button 
                                                                type="button"
                                                                onClick={() => {
                                                                    setShowTertiaryInput(!showTertiaryInput);
                                                                    setIsRemovingTertiary(false);
                                                                    setNewTertiaryName('');
                                                                }}
                                                                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-indigo-800 text-white rounded-md hover:bg-emerald-700 transition-colors shadow-sm"
                                                            >
                                                                <FaPlus size={10} /> Add New
                                                            </button>
                                                            <button 
                                                                type="button"
                                                                onClick={() => {
                                                                    setShowTertiaryInput(true);
                                                                    setIsRemovingTertiary(true);
                                                                    setNewTertiaryName('');
                                                                }}
                                                                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-red-800 text-white rounded-md hover:bg-rose-700 transition-colors shadow-sm"
                                                            >
                                                                <FaMinus size={10} /> Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {(showTertiaryInput || isRemovingTertiary) ? (
                                                        <div className="flex gap-3 items-center">
                                                            {isRemovingTertiary ? (
                                                                <>
                                                                    <select
                                                                        value={newTertiaryName}
                                                                        onChange={(e) => setNewTertiaryName(e.target.value)}
                                                                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white hover:border-gray-300"
                                                                    >
                                                                        <option value="" disabled>Select category to remove</option>
                                                                        {getTertiaryOptions().map((option) => (
                                                                            <option key={option.value} value={option.value}>
                                                                                {option.label}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveTertiary(newTertiaryName)}
                                                                        disabled={!newTertiaryName}
                                                                        className="px-4 py-2 bg-red-800 text-white rounded-xl  transition-colors disabled:bg-rose-300 flex items-center gap-1 shadow-sm"
                                                                    >
                                                                         Remove
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <input
                                                                        type="text"
                                                                        value={newTertiaryName}
                                                                        onChange={(e) => setNewTertiaryName(e.target.value)}
                                                                        placeholder="Enter new category name"
                                                                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white hover:border-gray-300"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={handleAddNewTertiary}
                                                                        className="px-4 py-2 bg-indigo-800 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-1 shadow-sm"
                                                                    >
                                                                         Add
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <select
                                                            name="name"
                                                            value={tertiaryCategoryInfo.name}
                                                            onChange={handleTertiaryCategoryInfoChange}
                                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white hover:border-gray-300"
                                                        >
                                                            <option value="" disabled>Select the collection</option>
                                                            {getTertiaryOptions().map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Description</label>
                                                    <textarea 
                                                        name="description" 
                                                        value={tertiaryCategoryInfo.description} 
                                                        onChange={handleTertiaryCategoryInfoChange} 
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white hover:border-gray-300"
                                                        rows="4"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <label className="block text-sm font-medium text-gray-700">Is Active</label>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input 
                                                                type="checkbox" 
                                                                name="is_active" 
                                                                checked={tertiaryCategoryInfo.is_active} 
                                                                onChange={handleTertiaryCategoryInfoChange} 
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                                                        </label>
                                                        <span className="text-sm text-gray-600">
                                                            {tertiaryCategoryInfo.is_active ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </div>
                                                    {!tertiaryCategoryInfo.is_active && (
                                                        <button
                                                            type="button"
                                                            onClick={handleSaveCategory}
                                                            className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium shadow-sm"
                                                        >
                                                            Save
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}