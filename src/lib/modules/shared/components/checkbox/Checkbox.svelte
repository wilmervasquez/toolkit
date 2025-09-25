<script lang="ts">
  let value = $state(false)

  function change() {
    value = !value
  }
</script>
<button onclick={change} aria-label="." class={[value ? 'inset-shadow-sm inset-shadow-purple-400 bg-purple-500': 'bg-zinc-900 border border-zinc-700', "grid place-items-center cursor-pointer size-4.5 rounded-md"]}>
  {#if value}
    <svg width="8" viewBox="0 0 7 5" fill="none">
      <path d="M1 2L3 4L6.5 0.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  {/if}
</button>
<style>

</style>
