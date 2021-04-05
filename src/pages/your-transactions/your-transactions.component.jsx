import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import { Container, ProductContainer } from './your-transactions.styles';
import ReceiveInvoice from '../receive-invoice/receive-invoice.component';

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
  });

  const { mainFilter, subFilter, page, pageSize } = invoiceListQuery;

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
              <p className="amount">65</p>
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
        <ReceiveInvoice invoiceIndividualId={activeInvoice} />
      ) : null}
    </Container>
  );
};

export default YourTransaction;

// <div className="box-left">
//         <p className="title">
//           <b>Thông tin giao hàng</b>
//         </p>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="">Tên người nhận</label>
//           <FormInput
//             type="text"
//             name="addressLine"
//             value={shippingInfo.addressLine}
//             onChange={handleChange}
//             label="Tên người nhận"
//           />
//           <label htmlFor="">Địa chỉ</label>
//           <input type="text" placeholder="Hồ Chí Minh city" />

//           <div className="select-wrapper">
//             {provinceList?.length ? (
//               <Dropdown
//                 options={provinceList}
//                 onChange={onSelectProvinceChange}
//                 value={province}
//               />
//             ) : null}
//             <Dropdown
//               options={districtList}
//               onChange={onSelectDistrictChange}
//               value={district}
//             />
//             <Dropdown options={wardList} onChange={setWard} value={ward} />
//           </div>

//           <label htmlFor="">Số điện thoại</label>
//           <PhoneInput
//             country="US"
//             international
//             withCountryCallingCode
//             initialValueFormat="national"
//             countryCallingCodeEditable={false}
//             defaultCountry="VN"
//             name="phoneNumber"
//             value={phoneNumberIntl}
//             onChange={(value) => setPhoneNumberIntl(value)}
//           />
//           {!isPhoneValid ? (
//             <ErrorTitle>Your phone number is not correct</ErrorTitle>
//           ) : null}
//           <button>Next</button>
//         </form>
//       </div>

// <div className="tab-wrapper opacity">
//             <DisputeIcon className="shopping-bag" />
//             <p className="order">Dispute</p>
//             <p className="amount">65</p>
//           </div>
//           <div className="tab-wrapper opacity">
//             <OrderIcon className="shopping-bag" />
//             <p className="order">Delivered</p>
//             <p className="amount">65</p>
//           </div>
//           <div className="tab-wrapper opacity">
//             <BillIcon className="shopping-bag" />
//             <p className="order">Completed</p>
//             <p className="amount">65</p>
//           </div>
//           <div className="tab-wrapper opacity">
//             <BillIcon className="shopping-bag" />
//             <p className="order">Cancelled</p>
//             <p className="amount">65</p>
//           </div>

// <div className="container-status">
//   <div className="tab-status">
//     <ClockIcon className="clock" />
//     <p className="status">Accepted</p>
//     <p className="line">|</p>
//   </div>
//   <div className="tab-status opacity">
//     <DollasIcon className="clock" />
//     <p className="status">Paid</p>
//     <p className="line">|</p>
//   </div>
//   <div className="tab-status opacity">
//     <TruckIcon className="clock" />
//     <p className="status">Shipping</p>
//     <p className="line">|</p>
//   </div>
//   <div className="tab-status opacity">
//     <TruckIcon className="clock" />
//     <p className="status">Delivery</p>
//     <p className="line">|</p>
//   </div>
//   <div className="tab-status opacity">
//     <TickIcon className="clock" />
//     <p className="status">Completed</p>
//     <p className="line">|</p>
//   </div>
//   <div className="tab-status opacity">
//     <TickIcon className="clock" />
//     <p className="status">Canceled</p>
//     <p className="line">|</p>
//   </div>
// </div>
