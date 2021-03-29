import { gql } from 'apollo-boost';

export const typeDefs = gql`
  export type ShippingLocation {
    id: String
    locationName: String
    phoneCountryCode: String
    phoneNumber: String
    country: String
    province: String
    district: String
    ward: String
    addressLine: String
    defaultLocation: Boolean
  }

  export type ProvinceListResult {
    success: Boolean
    message: String
    data: [Province]
  }

  export type Province {
    id: String
    name: String
  }

  export type DistrictListResult {
    success: Boolean
    message: String
    data: [District]
  }

  export type District {
    id: String
    name: String
  }

  export type WardListResult {
    success: Boolean
    message: String
    data: [Ward]
  }

  export type Ward {
    id: String
    name: String
  }
`;
