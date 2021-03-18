import { gql } from '@apollo/client';
import { Encryption, generateJwt, Signing, sha256 } from 'credify-crypto';

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
  if (!password) {
    return { signingSecretKey: null, signingPublicKey: null };
  }
  const signing = new Signing();
  signing.generateKeyPair();
  const signingSecretKey = signing.exportPrivateKey(password);
  const signingPublicKey = signing.exportPublicKey();
  return { signingSecretKey, signingPublicKey };
};

export const getSignature = (signingPublicKey, signingSecret, password) => {
  const signing = new Signing();

  signing.importPublicKey(signingPublicKey);
  signing.importPrivateKey(signingSecret, password);

  return generateJwt(signing);
};

export const getHashPassword = (password) => {
  return sha256(password);
};