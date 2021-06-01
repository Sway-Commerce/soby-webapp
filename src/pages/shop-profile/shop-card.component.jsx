import React from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import locationImg from 'shared/assets/location.svg';
import mailImg from 'shared/assets/mail-black.svg';
import heedImg from 'shared/assets/heed.svg';
import styled from 'styled-components';
import ShopVerifies from 'components/shop-verifies/shop-verifies.component';
import PhoneButton from './phone-button.component';
import buildAddressString from 'shared/utils/buildAddressString';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import ShopBadge from './shop-badge.component';
import RankTooltip from './rank-tooltip.component';

const HeadContact = styled.div`
  padding: 24px;
  width: 260px;
  height: fit-content;
  border: 1px solid #e4e4e4;
  border-radius: 3px;
  justify-content: center;
  display: ${(props) => (props.show ? 'flex' : 'none')};

  .contact {
    width: 212px;
  }

  .head {
    display: flex;
  }

  .sign {
    margin-left: 16px;
    h3 {
      line-height: 19.44px;
    }
  }

  .avatarImg {
    width: 48px;
    height: 48px;
    border-radius: 3px;
    object-fit: cover;
  }

  .contact-item {
    margin-top: 16px;
    display: flex;
    align-items: flex-start;
    img {
      margin-right: 12px;
    }

    p {
      -webkit-line-clamp: 5;
    }
  }

  @media screen and (max-width: 768px) {
    display: ${(props) => (props.hide ? 'flex' : 'none')};
    width: 100%;
    background-color: white;
    margin: 16px 0;
    .contact-item {
      display: none;
    }
    .contact {
      width: 100%;
    }
  }
`;

const ShopCard = ({
  shopInfo,
  togglePhone,
  phoneString,
  setTogglePhone,
  color,
  ...rest
}) => {
  return (
    <HeadContact {...rest}>
      <div className="contact">
        <div className="head mg-b-16">
          <Link to={`/shop-profile/${shopInfo.id}`}>
            <img className="avatarImg" src={shopInfo.logoUrl} alt="" />
          </Link>

          <div className="sign">
            <h3
              className="truncate"
              data-tip={shopInfo.name}
              data-for="shop-name"
            >
              {shopInfo.name}
            </h3>
            <ReactTooltip id="shop-name" />

            <div className="contact-wrapper">
              <ShopBadge
                point={shopInfo.shopRank.totalPoints}
                rankColor={color}
              />
              <p className="status">
                <b>{shopInfo.shopRank.rank.description}</b>
              </p>
              <img
                className="heed-icon"
                src={heedImg}
                alt=""
                data-tip
                data-for="shop-rank-info"
                data-event="click focus"
              />
              <RankTooltip id="shop-rank-info" />
            </div>
          </div>
        </div>

        <ShopVerifies
          status={shopInfo.kyb?.status}
          kycStatus={shopInfo?.kycStatus}
          shopUrls={shopInfo?.shopUrls}
        />

        <PhoneButton
          togglePhone={togglePhone}
          phoneNumber={formatPhoneNumberIntl(
            `${shopInfo.phoneCountryCode}${shopInfo.phoneNumber}`
          )}
          phoneNumberCovered={phoneString}
          setTogglePhone={setTogglePhone}
          showText="Show"
          hideText="Hide"
          show
          hide
        />
        <div className="contact-item">
          <img src={locationImg} alt="" />
          <p className="truncate" data-tip={shopInfo.name}>
            {buildAddressString(shopInfo.shippingLocations[0])}
          </p>
        </div>
        <div className="contact-item">
          <img src={mailImg} alt="" />
          <p>{shopInfo.email}</p>
        </div>
      </div>
    </HeadContact>
  );
};

export default ShopCard;
