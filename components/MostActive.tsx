import { useEffect, useState } from 'react';
import style from '../styles/MostActive.module.css';

export default function MostActive() {
  const [mostActive, setMostActive] = useState<string[]>([]);
  useEffect(() => {
    const a = [];
    for (let i = 0; i < 10; i++) {
      a.push('nuelgeek', 'realkdi', 'weyonce', 'abdul', 'fidex');
    }
    setMostActive(a);
  }, []);
  return (
    <div className={style.mostActive}>
      <h2>Most active members</h2>
      <ul className={style.list}>
        {mostActive.map((member, index) => (
          <li className={style.member} key={index}>
            {member}
          </li>
        ))}
      </ul>
    </div>
  );
}
