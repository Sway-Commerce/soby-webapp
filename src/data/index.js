import { gql } from 'apollo-boost';

export const typeDefs = gql`
  extend input RegisterCmd {
    firstName: String!
    lastName: String!
    middleName: String
    imageUrl: String
    phoneCountryCode: String!
    phoneNumber: String!
    email: String!
    dob: String
    postalCode: String
    country: String
    province: String
    city: String
    addressLine: String
    nationality: String
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
    postalCode: String
    country: String
    province: String
    city: String
    addressLine: String
    nationality: String
    invitationCode: String
    phoneStatus: ConfirmationStatus
    emailStatus: ConfirmationStatus
    kycStatus: ConfirmationStatus
    signingPublicKey: String
    encryptionPublicKey: String
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

  extend type Mutation {
    register(cmd: RegisterCmd!): IndividualResult!
  }
`;

export const GET_INDIVIDUAL = gql`
  {
    getIndividual @client
  }
`;

export const GET_SECRET = gql`
  {
    getSecret @client
  }
`;