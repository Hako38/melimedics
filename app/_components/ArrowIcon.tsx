export type ArrowDirection = "right" | "up-right" | "left";

export function ArrowIcon({ direction = "up-right" }: { direction?: ArrowDirection }) {
  const path = direction === "right"
    ? "M2.75 8h10.5M9.25 4l4 4-4 4"
    : direction === "left"
      ? "M13.25 8H2.75M6.75 4l-4 4 4 4"
      : "M4 12 12 4M6 4h6v6";

  return <svg className="arrow-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d={path}/></svg>;
}
