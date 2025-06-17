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
  // Additional fields to match API response
  brand: "",
  basePrice: "",
  baseStock: "",
  isActive: true,
  specifications: "",
  careAndMaintenance: "",
  warranty: "",
  qna: [],
  images: [], // Main product images
  existingMainImages: [], // For tracking existing main images
  mainImages: null, // For new main images upload
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
      // Additional fields to match API structure
      color: "",
      size: "",
      price: "",
      image: "", // Current image URL
      existingImage: "", // For tracking existing image
      newImage: null, // For new image upload
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
async function urlToFile(url, filename) {
  const response = await fetch(url);
  const data = await response.blob();
  // Try to infer extension from type
  let ext = '';
  if (data.type === 'image/png') ext = '.png';
  else if (data.type === 'image/jpeg') ext = '.jpg';
  else if (data.type === 'image/webp') ext = '.webp';
  return new File([data], filename + ext, { type: data.type });
}
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

const handleEditProduct = async (product) => {
  try {
    const response = await getProductById(product._id);
    const productData = response.product || response;

    // Clean up any existing object URLs before setting new data
    if (editProductInfo.variants) {
      editProductInfo.variants.forEach(variant => {
        if (variant.imagePreview) {
          URL.revokeObjectURL(variant.imagePreview);
        }
      });
    }

 const formattedVariants = productData.variants?.map(variant => ({
  color: variant.color || "",
  size: variant.size || "",
  price: variant.price || "",
  stock: variant.stock || "",
  image: variant.image || "",
  images: [],
  existingImage: variant.image || "", // single string for current image
})) || [{
  color: "",
  size: "",
  price: "",
  stock: "",
  image: "",
  images: [],
  existingImage: "",
}];

    setEditProductInfo({
      id: productData._id,
      name: productData.name || "",
      description: productData.description || "",
      brand: productData.brand || "",
      basePrice: productData.basePrice || "",
      baseStock: productData.baseStock || "",
      isActive: productData.isActive !== undefined ? productData.isActive : true,
      fragrance: productData.fragrance || "",
      specifications: productData.specifications || "",
      careAndMaintenance: productData.careAndMaintenance || "",
      warranty: productData.warranty || "",
      qna: productData.qna || [],
      images: productData.images || [],
      variants: formattedVariants,
      // Keep your existing state structure
      category: productData.primaryCategory?._id || null,
      sku: "",
      original_price: productData.basePrice?.toString() || "",
      current_price: productData.basePrice?.toString() || "",
      price_with_offer: null,
      size: "",
      weight: "",
      burning_time: "",
      color: "",
      in_the_box: "",
      stock: productData.baseStock,
      tags: "",
      image_url: productData.images?.[0] || ""
    });

    setSelectedPrimary(productData.primaryCategory?._id || '');
    setSelectedSecondary(productData.secondaryCategory?._id || '');
    setSelectedTertiary(productData.tertiaryCategory?._id || '');
    setShowEditProductPopup(true);
  } catch (error) {
    console.error("Error fetching product details:", error);
    setError("Failed to fetch product details: " + (error.message || error.toString()));
  }
};

