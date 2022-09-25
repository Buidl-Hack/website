import style from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <p>Hubster was made at EthOnline 2022</p>
      <div className={style.logos}>
        <img src="/ethglobal.svg" alt="ethglobal" />
        <img src="/polygon.svg" alt="ethglobal" />
        <img src="/worldcoin.svg" alt="ethglobal" />
        <img src="/nftport.svg" alt="ethglobal" />
        <img src="/ipfs.svg" alt="ethglobal" />
        {/* <img src="/xmtp.svg" alt="ethglobal" /> */}
      </div>
    </footer>
  );
}
