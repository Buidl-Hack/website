import { VerificationResponse, WidgetProps } from '@worldcoin/id';
import dynamic from 'next/dynamic';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAccount, useContract, useProvider } from 'wagmi';
import { ABI, MUMBAI_CONTRACT, OPTIONS } from '../constants';
import { Contracts_Hubster_sol_Contract } from '../Contracts_Hubster_sol_Contract';
import style from '../styles/SignUpForm.module.css';
import { shorten } from '../utils';

const WorldIDWidget = dynamic<WidgetProps>(
  () => import('@worldcoin/id').then((mod) => mod.WorldIDWidget),
  { ssr: false },
);

interface IFormOption {
  value: string;
  text: string;
}

interface IFormItemSelectProps {
  label: string;
  input: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: IFormOption[];
}

const FormItemSelect = ({
  label,
  input,
  onChange,
  options,
}: IFormItemSelectProps) => {
  return (
    <>
      <p className={style.formItemLabel}>{label}</p>
      <select
        className={style.formItemInput}
        value={input}
        onChange={onChange}
        disabled={onChange === undefined}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </>
  );
};

const FormItemInput = ({
  label,
  input,
  onChange,
}: {
  label: string;
  input: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
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
  const [role2, setRole2] = useState('');
  const [exp, setExp] = useState('');
  const [interests, setInterests] = useState('');
  const [web3, setWeb3] = useState('');
  const applyName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.currentTarget.value);
  const applyRole = (e: ChangeEvent<HTMLSelectElement>) =>
    setRole(e.currentTarget.value);
  const applyRole2 = (e: ChangeEvent<HTMLSelectElement>) =>
    setRole2(e.currentTarget.value);
  const applyExp = (e: ChangeEvent<HTMLSelectElement>) =>
    setExp(e.currentTarget.value);
  const applyInt = (e: ChangeEvent<HTMLSelectElement>) =>
    setInterests(e.currentTarget.value);
  const applyWeb3 = (e: ChangeEvent<HTMLSelectElement>) =>
    setWeb3(e.currentTarget.value);
  if (address === undefined) return null;
  return (
    <>
      <div className={style.createProfile}>
        <h2>Mint your unique profile</h2>
        <p>You can modify it later</p>
      </div>
      <div className={style.form}>
        <FormItemInput label="@name" input={name} onChange={applyName} />
        <FormItemSelect
          label="First role"
          input={role}
          onChange={applyRole}
          options={OPTIONS.roles}
        />
        <FormItemSelect
          label="Second role"
          input={role2}
          onChange={applyRole2}
          options={OPTIONS.roles}
        />
        <FormItemSelect
          label="Web3 experience"
          input={web3}
          onChange={applyWeb3}
          options={OPTIONS.web3Exp}
        />
        <FormItemSelect
          label="Overall experience"
          input={exp}
          onChange={applyExp}
          options={OPTIONS.experience}
        />
        <FormItemSelect
          label="Interest"
          input={interests}
          onChange={applyInt}
          options={OPTIONS.interests}
        />
        <FormItemInput label="wallet" input={shorten(address)} />
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
