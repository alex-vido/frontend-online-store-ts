import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartProducts from '../../components/CartProducts';
import { ProductType } from '../../types';
import styles from './cart.module.css';

function Cart() {
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const productsFromStorage = localStorage.getItem('products');
    if (productsFromStorage) {
      const products = JSON.parse(productsFromStorage);
      setCartProducts(products);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const handleIncreaseButton = (cartProduct:ProductType) => {
    const productToUpdate = cartProducts.find((prod) => prod.id === cartProduct.id);
    if (productToUpdate) {
      const updateCartProducts = cartProducts
        .map((productItem) => (productItem.id === productToUpdate.id
          ? { ...productItem, quantity: productItem.quantity + 1 } : productItem));
      setCartProducts(updateCartProducts);
    }
  };

  const handleDecreaseButton = (cartProduct:ProductType) => {
    const productToUpdate = cartProducts.find((prod) => prod.id === cartProduct.id);
    if (productToUpdate && cartProduct.quantity > 1) {
      const updateCartProducts = cartProducts
        .map((productItem) => (productItem.id === productToUpdate.id
          ? { ...productItem, quantity: productItem.quantity - 1 } : productItem));
      setCartProducts(updateCartProducts);
    }
  };

  const handleDeleteButton = (cartProduct:ProductType) => {
    const deleteProduct = cartProducts.filter((prod) => prod.id !== cartProduct.id);
    setCartProducts(deleteProduct);
  };
  if (cartProducts.length === 0) {
    return (
      <div
        className={ styles.empty }
      >
        <h2
          className={ styles.emptyTitle }
          data-testid="shopping-cart-empty-message"
        >
          Seu carrinho está vazio

        </h2>
      </div>
    );
  }

  return (
    <div
      className={ styles.container }
    >
      <h1
        className={ styles.title }
      >
        Carrinho de compras

      </h1>
      <CartProducts
        cartProducts={ cartProducts }
        handleDecreaseButton={ handleDecreaseButton }
        handleDeleteButton={ handleDeleteButton }
        handleIncreaseButton={ handleIncreaseButton }
      />
      <Link
        className={ styles.btn }
        to="/checkout"
        data-testid="checkout-products"
      >
        Finalizar Compra
      </Link>
    </div>
  );
}

export default Cart;
