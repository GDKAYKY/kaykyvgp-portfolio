import { writable } from "svelte/store";
import { resolveSkillLabel } from "$lib/data/skills";

const { subscribe, set } = writable<{
  isOpen: boolean;
  selectedSkill: string | null;
}>({
  isOpen: false,
  selectedSkill: null,
});

export const skillsMenu = {
  subscribe,
  open(selectedSkill: string) {
    set({ isOpen: true, selectedSkill: resolveSkillLabel(selectedSkill) });
  },
  close() {
    set({ isOpen: false, selectedSkill: null });
  },
};
