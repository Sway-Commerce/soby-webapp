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
  mutation VerifyPhone($cmd: VerifyPhoneCmd) {
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
  signing.importPrivateKey(signingSecret, password);

  return generateJwt(signing);
};

export const signSignature = (signingSecret, jsonString, password) => {
  const signing = new Signing();

  try {
    signing.importPrivateKey(signingSecret, password);
  } catch (error) {
    return { signature: null, error: 'Wrong password' };
  }
  return {
    signature: signing.sign(jsonString, { input: 'utf8', output: 'base64Url' }),
    error: null,
  };
};

export const getHashPassword = (password) => {
  return sha256(password);
};

export const decryptIndividualModel = async (
  encryptionSecret,
  password,
  individualInfo
) => {
  const encryption = new Encryption();

  await encryption.importPrivateKey(encryptionSecret, password);

  const firstName = individualInfo?.firstName
    ? await encryption.decryptBase64UrlStringToString(individualInfo?.firstName)
    : '';
  const lastName = individualInfo?.lastName
    ? await encryption.decryptBase64UrlStringToString(individualInfo?.lastName)
    : '';
  const middleName = individualInfo?.middleName
    ? await encryption.decryptBase64UrlStringToString(
        individualInfo?.middleName
      )
    : '';
  const dob = individualInfo?.dob
    ? await encryption.decryptBase64UrlStringToString(individualInfo?.dob)
    : '';
  const nationality = individualInfo?.nationality
    ? await encryption.decryptBase64UrlStringToString(
        individualInfo?.nationality
      )
    : '';
  const addressLine = individualInfo?.addressLine
    ? await encryption.decryptBase64UrlStringToString(
        individualInfo?.addressLine
      )
    : '';
  const city = individualInfo?.city
    ? await encryption.decryptBase64UrlStringToString(individualInfo?.city)
    : '';
  const province = individualInfo?.province
    ? await encryption.decryptBase64UrlStringToString(individualInfo?.province)
    : '';
  const country = individualInfo?.country
    ? await encryption.decryptBase64UrlStringToString(individualInfo?.country)
    : '';
  const postalCode = individualInfo?.postalCode
    ? await encryption.decryptBase64UrlStringToString(
        individualInfo?.postalCode
      )
    : '';
  const invitationCode = individualInfo?.invitationCode
    ? await encryption.decryptBase64UrlStringToString(
        individualInfo?.invitationCode
      )
    : '';
  const email = individualInfo?.email
    ? await encryption.decryptBase64UrlStringToString(individualInfo?.email)
    : '';
  const phoneCountryCode = individualInfo?.phoneCountryCode
    ? await encryption.decryptBase64UrlStringToString(
        individualInfo?.phoneCountryCode
      )
    : '';
  const phoneNumber = individualInfo?.phoneNumber
    ? await encryption.decryptBase64UrlStringToString(
        individualInfo?.phoneNumber
      )
    : '';

  return {
    ...individualInfo,
    firstName,
    phoneNumber,
    phoneCountryCode,
    email,
    invitationCode,
    postalCode,
    lastName,
    middleName,
    dob,
    nationality,
    addressLine,
    city,
    province,
    country,
  };
};

export const createKeyForNewPassword = async (
  signingSecretCurrent,
  encryptionSecretCurrent,
  password,
  newPassword
) => {
  const encryption = new Encryption();
  const signing = new Signing();
  debugger

  signing.importPrivateKey(signingSecretCurrent, password);

  await encryption.importPrivateKey(encryptionSecretCurrent, password);

  const encryptionSecretNew = await encryption.exportPrivateKey(newPassword);
  const signingSecretNew = signing.exportPrivateKey(newPassword);

  return { encryptionSecretNew, signingSecretNew };
};
