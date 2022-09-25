import { VerificationResponse, WidgetProps } from '@worldcoin/id';
import { utils } from 'ethers';
import { create } from 'ipfs-http-client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import {
  ABI,
  API_SECRET,
  MUMBAI_CONTRACT,
  OPTIONS,
  PROJECT_ID,
} from '../constants';
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
  const router = useRouter();
  const [response, setResponse] = useState<IVerifyArgs>();
  const [isVerified, setVerified] = useState(false);
  const [CID, setCID] = useState<string>();
  const [hasRequestedNFT, requestProfileNFT] = useState(false);
  useContractEvent({
    addressOrName: MUMBAI_CONTRACT,
    contractInterface: ABI,
    eventName: 'ProofVerified',
    listener: (event) => {
      console.info('Event: ProofVerified');
      setVerified(true);
    },
  });
  const { data: hasProfileNft } = useContractRead({
    addressOrName: MUMBAI_CONTRACT,
    contractInterface: ABI,
    functionName: 'hasProfileNft',
    args: [address],
    enabled: address !== undefined,
  });
  const { data: verifiedOnContract } = useContractRead({
    addressOrName: MUMBAI_CONTRACT,
    contractInterface: ABI,
    functionName: 'isVerified',
    args: [address],
    enabled: address !== undefined,
  });
  const { config: mintConfig, error: mintError } = usePrepareContractWrite({
    addressOrName: MUMBAI_CONTRACT,
    contractInterface: ABI,
    functionName: 'mintProfileNft',
    args: [address, CID],
    enabled: address !== undefined && CID !== undefined,
    overrides: {
      gasLimit: utils.parseEther('0.00000000001'),
    },
  });
  const { config: localMintConfig, error: localMintError } =
    usePrepareContractWrite({
      addressOrName: MUMBAI_CONTRACT,
      contractInterface: ABI,
      functionName: 'localMintProfile',
      args: [address, CID],
      enabled: address !== undefined && CID !== undefined,
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
      response?.merkle_root,
      response?.nullifier_hash,
      response?.proof,
    ],
    enabled: address !== undefined && response !== undefined,
    overrides: {
      gasLimit: utils.parseEther('0.00000000001'),
    },
  });
  const mint = useContractWrite(mintConfig);
  const localMint = useContractWrite(localMintConfig);
  const verify = useContractWrite(verifyConfig);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [role2, setRole2] = useState('');
  const [exp, setExp] = useState('');
  const [interests, setInterests] = useState('');
  const [web3, setWeb3] = useState('');
  const [isUseWorldcoin, setUseWorldcoin] = useState(true);
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
  useEffect(() => {
    if (address === undefined) {
      router.push('/connect');
    }
    if ((verifiedOnContract as any) === true) {
      console.info(
        'This address is already verified on the contract',
        verifiedOnContract,
      );
      setVerified(true);
    }
    if (response !== undefined) {
      verify.write?.();
      console.info('Calling verifyAndExecute');
    }
    if ((hasProfileNft as any) === true) {
      console.log('has profile nft');
      return router.push('/profile');
    }
    if (CID !== undefined && hasRequestedNFT) {
      if (isUseWorldcoin) {
        console.log('Calling mintProfileNft with CID', CID);
        mint.write?.();
      } else {
        console.log('Calling localMintProfile with CID', CID);
        localMint.write?.();
      }
      requestProfileNFT(false);
    }
  }, [
    verifiedOnContract,
    response,
    verify,
    address,
    router,
    hasProfileNft,
    mint,
    localMint,
    isUseWorldcoin,
    CID,
    hasRequestedNFT,
    requestProfileNFT,
  ]);
  if (address === undefined) {
    return null;
  }
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
        {!isVerified && isUseWorldcoin && (
          <div className={style.formItemWide}>
            <WorldIDWidget
              actionId="wid_staging_4e245125700e19e33721f5a0ed5afc46"
              signal={address}
              onSuccess={(verificationResponse: VerificationResponse) => {
                console.info('Received worldcoin verification');
                setResponse({
                  ...verificationResponse,
                  address,
                  proof: utils.defaultAbiCoder.decode(
                    ['uint256[8]'],
                    verificationResponse.proof,
                  )[0] as number[],
                });
              }}
              onInitError={(error) => console.log(error)}
              onInitSuccess={() => console.log('success')}
              onError={(error) => console.error(error)}
            />
          </div>
        )}
        {isUseWorldcoin && (
          <div className={style.formItemWide}>
            <button
              className={style.mint}
              onClick={() => setUseWorldcoin(false)}
            >
              Skip worldcoin
            </button>
          </div>
        )}
        <div className={style.formItemWide}>
          <button
            className={style.mint}
            disabled={!isVerified && isUseWorldcoin}
            onClick={() => {
              const fetchData = async () => {
                const auth =
                  'Basic ' +
                  Buffer.from(`${PROJECT_ID}:${API_SECRET}`).toString('base64');
                const client = create({
                  host: 'ipfs.infura.io',
                  port: 5001,
                  protocol: 'https',
                  headers: {
                    authorization: auth,
                  },
                });
                const file = new File(
                  [
                    JSON.stringify({
                      name,
                      role,
                      role2,
                      web3,
                      interests,
                      exp,
                    }),
                  ],
                  'data.json',
                );
                console.log('Storing data on IPFS');
                const { path } = await client.add(file);
                console.log('Received CID for IPFS: ', path);
                setCID(path);
                requestProfileNFT(true);
              };
              fetchData();
            }}
          >
            Mint my profile
          </button>
        </div>
      </div>
    </>
  );
};
