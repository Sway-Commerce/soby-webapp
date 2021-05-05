import styled from 'styled-components';

export const WebsiteGroup = styled.div`
  .wrapper {
    display: flex;
    justify-content: space-between;
    .sub-wrapper {
      display: flex;
    }
    p {
      margin: auto 0;
      font-size: 0.8rem;
      &.url {
        font-size: 0.7rem;
        max-width: 162px;
        cursor: pointer;
      }
    }
  }

  svg {
    margin-right: 16px;
    &.temp {
      width: 50px;
      height: 50px;
    }
  }

  .icon-wrapper {
    padding: 15px;
    height: 50px;
    width: 50px;
    margin-right: 16px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    svg {
      width: 25px;
      height: 25px;
    }
  }
`;
