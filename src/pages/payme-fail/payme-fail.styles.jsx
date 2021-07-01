import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 40px 0;
  a {
    display: flex;
    div.back-btn {
      margin: auto;
      margin-top: 85px;
    }
  }

  div.mobile-back {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    span {
      cursor: pointer;
    }
  }
`;

export const CardWrapper = styled.div`
  transition: 0.3s;
  padding: 100px 50px;
  width: 700px;
  height: 735px;
  height: auto;
  margin: auto;
  border-radius: 3px;

  @media screen and (max-width: 800px) {
    font-size: 0.7rem;
    width: 376px;
    min-height: 393px;
    padding: 48px 24px;
  }
`;

export const TransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  .soby-title {
    color: black;
    text-align: center;
    font-size: 2rem;
    line-height: 49px;
  }

  @media screen and (max-width: 800px) {
    .soby-title {
      font-size: 1rem;
      line-height: 24px;
    }
  }
`;
