import { create } from 'zustand';

interface FlowState {
  currentFlow: string | null;
  currentStep: string | null;
  params: Record<string, any>;
  setFlow: (flow: string) => void;
  setStep: (step: string) => void;
  setParams: (params: Record<string, any>) => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  currentFlow: null,
  currentStep: null,
  params: {},
  setFlow: (flow) => set({ currentFlow: flow }),
  setStep: (step) => set({ currentStep: step }),
  setParams: (params) => set((state) => ({ params: { ...state.params, ...params } })),
}));
