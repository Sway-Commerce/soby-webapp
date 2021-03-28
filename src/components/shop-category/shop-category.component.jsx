import React from 'react';

import { ReactComponent as Car } from 'shared/assets/category-car.svg';
import { CategoryItem } from './shop-category.styles';

const ShopCategory = ({ category, noBorder }) => {
  return (
  <CategoryItem>
    <div className={`category-item ${noBorder ? "no-border" : ""}`}>
      <Car />
      <p>{category}</p>
    </div>
  </CategoryItem>
)};

export default ShopCategory;
