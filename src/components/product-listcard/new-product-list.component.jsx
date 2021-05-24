import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { currencyFormatter } from 'shared/utils/formatCurrency';

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: 0.8rem;
  @media screen and (max-width: 600px) {
    justify-content: center;
  }
`;

const NewProductBox = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  img {
    width: 172px;
    height: 172px;
    margin-bottom: 14px;
  }

  p {
    -webkit-line-clamp: 3;
    width: 172px;
  }
`;

const NewProductList = ({ records = [] }) => {
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
          const { originPrice } = sku;
          return (
            <NewProductBox key={id} to={`/product/${id}`}>
              <img src={imageUrl} alt="" />
              <p className="body-color truncate" data-tip={name}>
                {name}
              </p>
              <h5>{currencyFormatter(originPrice)}</h5>
            </NewProductBox>
          );
        })}
      </ProductContainer>
      <ReactTooltip place="top" effect="solid"/>
    </React.Fragment>
  );
};

export default NewProductList;