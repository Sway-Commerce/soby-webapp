import React, { useRef, useState } from 'react';

import styled from 'styled-components';
import Chevron from './chevron';

export const Container = styled.div`
  /* Style the accordion section */
  .accordion__section {
    display: flex;
    flex-direction: column;
  }

  /* Style the buttons that are used to open and close the accordion panel */
  .accordion {
    cursor: pointer;
    display: flex;
    align-items: center;
    border: none;
    outline: none;
    background-color: white;
  }

  /* Style the accordion content title */
  .accordion__title {
    font-weight: 600;
    font-size: 20px;
    text-align: left;
  }

  /* Style the accordion chevron icon */
  .accordion__icon {
    margin-left: auto;
    transition: transform 0.4s ease;
  }

  /* Style to rotate icon when state is active */
  .rotate {
    transform: rotate(90deg);
  }

  /* Style the accordion content panel. Note: hidden by default */
  .accordion__content {
    background-color: white;
    overflow: auto;
    transition: height 0.4s ease;
  }

  /* Style the accordion content text */
  .accordion__text {
    font-size: 16px;
    padding: 18px;
    color: black;
  }
`;

const Accordion = ({ children, setBelowGap, ...props }) => {
  const [setActive, setActiveState] = useState('');
  const [setHeight, setHeightState] = useState('0px');
  const [setRotate, setRotateState] = useState('accordion__icon');

  const content = useRef(null);

  const toggleAccordion = () => {
    setActiveState(setActive === '' ? 'active' : '');
    setHeightState(
      setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === 'active' ? 'accordion__icon' : 'accordion__icon rotate'
    );
    setBelowGap( setActive === 'active' ? '0px' : '192px');
  };

  return (
    <Container>
      <div className="accordion__section">
        <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
          <p className="accordion__title">{props.title}</p>
          <Chevron className={`${setRotate}`} width={10} fill={'#777'} />
        </button>
        <div
          ref={content}
          style={{ maxHeight: `${setHeight}` }}
          className="accordion__content"
        >
          {children}
        </div>
      </div>
    </Container>
  );
};

export default Accordion;
