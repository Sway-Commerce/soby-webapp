import React from 'react';
import { redColor } from 'shared/css-variable/variable';
import styled from 'styled-components';
import { ReactComponent as ShopBadgeIcon } from 'shared/assets/badge-vector.svg';
import { getColor } from 'shared/constants/shop.constant';

const Container = styled.div`
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
`;

const ShopBadge = ({ point, rankColor }) => {
  return (
    <Container color={getColor(rankColor)}>
      <ShopBadgeIcon />
      <p>{(+point || 0) / 10}</p>
    </Container>
  );
};

export default ShopBadge;
