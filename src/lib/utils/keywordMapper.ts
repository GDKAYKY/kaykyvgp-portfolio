import type { KeywordMap, KeywordUsage } from '$lib/types/keyword';
import { PROJECTS } from '$lib/data/projects';
import { CERTIFICATIONS, EXPERIENCES } from '$lib/data/resume';
import { identifyKeywords } from './keywords';

export function buildKeywordMap(): KeywordMap {
  const keywordMap: KeywordMap = {};

  // Helper para adicionar keyword ao mapa
  function addKeyword(keyword: string, type: 'project' | 'certification' | 'experience', name: string) {
    if (!keyword) return;

    if (!keywordMap[keyword]) {
      keywordMap[keyword] = {
        keyword: keyword,
        projects: [],
        certifications: [],
        experiences: [],
      };
    }

    if (type === 'project' && !keywordMap[keyword].projects.includes(name)) {
      keywordMap[keyword].projects.push(name);
    } else if (type === 'certification' && !keywordMap[keyword].certifications.includes(name)) {
      keywordMap[keyword].certifications.push(name);
    } else if (type === 'experience' && !keywordMap[keyword].experiences.includes(name)) {
      keywordMap[keyword].experiences.push(name);
    }
  }

  // Processar projetos - identificar keywords automaticamente
  PROJECTS.forEach((project) => {
    const fullText = `${project.title} ${project.description} ${project.tags || ''}`;
    const identified = identifyKeywords(fullText);
    
    identified.allLabels.forEach((keyword) => {
      addKeyword(keyword, 'project', project.title);
    });
  });

  // Processar certificações - identificar keywords automaticamente
  CERTIFICATIONS.forEach((cert) => {
    const fullText = `${cert.title} ${cert.skills.join(' ')} ${cert.skillsGained?.join(' ') || ''} ${cert.tools?.join(' ') || ''}`;
    const identified = identifyKeywords(fullText);
    
    identified.allLabels.forEach((keyword) => {
      addKeyword(keyword, 'certification', cert.title);
    });
  });

  // Processar experiências - identificar keywords automaticamente
  EXPERIENCES.forEach((exp) => {
    const fullText = `${exp.position} ${exp.description.join(' ')} ${exp.technologies?.join(' ') || ''}`;
    const identified = identifyKeywords(fullText);
    
    identified.allLabels.forEach((keyword) => {
      addKeyword(keyword, 'experience', `${exp.position} at ${exp.company}`);
    });
  });

  return keywordMap;
}

export function getKeywordUsage(keyword: string, keywordMap: KeywordMap): KeywordUsage | null {
  return keywordMap[keyword] || null;
}
