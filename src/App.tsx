import { useMemo, useState } from "react";
import { sampleCourses } from "./data/sampleCourses";
import { sampleDegreePlan } from "./data/sampleDegreePlan";
import { sampleProgress } from "./data/sampleProgress";
import { getEligibleCourses } from "./lib/prereqs";
import { calculateGPA, evaluateDegreePlan } from "./lib/progress";
import { EligiblePanel } from "./components/EligiblePanel";
import { RequirementPanel } from "./components/RequirementPanel";
import { ScheduleBoard } from "./components/ScheduleBoard";
import type { ScheduledQuarter } from "./types/course";
import "./App.css";

const initialQuarters: ScheduledQuarter[] = [
  { year: 2026, quarter: "FA", courseCodes: ["CSE 15L"] },
  { year: 2027, quarter: "WI", courseCodes: [] },
  { year: 2027, quarter: "SP", courseCodes: [] },
];

function App() {
  const [quarters, setQuarters] = useState(initialQuarters);

  const plannedCodes = useMemo(
    () => new Set(quarters.flatMap((q) => q.courseCodes)),
    [quarters]
  );

  const eligibleCourses = useMemo(() => {
    const eligible = getEligibleCourses(
      sampleCourses,
      sampleProgress.completedCourses
    );
    return eligible.filter((c) => !plannedCodes.has(c.code));
  }, [plannedCodes]);

  const requirements = useMemo(
    () => evaluateDegreePlan(sampleDegreePlan, sampleProgress),
    []
  );

  const gpa = useMemo(
    () => calculateGPA(sampleProgress, sampleCourses),
    []
  );

  function addToNextOpenQuarter(courseCode: string) {
    setQuarters((prev) => {
      const next = [...prev];
      const target = next[0];
      next[0] = { ...target, courseCodes: [...target.courseCodes, courseCode] };
      return next;
    });
  }

  function removeFromQuarter(quarterIndex: number, courseCode: string) {
    setQuarters((prev) => {
      const next = [...prev];
      const target = next[quarterIndex];
      next[quarterIndex] = {
        ...target,
        courseCodes: target.courseCodes.filter((c) => c !== courseCode),
      };
      return next;
    });
  }

  return (
    <div className="app">
      <header className="masthead">
        <div className="masthead-eyebrow">
          {sampleDegreePlan.major} · Catalog {sampleDegreePlan.catalogYear}
        </div>
        <div className="masthead-row">
          <h1>Degree Planner</h1>
          <div className="gpa-badge">
            <span className="gpa-value">{gpa.toFixed(2)}</span>
            <span className="gpa-label">GPA</span>
          </div>
        </div>
      </header>

      <main className="layout">
        <section className="panel">
          <h2>Eligible now</h2>
          <EligiblePanel
            eligibleCourses={eligibleCourses}
            onAddToQuarter={addToNextOpenQuarter}
          />
        </section>

        <section className="panel">
          <h2>Degree progress</h2>
          <RequirementPanel requirements={requirements} />
        </section>
      </main>

      <section className="schedule-section">
        <h2>Quarter plan</h2>
        <ScheduleBoard
          quarters={quarters}
          catalog={sampleCourses}
          onRemove={removeFromQuarter}
        />
      </section>
    </div>
  );
}

export default App;