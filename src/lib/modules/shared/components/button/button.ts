import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

export const radii = {
  none: "",
  sm: "rounded-lg",
  md: "rounded-lg",
  lg: "rounded-[14px]",
  full: "rounded-full",
} as const;


export const sizes = {
  sm: "h-7 px-3 gap-2 text-xs",
  md: "h-8 px-3 gap-2 text-sm",
  lg: "h-9 px-6 gap-3 text-base ",
  icon: "h-8 w-8 text-base grid place-items-center",
} as const

export const colors = {
  primary: { fg: "text-primary", bg: 'bg-primary'},
  secondary: { fg: "text-secondary", bg: 'bg-secondary'},
  succes: { fg: "text-green-600", bg: 'bg-green-600'},
  warning: { fg: "text-yellow-600", bg: 'bg-yellow-600'},
  danger: { fg: "text-red-600", bg: 'bg-red-600'},
  info: { fg: "text-red-600", bg: 'bg-red-600'},
} as const

export const variants = {
  classic: "text-shadow-2xs bg-linear-to-b from-white/10 to-white/20 to-70% text-green-950 shadow-md ring inset-shadow-2xs ring-black/20 inset-shadow-white/10 dark:text-white dark:text-shadow-2xs",
  solid: "text-primary-foreground hover:bg-primary/90 text-white",
  soft: "bg-current/20 hover:bg-current/30",
  surface: "border border-current/50 bg-current/10 hover:bg-current/20",
  outline: "border border-current/50 hover:bg-current/10",
  ghost: "text-current hover:bg-current/10",
} as const

export function getVariantClass(variant: keyof typeof variants, color: keyof typeof colors) {
  if (variant == 'solid') {
    return 'text-white' + variants[variant] + ' ' + colors[color].bg;
  }

  return `${colors[color].fg} ${variants[variant]}`;
}

export type Radius = keyof typeof radii;
export type Size = keyof typeof sizes;
export type Color = keyof typeof colors;

export interface CustomProps {
  text: string
  color?: string
}

export interface ButtonProps extends HTMLButtonAttributes {
  color?: Color
  disabled?: boolean,
  size?: Size,
  radius?: Radius
  variant?: keyof typeof variants
  href?: string
  children: Snippet,
}
