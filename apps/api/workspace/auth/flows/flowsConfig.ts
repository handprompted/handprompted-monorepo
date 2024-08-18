import { isLoggedIn } from "../isLoggedIn";
import { openLoginModal } from "./actions/openLoginModal";
import { redirectToOriginUrl } from "./actions/redirectToOriginUrl";

export enum FLOW {
  LOGIN = 'login',
  MEMBERSHIP = 'membership',
}

// flowsConfig.ts
export type FLOW_ID = keyof typeof FLOW;

export const FLOW_IDS = Object.keys(FLOW) as FLOW_ID[];

export const FLOWS: Record<string, any> = {
  [FLOW.LOGIN]: {
    id: FLOW.LOGIN,
    stateParams: ['originUrl', 'activity', 'resource'],
    steps: [
      {
        name: 'start',
        action: openLoginModal,
        skipIf: isLoggedIn,
      },
      {
        name: 'redirect',
        action: redirectToOriginUrl
      },
    ],
  },
  [FLOW.MEMBERSHIP]: {
    id: FLOW.MEMBERSHIP,
    stateParams: ['originUrl', 'activity', 'resource'],
    steps: [
      {
        name: 'start',
        action: openLoginModal,
        skipIf: isLoggedIn,
      },
      {
        name: 'requireMembership',
        action: openMembershipModal,
        skipIf: () => isLoggedIn() && currentUserIsMember(),
      },
      {
        name: 'redirect',
        action: redirectToOriginUrl
      }
    ]
  },
} as const;
