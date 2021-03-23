import { gql } from '@apollo/client';
import {
  PRODUCT_FRAGMENT,
  SKU_FRAGMENT,
  AGGREGATED_ORDER_FRAGMENT,
} from '../common.fragment';

export const ADD_CART_ITEM = gql`
  mutation AddCartItem($cmd: AddCartItemCmd!) {
    addCartItem(cmd: $cmd) {
      message
      data {
        id
      }
    }
  }
`;
export const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($cmd: RemoveCartItemCmd!) {
    removeCartItem(cmd: $cmd) {
      message
      data {
        id
      }
    }
  }
`;
export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($cmd: UpdateCartItemCmd!) {
    updateCartItem(cmd: $cmd) {
      message
      data {
        id
      }
    }
  }
`;
export const REMOVE_CART = gql`
  mutation RemoveCart($cmd: RemoveCartCmd!) {
    removeCart(cmd: $cmd) {
      message
      data {
        id
      }
    }
  }
`;
export const GET_CART = gql`
  ${PRODUCT_FRAGMENT}
  ${SKU_FRAGMENT}
  query GetCart {
    getAggregatedCart {
      message
      data {
        carts {
          id
          userId
          shopId
          shopName
          items {
            id
            product {
              ...ProductFragment
            }
            sku {
              ...SkuFragment
            }
            quantity
          }
          totalItems
        }
      }
    }
  }
`;
export const GET_SHOP_ORDER = gql`
  ${AGGREGATED_ORDER_FRAGMENT}
  query getShopOrder($id: String!) {
    getAggregatedOrderWithShop(id: $id) {
      message
      data {
        ...AggregatedOrderFragment
      }
    }
  }
`;
export const GET_INDIVIDUAL_ORDER = gql`
  ${AGGREGATED_ORDER_FRAGMENT}
  query getIndividualOrder($id: String!) {
    getAggregatedOrderWithIndividual(id: $id) {
      message
      data {
        ...AggregatedOrderFragment
      }
    }
  }
`;
