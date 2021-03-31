import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import { Container } from './your-transactions.styles';
import ReceiveInvoice from '../receive-invoice/receive-invoice.component';

import { ReactComponent as OrderIcon } from 'shared/assets/order-icon.svg';
import { ReactComponent as BillIcon } from 'shared/assets/bill-icon.svg';
import { ReactComponent as DisputeIcon } from 'shared/assets/dispute-icon.svg';
import { ReactComponent as ClockIcon } from 'shared/assets/clock.svg';

const YourTransaction = ({ history, name }) => {

  // /transaction/checkout/:invoiceId

  return (
    <Container>
      <div className="box-left">
        <div className="navigate-tab">
          <div className="tab-wrapper">
            <OrderIcon className="shopping-bag" />
            <p className="order">Orders</p>
            <p className="amount">65</p>
          </div>
          <div className="tab-wrapper opacity">
            <BillIcon className="shopping-bag" />
            <p className="order">Invoices</p>
            <p className="amount">65</p>
          </div>
          <div className="tab-wrapper opacity">
            <DisputeIcon className="shopping-bag" />
            <p className="order">Dispute</p>
            <p className="amount">65</p>
          </div>
        </div>

        <div className="container-status">
          <div className="tab-status">
            <img className="clock" src="./clock.png" alt="" />
            <p className="status">Waiting</p>
            <p className="line">|</p>
          </div>
          <div className="tab-status opacity">
            <img className="clock" src="./tick.png" alt="" />
            <p className="status">Completed</p>
            <p className="line">|</p>
          </div>
          <div className="tab-status opacity">
            <img className="clock" src="./dollar.png" alt="" />
            <p className="status">Deposited</p>
            <p className="line">|</p>
          </div>
          <div className="tab-status opacity">
            <img className="clock" src="./truck.png" alt="" />
            <p className="status">On Delivery</p>
            <p className="line">|</p>
          </div>
        </div>
      </div>

      <ReceiveInvoice hideCheckout />
    </Container>
  );
};

export default withRouter(YourTransaction);

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
