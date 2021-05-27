import React from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import locationImg from 'shared/assets/location.svg';
import mailImg from 'shared/assets/mail-black.svg';
import heedImg from 'shared/assets/heed.svg';
import { ReactComponent as ShopBadgeIcon } from 'shared/assets/badge-vector.svg';
import styled from 'styled-components';
import { redColor } from 'shared/css-variable/variable';
import ShopVerifies from 'components/shop-verifies/shop-verifies.component';
import PhoneButton from './phone-button.component';
import buildAddressString from 'shared/utils/buildAddressString';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

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

  .badge {
    width: 55px;
    height: 24px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    background-color: ${(props) => props?.color || redColor};
    p {
      font-size: 0.7rem;
      color: white;
      line-height: 24px;
    }
    svg {
      margin-right: 4px;
      path:last-child {
        fill: ${(props) => props?.color || redColor};
      }
    }
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

const TooltipData = styled.div`
  background-color: white;
`;

const ShopCard = ({
  shopInfo,
  togglePhone,
  phoneString,
  setTogglePhone,
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
              <div className="badge">
                <ShopBadgeIcon />
                <p>{+shopInfo.shopRank.totalPoints / 10}</p>
              </div>
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
              <ReactTooltip
                id="shop-rank-info"
                aria-haspopup="true"
                role="example"
                place="left"
                type="light"
                effect="solid"
                globalEventOff="click"
              >
                <TooltipData>
                  <h5>Soby Rank – Chỉ số uy tín</h5>
                  <p className="mg-b-8">
                    Giá trị của Soby Rank đối với một cửa hàng sẽ tương đương
                    với tầm quan trọng của điểm IMDB đối với một bộ phim, hay
                    của số sao Michelin đối với một nhà hàng.
                  </p>
                  <h5 className="primary-color clickable">Read more</h5>
                </TooltipData>
              </ReactTooltip>
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
