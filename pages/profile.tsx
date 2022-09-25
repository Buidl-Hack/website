import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { ABI, MUMBAI_CONTRACT, OPTIONS } from '../constants';
import style from '../styles/profile.module.css';
import { shorten } from '../utils';

interface IPosition {
  duration: string;
  description: string;
  role: string;
  employer: string;
  nft: string;
}

interface IProfile {
  name: string;
  role1: string;
  role2: string;
  web3: string;
  interests: string;
  exp: string;
}

export default function Profile() {
  const { address } = useAccount();
  const { data: cid } = useContractRead({
    addressOrName: MUMBAI_CONTRACT,
    contractInterface: ABI,
    functionName: 'addressTokenUri',
    args: [address],
    enabled: address !== undefined,
  });
  const [profileData, setProfileData] = useState<IProfile>();
  const [positions, setPositions] = useState<IPosition[]>([]);
  const [ipfsCalled, setIpfsCalled] = useState(false);
  useEffect(() => {
    if (cid !== undefined && profileData === undefined && !ipfsCalled) {
      setIpfsCalled(true);
      fetch('https://infura-ipfs.io/ipfs/' + (cid as any as string))
        .then((r) => r.json())
        .then((result) => {
          console.log(result);
          setProfileData({
            name: result.name,
            role1: result.role,
            role2: result.role2,
            web3: result.web3,
            exp: result.exp,
            interests: result.interests,
          });
        })
        .catch(console.warn);
    }
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
  }, [positions, setPositions, ipfsCalled, profileData, cid]);
  return (
    <div className={style.profilePage}>
      <div className={style.profileBox}>
        <h2>My profile</h2>
        <div className={style.buttonContainer}>
          <Link href="edit" passHref>
            <a className={style.profileButtons}>edit profile</a>
          </Link>
        </div>
        {profileData === undefined || address === undefined ? (
          'Loading'
        ) : (
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
                  <p>@{profileData?.name}</p>
                  <p>{shorten(address as any as string)}</p>
                </div>
                <div className={style.profileItem}>
                  <p>Experience</p>
                  <p>{profileData?.exp}</p>
                </div>
                <div className={style.profileItem}>
                  <p>Web3 experience</p>
                  <p>{profileData?.web3}</p>
                </div>
                <div className={style.profileItem}>
                  <p>Interests</p>
                  <p>{profileData?.interests}</p>
                </div>
              </div>
              <div className={style.profileRolesBox}>
                <p>Roles</p>
                <div className={style.profileRoles}>
                  <p>{profileData?.role1}</p>
                  <p>{profileData?.role2}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={style.profileBox}>
        <h2>My soulbound career</h2>
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
                  <p>{/* position.description */ ' '}</p>
                </div>
                <div className={style.positionRole}>{position.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
