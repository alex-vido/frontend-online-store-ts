import { Link } from 'react-router-dom';
import { CategoryType, ProductType } from '../../types';
import styles from './home.module.css';

type HomeProps = {
  searchValue: string,
  categoryData:CategoryType[],
  products:ProductType[]
  handleFilterByCategory:(categoryId: string) => void,
  handleAddProductToCart:(prod:ProductType)=>void
};

function Home({
  categoryData,
  handleFilterByCategory,
  products,
  searchValue,
  handleAddProductToCart,
}: HomeProps) {
  return (
    <div
      className={ styles.container }
    >
      <aside
        className={ styles.aside }
      >
        <h2>Categorias</h2>
        { categoryData
          .map((category) => (
            <button
              data-testid="category"
              key={ category.id }
              onClick={ () => handleFilterByCategory(category.id) }
            >
              { category.name }
            </button>))}
      </aside>
      <section
        className={ styles.homeSection }
      >
        {searchValue.length === 0 && products.length === 0
          ? (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
          : (
            products.map((prod) => (
              <div
                className={ styles.product }
                key={ prod.id }
                data-testid="product"
              >
                <Link
                  data-testid="product-detail-link"
                  to={ `/product/${prod.id}` }
                >
                  <img src={ prod.thumbnail } alt={ prod.title } />
                  <h2>{ prod.title }</h2>
                  <h3>
                    <span>R$</span>
                    {' '}
                    { Number(prod.price).toFixed(2).replace('.', ',') }
                  </h3>
                </Link>
                <button
                  data-testid="product-add-to-cart"
                  onClick={ () => handleAddProductToCart(prod) }
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            )))}
      </section>
    </div>
  );
}

export default Home;
