import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backbtn from '../../assets/backbtn.svg';
import CheckoutForm from '../../components/CheckoutForm';
import { ProductType } from '../../types';
import styles from './checkout.module.css';

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
      navigate('/');
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

      <CheckoutForm
        name={ name }
        email={ email }
        cpf={ cpf }
        phone={ phone }
        cep={ cep }
        address={ address }
        payment={ payment }
        handleChange={ handleChange }
        handleClick={ handleClick }
      />
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
