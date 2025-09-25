<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    variant?: 'primary' | 'secondary' | 'destructive' | 'outline'
    children: Snippet
  }

  const { variant = 'primary', children }: Props = $props();

  const variants = {
    primary: 'bg-purple-500',
    secondary: 'bg-zinc-800',
    destructive: 'bg-red-400',
    outline: 'border border-zinc-700',
  }
</script>
<div class="flex items-center px-2 text-xs h-5.5 rounded-lg font-semibold {variants[variant]}">
  {@render children()}
</div>
<style>

</style>
