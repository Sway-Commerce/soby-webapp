import styled from 'styled-components';
import { mainColor } from '../../css-variable/variable';

export const Container = styled.div`
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.07);
  border: 1px solid rgba(194, 194, 194, 0.5);
  border-radius: 8px;
  transition: 0.3s;
  width: 453px;
  height: 154px;
  display: flex;
  margin: 0 40px 32px 0;
  .info {
    margin: auto 0 auto 16px;
    .title {
      color: ${mainColor};
      line-height: 0;
    }
    .rank {
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 26px;
      margin: 0;
    }
  }

  img {
    width: 100px;
    height: 100px;
    margin: auto 0 auto 40px;
  }

  &.product-view {
    width: 360px;
    background: rgba(241, 241, 241, 1);
    border: none;
    box-shadow: none;
  }
`;
