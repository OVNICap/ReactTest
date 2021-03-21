import { readKey, encrypt as openpgpEncrypt, Message } from 'openpgp';
import { mock } from './mock';

export async function encrypt(message: string, publicKeyArmored: string): Promise<string> {
  const mockedEncryption = await mock.encrypt(message, publicKeyArmored);

  if (mockedEncryption) {
    return mockedEncryption;
  }

  return await openpgpEncrypt({
    message: Message.fromText(message),
    publicKeys: await readKey({ armoredKey: publicKeyArmored }),
  });
}
