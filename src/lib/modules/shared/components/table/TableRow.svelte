<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLTableRowElement> {
    children: Snippet
  }

  const { children, ...props }: Props = $props();
</script>
<tr class={['in-entry', props.class]} {...props}>{@render children()}</tr>
<style>
  @reference 'tailwindcss/theme';

  tr:hover :global(td) {
    background-color: var(--color-neutral-900);
  }

  tr:hover :global(td:first-child) {
     border-radius: 8px 0 0 8px;
  }

  tr:hover :global(td:last-child) {
     border-radius: 0 8px 8px 0;
  }

  @keyframes entry {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .in-entry {
    animation: entry 0.5s ease-in forwards;
    opacity: 0;
  }
</style>
