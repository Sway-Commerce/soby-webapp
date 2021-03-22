import { gql } from '@apollo/client';

export const CREATE_INVOICE = gql`
  mutation CreateInvoice($cmd: CreateInvoiceCmd!) {
    createInvoice(cmd: $cmd) {
      message
      data {
        ...InvoiceFragment
      }
    }
  }
`;
export const ACCEPT_INVOICE = gql`
  mutation AcceptInvoice($cmd: AcceptInvoiceCmd!) {
    acceptInvoice(cmd: $cmd) {
      message
      success
    }
  }
`;
export const SET_SHIPPING_LOCATION = gql`
  mutation SetShippingLocation($cmd: SetShippingLocationCmd!) {
    setShippingLocation(cmd: $cmd) {
      message
      data {
        id
        invoice {
          ...InvoiceFragment
        }
        individualId
        shippingLocationId
        shippingFee
        status
        reason
        totalPrice
        createdAt
        updatedAt
      }
    }
  }
`;
export const ADD_INVOICE_ITEM = gql`
  mutation AddInvoiceItem($cmd: AddInvoiceItemsCmd!) {
    addInvoiceItems(cmd: $cmd) {
      message
      data {
        ...InvoiceFragment
      }
    }
  }
`;
export const REMOVE_INVOICE_ITEM = gql`
  mutation RemoveInvoiceItem($cmd: RemoveInvoiceItemsCmd!) {
    removeInvoiceItems(cmd: $cmd) {
      message
      data {
        ...InvoiceFragment
      }
    }
  }
`;
export const UPDATE_INVOICE = gql`
  mutation updateInvoice($cmd: UpdateInvoiceCmd!) {
    updateInvoice(cmd: $cmd) {
      message
      data {
        ...InvoiceFragment
      }
    }
  }
`;
export const UPDATE_INVOICE_INDIVIDUAL_STATUS = gql`
  mutation UpdateInvoiceIndividualStatus(
    $cmd: UpdateInvoiceIndividualStatusCmd!
  ) {
    updateInvoiceIndividualStatus(cmd: $cmd) {
      message
      success
    }
  }
`;
export const MARK_SATISFIED_WITH_INVOICE = gql`
  mutation MarkSatisfiedWithInvoice($cmd: MarkSatisfiedWithInvoiceCmd!) {
    markSatisfiedWithInvoice(cmd: $cmd) {
      message
      data {
        ...AssessFragment
      }
    }
  }
`;
export const MARK_SATISFIED_WITH_ORDER = gql`
  mutation MarkSatisfiedWithOrder($cmd: MarkSatisfiedWithOrderCmd!) {
    markSatisfiedWithOrder(cmd: $cmd) {
      message
      data {
        ...AssessFragment
      }
    }
  }
`;
export const REQUEST_INVOICE_REFUND = gql`
  mutation RequestInvoiceRefund($cmd: RequestInvoiceRefundCmd!) {
    requestInvoiceRefund(cmd: $cmd) {
      message
      data {
        ...AggregatedAssessFragment
      }
    }
  }
`;
export const REQUEST_ORDER_REFUND = gql`
  mutation RequestOrderRefund($cmd: RequestOrderRefundCmd!) {
    requestOrderRefund(cmd: $cmd) {
      message
      data {
        ...AggregatedAssessFragment
      }
    }
  }
`;
export const UPDATE_RETURN_SHIPPING_INFO = gql`
  mutation UpdateReturnShippingInfo($cmd: UpdateReturnShippingInfoCmd!) {
    updateReturnShippingInfo(cmd: $cmd) {
      message
      data {
        ...AggregatedAssessFragment
      }
    }
  }
`;
