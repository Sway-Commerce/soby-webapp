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