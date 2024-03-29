import { useCallback, useEffect, useState } from 'react';
import { Signer, providers } from 'ethers';
import styles from './WalletConnector.module.css';

type WalletConnectorProps = {
    onSignerChange: (signer: Signer | null) => void;
};

const targetChain = process.env.REACT_APP_CHAIN_ID ? process.env.REACT_APP_CHAIN_ID : '0x7a69'

const WalletConnector: React.FC<WalletConnectorProps> = ({ onSignerChange }) => {
    const [connectedWallet, setConnectedWallet] = useState<string | null>(null);

    const connectWallet = useCallback(async () => {
        try {
            // Connect wallet in Metamask
            (window as any).ethereum.enable();
            const provider = new providers.Web3Provider((window as any).ethereum);
            const signer = await provider.getSigner();

            setConnectedWallet(await signer.getAddress());
            onSignerChange(signer);

            await provider.send(
                'wallet_switchEthereumChain',
                [{ chainId: targetChain }],
            );
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        }
    }, []);

    const disconnectWallet = () => {
        setConnectedWallet(null);
        onSignerChange(null);
    };

    useEffect(() => {
        connectWallet();
    }, [connectWallet])

    return (
        <div className={styles.fixed}>
            {connectedWallet ? (
                <>
                    {connectedWallet ?
                        <div>{connectedWallet.substring(0, 8)}...{connectedWallet.substring(connectedWallet.length - 4)}</div>
                        : null
                    }
                    <button onClick={disconnectWallet}>Disconnect Wallet</button>
                </>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
};

export default WalletConnector;
