import { writable } from 'svelte/store';
import type { KeywordUsage } from '$lib/types/keyword';

interface KeywordPanelState {
  isOpen: boolean;
  selectedKeyword: KeywordUsage | null;
}

function createKeywordStore() {
  const { subscribe, set, update } = writable<KeywordPanelState>({
    isOpen: false,
    selectedKeyword: null,
  });

  return {
    subscribe,
    open: (keyword: KeywordUsage) => {
      set({ isOpen: true, selectedKeyword: keyword });
    },
    close: () => {
      set({ isOpen: false, selectedKeyword: null });
    },
    toggle: () => {
      update((state) => ({ ...state, isOpen: !state.isOpen }));
    },
  };
}

export const keywordPanel = createKeywordStore();
