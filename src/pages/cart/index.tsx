import { useEffect, useState } from 'react';
import { ProductType } from '../../types';

function Cart() {
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const productsFromStorage = localStorage.getItem('products');
    if (productsFromStorage) {
      const products = JSON.parse(productsFromStorage);
      setCartProducts(products);
    }
  }, []);

  return (
    cartProducts.length === 0
      ? (
        <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
      ) : (
        cartProducts.map((cartProduct) => (
          <div
            key={ cartProduct.id }
          >
            <img src={ cartProduct.thumbnail } alt="" />
            <h2
              data-testid="shopping-cart-product-name"
            >
              { cartProduct.title }

            </h2>
            <h3
              data-testid="shopping-cart-product-quantity"
            >
              Quantidade:
              {' '}
              {cartProduct.quantity}
            </h3>
          </div>
        ))
      )

  );
}

export default Cart;
