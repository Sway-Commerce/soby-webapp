import React from 'react';

import { ReactComponent as Cart } from '../../assets/category-cart.svg';
import { ReactComponent as Car } from '../../assets/category-car.svg';
import { CategoryItem } from './shop-category.styles';

const ShopCategory = ({ category }) => (
  <CategoryItem>
    <div className="category-item">
      <Car />
      <p>{category}</p>
    </div>
  </CategoryItem>
);

export default ShopCategory;
