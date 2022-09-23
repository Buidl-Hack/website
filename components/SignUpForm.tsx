import { VerificationResponse, WidgetProps } from '@worldcoin/id';
import { utils } from 'ethers';
import dynamic from 'next/dynamic';
import { ChangeEvent, useState } from 'react';
import {
  useAccount,
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import { ABI, MUMBAI_CONTRACT, OPTIONS } from '../constants';
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

interface IVerifyArgs {
  proof: number[];
  nullifier_hash: string;
  address: string;
  merkle_root: string;
}

export const SignUpForm = () => {
  const { address } = useAccount();
  const [response, setResponse] = useState<IVerifyArgs>();
  useContractEvent({
    addressOrName: MUMBAI_CONTRACT,
    contractInterface: ABI,
    eventName: 'ProofVerified',
    listener: (event) => {
      console.log('success', event);
    },
  });
  const { config: mintConfig, error: mintError } = usePrepareContractWrite({
    addressOrName: MUMBAI_CONTRACT,
    contractInterface: ABI,
    functionName: 'mintProfileNft',
    args: [address, 'hello'],
    enabled: address !== undefined,
    overrides: {
      gasLimit: utils.parseEther('0.00000000001'),
    },
  });
  const { config: verifyConfig, error: verifyError } = usePrepareContractWrite({
    addressOrName: MUMBAI_CONTRACT,
    contractInterface: ABI,
    functionName: 'verifyAndExecute',
    args: [
      address,
      '0x119400db5812bf79d64cb7160ead77d1a3cb96b18b79f231176741617d5c724e',
      '0x071afa91cd6f788434334ccf4f88281406d314d8f1eb713253991b0f1538f0a9',
      utils.defaultAbiCoder.decode(
        ['uint256[8]'],
        '0x0e0dfc33baf74753844ee437ba95e04a2d816ce5504ed46e5ce8d92a7785bd732b8cbec4cc0f7edd3e8bf4380d30f111963118ddf5ec007d6a81173dc871439a1ea903de9bd73af1270fd7c8773425362321bcdc7b049e47b355c20d94b9f7232007afdbd448233ec3d855d936bc7c66b0f44758b17cfb8a6c681e9dcfc400b52d57138d02b91d7e3402ab9d8b8df05b8b5211ee2c360c8f1508381ea7bf94d0304036066d749ee870ec2ac17ff05277ac5ec6c9ca43784df1c6693e70587f2f097ba905271829e1fa474e7656aeab1bbf9b7488a1a0dcbe6b56b8368838191422e808d8a0c258d106c3487f306dc8602738a4942e6c3e8d8beb62e0fb502e96',
      )[0],
    ],
    enabled: address !== undefined,
    overrides: {
      gasLimit: utils.parseEther('0.00000000001'),
    },
  });
  const mint = useContractWrite(mintConfig);
  const verify = useContractWrite(verifyConfig);
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
        <h2>Mint my unique profile</h2>
        <p>It can be modified later</p>
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
        <FormItemInput label="wallet" input={shorten(address, 5)} />
        <div className={style.formItemWide}>
          <WorldIDWidget
            actionId="wid_staging_4e245125700e19e33721f5a0ed5afc46"
            signal={address}
            onSuccess={(verificationResponse: VerificationResponse) => {
              setResponse({
                ...verificationResponse,
                address,
                proof: utils.defaultAbiCoder.decode(
                  ['uint256[8]'],
                  verificationResponse.proof,
                )[0] as number[],
              });
              console.log(
                'Unique profile verification received:',
                verificationResponse,
              );
            }}
            onInitError={(error) => console.log(error)}
            onInitSuccess={() => console.log('success')}
            onError={(error) => console.error(error)}
          />
        </div>
        <div className={style.formItemWide}>
          <button
            className={style.mint}
            onClick={() => {
              verify.write?.();
              console.log(
                'calling verifyAndExecute with following parameters:',
                address,
                '0x119400db5812bf79d64cb7160ead77d1a3cb96b18b79f231176741617d5c724e',
                '0x071afa91cd6f788434334ccf4f88281406d314d8f1eb713253991b0f1538f0a9',
                utils.defaultAbiCoder.decode(
                  ['uint256[8]'],
                  '0x0e0dfc33baf74753844ee437ba95e04a2d816ce5504ed46e5ce8d92a7785bd732b8cbec4cc0f7edd3e8bf4380d30f111963118ddf5ec007d6a81173dc871439a1ea903de9bd73af1270fd7c8773425362321bcdc7b049e47b355c20d94b9f7232007afdbd448233ec3d855d936bc7c66b0f44758b17cfb8a6c681e9dcfc400b52d57138d02b91d7e3402ab9d8b8df05b8b5211ee2c360c8f1508381ea7bf94d0304036066d749ee870ec2ac17ff05277ac5ec6c9ca43784df1c6693e70587f2f097ba905271829e1fa474e7656aeab1bbf9b7488a1a0dcbe6b56b8368838191422e808d8a0c258d106c3487f306dc8602738a4942e6c3e8d8beb62e0fb502e96',
                )[0],
              );
            }}
          >
            verifyAndExecute
          </button>
        </div>
        <div className={style.formItemWide}>
          <button
            className={style.mint}
            onClick={() => {
              mint.write?.();
              console.log(
                'Calling mintProfileNft with following params:',
                address,
                'hello',
              );
            }}
          >
            Mint my profile
          </button>
        </div>
      </div>
    </>
  );
};
