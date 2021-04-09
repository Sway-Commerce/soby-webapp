import styled from 'styled-components';

export const Container = styled.div`
  .content-bottom {
    display: grid;
    grid-column-gap: 40px;
    grid-template-columns: repeat(4, 1fr);
    overflow: auto;

    .card {
      height: auto;
      width: 170px;
    }
  }
`;
