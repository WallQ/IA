import { create } from 'zustand';

type PromptStore = {
	result: string | null;
	setResult: (result: string) => void;
};

export const usePromptStore = create<PromptStore>()((set) => ({
	result: null,
	setResult: (result) => set({ result: result }),
}));
