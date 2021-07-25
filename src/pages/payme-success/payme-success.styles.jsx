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

  div.back-btn {
    font-size: 22px;
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
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 40px;
  .soby-title {
    color: black;
    text-align: center;
    font-size: 2rem;
    line-height: 49px;
    margin-bottom: 50px;
  }

  .photo {
    height: 200px;
    width: 200px;
  }

  @media screen and (max-width: 800px) {
    .soby-title {
      font-size: 1rem;
      line-height: 24px;
    }
  }
`;
