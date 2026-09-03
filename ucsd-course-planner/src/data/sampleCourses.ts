import type { Course } from "../types/course";

export const sampleCourses: Course[] = [
  {
    code: "CSE 8B",
    title: "Intro to Programming II",
    units: 4,
    termsTypicallyOffered: ["FA", "WI", "SP"],
  },
  {
    code: "CSE 12",
    title: "Basic Data Structures and OOP",
    units: 4,
    prerequisites: { type: "course", code: "CSE 8B" },
    termsTypicallyOffered: ["FA", "WI", "SP"],
  },
  {
    code: "CSE 15L",
    title: "Software Tools and Techniques Lab",
    units: 2,
    prerequisites: { type: "course", code: "CSE 8B" },
    termsTypicallyOffered: ["FA", "WI", "SP"],
  },
  {
    code: "CSE 100",
    title: "Advanced Data Structures",
    units: 4,
    prerequisites: {
      type: "and",
      exprs: [
        { type: "course", code: "CSE 12" },
        { type: "course", code: "CSE 15L" },
      ],
    },
    termsTypicallyOffered: ["FA", "WI", "SP"],
  },
  {
    code: "CSE 101",
    title: "Design and Analysis of Algorithms",
    units: 4,
    prerequisites: { type: "course", code: "CSE 100" },
    termsTypicallyOffered: ["FA", "WI", "SP"],
  },
  {
    code: "MATH 20C",
    title: "Calculus and Analytic Geometry III",
    units: 4,
    termsTypicallyOffered: ["FA", "WI", "SP", "SU"],
  },
];
