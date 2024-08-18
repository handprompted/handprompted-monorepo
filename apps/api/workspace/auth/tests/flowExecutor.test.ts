import { beforeEach, describe, expect, it, vi } from 'vitest';
import { executeStep, startFlow } from '../flows/flowExecutor';
import { useFlowStore } from '../flows/flowStore';

vi.mock('../flows/flowStore', () => ({
  useFlowStore: {
    getState: vi.fn(),
  },
}));

describe('flowExecutor', () => {
  beforeEach(() => {
    useFlowStore.getState.mockReturnValue({
      setFlow: vi.fn(),
      setStep: vi.fn(),
      setParams: vi.fn(),
      currentFlow: null,
      currentStep: null,
      params: {},
    });
  });

  it('should start a flow', () => {
    startFlow('loginFlow');
    expect(useFlowStore.getState().setFlow).toHaveBeenCalledWith('loginFlow');
    expect(useFlowStore.getState().setStep).toHaveBeenCalledWith('start');
  });

  it('should execute a step', () => {
    useFlowStore.getState.mockReturnValue({
      ...useFlowStore.getState(),
      currentFlow: 'loginFlow',
    });

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    executeStep('start');
    expect(logSpy).toHaveBeenCalledWith('Prompting user to log in...');

    logSpy.mockRestore();
  });
});
