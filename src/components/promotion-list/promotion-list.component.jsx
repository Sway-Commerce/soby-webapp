import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PromotionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(172px, 172px));
  grid-gap: 1.2rem;
  margin-top: 0.8rem;
  justify-content: center;
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
`;

const PromotionBox = styled.div`
  display: flex;
  img {
    width: 5.4rem;
    height: 5.4rem;
    margin-right: 1.15rem;
  }
`;

const Date = styled.p`
  font-size: 0.7rem;
  color: #f53535;
  font-weight: 700;
`;

const PromotionList = ({ records = [] }) => {
  return (
    <PromotionContainer>
      <PromotionBox>
        <img alt="" />
        <div>
          <p className="body-color">
            Amazfit GTS 2e Smartwatch with 24H Heart Rate Monitor, Sleep, Stress
            and SpO2...
          </p>
          <h5>8.220.000 đ</h5>
          <Date>Offer end in - 3 days</Date>
        </div>
      </PromotionBox>
    </PromotionContainer>
  );
};

export default PromotionList;
