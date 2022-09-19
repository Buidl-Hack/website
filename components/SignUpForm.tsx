import { WidgetProps } from '@worldcoin/id';
import dynamic from 'next/dynamic';
import { ChangeEvent, useState } from 'react';
import { useAccount } from 'wagmi';
import style from '../styles/SignUpForm.module.css';

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
    <div className={style.formItem}>
      <p className={style.formItemLabel}>{label}</p>
      <input
        type="text"
        value={input}
        onChange={onChange}
        disabled={onChange === undefined}
      />
    </div>
  );
};

export const SignUpForm = () => {
  const { address } = useAccount();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExp] = useState('');
  const [ready, setReady] = useState(false);
  const applyName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.currentTarget.value);
  const applyRole = (e: ChangeEvent<HTMLInputElement>) =>
    setRole(e.currentTarget.value);
  const applyExp = (e: ChangeEvent<HTMLInputElement>) =>
    setExp(e.currentTarget.value);
  if (address === undefined) return null;
  return (
    <form className={style.form}>
      <FormItem label="wallet" input={address} />
      <FormItem label="@name" input={name} onChange={applyName} />
      <FormItem label="role" input={role} onChange={applyRole} />
      <FormItem label="experience" input={experience} onChange={applyExp} />
      <div className={style.formItem}>
        <WorldIDWidget
          actionId="wid_staging_ee85947aa1c7579c674636370c737b12" // obtain this from developer.worldcoin.org
          signal="my_signal"
          enableTelemetry
          onSuccess={(verificationResponse: any) => {
            console.log(verificationResponse);
            setReady(true);
          }}
          onError={(error) => console.error(error)}
        />
      </div>
      <button disabled={!ready}>Mint my profile</button>
    </form>
  );
};
