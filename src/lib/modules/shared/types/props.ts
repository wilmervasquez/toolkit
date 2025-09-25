import type { Snippet } from "svelte";
import type { ClassValue } from "svelte/elements";

export interface WithChildren {
  children: Snippet
}

export interface WithChildrenOptional {
  children?: Snippet
}

export interface WithClass {
  class?: ClassValue
}

export interface WithChildrenAndClass {
  class?: ClassValue
  children: Snippet
}
