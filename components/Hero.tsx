import Link from 'next/link';
import style from '../styles/Hero.module.css';

export default function Hero() {
  return (
    <div className={style.hero}>
      <img className={style.drawing} alt="hero" src="/hero.svg" />
      <div className={style.intro}>
        <h2>Your hub for working with web3</h2>
        <p>
          Personalize your work-profile NFT, share your work-history on-chain,
          and connect with others to buidl{' '}
        </p>
        <div className={style.actions}>
          <Link passHref href={'/connect'}>
            <a className={style.connect}>Let's go !</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
