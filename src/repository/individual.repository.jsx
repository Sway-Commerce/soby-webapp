import { gql } from '@apollo/client';

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