// Enhanced handleEditProductSubmit with comprehensive error handling
const handleEditProductSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);

  try {
    const formData = new FormData();

    // Prepare variants data (no image field, just like creation)
    const updatedVariants = editProductInfo.variants.map(variant => ({
      color: variant.color || "",
      size: variant.size || "",
      price: Number(variant.price),
      stock: Number(variant.stock),
    }));

    // Append all form fields
    const formFields = {
      name: editProductInfo.name,
      description: editProductInfo.description,
      brand: editProductInfo.brand,
      basePrice: Number(editProductInfo.basePrice),
      baseStock: Number(editProductInfo.baseStock),
      isActive: editProductInfo.isActive,
      primaryCategory: selectedPrimary,
      secondaryCategory: selectedSecondary || '',
      tertiaryCategory: selectedTertiary || '',
      fragrance: editProductInfo.fragrance || '',
      specifications: editProductInfo.specifications || '',
      careAndMaintenance: editProductInfo.careAndMaintenance || '',
      warranty: editProductInfo.warranty || '',
      qna: JSON.stringify(editProductInfo.qna || []),
      variants: JSON.stringify(updatedVariants)
    };
    Object.entries(formFields).forEach(([key, value]) => {
      formData.append(key, value);
    });
      
    // Append all variant images in order (new or existing)
    for (let i = 0; i < editProductInfo.variants.length; i++) {
      const variant = editProductInfo.variants[i];
      if (variant.images && variant.images.length > 0) {
        // New image selected
        formData.append('variantImages', variant.images[0]);
      } else if (variant.existingImage) {
        // No new image, use existing image (convert URL to File)
        const file = await urlToFile(variant.existingImage, `variant_${i}`);
        formData.append('variantImages', file);
      }
    }
    if (editProductInfo.mainImages && editProductInfo.mainImages.length > 0) {
      for (const img of editProductInfo.mainImages) {
        if (img instanceof File) {
          formData.append('images', img);
        } else if (typeof img === 'string') {
          const file = await urlToFile(img, 'main_image');
          formData.append('images', file);
        }
      }
    }
    // Log FormData contents for debugging
    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const result = await updateProduct(editProductInfo.id, formData);
    console.log('Product updated successfully:', result);

    // Clean up object URLs
    editProductInfo.variants.forEach(variant => {
      if (variant.imagePreview) {
        URL.revokeObjectURL(variant.imagePreview);
      }
    });

    setShowEditProductPopup(false);
    fetchProducts();
  } catch (error) {
    console.error('Update error:', error);

    let errorMessage = 'Failed to update product';
    if (error.message) {
      errorMessage = error.message;
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.response?.status) {
      errorMessage = `Server error: ${error.response.status}`;
    }
    setError(errorMessage);
  } finally {
    setIsSubmitting(false);
  }
};
const handleEditVariantImageChange = (variantIndex, files) => {
  const filesArray = Array.from(files);
  if (filesArray.length === 0) return;

  setEditProductInfo(prev => {
    const updatedVariants = prev.variants.map((variant, idx) => {
      if (idx === variantIndex) {
        const imagePreview = filesArray[0] ? URL.createObjectURL(filesArray[0]) : null;
        return {
          ...variant,
          images: filesArray, // array of new images (usually just one)
          imagePreview,
          existingImage: variant.existingImage || variant.image || ""
        };
      }
      return variant;
    });
    return { ...prev, variants: updatedVariants };
  });
};
// Add cleanup function for component unmount
useEffect(() => {
  return () => {
    // Clean up object URLs when component unmounts
    if (editProductInfo.variants) {
      editProductInfo.variants.forEach(variant => {
        if (variant.imagePreview) {
          URL.revokeObjectURL(variant.imagePreview);
        }
      });
    }
  };
}, []);

// Helper function to validate image file
const validateImageFile = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    return 'Please select a valid image file (JPEG, PNG, WebP)';
  }
  
  if (file.size > maxSize) {
    return 'File size must be less than 5MB';
  }
  
  return null; // Valid file
};




  
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

const handleEditMainImageUpload = (e) => {
  const files = Array.from(e.target.files);
  // Combine existing and new images, but do not exceed 4
  const existing = editProductInfo.mainImages || [];
  const combined = [...existing, ...files].slice(0, 4);
  setEditProductInfo(prev => ({ ...prev, mainImages: combined }));
};

  const handleEditVariantImageUpload = (variantIndex, e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setEditProductInfo(prev => {
      const updatedVariants = [...prev.variants];
      updatedVariants[variantIndex] = {
        ...updatedVariants[variantIndex],
        images: files,
        // Clear existing images when uploading new ones
        existingImages: files.length > 0 ? [] : updatedVariants[variantIndex].existingImages
      };
      return { ...prev, variants: updatedVariants };
    });
  };

