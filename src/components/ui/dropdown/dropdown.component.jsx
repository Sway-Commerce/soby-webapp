import React from 'react';
import styled from 'styled-components';

import ReactDropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function Dropdown({
  options,
  value,
  onChange,
  label,
  validate = () => {},
}) {
  return (
    <ReactDropdown
      options={options}
      placeholder={label}
      onChange={(option) => onChange(option.value)}
      value={value}
      onSubmit={() => validate()}
      className="rival__dropdown"
    />
  );
}
