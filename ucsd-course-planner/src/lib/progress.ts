import type { Course, DegreePlan, RequirementGroup, StudentProgress } from "../types/course";

export interface RequirementProgress {
  group: RequirementGroup;
  completedFromGroup: string[];
  coursesSatisfied: number;
  coursesNeeded: number;
  isComplete: boolean;
}

/** Checks progress on a single requirement group. */
export function evaluateRequirementGroup(
  group: RequirementGroup,
  completedCourses: string[]
): RequirementProgress {
  const completedSet = new Set(completedCourses);
  const completedFromGroup = group.courseOptions.filter((c) =>
    completedSet.has(c)
  );
  const coursesNeeded = group.coursesNeeded ?? group.courseOptions.length;

  return {
    group,
    completedFromGroup,
    coursesSatisfied: completedFromGroup.length,
    coursesNeeded,
    isComplete: completedFromGroup.length >= coursesNeeded,
  };
}

/** Evaluates every requirement group in a degree plan. */
export function evaluateDegreePlan(
  plan: DegreePlan,
  progress: StudentProgress
): RequirementProgress[] {
  return plan.requirementGroups.map((group) =>
    evaluateRequirementGroup(group, progress.completedCourses)
  );
}

// Standard 4.0-scale grade points
const GRADE_POINTS: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  D: 1.0,
  F: 0.0,
};

/** Computes a simple unweighted GPA from a student's grades + course units. */
export function calculateGPA(
  progress: StudentProgress,
  catalog: Course[]
): number {
  const unitsByCode = new Map(catalog.map((c) => [c.code, c.units]));
  const grades = progress.grades ?? {};

  let totalPoints = 0;
  let totalUnits = 0;

  for (const [code, grade] of Object.entries(grades)) {
    const points = GRADE_POINTS[grade];
    const units = unitsByCode.get(code);
    if (points === undefined || units === undefined) continue; // skip P/NP, unknown courses
    totalPoints += points * units;
    totalUnits += units;
  }

  return totalUnits === 0 ? 0 : Number((totalPoints / totalUnits).toFixed(3));
}
