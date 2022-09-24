import Image from 'next/image';
import { useEffect, useState } from 'react';
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
      <h2>Most active hubsters</h2>
      <ul className={style.list}>
        {mostActive.map((member, index) => (
          <li
            className={style.member}
            key={index}
            data-tip={member}
            data-for={member}
            data-event="hover"
          >
            <Image
              src={`/nfts/profile/${index + 1}.png`}
              alt="nft"
              width="175"
              height="175"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
