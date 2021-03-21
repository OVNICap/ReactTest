import { readMessage, readKey, decrypt as openpgpDecrypt } from 'openpgp';
import { mock } from './mock';

export async function decrypt(armoredMessage: string, armoredKey: string, passphrase?: string): Promise<string> {
  const privateKey = await readKey({ armoredKey });

  if (passphrase) {
    await privateKey.decrypt(passphrase);
  }

  const mockedDecryption = await mock.decrypt(armoredMessage, privateKey);

  if (mockedDecryption) {
    return mockedDecryption;
  }

  return (await openpgpDecrypt({
    message: await readMessage({ armoredMessage }),
    privateKeys: privateKey,
  })).data;
}
