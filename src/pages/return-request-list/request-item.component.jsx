import React from 'react';
import { RefundRequestStatus } from 'shared/constants/dispute.constant';
import styled from 'styled-components';

const SubContainer = styled.div`
  margin: 16px 0;
  display: flex;
  height: 40px;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  align-items: center;
  padding: 4px 16px;
  width: 100%;
  border-top: 1px solid #e4e4e4;
  justify-content: space-between;
`;

const RequestItem = ({
  refundRequests
}) => {
  return refundRequests.map((rr) => {
    const { id: rrId, status } = rr;
    const { colorClass, name } = RefundRequestStatus[status];
    return (
      <SubContainer key={rrId}>
        <p>Return Request {rrId}</p>
        <p className={colorClass}>{name}</p>
      </SubContainer>
    );
  })
};

export default RequestItem;
