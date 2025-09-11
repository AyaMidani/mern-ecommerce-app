import AdminLayout from "./components/admin-view/layout";
import AuthLayout from "./components/auth/layout"
import AdminDashboard from "./pages/auth/admin-view/dashboard";
import AdminOrders from "./pages/auth/admin-view/orders";
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminFeatures from "./pages/auth/admin-view/features";
import AdminProdcuts from "./pages/auth/admin-view/products";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/auth/shopping-view/home";
import ShoppingListing from "./pages/auth/shopping-view/listing";
import ShoppingCheckout from "./pages/auth/shopping-view/checkout";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import {useSelector , useDispatch} from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton"


function App() {

  const {user,isAuthenticated , isLoading}= useSelector(state=>state.auth)
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch])

  if(isLoading)return <Skeleton className="h-[600px] w-[600px]" />;
  console.log(isLoading,user)

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />}/>
          <Route path="register" element={<AuthRegister />}/>
        </Route>

          <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
            }>
          <Route path="dashboard" element={<AdminDashboard />}/>
          <Route path="orders" element={<AdminOrders />}/>
          <Route path="products" element={<AdminProdcuts />}/>
          <Route path="features" element={<AdminFeatures />}/>
        </Route>

        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
          }>
          <Route path="home" element={<ShoppingHome />}/>
          <Route path="listing" element={<ShoppingListing />}/>
          <Route path="checkout" element={<ShoppingCheckout />}/>
          <Route path="account" element={<ShoppingCheckout />}/>
        </Route>
        <Route path="/unauth-page" element={< UnauthPage/>}></Route>
        <Route path="/*" element={< NotFound/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
