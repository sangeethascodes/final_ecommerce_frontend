import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { productListReducers, productDetailsReducers, productCreateReducers, productUpdateReducers, productDeleteReducers } from './reducers/productReducers';
import { userloginReducers, userSignupReducers, userListReducers, userProfileUpdateReducer } from './reducers/userReducer';
import { cartReducers } from './reducers/cardReducers';
import { ordercreateReducers, orderDeliverReducer, orderDetailsReducer, orderListReducer, myOrderListReducer } from './reducers/orderReducers';

const reducer = combineReducers({
  productsList: productListReducers,
  productDetails: productDetailsReducers,
  userSignup:userSignupReducers,
  userLogin:userloginReducers,
  userList:userListReducers,
  userProfileUpdate:userProfileUpdateReducer,
  cart:cartReducers,
  orderCreate:ordercreateReducers,
  orderDetails:orderDetailsReducer,
  orderDeliver:orderDeliverReducer,

  //admin
  productCreate:productCreateReducers,
  productUpdate:productUpdateReducers,
  productDelete:productDeleteReducers,

  orderList: orderListReducer,
  myOrderList: myOrderListReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')?
JSON.parse(localStorage.getItem('userInfo')):[]

const cartItemsfromStorage = localStorage.getItem('cartItems')?
JSON.parse(localStorage.getItem('cartItems')):[]

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?
JSON.parse(localStorage.getItem('shippingAddress')):{}


const initialState = {
  cart:{cartItems:cartItemsfromStorage,shippingAddress:shippingAddressFromStorage},
  userLogin:{userInfo:userInfoFromStorage}

};
const middleware = [thunk];
const store = createStore(reducer, initialState, applyMiddleware(...middleware));

export default store;
