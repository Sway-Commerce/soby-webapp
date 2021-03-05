import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectPhoneNumber = createSelector([selectUser], (user) => ({
  phoneNumber: user.phoneNumber,
  phoneCountryCode: user.phoneCountryCode,
}));
