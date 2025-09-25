<script lang="ts">
  interface Props {
    text: string
  }

  const { text }: Props = $props();
</script>
<p>
  {#each text as l, i}
    <span style="animation-duration: {3}s; animation-delay: {3 / text.length * i}s;">{l}</span>
  {/each}
</p>
<style>
  span {
    animation-name: opac;
    animation-iteration-count: infinite;
    color: var(--color-zinc-800);
  }
  @keyframes opac {
    0%,100% {
      color: var(--color-zinc-700);
    }
    50% {
      color: currentColor;
    }
  }


</style>
