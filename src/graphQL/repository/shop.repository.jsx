import { gql } from '@apollo/client';
import { ASSESS_FRAGMENT, SHOP_PROFILE_FRAGMENT } from '../common.fragment';

export const GET_SHOP_BY_ID = gql`
  query GetShopById($id: String!) {
    getShopById(id: $id) {
      success
      message
      data {
        id
        individualId
        name
        phoneCountryCode
        phoneNumber
        description
        logoUrl
        categories {
          id
          name
          description
        }
        shopUrls {
          url
          verified
        }
        createdAt
        updatedAt
        shippingType
        email
        kyb {
          status
          reason
        }
      }
    }
  }
`;

export const ACCEPT_REFUND_REQUEST = gql`
  ${ASSESS_FRAGMENT}
  mutation AcceptRefundRequest($cmd: AcceptRefundRequestCmd!) {
    acceptRefundRequest(cmd: $cmd) {
      message
      data {
        ...AssessFragment
      }
    }
  }
`;
export const REJECT_REFUND_REQUEST = gql`
  ${ASSESS_FRAGMENT}
  mutation RejectRefundRequest($cmd: RejectRefundRequestCmd!) {
    rejectRefundRequest(cmd: $cmd) {
      message
      data {
        ...AssessFragment
      }
    }
  }
`;

export const GET_SHOP = gql`
  ${SHOP_PROFILE_FRAGMENT}
  query GetShop {
    getShop {
      message
      data {
        ...ShopProfileFragment
      }
    }
  }
`;
export const GET_SHOP_DETAILED_INFO = gql`
  query GetShopDetailedInfo($id: String!) {
    getAggregatedShop(id: $id) {
      message
      data {
        id
        individualId
        name
        description
        phoneCountryCode
        phoneNumber
        logoUrl
        phoneCountryCode
        phoneNumber
        categories {
          id
          name
          description
        }
        shopUrls {
          url
          verified
        }
        shippingType
        shippingLocations {
          addressLine
          country
          district
          province
          ward
        }
        kyb {
          status
          reason
        }
      }
    }
  }
`;
export const GET_SHOP_PUBLIC = gql`
  query getShopPublic($id: String!) {
    getShopById(id: $id) {
      message
      data {
        id
        individualId
        name
        description
        phoneCountryCode
        phoneNumber
        logoUrl
        phoneCountryCode
        phoneNumber
        categories
        shopUrls {
          url
          verified
        }
        shippingType
        kyb {
          status
          reason
        }
      }
    }
  }
`;
export const SEARCH = gql`
  query search($query: SearchInput!) {
    searchShop(searchInput: $query) {
      message
      data {
        total
        records {
          id
          individualId
          logoUrl
          name
          phoneCountryCode
          phoneNumber
          description
          categories
          shopUrls {
            url
            verified
          }
          shippingType
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const GET_ALL_SHOP_CATEGORIES = gql`
  query GetAllShopCategories {
    getAllShopCategories {
      success
      message
      data {
        id
        name
        description
      }
    }
  }
`;
