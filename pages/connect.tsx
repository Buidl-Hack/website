import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { ConnectWallet } from '../components/ConnectWallet';
import { ABI, MUMBAI_CONTRACT } from '../constants';
import style from '../styles/connect.module.css';

export default function Connect() {
  const { address } = useAccount();
  const router = useRouter();
  const { data } = useContractRead({
    addressOrName: MUMBAI_CONTRACT,
    contractInterface: ABI,
    functionName: 'hasProfileNft',
    args: [address],
    enabled: address !== undefined,
  });
  useEffect(() => {
    if ((data as any) === false) {
      router.push('/signup');
    }
    if ((data as any) === true) {
      router.push('/profile');
    }
  }, [data, router]);
  return (
    <div className={style.connectPage}>
      <div className={style.instructions}>
        <ConnectWallet />
      </div>
    </div>
  );
}
