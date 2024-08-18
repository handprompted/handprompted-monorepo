import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useFlowStore } from '../flows/flowStore';
import { restoreFlowState, trackParameters } from '../flows/utils';

vi.mock('../flows/flowStore', () => ({
  useFlowStore: {
    getState: vi.fn(),
  },
}));

describe('utils', () => {
  beforeEach(() => {
    useFlowStore.getState.mockReturnValue({
      setParams: vi.fn(),
      setFlow: vi.fn(),
      setStep: vi.fn(),
      params: {},
    });
  });

  it('should track parameters', () => {
    trackParameters({ originUrl: 'http://example.com' });
    expect(useFlowStore.getState().setParams).toHaveBeenCalledWith({ originUrl: 'http://example.com' });
  });

  it('should restore flow state', () => {
    const encodedState = btoa(JSON.stringify({ flow: 'loginFlow', step: 'start', params: { originUrl: 'http://example.com' } }));
    restoreFlowState(encodedState);
    expect(useFlowStore.getState().setFlow).toHaveBeenCalledWith('loginFlow');
    expect(useFlowStore.getState().setStep).toHaveBeenCalledWith('start');
    expect(useFlowStore.getState().setParams).toHaveBeenCalledWith({ originUrl: 'http://example.com' });
  });
});
