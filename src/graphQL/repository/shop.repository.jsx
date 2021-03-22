import { gql } from '@apollo/client';

export const GET_SHOP_BY_ID = gql`
  query GetShopById($id: String!) {
    getShopById(id: $id) {
      success
      message
      data {
        id
        individualId
        name
        phoneCountryCode
        phoneNumber
        description
        logoUrl
        categories
        shopUrls
        signingPublicKey
        encryptionPublicKey
        createdAt
        updatedAt
        shippingType
        kyb {
          status
          reason
        }
      }
    }
  }
`;

export const ACCEPT_REFUND_REQUEST = gql`
  mutation AcceptRefundRequest($cmd: AcceptRefundRequestCmd!) {
    acceptRefundRequest(cmd: $cmd) {
      message
      data {
        ...AssessFragment
      }
    }
  }
`;
export const REJECT_REFUND_REQUEST = gql`
  mutation RejectRefundRequest($cmd: RejectRefundRequestCmd!) {
    rejectRefundRequest(cmd: $cmd) {
      message
      data {
        ...AssessFragment
      }
    }
  }
`;
