import { ChangeEvent, useState } from 'react';
import { useContract, useProvider } from 'wagmi';
import { ABI, MUMBAI_CONTRACT, OPTIONS } from '../constants';
import { Contracts_Hubster_sol_Contract } from '../Contracts_Hubster_sol_Contract';
import style from '../styles/SignUpForm.module.css';

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

export const AddPosition = () => {
  const provider = useProvider();
  const contract = useContract<Contracts_Hubster_sol_Contract>({
    addressOrName: MUMBAI_CONTRACT,
    contractInterface: ABI,
    signerOrProvider: provider,
  });
  const [description, setDescription] = useState('');
  const [role, setRole] = useState('');
  const [exp, setExp] = useState('');
  const [interests, setInterests] = useState('');
  const [web3, setWeb3] = useState('');
  const applyDescription = (e: ChangeEvent<HTMLInputElement>) =>
    setDescription(e.currentTarget.value);
  const applyRole = (e: ChangeEvent<HTMLSelectElement>) =>
    setRole(e.currentTarget.value);
  const applyExp = (e: ChangeEvent<HTMLSelectElement>) =>
    setExp(e.currentTarget.value);
  const applyInt = (e: ChangeEvent<HTMLSelectElement>) =>
    setInterests(e.currentTarget.value);
  const applyWeb3 = (e: ChangeEvent<HTMLSelectElement>) =>
    setWeb3(e.currentTarget.value);
  return (
    <>
      <div className={style.createProfile}>
        <h2>Mint your unique profile</h2>
        <p>You can modify it later</p>
      </div>
      <div className={style.form}>
        <FormItemInput
          label="Description"
          input={description}
          onChange={applyDescription}
        />
        <FormItemSelect
          label="First role"
          input={role}
          onChange={applyRole}
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
        <div className={style.formItemWide}>
          {
            <button
              className={style.mint}
              // onClick={() => contract.mintProfileNft(address, 'hello')}
            >
              Mint position
            </button>
          }
        </div>
      </div>
    </>
  );
};
