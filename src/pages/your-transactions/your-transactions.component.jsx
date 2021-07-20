import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { Container } from './your-transactions.styles';

import HorizontalList from 'components/horizontal-list/horizontal-list.component';
import {
  GET_INDIVIDUAL_AGGREGATED_INVOICE_ORDER_LIST,
} from '../../graphQL/repository/invoice.repository';
import Spinner from 'components/ui/spinner/spinner.component';
import InvoiceItem from 'components/invoice-item/invoice-item.component';
import {
  InvoiceStatusValue,
  mainInvoiceFilters,
  subInvoiceFilters,
} from 'shared/constants/invoice.constant';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';

const YourTransaction = ({ name }) => {
  const [invoiceList, setInvoiceList] = useState([]);
  const [activeInvoice, setActiveInvoice] = useState('');
  const [invoiceListQuery, setInvoiceListQuery] = useState({
    page: 0,
    pageSize: 10,
    mainFilter: mainInvoiceFilters[1],
    subFilter: InvoiceStatusValue[0],
    total: 0,
  });
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');

  const { mainFilter, subFilter, page, pageSize, total } = invoiceListQuery;

  const [
    getIndividualAggregatedInvoiceOrderList,
    {
      error: getIndividualAggregatedInvoiceOrderListError,
      data: getIndividualAggregatedInvoiceOrderListData,
      loading: getIndividualAggregatedInvoiceOrderListLoading,
    },
  ] = useLazyQuery(GET_INDIVIDUAL_AGGREGATED_INVOICE_ORDER_LIST, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (getIndividualAggregatedInvoiceOrderListError) {
      setFormError(getIndividualAggregatedInvoiceOrderListError?.message);
      setOpen(true);
    }
  }, [getIndividualAggregatedInvoiceOrderListError]);

  useEffect(() => {
    setActiveInvoice(null);
    setInvoiceList([]);
    setInvoiceListQuery({ ...invoiceListQuery, total: 0 });
    if (mainFilter === 'Invoices') {
      getIndividualAggregatedInvoiceOrderList({
        variables: {
          query: {
            statuses: subFilter,
            page,
            pageSize,
          },
        },
      });
    }
  }, [
    mainFilter,
    subFilter,
    page,
    pageSize,
    getIndividualAggregatedInvoiceOrderList,
  ]);

  useEffect(() => {
    if (
      getIndividualAggregatedInvoiceOrderListData
        ?.getIndividualAggregatedInvoiceOrderList?.data?.records
    ) {
      setInvoiceList(
        getIndividualAggregatedInvoiceOrderListData
          ?.getIndividualAggregatedInvoiceOrderList?.data?.records
      );
      setInvoiceListQuery({
        ...invoiceListQuery,
        total:
          getIndividualAggregatedInvoiceOrderListData
            ?.getIndividualAggregatedInvoiceOrderList?.data?.total,
      });
    }
  }, [
    getIndividualAggregatedInvoiceOrderListData
      ?.getIndividualAggregatedInvoiceOrderList?.data?.records,
  ]);

  useEffect(() => {
    if (getIndividualAggregatedInvoiceOrderListError) {
      setFormError(getIndividualAggregatedInvoiceOrderListError.message);
    }
  }, [getIndividualAggregatedInvoiceOrderListError]);

  return (
    <Container>
      <div className="box-left">
        <div className="sub-filter">
          <HorizontalList
            key={JSON.stringify(subInvoiceFilters)}
            items={subInvoiceFilters}
            renderItem={(item, index) => (
              <div
                className={`tab-status ${
                  subFilter === InvoiceStatusValue[index] ? 'active' : ''
                }`}
                key={item}
                onClick={() =>
                  setInvoiceListQuery({
                    ...invoiceListQuery,
                    subFilter: InvoiceStatusValue[index],
                  })
                }
              >
                <p className="status">{item}</p>
              </div>
            )}
          />
        </div>
        <div className="invoice-list">
          <div className="header-wrapper">
            <h5>Invoice name</h5>
            <h5>Date</h5>
            <h5>Price</h5>
            <h5>Seller</h5>
            <h5 className="text-right">Status</h5>
          </div>

          {invoiceList.map((x) => (
            <InvoiceItem
              key={x?.id}
              price={x?.totalPrice}
              status={x?.status}
              name={x?.invoice?.name}
              updatedAt={x?.updatedAt}
              id={x?.id}
              setActiveInvoice={setActiveInvoice}
              activeInvoice={activeInvoice}
            />
          ))}
        </div>
        {getIndividualAggregatedInvoiceOrderListLoading ? <Spinner /> : null}
      </div>
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </Container>
  );
};

export default YourTransaction;
