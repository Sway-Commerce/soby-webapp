import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import { Container, ProductContainer } from './your-transactions.styles';
import ReceiveInvoice from '../receive-invoice/receive-invoice.component';

import { ReactComponent as OrderIcon } from 'shared/assets/order-icon.svg';
import { ReactComponent as BillIcon } from 'shared/assets/bill-icon.svg';
import { ReactComponent as ClockIcon } from 'shared/assets/clock.svg';
import { ReactComponent as TickIcon } from 'shared/assets/tick-icon.svg';
import { ReactComponent as DollasIcon } from 'shared/assets/dollas-icon.svg';
import { ReactComponent as TruckIcon } from 'shared/assets/truck-icon.svg';
import HorizontalList from 'components/horizontal-list/horizontal-list.component';
import { GET_INDIVIDUAL_INVOICE_LIST } from '../../graphQL/repository/invoice.repository';
import Spinner from 'components/ui/spinner/spinner.component';
import InvoiceItem from 'components/invoice-item/invoice-item.component';

const YourTransaction = ({ name }) => {
  const mainFilters = ['Orders', 'Invoices'];
  const subFilters = [
    'Accepted',
    'Paid',
    'Shipping',
    'Delivered',
    'Completed',
    'Cancelled',
  ];
  const mainIcons = [<OrderIcon />, <BillIcon />];
  const subIcons = [
    <ClockIcon />,
    <DollasIcon />,
    <TruckIcon />,
    <TruckIcon />,
    <TickIcon />,
    <TickIcon />,
  ];
  const [mainFilter, setMainFilter] = useState(mainFilters[1]);
  const [subFilter, setSubFilter] = useState(subFilters[0]);
  const [invoiceList, setInvoiceList] = useState([]);
  const [activeInvoice, setActiveInvoice] = useState('');

  const [
    getIndividualInvoiceList,
    {
      error: getIndividualInvoiceListError,
      data: getIndividualInvoiceListData,
      loading: getIndividualInvoiceListLoading,
    },
  ] = useLazyQuery(GET_INDIVIDUAL_INVOICE_LIST);

  useEffect(() => {
    if (mainFilter === 'Invoices') {
      getIndividualInvoiceList({
        variables: {
          query: {
            statuses: [subFilter.toUpperCase()],
            page: 0,
            pageSize: 5,
          },
        },
      });
    }
  }, [mainFilter, subFilter, getIndividualInvoiceList]);

  useEffect(() => {
    if (getIndividualInvoiceListData?.getIndividualInvoiceList?.data) {
      console.log(
        getIndividualInvoiceListData?.getIndividualInvoiceList?.data?.records
      );
      setInvoiceList(
        getIndividualInvoiceListData?.getIndividualInvoiceList?.data?.records
      );
    }
  }, [getIndividualInvoiceListData?.getIndividualInvoiceList?.data]);

  if (getIndividualInvoiceListError) {
    return getIndividualInvoiceListError;
  }

  return (
    <Container>
      <div className="box-left">
        <HorizontalList
          key={JSON.stringify(mainFilters)}
          items={mainFilters}
          renderItem={(item, index) => (
            <div
              className={`tab-wrapper ${mainFilter === item ? '' : 'opacity'}`}
              key={item}
              onClick={() => setMainFilter(item)}
            >
              {mainIcons[index]}
              <p className="order">{item}</p>
              <p className="amount">65</p>
            </div>
          )}
        />
        <div className="sub-filter">
          <HorizontalList
            key={JSON.stringify(subFilters)}
            items={subFilters}
            renderItem={(item, index) => (
              <div
                className={`tab-status ${subFilter === item ? '' : 'opacity'}`}
                key={item}
                onClick={() => setSubFilter(item)}
              >
                {subIcons[index]}
                <p className="status">{item}</p>
              </div>
            )}
          />
        </div>
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
