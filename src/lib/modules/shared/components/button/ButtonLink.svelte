<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
  import { variants } from ".";
  import { radii, sizes, type Radius, type Size } from "./button";

  interface Props extends HTMLAnchorAttributes {
    variant?: keyof typeof variants
    disabled?: boolean,
    size?: Size,
    radius?: Radius
    children: Snippet,
  }

  const {
    disabled = false,
    size = 'md',
    radius,
    variant = 'primary',
    children,
    ...attrs
  }: Props = $props();

</script>
<a {...attrs} class={[sizes[size], radii[radius ?? size], variants[variant], 'flex items-center cursor-pointer font-semibold', disabled && 'pointer-events-none opacity-80']}>
  {@render children()}
</a>
<style>

</style>
