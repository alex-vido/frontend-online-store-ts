import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductType } from '../../types';
import styles from './checkout.module.css';
import backbtn from '../../assets/backbtn.svg';
import barCode from '../../assets/icon _barcode_.svg';

function Checkout() {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);
  const [data, setData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
  });
  const [isInvalid, setIsInvalid] = useState<boolean>(true);

  const { name, email, cpf, phone, cep, address, payment } = data;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setData(((prevData) => ({
      ...prevData,
      [event.target.name]: value,
    })));
  };

  useEffect(() => {
    const productsFromStorage = localStorage.getItem('products');
    if (productsFromStorage) {
      const products = JSON.parse(productsFromStorage);
      setCartProducts(products);
    }
  }, []);

  const handleClick = () => {
    if (name && email && cpf && phone && cep && address && payment) {
      setCartProducts([]);
      localStorage.setItem('products', JSON.stringify([]));
      navigate('/cart');
    } else {
      setIsInvalid(false);
    }
  };

  return (
    <div className={ styles.checkoutContainer }>
      <section className={ styles.productCheckoutDetails }>
        <Link to="/cart">
          <img src={ backbtn } alt="back button" />
        </Link>
        <section className={ styles.productDetails }>
          <h2 className={ styles.reviewTitle }>Revise seus produtos</h2>
          {
          cartProducts.map((cartProduct) => {
            return (
              <div
                className={ styles.container }
                key={ cartProduct.id }
              >
                <img src={ cartProduct.thumbnail } alt="product" />
                <h2 className={ styles.title }>
                  { cartProduct.title }
                </h2>
                <h2 className={ styles.price }>
                  R$
                  {' '}
                  { Number(cartProduct.price).toFixed(2).replace('.', ',') }
                </h2>
                <h2 className={ styles.price }>
                  Quantidade:
                  {' '}
                  { cartProduct.quantity }
                </h2>
              </div>
            );
          })
          }
          <h2 className={ styles.reviewTotal }>Valor total: R$ 300,00 </h2>
        </section>
      </section>
      <form className={ styles.form }>
        <h2 className={ styles.formTitle }>Informações do comprador</h2>
        <fieldset className={ styles.fieldset }>
          <label
            htmlFor="name"
          >
            <input
              className={ styles.input }
              data-testid="checkout-fullname"
              type="text"
              id="name"
              name="name"
              value={ name }
              onChange={ handleChange }
              placeholder="Nome Completo"
            />
          </label>
          <label
            htmlFor="email"
          >
            <input
              className={ styles.input }
              data-testid="checkout-email"
              type="text"
              id="email"
              name="email"
              value={ email }
              onChange={ handleChange }
              placeholder="Email"
            />
          </label>
          <label
            htmlFor="cpf"
          >
            <input
              className={ styles.input }
              data-testid="checkout-cpf"
              type="text"
              id="cpf"
              name="cpf"
              value={ cpf }
              onChange={ handleChange }
              placeholder="CPF"
            />
          </label>
          <label
            htmlFor="phone"
          >
            <input
              className={ styles.input }
              data-testid="checkout-phone"
              type="text"
              id="phone"
              name="phone"
              value={ phone }
              onChange={ handleChange }
              placeholder="Telefone"
            />
          </label>
          <label
            htmlFor="cep"
          >
            <input
              className={ `${styles.input} ${styles.cep}` }
              data-testid="checkout-cep"
              type="text"
              id="cep"
              name="cep"
              value={ cep }
              onChange={ handleChange }
              placeholder="CEP"
            />
          </label>
          <label
            htmlFor="address"
          >
            <input
              className={ `${styles.input} ${styles.address}` }
              data-testid="checkout-address"
              type="text"
              id="address"
              name="address"
              value={ address }
              onChange={ handleChange }
              placeholder="Endereço"
            />
          </label>
        </fieldset>
        <label htmlFor="ticket">
          Boleto:
          <input
            data-testid="ticket-payment"
            type="radio"
            name="payment"
            id="ticket"
            value="ticket"
            checked={ payment === 'ticket' }
            onChange={ handleChange }
          />
          <img src={ barCode } alt="bar code" />
        </label>
        <label
          htmlFor="visa"
        >
          Visa:
          <input
            data-testid="visa-payment"
            type="radio"
            name="payment"
            id="visa"
            value="visa"
            checked={ payment === 'visa' }
            onChange={ handleChange }
          />
        </label>
        <label
          htmlFor="master"
        >
          Master:
          <input
            data-testid="master-payment"
            type="radio"
            name="payment"
            id="master"
            value="master"
            checked={ payment === 'master' }
            onChange={ handleChange }
          />
        </label>
        <label
          htmlFor="elo"
        >
          Elo:
          <input
            data-testid="elo-payment"
            type="radio"
            name="payment"
            id="elo"
            value="elo"
            checked={ payment === 'elo' }
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="checkout-btn"
          onClick={ handleClick }
        >
          Finalizar compra
        </button>
      </form>
      {
        !isInvalid && (
          <h3
            data-testid="error-msg"
          >
            Campos inválidos
          </h3>
        )
      }
    </div>
  );
}

export default Checkout;
