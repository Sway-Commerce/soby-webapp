import styled from 'styled-components';
import { mainColor, stokeColor } from 'shared/css-variable/variable';

export const PolicyText = styled.div`
  font-style: normal;
  font-size: 0.6rem;
  font-weight: 400;
  line-height: 0.9rem;
  color: ${stokeColor};
  text-align: center;
  margin-top: 8px;
  span {
    color: ${mainColor};
  }
`;

export const InfoText = styled.div`
  font-style: normal;
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 15px;
  color: black;
  text-align: center;
  span {
    font-weight: bold;
    color: ${mainColor};
  }
`;