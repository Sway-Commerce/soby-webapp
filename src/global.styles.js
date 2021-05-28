import { createGlobalStyle } from 'styled-components';
import {
  borderColor,
  cyanColor,
  mainColor,
  orangeColor,
  subColor,
  greenColor,
  bodyColor,
  redColor,
  gray1Color,
  stokeColor,
} from './shared/css-variable/variable';

export const GlobalStyle = createGlobalStyle`
	html {
		font-size: 20px;
		@media screen and (max-width: 1024px) {
			font-size: 18px;
		}
		@media screen and (max-width: 785px) {
			font-size: 16px;
		}
	}
	body {
		font-family: 'Roboto', sans-serif;
		font-weight: regular;
		line-height: 24px;
		color: #000000;
		background-color: #F2F2F2;
		.body-container {
			width: 1200px;
			min-height: 100vh;
			margin: auto;
			* {
				box-sizing: border-box;
			}
			.__react_component_tooltip {
				opacity: 1;
				border-radius: 3px;
				padding: 0.8rem;
				box-shadow: 4px 4px 16px 0px rgba(0, 0, 0, 0.16);
				width: 17.6rem;
				pointer-events: all;
				@media screen and (max-width: 600px) {
					width: 70vw;
				}
			}
		}
		@media screen and (max-width: 1200px) {
			.body-container {
				width: auto;
				// margin:0 .6rem;
			}
		}
	}

	h2 {
		font-size: 1.2rem;
	}

	h3 {
		font-size: 1rem;
	}

	h5 {
		font-size: 0.8rem;
	}

	a {
		text-decoration: none;
		color: black;
	}

	html {
		scroll-behavior: smooth;
	}

	button:hover {
		cursor: pointer;
	}

	body::-webkit-scrollbar {
		width: 12px;
	}

	body::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	}

	body::-webkit-scrollbar-thumb {
		background-color: darkgrey;
		outline: 1px solid slategrey;
	}

	* {
		margin: 0;
		padding: 0;
	}

	button:focus, button {
		outline: none;
	}

	.primary-color {
		color: ${mainColor};
	}

	.secondary-color {
		color: white;
	}

	.sub-color {
		color: ${subColor};
	}

	.body-color {
		color: ${bodyColor};
	}

	.PhoneInput {
		border-bottom: 1px ${borderColor} solid;
		margin-top: 4px;
		input.PhoneInputInput {
			border: none;
			font-family: Work Sans;
			font-size: 0.7rem;
			outline: none
		}
		.PhoneInputCountrySelectArrow {
			display: none;
		}
		&:focus, &:hover {
			border-bottom: 1px ${mainColor} solid;
		}
	}

	.second-col {
		display: grid;
		grid-column-gap: 16px;
		grid-template-columns: repeat(2, 1fr);
	}

	.soby-title {
		font-style: normal;
		font-weight: normal;
		font-size: 1.2rem;
		line-height: 1rem;
		text-align: center;
		font-weight: 700;
	}

	.form-label {
		font-style: normal;
		font-weight: bold;
		font-size: 0.8rem;
		line-height: 1.2rem;
		text-transform: capitalize;
		margin-bottom: 1.2rem;
	}

	p, a {
		font-style: normal;
		font-weight: normal;
		font-size: 0.8rem;
		line-height: 1.3rem;
	}

	.Soby__dropdown {
		font-size: 0.8rem;
		color: #000000;
		.Dropdown-control {
			border-radius: 6px;
			border: 1px solid #828282;
		}
	}

	.text-truncation {
		padding: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.text-truncation-second-line {
		padding: 0;
		white-space: pre-line;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.text-right {
		text-align: right;
	}

	input {
		margin-top: 4px;
	}

	p.error-title {
		color: red;
  	margin: 5px 0;
		font-size: 0.7rem;
	}

	.main-btn {
		margin: 2.4rem 0 1.6rem;
	}

	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
		color: rgba(79, 79, 79, 0.5);
		opacity: 1; /* Firefox */
	}

	:-ms-input-placeholder { /* Internet Explorer 10-11 */
		color: rgba(79, 79, 79, 0.5);
	}

	::-ms-input-placeholder { /* Microsoft Edge */
		color: rgba(79, 79, 79, 0.5);
	}

	.orange {
    color: ${orangeColor};
  }

  .cyan {
    color: ${cyanColor};
  }

  .gray {
    color: ${stokeColor};
  }

  .green {
    color: ${greenColor};
  }

  .red {
    color: ${redColor};
  }

  .gray1 {
    color: ${gray1Color};
  }

	.mg-b-8 {
		margin-bottom: .4rem;
	}

	.mg-b-16 {
		margin-bottom: .8rem;
	}

	.mg-b-4 {
		margin-bottom: .2rem;
	}

	.mg-b-24 {
		margin-bottom: 1.2rem;
	}

	.mg-b-48 {
		margin-bottom: 2.4rem;
	}

	.flex-display {
		display: flex;
	}

	.non-clickable {
		pointer-events: none;
		cursor: default;
	}

	.clickable:hover {
		cursor: pointer;
	}

	.checkbox {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;

    label {
      position: relative;
      cursor: pointer;

      padding-left: 20px;
      span {
        margin-left: 12px;
      }
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0px;
        transform: translate(-50%, -50%);
        width: 12px;
        height: 12px;
        transition: transform 0.28s ease;
        border-radius: 3px;
        border: 1px solid #000;
      }
      &:after {
        content: '';
        display: block;
        width: 9px;
        height: 4px;
        border-bottom: 2px solid #fff;
        border-left: 2px solid #fff;
        transform: rotate(-45deg) scale(0) translate(-50%, -50%);
        transition: transform ease 0.25s;
        position: absolute;
        top: 7px;
        left: -5px;
      }
    }
    input[type='checkbox'] {
      width: auto;
      opacity: 0.00000001;
      left: 0;
      &:checked ~ label {
        &:before {
          background-color: ${mainColor};
          border: 2px solid ${mainColor};
        }
        &:after {
          transform: rotate(-45deg) scale(1);
        }
      }
      &:focus + label::before {
        outline: 0;
      }
    }
  }

	.truncate {
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		display: -webkit-box;
	}

	button.global-btn {
		max-width: 23.75rem;
		@media screen and (max-width: 500px) {
			width: 100%;
		}
	}

	.txt-capitalize {
		text-transform: capitalize;
	}

	.txt-center {
		text-align: center;
	}

	.fs-14 {
		font-size: 0.7rem;
	}

	.mg-t-30 {
		margin-top: 1.5rem;
	}

	.fw-normal {
		font-weight: normal;
	}
`;
