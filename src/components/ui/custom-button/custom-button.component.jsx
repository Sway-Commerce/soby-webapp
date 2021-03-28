import React from 'react';

import { CustomButtonContainer, ButtonWithIcon } from './custom-button.styles';

export const CustomButton = ({ children, withIcon, ...props }) =>
withIcon ? (
    <ButtonWithIcon {...props}>{children}</ButtonWithIcon>
  ) : (
    <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
  );

export default CustomButton;
