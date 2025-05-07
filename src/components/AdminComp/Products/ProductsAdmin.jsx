import { useState, useEffect } from 'react'; // Removed 'React' import as it's not needed with Vite's JSX runtime
import AdminHeader from "../Header/AdminHeader";
import { FaBars, FaCog, FaRegEdit, FaSignOutAlt, FaTimes, FaUserCircle } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function ProductsAdmin() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showAddProductPopup, setShowAddProductPopup] = useState(false);
    const [showEditProductPopup, setShowEditProductPopup] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [customCategoryName, setCustomCategoryName] = useState('');
    const [showVariants, setShowVariants] = useState(false);
    const [productInfo, setProductInfo] = useState({
        id: null,
        name: '',
        description: '',
        category: null,
        custom_category: '',
        sku: '',
        original_price: '',
        current_price: '',
        price_with_offer: null,
        size: '',
        weight: '',
        burning_time: '',
        color: '',
        fragrance: '',
        in_the_box: '',
        stock: null,
        tags: '',
        image_url: '',
        variants: [
            {
                variant_options: [],
                original_price: '',
                current_price: '',
                price_with_offer: '',
                variant_data: {},
                stock: null,
                variant_type: '',
                option_value: ''
            }
        ]
    });
    const [editProductInfo, setEditProductInfo] = useState({
        id: null,
        name: '',
        description: '',
        category: null,
        sku: '',
        original_price: '',
        current_price: '',
        price_with_offer: null,
        size: '',
        weight: '',
        burning_time: '',
        color: '',
        fragrance: '',
        in_the_box: '',
        stock: null,
        tags: '',
        image_url: '',
        variants: [
            {
                variant_options: [],
                original_price: '',
                current_price: '',
                price_with_offer: '',
                variant_data: {},
                stock: null,
                variant_type: '',
                option_value: ''
            }
        ]
    });
    const [products, setProducts] = useState({});
    const [variantTypes, setVariantTypes] = useState([]);
    const [variantOptions, setVariantOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [newVariantType, setNewVariantType] = useState('');
    const [showAddVariantTypeAdd, setShowAddVariantTypeAdd] = useState([]);
    const [showAddVariantTypeEdit, setShowAddVariantTypeEdit] = useState([]);
    const [mainCategory, setMainCategory] = useState('');
    const [childrenCategory, setChildrenCategory] = useState('');

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const productsData = await ShowAllProducts();
    //             setProducts(productsData || {});
    //             const variantTypesData = await ShowVariantTypes();
    //             setVariantTypes(variantTypesData || []);
    //             const variantOptionsData = await ShowVariantOptions();
    //             setVariantOptions(variantOptionsData || []);
    //             const categoriesData = await CategoriesList();
    //             setCategories(categoriesData || []);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    // const handleSubmitProduct = async () => {
    //     try {
    //         const response = await CreateProduct(productInfo);
    //         console.log('Product created successfully:', response);
    //         setShowAddProductPopup(false);
    //         setCustomCategoryName('');
    //         setMainCategory('');
    //         setChildrenCategory('');
    //         const updatedProducts = await ShowAllProducts();
    //         setProducts(updatedProducts || {});
    //     } catch (error) {
    //         console.error('Error creating product:', error);
    //     }
    // };

    // const handleEditProductSubmit = async () => {
    //     try {
    //         console.log('Updating product:', editProductInfo);
    //         setShowEditProductPopup(false);
    //         const updatedProducts = await ShowAllProducts();
    //         setProducts(updatedProducts || {});
    //     } catch (error) {
    //         console.error('Error updating product:', error);
    //     }
    // };

    const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleSelectProduct = (id) => {
        setSelectedProducts(prev => 
            prev.includes(id) ? prev.filter(productId => productId !== id) : [...prev, id]
        );
    };

    const handleAddProduct = () => setShowAddProductPopup(true);

    const handleEditProduct = (product) => {
        setEditProductInfo({
            ...product,
            variants: product.variants.map(variant => ({
                ...variant,
                variant_type: variant.variant_type || '',
                option_value: variant.option_value || '',
                variant_options: variant.variant_options || [],
                original_price: variant.original_price || '',
                current_price: variant.current_price || '',
                price_with_offer: variant.price_with_offer || '',
                variant_data: variant.variant_data || {},
                stock: variant.stock || null
            }))
        });
        setShowEditProductPopup(true);
    };

    const handleProductInfoChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'custom_category') {
            setCustomCategoryName(value);
            setProductInfo(prev => ({
                ...prev,
                custom_category: value
            }));
        } else if (name === 'main_category') {
            setMainCategory(value);
            setChildrenCategory('');
            setProductInfo(prev => ({
                ...prev,
                category: value ? parseInt(value) : null
            }));
        } else if (name === 'children_category') {
            setChildrenCategory(value);
            setProductInfo(prev => ({
                ...prev,
                category: value ? parseInt(value) : null
            }));
        } else if (name === 'sub_children_category') {
            setProductInfo(prev => ({
                ...prev,
                category: value ? parseInt(value) : null
            }));
        } else {
            setProductInfo(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : (name === 'category' ? parseInt(value) || null : value)
            }));
        }
    };

    const handleEditProductInfoChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditProductInfo(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (name === 'category' ? parseInt(value) || null : value)
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setProductInfo(prev => ({ ...prev, images: files }));
    };

    const handleEditImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setEditProductInfo(prev => ({ ...prev, images: files }));
    };

    const handleVariantChange = (e, index, field, subField) => {
        const { value } = e.target;
        const updatedVariants = productInfo.variants.map((variant, i) => {
            if (i === index) {
                if (subField) {
                    return {
                        ...variant,
                        [field]: {
                            ...variant[field],
                            [subField]: value
                        }
                    };
                }
                return { ...variant, [field]: value };
            }
            return variant;
        });
        setProductInfo(prev => ({ ...prev, variants: updatedVariants }));
    };

    const handleEditVariantChange = (index, field, value, subField) => {
        const updatedVariants = editProductInfo.variants.map((variant, i) => {
            if (i === index) {
                if (subField) {
                    return {
                        ...variant,
                        [field]: {
                            ...variant[field],
                            [subField]: value
                        }
                    };
                }
                return { ...variant, [field]: value };
            }
            return variant;
        });
        setEditProductInfo(prev => ({ ...prev, variants: updatedVariants }));
    };

    const handleFilterByCategory = (categoryId) => {
        const filteredProduct = (products.results || []).filter(product => product.category_id === categoryId);
        setFilteredProducts(filteredProduct);
    };

    const handleAddVariantType = (modalType, index) => {
        if (newVariantType.trim()) {
            if (!variantTypes.some(type => type.name.toLowerCase() === newVariantType.toLowerCase())) {
                const newType = { id: Date.now(), name: newVariantType };
                setVariantTypes(prev => [...prev, newType]);
            }
            setNewVariantType('');
            if (modalType === 'add') {
                setShowAddVariantTypeAdd(prev => {
                    const newState = [...prev];
                    newState[index] = false;
                    return newState;
                });
            } else {
                setShowAddVariantTypeEdit(prev => {
                    const newState = [...prev];
                    newState[index] = false;
                    return newState;
                });
            }
        }
    };

    const toggleAddVariantTypeAdd = (index) => {
        setShowAddVariantTypeAdd(prev => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
        setNewVariantType('');
    };

    const toggleAddVariantTypeEdit = (index) => {
        setShowAddVariantTypeEdit(prev => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
        setNewVariantType('');
    };

    const childrenCategories = {
        '1': [
            {
                id: 101,
                name: 'Jar',
                subcategories: [
                    { id: 10101, name: 'Ritu Collections' },
                    { id: 10102, name: 'Mana Collections' },
                    { id: 10103, name: 'Sia Collections' },
                    { id: 10104, name: 'Wooden Collections' }
                ]
            },
            { id: 102, name: 'Floating', },
            { id: 103, name: 'Decorative' },
            { id: 104, name: 'Pillar' },
            { id: 105, name: 'Tea Lights' },
            { id: 106, name: 'Stick Candles' },
            { id: 107, name: 'Religious & Festive' },
            { id: 108, name: 'Gifting' }
        ],
        '2': [
            { id: 201, name: 'Jar' },
            { id: 202, name: 'Pillar' },
            { id: 203, name: 'Tea Light' },
            { id: 204, name: 'Stick' }
        ],
        '3': [
            { id: 301, name: 'Round' },
            { id: 302, name: 'Rectangle' },
            { id: 303, name: 'Rings' },
            { id: 304, name: 'Hearts' }
        ],
        '4': [
            { id: 401, name: 'Charms & Melts' }
        ],
        '5': [
            { id: 501, name: 'Terracotta' },
            { id: 502, name: 'Metal' },
            { id: 503, name: 'Ceramic' }
        ],
        '6': [
            { id: 601, name: 'Glass-Mosaic' }
        ]
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
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Products Management</h1>
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
                                <Link to="/admin/AdminSignin" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
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
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                                Bulk Action
                            </button>
                            <button 
                                className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                                    selectedProducts.length > 0 ? 'bg-red-900 hover:bg-red-700' : 'bg-red-300'
                                }`}
                            >
                                Delete
                            </button>
                            <button 
                                onClick={handleAddProduct}
                                className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                            >
                                + Add Product
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <input 
                                type="text" 
                                placeholder="Search by id, name, category..." 
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                            />
                            <select 
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                onChange={(e) => handleFilterByCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <React.Fragment key={category.id}>
                                        <option value={category.id}>{category.name}</option>
                                        {category.subcategories.map(subcategory => (
                                            <React.Fragment key={subcategory.id}>
                                                <option value={subcategory.id}>— {subcategory.name}</option>
                                                {subcategory.subcategories.map(subSubcategory => (
                                                    <option key={subSubcategory.id} value={subSubcategory.id}>—— {subSubcategory.name}</option>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </select>
                            <select 
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                            >
                                <option>All Prices</option>
                                <option>Below $100</option>
                                <option>$100 - $200</option>
                                <option>Above $200</option>
                            </select>
                            <button className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                                Filter
                            </button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                                Reset
                            </button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.results && products.results.length > 0 ? (
                            products.results.map(product => (
                                <div 
                                    key={product.id} 
                                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
                                >
                                    <div className="p-5">
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h2>
                                            <input 
                                                type="checkbox" 
                                                checked={selectedProducts.includes(product.id)} 
                                                onChange={() => handleSelectProduct(product.id)}
                                                className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                            />
                                        </div>
                                        <img 
                                            src={product.image_url} 
                                            alt={product.name} 
                                            className="w-full h-48 object-cover rounded-lg mb-4"
                                        />
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p className="line-clamp-2"><span className="font-medium text-gray-900">Description:</span> {product.description}</p>
                                            <p><span className="font-medium text-gray-900">Category:</span> {product.category}</p>
                                            <p><span className="font-medium text-gray-900">SKU:</span> {product.sku}</p>
                                            <p><span className="font-medium text-gray-900">Original Price:</span> ₹{product.original_price}</p>
                                            <p><span className="font-medium text-gray-900">Current Price:</span> ₹{product.current_price}</p>
                                            <p><span className="font-medium text-gray-900">Stock:</span> {product.stock}</p>
                                        </div>
                                        <div className="mt-4">
                                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Variants</h3>
                                            {product.variants.map((variant, index) => (
                                                <div key={index} className="mb-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                                                    <p>
                                                        <span className="font-medium text-gray-900">Options:</span> 
                                                        {variant.variant_options.map(optionId => {
                                                            const option = variantOptions.find(opt => opt.id === optionId);
                                                            const variantType = option ? variantTypes.find(type => type.id === option.variant_type) : null;
                                                            return option && variantType ? `${variantType.name}: ${option.option_value}` : '';
                                                        }).join(', ')}
                                                    </p>
                                                    <p><span className="font-medium text-gray-900">Original Price:</span> ₹{variant.original_price}</p>
                                                    <p><span className="font-medium text-gray-900">Current Price:</span> ₹{variant.current_price}</p>
                                                    <p><span className="font-medium text-gray-900">Price with Offer:</span> ₹{variant.price_with_offer || 'N/A'}</p>
                                                    <p>
                                                        <span className="font-medium text-gray-900">Data:</span> 
                                                        {Object.entries(variant.variant_data).map(([key, value]) => `${key}: ${value}`).join(', ')}
                                                    </p>
                                                    <p><span className="font-medium text-gray-900">Stock:</span> {variant.stock}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-50 flex justify-between items-center border-t border-gray-100">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                                        </label>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handleEditProduct(product)}
                                                className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors"
                                            >
                                                <FaRegEdit size={18} />
                                            </button>
                                            <button 
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                                            >
                                                <MdDeleteForever size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-gray-500 text-lg">
                                No products available
                            </div>
                        )}
                    </div>
                </main>

                {/* Add Product Modal */}
                {showAddProductPopup && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                                <button 
                                    onClick={() => setShowAddProductPopup(false)}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <FaTimes size={24} />
                                </button>
                            </div>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            value={productInfo.name || ''} 
                                            onChange={handleProductInfoChange} 
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                                        <input 
                                            type="text" 
                                            name="sku" 
                                            value={productInfo.sku || ''} 
                                            onChange={handleProductInfoChange} 
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea 
                                        name="description" 
                                        value={productInfo.description || ''} 
                                        onChange={handleProductInfoChange} 
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        rows="4"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                                    <input 
                                        type="file" 
                                        multiple 
                                        accept=".jpeg,.webp,.png,.jpg" 
                                        onChange={handleImageUpload} 
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <div className="flex gap-4 items-center">
                                        <span className="w-1/2 px-4 py-2 text-gray-700">Main category</span>
                                        <select
                                            name="main_category"
                                            value={mainCategory}
                                            onChange={handleProductInfoChange}
                                            className="w-1/2 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        >
                                            <option value="">Select the Main Category</option>
                                            <option value="1">Candles</option>
                                            <option value="2">Candle Holders</option>
                                            <option value="3">Sachets</option>
                                            <option value="4">Charms & Melts</option>
                                            <option value="5">Diyas</option>
                                            <option value="6">Table Tops</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                                    <div className="flex gap-4 items-center">
                                        <span className="w-1/2 px-4 py-2 text-gray-700">Children category</span>
                                        <select
                                            name="children_category"
                                            value={childrenCategory}
                                            onChange={handleProductInfoChange}
                                            disabled={!mainCategory}
                                            className="w-1/2 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors disabled:bg-gray-100"
                                        >
                                            <option value="">Select the Children Category</option>
                                            {mainCategory && childrenCategories[mainCategory] ? (
                                                childrenCategories[mainCategory].map(category => (
                                                    <option key={category.id} value={category.id}>{category.name}</option>
                                                ))
                                            ) : (
                                                <>
                                                    <option value="1">Candles</option>
                                                    <option value="2">Candle Holders</option>
                                                    <option value="3">Sachets</option>
                                                    <option value="4">Charms & Melts</option>
                                                    <option value="5">Diyas</option>
                                                    <option value="6">Table Tops</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1"></label>
                                    <div className="flex gap-4 items-center">
                                        <span className="w-1/2 px-4 py-2 text-gray-700">Sub Children category</span>
                                        <select
                                            name="sub_children_category"
                                            value={productInfo.category || ''}
                                            onChange={handleProductInfoChange}
                                            disabled={!childrenCategory}
                                            className="w-1/2 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors disabled:bg-gray-100"
                                        >
                                            <option value="">Select the Sub Children Category</option>
                                            {mainCategory === '1' && childrenCategory ===  '101' ? (
                                                childrenCategories['1'].find(category => category.id === 101).subcategories.map(subSubcategory => (
                                                    <option key={subSubcategory.id} value={subSubcategory.id}>{subSubcategory.name}</option>
                                                ))
                                            ) : (
                                                <>
                                                    <option value="1">Candles</option>
                                                    <option value="2">Candle Holders</option>
                                                    <option value="3">Sachets</option>
                                                    <option value="4">Charms & Melts</option>
                                                    <option value="5">Diyas</option>
                                                    <option value="6">Table Tops</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Enable Variants</label>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={showVariants}
                                            onChange={() => setShowVariants(prev => !prev)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                                    </label>
                                </div>
                                {productInfo.category && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                                                <input 
                                                    type="text" 
                                                    name="original_price" 
                                                    value={productInfo.original_price || ''} 
                                                    onChange={handleProductInfoChange} 
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Price</label>
                                                <input 
                                                    type="text" 
                                                    name="current_price" 
                                                    value={productInfo.current_price || ''} 
                                                    onChange={handleProductInfoChange} 
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                                <input 
                                                    type="text" 
                                                    name="stock" 
                                                    value={productInfo.stock || ''} 
                                                    onChange={handleProductInfoChange} 
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                                                <input 
                                                    type="text" 
                                                    name="size" 
                                                    value={productInfo.size || ''} 
                                                    onChange={handleProductInfoChange} 
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                                                <input 
                                                    type="text" 
                                                    name="weight" 
                                                    value={productInfo.weight || ''} 
                                                    onChange={handleProductInfoChange} 
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Burning Time</label>
                                                <input 
                                                    type="text" 
                                                    name="burning_time" 
                                                    value={productInfo.burning_time || ''} 
                                                    onChange={handleProductInfoChange} 
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                                <input 
                                                    type="text" 
                                                    name="color" 
                                                    value={productInfo.color || ''} 
                                                    onChange={handleProductInfoChange} 
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Fragrance</label>
                                                <input 
                                                    type="text" 
                                                    name="fragrance" 
                                                    value={productInfo.fragrance || ''} 
                                                    onChange={handleProductInfoChange} 
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">In the Box</label>
                                                <input 
                                                    type="text" 
                                                    name="in_the_box" 
                                                    value={productInfo.in_the_box || ''} 
                                                    onChange={handleProductInfoChange} 
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                                            <input 
                                                type="text" 
                                                name="tags" 
                                                value={productInfo.tags || ''} 
                                                onChange={handleProductInfoChange} 
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                            />
                                        </div>
                                    </>
                                )}
                                {showVariants && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Variants</label>
                                        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                                            {productInfo.variants.map((variant, index) => (
                                                <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex-1">
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Variant Type</label>
                                                                <select
                                                                    name="variant_type"
                                                                    value={variant.variant_type || ''}
                                                                    onChange={(e) => handleVariantChange(e, index, 'variant_type')}
                                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                                >
                                                                    <option value="">Select Variant Type</option>
                                                                    {variantTypes.map(type => (
                                                                        <option key={type.id} value={type.name}>{type.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => toggleAddVariantTypeAdd(index)}
                                                                className="mt-6 px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                                                            >
                                                                +Add Variant
                                                            </button>
                                                        </div>
                                                        {variant.variant_type && (
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Option Value</label>
                                                                <input
                                                                    type="text"
                                                                    name="option_value"
                                                                    value={variant.option_value || ''}
                                                                    onChange={(e) => handleVariantChange(e, index, 'option_value')}
                                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    {showAddVariantTypeAdd[index] && (
                                                        <div className="mt-4 space-y-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">New Variant Type Name</label>
                                                                <input 
                                                                    type="text" 
                                                                    value={newVariantType} 
                                                                    onChange={(e) => setNewVariantType(e.target.value)}
                                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                                    placeholder="Enter variant type name"
                                                                />
                                                            </div>
                                                            <div className="flex justify-end gap-4">
                                                                <button 
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setNewVariantType('');
                                                                        setShowAddVariantTypeAdd(prev => {
                                                                            const newState = [...prev];
                                                                            newState[index] = false;
                                                                            return newState;
                                                                        });
                                                                    }}
                                                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button 
                                                                    type="button"
                                                                    onClick={() => handleAddVariantType('add', index)}
                                                                    disabled={!newVariantType.trim()}
                                                                    className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                                                                        newVariantType.trim() ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'
                                                                    }`}
                                                                >
                                                                    Add
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {variant.variant_type && (
                                                        <>
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                                                                    <input
                                                                        type="text"
                                                                        name="original_price"
                                                                        value={variant.original_price || ''}
                                                                        onChange={(e) => handleVariantChange(e, index, 'original_price')}
                                                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Price *</label>
                                                                    <input
                                                                        type="text"
                                                                        name="current_price"
                                                                        value={variant.current_price || ''}
                                                                        onChange={(e) => handleVariantChange(e, index, 'current_price')}
                                                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                                        required
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price with Offer</label>
                                                                    <input
                                                                        type="text"
                                                                        name="price_with_offer"
                                                                        value={variant.price_with_offer || ''}
                                                                        onChange={(e) => handleVariantChange(e, index, 'price_with_offer')}
                                                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="mt-4">
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Variant Data</label>
                                                                {variantTypes.map((type) => (
                                                                    <div key={type.id} className="mt-2">
                                                                        <label className="block text-sm text-gray-600 mb-1">{type.name}</label>
                                                                        <input
                                                                            type="text"
                                                                            name={`variant_data_${type.name}`}
                                                                            value={variant.variant_data[type.name] || ''}
                                                                            onChange={(e) => handleVariantChange(e, index, 'variant_data', type.name)}
                                                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="mt-4">
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                                                <input
                                                                    type="number"
                                                                    name="stock"
                                                                    value={variant.stock || ''}
                                                                    onChange={(e) => handleVariantChange(e, index, 'stock')}
                                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                                    min="0"
                                                                    max="9223372036854776000"
                                                                />
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-end gap-4 mt-6">
                                    <button 
                                        type="button"
                                        onClick={() => setShowAddProductPopup(false)}
                                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={handleSubmitProduct}
                                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                                    >
                                        Add Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit Product Modal */}
                {showEditProductPopup && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
                                <button 
                                    onClick={() => setShowEditProductPopup(false)}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <FaTimes size={24} />
                                </button>
                            </div>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            value={editProductInfo.name || ''} 
                                            onChange={handleEditProductInfoChange} 
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                                        <input 
                                            type="text" 
                                            name="sku" 
                                            value={editProductInfo.sku || ''} 
                                            onChange={handleEditProductInfoChange} 
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea 
                                        name="description" 
                                        value={editProductInfo.description || ''} 
                                        onChange={handleEditProductInfoChange} 
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        rows="4"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                                    <input 
                                        type="file" 
                                        multiple 
                                        accept=".jpeg,.webp,.png,.jpg" 
                                        onChange={handleEditImageUpload} 
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <input 
                                        type="number" 
                                        name="category" 
                                        value={editProductInfo.category || ''} 
                                        onChange={handleEditProductInfoChange} 
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                                        <input 
                                            type="text" 
                                            name="original_price" 
                                            value={editProductInfo.original_price || ''} 
                                            onChange={handleEditProductInfoChange} 
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Price</label>
                                        <input 
                                            type="text" 
                                            name="current_price" 
                                            value={editProductInfo.current_price || ''} 
                                            onChange={handleEditProductInfoChange} 
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                        <input 
                                            type="text" 
                                            name="stock" 
                                            value={editProductInfo.stock || ''} 
                                            onChange={handleEditProductInfoChange} 
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                                        <input 
                                            type="text" 
                                            name="size" 
                                            value={editProductInfo.size || ''} 
                                            onChange={handleEditProductInfoChange} 
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                                        <input 
                                            type="text" 
                                            name="weight" 
                                            value={editProductInfo.weight || ''} 
                                            onChange={handleEditProductInfoChange} 
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Burning Time</label>
                                        <input 
                                            type="text" 
                                            name="burning_time" 
                                            value={editProductInfo.burning_time || ''} 
                                            onChange={handleEditProductInfoChange} 
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                        <input 
                                            type="text" 
                                            name="color" 
                                            value={editProductInfo.color || ''} 
                                            onChange={handleEditProductInfoChange} 
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Fragrance</label>
                                        <input 
                                            type="text" 
                                            name="fragrance" 
                                            value={editProductInfo.fragrance || ''} 
                                            onChange={handleEditProductInfoChange} 
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">In the Box</label>
                                        <input 
                                            type="text" 
                                            name="in_the_box" 
                                            value={editProductInfo.in_the_box || ''} 
                                            onChange={handleEditProductInfoChange} 
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                                    <input 
                                        type="text" 
                                        name="tags" 
                                        value={editProductInfo.tags || ''} 
                                        onChange={handleEditProductInfoChange} 
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Variants</label>
                                    <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                                        {editProductInfo.variants.map((variant, index) => (
                                            <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Variant Type</label>
                                                            <select
                                                                name={`variant_type_${index}`}
                                                                value={variant.variant_type || ''}
                                                                onChange={(e) => handleEditVariantChange(index, 'variant_type', e.target.value)}
                                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                            >
                                                                <option value="">Select Variant Type</option>
                                                                {variantTypes.map(type => (
                                                                    <option key={type.id} value={type.name}>{type.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleAddVariantTypeEdit(index)}
                                                            className="mt-6 px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                                                        >
                                                            +Add Variant
                                                        </button>
                                                    </div>
                                                    {variant.variant_type && (
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Option Value</label>
                                                            <input
                                                                type="text"
                                                                name={`option_value_${index}`}
                                                                value={variant.option_value || ''}
                                                                onChange={(e) => handleEditVariantChange(index, 'option_value', e.target.value)}
                                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                {showAddVariantTypeEdit[index] && (
                                                    <div className="mt-4 space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">New Variant Type Name</label>
                                                            <input 
                                                                type="text" 
                                                                value={newVariantType} 
                                                                onChange={(e) => setNewVariantType(e.target.value)}
                                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                                placeholder="Enter variant type name"
                                                            />
                                                        </div>
                                                        <div className="flex justify-end gap-4">
                                                            <button 
                                                                type="button"
                                                                onClick={() => {
                                                                    setNewVariantType('');
                                                                    setShowAddVariantTypeEdit(prev => {
                                                                        const newState = [...prev];
                                                                        newState[index] = false;
                                                                        return newState;
                                                                    });
                                                                }}
                                                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button 
                                                                type="button"
                                                                onClick={() => handleAddVariantType('edit', index)}
                                                                disabled={!newVariantType.trim()}
                                                                className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                                                                    newVariantType.trim() ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'
                                                                }`}
                                                            >
                                                                Add
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                                {variant.variant_type && (
                                                    <>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                                                                <input
                                                                    type="text"
                                                                    name={`original_price_${index}`}
                                                                    value={variant.original_price || ''}
                                                                    onChange={(e) => handleEditVariantChange(index, 'original_price', e.target.value)}
                                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Price</label>
                                                                <input
                                                                    type="text"
                                                                    name={`current_price_${index}`}
                                                                    value={variant.current_price || ''}
                                                                    onChange={(e) => handleEditVariantChange(index, 'current_price', e.target.value)}
                                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                                    required
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Price with Offer</label>
                                                                <input
                                                                    type="text"
                                                                    name={`price_with_offer_${index}`}
                                                                    value={variant.price_with_offer || ''}
                                                                    onChange={(e) => handleEditVariantChange(index, 'price_with_offer', e.target.value)}
                                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="mt-4">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Variant Data</label>
                                                            {variantTypes.map((type) => (
                                                                <div key={type.id} className="mt-2">
                                                                    <label className="block text-sm text-gray-600 mb-1">{type.name}</label>
                                                                    <input
                                                                        type="text"
                                                                        name={`variant_data_${type.name}_${index}`}
                                                                        value={variant.variant_data[type.name] || ''}
                                                                        onChange={(e) => handleEditVariantChange(index, 'variant_data', e.target.value, type.name)}
                                                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="mt-4">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                                            <input
                                                                type="number"
                                                                name={`stock_${index}`}
                                                                value={variant.stock || ''}
                                                                onChange={(e) => handleEditVariantChange(index, 'stock', e.target.value)}
                                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                                                min="0"
                                                                max="9223372036854776000"
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 mt-6">
                                    <button 
                                        type="button"
                                        onClick={() => setShowEditProductPopup(false)}
                                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={handleEditProductSubmit}
                                        className="px-6 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}