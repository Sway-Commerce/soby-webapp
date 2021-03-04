import styled from 'styled-components';

export const HomePageContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 101px 240px;
`;

export const ImageContainer = styled.div`
  display: flex;
  img + img {
    margin-left: 24px;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

export const Card = styled.div`
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  padding: 16px;
  width: 586px;
  height: 797px;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;
