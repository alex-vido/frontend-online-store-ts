import { Outlet } from 'react-router-dom';
import Header, { HeaderProps } from '../Header';
import styles from './layout.module.css';

function Layout({ handleChange, handleClick, searchValue }: HeaderProps) {
  return (
    <div
      className={ styles.mainContainer }
    >
      <Header
        handleChange={ handleChange }
        handleClick={ handleClick }
        searchValue={ searchValue }
      />
      <Outlet />
    </div>
  );
}

export default Layout;
