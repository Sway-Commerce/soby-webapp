import React from 'react';
import { Link } from 'react-router-dom';
import { RefundRequestStatus } from 'shared/constants/dispute.constant';
import { borderColor } from 'shared/css-variable/variable';
import styled from 'styled-components';

const SubContainer = styled(Link)`
  margin: 16px 0;
  display: flex;
  height: 40px;
  border: 1px solid ${borderColor};
  box-sizing: border-box;
  align-items: center;
  padding: 4px 16px;
  width: 100%;
  border-top: 1px solid ${borderColor};
  justify-content: space-between;
`;

const RequestItem = ({ refundRequests, assessId, nonClickable, ...props }) => {
  return (
    refundRequests?.map((rr) => {
      const { id: rrId, status } = rr;
      const { colorClass, name } = RefundRequestStatus[status];
      return (
        <SubContainer
          key={rrId}
          to={`/return-info/${assessId}/${rrId}`}
          className={`${nonClickable ? 'non-clickable' : ''}`}
        >
          <p>Return Request {rrId}</p>
          <p className={colorClass}>{name}</p>
        </SubContainer>
      );
    }) ?? null
  );
};

export default RequestItem;
