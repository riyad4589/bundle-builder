export function StepIcon({ name }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "camera":
      return (
        <svg {...common}>
          <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v6c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6Z" />
        </svg>
      );
    case "sensor":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2.5" />
          <path d="M7 7a7 7 0 0 0 0 10M17 7a7 7 0 0 1 0 10" />
        </svg>
      );
    case "plus-shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v6c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6Z" />
          <path d="M12 9v6M9 12h6" />
        </svg>
      );
    default:
      return null;
  }
}

export function ChevronIcon({ open }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
