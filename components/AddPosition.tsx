import { utils } from 'ethers';
import { create } from 'ipfs-http-client';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import {
  ABI,
  API_SECRET,
  MUMBAI_CONTRACT,
  OPTIONS,
  PROJECT_ID,
} from '../constants';
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
  const { address } = useAccount();
  const [duration, setDuration] = useState('');
  const [role, setRole] = useState('');
  const [employer, setEmployer] = useState('');
  const [CID, setCID] = useState<string>();
  const [hasRequestedAddPosition, requestAddposition] = useState(false);
  const applyDuration = (e: ChangeEvent<HTMLInputElement>) =>
    setDuration(e.currentTarget.value);
  const applyRole = (e: ChangeEvent<HTMLSelectElement>) =>
    setRole(e.currentTarget.value);
  const applyEmployer = (e: ChangeEvent<HTMLInputElement>) =>
    setEmployer(e.currentTarget.value);
  const { config: addPositionConfig, error: addPositionError } =
    usePrepareContractWrite({
      addressOrName: MUMBAI_CONTRACT,
      contractInterface: ABI,
      functionName: 'mintWorkNft',
      args: [address, CID],
      enabled: address !== undefined && CID !== undefined,
      overrides: {
        gasLimit: utils.parseEther('0.00000000001'),
      },
    });
  const addPosition = useContractWrite(addPositionConfig);
  useEffect(() => {
    if (hasRequestedAddPosition && CID !== undefined) {
      console.log('Calling mintWorkNft with CID', CID);
      addPosition.write?.();
      requestAddposition(false);
    }
  }, [requestAddposition, hasRequestedAddPosition, addPosition, CID]);
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
              onClick={() => {
                const fetchData = async () => {
                  const auth =
                    'Basic ' +
                    Buffer.from(`${PROJECT_ID}:${API_SECRET}`).toString(
                      'base64',
                    );
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
                        duration,
                        role,
                        employer,
                      }),
                    ],
                    'data.json',
                  );
                  console.log('Storing data on IPFS');
                  const { path } = await client.add(file);
                  console.log('Received CID for IPFS: ', path);
                  setCID(path);
                  requestAddposition(true);
                };
                fetchData();
              }}
            >
              Mint position
            </button>
          }
        </div>
      </div>
    </>
  );
};
