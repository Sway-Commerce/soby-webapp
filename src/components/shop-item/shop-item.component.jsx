import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
  return (
    <Item {...rest}>
      <Link to={`shop-profile/${id}`}>
        <img src={logoUrl} className="avt" alt="" />
      </Link>

      <ItemInfo>
        <Link to={`shop-profile/${id}`}>
          <h5 className="body-color truncate">{name}</h5>
        </Link>

        <div className="item-info">
          <ShopBadge point={totalPoints} color={rankColor} />
          <p className="status">{description}</p>
          <img
            className="heed clickable"
            src={heedImg}
            alt=""
            data-tip
            data-for={id}
            data-event="click focus"
          />
          <RankTooltip id={id} key={id} />
        </div>
      </ItemInfo>
    </Item>
  );
};

export default ShopItem;
