import { useState, ChangeEvent } from 'react';
import { KeyPair } from 'openpgp';
import { decrypt } from '../lib/crypt/decrypt';
import { encrypt } from '../lib/crypt/encrypt';
import { generateKey } from '../lib/crypt/generateKey';
import './App.css';

function App() {
  const [key, setKey] = useState<KeyPair|undefined>();

  return (
    <div className="app">
      <div className="field">
        <textarea placeholder="Pass phrase" />
      </div>
      <div className="field">
        <textarea placeholder="Message" />
      </div>
      <div className="field">
        <textarea placeholder="Encrypted message" />
      </div>
      <div className="field">
        <textarea placeholder="Decrypted message" readOnly={true} className={''} />
      </div>
    </div>
  );
}

export default App;
