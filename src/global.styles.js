import { createGlobalStyle } from 'styled-components';
import { borderColor, cyanColor, grayColor, mainColor, orangeColor, subColor , greenColor} from './shared/css-variable/variable';

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
		background-color: #E5E5E5;
		.body-container {
			width: 1200px;
			margin: auto;
			* {
				box-sizing: border-box;
			}
		}
		@media screen and (max-width: 1024px) {
			.body-container {
				width: auto;
			}
		}
	}

	h2 {
		font-size: 1.2rem;
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

	.PhoneInput {
		border-bottom: 1px ${borderColor} solid;
    padding: 0 10px;
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
		margin-bottom: 24px;
	}

	p {
		font-style: normal;
		font-weight: normal;
		font-size: 0.8rem;
		line-height: 26px;
	}

	.Soby__dropdown {
		border: 1px solid rgb(112,112,112,0.5);
		box-sizing: border-box;
		border-radius: 8px;
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

	h5.error-title {
		color: red;
  	margin: 5px 0;
	}

	.main-btn {
		margin: 48px 0 32px;
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
    color: ${grayColor};
  }

  .green {
    color: ${greenColor};
  }
`;
