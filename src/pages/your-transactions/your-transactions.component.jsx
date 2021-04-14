import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { Container } from './your-transactions.styles';
import Invoice from '../invoice/invoice.component';

import { ReactComponent as OrderIcon } from 'shared/assets/order-icon.svg';
import { ReactComponent as BillIcon } from 'shared/assets/bill-icon.svg';

import HorizontalList from 'components/horizontal-list/horizontal-list.component';
import { GET_INVOICE_ORDER_LIST_FOR_INDIVIDUAL } from '../../graphQL/repository/invoice.repository';
import Spinner from 'components/ui/spinner/spinner.component';
import InvoiceItem from 'components/invoice-item/invoice-item.component';
import {
  mainInvoiceFilters,
  subInvoiceFilters,
  subInvoiceIcons,
} from 'shared/constants/invoice.constant';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';

const YourTransaction = ({ name }) => {
  const mainIcons = [<OrderIcon />, <BillIcon />];

  const [invoiceList, setInvoiceList] = useState([]);
  const [activeInvoice, setActiveInvoice] = useState('');
  const [invoiceListQuery, setInvoiceListQuery] = useState({
    page: 0,
    pageSize: 10,
    mainFilter: mainInvoiceFilters[1],
    subFilter: subInvoiceFilters[0],
    total: 0,
  });
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');

  const { mainFilter, subFilter, page, pageSize, total } = invoiceListQuery;

  const [
    getInvoiceOrderListForIndividual,
    {
      error: getInvoiceOrderListForIndividualError,
      data: getInvoiceOrderListForIndividualData,
      loading: getInvoiceOrderListForIndividualLoading,
    },
  ] = useLazyQuery(GET_INVOICE_ORDER_LIST_FOR_INDIVIDUAL, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (getInvoiceOrderListForIndividualError) {
      setFormError(getInvoiceOrderListForIndividualError?.message);
      setOpen(true);
    }
  }, [getInvoiceOrderListForIndividualError]);

  useEffect(() => {
    setActiveInvoice(null);
    setInvoiceList([]);
    setInvoiceListQuery({ ...invoiceListQuery, total: 0 });
    if (mainFilter === 'Invoices') {
      getInvoiceOrderListForIndividual({
        variables: {
          query: {
            statuses: [subFilter.toUpperCase()],
            page,
            pageSize,
          },
        },
      });
    }
  }, [mainFilter, subFilter, page, pageSize, getInvoiceOrderListForIndividual]);

  useEffect(() => {
    if (getInvoiceOrderListForIndividualData?.getInvoiceOrderListForIndividual?.data?.records) {
      setInvoiceList(
        getInvoiceOrderListForIndividualData?.getInvoiceOrderListForIndividual?.data?.records
      );
      setInvoiceListQuery({
        ...invoiceListQuery,
        total:
          getInvoiceOrderListForIndividualData?.getInvoiceOrderListForIndividual?.data?.total,
      });
    }
  }, [getInvoiceOrderListForIndividualData?.getInvoiceOrderListForIndividual?.data?.records]);

  useEffect(() => {
    if (getInvoiceOrderListForIndividualError) {
      setFormError(getInvoiceOrderListForIndividualError.message);
    }
  }, [getInvoiceOrderListForIndividualError]);

  return (
    <Container>
      <div className={`box-left ${activeInvoice ? 'width-limit' : ''}`}>
        <HorizontalList
          key={JSON.stringify(mainInvoiceFilters)}
          items={mainInvoiceFilters}
          renderItem={(item, index) => (
            <div
              className={`tab-wrapper ${mainFilter === item ? '' : 'opacity'}`}
              key={item}
              onClick={() =>
                setInvoiceListQuery({ ...invoiceListQuery, mainFilter: item })
              }
            >
              {mainIcons[index]}
              <p className="order">{item}</p>
              {mainFilter === item ? <p className="amount">{total}</p> : null}
            </div>
          )}
        />
        <div className="sub-filter">
          <HorizontalList
            key={JSON.stringify(subInvoiceFilters)}
            items={subInvoiceFilters}
            renderItem={(item, index) => (
              <div
                className={`tab-status ${subFilter === item ? '' : 'opacity'}`}
                key={item}
                onClick={() =>
                  setInvoiceListQuery({ ...invoiceListQuery, subFilter: item })
                }
              >
                {subInvoiceIcons[index]}
                <p className="status">{item}</p>
              </div>
            )}
          />
        </div>
        <div className="invoice-list">
          {invoiceList.map((x) => (
            <InvoiceItem
              key={x?.id}
              price={x?.totalPrice}
              status={x?.status}
              name={x?.invoice?.name}
              id={x?.id}
              setActiveInvoice={setActiveInvoice}
              activeInvoice={activeInvoice}
            />
          ))}
        </div>
        {getInvoiceOrderListForIndividualLoading ? <Spinner /> : null}
      </div>
      {activeInvoice ? <Invoice invoiceIndividualId={activeInvoice} /> : null}
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </Container>
  );
};

export default YourTransaction;
