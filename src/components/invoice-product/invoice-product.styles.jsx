import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  font-size: 16px;
  margin-bottom: 16px;
  width: 413px;
  *,
  .fs-16 {
    font-size: 16px;
    span {
      font-size: 14px;
    }
  }

  img {
    height: 50px;
    width: 50px;
    border-radius: 4px;
    background-color: #c4c4c4;
  }

  .info {
    margin: auto 0 auto 24px;
    flex: 2;
  }

  p {
    text-align: left;
  }
`;
