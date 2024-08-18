import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useFlowStore } from '../flows/flowStore';

describe('flowStore', () => {
  beforeEach(() => {
    useFlowStore.setState({
      currentFlow: null,
      currentStep: null,
      params: {},
      setFlow: vi.fn((flow) => {
        useFlowStore.setState({ currentFlow: flow });
      }),
      setStep: vi.fn((step) => {
        useFlowStore.setState({ currentStep: step });
      }),
      setParams: vi.fn((params) => {
        useFlowStore.setState({ params });
      }),
    });
  });

  it('should initialize with default state', () => {
    const state = useFlowStore.getState();
    expect(state.currentFlow).toBeNull();
    expect(state.currentStep).toBeNull();
    expect(state.params).toEqual({});
  });

  it('should set and get current flow', () => {
    const state = useFlowStore.getState();
    state.setFlow('loginFlow');
    expect(useFlowStore.getState().currentFlow).toBe('loginFlow');
  });

  it('should set and get current step', () => {
    const state = useFlowStore.getState();
    state.setStep('start');
    expect(useFlowStore.getState().currentStep).toBe('start');
  });

  it('should set and get params', () => {
    const state = useFlowStore.getState();
    state.setParams({ originUrl: 'http://example.com' });
    expect(useFlowStore.getState().params.originUrl).toBe('http://example.com');
  });
});
