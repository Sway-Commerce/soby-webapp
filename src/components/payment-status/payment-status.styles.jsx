import styled from 'styled-components';

export const StatusContainer = styled.div`
  background: #f1f1f1;
  border-radius: 8px;
  width: 600px;
  height: 110px;
  display: flex;
  svg {
    margin: 20px 24px;
  }
  .info {
    .status {
      font-family: Commissioner;
      font-weight: 600;
      font-size: 24px;
      line-height: 29px;
      font-style: normal;
    }
    margin: auto 0;
  }

  @media screen and (max-width: 800px) {
    width: 328px;
    height: 72px;
    svg {
      width: 40px;
      height: 40px;
    }
    .info .status {
      font-size: 16px;
      line-height: 29px;
    }
  }
`;
