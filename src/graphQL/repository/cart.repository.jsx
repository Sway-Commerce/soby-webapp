import { gql } from '@apollo/client';

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
