import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './spinner.styles';

const Spinner = ({ inner }) =>
  inner ? (
    <SpinnerContainer className="small" />
  ) : (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  );

export default Spinner;
