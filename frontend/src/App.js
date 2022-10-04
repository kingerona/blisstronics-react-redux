import React, { useEffect } from 'react';
import './App.css';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignUp from './components/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userActions';
import UserOptions from './components/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';
import OrderConfirmation from './components/Cart/OrderConfirmation';
import MyOrders from './components/Orders/MyOrders';
import OrderDetails from './components/Orders/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrderList from './components/Admin/OrderList';
import ProcessOrder from './components/Admin/ProcessOrder';
import UserList from './components/Admin/UserList';
import UpdateUser from './components/Admin/UpdateUser';
import ProductReviews from './components/Admin/ProductReviews';
import Contact from './components/layout/Contact/Contact';
import About from './components/layout/About/About.js';
import NotFound from './components/layout/Not Found/NotFound';
// import TopMenu from './components/layout/TopMenu/TopMenu';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid sans', 'Chilanka'],
      },
    });

    store.dispatch(loadUser());
  }, []);

  window.addEventListener('contextmenu', (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {/* <TopMenu /> */}

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route path="/account" element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
        </Route>
        <Route path="/me/update" element={<ProtectedRoute />}>
          <Route path="/me/update" element={<UpdateProfile />} />
        </Route>
        <Route path="/password/update" element={<ProtectedRoute />}>
          <Route path="/password/update" element={<UpdatePassword />} />
        </Route>
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<ProtectedRoute />}>
          <Route path="/shipping" element={<Shipping />} />
        </Route>
        <Route path="/order/confirm" element={<ProtectedRoute />}>
          <Route path="/order/confirm" element={<ConfirmOrder />} />
        </Route>
        <Route path="/process/payment" element={<ProtectedRoute />}>
          <Route path="/process/payment" element={<Payment />} />
        </Route>
        <Route
          path="/order-confirmation/:orderStatus"
          element={<ProtectedRoute />}
        >
          <Route
            path="/order-confirmation/:orderStatus"
            element={<OrderConfirmation />}
          />
        </Route>
        <Route path="/orders" element={<ProtectedRoute />}>
          <Route path="/orders" element={<MyOrders />} />
        </Route>
        <Route path="/order/:orderId" element={<ProtectedRoute />}>
          <Route path="/order/:orderId" element={<OrderDetails />} />
        </Route>
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
        <Route
          path="/admin/products"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/products" element={<ProductList />} />
        </Route>
        <Route
          path="/admin/product"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/product" element={<NewProduct />} />
        </Route>
        <Route
          path="/admin/product/:productId"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/product/:productId" element={<UpdateProduct />} />
        </Route>
        <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/orders" element={<OrderList />} />
        </Route>
        <Route
          path="/admin/order/:orderId"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/order/:orderId" element={<ProcessOrder />} />
        </Route>
        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/users" element={<UserList />} />
        </Route>
        <Route
          path="/admin/user/:userId"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/user/:userId" element={<UpdateUser />} />
        </Route>
        <Route
          path="/admin/reviews"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/reviews" element={<ProductReviews />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
