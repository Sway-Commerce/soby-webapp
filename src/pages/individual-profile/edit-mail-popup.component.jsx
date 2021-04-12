import { useMutation } from '@apollo/client';
import Spinner from 'components/ui/spinner/spinner.component';
import { UPDATE_EMAIL } from 'graphQL/repository/individual.repository';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Box = styled.form`
  width: 700px;
  padding: 48px 40px;
  background-color: #fff;
  border-radius: 8px;

  h2 {
    margin-bottom: 30px;
  }

  @media (max-width: 700px) {
    width: auto;
  }
`;

const Button = styled.input.attrs((props) => ({
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

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const Input = styled.input.attrs((props) => ({
  type: 'email',
}))`
  width: 100%;
  padding: 8px 0;
  outline: 0;
  border: 0;
  border-radius: 0;
  border-bottom: 0.5px solid #c2c2c2;
  font-size: 18px;
`;

const EmailPopup = ({ setOpenEditMailPopup, email }) => {
  // UPDATE_EMAIL
  const [
    updateEmailMutation,
    { data: updateEmailData, loading: updateEmailLoading },
  ] = useMutation(UPDATE_EMAIL);
  useEffect(() => {
    if (updateEmailData?.updateEmail?.data) {
    }
  }, [updateEmailData?.updateEmail?.data, updateEmailMutation]);

  return updateEmailLoading ? (
    <Spinner />
  ) : (
    <Box>
      <h2>Edit Email</h2>
      <InputContainer>
        <span>Your current email</span>
        <Input value={email} />
      </InputContainer>

      <InputContainer>
        <span>New email</span>
        <Input placeholder="your-new@email.com" />
      </InputContainer>

      <Button />
    </Box>
  );
};

export default EmailPopup;
