import React from 'react';
import styled from 'styled-components';
import {mainColor} from '../../shared/css-variable/variable';

export const Container = styled.div`
  margin: auto;
  padding: 20px 4px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(106px, 158px));

  .tab-wrapper + .tab-wrapper {
    margin-left: 24px;
  }

  .tab-wrapper {
    width: 185px;
    height: 60px;
    background: #f1f1f1;
    border-radius: 8px;
    display: flex;
    padding: 0 16px;
    cursor: pointer;
    svg {
      height: 20px;
      margin: auto 4px auto 0px;
    }

    .order {
      font-style: normal;
      font-weight: normal;
      font-size: 0.8rem;
      line-height: 26px;
      color: #000000;
      margin: auto 0;
      flex: 2;
    }

    .amount {
      font-style: normal;
      font-weight: normal;
      font-size: 1.6rem;
      line-height: 38px;
      color: #000000;
      margin: auto 0;
    }
  }

  .tab-status {
    display: flex;
    cursor: pointer;
    height: 40px;
    align-items: center;
    justify-content: center;
    width: 160px;
    svg {
      margin: auto 8px auto 0px;
    }
    .status {
      font-family: Work Sans;
      font-style: normal;
      font-weight: normal;
      line-height: 26px;
      color: #000000;
    }

  }

  .active {
    background-color: ${mainColor};
    p.status {
      color: white;
    }
  }
`;

const HorizontalList = ({ items, renderItem }) => {
  return (
    <Container>
      {items.map((item, index) => (
        <React.Fragment key={item + index}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </Container>
  );
};

export default HorizontalList;
