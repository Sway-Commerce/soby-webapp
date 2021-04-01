import { gql } from '@apollo/client';
import { Encryption, generateJwt, Signing, sha256 } from 'credify-crypto';
import { INDIVIDUAL_PROFILE_FRAGMENT } from '../common.fragment';

export const CREATE_INDIVIDUAL = gql`
  ${INDIVIDUAL_PROFILE_FRAGMENT}
  mutation CreateIndividual($cmd: RegisterCmd!) {
    register(cmd: $cmd) {
      data {
        ...IndividualProfileFragment
      }
      message
    }
  }
`;
export const UPDATE_INDIVIDUAL = gql`
  ${INDIVIDUAL_PROFILE_FRAGMENT}

  mutation UpdateIndividual($cmd: UpdateIndividualCmd!) {
    updateIndividual(cmd: $cmd) {
      success
      data {
        ...IndividualProfileFragment
      }
    }
  }
`;
export const REGISTER_DEVICE_TOKEN = gql`
  mutation RegisterDeviceToken($cmd: RegisterDeviceCmd!) {
    registerDevice(cmd: $cmd) {
      success
    }
  }
`;
export const UPDATE_PHONE = gql`
  mutation UpdatePhone($cmd: UpdatePhoneCmd!) {
    updatePhone(cmd: $cmd) {
      success
    }
  }
`;
export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($cmd: VerifyEmailCmd!) {
    verifyEmail(cmd: $cmd) {
      success
    }
  }
`;
export const SEND_EMAIL_VERIFICATION = gql`
  mutation SendEmailVerification($cmd: SendEmailVerificationCmd!) {
    sendEmailVerification(cmd: $cmd) {
      success
    }
  }
`;
export const UPDATE_EMAIL = gql`
  mutation UpdateEmail($cmd: UpdateEmailCmd!) {
    updateEmail(cmd: $cmd) {
      success
    }
  }
`;
export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($cmd: UpdatePasswordCmd!) {
    updatePassword(cmd: $cmd) {
      success
    }
  }
`;
export const LOGIN_WITH_PHONE_AND_PASSWORD = gql`
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
export const START_KYC_CHECK = gql`
  mutation StartKycCheck($cmd: StartKycCheckCmd!) {
    startKycCheck(cmd: $cmd) {
      success
      message
    }
  }
`;
export const SIGN_FOR_PII = gql`
  mutation SignForPii($cmd: SignForPiiCmd!) {
    signForPii(cmd: $cmd) {
      success
      message
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

export const GET_INDIVIDUAL_BASIC_INFO = gql`
  ${INDIVIDUAL_PROFILE_FRAGMENT}
  query GetIndividualBasicInfo {
    getIndividual {
      data {
        ...IndividualProfileFragment
      }
      message
    }
  }
`;

export const GETSECRET = gql`
  query GetSecret {
    getSecret {
      message
      data {
        signingSecret
        encryptionSecret
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
  signing.importPrivateKey(signingSecret);

  return generateJwt(signing);
};

export const signSignature =(signingPublicKey, signingSecret, jsonString) => {
  const signing = new Signing();

  signing.importPublicKey(signingPublicKey);
  signing.importPrivateKey(signingSecret);

  return signing.sign(jsonString,{output: "base64"});
}

export const getHashPassword = (password) => {
  return sha256(password);
};
