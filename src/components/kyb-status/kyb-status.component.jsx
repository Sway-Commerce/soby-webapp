import React, { useEffect, useState } from 'react';

import { Container } from './kyb-status.styles';

const KybStatus = ({ status = '' }) => {
  const [state, setState] = useState('Approved');
  useEffect(() => {
    switch (status) {
      case 'NOT_CONFIRMED':
        setState('Not Confirmed');
        break;
      case 'APPROVED':
        setState('Approved');
        break;
      default:
        setState('Approved');
    }
  }, [status]);

  return <Container>{state}</Container>;
};

export default KybStatus;
