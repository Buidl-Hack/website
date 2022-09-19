import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import style from '../styles/Header.module.css';

export default function Header() {
  return (
    <header className={style.header}>
      <Link href="/" passHref>
        <a>
          <h1>
            <img src="/logo.svg" alt="logo" />
          </h1>
        </a>
      </Link>
      <ConnectButton />
    </header>
  );
}
