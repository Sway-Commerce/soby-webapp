import { gql } from '@apollo/client';

export const typeDefs = gql`
  extend type GetProductResult {
    success: Boolean
    message: String
    data: Product
  }

  extend type SearchProductResult {
    success: Boolean
    message: String
    data: SearchProductResultData
  }

  extend type SearchProductResultData {
    page: Int
    pageSize: Int
    total: String
    records: [Product]
  }

  extend type Product {
    id: String
    shopId: String
    name: String
    categories: [String]
    imageUrls: [String]
    description: String
    skus: [Sku]
    createdAt: String
    updatedAt: String
  }

  extend type Sku {
    id: String
    productId: String
    originPrice: String
    currentPrice: String
    totalQuantity: Int
    remainingQuantity: Int
    properties: [Property]
  }

  extend type Property {
    name: String
    value: String
  }

  extend input SearchInput {
    page: Int
    pageSize: Int
    filters: [String]
    queries: [String]
    sorts: [String]
  }

  extend type Query {
    getProduct(id: String!): GetProductResult
    searchProduct(searchInput: SearchInput!): SearchProductResult
  }
`;
