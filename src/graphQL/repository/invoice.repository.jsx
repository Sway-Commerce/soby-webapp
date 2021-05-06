import { gql } from '@apollo/client';
import {
  INVOICE_HISTORY_FRAGMENT,
  AGGREGATED_ASSESS_FRAGMENT,
  INVOICE_ORDER_FRAGMENT,
  AGGREGATED_INVOICE_FRAGMENT,
  AGGREGATED_INVOICE_ORDER_FRAGMENT,
  ASSESS_FRAGMENT,
} from '../common.fragment';

export const CREATE_INVOICE = gql`
  ${INVOICE_HISTORY_FRAGMENT}
  mutation CreateInvoice($cmd: CreateInvoiceCmd!) {
    createInvoice(cmd: $cmd) {
      message
      data {
        ...InvoiceHistoryFragment
      }
    }
  }
`;
export const ACCEPT_INVOICE = gql`
  ${INVOICE_ORDER_FRAGMENT}
  mutation AcceptInvoice($cmd: AcceptInvoiceCmd!) {
    acceptInvoice(cmd: $cmd) {
      message
      success
      data {
        ...InvoiceOrderFragment
      }
    }
  }
`;
export const SET_SHIPPING_LOCATION = gql`
  ${INVOICE_HISTORY_FRAGMENT}

  mutation SetShippingLocation($cmd: SetShippingLocationCmd!) {
    setShippingLocation(cmd: $cmd) {
      message
      data {
        id
        invoice {
          ...InvoiceHistoryFragment
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
  ${INVOICE_HISTORY_FRAGMENT}
  mutation AddInvoiceItem($cmd: AddInvoiceItemsCmd!) {
    addInvoiceItems(cmd: $cmd) {
      message
      data {
        ...InvoiceHistoryFragment
      }
    }
  }
`;
export const REMOVE_INVOICE_ITEM = gql`
  ${INVOICE_HISTORY_FRAGMENT}
  mutation RemoveInvoiceItem($cmd: RemoveInvoiceItemsCmd!) {
    removeInvoiceItems(cmd: $cmd) {
      message
      data {
        ...InvoiceHistoryFragment
      }
    }
  }
`;
export const UPDATE_INVOICE = gql`
  ${INVOICE_HISTORY_FRAGMENT}
  mutation UpdateInvoice($cmd: UpdateInvoiceCmd!) {
    updateInvoice(cmd: $cmd) {
      message
      data {
        ...InvoiceHistoryFragment
      }
    }
  }
`;
export const UPDATE_INVOICE_ORDER_STATUS = gql`
  mutation UpdateInvoiceOrderStatus(
    $cmd: UpdateInvoiceOrderStatusCmd!
  ) {
    updateInvoiceOrderStatus(cmd: $cmd) {
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
  mutation RequestInvoiceRefund($cmd: RequestRefundCmd!) {
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
  ${INVOICE_HISTORY_FRAGMENT}
  query GetShopInvoiceList($query: ShopInvoiceQuery!) {
    getShopInvoiceList(query: $query) {
      message
      data {
        page
        pageSize
        total
        records {
          ...InvoiceHistoryFragment
        }
      }
    }
  }
`;
export const GET_INVOICE_ORDER_LIST_FOR_INDIVIDUAL = gql`
  ${INVOICE_ORDER_FRAGMENT}
  query GetInvoiceOrderListForIndividual($query: IndividualInvoiceOrderQuery!) {
    getInvoiceOrderListForIndividual(query: $query) {
      message
      data {
        page
        pageSize
        total
        records {
          ...InvoiceOrderFragment
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
export const GET_INVOICE_ORDER_LIST_FOR_SHOP = gql`
  ${INVOICE_ORDER_FRAGMENT}
  query GetInvoiceOrderListForShop($query: ShopInvoiceIndividualQuery!) {
    getInvoiceOrderListForShop(query: $query) {
      message
      data {
        total
        records {
          ...InvoiceOrderFragment
        }
      }
    }
  }
`;
export const GET_AGGREGATED_INVOICE_ORDER_FOR_INDIVIDUAL = gql`
  ${AGGREGATED_INVOICE_ORDER_FRAGMENT}
  query GetAggregatedInvoiceOrderForIndividual($id: String!) {
    getAggregatedInvoiceOrderForIndividual(id: $id) {
      message
      data {
        ...AggregatedInvoiceOrderFragment
      }
    }
  }
`;
export const GET_AGGREGATED_INVOICE_ORDER_FOR_SHOP = gql`
  ${AGGREGATED_INVOICE_ORDER_FRAGMENT}
  query GetAggregatedInvoiceOrderForShop($id: String!) {
    getAggregatedInvoiceOrderForShop(id: $id) {
      message
      data {
        ...AggregatedInvoiceOrderFragment
      }
    }
  }
`;

export const GET_PROVINCE_LIST = gql`
  query GetProvinceList {
    getProvinceList {
      success
      message
      data {
        id
        fullName
      }
    }
  }
`;

export const GET_DISTRICT_LIST = gql`
  query GetDistrictList($provinceId: String!) {
    getDistrictList(provinceId: $provinceId) {
      success
      message
      data {
        id
        fullName
      }
    }
  }
`;

export const GET_WARD_LIST = gql`
  query GetWardList($districtId: String!) {
    getWardList(districtId: $districtId) {
      success
      message
      data {
        id
        fullName
      }
    }
  }
`;

export const UPDATE_INVOICE_ORDER_INFO = gql`
  ${INVOICE_ORDER_FRAGMENT}
  mutation UpdateInvoiceOrderInfo($cmd: UpdateInvoiceIndividualInfoCmd!) {
    updateInvoiceOrderInfo(cmd: $cmd) {
      success
      message
      data {
        ...InvoiceOrderFragment
      }
    }
  }
`;
