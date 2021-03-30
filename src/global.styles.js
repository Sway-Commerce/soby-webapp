import { createGlobalStyle } from 'styled-components';
import { mainColor, subColor } from './shared/css-variable/variable';

export const GlobalStyle = createGlobalStyle`
	body {
		font-family: 'Commissioner', sans-serif;
		font-weight: regular;
		font-size: 20px;
		line-height: 24px;
		color: #000000;
		.body-container {
			width: 1140px;
			margin: auto;
			* {
				box-sizing: border-box;
			}
		}
		@media screen and (max-width: 800px) {
			.body-container {
				width: auto;
			}
		}
	}

	a {
		text-decoration: none;
		color: black;
	}

	html {
		scroll-behavior: smooth;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
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

	p {
		font-style: normal;
		font-weight: normal;
		font-size: 20px;
		line-height: 26px;
	}

	.Soby__dropdown {
		border: 1px solid rgb(112,112,112,0.5);
		box-sizing: border-box;
		border-radius: 8px;
	}
`;
