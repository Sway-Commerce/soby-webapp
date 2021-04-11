import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 4px 12px;
  background: ${(props) => props.bgColor};
  border-radius: 4px;
  font-size: 20px;
  color: white;
`;


const KybStatus = ({ status = '' }) => {
  const [state, setState] = useState('Approved');
  const [bgColor, setBgColor] = useState("#2b74e4");

  useEffect(() => {
    switch (status) {
      case 'NOT_CONFIRMED': {
        setState('Not Confirmed');
        setBgColor('#F53535');
        break;
      }
      case 'APPROVED':
        setState('Approved');
        setBgColor('##2b74e4');
        break;
      default:
        setState('Not verified');
        setBgColor('#F53535');
    }
  }, [status]);

  return <Container bgColor={bgColor}>{state}</Container>;
};

export default KybStatus;
