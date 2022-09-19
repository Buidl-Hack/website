import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import style from '../styles/Header.module.css';
import { shorten } from '../utils';

export default function Header() {
  const { pathname } = useRouter();
  const { address } = useAccount();
  return (
    <header className={style.header}>
      <Link href="/" passHref>
        <a>
          <h1>
            <img src="/logo.svg" alt="logo" />
          </h1>
        </a>
      </Link>
      {address !== undefined && pathname !== '/' && (
        <button className={style.addressButton}>{shorten(address)}</button>
      )}
    </header>
  );
}
