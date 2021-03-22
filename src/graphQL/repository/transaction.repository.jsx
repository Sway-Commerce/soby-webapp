import { gql } from '@apollo/client';

export const CREATE_ORDER_PAYMENT = gql`
  mutation CreateOrderPayment($cmd: CreateOrderPaymentCmd!) {
    createOrderPayment(cmd: $cmd) {
      message
      data {
        payUrl
      }
    }
  }
`;
export const CREATE_INVOICE_PAYMENT = gql`
  mutation CreateInvoicePayment($cmd: CreateInvoicePaymentCmd!) {
    createInvoicePayment(cmd: $cmd) {
      message
      data {
        payUrl
      }
    }
  }
`;
export const CREATE_OR_UPDATE_SHOP_BANK_ACCOUNT = gql`
  mutation CreateOrUpdateShopBankAccount(
    $cmd: CreateOrUpdateShopBankAccountCmd!
  ) {
    createOrUpdateShopBankAccount(cmd: $cmd) {
      message
      data {
        id
        shopId
        bankCode
        accountType
        accountNumber
        accountOwner
        accountIssuedOn
        bankBranch
      }
    }
  }
`;
