import React from 'react';

import {
  CardShadow,
  ShopContainer,
  Card,
  MainContent,
} from './shop-profile.styles';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

import { ReactComponent as Temp } from '../../assets/temp.svg';
import { ReactComponent as Cart } from '../../assets/category-cart.svg';
import { ReactComponent as Car } from '../../assets/category-car.svg';
import { ReactComponent as Avatar } from '../../assets/avatar.svg';
import { ReactComponent as FbIcon } from '../../assets/fb-icon.svg';
import { ReactComponent as Location } from '../../assets/location.svg';
import { ReactComponent as Phone } from '../../assets/phone-icon.svg';

import { GET_SHOP_BY_ID } from '../../graphQL/repository/shop.repository';

import Spinner from '../../components/spinner/spinner.component';

const ShopProfile = () => {
  const { shopId } = useParams();
  const { loading, error, data } = useQuery(GET_SHOP_BY_ID, {
    variables: { id: shopId },
  });

  if (loading) return <Spinner />;
  if (error) return `Error! ${error}`;

  const {
    id,
    individualId,
    name,
    phoneCountryCode,
    phoneNumber,
    description,
    logoUrl,
    categories,
    shopUrls,
    signingPublicKey,
    encryptionPublicKey,
    createdAt,
    updatedAt,
    shippingType,
    kyb,
  } = data.getShopById?.data;

  console.log({ data });
  return (
    <ShopContainer>
      <div className="left-panel">
        <CardShadow className="shop-name">
          <img src={logoUrl} alt="logo"/>
          <div className="info">
            <h2 className="title">{name}</h2>
            <p className="rank">Soby rank 4</p>
          </div>
        </CardShadow>
        <Card className="business-kyb">
          <div className="title">
            <h4>Business KYB</h4>
            <div className="status">Verified</div>
          </div>
          <div className="info-group">
            <p>Business Name</p>
            <p>Blue bird</p>
          </div>
          <div className="info-group">
            <p>Business numbers</p>
            <p>13654.789654.133.abcxyz</p>
          </div>
          <div className="info-group">
            <p>Business Address</p>
            <p>H3 biulding, Hoang Dieu Str., D4, ....</p>
          </div>
          <div className="info-group">
            <p>Date of enity established</p>
            <p>dd/mm/yyyy</p>
          </div>
        </Card>
        <Card className="personal-kyb">
          <div className="title">
            <h4>Personal KYB</h4>
            <div className="status">Not Verified</div>
          </div>
        </Card>
        <CardShadow className="shop-feedback">
          <h3>Feedback on Soby</h3>
          <div className="info-group">
            <p>Fast delivery</p>
            <p>25</p>
          </div>
          <div className="info-group">
            <p>Products match description</p>
            <p>25</p>
          </div>
          <div className="info-group">
            <p>Kind communication</p>
            <p>25</p>
          </div>
          <div className="info-group">
            <p>Helpful & details description</p>
            <p>25</p>
          </div>
        </CardShadow>
      </div>

      <MainContent>
        <h3>Shop Decripsiton</h3>
        <p>{description}</p>
        <h3>Shop Categories</h3>
        <div className="category-list">
          <div className="category-item">
            <Car />
            <p>{categories[0]}</p>
          </div>
          <div className="category-item">
            <Car />
            <p>{categories[1]}</p>
          </div>
        </div>

        <div className="shop-info">
          <div className="wrapper">
            <Avatar />
            <p>Brian Cuisiquancui</p>
          </div>
          <div className="wrapper">
            <Phone />
            <p>{formatPhoneNumberIntl(`${phoneCountryCode}${phoneNumber}`)}</p>
          </div>
        </div>
        <div className="shop-info">
          <Location />
          <p>
            CirCo Coworking Space, H3 Building, 384 Hoàng Diệu, Phường 6, Quận
            4, Thành phố Hồ Chí Minh
          </p>
        </div>

        <div className="website-group">
          <div className="wrapper">
            <div className="sub-wrapper">
              <div className="icon-wrapper">
                <FbIcon />
              </div>
              <p>Facebook</p>
            </div>
            <p className="url">www.bluebirdShop.com</p>
          </div>
          <div className="wrapper">
            <div className="sub-wrapper">
              <Temp className="temp" />
              <p>Website</p>
            </div>
            <p className="url">www.bluebirdShop.com</p>
          </div>
          <div className="wrapper">
            <div className="sub-wrapper">
              <Temp className="temp" />
              <p>Instagram</p>
            </div>
            <p className="url">www.bluebirdShop.com</p>
          </div>
          <div className="wrapper">
            <div className="sub-wrapper">
              <Temp className="temp" />
              <p>Website</p>
            </div>
            <p className="url">www.bluebirdShop.com</p>
          </div>
        </div>
        <h3>Products</h3>
      </MainContent>
    </ShopContainer>
  );
};

export default ShopProfile;
