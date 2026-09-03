import type { RequirementProgress } from "../lib/progress";

interface Props {
  requirements: RequirementProgress[];
}

export function RequirementPanel({ requirements }: Props) {
  return (
    <div className="requirement-list">
      {requirements.map((r) => (
        <div className="requirement-row" key={r.group.id}>
          <div className="requirement-row-top">
            <span className="requirement-name">{r.group.name}</span>
            <span
              className={
                "requirement-count " + (r.isComplete ? "is-complete" : "")
              }
            >
              {r.coursesSatisfied} / {r.coursesNeeded}
            </span>
          </div>
          {r.group.description && (
            <p className="requirement-desc">{r.group.description}</p>
          )}
          <div className="requirement-track">
            <div
              className="requirement-fill"
              style={{
                width: `${Math.min(
                  100,
                  (r.coursesSatisfied / r.coursesNeeded) * 100
                )}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}