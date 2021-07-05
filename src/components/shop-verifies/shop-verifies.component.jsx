import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import tickImg from 'shared/assets/tick.svg';
import KybImg from 'shared/assets/id-1.svg';
import KycImg from 'shared/assets/id-2.svg';
import ShopeeIcon from 'shared/assets/shopee.svg';
import NetworkIcon from 'shared/assets/network.svg';
import TikiIcon from 'shared/assets/tiki-icon.svg';
import LazadaIcon from 'shared/assets/lazada-icon.svg';
import ZaloIcon from 'shared/assets/zalo-icon.svg';
import TiktokIcon from 'shared/assets/tiktok-icon.svg';
import InstagramIcon from 'shared/assets/instagram-icon.svg';
import FacebookIcon from 'shared/assets/facebook.svg';

const Container = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Icon = styled(Link)`
  width: 2rem;
  height: 2rem;
  background: #f2f2f2;
  border-radius: 0.15rem;
  padding: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  pointer-events: ${(props) => props.default && 'none'};
  img.tick {
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const ShopVerifies = ({ status, kycStatus, shopUrls, ...rest }) => {
  return (
    <Container {...rest}>
      <Icon default to="#">
        {status === 'APPROVED' && <img className="tick" src={tickImg} alt="" />}
        <img className="id1" src={KybImg} alt="" />
      </Icon>
      <Icon default to="#">
        {kycStatus && kycStatus !== 'NOT_CONFIRMED' && (
          <img className="tick" src={tickImg} alt="" />
        )}
        <img className="id2" src={KycImg} alt="" />
      </Icon>

      {shopUrls.map((x) => {
        let imgPath = '';
        switch (x.type) {
          case 'FACEBOOK':
            imgPath = FacebookIcon;
            break;
          case 'INSTAGRAM':
            imgPath = InstagramIcon;
            break;
          case 'TIKTOK':
            imgPath = TiktokIcon;
            break;
          case 'ZALO':
            imgPath = ZaloIcon;
            break;
          case 'SHOPEE':
            imgPath = ShopeeIcon;
            break;
          case 'LAZADA':
            imgPath = LazadaIcon;
            break;
          case 'TIKI':
            imgPath = TikiIcon;
            break;
          default:
            imgPath = NetworkIcon;
            break;
        }
        return (
          <Icon to={{ pathname: x.url }} key={x.url} target="_blank">
            {x.verified && <img className="tick" src={tickImg} alt="" />}
            <img src={imgPath} alt="" />
          </Icon>
        );
      })}
    </Container>
  );
};

export default ShopVerifies;
