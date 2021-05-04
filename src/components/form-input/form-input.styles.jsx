import styled from 'styled-components';
import { borderColor, mainColor, subColor } from 'shared/css-variable/variable';

export const GroupContainer = styled.div`
  position: relative;

  input[type='password'] {
    letter-spacing: 0.3rem;
  }
`;

export const FormInputContainer = styled.input`
  background: none;
  background-color: white;
  color: black;
  font-size: 0.9rem;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${borderColor};

  &:focus {
    outline: none;
    border-bottom: 1px solid ${mainColor};
  }

  &:focus ~ label {
    display:none;
  }

  &:active ~ label {
    display:none;
  }
`;

FormInputContainer.displayName = 'FormInputContainer';

export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 0.8rem;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  &.shrink {
    display:none;
  }
`;

FormInputLabel.displayName = 'FormInputLabel';
