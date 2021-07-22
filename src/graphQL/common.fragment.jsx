import { gql } from '@apollo/client';

export const SHIPPING_LOCATION_FRAGMENT = gql`
  fragment ShippingLocationFragment on ShippingLocation {
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

export const INDIVIDUAL_PROFILE_FRAGMENT = gql`
  fragment IndividualProfileFragment on IndividualResultData {
    id
    firstName
    lastName
    middleName
    name
    imageUrl
    email
    phoneCountryCode
    phoneNumber
    dob
    invitationCode
    kycStatus
    emailStatus
    phoneStatus
    pendingIdentities {
      id
      source
      hash
    }
    passphrase
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
    id
    productId
    originPrice
    currentPrice
    totalQuantity
    remainingQuantity
    description
    masterTag
    subTags
    imageUrls
    properties {
        ...PropertyFragment
    }
    deleted
  }
`;

export const PRODUCT_FRAGMENT = gql`
  ${SKU_FRAGMENT}
  fragment ProductFragment on Product {
    id
    shopId
    name
    category {
        id
        name
    }
    imageUrls
    description
    masterTag
    subTags
    skus {
        ...SkuFragment
    }
    createdAt
    updatedAt
    deleted
  }
`;

export const AGGREGATED_INVOICE_ITEM = gql`
  ${PRODUCT_FRAGMENT}
  ${SKU_FRAGMENT}
  fragment AggregatedInvoiceItemFragment on AggregatedInvoiceItem {
    id
    product {
      ...ProductFragment
    }
    sku {
      ...SkuFragment
    }
    quantity
    price
    weight
  }
`;

export const INVOICE_HISTORY_FRAGMENT = gql`
  fragment InvoiceHistoryFragment on InvoiceHistory {
    id
    name
    description
    shopId
    shippingType
    escrowFee
    createdAt
    items {
        id
        productId
        skuId
        quantity
        price
    }
    price
    shippingFeeInCity
    shippingFeeOutCity
  }
`;
export const INVOICE_ORDER_FRAGMENT = gql`
  ${INVOICE_HISTORY_FRAGMENT}
  fragment InvoiceOrderFragment on InvoiceOrder {
    id
    invoice {
        ...InvoiceHistoryFragment
    }
    individualId
    shippingLocationId
    shippingFee
    orderFee
    status
    individualTrackingUrl
    shopTrackingUrl
    reason
    totalPrice
    createdAt
    updatedAt
    shippingPartner
  }
