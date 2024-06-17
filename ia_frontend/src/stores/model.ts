import { create } from 'zustand';

import { type Model } from '@/types/mode';
import { models } from '@/app/(protected)/app/_components/data/models';

type ModelStore = {
	selectedModel: Model | null;
	setModel: (model: Model) => void;
};

export const useModelStore = create<ModelStore>()((set) => ({
	selectedModel: models[0] ?? null,
	setModel: (model) => set({ selectedModel: model }),
}));
