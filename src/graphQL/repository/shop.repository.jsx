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
          type
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
export const GET_AGGREGATED_SHOP = gql`
  query GetAggregatedShop($id: String!) {
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
        coverUrl
        email
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
          type
        }
        shippingType
        createdAt
        updatedAt
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
        kycStatus
        allowedCod
        shopRank {
          shopId
          items {
            id
            shopId
            rankItem {
              id
              name
              category
              description
              points
            }
            createdAt
          }
          totalPoints
          rank {
            name
            description
          }
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
          type
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
  query SearchShop($query: SearchInput!) {
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
          categories {
            id
            name
            description
          }
          shopUrls {
            url
            verified
            type
          }
          shippingType
          createdAt
          updatedAt
          kyb {
            status
            reason
          }
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
        englishName
        description
      }
    }
  }
`;

export const SEARCH_AGGREGATED_SHOP = gql`
  query SearchAggregatedShop($query: SearchInput!) {
    searchAggregatedShop(searchInput: $query) {
      message
      data {
        total
        records {
          email
          coverUrl
          allowedCod
          shopRank {
            shopId
            items {
              id
              shopId
              rankItem {
                id
                name
                category
                description
                points
              }
              createdAt
            }
            totalPoints
            rank {
              name
              description
            }
          }
          id
          individualId
          logoUrl
          name
          phoneCountryCode
          phoneNumber
          description
          categories {
            id
            name
            description
          }
          shopUrls {
            url
            verified
            type
          }
          shippingType
          createdAt
          updatedAt
          kyb {
            status
            reason
          }
        }
      }
    }
  }
`;

export const REGISTER_SHOP = gql`
  ${SHOP_PROFILE_FRAGMENT}
  mutation RegisterShop($cmd: RegisterShopCmd!) {
    registerShop(cmd: $cmd) {
      data {
        ...ShopProfileFragment
      }
      message
    }
  }
`;
