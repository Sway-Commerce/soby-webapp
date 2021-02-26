import React from 'react';

import Header from './components/header/header.component';

import { GlobalStyle } from './global.styles';
import { gql, useMutation } from '@apollo/client';
import { Encryption, Signing } from 'credify-crypto';

const App = () => {
  const generateEncryptionKey = async (password) => {
    const encryption = new Encryption();
    await encryption.generateKeyPair();
    const encryptionSecret = await encryption.exportPrivateKey(password);
    const encryptionPublic = await encryption.exportPublicKey();

    console.log({ encryptionSecret, encryptionPublic });
    return { encryptionSecret, encryptionPublic };
  };

  const generateSiginKey = (password) => {
    const signing = new Signing();
    signing.generateKeyPair();
    const signingSecretKey = signing.exportPrivateKey(password);
    const signingPublicKey = signing.exportPublicKey();

    console.log({ signingSecretKey, signingPublicKey });
    return { signingSecretKey, signingPublicKey };
  };

  const { signingSecret, signingPublicKey } = generateSiginKey('123ABCabc#');
  const { encryptionSecret, encryptionPublicKey } = generateEncryptionKey(
    '123ABCabc#'
  );

  const cmd = {
    firstName: 'tuan',
    lastName: 'le',
    phoneCountryCode: '+1',
    phoneNumber: '9379492383',
    email: 'underreaction@greendike.com',
    signingPublicKey,
    signingSecret,
    encryptionPublicKey,
    encryptionSecret,
    password: '123ABCabc#',
  };

  const REGISTER = gql`
    mutation Register($cmd: RegisterCmd!) {
      register(cmd: $cmd) {
        success
        message
        data
      }
    }
  `;

  const [register] = useMutation(REGISTER, {
    variables: {
      cmd
    }
  });

  return (
    <div>
      <GlobalStyle />
      <Header />
      <div onClick={() => register()}>Hello Soby</div>
    </div>
  );
};

export default App;
