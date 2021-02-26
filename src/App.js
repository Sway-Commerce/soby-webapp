import React from 'react';

import Header from './components/header/header.component';

import { GlobalStyle } from './global.styles';
import { gql, useMutation } from '@apollo/client';
import { Encryption, Signing } from 'credify-crypto';

const App = () => {
  const cmd = {
    firstName: 'tuan',
    lastName: 'le',
    phoneCountryCode: '+1',
    phoneNumber: '9379492383',
    email: 'underreaction@greendike.com',
    signingPublicKey: null,
    signingSecret: null,
    encryptionPublicKey: null,
    encryptionSecret: null,
    password: 'ABCabc123#',
  };

  const generateEncryptionKey = async (password) => {
    const encryption = new Encryption();
    await encryption.generateKeyPair();
    cmd.encryptionSecret = await encryption.exportPrivateKey(password);
    cmd.encryptionPublicKey = await encryption.exportPublicKey();
  };

  const generateSignInKey = (password) => {
    const signing = new Signing();
    signing.generateKeyPair();
    cmd.signingSecret = signing.exportPrivateKey(password);
    cmd.signingPublicKey = signing.exportPublicKey();
  };

  generateSignInKey('123ABCabc#');
  generateEncryptionKey('123ABCabc#');

  console.log(cmd);

  const REGISTER = gql`
    mutation Register($cmd: RegisterCmd!) {
      register(cmd: $cmd) {
        success
        message
        data {
          id
        }
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
