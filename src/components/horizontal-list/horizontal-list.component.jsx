import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;

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
      font-family: Work Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 26px;
      color: #000000;
      margin: auto 0;
      flex: 2;
    }

    .amount {
      font-family: Work Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 32px;
      line-height: 38px;
      color: #000000;
      margin: auto 0;
    }
  }

  .tab-status {
    display: flex;
    padding-right: 16px;
    cursor: pointer;
    svg {
      margin: auto 8px auto 0px;
    }
    .status {
      font-family: Work Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 26px;
      color: #000000;
    }

    & + .tab-status {
      padding-left: 16px;
      border-left: 1px rgb(0, 0, 0, 0.25) solid;
    }
  }

  .opacity {
    opacity: 0.25;
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
