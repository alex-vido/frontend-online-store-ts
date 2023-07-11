import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import backButton from '../../assets/backbtn.svg';
import Rating from '../../components/rating';
import { getProductById } from '../../services/api';
import { ProductType } from '../../types';
import styles from './product.module.css';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType>();
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductById({ productId: id });
      setProduct(productData);
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const productsFromStorage = localStorage.getItem('products');
    if (productsFromStorage) {
      const products = JSON.parse(productsFromStorage);
      setCartProducts(products);
    }
  }, []);

  const handleAddProductToCart = () => {
    if (!product) {
      return;
    }
    const productAlreadyInCart = cartProducts
      .find((productItem) => productItem.id === product.id);
    if (productAlreadyInCart) {
      const updateCartProducts = cartProducts
        .map((productItem) => (productItem.id === productAlreadyInCart.id
          ? { ...productItem,
            quantity: productItem.quantity + 1,
          } : productItem));
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
    product && (
      <div
        className={ styles.productMainContainer }
      >
        <section className={ styles.productDetailsContainer }>
          <Link to="/">
            <img src={ backButton } alt="back button" />
          </Link>
          <section className={ styles.produtDestails }>
            <h2
              className={ styles.title }
              data-testid="product-detail-name"
            >
              { product.title }
            </h2>
            <img
              className={ styles.img }
              data-testid="product-detail-image"
              src={ product.thumbnail }
              alt={ product.title }
            />
          </section>
        </section>
        <section className={ styles.productDescriptionContainer }>
          <h2>Descrição do produto</h2>
          <h3 className={ styles.description }>
            {product.description}
          </h3>
          <section className={ styles.productDescriptionFooter }>
            <h3
              className={ styles.price }
              data-testid="product-detail-price"
            >
              <span>R$</span>
              { Number(product.price).toFixed(2) }
            </h3>
            <section className={ styles.addQuantityButton }>
              <button type="button">-</button>
              <span>1</span>
              <button type="button">+</button>

            </section>
            <button
              className={ styles.addButton }
              data-testid="product-detail-add-to-cart"
              onClick={ handleAddProductToCart }
              type="button"
            >
              Adicionar ao Carrinho
            </button>
          </section>
        </section>
        <Rating productId={ product.id } />
      </div>
    )
  );
}

export default Product;
