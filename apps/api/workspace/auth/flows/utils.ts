import { useFlowStore } from './flowStore';

export const trackParameters = (params: Record<string, any>) => {
  const { setParams } = useFlowStore.getState();
  setParams(params);
};

export const restoreFlowState = (encodedState: string) => {
  const { setFlow, setStep, setParams } = useFlowStore.getState();
  const decodedState = JSON.parse(atob(encodedState));
  setFlow(decodedState.flow);
  setStep(decodedState.step);
  setParams(decodedState.params);
};
