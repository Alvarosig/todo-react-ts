import logo from '../assets/Logo.svg';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo de um foguete ao lado da palavra todo" />
    </header>
  )
}