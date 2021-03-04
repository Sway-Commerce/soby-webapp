import { Encryption, Signing } from 'credify-crypto';

export const generateEncryptionKey = async (password) => {
  const encryption = new Encryption();
  await encryption.generateKeyPair();
  const encryptionSecret = await encryption.exportPrivateKey(password);
  const encryptionPublicKey = await encryption.exportPublicKey();
  return { encryptionSecret, encryptionPublicKey };
};

export const generateSignInKey = (password) => {
  const signing = new Signing();
  signing.generateKeyPair();
  const signingSecret = signing.exportPrivateKey(password);
  const signingPublicKey = signing.exportPublicKey();
  return { signingSecret, signingPublicKey };
};