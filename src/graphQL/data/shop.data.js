import { gql } from '@apollo/client';

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

  extend input RegisterShopCmd {
    name: String!
    description: String
    logoUrl: String
    phoneCountryCode: String!
    phoneNumber: String!
    email: String!
    incorporationDate: String
    categoryIds: [String]!
    shopUrls: [String]!
    signingPublicKey: String!
    signingSecret: String!
    encryptionPublicKey: String!
    encryptionSecret: String!
    password: String!
    shippingFeeInCity: String
    shippingFeeOutCity: String
  }

  extend type ShopResult {
    success: Boolean
    message: String
    data: ShopResultData
  }

  extend type ShopCategory {
    id: String
    name: String
    englishName: String
    description: String
  }

  extend type ShopUrl {
    type: String
    url: String
    verified: Boolean
  }

  extend type ShopResultData {
    id: String
    individualId: String
    name: String
    description: String
    appUrl: String
    logoUrl: String
    coverUrl: String
    phoneCountryCode: String
    phoneNumber: String
    email: String
    userCountsApi: String
    redirectUrl: String
    incorporationDate: String
    scopes: [String]
    optionalScopes: [String]
    categories: [ShopCategory]
    shopUrls: [ShopUrl]
    status: String
    shippingType: ShippingType
    kyb: Kyb
    phoneStatus: ConfirmationStatus
    emailStatus: ConfirmationStatus
    allowedCod: Boolean
    passphrase: String
    shippingFeeInCity: String
    shippingFeeOutCity: String
  }

  extend type Mutation {
    registerShop(cmd: RegisterShopCmd!): ShopResult
  }
`;
