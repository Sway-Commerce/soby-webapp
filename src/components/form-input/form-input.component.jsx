import React from 'react';

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
  ...props
}) => (
  <div>
    {!withoutTitle && <FormTitle>{label}</FormTitle>}
    <GroupContainer>
      <FormInputContainer
        withoutBorder={withoutBorder}
        onChange={handleChange}
        {...props}
      />
      {placeholder ? (
        <FormInputLabel
          className={`${props.value?.length ? 'shrink' : ''} truncate`}
        >
          {placeholder}
        </FormInputLabel>
      ) : null}
    </GroupContainer>
  </div>
);

export default FormInput;
