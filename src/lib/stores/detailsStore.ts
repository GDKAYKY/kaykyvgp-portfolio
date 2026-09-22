import { writable } from "svelte/store";
import type { Certification, Experience } from "$lib/types/resume";

type DetailsItem = Certification | Experience | null;
type DetailsKind = "certification" | "experience";

const { subscribe, set } = writable<{
  item: DetailsItem;
  kind: DetailsKind;
}>({
  item: null,
  kind: "certification",
});

export const detailsModal = {
  subscribe,
  open(item: Certification | Experience, kind: DetailsKind) {
    set({ item, kind });
  },
  close() {
    set({ item: null, kind: "certification" });
  },
};
