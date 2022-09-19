import { useAccount } from 'wagmi';
import { ConnectWallet } from '../components/ConnectWallet';
import { SignUpForm } from '../components/SignUpForm';
import style from '../styles/connect.module.css';

export default function Connect() {
  const { address } = useAccount();
  return (
    <div className={style.connectPage}>
      <h2 className={style.createProfile}>Create profile</h2>
      <div className={style.instructions}>
        {address === undefined ? <ConnectWallet /> : <SignUpForm />}
      </div>
    </div>
  );
}
