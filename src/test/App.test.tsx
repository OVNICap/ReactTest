import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../app/App';
import { act } from 'react-dom/test-utils';
import { waitUntil } from '../lib/test/waitUntil';

function getTextAreas(): HTMLTextAreaElement[] {
  return [].slice.call(document.getElementsByTagName('textarea'));
}

function getTextAreaStates() {
  return [].map.call(document.getElementsByTagName('textarea'), (textArea: HTMLTextAreaElement) => ({
    value: textArea.value,
    readOnly: textArea.readOnly,
    disabled: textArea.disabled,
    success: textArea.classList.contains('success'),
    failure: textArea.classList.contains('failure'),
  }));
}

function setTextAreaValue(textarea: HTMLTextAreaElement, value: string): void {
  act(() => {
    fireEvent.change(textarea, { target: { value } });
  });
}

describe('Encryption app', () => {
  test('initial state', () => {
    render(<App />);
    expect(getTextAreaStates()).toEqual([
      {
        value: '',
        readOnly: false,
        disabled: false,
        success: false,
        failure: false,
      },
      {
        value: '',
        readOnly: false,
        disabled: true,
        success: false,
        failure: false,
      },
      {
        value: '',
        readOnly: false,
        disabled: true,
        success: false,
        failure: false,
      },
      {
        value: '',
        readOnly: true,
        disabled: false,
        success: false,
        failure: false,
      },
    ]);
  });

  test('enable fields on passphrase change', async () => {
    render(<App />);
    const textAreas = getTextAreas();

    setTextAreaValue(textAreas[0], 'This could be my passphrase');

    await screen.findByText('This could be my passphrase');

    expect(getTextAreaStates()).toEqual([
      {
        value: 'This could be my passphrase',
        readOnly: false,
        disabled: false,
        success: false,
        failure: false,
      },
      {
        value: '',
        readOnly: false,
        disabled: false,
        success: false,
        failure: false,
      },
      {
        value: '',
        readOnly: false,
        disabled: false,
        success: false,
        failure: false,
      },
      {
        value: '',
        readOnly: true,
        disabled: false,
        success: false,
        failure: false,
      },
    ]);
  });

  test('encrypt and decrypt on message typed', async () => {
    render(<App />);
    const textAreas = getTextAreas();

    setTextAreaValue(textAreas[0], 'This could be my passphrase');

    await waitUntil(100);

    setTextAreaValue(textAreas[1], 'Tell you a secret');

    await waitUntil(100);

    const encryptedMessage = textAreas[2].value;

    expect(getTextAreaStates()).toEqual([
      {
        value: 'This could be my passphrase',
        readOnly: false,
        disabled: false,
        success: false,
        failure: false,
      },
      {
        value: 'Tell you a secret',
        readOnly: false,
        disabled: false,
        success: false,
        failure: false,
      },
      {
        value: encryptedMessage,
        readOnly: false,
        disabled: false,
        success: false,
        failure: false,
      },
      {
        value: 'Tell you a secret',
        readOnly: true,
        disabled: false,
        success: true,
        failure: false,
      },
    ]);

    setTextAreaValue(textAreas[2], 'broken');

    await waitUntil(100);

    expect(getTextAreaStates()).toEqual([
      {
        value: 'This could be my passphrase',
        readOnly: false,
        disabled: false,
        success: false,
        failure: false,
      },
      {
        value: 'Tell you a secret',
        readOnly: false,
        disabled: false,
        success: false,
        failure: false,
      },
      {
        value: 'broken',
        readOnly: false,
        disabled: false,
        success: false,
        failure: false,
      },
      {
        value: 'Tell you a secret',
        readOnly: true,
        disabled: false,
        success: false,
        failure: true,
      },
    ]);

    setTextAreaValue(textAreas[1], 'Something else');

    await waitUntil(100);

    const otherEncryptedMessage = textAreas[2].value;

    expect(otherEncryptedMessage).not.toBe(encryptedMessage);

    expect(getTextAreaStates()).toEqual([
      {
        value: 'This could be my passphrase',
        readOnly: false,
        disabled: false,
        success: false,
        failure: false,
      },
      {
        value: 'Something else',
        readOnly: false,
        disabled: false,
        success: false,
        failure: false,
      },
      {
        value: otherEncryptedMessage,
        readOnly: false,
        disabled: false,
        success: false,
        failure: false,
      },
      {
        value: 'Something else',
        readOnly: true,
        disabled: false,
        success: true,
        failure: false,
      },
    ]);

    setTextAreaValue(textAreas[2], encryptedMessage);

    await waitUntil(100);

    expect(getTextAreaStates()).toEqual([
      {
        value: 'This could be my passphrase',
        readOnly: false,
        disabled: false,
        success: false,
        failure: false,
      },
      {
        value: 'Something else',
        readOnly: false,
        disabled: false,
        success: false,
        failure: false,
      },
      {
        value: encryptedMessage,
        readOnly: false,
        disabled: false,
        success: false,
        failure: false,
      },
      {
        value: 'Tell you a secret',
        readOnly: true,
        disabled: false,
        success: true,
        failure: false,
      },
    ]);
  });
});
