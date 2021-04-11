import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Car } from 'shared/assets/category-car.svg';

const CategoryItem = styled.div`
  height: 46px;
  padding: 8px 20px;
  border: ${(props) =>
    props.noBorder ? 'none' : '1px solid rgba(0, 0, 0, 0.5)'};
  border-radius: 8px;
  display: grid;
  grid-template-columns: 30px 100px;
  place-items: center;
`;

const CategoryName = styled.p`
  margin: 0;
  padding: 0;
`;

const ShopCategory = ({ category, noBorder }) => {
  return (
    <CategoryItem noBorder={noBorder}>
      <Car />
      <CategoryName>{category}</CategoryName>
    </CategoryItem>
  );
};

export default ShopCategory;
