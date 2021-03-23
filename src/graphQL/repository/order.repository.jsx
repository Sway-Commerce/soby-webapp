import { gql } from '@apollo/client';
import { ORDER_FRAGMENT } from '../common.fragment';

export const CREATE_ORDER = gql`
  mutation CreateOrder($cmd: CreateOrderCmd!) {
    createOrder(cmd: $cmd) {
      message
      data {
        id
        shopId
        individualId
        shippingLocationId
        shippingType
        shippingFee
        individualTrackingUrl
        shopTrackingUrl
        escrowFee
        voucherCodes
        voucherDiscount
        paymentMethod
        status
        createdAt
        updatedAt
        items {
          id
          orderId
          productId
          skuId
          quantity
          price
        }
        price
        totalPrice
      }
    }
  }
`;
export const CONFIRM_ORDER = gql`
  mutation ConfirmOrder($cmd: ConfirmOrderCmd!) {
    confirmOrder(cmd: $cmd) {
      success
      message
    }
  }
`;
export const CANCEL_ORDER = gql`
  mutation CancelOrder($cmd: CancelOrderCmd!) {
    cancelOrder(cmd: $cmd) {
      success
      message
    }
  }
`;
export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($cmd: UpdateOrderStatusCmd!) {
    updateOrderStatus(cmd: $cmd) {
      message
      success
    }
  }
`;

export const GET_INDIVIDUAL_ORDER_LIST = gql`
  ${ORDER_FRAGMENT}
  query GetIndividualOrderList($query: IndividualOrderQuery!) {
    getIndividualOrderList(query: $query) {
      message
      data {
        page
        pageSize
        total
        records {
          ...OrderFragment
        }
      }
    }
  }
`;
export const GET_SHOP_ORDER_LIST = gql`
  ${ORDER_FRAGMENT}
  query GetShopOrderList($query: ShopOrderQuery!) {
    getShopOrderList(query: $query) {
      message
      data {
        page
        pageSize
        total
        records {
          ...OrderFragment
        }
      }
    }
  }
`;
