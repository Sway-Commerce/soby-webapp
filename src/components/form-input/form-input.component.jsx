import React from 'react';

import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel,
  FormTitle,
} from './form-input.styles';

const FormInput = ({ handleChange, placeholder, label, withoutTitle, ...props }) => (
  <>
    {withoutTitle ? null : <FormTitle>{label}</FormTitle>}
    <GroupContainer>
      <FormInputContainer onChange={handleChange} {...props} />
      {placeholder ? (
        <FormInputLabel className={props.value.length ? 'shrink' : ''}>
          {placeholder}
        </FormInputLabel>
      ) : null}
    </GroupContainer>
  </>
);

export default FormInput;
