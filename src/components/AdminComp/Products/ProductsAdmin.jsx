import { useState, useEffect } from "react"; // Removed 'React' import as it's not needed with Vite's JSX runtime
import AdminHeader from "../Header/AdminHeader";
import {
  FaBars,
  FaCog,
  FaRegEdit,
  FaSignOutAlt,
  FaTimes,
  FaUserCircle,FaPlus 
} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  getPrimaryCategories,
  getSecondaryCategories,
  getTertiaryCategories,
} from "../../../actions/adminactions/categories/categoriesactions";
import { createProduct } from "../../../actions/adminactions/products/productsaction";
export default function ProductsAdmin() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [showEditProductPopup, setShowEditProductPopup] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState("");
  const [showVariants, setShowVariants] = useState(false);
 const [productInfo, setProductInfo] = useState({
  name: '',
  brand: '',
  description: '',
  basePrice: '',
  baseStock: '',
  fragrance: '',
  specifications: '',
  careAndMaintenance: '',
  warranty: '',
  isActive: true,
  qna: []
});
  const [editProductInfo, setEditProductInfo] = useState({
    id: null,
    name: "",
    description: "",
    category: null,
    sku: "",
    original_price: "",
    current_price: "",
    price_with_offer: null,
    size: "",
    weight: "",
    burning_time: "",
    color: "",
    fragrance: "",
    in_the_box: "",
    stock: null,
    tags: "",
    image_url: "",
    variants: [
      {
        variant_options: [],
        original_price: "",
        current_price: "",
        price_with_offer: "",
        variant_data: {},
        stock: null,
        variant_type: "",
        option_value: "",
      },
    ],
  });
  const [products, setProducts] = useState({});
  const [variantTypes, setVariantTypes] = useState([]);
  const [variantOptions, setVariantOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [newVariantType, setNewVariantType] = useState("");
  const [showAddVariantTypeAdd, setShowAddVariantTypeAdd] = useState([]);
  const [showAddVariantTypeEdit, setShowAddVariantTypeEdit] = useState([]);
  const [mainCategory, setMainCategory] = useState("");
  const [childrenCategory, setChildrenCategory] = useState("");
  const [allSecondaryCategories, setAllSecondaryCategories] = useState([]);
  const [error, setError] = useState(null);
  const [primaryCategories, setPrimaryCategories] = useState([]);
  const [secondaryCategories, setSecondaryCategories] = useState([]);
  const [tertiaryCategories, setTertiaryCategories] = useState([]);

  // State for selected values
  const [selectedPrimary, setSelectedPrimary] = useState("");
  const [selectedSecondary, setSelectedSecondary] = useState("");
  const [selectedTertiary, setSelectedTertiary] = useState("");

  // State for loading and errors
  const [isLoading, setIsLoading] = useState(false);
    const [mainImages, setMainImages] = useState([]);

const [variants, setVariants] = useState([
  { 
    color: '', 
    size: '', 
    price: '', 
    stock: '', 
    images: [] // Now supports multiple images
  }
]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch primary categories on component mount
  useEffect(() => {
    const fetchPrimaryCategories = async () => {
      setIsLoading(true);
      try {
        const response = await getPrimaryCategories();
        // Handle different response structures
        const data = response.data || response;
        setPrimaryCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load primary categories");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrimaryCategories();
  }, []);

  // Fetch secondary categories when primary is selected
  useEffect(() => {
    if (!selectedPrimary) {
      setSecondaryCategories([]);
      setSelectedSecondary("");
      return;
    }

    const fetchSecondaryCategories = async () => {
      setIsLoading(true);
      try {
        const response = await getSecondaryCategories(selectedPrimary);
        const data = response.data || response;
        setSecondaryCategories(Array.isArray(data) ? data : []);
        setSelectedSecondary(""); // Reset secondary selection
      } catch (err) {
        setError("Failed to load secondary categories");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSecondaryCategories();
  }, [selectedPrimary]);

  // Fetch tertiary categories when secondary is selected
  useEffect(() => {
    if (!selectedSecondary) {
      setTertiaryCategories([]);
      setSelectedTertiary("");
      return;
    }

    const fetchTertiaryCategories = async () => {
      setIsLoading(true);
      try {
        const response = await getTertiaryCategories(selectedSecondary);
        const data = response.data || response;
        setTertiaryCategories(Array.isArray(data) ? data : []);
        setSelectedTertiary(""); // Reset tertiary selection
      } catch (err) {
        setError("Failed to load tertiary categories");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTertiaryCategories();
  }, [selectedSecondary]);










  // Form submission handler

  
  const validateImage = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!validTypes.includes(file.type)) {
    return 'Invalid file type. Only JPEG, PNG, and WebP are allowed.';
  }
  
  if (file.size > maxSize) {
    return 'File size too large. Maximum 5MB allowed.';
  }
  
  return null;
};
  
  // Helper function to reset the form

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
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((productId) => productId !== id)
        : [...prev, id]
    );
  };

  const handleAddProduct = () => setShowAddProductPopup(true);

  const handleEditProduct = (product) => {
    setEditProductInfo({
      ...product,
      variants: product.variants.map((variant) => ({
        ...variant,
        variant_type: variant.variant_type || "",
        option_value: variant.option_value || "",
        variant_options: variant.variant_options || [],
        original_price: variant.original_price || "",
        current_price: variant.current_price || "",
        price_with_offer: variant.price_with_offer || "",
        variant_data: variant.variant_data || {},
        stock: variant.stock || null,
      })),
    });
    setShowEditProductPopup(true);
  };


  

  

  

  

  const handleEditProductInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditProductInfo((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "category"
          ? parseInt(value) || null
          : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
  
    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('images', file);
      });
  
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...adminConfig.headers
        }
      });
  
      // Update your state with the uploaded image URLs
      setProductInfo(prev => ({
        ...prev,
        images: [...prev.images, ...response.data.urls]
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  }



  
  


  const handleEditVariantChange = (index, field, value, subField) => {
    const updatedVariants = editProductInfo.variants.map((variant, i) => {
      if (i === index) {
        if (subField) {
          return {
            ...variant,
            [field]: {
              ...variant[field],
              [subField]: value,
            },
          };
        }
        return { ...variant, [field]: value };
      }
      return variant;
    });
    setEditProductInfo((prev) => ({ ...prev, variants: updatedVariants }));
  };

  const handleFilterByCategory = (categoryId) => {
    const filteredProduct = (products.results || []).filter(
      (product) => product.category_id === categoryId
    );
    setFilteredProducts(filteredProduct);
  };

  const handleAddVariantType = (modalType, index) => {
    if (newVariantType.trim()) {
      if (
        !variantTypes.some(
          (type) => type.name.toLowerCase() === newVariantType.toLowerCase()
        )
      ) {
        const newType = { id: Date.now(), name: newVariantType };
        setVariantTypes((prev) => [...prev, newType]);
      }
      setNewVariantType("");
      if (modalType === "add") {
        setShowAddVariantTypeAdd((prev) => {
          const newState = [...prev];
          newState[index] = false;
          return newState;
        });
      } else {
        setShowAddVariantTypeEdit((prev) => {
          const newState = [...prev];
          newState[index] = false;
          return newState;
        });
      }
    }
  };

  const toggleAddVariantTypeAdd = (index) => {
    setShowAddVariantTypeAdd((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
    setNewVariantType("");
  };

  const toggleAddVariantTypeEdit = (index) => {
    setShowAddVariantTypeEdit((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
    setNewVariantType("");
  };


  // new
const handleVariantChange = (index, field, value) => {
  const updatedVariants = [...variants];
  updatedVariants[index][field] = value;
  setVariants(updatedVariants);
};
  const handleProductInfoChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleMainImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      alert('Maximum 4 main images allowed');
      return;
    }
    setMainImages(files);
  };

  const handleVariantImageUpload = (variantIndex, e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      alert('Maximum 10 images per variant allowed');
      return;
    }
    
    setVariants(prev => prev.map((v, i) => 
      i === variantIndex ? { ...v, images: files } : v
    ));
  };

const handleVariantImageChange = (variantIndex, files) => {
  const updatedVariants = [...variants];
  updatedVariants[variantIndex].images = Array.from(files);
  setVariants(updatedVariants);
};

  const addVariant = () => {
    setVariants([...variants, { color: '', size: '', price: '', stock: '', images: [] }]);
  };

  const removeVariant = (index) => {
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== index));
    }
  };

  const addQna = () => {
    setProductInfo({
      ...productInfo,
      qna: [...productInfo.qna, { question: '', answer: '' }]
    });
  };

  const handleQnaChange = (index, field, value) => {
    const updatedQna = [...productInfo.qna];
    updatedQna[index][field] = value;
    setProductInfo({ ...productInfo, qna: updatedQna });
  };

  const removeQna = (index) => {
    setProductInfo({
      ...productInfo,
      qna: productInfo.qna.filter((_, i) => i !== index)
    });
  };

  // Form Submission

const handleSubmitProduct = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);

  try {

    const requiredFields = {
      name: productInfo.name?.trim(),
      description: productInfo.description?.trim(),
      brand: productInfo.brand?.trim(),
      basePrice: Number(productInfo.basePrice),
      baseStock: Number(productInfo.baseStock),
      isActive: productInfo.isActive !== undefined ? productInfo.isActive : true,
      primaryCategory: selectedPrimary,
      careAndMaintenance: productInfo.careAndMaintenance?.trim(),
      warranty: productInfo.warranty?.trim(),
      // These might be required by your API
      specifications: productInfo.specifications?.trim() || '',
      fragrance: productInfo.fragrance?.trim() || ''
    };


    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => {
        // Special handling for numbers
        if (key === 'basePrice' || key === 'baseStock') {
          return isNaN(value) || value === '';
        }
        return value === undefined || value === null || value === '';
      })
      .map(([key]) => key);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // 2. Image validation
    if (mainImages.length === 0) {
      throw new Error('At least one main image is required');
    }


    const formData = new FormData();

    
    const productData = {
      ...requiredFields,
     
      secondaryCategory: selectedSecondary || '',
      tertiaryCategory: selectedTertiary || '',
      qna: productInfo.qna?.length > 0 ? productInfo.qna : []
    };


    if (showVariants && variants.length > 0) {
      productData.variants = variants.map(variant => ({
        color: variant.color || '',
        size: variant.size || '',
        price: Number(variant.price) || 0,
        stock: Number(variant.stock) || 0,
        
        variantImages: variant.images?.map(img => img.name) || []
      }));

   
      variants.forEach(variant => {
        variant.images?.forEach(img => {
          formData.append('variantImages', img);
        });
      });
    }

  
    mainImages.forEach(img => {
      if (img.size > 5 * 1024 * 1024) {
        throw new Error(`Image ${img.name} is too large (max 5MB)`);
      }
      formData.append('images', img);
    });

    Object.entries(productData).forEach(([key, value]) => {
  if (key === 'qna' || key === 'variants') {
    formData.append(key, JSON.stringify(value));
  } else {
    formData.append(key, value);
  }
});

    console.log('Final payload:', {
      ...productData,
      images: mainImages.map(img => img.name),
      variants: productData.variants?.map(v => ({
        ...v,
        variantImages: v.variantImages
      }))
    });

    const result = await createProduct(formData);
    console.log('Product created successfully:', result);
    setShowAddProductPopup(false);

  } catch (err) {
    console.error('Submission error:', err);
    setError(err.message.includes('Missing required fields') 
      ? `Please fill all required fields: ${err.message}` 
      : err.message);
  } finally {
    setIsSubmitting(false);
  }
};



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
              Products Management
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
                  to="/admin/AdminSignin"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
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
                  selectedProducts.length > 0
                    ? "bg-red-900 hover:bg-red-700"
                    : "bg-red-300"
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
                {categories.map((category) => (
                  <React.Fragment key={category.id}>
                    <option value={category.id}>{category.name}</option>
                    {category.subcategories.map((subcategory) => (
                      <React.Fragment key={subcategory.id}>
                        <option value={subcategory.id}>
                          — {subcategory.name}
                        </option>
                        {subcategory.subcategories.map((subSubcategory) => (
                          <option
                            key={subSubcategory.id}
                            value={subSubcategory.id}
                          >
                            —— {subSubcategory.name}
                          </option>
                        ))}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </select>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors">
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
              products.results.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-900 truncate">
                        {product.name}
                      </h2>
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
                      <p className="line-clamp-2">
                        <span className="font-medium text-gray-900">
                          Description:
                        </span>{" "}
                        {product.description}
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">
                          Category:
                        </span>{" "}
                        {product.category}
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">SKU:</span>{" "}
                        {product.sku}
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">
                          Original Price:
                        </span>{" "}
                        ₹{product.original_price}
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">
                          Current Price:
                        </span>{" "}
                        ₹{product.current_price}
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">
                          Stock:
                        </span>{" "}
                        {product.stock}
                      </p>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">
                        Variants
                      </h3>
                      {product.variants.map((variant, index) => (
                        <div
                          key={index}
                          className="mb-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-600"
                        >
                          <p>
                            <span className="font-medium text-gray-900">
                              Options:
                            </span>
                            {variant.variant_options
                              .map((optionId) => {
                                const option = variantOptions.find(
                                  (opt) => opt.id === optionId
                                );
                                const variantType = option
                                  ? variantTypes.find(
                                      (type) => type.id === option.variant_type
                                    )
                                  : null;
                                return option && variantType
                                  ? `${variantType.name}: ${option.option_value}`
                                  : "";
                              })
                              .join(", ")}
                          </p>
                          <p>
                            <span className="font-medium text-gray-900">
                              Original Price:
                            </span>{" "}
                            ₹{variant.original_price}
                          </p>
                          <p>
                            <span className="font-medium text-gray-900">
                              Current Price:
                            </span>{" "}
                            ₹{variant.current_price}
                          </p>
                          <p>
                            <span className="font-medium text-gray-900">
                              Price with Offer:
                            </span>{" "}
                            ₹{variant.price_with_offer || "N/A"}
                          </p>
                          <p>
                            <span className="font-medium text-gray-900">
                              Data:
                            </span>
                            {Object.entries(variant.variant_data)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(", ")}
                          </p>
                          <p>
                            <span className="font-medium text-gray-900">
                              Stock:
                            </span>{" "}
                            {variant.stock}
                          </p>
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
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors">
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
                <h2 className="text-2xl font-bold text-gray-900">
                  Add New Product
                </h2>
                <button
                  onClick={() => setShowAddProductPopup(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              <form className="space-y-6" onSubmit={ handleSubmitProduct}>
  {/* Basic Information */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Product Name *
      </label>
      <input
        type="text"
        name="name"
        value={productInfo.name || ""}
        onChange={handleProductInfoChange}
        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Brand *
      </label>
      <input
        type="text"
        name="brand"
        value={productInfo.brand || ""}
        onChange={handleProductInfoChange}
        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
        required
      />
    </div>
  </div>

  {/* Description */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Description *
    </label>
    <textarea
      name="description"
      value={productInfo.description || ""}
      onChange={handleProductInfoChange}
      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
      rows="4"
      required
    />
  </div>

  {/* Base Price and Stock */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Base Price *
      </label>
      <input
        type="number"
        name="basePrice"
        value={productInfo.basePrice || ""}
        onChange={handleProductInfoChange}
        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Base Stock *
      </label>
      <input
        type="number"
        name="baseStock"
        value={productInfo.baseStock || ""}
        onChange={handleProductInfoChange}
        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
        required
      />
    </div>
  </div>

  {/* Additional Information */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Fragrance (Optional)
      </label>
      <input
        type="text"
        name="fragrance"
        value={productInfo.fragrance || ""}
        onChange={handleProductInfoChange}
        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Specifications (Optional)
      </label>
      <input
        type="text"
        name="specifications"
        value={productInfo.specifications || ""}
        onChange={handleProductInfoChange}
        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
      />
    </div>
  </div>

  {/* Care and Maintenance */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Care and Maintenance *
    </label>
    <textarea
      name="careAndMaintenance"
      value={productInfo.careAndMaintenance || ""}
      onChange={handleProductInfoChange}
      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
      rows="3"
      required
    />
  </div>

  {/* Warranty */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Warranty Details *
    </label>
    <input
      type="text"
      name="warranty"
      value={productInfo.warranty || ""}
      onChange={handleProductInfoChange}
      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
      required
    />
  </div>

  {/* Active Status */}
  <div className="flex items-center">
    <input
      type="checkbox"
      name="isActive"
      checked={productInfo.isActive !== false}
      onChange={(e) => setProductInfo({...productInfo, isActive: e.target.checked})}
      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    />
    <label className="ml-2 block text-sm text-gray-700">
      Product is active
    </label>
  </div>

  {/* Categories */}
  <div className="space-y-4">
    {/* Primary Category Dropdown */}
    <div className="flex gap-4 items-center">
      <span className="w-1/2 px-4 py-2 text-gray-700">
        Main category *
      </span>
      <select
        value={selectedPrimary}
        onChange={(e) => setSelectedPrimary(e.target.value)}
        className="w-1/2 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
        required
      >
        <option value="">Select Main Category</option>
        {primaryCategories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>

    {/* Secondary Category Dropdown */}
    {selectedPrimary && (
      <div className="flex gap-4 items-center">
        <span className="w-1/2 px-4 py-2 text-gray-700">
          Children category
        </span>
        <select
          value={selectedSecondary}
          onChange={(e) => setSelectedSecondary(e.target.value)}
          className="w-1/2 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
        >
          <option value="">Select Children Category</option>
          {secondaryCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    )}

    {/* Tertiary Category Dropdown */}
    {selectedSecondary && (
      <div className="flex gap-4 items-center">
        <span className="w-1/2 px-4 py-2 text-gray-700">
          Sub Children category
        </span>
        <select
          value={selectedTertiary}
          onChange={(e) => setSelectedTertiary(e.target.value)}
          className="w-1/2 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
        >
          <option value="">Select Sub Children Category</option>
          {tertiaryCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    )}
   <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Main Product Images (Max 4)
        </label>
        <input
          type="file"
          multiple
          accept=".jpeg,.webp,.png,.jpg"
          onChange={handleMainImageUpload}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-600"
        />
      </div>
  </div>

  {/* Q&A Section */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Product Q&A (Optional)
    </label>
    {productInfo.qna?.map((item, index) => (
      <div key={index} className="mb-4 p-3 border rounded-lg">
        <input
          type="text"
          placeholder="Question"
          value={item.question}
          onChange={(e) => handleQnaChange(index, 'question', e.target.value)}
          className="w-full mb-2 px-4 py-2 border border-gray-200 rounded-lg"
        />
        <input
          type="text"
          placeholder="Answer"
          value={item.answer}
          onChange={(e) => handleQnaChange(index, 'answer', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg"
        />
        <button
          type="button"
          onClick={() => removeQna(index)}
          className="mt-2 text-red-500 text-sm"
        >
          Remove
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={addQna}
      className="text-indigo-600 text-sm"
    >
      + Add Question & Answer
    </button>
  </div>

  {/* Variants Section */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Enable Variants
    </label>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={showVariants}
        onChange={() => setShowVariants((prev) => !prev)}
        className="sr-only peer"
      />
      <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
    </label>
  </div>

  {showVariants && (
    <div className="space-y-4">
      {variants.map((variant, index) => (
        <div key={index} className="border p-4 rounded-lg relative">
          {variants.length > 1 && (
            <button
              type="button"
              onClick={() => removeVariant(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <FaTimes />
            </button>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <input
                type="text"
                value={variant.color}
              onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <input
                type="text"
                value={variant.size}
                onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                value={variant.price}
                onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                value={variant.stock}
                onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
              />
            </div>
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Variant Images
            </label>
            <input
              type="file"
              multiple
              accept=".jpeg,.webp,.png,.jpg"
               onChange={(e) => handleVariantImageChange(index, e.target.files)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-600"
            />
          </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addVariant}
        className="flex items-center justify-center w-full py-2 px-4 border border-dashed border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <FaPlus className="mr-2" />
        Add Another Variant
      </button>
    </div>
  )}

  {/* Form Actions */}
 <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={() => setShowAddProductPopup(false)}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Add Product'
          )}
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
                <h2 className="text-2xl font-bold text-gray-900">
                  Edit Product
                </h2>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editProductInfo.name || ""}
                      onChange={handleEditProductInfoChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SKU
                    </label>
                    <input
                      type="text"
                      name="sku"
                      value={editProductInfo.sku || ""}
                      onChange={handleEditProductInfoChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editProductInfo.description || ""}
                    onChange={handleEditProductInfoChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    rows="4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept=".jpeg,.webp,.png,.jpg"
                    onChange={handleEditImageUpload}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="number"
                    name="category"
                    value={editProductInfo.category || ""}
                    onChange={handleEditProductInfoChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Original Price
                    </label>
                    <input
                      type="text"
                      name="original_price"
                      value={editProductInfo.original_price || ""}
                      onChange={handleEditProductInfoChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Price
                    </label>
                    <input
                      type="text"
                      name="current_price"
                      value={editProductInfo.current_price || ""}
                      onChange={handleEditProductInfoChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="text"
                      name="stock"
                      value={editProductInfo.stock || ""}
                      onChange={handleEditProductInfoChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size
                    </label>
                    <input
                      type="text"
                      name="size"
                      value={editProductInfo.size || ""}
                      onChange={handleEditProductInfoChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight
                    </label>
                    <input
                      type="text"
                      name="weight"
                      value={editProductInfo.weight || ""}
                      onChange={handleEditProductInfoChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Burning Time
                    </label>
                    <input
                      type="text"
                      name="burning_time"
                      value={editProductInfo.burning_time || ""}
                      onChange={handleEditProductInfoChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color
                    </label>
                    <input
                      type="text"
                      name="color"
                      value={editProductInfo.color || ""}
                      onChange={handleEditProductInfoChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fragrance
                    </label>
                    <input
                      type="text"
                      name="fragrance"
                      value={editProductInfo.fragrance || ""}
                      onChange={handleEditProductInfoChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      In the Box
                    </label>
                    <input
                      type="text"
                      name="in_the_box"
                      value={editProductInfo.in_the_box || ""}
                      onChange={handleEditProductInfoChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={editProductInfo.tags || ""}
                    onChange={handleEditProductInfoChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Variants
                  </label>
                  <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                    {editProductInfo.variants.map((variant, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white rounded-lg shadow-sm"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Variant Type
                              </label>
                              <select
                                name={`variant_type_${index}`}
                                value={variant.variant_type || ""}
                                onChange={(e) =>
                                  handleEditVariantChange(
                                    index,
                                    "variant_type",
                                    e.target.value
                                  )
                                }
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                              >
                                <option value="">Select Variant Type</option>
                                {variantTypes.map((type) => (
                                  <option key={type.id} value={type.name}>
                                    {type.name}
                                  </option>
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
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Option Value
                              </label>
                              <input
                                type="text"
                                name={`option_value_${index}`}
                                value={variant.option_value || ""}
                                onChange={(e) =>
                                  handleEditVariantChange(
                                    index,
                                    "option_value",
                                    e.target.value
                                  )
                                }
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                              />
                            </div>
                          )}
                        </div>
                        {showAddVariantTypeEdit[index] && (
                          <div className="mt-4 space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                New Variant Type Name
                              </label>
                              <input
                                type="text"
                                value={newVariantType}
                                onChange={(e) =>
                                  setNewVariantType(e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                placeholder="Enter variant type name"
                              />
                            </div>
                            <div className="flex justify-end gap-4">
                              <button
                                type="button"
                                onClick={() => {
                                  setNewVariantType("");
                                  setShowAddVariantTypeEdit((prev) => {
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
                                onClick={() =>
                                  handleAddVariantType("edit", index)
                                }
                                disabled={!newVariantType.trim()}
                                className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                                  newVariantType.trim()
                                    ? "bg-indigo-600 hover:bg-indigo-700"
                                    : "bg-indigo-300 cursor-not-allowed"
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Original Price
                                </label>
                                <input
                                  type="text"
                                  name={`original_price_${index}`}
                                  value={variant.original_price || ""}
                                  onChange={(e) =>
                                    handleEditVariantChange(
                                      index,
                                      "original_price",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Current Price
                                </label>
                                <input
                                  type="text"
                                  name={`current_price_${index}`}
                                  value={variant.current_price || ""}
                                  onChange={(e) =>
                                    handleEditVariantChange(
                                      index,
                                      "current_price",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Price with Offer
                                </label>
                                <input
                                  type="text"
                                  name={`price_with_offer_${index}`}
                                  value={variant.price_with_offer || ""}
                                  onChange={(e) =>
                                    handleEditVariantChange(
                                      index,
                                      "price_with_offer",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                />
                              </div>
                            </div>
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Variant Data
                              </label>
                              {variantTypes.map((type) => (
                                <div key={type.id} className="mt-2">
                                  <label className="block text-sm text-gray-600 mb-1">
                                    {type.name}
                                  </label>
                                  <input
                                    type="text"
                                    name={`variant_data_${type.name}_${index}`}
                                    value={
                                      variant.variant_data[type.name] || ""
                                    }
                                    onChange={(e) =>
                                      handleEditVariantChange(
                                        index,
                                        "variant_data",
                                        e.target.value,
                                        type.name
                                      )
                                    }
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Stock
                              </label>
                              <input
                                type="number"
                                name={`stock_${index}`}
                                value={variant.stock || ""}
                                onChange={(e) =>
                                  handleEditVariantChange(
                                    index,
                                    "stock",
                                    e.target.value
                                  )
                                }
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
