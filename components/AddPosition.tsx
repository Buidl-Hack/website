import { ChangeEvent, useState } from 'react';
import { OPTIONS } from '../constants';
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
  const [duration, setDuration] = useState('');
  const [role, setRole] = useState('');
  const [employer, setEmployer] = useState('');
  const applyDuration = (e: ChangeEvent<HTMLInputElement>) =>
    setDuration(e.currentTarget.value);
  const applyRole = (e: ChangeEvent<HTMLSelectElement>) =>
    setRole(e.currentTarget.value);
  const applyEmployer = (e: ChangeEvent<HTMLInputElement>) =>
    setEmployer(e.currentTarget.value);
  return (
    <>
      <div className={style.createProfile} style={{ marginTop: '100px' }}>
        <h2>Mint a position</h2>
      </div>
      <div className={style.form}>
        <FormItemInput label="When" input={duration} onChange={applyDuration} />
        <FormItemSelect
          label="Role"
          input={role}
          onChange={applyRole}
          options={OPTIONS.roles}
        />
        <FormItemInput
          label="Employer"
          input={employer}
          onChange={applyEmployer}
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
