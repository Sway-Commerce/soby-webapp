import styled from 'styled-components';

export const Box = styled.form`
  width: 700px;
  padding: 48px 40px;
  background-color: #fff;
  border-radius: 8px;

  h2 {
    margin-bottom: 30px;
  }

  @media (max-width: 800px) {
    width: auto;
  }
`;

export const PopupButton = styled.input.attrs((props) => ({
  type: 'submit',
  value: 'Save',
}))`
  width: 100%;
  background-color: #f1f1f1;
  color: #2b74e4;
  font-weight: 700;
  padding: 14px 0 12px;
  border: 0;
  border-radius: 7px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.04);
  cursor: pointer;
`;


export const ErrorTitle = styled.h5`
  color: red;
  margin: 5px 0;
`;