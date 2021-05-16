import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';

import { ReactComponent as AddImgIcon } from 'shared/assets/add-img.svg';

import { UPDATE_INDIVIDUAL } from 'graphQL/repository/individual.repository';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import Spinner from 'components/ui/spinner/spinner.component';
import { Page, Avatar } from './individual-profile.component';

import { setNameAndImage } from 'redux/user/user.actions';
import FormInput from 'components/form-input/form-input.component';
import SharedBreadcrumb from 'components/shared-breadcrumb/shared-breadcrumb.component';

const AvatarBox = styled.div`
  position: relative;
  height: 4rem;
  width: 4rem;
`;

const EditIcon = styled.div`
  label {
    position: absolute;
    bottom: -20px;
    right: -20px;
    cursor: pointer;
    border-radius: 50%;
    border: 2.5px solid #fff;
    color: #fff;
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

const InputBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18.4rem, 1fr));
  grid-gap: 1.2rem;
  margin-top: 32px;
  align-items: center;
  @media (max-width: 768px) {
    align-items: flex-start;

    &.column {
      flex-direction: column;
    }
  }
`;

const EditProfile = () => {
  const {
    postalCode,
    lastName,
    middleName,
    dob,
    nationality,
    addressLine,
    city,
    province,
    country,
    firstName,
    imageUrl,
    accessToken,
  } = useSelector((state) => {
    return state.user;
  });
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
  const dispatchSetNameAndImage = (payload) =>
    dispatch(setNameAndImage(payload));
  const [breadcrumbs] = useState([
    {
      name: 'Your account',
      src: '/individual-profile',
    },
    {
      name: 'Edit information',
      src: '/edit-profile',
    },
  ]);

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
      <SharedBreadcrumb breadcrumbs={breadcrumbs} />
      <Page>
        <form onSubmit={handleSubmit}>
          <AvatarBox>
            <Avatar src={picture.picturePreview} />
            <EditIcon>
              <label for="upload-photo">
                <AddImgIcon />
              </label>
              <input
                type="file"
                name="photo"
                id="upload-photo"
                onChange={uploadPicture}
              />
            </EditIcon>
          </AvatarBox>

          <InputBox>
            <div>
              <FormInput
                type="text"
                value={state.firstName}
                onChange={handleChange}
                label="First Name"
                placeholder="Lan"
                name="firstName"
              />
            </div>
            <div>
              <FormInput
                type="text"
                value={state.middleName}
                onChange={handleChange}
                label="Middle Name"
                placeholder="Hoang"
                name="middleName"
              />
            </div>
            <div>
              <FormInput
                type="text"
                value={state.lastName}
                onChange={handleChange}
                label="Last Name"
                placeholder="Nguyen"
                name="lastName"
              />
            </div>
          </InputBox>
        </form>
      </Page>
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default EditProfile;
