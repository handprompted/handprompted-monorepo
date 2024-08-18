import {
  type Setter,
  type Signal,
} from 'solid-js';
import { isLoggedIn } from '../isLoggedIn';
import { startLoginFlow } from './startLoginFlow';

const originUrl = encodeURIComponent(window.location.href);

const activityMap: Map<string, () => void> = new Map();
const urlParams = new URLSearchParams(window.location.search);
const activityParam = urlParams.get('activity');
let isActivityPending = Boolean(activityParam);

const config: { showModal: Setter<boolean>; } = {
  showModal: ((show: boolean) => {}) as any,
};

export const setupAuth = (showModal: Signal<boolean>[1]) => {
  config.showModal = showModal;
};

/**
 * Wraps an action that requires the user to be logged in.
 * If the user is not logged in, the login flow will be started
 * and the action will be executed after the login flow is complete.
 *
 * @param {() => void} action - The named function to be performed if user is logged in
 * @returns {() => void} - The handler function to be used as event handler
 */
export function useAuth(action: () => void): () => void {
  if (!action?.name) {
    throw new Error('The action parameter of useAuth must be a function with a name.');
  }

  const activity = action.name;

  if (activityMap.has(activity) && activityMap.get(activity) !== action) {
    throw new Error(`Activity '${activity}' is already associated with another function.`);
  }

  activityMap.set(activity, action);

  // Check if there's an `activity` search param and execute the action ONCE
  if (isLoggedIn() && isActivityPending) {
    if (activityParam && activityMap.has(activityParam)) {
      isActivityPending = false;
      activityMap.get(activityParam)!();
      urlParams.delete('activity');
      window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
    }
  }

  const handler = (...args: any[]) => {
    if (isLoggedIn()) {
      action();
    }
    else {
      startLoginFlow(activity, config.showModal);
    }
  };

  return handler;
}
