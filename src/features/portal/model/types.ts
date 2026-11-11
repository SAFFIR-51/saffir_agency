/** 프로젝트 단계 (기획서: 착수 → 기획 → 디자인 → 개발 → 검수 → 운영) */
export const PROJECT_STAGES = [
  "kickoff",
  "planning",
  "design",
  "development",
  "qa",
  "operation",
] as const;
export type ProjectStage = (typeof PROJECT_STAGES)[number];

export type Project = {
  id: string;
  name: string;
  stage: ProjectStage;
  progress: number; // 0~100
  startDate: string;
  dueDate: string;
};
