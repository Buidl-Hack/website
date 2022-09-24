import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { OPTIONS } from '../constants';
import style from '../styles/profile.module.css';

interface IPosition {
  duration: string;
  description: string;
  role: string;
  employer: string;
  nft: string;
}

export default function Profile() {
  const [positions, setPositions] = useState<IPosition[]>([]);
  useEffect(() => {
    if (positions.length > 0) {
      return;
    }
    const a = [];
    for (let i = 0; i < 4; i++) {
      a.push({
        nft: `/nfts/position/${Math.ceil(Math.random() * 19)}.png`,
        role: OPTIONS.roles[Math.ceil(Math.random() * 14)].text,
        employer: 'Twitter',
        description: 'awesome',
        duration: 'jan 22 - dec 23',
      });
    }
    setPositions(a);
  }, [positions, setPositions]);
  return (
    <div className={style.profilePage}>
      <div>
        <h2>My profile</h2>
        <div className={style.profileBox}>
          <div className={style.buttonContainer}>
            <Link href="edit" passHref>
              <a className={style.profileButtons}>edit profile</a>
            </Link>
          </div>
          <div className={style.profileContainer}>
            <Image
              src="/nfts/profile/5.png"
              alt="profile nft"
              width={234}
              height={234}
            />
            <div className={style.profileContent}>
              <div className={style.profileItems}>
                <div className={style.profileItem}>
                  <p>@realweyonce</p>
                  <p>0xferfrefr</p>
                </div>
                <div className={style.profileItem}>
                  <p>Experience</p>
                  <p>4-5y</p>
                </div>
                <div className={style.profileItem}>
                  <p>Web3 experience</p>
                  <p>Expert</p>
                </div>
                <div className={style.profileItem}>
                  <p>Interests</p>
                  <p>DAOs</p>
                </div>
              </div>
              <div className={style.profileRolesBox}>
                <p>Roles</p>
                <div className={style.profileRoles}>
                  <p>UI/UX</p>
                  <p>Product designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>My soulbound career</h2>
        <div className={style.profileBox}>
          <div className={style.buttonContainer}>
            <Link href="add-position" passHref>
              <a className={style.profileButtons}>add position</a>
            </Link>
          </div>
          <div className={style.positions}>
            {positions.map((position, index) => (
              <div key={index} className={style.position}>
                <Image
                  src={position.nft}
                  width={580}
                  height={400}
                  alt="position nft"
                />
                <div className={style.positionContent}>
                  <div className={style.positionContentMain}>
                    <p>
                      <b>{position.duration}</b>
                    </p>
                    <p>{position.description}</p>
                  </div>
                  <div className={style.positionRole}>{position.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
