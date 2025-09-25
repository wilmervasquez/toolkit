<script lang="ts">
  interface Props {
    children: any
  }

  const { children }: Props = $props();
</script>
<p class="text-zinc-300 max-w-96 text-sm">{@render children()}</p>
<style>

</style>
