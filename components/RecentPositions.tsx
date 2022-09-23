import Image from 'next/image';
import { useEffect, useState } from 'react';
import style from '../styles/RecentPositions.module.css';

interface IPosition {
  openingDate: string;
  title: string;
  author: string;
}

export default function RecentPositions() {
  const [positionsShown, setPositionsShown] = useState(3);
  const showMore = () => setPositionsShown(positionsShown + 3);
  const [positions, setPositions] = useState<IPosition[]>([]);
  useEffect(() => {
    const a = [];
    for (let i = 0; i < 100; i++) {
      const date = new Date();
      date.setDate(Math.ceil(Math.random() * 10 + 10));
      a.push({
        openingDate: date.toDateString().split(' ').slice(0, 4).join(' '),
        author: ['realkdi', 'weyonce', 'abdul', 'nuelgeek', 'fidex'][
          Math.round(Math.random() * 4)
        ],
        title: [
          'Freemote relance',
          'Rule the world together',
          'Get rich fast with us',
          'Work hard 9-5',
          'Night shift dev',
        ][Math.round(Math.random() * 4)],
      });
    }
    setPositions(a);
  }, []);
  return (
    <div className={style.recentPositions}>
      <h2>Recently listed positions</h2>
      <div className={style.filters}>
        <button>Filter on role</button>
        <button>Filter on experience</button>
      </div>
      <div className={style.positionsContainer}>
        <ol className={style.positionsList}>
          {positions.slice(0, positionsShown).map((position, index) => (
            <div key={index} className={style.positionContainer}>
              <li className={style.position}>
                <div className={style.positionNft}>
                  <Image
                    src={`/nfts/position/${index + 1}.png`}
                    width={225}
                    height={150}
                    alt="position nft"
                  />
                </div>
                <div className={style.positionDescription}>
                  <p className={style.positionTitle}>{position.title}</p>
                  <p className={style.positionOpeningDate}>
                    Opened on {position.openingDate}
                  </p>
                  <p className={style.createdBy}>
                    Created by @{position.author}
                  </p>
                </div>
              </li>
              <div className={style.arrowButton}>
                <span className={style.arrowBar}>
                  <span className={style.arrowTip1}></span>
                  <span className={style.arrowTip2}></span>
                </span>
              </div>
            </div>
          ))}
        </ol>
        <button className={style.loadMore} onClick={showMore}>
          Load more
        </button>
      </div>
    </div>
  );
}
