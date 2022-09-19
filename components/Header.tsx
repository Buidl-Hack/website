import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import style from '../styles/Header.module.css';
import { AddressButton } from './AddressButton';

export default function Header() {
  const { pathname } = useRouter();
  const { address } = useAccount();
  const showAddressButton = address !== undefined && pathname !== '/';
  return (
    <header className={style.header}>
      <Link href="/" passHref>
        <a>
          <h1>
            <img src="/logo.svg" alt="logo" />
          </h1>
        </a>
      </Link>
      {showAddressButton && <AddressButton address={address} />}
    </header>
  );
}
