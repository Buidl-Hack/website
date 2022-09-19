import { WidgetProps } from '@worldcoin/id';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import style from '../styles/connect.module.css';

const WorldIDWidget = dynamic<WidgetProps>(
  () => import('@worldcoin/id').then((mod) => mod.WorldIDWidget),
  { ssr: false },
);

export default function Connect() {
  const [address, setAddress] = useState<string>();
  return (
    <div className={style.connectPage}>
      <h2 className={style.createProfile}>Create profile</h2>
      <div className={style.instructions}>
        <p>Connecting your wallet is like "logging in" to Web3.</p>
        <p>Select your wallet from the options to get started.</p>

        {address === undefined && (
          <WorldIDWidget
            actionId="wid_staging_ee85947aa1c7579c674636370c737b12" // obtain this from developer.worldcoin.org
            signal="my_signal"
            enableTelemetry
            onSuccess={(verificationResponse: any) =>
              console.log(verificationResponse)
            }
            onError={(error) => console.error(error)}
          />
        )}
      </div>
    </div>
  );
}
