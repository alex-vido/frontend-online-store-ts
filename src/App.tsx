import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Cart from './pages/cart';
import Home from './pages/home';
import {
  getCategories, getProductsFromTerm, listProductsByCategory,
} from './services/api';
import { CategoryType, ProductType } from './types';
import Product from './pages/product';
import Checkout from './pages/checkout';

function App() {
  const [categoryData, setcategoryData] = useState<CategoryType[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState<ProductType[]>([]);

  const handleClick = async () => {
    const productsByCategory = await getProductsFromTerm(searchValue);
    const filteredProducts = productsByCategory.results;
    setProducts(filteredProducts);
  };

  const handleFilterByCategory = async (categoryId: string) => {
    const categories = await listProductsByCategory(categoryId);
    const { results } = categories;
    setProducts(results);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const categories = await getCategories();
      setcategoryData(categories);
    };
    fetchCategory();
  }, []);

  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const productsFromStorage = localStorage.getItem('products');
    if (productsFromStorage) {
      const productsLocal = JSON.parse(productsFromStorage);
      setCartProducts(productsLocal);
    }
  }, []);

  const handleAddProductToCart = (product:ProductType) => {
    if (!product) {
      return;
    }
    const productAlreadyInCart = cartProducts
      .find((productItem) => productItem.id === product.id);
    if (productAlreadyInCart) {
      const updateCartProducts = cartProducts
        .map((productItem) => (productItem.id === productAlreadyInCart.id
          ? { ...productItem, quantity: productItem.quantity + 1 } : productItem));
      setCartProducts(updateCartProducts);
    } else {
      const newProduct = { ...product, quantity: 1 };
      setCartProducts((productsInCart) => [...productsInCart, newProduct]);
    }
  };

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            searchValue={ searchValue }
            handleChange={ handleChange }
            handleClick={ handleClick }
          />
        }
      >
        <Route
          index
          element={
            <Home
              categoryData={ categoryData }
              handleFilterByCategory={ handleFilterByCategory }
              products={ products }
              searchValue={ searchValue }
              handleAddProductToCart={ handleAddProductToCart }
            />
        }
        />
        <Route path="/cart" element={ <Cart /> } />
        <Route
          path="/product/:id"
          element={
            <Product />
          }
        />
        <Route path="/checkout" element={ <Checkout /> } />
      </Route>
    </Routes>
  );
}

export default App;
