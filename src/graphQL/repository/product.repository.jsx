import { gql } from '@apollo/client';
import { PRODUCT_FRAGMENT } from '../common.fragment';

export const SEARCH_PRODUCT = gql`
  ${PRODUCT_FRAGMENT}
  query SearchProduct($searchInput: SearchInput!) {
    searchProduct(searchInput: $searchInput) {
      message
      data {
        page
        total
        records {
          ...ProductFragment
        }
      }
    }
  }
`;
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($cmd: CreateProductCmd!) {
    createProduct(cmd: $cmd) {
      message
      data {
        id
      }
    }
  }
`;
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($cmd: UpdateProductCmd!) {
    updateProduct(cmd: $cmd) {
      message
    }
  }
`;
export const UPDATE_SKU = gql`
  mutation UpdateSku($cmd: UpdateSkuCmd!) {
    updateSku(cmd: $cmd) {
      message
    }
  }
`;

export const GET_PRODUCT = gql`
  ${PRODUCT_FRAGMENT}
  query GetProduct($id: String!) {
    getProduct(id: $id) {
      message
      data {
        ...ProductFragment
      }
    }
  }
`;
