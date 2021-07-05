import styled from 'styled-components';
import { borderColor, mainColor, subColor } from 'shared/css-variable/variable';

export const GroupContainer = styled.div`
  position: relative;

  input[type='password'] {
    letter-spacing: 0.3rem;
  }

  svg {
    position: absolute;
    right: 0;
    top: 10px;
    cursor: pointer;
  }
`;

export const FormInputContainer = styled.input`
  background: none;
  background-color: white;
  color: black;
  font-size: 0.9rem;
  padding: 8px 10px 6px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: ${(props) =>
    props.withoutBorder ? 'none' : `1px solid ${borderColor}`};
  pointer-events: ${(props) => (props.disabled ? 'none' : `all`)};

  margin-top: -6px;

  &:focus {
    outline: none;
    border-bottom: ${(props) =>
      props.withoutBorder ? 'none' : `1px solid ${mainColor}`};
  }

  &:focus ~ label {
    display: none;
  }

  &:active ~ label {
    display: none;
  }

`;

FormInputContainer.displayName = 'FormInputContainer';

export const FormInputLabel = styled.label`
  color: rgba(79, 79, 79, 0.5);
  font-size: 0.8rem;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  top: 0.4rem;
  transition: 300ms ease all;

  &.shrink {
    display: none;
  }
`;

FormInputLabel.displayName = 'FormInputLabel';

export const FormTitle = styled.label`
  font-style: normal;
  font-weight: bold;
  font-size: 0.8rem;
  line-height: 1.2rem;
  text-transform: capitalize;
`;
