<script lang="ts">
  import type { ClassValue } from "svelte/elements";

  interface Props {
    open: boolean
    children: any
    [key: string]: any
    class?: ClassValue
  }

  let { open = $bindable(), children, ...props }: Props = $props();

  function onclickBackdrop(this: HTMLDivElement, { target }: MouseEvent) {
    if(this == target) {
      open = false
    }
  }
</script>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={onclickBackdrop} data-open={open} class={['bg-modal grid place-items-center fixed inset-0 bg-zinc-950/80']}>
  <div class={["modal border border-zinc-200 shadow dark:border-zinc-800 bg-white dark:bg-[#161619] rounded-xl", props.class]}>
    {@render children()}
  </div>
</div>
<style>
  .bg-modal[data-open=true] {
    backdrop-filter: blur(5px);
    transition: .3s ease-in-out;
    transition-property: backdrop-filter, background-color ;
    @starting-style {
      backdrop-filter: blur(0px);
      background-color: transparent;
    }
  }

  .bg-modal[data-open=true] .modal {
    scale: 1;
    opacity: 1;
    transition: .3s ease-in-out;
    @starting-style {
      scale: 0.5;
      opacity: 0;
    }
  }
  .bg-modal[data-open=false] {
    display: none;
    backdrop-filter: blur(0px);
    background-color: transparent;
    transition: .3s ease allow-discrete ;
    transition-property: backdrop-filter, background-color, display, opacity;
  }

  .bg-modal[data-open=false] .modal {
    scale: 0.5;
    display: none;
    opacity: 0;
    transition: scale .5s ease, display .3s ease allow-discrete;
  }

</style>
