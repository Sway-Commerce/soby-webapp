import { createGlobalStyle } from 'styled-components';
import { mainColor, subColor } from './css-variable/variable';

export const GlobalStyle = createGlobalStyle`
	body {
		font-family: 'Commissioner', sans-serif;
		font-weight: regular;
		font-size: 20px;
		line-height: 24px;
		color: #000000;
	}

	a {
		text-decoration: none;
		color: black;
	}

	* {
		box-sizing: border-box;
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
		border-bottom: 1px ${subColor} solid;
    padding: 0 10px;
		input.PhoneInputInput {
			border: none;
			font-family: "Open Sans";
			font-size: 14px;
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
		font-family: Commissioner;
		font-style: normal;
		font-weight: normal;
		font-size: 40px;
		line-height: 56px;
		color: ${mainColor};
		text-align: center;
	}

	.form-label {
		font-family: Commissioner;
		font-style: normal;
		font-weight: 600;
		font-size: 24px;
		line-height: 29px;
		color: ${mainColor};
		text-transform: none;
		margin-bottom: 16px;
	}
`;
