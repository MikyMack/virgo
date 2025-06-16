import React, { useState, useEffect } from "react";
import AdminHeader from "../Header/AdminHeader";
import {
  FaBars,
  FaCog,
  FaRegEdit,
  FaSignOutAlt,
  FaTimes,
  FaUserCircle,
  FaPlus
} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  getPrimaryCategories,
  getSecondaryCategories,
  getTertiaryCategories,
} from "../../../actions/adminactions/categories/categoriesactions";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  getAllProducts,
  getProductById
} from "../../../actions/adminactions/products/productsaction";

export default function ProductsAdmin() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [showEditProductPopup, setShowEditProductPopup] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
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
  const [products, setProducts] = useState([]);
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
  const [selectedPrimary, setSelectedPrimary] = useState("");
  const [selectedSecondary, setSelectedSecondary] = useState("");
  const [selectedTertiary, setSelectedTertiary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mainImages, setMainImages] = useState([]);
  const [variants, setVariants] = useState([
    {
      color: '',
      size: '',
      price: '',
      stock: '',
      images: []
    }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await getAllProducts();
      setProducts(response.products || response);
      console.log(products, "FdFdfdsFds");

    } catch (error) {
      setError("Failed to fetch products");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch primary categories on component mount
  useEffect(() => {
    const fetchPrimaryCategories = async () => {
      setIsLoading(true);
      try {
        const response = await getPrimaryCategories();
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
        setSelectedSecondary("");
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
        setSelectedTertiary("");
      } catch (err) {
        setError("Failed to load tertiary categories");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTertiaryCategories();
  }, [selectedSecondary]);

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

  const handleEditImageUpload = async (e) => {
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
          _isAdmin: true
        }
      });

      setProductInfo(prev => ({
        ...prev,
        images: [...prev.images, ...response.data.urls]
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  }

  const handleFilterByCategory = (categoryId) => {
    const filteredProduct = products.filter(
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



  const removeQna = (index) => {
    setProductInfo({
      ...productInfo,
      qna: productInfo.qna.filter((_, i) => i !== index)
    });
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();

      // Append all product info fields
      Object.entries({
        name: productInfo.name,
        description: productInfo.description,
        brand: productInfo.brand,
        basePrice: productInfo.basePrice,
        baseStock: productInfo.baseStock,
        isActive: productInfo.isActive,
        primaryCategory: selectedPrimary,
        secondaryCategory: selectedSecondary || '',
        tertiaryCategory: selectedTertiary || '',
        fragrance: productInfo.fragrance || '',
        specifications: productInfo.specifications || '',
        careAndMaintenance: productInfo.careAndMaintenance || '',
        warranty: productInfo.warranty || '',
        qna: JSON.stringify(productInfo.qna || []),
        variants: JSON.stringify(
          showVariants
            ? variants.map(v => ({
              color: v.color,
              size: v.size,
              price: v.price,
              stock: v.stock
            }))
            : []
        )
      }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append main images
      mainImages.forEach((img, i) => {
        formData.append('images', img);
      });

      // Append variant images
      variants.forEach((variant, i) => {
        variant.images.forEach((img, j) => {
          formData.append('variantImages', img);
        });
      });

      const result = await createProduct(formData);
      console.log('Product created successfully:', result);
      setShowAddProductPopup(false);
      fetchProducts(); // Refresh the products list
      // Reset form
      setProductInfo({
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
      setVariants([{ color: '', size: '', price: '', stock: '', images: [] }]);
      setMainImages([]);
      setSelectedPrimary('');
      setSelectedSecondary('');
      setSelectedTertiary('');
    } catch (error) {
      console.error('Submission error:', error);
      setError(error.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  // edit

// Fixed handleEditProduct function
// Fixed handleEditProduct function
const handleEditProductSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);

  try {
    // Validate required fields
    if (!editProductInfo.name?.trim()) {
      throw new Error('Product name is required');
    }

    // Validate variants
    if (!editProductInfo.variants || editProductInfo.variants.length === 0) {
      throw new Error('At least one variant is required');
    }

    const formData = new FormData();

    // Prepare variants data - simplified to match create format
    const variantsData = editProductInfo.variants.map((variant, index) => {
      // Validate variant fields
      const price = Number(variant.price);
      const stock = Number(variant.stock);
      
      if (!price || isNaN(price) || price <= 0) {
        throw new Error(`Invalid price for variant ${index + 1}. Price must be greater than 0.`);
      }
      if (isNaN(stock) || stock < 0) {
        throw new Error(`Invalid stock for variant ${index + 1}. Stock must be 0 or greater.`);
      }

      return {
        color: variant.color?.trim() || '',
        size: variant.size?.trim() || '',
        price: price,
        stock: stock,
        existingImages: variant.existingImages || [],
        imagesToDelete: variant.imagesToDelete || []
      };
    });

    // Append product data - matching your create format
    const productData = {
      name: editProductInfo.name.trim(),
      description: editProductInfo.description?.trim() || '',
      brand: editProductInfo.brand?.trim() || '',
      basePrice: Number(editProductInfo.basePrice) || 0,
      baseStock: Number(editProductInfo.baseStock) || 0,
      isActive: editProductInfo.isActive !== false,
      primaryCategory: selectedPrimary,
      secondaryCategory: selectedSecondary || '',
      tertiaryCategory: selectedTertiary || '',
      fragrance: editProductInfo.fragrance?.trim() || '',
      specifications: editProductInfo.specifications?.trim() || '',
      careAndMaintenance: editProductInfo.careAndMaintenance?.trim() || '',
      warranty: editProductInfo.warranty?.trim() || '',
      qna: JSON.stringify(editProductInfo.qna || []),
      variants: JSON.stringify(variantsData),
      existingMainImages: JSON.stringify(editProductInfo.existingMainImages || []),
      mainImagesToDelete: JSON.stringify(editProductInfo.mainImagesToDelete || [])
    };

    // Append all product data fields exactly like create function
    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    // Append main images exactly like create function (using 'images' key)
    if (editProductInfo.mainImages && editProductInfo.mainImages.length > 0) {
      editProductInfo.mainImages.forEach((file) => {
        formData.append('images', file);
      });
    }

    // Append variant images exactly like create function (using 'variantImages' key)
    editProductInfo.variants.forEach((variant, variantIndex) => {
      if (variant.images && variant.images.length > 0) {
        variant.images.forEach((file) => {
          formData.append('variantImages', file);
        });
      }
    });

    // Add variant index mapping for backend to know which image belongs to which variant
    const variantImageIndexes = [];
    editProductInfo.variants.forEach((variant, variantIndex) => {
      if (variant.images && variant.images.length > 0) {
        variant.images.forEach(() => {
          variantImageIndexes.push(variantIndex);
        });
      }
    });
    
    if (variantImageIndexes.length > 0) {
      formData.append('variantImageIndexes', JSON.stringify(variantImageIndexes));
    }

    // Log formData for debugging
    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // Send to API
    const result = await updateProduct(editProductInfo._id, formData);
    
    console.log('Product updated successfully:', result);
    setShowEditProductPopup(false);
    await fetchProducts();
    setError(null);
    toast.success('Product updated successfully!');
    
  } catch (error) {
    console.error('Update error:', error);
    const errorMessage = error?.response?.data?.message || error?.message || 'Failed to update product';
    setError(errorMessage);
    toast.error(errorMessage);
  } finally {
    setIsSubmitting(false);
  }
};
const handleEditProduct = async (product) => {
  try {
    const response = await getProductById(product._id);
    const productData = response.product || response;

    // Convert variants to the format expected by your form
    const formattedVariants = productData.variants?.map(variant => {
      let existingImages = [];
      
      if (variant.images && Array.isArray(variant.images)) {
        existingImages = variant.images;
      } else if (variant.image && typeof variant.image === 'string') {
        existingImages = [variant.image];
      }

      return {
        color: variant.color || '',
        size: variant.size || '',
        price: variant.price || 0,
        stock: variant.stock || 0,
        images: [], // New images to upload
        existingImages: existingImages, // Current images from server
        imagesToDelete: [] // Track deleted variant images
      };
    }) || [];

    // If no variants exist, create one default variant
    if (formattedVariants.length === 0) {
      formattedVariants.push({
        color: '', 
        size: '', 
        price: 0, 
        stock: 0, 
        images: [], 
        existingImages: [],
        imagesToDelete: []
      });
    }

    const originalMainImages = productData.images || [];

    setEditProductInfo({
      ...productData,
      variants: formattedVariants,
      showVariants: productData.variants?.length > 0,
      existingMainImages: [...originalMainImages], // Current images (will be modified)
      originalMainImages: [...originalMainImages], // Store original for reference
      mainImages: [], // Changed from null to empty array
      mainImagesToDelete: [] // Track deleted main images
    });

    // Set category selections
    setSelectedPrimary(productData.primaryCategory?._id || '');
    setSelectedSecondary(productData.secondaryCategory?._id || '');
    setSelectedTertiary(productData.tertiaryCategory?._id || '');

    setShowEditProductPopup(true);
  } catch (error) {
    setError("Failed to fetch product details");
    console.error(error);
    toast.error("Failed to fetch product details");
  }
};

// Fixed main image upload handler
const handleEditMainImageUpload = (e) => {
  const files = Array.from(e.target.files);
  const currentImageCount = (editProductInfo.existingMainImages?.length || 0) + files.length;
  
  if (currentImageCount > 4) {
    alert('Maximum 4 main images allowed');
    e.target.value = ''; // Clear the input
    return;
  }
  
  setEditProductInfo(prev => ({ 
    ...prev, 
    mainImages: [...(prev.mainImages || []), ...files] 
  }));
  
  // Clear the input after processing
  e.target.value = '';
};

// Fixed variant image change handler
const handleEditVariantImageChange = (variantIndex, files) => {
  const filesArray = Array.from(files);
  if (filesArray.length === 0) return;

  setEditProductInfo(prev => {
    const updatedVariants = [...prev.variants];
    updatedVariants[variantIndex] = {
      ...updatedVariants[variantIndex],
      images: filesArray // Replace with new images
    };
    
    return { ...prev, variants: updatedVariants };
  });
};

// Fixed remove variant image function
const removeEditVariantImage = (variantIndex, imageIndex, isExistingImage) => {
  setEditProductInfo(prev => {
    const updatedVariants = [...prev.variants];
    
    if (isExistingImage) {
      // For existing image (from server)
      const imageToDelete = updatedVariants[variantIndex].existingImages[imageIndex];
      updatedVariants[variantIndex] = {
        ...updatedVariants[variantIndex],
        existingImages: updatedVariants[variantIndex].existingImages.filter((_, idx) => idx !== imageIndex),
        imagesToDelete: [
          ...(updatedVariants[variantIndex].imagesToDelete || []),
          imageToDelete
        ]
      };
    } else {
      // For new image (not yet saved)
      updatedVariants[variantIndex] = {
        ...updatedVariants[variantIndex],
        images: updatedVariants[variantIndex].images.filter((_, idx) => idx !== imageIndex)
      };
    }
    
    return { ...prev, variants: updatedVariants };
  });
};

// Fixed remove main image function
const removeEditMainImage = (indexToRemove, isExistingImage = true) => {
  setEditProductInfo(prev => {
    if (isExistingImage) {
      // Removing existing image
      const imageToDelete = prev.existingMainImages[indexToRemove];
      return {
        ...prev,
        existingMainImages: prev.existingMainImages.filter((_, index) => index !== indexToRemove),
        mainImagesToDelete: [...(prev.mainImagesToDelete || []), imageToDelete]
      };
    } else {
      // Removing new image that hasn't been uploaded yet
      return {
        ...prev,
        mainImages: (prev.mainImages || []).filter((_, index) => index !== indexToRemove)
      };
    }
  });
};

// Fixed add variant function
const addEditVariant = () => {
  setEditProductInfo(prev => ({
    ...prev,
    variants: [
      ...prev.variants,
      { 
        color: '', 
        size: '', 
        price: 0, 
        stock: 0, 
        images: [], 
        existingImages: [],
        imagesToDelete: []
      }
    ]
  }));
};

// Fixed remove variant function
const removeEditVariant = (index) => {
  if (editProductInfo.variants.length > 1) {
    setEditProductInfo(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  } else {
    alert("At least one variant is required");
  }
};

// Fixed submit function - now matches your create product format exactly

// delete
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      setError('Failed to delete product');
      console.error(error);
    }
  };

  const handleToggleProductStatus = async (id) => {
    try {
      await toggleProductStatus(id);
      fetchProducts();
    } catch (error) {
      setError('Failed to toggle product status');
      console.error(error);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0 || !window.confirm('Are you sure you want to delete the selected products?')) {
      return;
    }

    try {
      // Delete products in parallel
      await Promise.all(selectedProducts.map(id => deleteProduct(id)));
      setSelectedProducts([]);
      fetchProducts();
    } catch (error) {
      setError('Failed to delete some products');
      console.error(error);
    }
  };



  // ... (rest of your component code remains the same, just update the event handlers)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-xl transform ${menuOpen ? "translate-x-0" : "-translate-x-full"
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
                onClick={handleBulkDelete}
                className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${selectedProducts.length > 0
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
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-900 truncate">
                        {product.name}
                      </h2>
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product._id)}
                        onChange={() => handleSelectProduct(product._id)}
                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                    </div>
                    {product.images?.[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="line-clamp-2">
                        <span className="font-medium text-gray-900">
                          Description:
                        </span>{" "}
                        {product.description}
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">
                          PrimaryCategory:
                        </span>{" "}
                        {product.primaryCategory?.name || 'No category'}
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">
                          SecondaryCategory:
                        </span>{" "}
                        {product.secondaryCategory?.name || 'No SecondaryCategory'}
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">
                          TertiaryCategory:
                        </span>{" "}
                        {product.tertiaryCategory?.name || 'No tertiaryCategory'}
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">SKU:</span>{" "}
                        {product._id || 'N/A'}
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">
                          Price:
                        </span>{" "}
                        ₹{product.basePrice}
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">
                          Stock:
                        </span>{" "}
                        {product.baseStock}
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">
                          Brand:
                        </span>{" "}
                        {product.brand}
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">
                          Fragrance:
                        </span>{" "}
                        {product.fragrance}
                      </p>
                      <p className="line-clamp-2">
                        <span className="font-medium text-gray-900">
                          Specifications:
                        </span>{" "}
                        {product.specifications}
                      </p>
                      <p className="line-clamp-2">
                        <span className="font-medium text-gray-900">
                          CareAndMaintenance:
                        </span>{" "}
                        {product.careAndMaintenance}
                      </p>
                      <p className="line-clamp-2">
                        <span className="font-medium text-gray-900">
                          Warranty:
                        </span>{" "}
                        {product.warranty}
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">
                          Status:
                        </span>{" "}
                        {product.isActive ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                    {product.qna?.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-2 mt-2">
                          QnA
                        </h3>
                        {product.qna.map((qa, index) => (
                          <div key={index} className="mb-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                            <p>
                              <span className="font-medium text-gray-900">
                                Question:
                              </span> {qa.question || 'N/A'}
                            </p>
                            <p>
                              <span className="font-medium text-gray-900">
                                Answer:
                              </span> {qa.answer || 'N/A'}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {product.variants?.length > 0 && (
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
                                Color:
                              </span> {variant.color || 'N/A'}
                            </p>
                            <p>
                              <span className="font-medium text-gray-900">
                                Size:
                              </span> {variant.size || 'N/A'}
                            </p>
                            <p>
                              <span className="font-medium text-gray-900">
                                Price:
                              </span> ₹{variant.price}
                            </p>
                            <p>
                              <span className="font-medium text-gray-900">
                                Stock:
                              </span> {variant.stock}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-gray-50 flex justify-between items-center border-t border-gray-100">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={product.isActive}
                        onChange={() => handleToggleProductStatus(product._id)}
                        className="sr-only peer"
                      />
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
                        onClick={() => handleDeleteProduct(product._id)}
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
                {isLoading ? 'Loading products...' : 'No products available'}
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

              <form className="space-y-6" onSubmit={handleSubmitProduct}>
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
                    onChange={(e) => setProductInfo({ ...productInfo, isActive: e.target.checked })}
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
                <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
                <button
                  onClick={() => setShowEditProductPopup(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <form className="space-y-6" onSubmit={handleEditProductSubmit}>
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editProductInfo.name || ""}
                      onChange={(e) => setEditProductInfo({ ...editProductInfo, name: e.target.value })}
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
                      value={editProductInfo.brand || ""}
                      onChange={(e) => setEditProductInfo({ ...editProductInfo, brand: e.target.value })}
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
                    value={editProductInfo.description || ""}
                    onChange={(e) => setEditProductInfo({ ...editProductInfo, description: e.target.value })}
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
                      value={editProductInfo.basePrice || ""}
                      onChange={(e) => setEditProductInfo({ ...editProductInfo, basePrice: e.target.value })}
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
                      value={editProductInfo.baseStock || ""}
                      onChange={(e) => setEditProductInfo({ ...editProductInfo, baseStock: e.target.value })}
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
                      value={editProductInfo.fragrance || ""}
                      onChange={(e) => setEditProductInfo({ ...editProductInfo, fragrance: e.target.value })}
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
                      value={editProductInfo.specifications || ""}
                      onChange={(e) => setEditProductInfo({ ...editProductInfo, specifications: e.target.value })}
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
                    value={editProductInfo.careAndMaintenance || ""}
                    onChange={(e) => setEditProductInfo({ ...editProductInfo, careAndMaintenance: e.target.value })}
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
                    value={editProductInfo.warranty || ""}
                    onChange={(e) => setEditProductInfo({ ...editProductInfo, warranty: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    required
                  />
                </div>

                {/* Active Status */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={editProductInfo.isActive !== false}
                    onChange={(e) => setEditProductInfo({ ...editProductInfo, isActive: e.target.checked })}
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
                        <option
                          key={category._id}
                          value={category._id}
                          selected={editProductInfo.primaryCategory?._id === category._id}
                        >
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
                          <option
                            key={category._id}
                            value={category._id}
                            selected={editProductInfo.secondaryCategory?._id === category._id}
                          >
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
                          <option
                            key={category._id}
                            value={category._id}
                            selected={editProductInfo.tertiaryCategory?._id === category._id}
                          >
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Main Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Main Product Images (Max 4)
                  </label>

                  {/* Existing Images */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {editProductInfo.existingMainImages?.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={img}
                          alt={`Product ${index}`}
                          className="w-20 h-20 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removeEditMainImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Upload new images */}
                  <input
                    type="file"
                    multiple
                    accept=".jpeg,.webp,.png,.jpg"
                    onChange={handleEditMainImageUpload}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-600"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {editProductInfo.existingMainImages?.length || 0} existing images,
                    you can add {4 - (editProductInfo.existingMainImages?.length || 0)} more
                  </p>
                </div>

                {/* Q&A Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Q&A (Optional)
                  </label>
                  {editProductInfo.qna?.map((item, index) => (
                    <div key={index} className="mb-4 p-3 border rounded-lg">
                      <input
                        type="text"
                        placeholder="Question"
                        value={item.question || ""}
                        onChange={(e) => {
                          const updatedQna = [...editProductInfo.qna];
                          updatedQna[index].question = e.target.value;
                          setEditProductInfo({ ...editProductInfo, qna: updatedQna });
                        }}
                        className="w-full mb-2 px-4 py-2 border border-gray-200 rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Answer"
                        value={item.answer || ""}
                        onChange={(e) => {
                          const updatedQna = [...editProductInfo.qna];
                          updatedQna[index].answer = e.target.value;
                          setEditProductInfo({ ...editProductInfo, qna: updatedQna });
                        }}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedQna = editProductInfo.qna.filter((_, i) => i !== index);
                          setEditProductInfo({ ...editProductInfo, qna: updatedQna });
                        }}
                        className="mt-2 text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const updatedQna = [...(editProductInfo.qna || []), { question: '', answer: '' }];
                      setEditProductInfo({ ...editProductInfo, qna: updatedQna });
                    }}
                    className="text-indigo-600 text-sm"
                  >
                    + Add Question & Answer
                  </button>
                </div>

                {/* Variants Section */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Variants
                  </label>
   {editProductInfo.variants && editProductInfo.variants.length > 0 ? (
        editProductInfo.variants.map((variant, index) => (
          <div key={`variant-${index}`} className="mb-4 p-4 border rounded-lg">
            <div className="mb-2">
              <h4 className="font-medium text-gray-700">
                Variant {index + 1}
                {variant.color && ` - ${variant.color}`}
                {variant.size && ` (${variant.size})`}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Color */}
              <input
                type="text"
                placeholder="Color"
                value={variant.color || ""}
                onChange={(e) => {
                  const { value } = e.target;
                  setEditProductInfo(prev => {
                    const updatedVariants = [...prev.variants];
                    updatedVariants[index] = { ...updatedVariants[index], color: value };
                    return { ...prev, variants: updatedVariants };
                  });
                }}
                className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Size */}
              <input
                type="text"
                placeholder="Size"
                value={variant.size || ""}
                onChange={(e) => {
                  const { value } = e.target;
                  setEditProductInfo(prev => {
                    const updatedVariants = [...prev.variants];
                    updatedVariants[index] = { ...updatedVariants[index], size: value };
                    return { ...prev, variants: updatedVariants };
                  });
                }}
                className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Price */}
              <input
                type="number"
                placeholder="Price *"
                value={variant.price || ""}
                min="0"
                step="0.01"
                required
                onChange={(e) => {
                  const { value } = e.target;
                  setEditProductInfo(prev => {
                    const updatedVariants = [...prev.variants];
                    updatedVariants[index] = {
                      ...updatedVariants[index],
                      price: value === '' ? '' : Number(value)
                    };
                    return { ...prev, variants: updatedVariants };
                  });
                }}
                className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Stock */}
              <input
                type="number"
                placeholder="Stock *"
                value={variant.stock || ""}
                min="0"
                required
                onChange={(e) => {
                  const { value } = e.target;
                  setEditProductInfo(prev => {
                    const updatedVariants = [...prev.variants];
                    updatedVariants[index] = {
                      ...updatedVariants[index],
                      stock: value === '' ? '' : Number(value)
                    };
                    return { ...prev, variants: updatedVariants };
                  });
                }}
                className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Images Section */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium mb-2">
                Images for Variant {index + 1}{variant.color && ` (${variant.color})`}
              </label>

              {/* Existing images */}
              {variant.existingImages?.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Current Images:</p>
                  <div className="flex flex-wrap gap-2">
                    {variant.existingImages.map((imgUrl, imgIndex) => (
                      <div key={`existing-${imgIndex}`} className="relative">
                        <img
                          src={imgUrl}
                          alt={`Variant ${index + 1} - Image ${imgIndex + 1}`}
                          className="w-20 h-20 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removeEditVariantImage(index, imgIndex, true)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New image previews */}
              {variant.images?.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">New Images to Upload:</p>
                  <div className="flex flex-wrap gap-2">
                    {variant.images.map((file, imgIndex) => (
                      <div key={`new-${imgIndex}`} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`New image ${imgIndex + 1}`}
                          className="w-20 h-20 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removeEditVariantImage(index, imgIndex, false)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(!variant.images?.length && !variant.existingImages?.length) && (
                <p className="text-sm text-gray-500 italic mb-4">No images uploaded for this variant</p>
              )}

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files?.length > 0) {
                    handleEditVariantImageChange(index, e.target.files);
                    e.target.value = '';
                  }
                }}
                className="mb-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-500 mt-1">Upload images for Variant {index + 1}.</p>
            </div>

            {/* Remove Variant */}
            <div className="mt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => removeEditVariant(index)}
                disabled={editProductInfo.variants.length === 1}
                className={`text-sm font-medium px-3 py-1 rounded transition-colors ${
                  editProductInfo.variants.length === 1
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                    : 'text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100'
                }`}
              >
                Remove This Variant
              </button>
              <span className="text-xs text-gray-500">
                Variant {index + 1} of {editProductInfo.variants.length}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-2">No variants added yet.</p>
          <button
            type="button"
            onClick={() => {
              setEditProductInfo(prev => ({
                ...prev,
                variants: [
                  {
                    color: '', size: '', price: '', stock: '',
                    images: [], existingImages: [], imagesToDelete: []
                  }
                ]
              }))
            }}
            className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
          >
            Add First Variant
          </button>
        </div>
      )}

{/* Add Variant Button - Show only if variants exist */}
{editProductInfo.variants && editProductInfo.variants.length > 0 && (
  <div className="mt-4 text-center">
    <button
      type="button"
      onClick={addEditVariant}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
    >
      Add Another Variant
    </button>
  </div>
)}

                  <button
                    type="button"
                    onClick={() => {
                      setEditProductInfo({
                        ...editProductInfo,
                        variants: [...(editProductInfo.variants || []), { color: '', size: '', price: 0, stock: 0, image: '' }]
                      });
                    }}
                    className="mt-2 text-indigo-600 text-sm"
                  >
                    + Add Variant
                  </button>
                </div>

           

                {/* Form Actions */}
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEditProductPopup(false)}
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
                      'Update Product'
                    )}
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