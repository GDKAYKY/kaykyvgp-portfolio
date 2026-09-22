import { PROJECTS } from "$lib/data/projects";
import { CERTIFICATIONS, SKILLS_COLUMNS } from "$lib/data/resume";
import { getTechIconName } from "$lib/utils/techIcons";
import { buildKeywordMap } from "$lib/utils/keywordMapper";
import type { SkillItem } from "$lib/types/resume";

function uniqueLabels(labels: string[]) {
  return labels.reduce<string[]>((result, label) => {
    const normalized = label.trim();

    if (
      normalized &&
      !result.some((existing) => existing.toLowerCase() === normalized.toLowerCase())
    ) {
      result.push(normalized);
    }

    return result;
  }, []);
}

const keywordLabels = Object.values(buildKeywordMap()).map(
  ({ keyword }) => keyword,
);
const projectTags = PROJECTS.flatMap((project) => project.tags.split(","));
const resumeSkills = SKILLS_COLUMNS.flatMap((column) =>
  column.skills.map((skill) => skill.label),
);
const certificationTools = CERTIFICATIONS.flatMap(
  (certification) => certification.tools ?? [],
);

export const SKILL_CATALOG: SkillItem[] = uniqueLabels([
  ...resumeSkills,
  ...keywordLabels,
  ...certificationTools,
  ...projectTags,
]).map((label) => ({
  label,
  icon: getTechIconName(label),
}));

export function resolveSkillLabel(label: string) {
  const normalized = label.trim().toLowerCase();
  return (
    SKILL_CATALOG.find((skill) => skill.label.toLowerCase() === normalized)
      ?.label ?? label.trim()
  );
}
