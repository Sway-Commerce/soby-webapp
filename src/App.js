import React, { useState } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { gql, useMutation } from '@apollo/client';
import { Encryption, Signing } from 'credify-crypto';

import Header from './components/header/header.component';

import { GlobalStyle } from './global.styles';
import Register from './pages/register/register.component';

const App = () => {
  // const cmd = {
  //   firstName: 'tuan',
  //   lastName: 'le',
  //   phoneCountryCode: '+1',
  //   phoneNumber: '9379492383',
  //   email: 'underreaction@greendike.com',
  //   signingPublicKey: null,
  //   signingSecret: null,
  //   encryptionPublicKey: null,
  //   encryptionSecret: null,
  //   password: 'ABCabc123#',
  // };

  // const generateEncryptionKey = async (password) => {
  //   const encryption = new Encryption();
  //   await encryption.generateKeyPair();
  //   cmd.encryptionSecret = await encryption.exportPrivateKey(password);
  //   cmd.encryptionPublicKey = await encryption.exportPublicKey();
  // };

  // const generateSignInKey = (password) => {
  //   const signing = new Signing();
  //   signing.generateKeyPair();
  //   cmd.signingSecret = signing.exportPrivateKey(password);
  //   cmd.signingPublicKey = signing.exportPublicKey();
  // };

  // generateSignInKey('123ABCabc#');
  // generateEncryptionKey('123ABCabc#');

  // const REGISTER = gql`
  //   mutation Register($cmd: RegisterCmd!) {
  //     register(cmd: $cmd) {
  //       success
  //       message
  //       data {
  //         id
  //       }
  //     }
  //   }
  // `;

  // const [register] = useMutation(REGISTER, {
  //   variables: {
  //     cmd
  //   }
  // });

  return (
    <div>
      <GlobalStyle />
      <Register/>
    </div>
  );
};

export default App;
