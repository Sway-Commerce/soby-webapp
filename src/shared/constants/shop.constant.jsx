import {
  fadeColor,
  darkGreyColor,
  excellentColor,
  greenColor,
  amazingColor,
} from 'shared/css-variable/variable';

export const getColor = (score) => {
  switch (parseFloat(score)) {
    case (score <= 0.0):
      return fadeColor;
    case (score <= 5.0):
      return fadeColor;
    case (score <= 6.0):
      return darkGreyColor;
    case (score <= 8.0):
      return greenColor;
    case (score <= 9.5):
      return excellentColor;
    default:
      return amazingColor;
  }
};
