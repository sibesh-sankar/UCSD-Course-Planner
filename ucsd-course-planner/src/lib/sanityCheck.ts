// Run with: npx tsx src/lib/sanityCheck.ts
// Not part of the app UI — just a quick way to confirm the data model works.

import { sampleCourses } from "../data/sampleCourses";
import { canTake, getEligibleCourses, buildPrereqGraph } from "./prereqs";
import { calculateGPA } from "./progress";
import type { StudentProgress } from "../types/course";

const completed = ["CSE 8B", "CSE 12"];

console.log(
  "Can take CSE 15L?",
  canTake(sampleCourses.find((c) => c.code === "CSE 15L")!, completed)
); // true (only needs CSE 8B)

console.log(
  "Can take CSE 100?",
  canTake(sampleCourses.find((c) => c.code === "CSE 100")!, completed)
); // false (still needs CSE 15L)

console.log(
  "Eligible courses:",
  getEligibleCourses(sampleCourses, completed).map((c) => c.code)
);

console.log("Prereq graph:", buildPrereqGraph(sampleCourses));

const progress: StudentProgress = {
  major: "Computer Science B.S.",
  catalogYear: "2025-2026",
  completedCourses: completed,
  inProgressCourses: [],
  grades: { "CSE 8B": "A", "CSE 12": "B+" },
};

console.log("GPA:", calculateGPA(progress, sampleCourses));
