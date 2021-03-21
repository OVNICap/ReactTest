import React from 'react';
import { generateKey } from '../lib/crypt/generateKey';
import { encrypt } from '../lib/crypt/encrypt';
import { decrypt } from '../lib/crypt/decrypt';
import { mock } from '../lib/crypt/mock';

describe('Encryption app', () => {
  test('encrypt and decrypt', async () => {
    mock.enable();
    const key = await generateKey('This could be my passphrase');

    const encrypted = await encrypt('Hello world!', key!.publicKeyArmored);
    const decrypted = await decrypt(encrypted, key!.privateKeyArmored, 'This could be my passphrase');

    expect(decrypted).toBe('Hello world!');
  });
});