`;

export const AGGREGATED_INVOICE_FRAGMENT = gql`
  ${PRODUCT_FRAGMENT}
  ${SKU_FRAGMENT}
  fragment AggregatedInvoiceFragment on AggregatedInvoice {
    id
    name
    description
    shop {
        id
        name
        logoUrl
        phoneCountryCode
        phoneNumber
    }
    shippingType
    escrowFee
    oneTime
    acceptedCount
    createdAt
    updatedAt
    startTime
    endTime
    items {
        id
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
    shippingFeeInCity
    shippingFeeOutCity
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
    requiredAdmin
    shippingType
    shippingPartner
    shippingLocationId
    returnFeePaidBy
    shippingFee
    individualTrackingUrl
    shopTrackingUrl
    status
    statusReason
    createdBy
    updatedBy
    createdAt
    updatedAt
    bankCode
    accountType
    accountNumber
    accountOwner
    accountIssuedOn
    bankBranch
    refundAmount
    items {
      id
      productId
      skuId
      quantity
      price
      weight
    }
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
    transferAmount
    assessType
    createdBy
    updatedBy
    createdAt
    updatedAt
    refundRequests {
      ...RefundRequestFragment
    }
    paymentMethod
  }
`;

export const AGGREGATED_REFUND_REQUEST_FRAGMENT = gql`
  ${PRODUCT_FRAGMENT}
  ${SKU_FRAGMENT}
  ${SHIPPING_LOCATION_FRAGMENT}
  fragment AggregatedRefundRequestFragment on AggregatedRefundRequest {
    id
    assessId
    phoneCountryCode
    phoneNumber
    requestReason
    description
    imageUrls
    requiredAdmin
    shippingType
    shippingPartner
    shippingLocation {
      ...ShippingLocationFragment
    }
    returnFeePaidBy
    shippingFee
    individualTrackingUrl
    shopTrackingUrl
    status
    statusReason
    createdBy
    updatedBy
    createdAt
    updatedAt
    bankCode
    accountType
    accountNumber
    accountOwner
    accountIssuedOn
    bankBranch
    refundAmount
    items {
      id
      product {
        ...ProductFragment
      }
      sku {
        ...SkuFragment
      }
      quantity
      price
      weight
    }
  }
`;

export const AGGREGATED_ASSESS_FRAGMENT = gql`
  ${AGGREGATED_REFUND_REQUEST_FRAGMENT}
  fragment AggregatedAssessFragment on AggregatedAssess {
    id
    individualId
    orderId
    orderType
    shop {
      id
      name
    }
    transferAmount
    assessType
    createdBy
    updatedBy
    createdAt
    updatedAt
    refundRequests {
      ...AggregatedRefundRequestFragment
    }
    paymentMethod
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
    categories {
      id
      name
      englishName
      description
    }
    shopUrls {
      url
      verified
      type
    }
    status
    shippingType
    kyb {
      ...KYBFragment
    }
    passphrase
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

export const SHOP_PUBLIC_INFO_FRAGMENT = gql`
  fragment ShopPublicInfoFragment on ShopPublicInfo {
    id
    individualId
    name
    phoneCountryCode
    phoneNumber
    email
    description
    logoUrl
    coverUrl
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
    allowedCod
  }
`;

export const AGGREGATED_INVOICE_HISTORY_FRAGMENT = gql`
  ${SHOP_PUBLIC_INFO_FRAGMENT}
  ${AGGREGATED_INVOICE_ITEM}
  fragment AggregatedInvoiceHistoryFragment on AggregatedInvoiceHistory {
    id
    invoiceId
    invoiceVersion
    name
    description
    shop {
      ...ShopPublicInfoFragment
    }
    shippingType
    escrowFee
    createdAt
    items {
      ...AggregatedInvoiceItemFragment
    }
    price
    totalWeight
  }
`;

export const AGGREGATED_INVOICE_ORDER_FRAGMENT = gql`
  ${AGGREGATED_INVOICE_HISTORY_FRAGMENT}
  ${SHIPPING_FRAGMENT}
  ${ASSESS_FRAGMENT}
  fragment AggregatedInvoiceOrderFragment on AggregatedInvoiceOrder {
    id
    invoice {
      ...AggregatedInvoiceHistoryFragment
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
    individualTrackingUrl
    shopTrackingUrl
    orderFee
    assess {
      ...AssessFragment
    }
    shippingPartner
    paymentMethod
  }
`;

export const AGGREGATED_SEARCH_INVOICE_ORDER = gql`
  ${INVOICE_HISTORY_FRAGMENT}
  ${PRODUCT_FRAGMENT}

  fragment AggregatedSearchInvoiceOrderFragment on AggregatedSearchInvoiceOrder {
    id
    invoice {
      ...InvoiceHistoryFragment
    }
    individualId
    shippingPartner
    shippingLocationId
    shippingFee
    individualTrackingUrl
    shopTrackingUrl
    orderFee
    voucherCodes
    voucherDiscount
    paymentMethod
    status
    reason
    totalPrice
    createdAt
    updatedAt
    product {
      ...ProductFragment
    }
  }
`;

export const AGGREGATED_SEARCH_ASSESS_FRAGMENT = gql`
  ${REFUND_REQUEST_FRAGMENT}
  ${INVOICE_HISTORY_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  fragment AggregatedSearchAssessFragment on AggregatedSearchAssess {
    id
    individualId
    orderId
    orderType
    shop {
      name
      id
    }
    transferAmount
    assessType
    createdBy
    updatedBy
    createdAt
    updatedAt
    refundRequests {
      ...RefundRequestFragment
    }
    paymentMethod
    invoice {
      ...InvoiceHistoryFragment
    }
    product {
      ...ProductFragment
    }
    refundAmount
  }
`;
