import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import LoginScreen from './components/screens/LoginScreen';
import SignupScreen from './components/screens/SignupScreen';
import ProductDetailScreen from './components/screens/ProductDetailScreen';
import CartScreen from './components/screens/CartScreen';
import ShippingScreen from './components/screens/shippingScreen';
import CheckoutScreen from './components/screens/CheckoutScreen';
import PlaceOrderScreen from './components/screens/PlaceOrderScreen';
import PaymentScreen from './components/screens/Paymentscreen';
import OrderScreen from './components/screens/OrderScreen';
import ProductListScreen from './components/screens/ProductListScreen';
import ProductEditScreen from './components/screens/ProductEditScreen';
import UserListScreen from './components/screens/UserListScreen';
import OrderListScreen from './components/screens/OrderListScreen'
import ProfileScreen from './components/screens/ProfileScreen'




function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/product/:id' element={<ProductDetailScreen />} />
            <Route path='/signup' element={<SignupScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/checkout' element={<CheckoutScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/admin/productList' element={<ProductListScreen />} />
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
            <Route path='/admin/orderList/' element={<OrderListScreen />} />
            <Route path='/admin/userList/' element={<UserListScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;