import { gql, useMutation } from '@apollo/client';
import { Encryption, Signing } from 'credify-crypto';

const REGISTER = gql`
  mutation Register($cmd: RegisterCmd!) {
    register(cmd: $cmd) {
      success
      message
      data {
        id
        signingPublicKey
        encryptionPublicKey
        lastName
        firstName
      }
    }
  }
`;

const generateEncryptionKey = async (password) => {
  const encryption = new Encryption();
  await encryption.generateKeyPair();
  const encryptionSecret = await encryption.exportPrivateKey(password);
  const encryptionPublicKey = await encryption.exportPublicKey();
  return { encryptionSecret, encryptionPublicKey };
};

const generateSignInKey = (password) => {
  const signing = new Signing();
  signing.generateKeyPair();
  const signingSecret = signing.exportPrivateKey(password);
  const signingPublicKey = signing.exportPublicKey();
  return { signingSecret, signingPublicKey };
};

const RegisterUseCase = async (cmd) => {
  const [register] = useMutation(REGISTER);
  const { encryptionSecret, encryptionPublicKey } = await generateEncryptionKey(
    cmd.password
  );
  const { signingSecret, signingPublicKey } = generateSignInKey(cmd.password);
  cmd = {
    ...cmd,
    encryptionSecret,
    encryptionPublicKey,
    signingSecret,
    signingPublicKey,
  };

  register({
    variables: {
      cmd,
    },
  });

  localStorage.setItem('signingSecret', signingSecret);
  localStorage.setItem('signingPublicKey', signingPublicKey);
};

export default RegisterUseCase;
