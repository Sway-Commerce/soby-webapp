import styled from 'styled-components';
import { mainColor } from 'shared/css-variable/variable';

export const PolicyText = styled.div`
  font-style: normal;
  font-size: 11px;
  font-weight: 400;
  line-height: 20px;
  color: black;
  text-align: center;
  margin-top: 8px;
  span {
    font-weight: 600;
    color: ${mainColor};
  }
`;

export const InfoText = styled.div`
  font-style: normal;
  font-size: 0.6rem;
  font-weight: 400;
  line-height: 15px;
  color: black;
  text-align: center;
  span {
    font-weight: 600;
  }
`;