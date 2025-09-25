<script lang="ts">
  import type { ButtonProps } from "./button";
  import { getVariantClass, radii, sizes } from "./button";

  const {
    color = 'primary',
    disabled = false,
    size = 'md',
    radius,
    variant = 'solid',
    href,
    children,
    ...attrs
  }: ButtonProps = $props();

</script>
{#if href}
  <a {href}>{@render children()}</a>
{:else}
  <button
    {...attrs}
    class={[sizes[size], radii[radius ?? size], getVariantClass(variant, color), 'flex items-center cursor-pointer font-semibold', disabled && 'pointer-events-none opacity-80']}
  >
    {@render children()}
  </button>
{/if}


<style>

</style>
