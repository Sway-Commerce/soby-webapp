import {
  fadeColor,
  darkGreyColor,
  excellentColor,
  greenColor,
  amazingColor,
} from 'shared/css-variable/variable';

export const getColor = (score) => {
  if (score <= 0.0) {
    return fadeColor;
  } else if (score <= 5.0 && score > 0.0) {
    return darkGreyColor
  } else if (score <= 6.0 && score > 5.0) {
    return darkGreyColor;
  } else if (score <= 8.0 && score > 6.0) {
    return greenColor
  } else if (score <= 9.5 && score > 8.0) {
    return excellentColor
  } else {
    return amazingColor
  }
};
