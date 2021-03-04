import { createGlobalStyle } from 'styled-components';

const mainColor = '#2B74E4';
const subColor = '#94B8F1';
const colorWhite = '#FFFFFF';

export const GlobalStyle = createGlobalStyle`
	body {
		font-family: 'Commissioner', sans-serif;
		font-weight: regular;
	}

	a {
		text-decoration: none;
		color: black;
	}

	* {
		box-sizing: border-box;
	}

	.primary-color {
		color: ${mainColor};
	}

	.secondary-color {
		color: ${colorWhite};
	}

	.sub-color {
		color: ${subColor};
	}

	.PhoneInput {
		border-bottom: 1px ${mainColor} solid;
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
	}

	.second-col {
		display: grid;
		grid-column-gap: 16px;
		grid-template-columns: repeat(2, 1fr);
	}
`;
