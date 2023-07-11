import mastercard from '../../assets/icon _MasterCard_.svg';
import visa from '../../assets/icon _Visa_.svg';
import barCode from '../../assets/icon _barcode_.svg';
import elo from '../../assets/icon _elo_.svg';
import styles from './checkoutForm.module.css';

type CheckoutFormProps = {
  name:string;
  email:string;
  cpf:string;
  phone: string,
  cep: string,
  address: string,
  payment: string,
  handleChange:(event: React.ChangeEvent<HTMLInputElement>) => void,
  handleClick:()=>void
};
function CheckoutForm({ name,
  email,
  cpf,
  phone,
  cep,
  address,
  payment,
  handleChange,
  handleClick }:CheckoutFormProps) {
  return (
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
      <h2 className={ styles.formTitle }>Método de pagamento</h2>
      <fieldset className={ styles.paymentContainer }>
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
          <img src={ visa } alt="visa" />

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
          <img src={ mastercard } alt="mastercard" />

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
          <img src={ elo } alt="elo" />

        </label>
      </fieldset>

      <button
        type="button"
        data-testid="checkout-btn"
        onClick={ handleClick }
      >
        Comprar

      </button>
    </form>
  );
}

export default CheckoutForm;
