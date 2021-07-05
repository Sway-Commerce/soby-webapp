import React, { useState } from 'react';
import { ReactComponent as PasswordEye } from 'shared/assets/password-eye.svg';

import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel,
  FormTitle,
} from './form-input.styles';

const FormInput = ({
  handleChange,
  placeholder,
  label,
  withoutTitle,
  withoutBorder,
  type,
  ...props
}) => {
  const [isHide, setIsHide] = useState(true);
  return (
    <div>
      {!withoutTitle && <FormTitle>{label}</FormTitle>}
      <GroupContainer>
        {type === 'password' ? (
          <FormInputContainer
            withoutBorder={withoutBorder}
            onChange={handleChange}
            {...props}
            type={isHide ? 'password' : 'text'}
          />
        ) : (
          <FormInputContainer
            withoutBorder={withoutBorder}
            onChange={handleChange}
            {...props}
          />
        )}

        {placeholder ? (
          <FormInputLabel
            className={`${props.value?.length ? 'shrink' : ''} truncate`}
          >
            {placeholder}
          </FormInputLabel>
        ) : null}
        {type === 'password' ? (
          <PasswordEye onClick={() => setIsHide(!isHide)} />
        ) : null}
      </GroupContainer>
    </div>
  );
};

export default FormInput;
