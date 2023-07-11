import { ProductType } from '../../types';
import styles from './cartProducts.module.css';

type CartProductProps = {
  cartProducts:ProductType[],
  handleDecreaseButton:(cartProduct:ProductType) => void,
  handleDeleteButton:(cartProduct:ProductType) => void
  handleIncreaseButton:(cartProduct:ProductType) => void

};

function CartProducts({
  cartProducts,
  handleDecreaseButton,
  handleDeleteButton,
  handleIncreaseButton }:CartProductProps) {
  return (cartProducts.map((cartProduct) => (
    <div
      className={ styles.container }
      key={ cartProduct.id }
    >
      <button
        className={ `${styles.btn} ${styles.btnRemove}` }
        data-testid="remove-product"
        onClick={ () => handleDeleteButton(cartProduct) }
      >
        x

      </button>
      <img src={ cartProduct.thumbnail } alt="product" />
      <h2
        className={ styles.title }
        data-testid="shopping-cart-product-name"
      >
        { cartProduct.title }

      </h2>
      <button
        className={ `${styles.btnQuantity} ${styles.btnQuantityDecrease}` }
        data-testid="product-decrease-quantity"
        onClick={ () => handleDecreaseButton(cartProduct) }
      >
        -
      </button>
      <h3
        data-testid="shopping-cart-product-quantity"
        className={ styles.quantity }
      >
        {cartProduct.quantity}
      </h3>
      <button
        className={ styles.btnQuantity }
        data-testid="product-increase-quantity"
        onClick={ () => handleIncreaseButton(cartProduct) }
      >
        +
      </button>
      <h3 className={ styles.productPrice }>
        R$
        {(Number(cartProduct.price) * Number(cartProduct.quantity))
          .toFixed(2).replace('.', ',')}
      </h3>
    </div>
  )));
}

export default CartProducts;
