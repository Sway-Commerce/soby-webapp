import { gql } from '@apollo/client';

export const INDIVIDUAL_PROFILE_FRAGMENT = gql`
  fragment IndividualProfileFragment on IndividualResultData {
    id
    firstName
    lastName
    middleName
    imageUrl
    email
    phoneCountryCode
    phoneNumber
    dob
    nationality
    country
    postalCode
    province
    city
    addressLine
    invitationCode
    kycStatus
    emailStatus
    phoneStatus
    signingPublicKey
    encryptionPublicKey
    pendingIdentities {
      id
      source
      hash
    }
  }
`;

export const KYB_FRAGMENT = gql`
  fragment KYBFragment on Kyb {
    id
    imageUrls
    status
    reason
    createdAt
    updatedAt
  }
`;
export const SHIPPING_FRAGMENT = gql`
  fragment ShippingFragment on ShippingLocation {
    id
    locationName
    phoneCountryCode
    phoneNumber
    country
    province
    district
    ward
    addressLine
    defaultLocation
  }
`;
export const ORDER_FRAGMENT = gql`
  fragment OrderFragment on Order {
    id
    shopId
    individualId
    shippingLocationId
    shippingType
    shippingFee
    escrowFee
    voucherCodes
    voucherDiscount
    individualTrackingUrl
    shopTrackingUrl
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
`;

export const PROPERTY_FRAGMENT = gql`
  fragment PropertyFragment on Property {
    name
    value
  }
`;

export const SKU_FRAGMENT = gql`
  ${PROPERTY_FRAGMENT}
  fragment SkuFragment on Sku {
    currentPrice
    id
    originPrice
    productId
    properties {
      ...PropertyFragment
    }
    remainingQuantity
    totalQuantity
  }
`;

export const PRODUCT_FRAGMENT = gql`
  ${SKU_FRAGMENT}
  fragment ProductFragment on Product {
    categories
    createdAt
    description
    id
    imageUrls
    name
    shopId
    skus {
      ...SkuFragment
    }
    updatedAt
  }
`;

export const INVOICE_FRAGMENT = gql`
  fragment InvoiceFragment on Invoice {
    id
    name
    description
    shopId
    shippingType
    escrowFee
    expiredAt
    createdAt
    succeededCount
    acceptedCount
    updatedAt
    items {
      id
      invoiceId
      productId
      skuId
      quantity
      price
    }
    price
    expired
  }
`;
export const INDIVIDUAL_INVOICE_FRAGMENT = gql`
  ${INVOICE_FRAGMENT}
  fragment IndividualInvoiceFragment on InvoiceIndividual {
    id
    invoice {
      ...InvoiceFragment
    }
    individualId
    shippingLocationId
    shippingFee
    status
    individualTrackingUrl
    shopTrackingUrl
    reason
    totalPrice
    createdAt
    updatedAt
  }
`;
export const AGGREGATED_INVOICE_FRAGMENT = gql`
  ${PRODUCT_FRAGMENT}
  ${SKU_FRAGMENT}
  fragment AggregatedInvoiceFragment on AggregatedInvoiceData {
    id
    name
    description
    shopId
    shippingType
    escrowFee
    expiredAt
    acceptedCount
    succeededCount
    createdAt
    updatedAt
    items {
      id
      invoiceId
      product {
        ...ProductFragment
      }
      sku {
        ...SkuFragment
      }
      quantity
      price
    }
    price
    expired
  }
`;
export const REFUND_REQUEST_FRAGMENT = gql`
  fragment RefundRequestFragment on RefundRequest {
    id
    assessId
    phoneCountryCode
    phoneNumber
    requestReason
    description
    imageUrls
    individualTrackingUrl
    shopTrackingUrl
    requiredAdmin
    shippingType
    shippingLocationId
    returnFeePaidBy
    status
    statusReason
    createdBy
    updatedBy
    createdAt
    updatedAt
  }
`;
export const ASSESS_FRAGMENT = gql`
  ${REFUND_REQUEST_FRAGMENT}
  fragment AssessFragment on Assess {
    id
    individualId
    orderId
    orderType
    shopId
    productsAmount
    refundAmount
    weight
    assessType
    createdBy
    updatedBy
    createdAt
    updatedAt
    refundRequests {
      ...RefundRequestFragment
    }
  }
`;
export const AGGREGATED_INVOICE_INDIVIDUAL = gql`
  ${AGGREGATED_INVOICE_FRAGMENT}
  ${SHIPPING_FRAGMENT}
  ${ASSESS_FRAGMENT}
  fragment AggregatedInvoiceIndividual on AggregatedInvoiceIndividual {
    id
    invoice {
      ...AggregatedInvoiceFragment
    }
    individualId
    shippingLocation {
      ...ShippingFragment
    }
    shippingFee
    status
    reason
    totalPrice
    createdAt
    updatedAt
    assess {
      ...AssessFragment
    }
  }
`;

export const AGGREGATED_ASSESS_FRAGMENT = gql`
  ${REFUND_REQUEST_FRAGMENT}
  fragment AggregatedAssessFragment on AggregatedAssess {
    id
    individualId
    orderId
    orderType
    shop {
      name
      phoneCountryCode
      phoneNumber
    }
    productsAmount
    refundAmount
    assessType
    createdBy
    updatedBy
    createdAt
    updatedAt
    refundRequests {
      ...RefundRequestFragment
    }
  }
`;

export const SHOP_PROFILE_FRAGMENT = gql`
  ${KYB_FRAGMENT}
  fragment ShopProfileFragment on ShopResultData {
    id
    individualId
    name
    description
    appUrl
    logoUrl
    email
    phoneCountryCode
    phoneNumber
    userCountsApi
    incorporationDate
    categories
    shopUrls
    status
    shippingType
    signingPublicKey
    encryptionPublicKey
    kyb {
      ...KYBFragment
    }
  }
`;

export const AGGREGATED_ORDER_FRAGMENT = gql`
  ${PRODUCT_FRAGMENT}
  ${SKU_FRAGMENT}
  ${ASSESS_FRAGMENT}
  fragment AggregatedOrderFragment on AggregatedOrderData {
    id
    shopId
    individualId
    shippingLocation {
      id
      locationName
      phoneCountryCode
      phoneNumber
      country
      province
      district
      ward
      addressLine
      defaultLocation
    }
    shopTrackingUrl
    individualTrackingUrl
    shippingType
    shippingFee
    escrowFee
    voucherCodes
    voucherDiscount
    paymentMethod
    individualTrackingUrl
    shopTrackingUrl
    status
    createdAt
    updatedAt
    items {
      id
      orderId
      quantity
      price
      product {
        ...ProductFragment
      }
      sku {
        ...SkuFragment
      }
    }
    price
    totalPrice
    assess {
      ...AssessFragment
    }
  }
`;
