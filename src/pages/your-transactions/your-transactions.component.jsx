import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import { Container } from './your-transactions.styles';
import ReceiveInvoice from '../receive-invoice/receive-invoice.component';

import { ReactComponent as OrderIcon } from 'shared/assets/order-icon.svg';
import { ReactComponent as BillIcon } from 'shared/assets/bill-icon.svg';
import { ReactComponent as ClockIcon } from 'shared/assets/clock.svg';
import { ReactComponent as TickIcon } from 'shared/assets/tick-icon.svg';
import { ReactComponent as DollasIcon } from 'shared/assets/dollas-icon.svg';
import { ReactComponent as TruckIcon } from 'shared/assets/truck-icon.svg';
import HorizontalList from 'components/horizontal-list/horizontal-list.component';

const YourTransaction = ({ name }) => {
  const mainFilters = ['Orders', 'Invoices'];
  const subFilters = [
    'Accepted',
    'Paid',
    'Shipping',
    'Delivery',
    'Completed',
    'Canceled',
  ];
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

  return (
    <Container>
      <div className="box-left">
        <HorizontalList
          items={mainFilters}
          renderItem={(item) => (
            <div
              className={`tab-wrapper ${mainFilter === item ? '' : 'opacity'}`}
              key={item}
              onClick={() => setMainFilter(item)}
            >
              <OrderIcon className="shopping-bag" />
              <p className="order">{item}</p>
              <p className="amount">65</p>
            </div>
            // <span
            //   key={item}
            //   className={mainFilter === item ? 'active' : ''}
            //   onClick={() => setMainFilter(item)}
            // >
            //   {item}
            // </span>
          )}
        />
        <div className="sub-filter">
          <HorizontalList
            items={subFilters}
            renderItem={(item, index) => (
              // const [subFilter, setSubFilter] = useState(subFilters[0]);

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
      </div>
    </Container>
  );
};

export default YourTransaction;

// <ReceiveInvoice hideCheckout />

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
