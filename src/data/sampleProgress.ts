import type { StudentProgress } from "../types/course";

export const sampleProgress: StudentProgress = {
  major: "Computer Science B.S.",
  catalogYear: "2025-2026",
  completedCourses: ["CSE 8B", "CSE 12"],
  inProgressCourses: ["CSE 15L"],
  grades: {
    "CSE 8B": "A",
    "CSE 12": "B+",
  },
};