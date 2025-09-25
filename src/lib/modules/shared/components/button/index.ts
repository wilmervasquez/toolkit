export { default as Button } from './Button.svelte'
export { default as ButtonLink } from './ButtonLink.svelte'

export const variants = {
  primary: "bg-purple-500 inset-shadow-sm inset-shadow-purple-300 shadow-sm shadow-zinc-900",
  secondary: "text-zinc-200 bg-zinc-700 inset-shadow-sm inset-shadow-zinc-500 shadow-sm shadow-zinc-900",
  destructive: "bg-red-400 hover:bg-red-500",
  outline: "border border-zinc-800",
  ghost: "text-zinc-300 hover:bg-zinc-800",
  link: "underline",
} as const
