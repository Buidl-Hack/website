import { VerificationResponse, WidgetProps } from '@worldcoin/id';
import dynamic from 'next/dynamic';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAccount, useContract, useProvider } from 'wagmi';
import { ABI, MUMBAI_CONTRACT } from '../constants';
import { Contracts_Hubster_sol_Contract } from '../Contracts_Hubster_sol_Contract';
import style from '../styles/SignUpForm.module.css';
import { shorten } from '../utils';

const WorldIDWidget = dynamic<WidgetProps>(
  () => import('@worldcoin/id').then((mod) => mod.WorldIDWidget),
  { ssr: false },
);

interface IFormItemProps {
  label: string;
  input: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormItem = ({ label, input, onChange }: IFormItemProps) => {
  return (
    <>
      <p className={style.formItemLabel}>{label}</p>
      <input
        className={style.formItemInput}
        type="text"
        value={input}
        onChange={onChange}
        disabled={onChange === undefined}
      />
    </>
  );
};

export const SignUpForm = () => {
  const { address } = useAccount();
  const [isUnique, setIsUnique] = useState(false);
  const provider = useProvider();
  const contract = useContract<Contracts_Hubster_sol_Contract>({
    addressOrName: MUMBAI_CONTRACT,
    contractInterface: ABI,
    signerOrProvider: provider,
  });
  useEffect(() => {
    contract.on('ProofVerified', (author: string) => {
      setIsUnique(true);
      console.log(author);
    });
  }, [contract, setIsUnique]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExp] = useState('');
  const applyName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.currentTarget.value);
  const applyRole = (e: ChangeEvent<HTMLInputElement>) =>
    setRole(e.currentTarget.value);
  const applyExp = (e: ChangeEvent<HTMLInputElement>) =>
    setExp(e.currentTarget.value);
  if (address === undefined) return null;
  return (
    <>
      <div className={style.createProfile}>
        <h2>Mint your unique profile</h2>
        <p>You can modify it later</p>
      </div>
      <div className={style.form}>
        <FormItem label="@name" input={name} onChange={applyName} />
        <FormItem label="role" input={role} onChange={applyRole} />
        <FormItem label="experience" input={experience} onChange={applyExp} />
        <FormItem label="wallet" input={shorten(address)} />
        <div className={style.formItemWide}>
          <WorldIDWidget
            actionId="wid_staging_4e245125700e19e33721f5a0ed5afc46"
            signal={address}
            onSuccess={(verificationResponse: VerificationResponse) => {
              contract.verifyAndExecute(
                address,
                verificationResponse.merkle_root,
                verificationResponse.nullifier_hash,
                verificationResponse.proof,
              );
              console.log(verificationResponse);
            }}
            onInitError={(error) => console.log(error)}
            onInitSuccess={() => console.log('success')}
            onError={(error) => console.error(error)}
          />
        </div>
        <div className={style.formItemWide}>
          {
            <button
              disabled={!isUnique}
              className={style.mint}
              onClick={() => contract.mintProfileNft(address, 'hello')}
            >
              Mint my profile
            </button>
          }
        </div>
      </div>
    </>
  );
};
