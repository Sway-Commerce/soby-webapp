import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getColor } from 'shared/constants/shop.constant';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from 'shared/utils/assetsHelper';
import ShopBadge from 'pages/shop-profile/shop-badge.component';
import heedImg from 'shared/assets/heed.svg';
import RankTooltip from 'pages/shop-profile/rank-tooltip.component';

const Item = styled.div`
  display: flex;

  img.avt {
    width: 4rem;
    height: 4rem;
    margin-right: 1.15rem;
    object-fit: cover;
  }
  @media only screen and (max-width: 600px) {
    margin-top: 0;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  .item-info {
    margin-top: 3px;
    display: flex;

    .status {
      color: #4f4f4f;
      font-weight: bold;
      font-size: 14px;
      margin: 0 5.17px 0 8px;
    }

    img.heed {
      justify-content: flex-start;
      width: 11.67px;
      height: 11.67px;
    }
  }
  a {
    max-width: fit-content;
  }
`;

const ShopItem = ({ shop, ...rest }) => {
  const {
    id,
    logoUrl,
    name,
    shopRank: {
      rank: { description, name: rankColor },
      totalPoints,
    },
  } = shop;
  const score = totalPoints / 10;
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  return (
    <>
      <Link to={`shop-profile/${id}`}>
        <div
          className='d-flex flex-row justify-content-center align-items-center rounded p-1'
          style={{ width: '100%', backgroundColor: isMouseEnter && 'rgba(91,204,250,.3)', opacity: '.9' }}
          onMouseEnter={function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            setIsMouseEnter(true);
          }}
          onMouseLeave={function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            setIsMouseEnter(false);
          }}
        >
          <div className='col-2' style={{}}>
            <img src={logoUrl} className='img-thumbnail' alt='' style={{ width: '4rem', height: '4rem' }} />
          </div>
          <div className='col-10 d-flex flex-column' style={{ height: '4rem' }}>
            <div className='d-flex flex-column justify-content-center' style={{ height: '50%' }}>
              <h4 className='fw-bold mb-0' style={{ fontSize: '20px' }}>
                {name}
              </h4>
            </div>
            <div className='d-flex justify-content-start align-items-center' style={{ height: '50%' }}>
              <div
                className='rounded-pill d-flex justify-content-center align-items-center p-0 py-1'
                style={{ backgroundColor: getColor(score), width: '69px' }}
              >
                <div className='d-block p-0' style={{ marginLeft: '-2px', marginTop: '-3px' }}>
                  <SVG
                    className=''
                    src={toAbsoluteUrl('/assets/commons/star.svg')}
                    style={{ width: '16px', height: '16px', fill: 'white' }}
                  ></SVG>
                </div>
                <div style={{ marginTop: '2px' }}>
                  <span className='p-0' style={{ fontSize: '16px', color: 'white', marginLeft: '5px' }}>
                    {score}
                  </span>
                </div>
              </div>
              <div className='ms-2'>
                <span className='fw-bold' style={{ fontSize: '16px', color: getColor(score) }}>
                  {description}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
    // <Item {...rest}>
    //   <Link to={`shop-profile/${id}`}>
    //     <img src={logoUrl} className="avt" alt="" />
    //   </Link>

    //   <ItemInfo>
    //     <Link to={`shop-profile/${id}`}>
    //       <h5 className="body-color truncate">{name}</h5>
    //     </Link>

    //     <div className="item-info">
    //       <ShopBadge point={totalPoints} color={totalPoints} />
    //       <p className="status">{description}</p>
    //       <img
    //         className="heed clickable"
    //         src={heedImg}
    //         alt=""
    //         data-tip
    //         data-for={id}
    //         data-event="click focus"
    //       />
    //       <RankTooltip id={id} key={id} />
    //     </div>
    //   </ItemInfo>
    // </Item>
  );
};

export default ShopItem;
