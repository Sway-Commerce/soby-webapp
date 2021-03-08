import { gql } from '@apollo/client';
import { Encryption, Signing, generateJwt } from 'credify-crypto';

export const REGISTER = gql`
  mutation Register($cmd: RegisterCmd!) {
    register(cmd: $cmd) {
      success
      message
      data {
        id
        signingPublicKey
        encryptionPublicKey
        lastName
        firstName
      }
    }
  }
`;

export const SEND_PHONE_VERIFICATION = gql`
  mutation SendPhoneVerification($cmd: SendPhoneVerificationCmd) {
    sendPhoneVerification(cmd: $cmd) {
      success
      message
    }
  }
`;

export const VERIFY_PHONE = gql`
  mutation verifyPhone($cmd: VerifyPhoneCmd) {
    verifyPhone(cmd: $cmd) {
      success
      message
    }
  }
`;

export const PHONE_LOGIN = gql`
  mutation LoginWithPhoneAndPassword($cmd: LoginWithPhoneAndPasswordCmd!) {
    loginWithPhoneAndPassword(cmd: $cmd) {
      success
      message
      data {
        accessToken
      }
    }
  }
`;

export const LOGIN_WITH_SIGNATURE = gql`
  mutation LoginWithSignature($cmd: LoginWithSignatureCmd!) {
    loginWithSignature(cmd: $cmd) {
      success
      message
      data {
        accessToken
      }
    }
  }
`;

export const generateEncryptionKey = async (password) => {
  const encryption = new Encryption();
  await encryption.generateKeyPair();
  const encryptionSecret = await encryption.exportPrivateKey(password);
  const encryptionPublicKey = await encryption.exportPublicKey();
  return { encryptionSecret, encryptionPublicKey };
};

export const generateSignInKey = (password) => {
  const signing = new Signing();
  signing.generateKeyPair();
  const signingSecret = signing.exportPrivateKey(password);
  const signingPublicKey = signing.exportPublicKey();
  return { signingSecret, signingPublicKey };
};

export const getSignature = async (signingPublicKey, signingSecret, password) => {
  const signing = new Signing();
  const encryption = new Encryption();

  signing.importPublicKey(signingPublicKey);
  signing.importPrivateKey(signingSecret, password);
  // await encryption.importPublicKey(encryptionPublicKey);
  // const signinKey = signing.publicKey;
  // const encryptionKey = encryption.privateKey;
  // console.log({ signinKey, encryptionKey });
  // console.log(generateJwt(signing));
  localStorage.setItem('token', generateJwt(signing))

  // console.log(generateRequestToken(signinKey, encryptionKey, []));
  // return generateRequestToken(signinKey,enscrytionKey, []);
};
