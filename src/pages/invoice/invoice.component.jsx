import React, { useState } from 'react';
import styled from 'styled-components';
import product1 from 'shared/assets/product1.svg';
import product2 from 'shared/assets/product2.svg';
import { ReactComponent as CloseIcon } from 'shared/assets/close-action.svg';
import { ReactComponent as AcceptIcon } from 'shared/assets/accept-action.svg';
import { borderColor } from 'shared/css-variable/variable';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 26px;
  background-color: #ffffff;
  margin-top: 38px;
`;

const Box = styled.div`
  background-color: #fff;
  text-align: left;

  &.main-box {
    display: flex;
    justify-content: space-between;
  }

  h4 {
    color: ${(prop) => prop.theme.primary};
  }

  .row {
    display: flex;
    margin-top: 20px;
  }

  .sub {
    margin-top: 5px;
    font-size: 14px;
    color: ${(prop) => prop.theme.stoke};
  }
  .bold {
    font-weight: 600;
    margin-top: 5px;
  }

  .phone {
    width: 100%;
    padding: 7px 0;
    border-radius: 0;
    border: 0;
    outline: 0;
    border-bottom: 1px solid #000;
    margin-bottom: 10px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50% 1fr 1fr 1fr;

  :first-child,
  :last-child {
    border-bottom: 1px solid ${borderColor};
  }

  .last-child {
    justify-self: right;
    flex: 1;
  }

  h3 {
    text-align: left;
  }

  .title-info {
    min-height: 60px;
    display: flex;
    align-items: center;
  }
`;

const HeaderCol = styled.p`
  color: ${(prop) => prop.theme.stoke};
  font-weight: 600;
  text-align: right;
`;

const Product = styled.div`
  display: flex;
  text-align: left;

  div {
    margin-left: 15px;
    padding: 5px;

    p {
      &:last-child {
        margin-top: 5px;
        font-size: 14px;
        color: ${(prop) => prop.theme.stoke};
      }
    }
  }
`;

const Counter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  span {
    margin: 0 14px;
  }

  button {
    font-size: 25px;
    outline: 0;
    background: none;
    border-radius: 5px;
    height: 30px;
    width: 30px;
    border: 1px solid ${(prop) => prop.theme.stoke};
    cursor: pointer;
  }
`;

const BoxReason = styled.div`
  border-bottom: 1px solid #c2c2c2;
  padding: 7px 0 24px;
  margin-top: 14px;
  :last-child,
  :first-child {
    border: none;
  }

  &.upload-box {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0;

    img {
      margin-left: 5px;
    }
  }

  div {
    label {
      margin-left: 10px;
    }
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: ${(prop) => prop.theme.stoke};
  }

  .checkbox {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;

    label {
      position: relative;
      cursor: pointer;

      padding-left: 20px;
      span {
        margin-left: 12px;
      }
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0px;
        transform: translate(-50%, -50%);
        width: 12px;
        height: 12px;
        transition: transform 0.28s ease;
        border-radius: 3px;
        border: 1px solid #000;
      }
      &:after {
        content: '';
        display: block;
        width: 9px;
        height: 4px;
        border-bottom: 2px solid #fff;
        border-left: 2px solid #fff;
        transform: rotate(-45deg) scale(0) translate(-50%, -50%);
        transition: transform ease 0.25s;
        position: absolute;
        top: 7px;
        left: -5px;
      }
    }
    input[type='checkbox'] {
      width: auto;
      opacity: 0.00000001;
      position: absolute;
      left: 0;
      margin-left: -20px;
      &:checked ~ label {
        &:before {
          background-color: #2b74e4;
          border: 2px solid #2b74e4;
        }
        &:after {
          transform: rotate(-45deg) scale(1);
        }
      }
      &:focus + label::before {
        outline: 0;
      }
    }
  }
`;

const ImgBox = styled.div`
  position: relative;
  margin-right: 18px;

  .close-icon {
    position: absolute;
    top: 5px;
    right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #f1f1f1;
    height: 24px;
    width: 24px;
  }
`;

const SentButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(prop) => prop.theme.primary};
  color: #fff;
  font-size: 18px;
  border-radius: 7px;
  outline: 0;
  border: 0;
  padding: 12px 180px;

  img {
    margin-left: 10px;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  position: relative;
  top: -15px;

  .action {
    display: flex;
    flex-direction: column;

    p {
      text-align: center;
    }

    & + .action {
      margin-left: 40px;
    }
  }
`;

export const InfoBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 30px;
  background: #ffffff;

  .info-box {
    border: 1px solid ${borderColor};
    height: 100px;
    padding: 16px 24px;
    .invoice-info {
      color: #828282;
    }
  }
`;

export const FooterBox = styled.div`
  display: grid;
  grid-template-columns: 50% 1fr 1fr;

`;

const BreakLine = styled.hr`
  border-top: 1px solid ${borderColor};
  margin-bottom: 24px;
`;

const Invoice = () => {
  const [qty1, setQty1] = useState(1);
  const [qty2, setQty2] = useState(0);
  const [phoneNumberIntl, setPhoneNumberIntl] = useState('');
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [phoneValidation, setPhoneValid] = useState(true);

  return (
    <Page>
      <Box className="main-box">
        <div>
          <h2>HD TV invoice from Soby</h2>
          <h4>Delivired</h4>
        </div>
        <ActionContainer>
          <div className="action">
            <CloseIcon />
            <p>Reject</p>
          </div>
          <div className="action">
            <AcceptIcon />
            <p>Accept</p>
          </div>
        </ActionContainer>
      </Box>

      <InfoBox>
        <div className="info-box">
          <p>
            <b>Invoice form</b>
          </p>
          <p className="invoice-info">Blue bird Shop</p>
        </div>
        <div className="info-box">
          <p>
            <b>Shipping address</b>
          </p>
          <p className="invoice-info">
            41-47 Dong Du Str., Ben Nghe Ward, D1, Hochiminh city
          </p>
        </div>
        <div className="info-box">
          <p>
            <b>Tracking code</b>
          </p>
          <p className="invoice-info">123.4654.dsafd12345</p>
        </div>
      </InfoBox>

      <Grid>
        <p className="title-info">
          <b>Products list</b>
        </p>
        <p className="title-info">
          <b>Subtotal</b>
        </p>
        <p className="title-info">
          <b>Qty</b>
        </p>
        <p className="title-info last-child">
          <b>Total</b>
        </p>
      </Grid>
      <BreakLine/>
      <Grid>
        <Product className="title-info">
          <img src={product1} alt="" />
          <div>
            <p>HD TV invoice from Soby</p>
            <p>Blue bird shop</p>
          </div>
        </Product>
        <p className="title-info">240.000 đ</p>
        <p className="title-info">02</p>
        <p className="title-info last-child">240.000 đ</p>
      </Grid>
      <Grid>
        <Product className="title-info">
          <img src={product2} alt="" />
          <div>
            <p>Nintendo Switch with Neon Blue and Neon Red Joy-Con</p>
            <p>Blue bird shop</p>
          </div>
        </Product>
        <p className="title-info">240.000 đ</p>
        <p className="title-info">02</p>
        <p className="title-info last-child">240.000 đ</p>
      </Grid>
      <BreakLine/>
      <FooterBox>
        <div></div>
        <p>Subtotal</p>
        <p className="text-right">2.240,000 vnđ</p>
      </FooterBox>
      <FooterBox>
        <div></div>
        <p>Safebuy fee</p>
        <p className="text-right">0 đ</p>
      </FooterBox>
      <FooterBox>
        <div></div>
        <p>Shipping fee</p>
        <p className="text-right">0 đ</p>
      </FooterBox>
      <FooterBox>
        <div></div>
        <p>
          <b>Total</b>
        </p>
        <p className="text-right">
          <b>2.260.000 đ</b>
        </p>
      </FooterBox>
    </Page>
  );
};

export default Invoice;
