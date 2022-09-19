import { useDisconnect } from 'wagmi';
import style from '../styles/Header.module.css';
import { shorten } from '../utils';

interface IProps {
  address: string;
}

export const AddressButton = ({ address }: IProps) => {
  const { disconnect } = useDisconnect();
  const logOut = () => disconnect();
  return (
    <div className={style.addressButton}>
      <p>{shorten(address)}</p>
      <button className={style.logOut} onClick={logOut}>
        ×
      </button>
    </div>
  );
};
