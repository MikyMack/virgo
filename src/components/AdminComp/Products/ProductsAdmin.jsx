import React, { useState, useEffect } from 'react';
import AdminHeader from "../Header/AdminHeader";
import { FaBars, FaCog, FaRegEdit, FaSignOutAlt, FaTimes, FaUserCircle } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import bgim from "../../../assets/banner/dashboarbg.jpg";
import { CreateProduct, ShowAllProducts, ShowVariantTypes, ShowVariantOptions } from '../../../actions/adminactions/products/productsaction';
import { CategoriesList } from '../../../actions/adminactions/categories/categoriesactions';

export default function ProductsAdmin() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showAddProductPopup, setShowAddProductPopup] = useState(false);
    const [showEditProductPopup, setShowEditProductPopup] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [productInfo, setProductInfo] = useState({
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
                price_with_offer: "",
                variant_data: {},
                stock: null
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
                price_with_offer: null,
                variant_data: {},
                stock: null
            }
        ]
    });
    const [products, setProducts] = useState([]);
    const [variantTypes, setVariantTypes] = useState([]);
    const [variantOptions, setVariantOptions] = useState([]);
    const [categories,setCategories]=useState([]);
    const [filteredProducts,setFilteredProducts]=useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await ShowAllProducts();
                setProducts(productsData);
                const variantTypesData = await ShowVariantTypes();
                setVariantTypes(variantTypesData);

                const variantOptionsData = await ShowVariantOptions();
                setVariantOptions(variantOptionsData);
                
                const categoriesData = await CategoriesList();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmitProduct = async () => {
        try {
            const response = await CreateProduct(productInfo);
            console.log('Product created successfully:', response);
            // Optionally, you can add code here to update the UI or state after successful product creation
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleSelectProduct = (id) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(productId => productId !== id));
        } else {
            setSelectedProducts([...selectedProducts, id]);
        }
    };
    const handleAddProduct = () => {
        setShowAddProductPopup(true);
    };

    const handleEditProduct = (product) => {
        setEditProductInfo(product);
        setShowEditProductPopup(true);
    };

    const handleProductInfoChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setProductInfo({ ...productInfo, [name]: checked });
        } else {
            setProductInfo({ ...productInfo, [name]: value });
        }
    };

    const handleEditProductInfoChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setEditProductInfo({ ...editProductInfo, [name]: checked });
        } else {
            setEditProductInfo({ ...editProductInfo, [name]: value });
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setProductInfo({ ...productInfo, images: files });
    };

    const handleEditImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setEditProductInfo({ ...editProductInfo, images: files });
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
                } else {
                    return {
                        ...variant,
                        [field]: value
                    };
                }
            }
            return variant;
        });
        setProductInfo({ ...productInfo, variants: updatedVariants });
    };

    const handleFilterByCategory = (categoryId) => {
        const filteredProduct = products.results.filter(product => product.category_id === categoryId);
        setFilteredProducts(filteredProduct);
        console.log(filteredProducts);
        
    };

    return (
        <div className="flex flex-col md:flex-row font-abc">
            <div className='md:w-1/3 lg:w-1/3 xl:w-1/5'>
                <AdminHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
            <div className="w-full p-5 py-10" style={{ backgroundImage: `url(${bgim})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <header className="flex items-center justify-between mb-5 md:mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Products management</h1>
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
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Bulk Action</button>
                        <button className={`px-4 py-2 rounded ${selectedProducts.length > 0 ? 'bg-red-700 text-white' : 'bg-red-300 text-white'}`}>Delete</button>
                        <button className="bg-green-700 text-white px-4 py-2 rounded" onClick={handleAddProduct}>+ Add Product</button>
                    </div>
                    {showAddProductPopup && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-20 overflow-auto">
                            <div className="bg-white w-full h-full md:w-1/2 lg:w-1/3 p-5 overflow-auto">
                                <div className="flex justify-between items-center mb-5">
                                    <h2 className="text-2xl font-bold">Add Product</h2>
                                    <button className="text-gray-700" onClick={() => setShowAddProductPopup(false)}>
                                        <FaTimes />
                                    </button>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Product Name</label>
                                    <input type="text" name="name" value={productInfo.name || ''} onChange={handleProductInfoChange} className="p-2 rounded w-full outline-none border-b-2 " />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Product Description</label>
                                    <textarea name="description" value={productInfo.description || ''} onChange={handleProductInfoChange} className="p-2 rounded w-full outline-none border-b-2 " />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Product Images</label>
                                    <input type="file" multiple accept=".jpeg,.webp,.png,.jpg" onChange={handleImageUpload} className="outline-none border-b-2  p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Category</label>
                                    <select name="category" value={productInfo.category || ''} onChange={handleProductInfoChange} className="outline-none border-b-2  p-2 rounded w-full">
                                        <option value="">Select Category</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Product SKU</label>
                                    <input type="text" name="sku" value={productInfo.sku || ''} onChange={handleProductInfoChange} className="outline-none border-b-2  p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Original Price</label>
                                    <input type="text" name="original_price" value={productInfo.original_price || ''} onChange={handleProductInfoChange} className="outline-none border-b-2  p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Current Price</label>
                                    <input type="text" name="current_price" value={productInfo.current_price || ''} onChange={handleProductInfoChange} className="outline-none border-b-2  p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Size</label>
                                    <input type="text" name="size" value={productInfo.size || ''} onChange={handleProductInfoChange} className="outline-none border-b-2  p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Weight</label>
                                    <input type="text" name="weight" value={productInfo.weight || ''} onChange={handleProductInfoChange} className="outline-none border-b-2  p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Burning Time</label>
                                    <input type="text" name="burning_time" value={productInfo.burning_time || ''} onChange={handleProductInfoChange} className="outline-none border-b-2  p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Color</label>
                                    <input type="text" name="color" value={productInfo.color || ''} onChange={handleProductInfoChange} className="outline-none border-b-2  p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Fragrance</label>
                                    <input type="text" name="fragrance" value={productInfo.fragrance || ''} onChange={handleProductInfoChange} className="outline-none border-b-2  p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">In the Box</label>
                                    <input type="text" name="in_the_box" value={productInfo.in_the_box || ''} onChange={handleProductInfoChange} className="outline-none border-b-2  p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Stock</label>
                                    <input type="text" name="stock" value={productInfo.stock || ''} onChange={handleProductInfoChange} className="outline-none border-b-2  p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Product Tags</label>
                                    <input type="text" name="tags" value={productInfo.tags || ''} onChange={handleProductInfoChange} className="outline-none border-b-2  p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Variants</label>
                                    <div className="border p-2 rounded w-full">
                                        {productInfo.variants.map((variant, index) => (
                                            <div key={index} className="mb-2">
                                                <div className='p-2 border-2 m-2'>
                                                <label className="block text-gray-700">Variant Type</label>
                                                <select
                                                    name="variant_type"
                                                    value={variant.variant_type || ''}
                                                    onChange={(e) => handleVariantChange(e, index, 'variant_type')}
                                                    className="outline-none border-b-2 p-2 rounded w-full"
                                                >
                                                    <option value="">Select Variant Type</option>
                                                    {variantTypes.map((type) => (
                                                        <option key={type.id} value={type.id}>
                                                            {type.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <label className="block text-gray-700">Option Value</label>
                                                <input
                                                    type="text"
                                                    name="option_value"
                                                    value={variant.option_value || ''}
                                                    onChange={(e) => handleVariantChange(e, index, 'option_value')}
                                                    className="outline-none border-b-2 p-2 rounded w-full"
                                                />
                                                </div>
                                            
                                                <label className="block text-gray-700">Original Price</label>
                                                <input type="text" name="original_price" value={variant.original_price || ''} onChange={(e) => handleVariantChange(e, index, 'original_price')} className="outline-none border-b-2  p-2 rounded w-full" />
                                                
                                                <label className="block text-gray-700">Current Price <span className="text-red-500">*</span></label>
                                                <input type="text" name="current_price" value={variant.current_price || ''} onChange={(e) => handleVariantChange(e, index, 'current_price')} className="outline-none border-b-2  p-2 rounded w-full" required />
                                                
                                                <label className="block text-gray-700">Price with Offer</label>
                                                <input type="text" name="price_with_offer" value={variant.price_with_offer || ''} onChange={(e) => handleVariantChange(e, index, 'price_with_offer')} className="outline-none border-b-2  p-2 rounded w-full" />
                                                <div className='border-2 p-2 m-2'>
                                                <label className="block text-gray-700">Variant Data</label>
                                                {variantTypes.map((type) => (
                                                    <div key={type.id} className="mb-2">
                                                        <label className="block text-gray-700">{type.name}</label>
                                                        <input
                                                            type="text"
                                                            name={`variant_data_${type.name}`}
                                                            value={variant.variant_data[type.name] || ''}
                                                            onChange={(e) => handleVariantChange(e, index, 'variant_data', type.name)}
                                                            className="outline-none border-b-2 p-2 rounded w-full"
                                                        />
                                                    </div>
                                                ))}
                                                </div>
                                               
                                                <label className="block text-gray-700">Stock</label>
                                                <input type="number" name="stock" value={variant.stock || ''} onChange={(e) => handleVariantChange(e, index, 'stock')} className="outline-none border-b-2  p-2 rounded w-full" min="0" max="9223372036854776000" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={() => setShowAddProductPopup(false)}>Cancel</button>
                                    <button className="bg-green-700 text-white px-4 py-2 rounded" onClick={handleSubmitProduct}>Add products</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showEditProductPopup && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-20 overflow-auto">
                            <div className="bg-white w-full h-full md:w-1/2 lg:w-1/3 p-5 overflow-auto">
                                <div className="flex justify-between items-center mb-5">
                                    <h2 className="text-2xl font-bold">Edit Product</h2>
                                    <button className="text-gray-700" onClick={() => setShowEditProductPopup(false)}>
                                        <FaTimes />
                                    </button>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Product Name</label>
                                    <input type="text" name="name" value={editProductInfo.name} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Product Description</label>
                                    <textarea name="description" value={editProductInfo.description} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Product Images</label>
                                    <input type="file" multiple accept=".jpeg,.webp,.png,.jpg" onChange={handleEditImageUpload} className="border p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Category</label>
                                    <input type="number" name="category" value={editProductInfo.category} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Product SKU</label>
                                    <input type="text" name="sku" value={editProductInfo.sku} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Original Price</label>
                                    <input type="text" name="original_price" value={editProductInfo.original_price} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Current Price</label>
                                    <input type="text" name="current_price" value={editProductInfo.current_price} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Size</label>
                                    <input type="text" name="size" value={editProductInfo.size} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Weight</label>
                                    <input type="text" name="weight" value={editProductInfo.weight} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Burning Time</label>
                                    <input type="text" name="burning_time" value={editProductInfo.burning_time} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Color</label>
                                    <input type="text" name="color" value={editProductInfo.color} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Fragrance</label>
                                    <input type="text" name="fragrance" value={editProductInfo.fragrance} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">In the Box</label>
                                    <input type="text" name="in_the_box" value={editProductInfo.in_the_box} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Stock</label>
                                    <input type="text" name="stock" value={editProductInfo.stock} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Product Tags</label>
                                    <input type="text" name="tags" value={editProductInfo.tags} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Variants</label>
                                    <div className="border p-2 rounded w-full">
                                        {editProductInfo.variants && editProductInfo.variants.map((variant, index) => (
                                            <div key={index} className="mb-2">
                                                <label className="block text-gray-700">Variant Options</label>
                                                <input type="number" name={`variant_options_${index}`} value={variant.variant_options} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" />
                                                
                                                <label className="block text-gray-700">price_with_offer</label>
                                                <input type="text" name={`price_with_offer${index}`} value={variant.price_with_offer} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" />
                                                
                                                <label className="block text-gray-700">Current Price</label>
                                                <input type="text" name={`current_price_${index}`} value={variant.current_price} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" />
                                                
                                                <label className="block text-gray-700">Variant Data</label>
                                                <input type="text" name={`variant_data_${index}`} value={variant.variant_data} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" />
                                                
                                                <label className="block text-gray-700">Stock</label>
                                                <input type="number" name={`stock_${index}`} value={variant.stock} onChange={handleEditProductInfoChange} className="border p-2 rounded w-full" min="0" max="9223372036854776000" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={() => setShowEditProductPopup(false)}>Cancel</button>
                                    <button className="bg-green-700 text-white px-4 py-2 rounded">Save changes</button>
                                </div>
                            </div>
                        </div>
                    )}
                </header>
                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 mb-5">
                    <input type="text" placeholder="Search Product by id,name,category..." className="border-b border-secondary p-2 rounded w-full md:w-1/3 outline-none" />
                    <select className="border-b border-secondary p-2 rounded w-full md:w-1/3 outline-none" onChange={(e) => handleFilterByCategory(e.target.value)}>
                        <option value="">Category</option>
                        {categories.map(category => (
                            <React.Fragment key={category.id}>
                                <option value={category.id}>{category.name}</option>
                                {category.subcategories.map(subcategory => (
                                    <React.Fragment key={subcategory.id}>
                                        <option value={subcategory.id}>-- {subcategory.name}</option>
                                        {subcategory.subcategories.map(subSubcategory => (
                                            <option key={subSubcategory.id} value={subSubcategory.id}>---- {subSubcategory.name}</option>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        ))}
                    </select>
                    <select className="border-b border-secondary p-2 rounded w-full md:w-1/3 outline-none">
                        <option>Price</option>
                        <option>Below $100</option>
                        <option>$100 - $200</option>
                        <option>Above $200</option>
                    </select>
                    <button className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-auto">Filter</button>
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded w-full md:w-auto">Reset</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.results && products.results.length > 0 ? (
                        products.results.map(product => (
                            <div key={product.id} className="border p-4 rounded bg-white shadow-md">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold">{product.name}</h2>
                                    <input type="checkbox" checked={selectedProducts.includes(product.id)} onChange={() => handleSelectProduct(product.id)} />
                                </div>
                                <hr className="mb-4" />
                                <p className="text-gray-700 mb-2"><strong>Description:</strong> { product.description}</p>
                                <p className="text-gray-700 mb-2"><strong>Category:</strong> {product.category}</p>
                                <p className="text-gray-700 mb-2"><strong>SKU:</strong> {product.sku}</p>
                                <p className="text-gray-700 mb-2"><strong>Original Price:</strong> ₹{product.original_price}</p>
                                <p className="text-gray-700 mb-2"><strong>Current Price:</strong> ₹{product.current_price}</p>
                                <p className="text-gray-700 mb-2"><strong>Size:</strong> {product.size}</p>
                                <p className="text-gray-700 mb-2"><strong>Weight:</strong> {product.weight}</p>
                                <p className="text-gray-700 mb-2"><strong>Burning Time:</strong> {product.burning_time}</p>
                                <p className="text-gray-700 mb-2"><strong>Color:</strong> {product.color}</p>
                                <p className="text-gray-700 mb-2"><strong>Fragrance:</strong> {product.fragrance}</p>
                                <p className="text-gray-700 mb-2"><strong>In the Box:</strong> {product.in_the_box}</p>
                                <p className="text-gray-700 mb-2"><strong>Stock:</strong> {product.stock}</p>
                                <p className="text-gray-700 mb-2"><strong>Tags:</strong> {product.tags}</p>
                                <div className="mb-4">
                                    <img src={product.image_url} alt={product.name} className='w-full h-40 object-cover rounded' />
                                </div>
                                <hr className="mb-4" />
                                <div className="mb-4">
                                    <h3 className="text-md font-semibold mb-2">Variants</h3>
                                    {product.variants.map((variant, index) => (
                                        <div key={index} className="mb-2 p-2 border rounded shadow-xl">
                                            <p className="text-sm font-semibold">variant options: <span className="font-normal">
                                                {variant.variant_options.map(optionId => {
                                                    const option = variantOptions.find(opt => opt.id === optionId);
                                                    const variantType = option ? variantTypes.find(type => type.id === option.variant_type) : null;
                                                    return option && variantType ? `${variantType.name}: ${option.option_value}` : '';
                                                }).join(', ')}
                                            </span></p>
                                            <p className="text-sm font-semibold">Original Price: <span className="font-normal">₹{variant.original_price}</span></p>
                                            <p className="text-sm font-semibold">Current Price: <span className="font-normal">₹{variant.current_price}</span></p>
                                            <p className="text-sm font-semibold">Price with Offer: <span className="font-normal">₹{variant.price_with_offer}</span></p>
                                            <p className="text-sm font-semibold">Variant data: <span className="font-normal">
                                                {Object.entries(variant.variant_data).map(([key, value]) => `${key}: ${value}`).join(', ')}
                                            </span></p>
                                            <p className="text-sm font-semibold">Stock: <span className="font-normal">{variant.stock}</span></p>
                                        </div>
                                    ))}
                                </div>
                                <hr className="mb-4" />
                                <div className="flex justify-between items-center">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-red-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                    </label>
                                    <div>
                                        <button className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded mr-2 text-3xl" onClick={() => handleEditProduct(product)}><FaRegEdit /></button>
                                        <button className="text-red-500 hover:text-red-700 px-2 py-1 rounded text-3xl"><MdDeleteForever /></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center">
                            No products available
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}
