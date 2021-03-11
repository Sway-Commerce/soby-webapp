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

export const selectUserCredential = createSelector([selectUser], (user) => ({
  signingSecret: user.signingSecret,
  encryptionSecret: user.encryptionSecret,
  signingPublicKey: user.signingPublicKey,
  encryptionPublicKey: user.encryptionPublicKey
}));
