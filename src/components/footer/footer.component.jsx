import React from 'react';
import styled from 'styled-components';
import { stokeColor, borderColor } from '../../shared/css-variable/variable';
import { Link } from 'react-router-dom';

const Container = styled.footer`
  background-color: ${borderColor};
  padding: 42px 0 40px;
  p {
    text-align: center;
    font-size: 0.7rem;
    color: ${stokeColor};
  }

  @media screen and (max-width: 768px) {
    padding: 0 24px 24px;
    p {
      line-height: 14px;
    }
  }
`;

const MainNavigate = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 32px;
  a + a {
    border-left: 1px solid ${stokeColor};
  }

  a {
    padding: 0 40px;
    font-size: 0.7rem;
    color: ${stokeColor};
  }

  @media screen and (max-width: 768px) {
    padding: 24px;
    column-gap: 40px;
    row-gap: 4px;
    margin-bottom: 24px;
    border-bottom: 1px solid #c2c2c2;
    a {
      padding: 0;
      line-height: 20px;
      & + a {
        border-left: none;
      }
    }
  }
`;

const FooterSection = () => {
  return (
    <Container>
      <MainNavigate>
        <Link
          to={{
            pathname: 'https://soby.vn/dieu-khoan-hoat-dong/quy-che-hoat-dong/',
          }}
          target="_blank"
        >
          Quy chế hoạt động
        </Link>
        <Link
          to={{
            pathname:
              'https://soby.vn/dieu-khoan-hoat-dong/chinh-sach-bao-mat-thong-tin/',
          }}
          target="_blank"
        >
          Chính sách bảo mật
        </Link>
        <Link
          to={{
            pathname:
              'https://soby.vn/dieu-khoan-hoat-dong/chinh-sach-bao-mat-thanh-toan/',
          }}
          target="_blank"
        >
          Chính sách thanh toán
        </Link>
        <Link
          to={{
            pathname:
              'https://soby.vn/dieu-khoan-hoat-dong/chinh-sach-doi-tra/',
          }}
          target="_blank"
        >
          Chính sách đổi trả
        </Link>
        <Link
          to={{
            pathname:
              'https://soby.vn/dieu-khoan-hoat-dong/chinh-sach-van-chuyen/',
          }}
          target="_blank"
        >
          Chính sách vận chuyển
        </Link>
      </MainNavigate>
      <p>
        Mã số doanh nghiệp: 0316559066 do Sở Kế Hoạch và Đầu Tư TPHCM cấp ngày
        27/10/2020
      </p>
      <p>
        S206, Tầng 2, CirCo Coworking Space, H3 Building, 384 Hoàng Diệu, Phường
        6, Quận 4, Thành phố Hồ Chí Minh
      </p>
      <p>Hotline: 039 603 5950 -- Email: admin@soby.vn</p>
    </Container>
  );
};

export default FooterSection;
