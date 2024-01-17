import React from 'react';
import { Signer } from 'ethers';
import LogoCartesi from './components/logos/LogoCartesi';
import LogoDoiim from './components/logos/LogoDoiim';

import WalletConnector from './components/WalletConnector';
import CreateProductForm from './components/CreateProductForm';
import ListProducts from './components/ListProducts';
import ListNotices from './components/ListNotices';

import './App.css';

const App = () => {

  const [address, setAddress] = React.useState<string | null>(null);
  const [signer, setSigner] = React.useState<Signer | null>(null);
  const [notices, setNotices] = React.useState<number>(0);

  const onSignerChange = async (s: Signer | null) => {
    setSigner(s);
    if (s) {
      setAddress(await s.getAddress());
    } else {
      setAddress(null);
    }
  }

  const onSendInput = async (input: string) => {
    console.log(input);
  }

  const onNewNotice = async (length: number) => {
    setNotices(length);
  }

  return (
    <div className="app">
      <WalletConnector onSignerChange={onSignerChange} />
      <header className="header">
        <h1>Cartesi + React + SQLite</h1>
        <p>This project is designed to streamline the process of kickstarting new projects. It incorporates React + Typescript, integrates with Ethers and communicates to a SQLite database running on Cartesi Machine.</p>
      </header>
      <main>
        <div>Connected Wallet: {address}</div>
        <CreateProductForm signer={signer}></CreateProductForm>
        <div className="holder">
          <div className='horizontal'>
            <ListProducts signer={signer} noticesLength={notices}></ListProducts>
            <ListNotices onNewNotice={onNewNotice}></ListNotices>
          </div>
        </div>
      </main>
      <footer>
        <p>powered by</p>
        <LogoCartesi />
        <LogoDoiim />
      </footer>
    </div>
  );
};

export default App;
