import { gql } from 'apollo-boost';

export const typeDefs = gql`
  export input CreateShippingLocationCmd {
    locationName: String
    phoneCountryCode: String!
    phoneNumber: String!
    country: String!
    province: String!
    district: String!
    ward: String!
    addressLine: String!
    defaultLocation: Boolean
}
`;
