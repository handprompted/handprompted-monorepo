// the startLoginFlow function will look something like this

import type {Setter} from 'solid-js';

export function startLoginFlow(activity: string, showModal: Setter<boolean>) {
  // TODO: passs activity to the login flow
  showModal(true);
}
