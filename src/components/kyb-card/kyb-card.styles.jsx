import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid rgba(194, 194, 194, 0.2);
  width: 364px;
  margin-bottom: 32px;
  padding: 24px;
  height: 82px;
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  h4 {
    margin: 0;
  }

  &.product-view {
    width: 360px;
  }
`;
