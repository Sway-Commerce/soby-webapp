import React from 'react';
import styled, { css } from 'styled-components';
import { mainColor } from 'shared/css-variable/variable';

import { Link } from 'react-router-dom';

const ProductStyles = css`
  background: rgba(241, 241, 241, 1);
  border: none;
  box-shadow: none;
`;

const ShopStyles = css`
  border: 1px solid rgba(194, 194, 194, 0.5);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.07);
`;

const getCardStyle = (props) => {
  if (props.productView) {
    return ProductStyles;
  }

  return ShopStyles;
};

const Container = styled.div`
  border-radius: 8px;
  transition: 0.3s;
  width: 364px;
  height: 154px;
  display: flex;
  align-items: center;

  ${getCardStyle}
`;

const ImageItem = styled.img`
  width: 74px;
  height: 74px;
  margin: 0 32px 0 40px;
`;

const CardName = styled.h2`
  color: ${mainColor};
  line-height: 35px;
  margin-right: 20px;
`;

const ShopNameCard = ({ logoUrl, name, productView = false, id }) => {
  return (
    <Link to={`/shop-profile/${id}`}>
      <Container productView={productView}>
        <ImageItem src={logoUrl} alt="logo" />
        <CardName className="text-truncation-second-line">{name}</CardName>
      </Container>
    </Link>
  );
};

export default ShopNameCard;
