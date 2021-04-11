import React from 'react';
import styled from 'styled-components';

const Container = styled.p`
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  height: 42px;
  padding: 8px 12px;
`;

const SkuChip = ({ name }) => <Container>{name}</Container>;

export default SkuChip;
