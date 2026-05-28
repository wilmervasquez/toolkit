<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { getSelectContext } from "./Select.svelte";

  interface Props {
    position?: 'right' | 'left'
    class?: ClassValue
    children: Snippet
  }

  let { position = 'right', children, ...props }: Props = $props();

  let select = getSelectContext();
  console.log(select);
</script>
<div class={[select.opened ? 'fade' : 'fade-out', position == 'right' ? 'left-0':'right-0','select-content absolute flex flex-col border border-zinc-800 shadow-sm bg-zinc-900 shadow-black rounded-lg p-1', props.class]}>
  {@render children()}
</div>
<style>
  .select-content {
    top: calc(100% + 4px);
  }

  .fade-out {
    animation: fadeOut .1s ease-out forwards;
  }
  .fade {
    animation: fadeIn .3s ease-out forwards;
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
    }
    to {
      opacity: 0;
      visibility: hidden;
      transform: translateY(-4px);
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      visibility: hidden;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
    }
  }
</style>
