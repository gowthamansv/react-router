import { useState, useEffect } from 'react';
import './App.css';
import Products from './Components/Products';
import Cart from './Pages/Cart';
import axios from 'axios';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      alert(`${product.title} is already in the cart!`);
      return;
    }
    const updatedProducts = products.map(item =>
      item.id === product.id ? { ...item, added: true } : item
    );
    setProducts(updatedProducts);
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    const updatedProducts = products.map(item =>
      item.id === productId ? { ...item, added: false } : item
    );
    setProducts(updatedProducts);
  };

  if (loading) {
    return <div>Loading......</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <BrowserRouter>
      <Navbar cartItems={cartItems} removeFromCart={removeFromCart} />
      <Routes>
        <Route path='/' element={<Products products={products} addToCart={addToCart} />} />
        <Route path='/cart' element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
