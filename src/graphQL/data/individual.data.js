import { gql } from '@apollo/client';

export const typeDefs = gql`
  extend input RegisterCmd {
    name: String!
    phoneCountryCode: String!
    phoneNumber: String!
    email: String!
    dob: String
    signingPublicKey: String!
    signingSecret: String!
    encryptionPublicKey: String!
    encryptionSecret: String!
    password: String!
  }

  extend type IndividualResult {
    success: Boolean!
    message: String
    data: IndividualResultData
  }

  extend type IndividualResultData {
    id: String
    firstName: String
    lastName: String
    middleName: String
    imageUrl: String
    phoneCountryCode: String
    phoneNumber: String
    email: String
    dob: String
    invitationCode: String
    phoneStatus: ConfirmationStatus
    emailStatus: ConfirmationStatus
    kycStatus: ConfirmationStatus
    identityId: String
    identityHash: String
  }

  extend input UpdateIndividualCmd {
    firstName: String!
    lastName: String!
    middleName: String
    imageUrl: String
    dob: String
    postalCode: String
    country: String
    province: String
    city: String
    addressLine: String
    nationality: String
  }

  extend input VerifyPhoneCmd {
    phoneCountryCode: String!
    phoneNumber: String!
    verificationCode: String!
  }

  extend type SimpleResult {
    success: Boolean!
    message: String
  }

  extend input SendPhoneVerificationCmd {
    phoneCountryCode: String!
    phoneNumber: String!
  }

  extend input LoginWithPhoneAndPasswordCmd {
    phoneCountryCode: String!
    phoneNumber: String!
    password: String!
  }

  extend type LoginResult {
    success: Boolean!
    message: String
    data: LoginResultData
  }

  extend type LoginResultData {
    accessToken: String!
  }

  extend input LoginWithSignatureCmd {
    signature: String!
  }

  extend type Mutation {
    register(cmd: RegisterCmd!): IndividualResult!
    verifyPhone(cmd: VerifyPhoneCmd): SimpleResult
    sendPhoneVerification(cmd: SendPhoneVerificationCmd): SimpleResult
    loginWithPhoneAndPassword(cmd: LoginWithPhoneAndPasswordCmd!): LoginResult
    loginWithSignature(cmd: LoginWithSignatureCmd!): LoginResult
  }
`;
