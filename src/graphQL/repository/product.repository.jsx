import { gql } from '@apollo/client';
import { PRODUCT_FRAGMENT } from '../common.fragment';

export const SEARCH_PRODUCT = gql`
  ${PRODUCT_FRAGMENT}
  query SearchProduct($searchInput: SearchInput!) {
    searchProduct(searchInput: $searchInput) {
      success
      message
      data {
        page
        pageSize
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
