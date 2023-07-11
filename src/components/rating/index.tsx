import { useEffect, useState } from 'react';
import { StarIcon } from '../../assets/star';
import { RatingType } from '../../types';
import styles from './rating.module.css';

type RatingProps = {
  productId: string
};

export default function Rating({ productId }: RatingProps) {
  const ratingLevel: number[] = [1, 2, 3, 4, 5];
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const [validation, setValidation] = useState(false);

  const [ratingLvl, setRatingLvl] = useState('');
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');

  const [avaliationInfo, setAvaliationInfo] = useState<RatingType[]>([]);

  const handleRatingLvl = (level: string) => {
    setRatingLvl(level);
  };

  const checkFields = () => {
    const valid = emailRegex.test(email) && ratingLvl.length > 0;
    setValidation(valid);
  };

  const clearInputs = () => {
    setEmail('');
    setFeedback('');
    setRatingLvl('');
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    checkFields();
    if (validation) {
      const obj = {
        email,
        rating: ratingLvl,
        text: feedback,
      };
      localStorage.setItem(productId, JSON.stringify(obj));
      clearInputs();
    }
  };

  useEffect(() => {
    const getRating = localStorage.getItem(productId);
    if (getRating) setAvaliationInfo([...avaliationInfo, JSON.parse(getRating)]);
  }, [productId, avaliationInfo]);

  return (
    <div className={ styles.ratingContainer }>
      <h2 className={ styles.ratingTitle }>Avaliações</h2>
      <form className={ styles.formRating }>
        <fieldset className={ styles.ratingFildset }>
          <label htmlFor="email">
            <input
              type="text"
              data-testid="product-detail-email"
              name="email"
              id="email"
              placeholder="Email"
              value={ email }
              className={ styles.inputEmail }
              onChange={ (event) => setEmail(event.target.value) }
            />
          </label>

          <label htmlFor="star" className={ styles.ratingLabel }>
            {ratingLevel.map((lvl) => (
              <div key={ lvl }>
                <input
                  type="radio"
                  name="star"
                  data-testid={ `${lvl}-rating` }
                  onChange={ () => handleRatingLvl(String(lvl)) }
                />
                <StarIcon />
              </div>
            ))}
          </label>

        </fieldset>
        <label htmlFor="feedback" className={ styles.feedback }>
          <textarea
            data-testid="product-detail-evaluation"
            name="feedback"
            placeholder="Mensagem (opcional)"
            value={ feedback }
            onChange={ (event) => setFeedback(event.target.value) }
          />
        </label>
        <button
          className={ styles.ratingButton }
          data-testid="submit-review-btn"
          value={ feedback }
          onClick={ (event) => handleClick(event) }
        >
          Avaliar
        </button>
      </form>
      {(!validation) ? (<p>Capos inválidos</p>) : (<br />)}
      { avaliationInfo.map((avaliation, index) => (
        <div key={ index }>
          <p>{ avaliation.email }</p>
          <p>{ avaliation.rating }</p>
          <p>{ avaliation.text }</p>
        </div>
      )) }
    </div>
  );
}
