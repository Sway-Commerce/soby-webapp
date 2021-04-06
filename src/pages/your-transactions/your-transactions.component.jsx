import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import { Container, ProductContainer } from './your-transactions.styles';
import Invoice from '../invoice/invoice.component';

import { ReactComponent as OrderIcon } from 'shared/assets/order-icon.svg';
import { ReactComponent as BillIcon } from 'shared/assets/bill-icon.svg';

import HorizontalList from 'components/horizontal-list/horizontal-list.component';
import { GET_INDIVIDUAL_INVOICE_LIST } from '../../graphQL/repository/invoice.repository';
import Spinner from 'components/ui/spinner/spinner.component';
import InvoiceItem from 'components/invoice-item/invoice-item.component';
import InvoiceStatus from 'components/invoice-status/invoice-status.component';
import {
  mainInvoiceFilters,
  subInvoiceFilters,
  subInvoiceIcons,
} from 'shared/constants/invoice.constant';

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

  const { mainFilter, subFilter, page, pageSize, total } = invoiceListQuery;

  const [
    getIndividualInvoiceList,
    {
      error: getIndividualInvoiceListError,
      data: getIndividualInvoiceListData,
      loading: getIndividualInvoiceListLoading,
    },
  ] = useLazyQuery(GET_INDIVIDUAL_INVOICE_LIST, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    setActiveInvoice(null);
    setInvoiceList([]);
    setInvoiceListQuery({...invoiceListQuery, total: 0})
    if (mainFilter === 'Invoices') {
      getIndividualInvoiceList({
        variables: {
          query: {
            statuses: [subFilter.toUpperCase()],
            page,
            pageSize,
          },
        },
      });
    }
  }, [mainFilter, subFilter, page, pageSize, getIndividualInvoiceList]);

  useEffect(() => {
    if (getIndividualInvoiceListData?.getIndividualInvoiceList?.data?.records) {
      setInvoiceList(
        getIndividualInvoiceListData?.getIndividualInvoiceList?.data?.records
      );
      setInvoiceListQuery({
        ...invoiceListQuery,
        total:
          getIndividualInvoiceListData?.getIndividualInvoiceList?.data?.total,
      });
    }
  }, [getIndividualInvoiceListData?.getIndividualInvoiceList?.data?.records]);

  if (getIndividualInvoiceListError) {
    return console.log(getIndividualInvoiceListError);
  }

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
        {getIndividualInvoiceListLoading ? <Spinner /> : null}
      </div>
      {activeInvoice ? (
        <Invoice invoiceIndividualId={activeInvoice} />
      ) : null}
    </Container>
  );
};

export default YourTransaction;
