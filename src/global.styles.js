import { createGlobalStyle } from 'styled-components';
import { mainColor, subColor } from './shared/css-variable/variable';

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
			width: 1140px;
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
		border-bottom: 1px ${subColor} solid;
    padding: 0 10px;
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
		font-family: Commissioner;
		font-style: normal;
		font-weight: normal;
		font-size: 2rem;
		line-height: 56px;
		color: ${mainColor};
		text-align: center;
	}

	.form-label {
		font-family: Commissioner;
		font-style: normal;
		font-weight: 600;
		font-size: 1.2rem;
		line-height: 29px;
		color: ${mainColor};
		text-transform: none;
		margin-bottom: 16px;
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
`;
