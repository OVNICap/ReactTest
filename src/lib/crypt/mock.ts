import {Key, readKey} from 'openpgp';

class Mock {
  private enabled = false;
  private cache: Record<string, Record<string, string>> = {};

  public isEnabled(): boolean {
    return this.enabled;
  }

  public enable(): void {
    this.enabled = true;
  }

  public disable(): void {
    this.enabled = false;
  }

  public async encrypt(message: string, publicKeyArmored: string): Promise<string | undefined> {
    return new Promise(async resolve => {
      if (!this.isEnabled()) {
        resolve(undefined);

        return;
      }

      const key = await readKey({ armoredKey: publicKeyArmored });
      const fingerPrint = key.getFingerprint();
      const encryptedMessage = 'Encrypted: ' + message;
      (this.cache[fingerPrint] || (this.cache[fingerPrint] = {}))[encryptedMessage] = message;

      resolve(encryptedMessage);
    });
  }

  public async decrypt(armoredMessage: string, privateKey: Key): Promise<string | undefined> {
    return new Promise(resolve => {
      if (!this.isEnabled()) {
        resolve(undefined);

        return;
      }

      const fingerPrint = privateKey.toPublic().getFingerprint();

      resolve((this.cache[fingerPrint] || {})[armoredMessage] || undefined);
    });
  }
}

export const mock = new Mock();
