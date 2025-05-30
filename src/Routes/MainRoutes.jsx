import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Wishlist from "../pages/Wishlist/Wishlist";
import AdminSignin from "../components/AdminComp/auth/AdminSignin";
import ProtectedRoutes from "../utils/ProtectedRoutes";
import Profile from "../components/Profile/Profile";
import PublicRoutes from '../utils/PublicRoutes';


const Home = lazy(() => import("../pages/Home/Home"));
const Account = lazy(() => import("../pages/Account/Account"));
const ShopVirgo = lazy(() => import("../pages/Shop/ShopVirgo"));
const CartVirgo = lazy(() => import("../pages/Carts/CartVirgo"));
const BlogsPage = lazy(() => import("../pages/Blog/BlogsPage"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const Candleholderspage = lazy(() => import("../pages/CandleHolders/Candleholderspage"));
const ProductDetailsVirgo = lazy(() => import("../pages/Shop/ProductDetailsVirgo"));
const AdminDashboard = lazy(() => import("../pages/AdminSide/AdminDashboard/AdminDashboard"));
const ProductsAdmin = lazy(() => import("../components/AdminComp/Products/ProductsAdmin"));
const AdminCategories = lazy(() => import("../components/AdminComp/Categories/AdminCategories"));
const AdminOrders = lazy(() => import("../components/AdminComp/Orders/AdminOrders"));
const AdminCustomers = lazy(() => import("../components/AdminComp/Customers/AdminCustomers"));
const AdminCoupons = lazy(() => import("../components/AdminComp/Coupons/AdminCoupons"));
const AdminBanners = lazy(() => import("../components/AdminComp/Banners/AdminBanners"));
const AdminSettings =lazy(() => import ("../components/AdminComp/Settings/AdminSettings"));
const OrdersVirgo =lazy(() => import ("../pages/Orders/OrdersVirgo"));

export default function MainRoutes() {
    return (
        <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
      
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="/register" element={<Account />} />
            <Route path="/shop" element={<ShopVirgo />} />
            <Route path="/cart" element={<CartVirgo />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/candleholders" element={<Candleholderspage />} />
            <Route path="/productdetails/:id" element={<ProductDetailsVirgo />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<OrdersVirgo />} />
            
      
            {/* Admin Login Route - public */}
            <Route element={<PublicRoutes />}>
              <Route path="/admin/AdminSignin" element={<AdminSignin />} />
            </Route>
      
            {/* Protected Admin Routes */}
            
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<ProductsAdmin />} />
              <Route path="/admin/category" element={<AdminCategories />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/customers" element={<AdminCustomers />} />
              <Route path="/admin/coupons" element={<AdminCoupons />} />
              <Route path="/admin/banners" element={<AdminBanners />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
      
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
}