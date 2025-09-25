<script lang="ts">
  type Config = Record<string, Object>
  interface Props {
    position: any
    config: Config
    item: any
    cap: string
  }

  const { label, config, item, position, view, hidden }: Props = $props();

  function calculatePosition(x,y) {
    x = x < view.x + view.width / 2 ? '10px' : `calc(-100% - 10px)`
    y = y < view.y + view.height / 2 ? '10px' : `calc(-100% - 10px)`
    return `translate(${x}, ${y})`
  }
</script>
<!-- {#snippet leyend(name, color, estadistisca)}
  <li class="flex justify-between items-center gap-4 text-xs px-2 py-1">
    <div class="flex items-center gap-2 text-zinc-400">
      <div class="size-2 rounded-xs" style:background={color}></div>
      {name}
    </div>
    <div class="font-mono">{estadistisca}</div>
  </li>
{/snippet}
<div
  style:top="{position.y}px"
  style:left="{position.x}px"
  style:transform="{calculatePosition(position.x, position.y)}"
    class={["border border-zinc-700 absolute bg-zinc-950 rounded-sm pointer-events-none duration-1000 pt-1", { hidden}]} >
    <h3 class="text-xs px-2">{label}</h3>
  <div>
    <ul>
      {#each Object.entries(config) as [key, v]}
        {@render leyend(v.label, v.color, item[key])}
      {/each}
    </ul>
  </div>
</div> -->
<style>

</style>
