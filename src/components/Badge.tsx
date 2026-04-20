import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger";
};

const toneClassMap: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "badge-neutral",
  success: "badge-success",
  warning: "badge-warning",
  danger: "badge-danger",
};

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return <span className={`badge ${toneClassMap[tone]}`}>{children}</span>;
}
