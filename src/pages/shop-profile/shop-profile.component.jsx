import React from 'react';

import { CardShadow, ShopContainer, Card } from './shop-profile.styles';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { ReactComponent as Temp } from '../../assets/temp.svg';
import { GET_SHOP_BY_ID } from '../../graphQL/repository/shop.repository';

const ShopProfile = () => {
  debugger

  const { shopId } = useParams();
  const {loading, error, data} = useQuery(GET_SHOP_BY_ID, {
    variables: { id: shopId },
  })

  if (loading) return null;
  if (error) return `Error! ${error}`;
  console.log({ data });
  return (
    <ShopContainer>
      <CardShadow className="shop-name">
        <Temp />
        <div className="info">
          <h2 className="title">Shop name</h2>
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
    </ShopContainer>
  );
};

export default ShopProfile;
