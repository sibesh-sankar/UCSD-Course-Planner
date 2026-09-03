import type { DegreePlan } from "../types/course";

export const sampleDegreePlan: DegreePlan = {
  major: "Computer Science B.S.",
  catalogYear: "2025-2026",
  requirementGroups: [
    {
      id: "lower-div-core",
      name: "Lower-Division Programming Core",
      description: "Foundational programming sequence, all required.",
      courseOptions: ["CSE 8B", "CSE 12", "CSE 15L"],
      coursesNeeded: 3,
    },
    {
      id: "upper-div-core",
      name: "Upper-Division CSE Core",
      description: "Core algorithms and data structures sequence.",
      courseOptions: ["CSE 100", "CSE 101"],
      coursesNeeded: 2,
    },
    {
      id: "math",
      name: "Math Foundations",
      description: "At least one calculus course from this list.",
      courseOptions: ["MATH 20C"],
      coursesNeeded: 1,
    },
  ],
};