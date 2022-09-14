import style from '../styles/Hero.module.css';

export default function Hero() {
  return (
    <div className={style.hero}>
      <div className={style.drawing}></div>
      <div className={style.intro}>
        <h2>web3 native network</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam. Lorem
          ipsum dolor sit amet, consectetuer adipiscing elit.{' '}
        </p>
        <div className={style.actions}>
          <button className={style.connect}>connect wallet</button>
          <button className={style.signup}>sign up</button>
        </div>
      </div>
    </div>
  );
}
