import { gql } from '@apollo/client';
import {
  ASSESS_FRAGMENT,
  AGGREGATED_ASSESS_FRAGMENT,
} from '../common.fragment';

export const GET_INDIVIDUAL_DISPUTE_LIST = gql`
  ${ASSESS_FRAGMENT}
  query GetIndividualDisputeList($query: IndividualAssessQuery!) {
    getIndividualAssessList(query: $query) {
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
