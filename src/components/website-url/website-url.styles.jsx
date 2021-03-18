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
        &.url {
          font-size: 18px;
        }
      }
    }

    svg {
      margin-right: 16px;
      &.temp {
        width: 60px;
        height: 60px;
      }
    }

    .icon-wrapper {
      padding: 15px;
      height: 60px;
      width: 60px;
      margin-right: 16px;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.07);
      border-radius: 8px;
    }
`;
