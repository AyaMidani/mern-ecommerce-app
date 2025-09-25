import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice/index.js';
import AdminProductsSlice from './admin/products-slice';
import shopProductsSlice from './shop/products-slice'
import shoppingCartSlice from './shop/cart-slice'
import shopAddressSlice from './shop/addrss-slice'
import shopOrderSlice from './shop/order-slice'
import adminOrderSlice from './admin/order-slice'
import shopSearchSlice from './shop/search-slice/index.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice, 
    shopProducts: shopProductsSlice,
    shopCart: shoppingCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    adminOrder: adminOrderSlice,
    shopSearch: shopSearchSlice
  },
});

export default store;
