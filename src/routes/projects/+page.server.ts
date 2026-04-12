import { PROJECTS } from '$lib/data';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    projects: PROJECTS,
  };
};
