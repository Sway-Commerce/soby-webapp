import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {mainColor, redColor} from '../../shared/css-variable/variable';

export const Container = styled.div`
  padding: 4px 12px;
  background: ${(props) => props.bgColor};
  border-radius: 4px;
  font-size: 1rem;
  color: white;
`;


const KybStatus = ({ status = '' }) => {
  const [state, setState] = useState('Approved');
  const [bgColor, setBgColor] = useState(mainColor);

  useEffect(() => {
    switch (status) {
      case 'NOT_CONFIRMED': {
        setState('Not Confirmed');
        setBgColor(redColor);
        break;
      }
      case 'APPROVED':
        setState('Approved');
        setBgColor(mainColor);
        break;
      default:
        setState('Not verified');
        setBgColor(redColor);
    }
  }, [status]);

  return <Container bgColor={bgColor}>{state}</Container>;
};

export default KybStatus;
