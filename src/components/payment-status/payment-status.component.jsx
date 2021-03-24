import React from 'react';

import { StatusContainer } from './payment-status.styles';
import { ReactComponent as AttentionIcon } from 'assets/attention-icon.svg';
import { ReactComponent as SuccessIcon } from 'assets/success-payment.svg';

const PaymentStatus = (code) => {
  let status_message = '';
  let isSuccess = false;

  switch (+code) {
    default:
    case 0:
      status_message = 'Ghi nhận giao dịch thành công';
      isSuccess = true;
      break;
    case 1:
      status_message = 'Yêu cầu đã được xử lý trước đó';
      break;
    case 2:
      status_message = 'Địa chỉ IP không cho phép truy cập';
      break;
    case 3:
      status_message = 'Sai chữ ký';
      break;
    case 4:
      status_message = 'Lỗi hệ thống';
      break;
  }

  return (
    <StatusContainer>
      {isSuccess ? <SuccessIcon /> : <AttentionIcon/>}
      <div className="info">
        <div>Pay code</div>
        <div className="status">{status_message}</div>
      </div>
    </StatusContainer>
  );
};

export default PaymentStatus;