const removeEditMainImage = (indexToRemove) => {
  setEditProductInfo(prev => ({
    ...prev,
    mainImages: prev.mainImages.filter((_, idx) => idx !== indexToRemove)
  }));
};

  const removeEditVariantImage = (variantIndex, imageIndexToRemove) => {
    setEditProductInfo(prev => {
      const updatedVariants = [...prev.variants];
      updatedVariants[variantIndex] = {
        ...updatedVariants[variantIndex],
        existingImages: updatedVariants[variantIndex].existingImages.filter(
          (_, index) => index !== imageIndexToRemove
        )
      };
      return { ...prev, variants: updatedVariants };
    });
  };


  const addEditVariant = () => {
    setEditProductInfo(prev => ({
      ...prev,
      variants: [
        ...prev.variants,
        { color: '', size: '', price: '', stock: '', images: [], existingImages: [] }
      ]
    }));
  };

  const removeEditVariant = (index) => {
    if (editProductInfo.variants.length > 1) {
      setEditProductInfo(prev => ({
        ...prev,
        variants: prev.variants.filter((_, i) => i !== index)
      }));
    }
  };

  const handleEditVariantChange = (index, field, value) => {
    setEditProductInfo(prev => {
      const updatedVariants = [...prev.variants];
      updatedVariants[index] = {
        ...updatedVariants[index],
        [field]: value
      };
      return { ...prev, variants: updatedVariants };
    });
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
                    {editProductInfo.mainImages && editProductInfo.mainImages.map((img, idx) => (
  <div key={idx} className="relative">
    <img
      src={img instanceof File ? URL.createObjectURL(img) : img}
      alt={`Main ${idx}`}
      className="w-20 h-20 object-cover rounded border"
    />
    <button
      type="button"
      onClick={() => removeEditMainImage(idx)}
      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
    >
      ×
    </button>
  </div>
))}
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
                        className="w-full mb-2 px-4 py-2 border border-gray-400 rounded-lg"
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
    <div key={index} className="variant-container border p-4 rounded-lg mb-4">
      {/* Variant Basic Info */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <input
            type="text"
            value={variant.color}
       onChange={(e) => {
  const updatedVariants = [...editProductInfo.variants];
  updatedVariants[index] = { ...updatedVariants[index], color: e.target.value };
  setEditProductInfo({ ...editProductInfo, variants: updatedVariants });
}}
            className="w-full p-2 border rounded"
            placeholder="Enter color"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Size</label>
          <input
            type="text"
            value={variant.size}
        onChange={(e) => {
  const updatedVariants = [...editProductInfo.variants];
  updatedVariants[index] = { ...updatedVariants[index], size: e.target.value };
  setEditProductInfo({ ...editProductInfo, variants: updatedVariants });
}}
            className="w-full p-2 border rounded"
            placeholder="Enter size"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            value={variant.price}
          onChange={(e) => {
  const updatedVariants = [...editProductInfo.variants];
  updatedVariants[index] = { ...updatedVariants[index], price: e.target.value };
  setEditProductInfo({ ...editProductInfo, variants: updatedVariants });
}}
            className="w-full p-2 border rounded"
            placeholder="Enter price"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            value={variant.stock}
          onChange={(e) => {
  const updatedVariants = [...editProductInfo.variants];
  updatedVariants[index] = { ...updatedVariants[index], stock: e.target.value };
  setEditProductInfo({ ...editProductInfo, variants: updatedVariants });
}}
            className="w-full p-2 border rounded"
            placeholder="Enter stock quantity"
            min="0"
          />
        </div>
      </div>

      {/* Variant Image Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium mb-1">Variant Images</label>
        <input
    type="file"
    accept="image/*"
    key={`variant-image-input-${index}-${variant.image ? 'has-image' : 'no-image'}`} // Force re-render
    onChange={(e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleEditVariantImageChange(index, files);
        e.target.value = ''; // Clear input for re-selection
      }
    }}
    className="file-input-style"
  />
        
        {/* Image Previews */}
        <div className="flex gap-2 flex-wrap mt-2">
          {/* Show existing image if no new images are selected */}
          {variant.existingImage && (!variant.images || variant.images.length === 0) && (
            <div className="relative w-20 h-20 border rounded overflow-hidden">
              <img
                src={variant.existingImage}
                alt={`Variant ${index + 1} Current`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/fallback-image.png';
                  e.target.alt = 'Image not available';
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const updatedVariants = [...editProductInfo.variants];
                  updatedVariants[index] = {
                    ...updatedVariants[index],
                    existingImage: null,
                    images: []
                  };
                  setEditProductInfo({ ...editProductInfo, variants: updatedVariants });
                }}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
              <span className="absolute bottom-0 left-0 bg-green-500 text-white text-xs px-1 rounded-tr">
                CURRENT
              </span>
            </div>
          )}

          {/* Show new images if selected */}
          {variant.images && variant.images.length > 0 && (
            variant.images.map((img, imgIndex) => (
              <div key={imgIndex} className="relative w-20 h-20 border rounded overflow-hidden">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`Variant ${index + 1} New ${imgIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updatedVariants = [...editProductInfo.variants];
                    const newImages = [...updatedVariants[index].images];
                    
                    // Revoke the object URL
                    URL.revokeObjectURL(URL.createObjectURL(newImages[imgIndex]));
                    
                    // Remove the image from the array
                    newImages.splice(imgIndex, 1);
                    updatedVariants[index] = {
                      ...updatedVariants[index],
                      images: newImages
                    };
                    setEditProductInfo({ ...editProductInfo, variants: updatedVariants });
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
                <span className="absolute bottom-0 left-0 bg-blue-500 text-white text-xs px-1 rounded-tr">
                  NEW
                </span>
              </div>
            ))
          )}
        </div>
        
        {/* No images message */}
        {!variant.existingImage && (!variant.images || variant.images.length === 0) && (
          <p className="text-gray-500 text-sm">No images selected</p>
        )}
      </div>

      {/* Remove Variant Button */}
      <div className="mt-4 pt-4 border-t">
        <button
          type="button"
          onClick={() => {
            const updatedVariants = editProductInfo.variants.filter((_, i) => i !== index);
            
            // Clean up any object URLs for this variant
            if (variant.images && variant.images.length > 0) {
              variant.images.forEach(img => {
                URL.revokeObjectURL(URL.createObjectURL(img));
              });
            }
            
            setEditProductInfo({ ...editProductInfo, variants: updatedVariants });
          }}
          className="text-red-500 text-sm hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded transition-colors"
        >
          Remove Variant {index + 1}
        </button>
      </div>
    </div>
  ))
) : (
  <div className="text-center py-8">
    <p className="text-gray-500 mb-4">No variants added yet.</p>
    <button
      type="button"
      onClick={() => {
        setEditProductInfo({
          ...editProductInfo,
          variants: [{
            color: "",
            size: "",
            price: "",
            stock: "",
            image: "",
            images: [],
            variant_options: [],
            original_price: "",
            current_price: "",
            price_with_offer: "",
            variant_data: {},
            variant_type: "",
            option_value: "",
            existingImage: "",
            newImage: null,
          }]
        });
      }}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
    >
      Add First Variant
    </button>
  </div>
)}

{/* Add New Variant Button */}
{editProductInfo.variants && editProductInfo.variants.length > 0 && (
  <div className="mt-4">
    <button
      type="button"
      onClick={() => {
        setEditProductInfo({
          ...editProductInfo,
          variants: [
            ...editProductInfo.variants,
            {
              color: "",
              size: "",
              price: "",
              stock: "",
              image: "",
              images: [],
              variant_options: [],
              original_price: "",
              current_price: "",
              price_with_offer: "",
              variant_data: {},
              variant_type: "",
              option_value: "",
              existingImage: "",
              newImage: null,
            }
          ]
        });
      }}
      className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
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

                {editProductInfo.showVariants && (
                  <div className="space-y-4">
                    {editProductInfo.variants?.map((variant, index) => (
                      <div key={index} className="border p-4 rounded-lg relative">
                        {/* ... other variant fields ... */}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Stock
                            </label>
                            <input
                              type="number"
                              value={variant.stock || ""}
                              onChange={(e) => handleEditVariantChange(index, 'stock', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Variant Image (Required)
                            </label>

                            {/* Display existing image */}
                            {variant.existingImages?.[0] && (
                              <div className="mb-2">
                                <img
                                  src={variant.existingImages[0]}
                                  alt={`Variant ${index}`}
                                  className="w-20 h-20 object-cover rounded border"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeEditVariantImage(index, 0)}
                                  className="mt-1 text-red-500 text-sm"
                                >
                                  Remove Image
                                </button>
                              </div>
                            )}

                            {/* Upload new image */}
                            <input
                              type="file"
                              accept=".jpeg,.webp,.png,.jpg"
                              onChange={(e) => handleEditVariantImageUpload(index, e)}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-600"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              {variant.existingImages?.[0] ?
                                "Replace existing image" :
                                "Upload variant image (required)"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addEditVariant}
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