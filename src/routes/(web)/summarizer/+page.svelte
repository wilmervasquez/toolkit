<script lang="ts">
  import { setColorSchemeContext } from "$modules/shared/contexts/color-scheme";
  import { IconEscalator, IconRectangleVertical } from "@tabler/icons-svelte";

  setColorSchemeContext()

  let completium = $state([])


</script>
<main class="max-w-6xl m-auto p-4">
  <div class="mk">
    <div class="flex">
      <IconEscalator/>
      Spanish
    </div>
    <IconRectangleVertical/>
    <div class="flex">
      <IconEscalator/>
      English
    </div>
  </div>
  <div class="grid grid-cols-2 gap-2">
    <div class="flex">
      <textarea placeholder="Write..." class="px-3 py-2 bg-zinc-900 rounded-lg"></textarea>
    </div>
    <textarea placeholder="Traduction..." class="px-3 py-2 bg-zinc-900 rounded-lg"></textarea>
  </div>
</main>
<style>
  main {
    grid-template-columns: 1fr 1fr;
  }
</style>
