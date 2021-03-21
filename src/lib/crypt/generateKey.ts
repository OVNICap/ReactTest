import { generateKey as openpgpGenerateKey, KeyPair } from 'openpgp';

export async function generateKey(passphrase: string): Promise<KeyPair> {
  return await openpgpGenerateKey({
    curve: 'curve25519',
    userIds: [{ name: 'OVNICap', email: 'test@ovnicap.com' }],
    passphrase,
  });
}
