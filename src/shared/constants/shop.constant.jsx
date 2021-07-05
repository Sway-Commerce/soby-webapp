import {
  redColor,
  orangeColor,
  yellowColor,
  greenColor,
  mainColor,
} from 'shared/css-variable/variable';

export const getColor = (name) => {
  switch (name) {
    case 'Red':
      return redColor;
    case 'Orange':
      return orangeColor;
    case 'Yellow':
      return yellowColor;
    case 'Green':
      return greenColor;
    case 'Blue':
      return mainColor;
    default:
      return redColor;
  }
};
