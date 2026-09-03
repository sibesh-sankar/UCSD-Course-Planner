import type { Course, ScheduledQuarter } from "../types/course";

interface Props {
  quarters: ScheduledQuarter[];
  catalog: Course[];
  onRemove: (quarterIndex: number, courseCode: string) => void;
}

const QUARTER_LABELS: Record<string, string> = {
  FA: "Fall",
  WI: "Winter",
  SP: "Spring",
  SU: "Summer",
};

export function ScheduleBoard({ quarters, catalog, onRemove }: Props) {
  const courseByCode = new Map(catalog.map((c) => [c.code, c]));

  return (
    <div className="quarter-board">
      {quarters.map((q, i) => {
        const units = q.courseCodes.reduce(
          (sum, code) => sum + (courseByCode.get(code)?.units ?? 0),
          0
        );
        return (
          <div className="quarter-column" key={`${q.year}-${q.quarter}`}>
            <div className="quarter-column-head">
              <span>
                {QUARTER_LABELS[q.quarter]} {q.year}
              </span>
              <span className="quarter-units">{units} units</span>
            </div>
            {q.courseCodes.length === 0 && (
              <p className="quarter-empty">No courses planned yet.</p>
            )}
            <ul className="quarter-course-list">
              {q.courseCodes.map((code) => (
                <li className="quarter-course" key={code}>
                  <span>{code}</span>
                  <button
                    className="remove-button"
                    aria-label={`Remove ${code} from ${QUARTER_LABELS[q.quarter]} ${q.year}`}
                    onClick={() => onRemove(i, code)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}