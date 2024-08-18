import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useFlowStore } from '../flows/flowStore';
import { withAccessControl } from '../withAccessControl';

vi.mock('../flows/flowStore', () => ({
  useFlowStore: {
    getState: vi.fn(),
  },
}));

describe('withAccessControl', () => {
  beforeEach(() => {
    useFlowStore.getState.mockReturnValue({
      isLoggedIn: vi.fn(),
      isUserMember: vi.fn(),
      startFlow: vi.fn(),
      currentFlow: null,
      currentStep: null,
      params: {},
    });
  });

  it('should execute action if user is logged in and meets requirements', () => {
    const action = vi.fn();
    const resource = { kind: 'flip', policies: [] };
    const wrappedAction = withAccessControl(action, resource);

    useFlowStore.getState().isLoggedIn.mockReturnValue(true);
    wrappedAction();
    expect(action).toHaveBeenCalled();
  });

  it('should start flow if user is not logged in', () => {
    const action = vi.fn();
    const resource = { kind: 'flip', policies: [] };
    const wrappedAction = withAccessControl(action, resource);

    useFlowStore.getState().isLoggedIn.mockReturnValue(false);
    wrappedAction();
    expect(useFlowStore.getState().startFlow).toHaveBeenCalled();
  });

  it('should call onBeforeAction if provided', () => {
    const action = vi.fn();
    const resource = { kind: 'flip', policies: [] };
    const onBeforeAction = vi.fn();
    const wrappedAction = withAccessControl(action, resource, onBeforeAction);

    useFlowStore.getState().isLoggedIn.mockReturnValue(true);
    wrappedAction();
    expect(onBeforeAction).toHaveBeenCalled();
    expect(action).toHaveBeenCalled();
  });

  it('should call onFallbackAction if provided and user does not meet requirements', () => {
    const action = vi.fn();
    const resource = { kind: 'flip', policies: [AccessPolicy.PAY_PER_VIEW] };
    const onFallbackAction = vi.fn();
    const wrappedAction = withAccessControl(action, resource, undefined, onFallbackAction);

    useFlowStore.getState().isLoggedIn.mockReturnValue(true);
    useFlowStore.getState().isUserMember.mockReturnValue(false);
    wrappedAction();
    expect(onFallbackAction).toHaveBeenCalled();
    expect(action).not.toHaveBeenCalled();
  });
});
