import style from '../styles/Header.module.css';

export default function Header() {
  return (
    <header>
      <h1 className={style.title}>
        <img src="/logo.svg" alt="logo" />
      </h1>
    </header>
  );
}
