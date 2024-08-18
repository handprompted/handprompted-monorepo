import type { Setter, Signal } from "solid-js";
import { isLoggedIn } from "./isLoggedIn";

interface ActionResource {
  kind: 'user' | 'flip' | 'spin';
  policies?: AccessPolicy[];
  object?: any; // Optional detailed object information
}

enum AccessPolicy {
  UNRESTRICTED = 'unrestricted',
  PAY_PER_VIEW = 'pay_per_view',
}

type ActionFunction = (...args: any[]) => void;
type BeforeActionFunction = (...args: any[]) => Promise<void> | void;
type FallbackActionFunction = (...args: any[]) => void;

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
 * Wraps an action that requires certain user permissions.
 * If the user does not meet the requirements, the appropriate flow (e.g., login, payment) will be started.
 *
 * @param {ActionFunction} action - The function to be performed if the user meets the requirements.
 * @param {ActionResource} resource - The resource of the action, containing policies and other relevant information.
 * @param {BeforeActionFunction} [onBeforeAction] - An optional function to execute before the main action.
 * @param {FallbackActionFunction} [onFallbackAction] - An optional function to execute if the user does not meet the requirements.
 * @returns {ActionFunction} - The handler function to be used as an event handler.
 */
export function withAccessControl(
  action: ActionFunction,
  resource: ActionResource,
  options?: {
    onBeforeAction?: BeforeActionFunction,
    onFallbackAction?: FallbackActionFunction
  }
): ActionFunction {
  if (!action?.name) {
    throw new Error('The action parameter of withAccessControl must be a function with a name.');
  }

  const activity = action.name;

  if (activityMap.has(activity) && activityMap.get(activity) !== action) {
    throw new Error(`Activity '${activity}' is already associated with another function.`);
  }

  activityMap.set(activity, action);

  const handler = async (...args: any[]) => {
    if (isLoggedIn()) {
      if (resource.policies?.includes(AccessPolicy.PAY_PER_VIEW) && !isUserMember()) {
        startMembershipFlow(activity, config.showModal);
      } else {
        if (options?.onBeforeAction) {
          await options?.onBeforeAction(...args);
        }
        action(...args);
      }
    } else {
      startLoginFlow(activity, config.showModal);
      if (options?.onFallbackAction) {
        options?.onFallbackAction(...args);
      }
    }
  };

  return handler;
}

function isUserMember(): boolean {
  // Placeholder function to check if the user has a paid membership
  // Implement your actual membership check logic here
  return false;
}

function startMembershipFlow(activity: string, showModal: Setter<boolean>): void {
  // Placeholder function to start the membership flow
  // Implement your actual membership flow logic here
  console.log(`Starting membership flow for activity: ${activity}`);
  showModal(true);
}

function startLoginFlow(activity: string, showModal: Setter<boolean>): void {
  // Placeholder function to start the login flow
  // Implement your actual login flow logic here
  console.log(`Starting login flow for activity: ${activity}`);
  showModal(true);
}
