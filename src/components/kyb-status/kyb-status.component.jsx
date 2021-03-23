import React from 'react';

import { Container } from './kyb-status.styles';

const KybStatus = ({ status }) => <Container>{status || 'APPROVED'}</Container>;

export default KybStatus;
