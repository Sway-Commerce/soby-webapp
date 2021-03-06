import React, { useEffect, useRef } from 'react';

import { BoxContainer, NumberBox } from './validation-input.styles';

const ValidationInput = () => {
  const firstRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();
  const fourthRef = useRef();
  const fifthRef = useRef();
  const sixthRef = useRef();
  useEffect(() => {
    firstRef.current.focus();
  }, []);

  const onInputFirst = (e) => {
    e.target.value = e.target.value.slice(0, 1);
    if (e.target.value) {
      secondRef.current.focus();
    }
  };
  const onInputSecond = (e) => {
    e.target.value = e.target.value.slice(0, 1);
    if (e.target.value) {
      thirdRef.current.focus();
    }
  };
  const onInputThird = (e) => {
    e.target.value = e.target.value.slice(0, 1);
    if (e.target.value) {
      fourthRef.current.focus();
    }
  };
  const onInputFourth = (e) => {
    e.target.value = e.target.value.slice(0, 1);
    if (e.target.value) {
      fifthRef.current.focus();
    }
  };
  const onInputFifth = (e) => {
    e.target.value = e.target.value.slice(0, 1);
    if (e.target.value) {
      sixthRef.current.focus();
    }
  };
  const onInputSixth = (e) => {
    e.target.value = e.target.value.slice(0, 1);
    if (+e.keyCode === 8 || +e.keyCode === 46) {
      firstRef.current.value = null;
      secondRef.current.value = null;
      thirdRef.current.value = null;
      fourthRef.current.value = null;
      fifthRef.current.value = null;
      sixthRef.current.value = null;
      firstRef.current.focus();
    }
  };

  return (
    <BoxContainer>
      <NumberBox type="number" ref={firstRef} onKeyUp={onInputFirst} />
      <NumberBox type="number" ref={secondRef} onKeyUp={onInputSecond} />
      <NumberBox type="number" ref={thirdRef} onKeyUp={onInputThird} />
      <NumberBox type="number" ref={fourthRef} onKeyUp={onInputFourth} />
      <NumberBox type="number" ref={fifthRef} onKeyUp={onInputFifth} />
      <NumberBox type="number" ref={sixthRef} onKeyUp={onInputSixth} />
    </BoxContainer>
  );
};

export default ValidationInput;
