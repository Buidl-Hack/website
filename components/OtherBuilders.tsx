import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import style from '../styles/OtherBuilders.module.css';

export default function OtherBuilders() {
  const [mostActive, setMostActive] = useState<string[]>([]);
  useEffect(() => {
    const a = [];
    for (let i = 0; i < 20; i++) {
      a.push('nuelgeek', 'realkdi', 'weyonce', 'abdul', 'fidex');
    }
    setMostActive(a);
  }, []);
  return (
    <div className={style.mostActive}>
      <h2>Other builders</h2>
      <ReactTooltip effect="solid" place="bottom" />
      <ul className={style.list}>
        {mostActive.map((member, index) => (
          <li className={style.member} key={index}>
            <img
              src={`/nfts/profile/${index + 1}.png`}
              alt="nft"
              className={style.img}
              data-tip={member}
              data-for={member}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
