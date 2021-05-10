import { gql } from '@apollo/client';
import {
  ASSESS_FRAGMENT,
  AGGREGATED_ASSESS_FRAGMENT,
  AGGREGATED_SEARCH_ASSESS_FRAGMENT,
  AGGREGATED_REFUND_REQUEST_FRAGMENT,
} from '../common.fragment';

export const GET_AGGREGATED_ASSESS_LIST_FOR_INDIVIDUAL= gql`
  ${AGGREGATED_SEARCH_ASSESS_FRAGMENT}
  query GetAggregatedAssessListForIndividual($query: IndividualAssessQuery!) {
    getAggregatedAssessListForIndividual(query: $query) {
      message
      data {
        page
        pageSize
        total
        records {
          ...AggregatedSearchAssessFragment
        }
      }
    }
  }
`;
export const GET_SHOP_DISPUTE_LIST = gql`
  ${ASSESS_FRAGMENT}
  query GetShopDisputeList($query: ShopAssessQuery!) {
    getShopAssessList(query: $query) {
      message
      data {
        page
        pageSize
        total
        records {
          ...AssessFragment
        }
      }
    }
  }
`;
export const GET_DETAILED_DISPUTE_INDIVIDUAL = gql`
  ${AGGREGATED_ASSESS_FRAGMENT}
  query GetDetailedDisputeIndividual($id: String!) {
    getAggregatedAssessForIndividual(id: $id) {
      message
      data {
        ...AggregatedAssessFragment
      }
    }
  }
`;
export const GET_DETAILED_DISPUTE_SHOP = gql`
  ${ASSESS_FRAGMENT}
  query GetDetailedDisputeShop($id: String!) {
    getAggregatedAssessForShop(id: $id) {
      message
      data {
        ...AssessFragment
      }
    }
  }
`;

export const GET_AGGREGATED_ASSESS_FOR_INDIVIDUAL= gql`
  ${AGGREGATED_ASSESS_FRAGMENT}
  query AggregatedSearchAssessFragment($id: String!) {
    getAggregatedAssessForIndividual(id: $id) {
      message
      data {
        ...AggregatedAssessFragment
      }
    }
  }
`;