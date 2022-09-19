import { WidgetProps } from '@worldcoin/id';
import dynamic from 'next/dynamic';
import { ChangeEvent, useState } from 'react';
import { useAccount } from 'wagmi';
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
    <>
      <div className={style.createProfile}>
        <h2>Create your unique profile</h2>
        <p>You can modify it later</p>
      </div>
      <form className={style.form}>
        <FormItem label="@name" input={name} onChange={applyName} />
        <FormItem label="role" input={role} onChange={applyRole} />
        <FormItem label="experience" input={experience} onChange={applyExp} />
        <FormItem label="wallet" input={shorten(address)} />
        <div className={style.formItemWide}>
          <WorldIDWidget
            actionId="wid_staging_ee85947aa1c7579c674636370c737b12" // obtain this from developer.worldcoin.org
            signal={address}
            onSuccess={(verificationResponse: any) => {
              console.log(verificationResponse);
              setReady(true);
            }}
            onInitError={(error) => console.log(error)}
            onInitSuccess={() => console.log('success')}
            onError={(error) => console.error(error)}
          />
        </div>
        <div className={style.formItemWide}>
          <button disabled={!ready} className={style.mint}>
            Mint my profile
          </button>
        </div>
      </form>
    </>
  );
};
