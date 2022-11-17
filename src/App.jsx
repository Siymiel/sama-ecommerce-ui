import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import NotFound from './pages/NotFound'
import Success from './pages/Success'
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const user = useSelector(state => state.user.currentUser);

  return (
    <>
    <Toaster/>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<ProductList />} />
        <Route exact path="/products/:category" element={<ProductList />} />
        <Route exact path="/product/:id" element={<Product />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/success" element={<Success />} />
        <Route exact path="/login" element={ user ? <Navigate replace to="/" /> : <Login /> } />
        <Route exact path="/register" element={ user ? <Navigate replace to="/" /> : <Register /> } />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </>
  );    
};

export default App;