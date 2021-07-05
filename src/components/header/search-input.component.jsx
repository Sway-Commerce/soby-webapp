import React from 'react';
import styled from 'styled-components';
import FormInput from 'components/form-input/form-input.component';
import { ReactComponent as SearchIcon } from 'shared/assets/search-icon.svg';

const SearchInputContainer = styled.div`
  position: relative;
  flex-direction: column;
  align-self: flex-start;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  width: 418px;

  input#header-input {
    margin-top: 11px;
    padding-left: 72px;

    background-color: #f1f1f1;
    & ~ label {
      left: 72px;
    }
  }
  svg.mobile-btn {
    position: absolute;
    left: 27px;
    top: 18px;
    path {
      fill: #000000;
    }
  }

  @media screen and (max-width: 768px) {
    margin-right: 50px;
  }

  @media screen and (max-width: 750px) {
    max-width: unset !important;
    display: ${(props) => (props.hide ? 'flex' : 'none')};
    input#header-input {
      margin-top: 11px;
      width: calc(100vw - 3.9rem);
      padding-left: 16px;
      & ~ label {
        left: 16px;
        top: 5px;
      }
    }

    svg.mobile-btn {
      left: unset;
      top: 18px;
      right: 11px;
    }
  }

  @media screen and (max-width: 1000px) {
    width: 100%;
    max-width: calc((100vw - 24px) / 3);
  }
`;

const SearchInput = ({ inputSearch, handleChange, ...rest }) => {
  return (
    <SearchInputContainer {...rest}>
      <FormInput
        type="text"
        name="inputSearch"
        value={inputSearch}
        onChange={handleChange}
        placeholder="Search for Shop, product and invoice"
        withoutTitle
        id="header-input"
      />
      <SearchIcon className="mobile-btn clickable" />
    </SearchInputContainer>
  );
};

export default SearchInput;
