// Quarters offered at UCSD
export type Quarter = "FA" | "WI" | "SP" | "SU";

// A prerequisite requirement can be a single course, or a boolean
// combination of courses (e.g. "CSE 12 AND (CSE 15L OR CSE 8B)")
export type PrereqExpr =
  | { type: "course"; code: string }
  | { type: "and"; exprs: PrereqExpr[] }
  | { type: "or"; exprs: PrereqExpr[] };

export interface Course {
  code: string; // e.g. "CSE 100"
  title: string; // e.g. "Advanced Data Structures"
  units: number;
  description?: string;
  prerequisites?: PrereqExpr; // undefined = no prereqs
  termsTypicallyOffered: Quarter[]; // e.g. ["FA", "WI", "SP"]
  geCategories?: string[]; // general education categories satisfied, if any
}

// A single requirement bucket within a degree plan
// e.g. "Upper Division CSE Electives: choose 4 from this list, min 16 units"
export interface RequirementGroup {
  id: string;
  name: string;
  description?: string;
  courseOptions: string[]; // course codes that satisfy this group
  coursesNeeded?: number; // how many courses from courseOptions are required
  unitsNeeded?: number; // alternative: satisfy by total units instead of count
}

export interface DegreePlan {
  major: string; // e.g. "Computer Science B.S."
  catalogYear: string; // e.g. "2025-2026"
  requirementGroups: RequirementGroup[];
}

// A student's real-world progress against a DegreePlan
export interface StudentProgress {
  major: string;
  catalogYear: string;
  completedCourses: string[]; // course codes finished with a passing grade
  inProgressCourses: string[]; // course codes currently enrolled in
  grades?: Record<string, string>; // course code -> letter grade, for GPA calc
}

// One planned quarter in a student's schedule
export interface ScheduledQuarter {
  year: number;
  quarter: Quarter;
  courseCodes: string[];
}

export interface SchedulePlan {
  studentId: string;
  quarters: ScheduledQuarter[];
}