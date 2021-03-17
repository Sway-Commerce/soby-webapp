import { gql } from 'apollo-boost';

export const typeDefs = gql`
  extend type ShopPublicInfoResult {
    success: Boolean
    message: String
    data: Shop
  }

  extend enum ShippingType {
    BY_SHOP
    BY_SOBY
  }

  extend enum KybStatus {
    PROCESSING
    APPROVED
    REJECTED
  }

  extend type Shop {
    id: String
    individualId: String
    name: String
    phoneCountryCode: String
    phoneNumber: String
    description: String
    logoUrl: String
    categories: [String]
    shopUrls: [String]
    shippingType: ShippingType
    signingPublicKey: String
    encryptionPublicKey: String
    createdAt: String
    updatedAt: String
    kyb: Kyb
  }

  extend type Kyb {
    id: String
    imageUrls: [String]
    status: KybStatus
    reason: String
    createdAt: String
    updatedAt: String
  }
`;
