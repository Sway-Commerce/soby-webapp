import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { Container } from './your-transactions.styles';

import HorizontalList from 'components/horizontal-list/horizontal-list.component';
import { GET_INVOICE_ORDER_LIST_FOR_INDIVIDUAL } from '../../graphQL/repository/invoice.repository';
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
    if (
      getInvoiceOrderListForIndividualData?.getInvoiceOrderListForIndividual
        ?.data?.records
    ) {
      setInvoiceList(
        getInvoiceOrderListForIndividualData?.getInvoiceOrderListForIndividual
          ?.data?.records
      );
      setInvoiceListQuery({
        ...invoiceListQuery,
        total:
          getInvoiceOrderListForIndividualData?.getInvoiceOrderListForIndividual
            ?.data?.total,
      });
    }
  }, [
    getInvoiceOrderListForIndividualData?.getInvoiceOrderListForIndividual?.data
      ?.records,
  ]);

  useEffect(() => {
    if (getInvoiceOrderListForIndividualError) {
      setFormError(getInvoiceOrderListForIndividualError.message);
    }
  }, [getInvoiceOrderListForIndividualError]);

  return (
    <Container>
      <div className="box-left">
        <div className="sub-filter">
          <HorizontalList
            key={JSON.stringify(subInvoiceFilters)}
            items={subInvoiceFilters}
            renderItem={(item, index) => (
              <div
                className={`tab-status ${subFilter === InvoiceStatusValue[index] ? 'active' : ''}`}
                key={item}
                onClick={() =>
                  setInvoiceListQuery({ ...invoiceListQuery, subFilter: InvoiceStatusValue[index] })
                }
              >
                <p className="status">{item}</p>
              </div>
            )}
          />
        </div>
        <div className="invoice-list">
          <div className="header-wrapper">
            <p>
              <b>Invoice name</b>
            </p>
            <p>
              <b>Date</b>
            </p>
            <p>
              <b>Price</b>
            </p>
            <p>
              <b>Seller</b>
            </p>
            <p className="text-right">
              <b>Status</b>
            </p>
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
        {getInvoiceOrderListForIndividualLoading ? <Spinner /> : null}
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
// {activeInvoice ? <Invoice invoiceIndividualId={activeInvoice} /> : null}
// ${activeInvoice ? 'width-limit' : ''}`
// <HorizontalList
//           key={JSON.stringify(mainInvoiceFilters)}
//           items={mainInvoiceFilters}
//           renderItem={(item, index) => (
//             <div
//               className={`tab-wrapper ${mainFilter === item ? '' : 'opacity'}`}
//               key={item}
//               onClick={() =>
//                 setInvoiceListQuery({ ...invoiceListQuery, mainFilter: item })
//               }
//             >
//               {mainIcons[index]}
//               <p className="order">{item}</p>
//               {mainFilter === item ? <p className="amount">{total}</p> : null}
//             </div>
//           )}
//         />
