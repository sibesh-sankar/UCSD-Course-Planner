import type { Course, PrereqExpr } from "../types/course";

/**
 * Recursively evaluates whether a prerequisite expression is satisfied
 * given a set of completed course codes.
 */
export function isPrereqSatisfied(
  expr: PrereqExpr | undefined,
  completed: Set<string>
): boolean {
  if (!expr) return true;

  switch (expr.type) {
    case "course":
      return completed.has(expr.code);
    case "and":
      return expr.exprs.every((e) => isPrereqSatisfied(e, completed));
    case "or":
      return expr.exprs.some((e) => isPrereqSatisfied(e, completed));
  }
}

/**
 * Returns true if the student can enroll in `course` given what they've
 * already completed (does not check quarter availability or unit caps).
 */
export function canTake(course: Course, completedCourses: string[]): boolean {
  const completed = new Set(completedCourses);
  if (completed.has(course.code)) return false; // already taken
  return isPrereqSatisfied(course.prerequisites, completed);
}

/**
 * Given the full course catalog and a student's completed courses,
 * returns every course the student is currently eligible to take.
 */
export function getEligibleCourses(
  catalog: Course[],
  completedCourses: string[]
): Course[] {
  return catalog.filter((c) => canTake(c, completedCourses));
}

/**
 * Flattens a PrereqExpr into the list of course codes referenced,
 * useful for rendering a prerequisite graph (nodes + edges).
 */
export function flattenPrereqCodes(expr: PrereqExpr | undefined): string[] {
  if (!expr) return [];
  if (expr.type === "course") return [expr.code];
  return expr.exprs.flatMap(flattenPrereqCodes);
}

/**
 * Builds a simple adjacency list (course code -> prerequisite course codes)
 * for the whole catalog, suitable for feeding into a graph-drawing library.
 */
export function buildPrereqGraph(
  catalog: Course[]
): Record<string, string[]> {
  const graph: Record<string, string[]> = {};
  for (const course of catalog) {
    graph[course.code] = flattenPrereqCodes(course.prerequisites);
  }
  return graph;
}