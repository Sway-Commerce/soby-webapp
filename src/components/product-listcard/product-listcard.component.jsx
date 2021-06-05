import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { currencyFormatter } from 'shared/utils/formatCurrency';
import { bodyColor } from 'shared/css-variable/variable';

const ProductContainer = styled.div`
  display: grid;
  grid-gap: 0.8rem;
  flex-wrap: wrap;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const NewProductBox = styled(Link)`
  display: flex;
  img {
    width: 80px;
    height: 80px;
    margin-right: 14px;
    object-fit: cover;
  }

  p {
    -webkit-line-clamp: 2;
    flex: 1;
    color: ${bodyColor};
  }
`;

const ProductListCard = ({ records = [] }) => {
  return (
    <React.Fragment>
      <ProductContainer>
        {records.map((x) => {
          const {
            imageUrls: [imageUrl],
            name,
            skus: [sku],
            id,
          } = x;
          const originPrice = sku?.originPrice || 0;
          return (
            <NewProductBox key={id} to={`/product/${id}`}>
              <img src={imageUrl} alt="" />
              <div>
                <p className="body-color truncate" data-tip={name}>
                  {name}
                </p>
                <ReactTooltip place="top" effect="solid" />
                <h5>{currencyFormatter(originPrice)}</h5>
              </div>
            </NewProductBox>
          );
        })}
      </ProductContainer>
    </React.Fragment>
  );
};

export default ProductListCard;
