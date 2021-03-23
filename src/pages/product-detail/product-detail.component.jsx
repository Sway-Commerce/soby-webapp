import React from 'react';
import { connect } from 'react-redux';

import { Container } from './product-detail.styles';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT } from '../../graphQL/repository/product.repository';
import Spinner from '../../components/spinner/spinner.component';
import ProductCard from '../../components/product-card/product-card.component';
import { currencyFormatter } from '../../utils/formatCurrency';

const ProductDetail = ({}) => {
  const { productId } = useParams();

  const { loading, error, data: productData } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
  });

  if (loading) return <Spinner />;
  if (error) return `Error! ${error}`;

  const { data } = productData?.getProduct || { data: {} };
  let sku = {};
  const { skus, id, imageUrls, description, name } = data;

  if (skus.length) {
    sku = skus[skus.length - 1];
  }

  console.log(productData);

  return (
    <Container>
      <div className="content-top">
        <div className="box-left">
          <ProductCard
            id={id}
            imageUrls={imageUrls}
            currentPrice={sku.currentPrice}
            description={description}
          />
        </div>

        <div className="box-right">
          <div className="tag"></div>
          <div className="h2">{name}</div>
          <div className="h1">{currencyFormatter(sku.currentPrice)}</div>
          <p>{description}</p>
          <div className="h3">Colours</div>
          <div className="options">
            <button>Yellow</button>
            <button>White</button>
          </div>
          <div className="h3">Size</div>
          <div className="options">
            <button>xS</button>
            <button>S</button>
            <button>M</button>
            <button>L</button>
            <button>XL</button>
          </div>

          <div className="h3">Show Categories</div>
          <div className="options">
            <div className="row">
              <div className="icon">🛒</div>
              <p>Category #1</p>
            </div>
            <div className="row">
              <div className="icon">🚙</div>
              <p>Start Category #1</p>
            </div>
          </div>
        </div>
      </div>

      <div className="content-bottom">
        <div className="card">
          <img src="./item.jpg" alt="" className="main-image" />

          <div className="container-image">
            <img src="./item.jpg" alt="" className="small-image" />
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="card-infor">
            <div className="h3">1,120,000 vnd</div>
            <p>Lorem ipsum dolor sit amet dwqd dwqdhkj.</p>
          </div>
        </div>

        <div className="card-2">
          <img src="./item2.jpg" alt="" className="main-image" />

          <div className="card-infor">
            <div className="h3">1,120,000 vnd</div>
            <p>Lorem ipsum dolor sit amet Lorem, ipsum dolor..</p>
          </div>
        </div>

        <div className="card">
          <img src="./item.jpg" alt="" className="main-image" />

          <div className="container-image">
            <img src="./item.jpg" alt="" className="small-image" />
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="card-infor">
            <div className="h3">1,120,000 vnd</div>
            <p>Lorem ipsum dolor sit amet dwqd dwqdhkj.</p>
          </div>
        </div>

        <div className="card-2">
          <img src="./item2.jpg" alt="" className="main-image" />

          <div className="card-infor">
            <div className="h3">1,120,000 vnd</div>
            <p>Lorem ipsum dolor sit amet Lorem, ipsum dolor..</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(null, mapDispatchToProps)(ProductDetail);
