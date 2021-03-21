import { waitFor } from "@testing-library/react";

export async function waitUntil(timeout: number) {
  const time = (new Date()).getTime();

  return await waitFor(() => {
    if ((new Date()).getTime() - time < timeout) {
      throw new Error('Wait');
    }
  }, {
    timeout: 1000 + timeout,
  });
}
