import type { ComponentProps } from "react";

/** Base card style shared by every card on the site. */
export const cardClass = "relative overflow-hidden rounded-card";

export function Card({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`${cardClass} ${className}`} {...props} />;
}
