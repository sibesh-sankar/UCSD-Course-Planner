import { useMemo, useState } from "react";
import type { Course } from "../types/course";

interface Props {
  eligibleCourses: Course[];
  onAddToQuarter: (courseCode: string) => void;
}

export function EligiblePanel({ eligibleCourses, onAddToQuarter }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return eligibleCourses;
    return eligibleCourses.filter(
      (c) =>
        c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q)
    );
  }, [eligibleCourses, query]);

  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="Search eligible courses…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search eligible courses"
      />
      <ul className="course-list">
        {filtered.length === 0 && (
          <li className="course-empty">Nothing matches "{query}".</li>
        )}
        {filtered.map((c) => (
          <li className="course-row" key={c.code}>
            <div>
              <span className="course-code">{c.code}</span>
              <span className="course-title">{c.title}</span>
            </div>
            <button
              className="add-button"
              onClick={() => onAddToQuarter(c.code)}
            >
              Add to plan
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}