import React from 'react';

import { KybStatus } from './kyb-status.styles';

const KypStatus = ({ status }) => <KybStatus>{status || 'APPROVED'}</KybStatus>;

export default KypStatus;
