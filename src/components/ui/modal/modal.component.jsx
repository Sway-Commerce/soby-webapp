import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from 'shared/assets/close-icon.svg';

export const ModalContainer = styled.div`
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 8px;
  min-height: 300px;
  min-width: 300px;
  display: none;
  &.show {
    display: block;
  }

  .contract-detail {
    position: relative;
    .close-wrapper {
      position: absolute;
      top: 1rem;
      right: 1rem;
      cursor: pointer;
      svg {
        width: 1.2rem;
        height: 1.2rem;
      }
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
        <div className="contract-detail">
          {children}
          <div className="close-wrapper" onClick={() => setOpen(false)}>
            <CloseIcon />
          </div>
        </div>
      </ModalContainer>
      <ScreenWrapper
        className={open ? 'show' : null}
        onClick={() => setOpen(false)}
      />
    </React.Fragment>
  );
};
// <div className="close-wrapper" onClick={() => setOpen(false)}>
//   x
// </div>
export default SobyModal;
