import React, { useState } from "react";
import styled from "styled-components";
import product1 from "shared/assets/product1.svg";
import product2 from "shared/assets/product2.svg";
import uploadIcon from "shared/assets/uploadIcon.svg";
import proImg1 from "shared/assets/productImg1.svg";
import proImg2 from "shared/assets/productImg2.svg";
import proImg3 from "shared/assets/productImg3.svg";
import closeIcon from "shared/assets/closeIcon.svg";
import sentIcon from "shared/assets/sentIcon.svg";
import PhoneInput from "react-phone-number-input";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 50px;
`;

const Box = styled.div`
  background-color: #fff;
  width: 1200px;
  padding: 22px 30px;
  text-align: left;
  margin-bottom: 25px;

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
  grid-template-columns: 1.5fr 1fr 1fr;
  grid-row-gap: 30px;
  align-items: center;
  text-align: right;

  h3 {
    text-align: left;
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
  :last-child, :first-child {
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
        content: "";
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
        content: "";
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
    input[type="checkbox"] {
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

export const ErrorTitle = styled.h5`
  color: red;
  margin: 5px 0;
`;

const ReturnRequest = () => {
  const [qty1, setQty1] = useState(1);
  const [qty2, setQty2] = useState(0);
  const [phoneNumberIntl, setPhoneNumberIntl] = useState('');
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [phoneValidation, setPhoneValid] = useState(true);

  return (
    <Page>
      <Box>
        <h2>HD TV invoice from Soby</h2>
        <h4>Delivired</h4>
      </Box>

      <Box>
        <Grid>
          <h3>Which product do you want return?</h3>
          <HeaderCol>Qty</HeaderCol>
          <HeaderCol>Price</HeaderCol>

          <Product>
            <img src={product1} alt="" />
            <div>
              <p>HD TV invoice from Soby</p>
              <p>Blue bird shop</p>
            </div>
          </Product>
          <Counter>
            <button onClick={() => setQty1(qty1 - 1)} disabled={qty1 === 0}>
              -
            </button>
            <span>
              {qty1.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </span>
            <button onClick={() => setQty1(qty1 + 1)}>+</button>
          </Counter>
          <span>240.000 đ</span>

          <Product>
            <img src={product2} alt="" />
            <div>
              <p>Nintendo Switch with Neon Blue and Neon Red Joy-Con</p>
              <p>Blue bird shop</p>
            </div>
          </Product>
          <Counter>
            <button onClick={() => setQty2(qty2 - 1)} disabled={qty2 === 0}>
              -
            </button>
            <span>
              {qty2.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </span>
            <button onClick={() => setQty2(qty2 + 1)}>+</button>
          </Counter>
          <span>2.000.000 đ</span>
        </Grid>
      </Box>

      <Box>
        <h3>Contact information</h3>
        <p class="bold" htmlFor="">
          Phone number
        </p>
        <PhoneInput
                country="VN"
                international
                initialValueFormat="national"
                countryCallingCodeEditable={false}
                defaultCountry="VN"
                name="phoneNumber"
                value={phoneNumberIntl}
                onChange={(value) => setPhoneNumberIntl(value)}
              />
              {!phoneValidation ? (
                <ErrorTitle>Your phone number is not correct</ErrorTitle>
              ) : null}
      </Box>
      <Box>
        <h3>Return reason</h3>
        <BoxReason>
          <div className="checkbox">
            <input type="checkbox" name="" id="cb1" />
            <label htmlFor="cb1">Wrong product</label>
          </div>
          <p contentEditable>Describe what happened</p>
        </BoxReason>
        <BoxReason>
          <div className="checkbox">
            <input type="checkbox" name="" id="cb2" />
            <label htmlFor="cb2">I don't want to buy this anymore</label>
          </div>
        </BoxReason>
        <BoxReason>
          <div className="checkbox">
            <input type="checkbox" name="" id="cb3" />
            <label htmlFor="cb3">I make wrong order</label>
          </div>
        </BoxReason>
        <BoxReason>
          <div className="checkbox">
            <input type="checkbox" name="" id="cb4" />
            <label htmlFor="cb4">Order reason</label>
          </div>
        </BoxReason>
      </Box>

      <Box>
        <h3>Provide pictures of the problem</h3>
        <p className="sub">
          If it's broken or missing something, be sure to capture an image of it
        </p>

        <BoxReason className="upload-box">
          <p className="sub">Drag & drop or browser photo up upload</p>
          <img src={uploadIcon} alt="" />
        </BoxReason>

        <div className="row">
          <ImgBox>
            <img src={proImg1} alt="" />
            <div className="close-icon">
              <img src={closeIcon} alt="" />
            </div>
          </ImgBox>
          <ImgBox>
            <img src={proImg2} alt="" />
            <div className="close-icon">
              <img src={closeIcon} alt="" />
            </div>
          </ImgBox>
          <ImgBox>
            <img src={proImg3} alt="" />
            <div className="close-icon">
              <img src={closeIcon} alt="" />
            </div>
          </ImgBox>
        </div>
      </Box>

      <SentButton>
        Send request <img src={sentIcon} alt="" />
      </SentButton>
    </Page>
  );
};

export default ReturnRequest;
