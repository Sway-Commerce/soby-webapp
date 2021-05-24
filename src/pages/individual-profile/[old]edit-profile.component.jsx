import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';

import { ReactComponent as EditWhiteIcon } from 'shared/assets/edit-white.svg';

import { UPDATE_INDIVIDUAL } from 'graphQL/repository/individual.repository';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import Spinner from 'components/ui/spinner/spinner.component';

import { setNameAndImage } from 'redux/user/user.actions';
import { Box, PopupButton } from './shared-style.component';
import { mainColor } from 'shared/css-variable/variable';

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

const NamePopup = ({
  firstName,
  lastName,
  middleName,
  accessToken,
  dob,
  postalCode,
  country,
  province,
  city,
  addressLine,
  nationality,
  imageUrl,
  setOpenNamePopup,
}) => {
  const [state, setstate] = useState({
    firstName,
    lastName,
    middleName,
    dob,
    postalCode,
    country,
    province,
    city,
    addressLine,
    nationality,
    imageUrl,
  });
  const [picture, setPicture] = useState({
    picturePreview: imageUrl,
    pictureAsFile: null,
  });
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const dispatch = useDispatch();
  const dispatchSetNameAndImage = (payload) => dispatch(setNameAndImage(payload));

  // UPDATE_INDIVIDUAL
  const [
    updateIndividual,
    {
      data: updateIndividualData,
      loading: updateIndividualLoading,
      error: updateIndividualError,
    },
  ] = useMutation(UPDATE_INDIVIDUAL);
  useEffect(() => {
    if (updateIndividualData?.updateIndividual?.data) {
      setOpenNamePopup(false);
    }
  }, [updateIndividualData?.updateIndividual?.data, updateIndividual]);

  useEffect(() => {
    if (updateIndividualError?.message) {
      setFormError(updateIndividualError?.message);
      setOpen(true);
    }
  }, [updateIndividualError?.message]);

  const uploadPicture = (e) => {
    setPicture({
      picturePreview: URL.createObjectURL(e.target.files[0]),
      pictureAsFile: e.target.files[0],
    });
  };

  const setImageAction = async () => {
    const formData = new FormData();
    formData.append('files', picture.pictureAsFile);

    const data = await fetch('https://api-dev.soby.vn/individuals/images', {
      method: 'POST',
      headers: {
        Category: 'AVATAR',
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
      body: formData,
    });
    const uploadedImage = await data.json();

    if (uploadedImage?.data) {
      const { data } = uploadedImage;
      const [imageUrl] = data?.urls;

      dispatchSetNameAndImage({
        imageUrl,
        firstName: state.firstName,
        lastName: state.lastName,
        middleName: state.middleName,
      });

      updateIndividual({
        variables: {
          cmd: {
            firstName: state.firstName,
            lastName: state.lastName,
            middleName: state.middleName,
            imageUrl,
            dob: state.dob,
            postalCode: state.postalCode,
            country: state.country,
            province: state.province,
            city: state.city,
            addressLine: state.addressLine,
            nationality: state.nationality,
          },
        },
      });
    } else {
      setFormError('You need to login again!!!');
      setOpen(true);
    }
  };

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const { name, value } = event?.target;

    setstate({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event) {
      return;
    }

    if (picture?.pictureAsFile) {
      setImageAction();
    } else {
      submitData();
    }
  };

  const submitData = () => {
    dispatchSetNameAndImage({
      imageUrl,
      firstName: state.firstName,
      lastName: state.lastName,
      middleName: state.middleName,
    });

    updateIndividual({
      variables: {
        cmd: {
          firstName: state.firstName,
          lastName: state.lastName,
          middleName: state.middleName,
          imageUrl,
          dob: state.dob,
          postalCode: state.postalCode,
          country: state.country,
          province: state.province,
          city: state.city,
          addressLine: state.addressLine,
          nationality: state.nationality,
        },
      },
    });
  };

  return updateIndividualLoading ? (
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
          <InputContainer width="80%">
            <span>First name</span>
            <Input
              value={state.firstName}
              name="firstName"
              onChange={handleChange}
            />
          </InputContainer>
        </Row>

        <Row>
          <InputContainer width="48%">
            <span>Middle name</span>
            <Input
              value={state.middleName}
              name="middleName"
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer width="48%">
            <span>Last name</span>
            <Input
              value={state.lastName}
              name="lastName"
              onChange={handleChange}
            />
          </InputContainer>
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

export default NamePopup;
