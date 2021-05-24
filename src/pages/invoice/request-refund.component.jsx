import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';

import { REQUEST_INVOICE_REFUND } from 'graphQL/repository/invoice.repository';
import React, { useEffect, useState } from 'react';
import usePhoneNumber from 'shared/hooks/usePhoneNumber';

import { ReactComponent as EditWhiteIcon } from 'shared/assets/edit-white.svg';
import { PopupButton } from 'pages/individual-profile/shared-style.component';
import { mainColor } from 'shared/css-variable/variable';


export const Box = styled.form`
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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 700px) {
    flex-direction: column;
    margin-bottom: 0;
  }
`;


const InputContainer = styled.div`
  width: ${(props) => props.width || '100%'};

  @media (max-width: 700px) {
    width: 100%;
    margin-bottom: 30px;
  }
`;

const Input = styled.input.attrs((props) => ({
  type: 'text',
}))`
  width: 100%;
  padding: 8px 0;
  outline: 0;
  border: 0;
  border-radius: 0;
  border-bottom: 0.5px solid #c2c2c2;
  font-size: 0.9rem;
`;

const AvatarBox = styled.div`
  position: relative;
  height: 100px;
  width: 100px;

  @media (max-width: 700px) {
    margin-bottom: 20px;
  }
`;

const Avatar = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 8px;
`;

const EditIcon = styled.div`
  label {
    position: absolute;
    bottom: -8px;
    right: -15px;
    cursor: pointer;
    border-radius: 50%;
    background-color: ${mainColor};
    border: 2.5px solid #fff;
    color: #fff;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }
`;

const RequestRefund = ({ invoiceIndividualId }) => {
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [phoneNumberIntl, setPhoneNumberIntl] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [picture, setPicture] = useState({
    picturePreview: '',
    pictureAsFile: null,
  });
  const [requestRefundInfo, setRequestRefundInfo] =useState ({
    id: invoiceIndividualId,
    reason: '',
    description: '',
    imageUrls: '',
    requiredAdmin: false,
  });

  const { phoneCountryCode, phoneNumber } = usePhoneNumber(phoneNumberIntl);

  const {
    id,
    reason,
    description,
    imageUrls,
    requiredAdmin,
  } = requestRefundInfo;

  // REQUEST_INVOICE_REFUND
  const [
    requestInvoiceRefund,
    {
      data: requestInvoiceRefundData,
      loading: requestInvoiceRefundLoading,
      error: requestInvoiceRefundError,
    },
  ] = useMutation(REQUEST_INVOICE_REFUND, {
    errorPolicy: 'all',
    variables: {
      cmd: {
        id,
        phoneCountryCode,
        phoneNumber,
        reason,
        description,
        imageUrls,
        requiredAdmin,
      },
    },
  });

  useEffect(() => {
    if (requestInvoiceRefundData?.requestInvoiceRefund?.success) {
    }
  }, [requestInvoiceRefundData?.requestInvoiceRefund?.success]);

  // Handle Error
  useEffect(() => {
    if (requestInvoiceRefundError?.message) {
      setFormError(requestInvoiceRefundError?.message);
      setOpen(true);
    }
  }, [requestInvoiceRefundError?.message]);

  const uploadPicture = (e) => {
    setPicture({
      picturePreview: URL.createObjectURL(e.target.files[0]),
      pictureAsFile: e.target.files[0],
    });
  };

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const { name, value } = event?.target;

    setRequestRefundInfo({ ...requestRefundInfo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return requestInvoiceRefundLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
    <Box onSubmit={handleSubmit}>
    <Row>
      <AvatarBox>
        <Avatar src={picture.picturePreview} />
        <EditIcon>
          <label for="upload-photo">
            <EditWhiteIcon />
          </label>
          <input
            type="file"
            name="photo"
            id="upload-photo"
            onChange={uploadPicture}
          />
        </EditIcon>
      </AvatarBox>

    </Row>
    <PopupButton />
  </Box>
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default RequestRefund;
