import styled from 'styled-components';

export const Container = styled.div`
  .content-bottom {
    margin-top: 40px;
    display: grid;
    grid-column-gap: 40px;
    grid-template-columns: repeat(4, 1fr);
    overflow: hidden;
    overflow-y: scroll;

    .card {
      height: auto;
      width: 207px;
    }
  }
`;
