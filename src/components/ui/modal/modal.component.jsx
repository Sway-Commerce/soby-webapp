import React from 'react';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 8px;
  display: none;
  &.show {
    display: block;
  }

  .contract-detail {
    position: relative;
    .close-wrapper {
      position: absolute;
      top: 15px;
      right: 15px;
    }
  }
`;

export const ScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
  &.show {
    display: block;
  }
`;

const SobyModal = ({ open, setOpen, children }) => {
  return (
    <React.Fragment>
      <ModalContainer className={open ? 'show' : null}>
        <div className="contract-detail">{children}</div>
      </ModalContainer>
      <ScreenWrapper className={open ? 'show' : null}  onClick={() => setOpen(false)}/>
    </React.Fragment>
  );
};
// <div className="close-wrapper" onClick={() => setOpen(false)}>
//   x
// </div>
export default SobyModal;
