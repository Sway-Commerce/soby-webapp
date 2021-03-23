import { gql } from '@apollo/client';
import {
  INVOICE_FRAGMENT,
  AGGREGATED_ASSESS_FRAGMENT,
  INDIVIDUAL_INVOICE_FRAGMENT,
  AGGREGATED_INVOICE_FRAGMENT,
  AGGREGATED_INVOICE_INDIVIDUAL,
  ASSESS_FRAGMENT,
} from '../common.fragment';

export const CREATE_INVOICE = gql`
  ${INVOICE_FRAGMENT}
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
  ${INVOICE_FRAGMENT}

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
  ${INVOICE_FRAGMENT}
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
  ${INVOICE_FRAGMENT}
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
  ${INVOICE_FRAGMENT}
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
  ${ASSESS_FRAGMENT}
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
  ${ASSESS_FRAGMENT}
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
  ${AGGREGATED_ASSESS_FRAGMENT}
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
  ${AGGREGATED_ASSESS_FRAGMENT}
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
  ${AGGREGATED_ASSESS_FRAGMENT}
  mutation UpdateReturnShippingInfo($cmd: UpdateReturnShippingInfoCmd!) {
    updateReturnShippingInfo(cmd: $cmd) {
      message
      data {
        ...AggregatedAssessFragment
      }
    }
  }
`;

export const GET_SHOP_INVOICE_LIST = gql`
  ${INVOICE_FRAGMENT}
  query GetShopInvoiceList($query: ShopInvoiceQuery!) {
    getShopInvoiceList(query: $query) {
      message
      data {
        page
        pageSize
        total
        records {
          ...InvoiceFragment
        }
      }
    }
  }
`;
export const GET_INDIVIDUAL_INVOICE_LIST = gql`
  ${INDIVIDUAL_INVOICE_FRAGMENT}
  query GetIndividualInvoiceList($query: IndividualInvoiceQuery!) {
    getIndividualInvoiceList(query: $query) {
      message
      data {
        page
        pageSize
        total
        records {
          ...IndividualInvoiceFragment
        }
      }
    }
  }
`;
export const GET_DETAILED_INVOICE_BY_ID = gql`
  ${AGGREGATED_INVOICE_FRAGMENT}
  query GetDetailedInvoiceById($id: String!) {
    getAggregatedInvoice(id: $id) {
      message
      data {
        ...AggregatedInvoiceFragment
      }
    }
  }
`;
export const GET_SHOP_INVOICE_INDIVIDUAL_LIST = gql`
  ${INDIVIDUAL_INVOICE_FRAGMENT}
  query getShopInvoiceIndividualList($query: ShopInvoiceIndividualQuery!) {
    getShopInvoiceIndividualList(query: $query) {
      message
      data {
        total
        records {
          ...IndividualInvoiceFragment
        }
      }
    }
  }
`;
export const GET_DETAILED_INVOICE_FOR_INDIVIDUAL = gql`
  ${AGGREGATED_INVOICE_FRAGMENT}
  query getDetailedInvoiceForIndividual($id: String!) {
    getAggregatedInvoiceIndividualForIndividual(id: $id) {
      message
      data {
        ...AggregatedInvoiceIndividual
      }
    }
  }
`;
export const GET_DETAILED_INVOICE_FOR_SHOP = gql`
  ${AGGREGATED_INVOICE_INDIVIDUAL}
  query getDetailedInvoiceForShop($id: String!) {
    getAggregatedInvoiceIndividualForShop(id: $id) {
      message
      data {
        ...AggregatedInvoiceIndividual
      }
    }
  }
`;
