import React, { useEffect, useRef } from 'react';

import { BoxContainer, NumberBox, InputCode } from './validation-input.styles';

const ValidationInput = ({ collectVerifyCode, isIndividualProfile }) => {
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

    if (e.target.value) {
      collectVerifyCode(
        `${firstRef.current.value}${secondRef.current.value}${thirdRef.current.value}${fourthRef.current.value}${fifthRef.current.value}${sixthRef.current.value}`
      );
    }
  };

  return isIndividualProfile ? (
    <BoxContainer>
      <InputCode type="number" ref={firstRef} onKeyUp={onInputFirst} key={Math.random()} />
      <InputCode type="number" ref={secondRef} onKeyUp={onInputSecond} key={Math.random()}/>
      <InputCode type="number" ref={thirdRef} onKeyUp={onInputThird} key={Math.random()}/>
      <InputCode type="number" ref={fourthRef} onKeyUp={onInputFourth} key={Math.random()}/>
      <InputCode type="number" ref={fifthRef} onKeyUp={onInputFifth} key={Math.random()}/>
      <InputCode type="number" ref={sixthRef} onKeyUp={onInputSixth} key={Math.random()}/>
    </BoxContainer>
  ) : (
    <BoxContainer>
      <NumberBox type="number" ref={firstRef} onKeyUp={onInputFirst} key={Math.random()}/>
      <NumberBox type="number" ref={secondRef} onKeyUp={onInputSecond} key={Math.random()}/>
      <NumberBox type="number" ref={thirdRef} onKeyUp={onInputThird} key={Math.random()}/>
      <NumberBox type="number" ref={fourthRef} onKeyUp={onInputFourth} key={Math.random()}/>
      <NumberBox type="number" ref={fifthRef} onKeyUp={onInputFifth} key={Math.random()}/>
      <NumberBox type="number" ref={sixthRef} onKeyUp={onInputSixth} key={Math.random()}/>
    </BoxContainer>
  );
};

export default ValidationInput;
