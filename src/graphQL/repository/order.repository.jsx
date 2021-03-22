import { gql } from '@apollo/client';

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
