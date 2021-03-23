import { gql } from '@apollo/client';
import { SHIPPING_FRAGMENT } from '../common.fragment';

export const CREATE_INDIVIDUAL_SHIPPING_LOCATION = gql`
  mutation CreateIndividualShippingLocation($cmd: CreateShippingLocationCmd!) {
    createIndividualShippingLocation(cmd: $cmd) {
      message
      data {
        id
      }
    }
  }
`;
export const CREATE_SHOP_SHIPPING_LOCATION = gql`
  mutation CreateShopShippingLocation($cmd: CreateShippingLocationCmd!) {
    createShopShippingLocation(cmd: $cmd) {
      message
      data {
        id
      }
    }
  }
`;
export const UPDATE_INDIVIDUAL_SHIPPING_LOCATION = gql`
  mutation UpdateIndividualShippingLocation($cmd: UpdateShippingLocationCmd!) {
    updateIndividualShippingLocation(cmd: $cmd) {
      message
      success
    }
  }
`;
export const UPDATE_SHOP_SHIPPING_LOCATION = gql`
  mutation UpdateShopShippingLocation($cmd: UpdateShippingLocationCmd!) {
    updateShopShippingLocation(cmd: $cmd) {
      message
      success
    }
  }
`;
export const DELETE_INDIVIDUAL_SHIPPING_LOCATION = gql`
  mutation DeleteIndividualShippingLocation($cmd: DeleteShippingLocationCmd!) {
    deleteIndividualShippingLocation(cmd: $cmd) {
      message
      success
    }
  }
`;

export const GET_INDIVIDUAL_SHIPPING_LOCATION_LIST = gql`
  ${SHIPPING_FRAGMENT}
  query GetIndividualShippingLocationList {
    getIndividualShippingLocationList {
      message
      data {
        ...ShippingFragment
      }
    }
  }
`;
export const GET_SHOP_SHIPPING_LOCATION_LIST = gql`
  ${SHIPPING_FRAGMENT}
  query GetShopShippingLocationList {
    getShopShippingLocationList {
      message
      data {
        ...ShippingFragment
      }
    }
  }
`;
