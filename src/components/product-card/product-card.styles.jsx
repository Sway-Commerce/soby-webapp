import styled from 'styled-components';

export const Container = styled.div`
  .card {
    height: auto;
    width: 250px;
    margin-right: 35px;

    .main-image {
      width: 250px;
      height: 250px;
    }

    .container-image {
      display: flex;
      margin-top: 12px;

      .small-image,
      div {
        margin-right: 5px;
        height: 50px;
        width: 50px;
      }
      div {
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }

    .card-infor {
      .h3 {
        margin-top: 14px;
        margin-bottom: 7px;
      }
    }
  }
`;