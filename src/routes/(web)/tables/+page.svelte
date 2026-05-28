<script lang="ts">
  import * as echarts from "echarts";

  import { ButtonLink } from "$modules/shared/components/button";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$modules/shared/components/select';
  import { setColorSchemeContext } from "$modules/shared/contexts/color-scheme";
  import { TabsState } from '$modules/shared/states/localStorage.svelte';
  import { TableState } from '$modules/tables/states/Table.svelte';
  import { IconPlus, IconTable, IconTrash } from "@tabler/icons-svelte";

  const theme = setColorSchemeContext()

  let tabs = new TabsState();

  let chartDiv: HTMLDivElement;
  let chart: echarts.ECharts;

  let numbersString = $state('0,100')

  let cad: number[] = $derived(numbersString.split(',').map(n => Number(n)).filter(n=>typeof n === "number" && isFinite(n)))




  const table = new TableState()

</script>
<main class="max-w-6xl m-auto p-4">
  <div class="flex items-center gap-3">
    <h2 class="text-2xl font-bold p-2">Statistics</h2>
    <IconTable/>
  </div>
  <div class="flex p-2 gap-2 justify-between">
    <div class="flex gap-2">
      {#each tabs.value as tab}
        <ButtonLink variant="secondary">
          <IconTable/>
          {tab.title}
          <button onclick={() => tabs.removeTab(tab.id)}>
            <IconTrash/>
          </button>
        </ButtonLink>
      {/each}
    </div>
    <button onclick={() => tabs.addNewTab()} class="border text-purple-500 border-purple-500 rounded-lg p-1">
      <IconPlus/>
    </button>
  </div>
  <div class="font- flex flex-col gap-2 p-2">
    <div class="flex items-center justify-between pb-2">
        <h2 class="text-xl font-bold">Datos <span class="text-neutral-400">{cad.length}</span></h2>
        <div class="flex gap-2">
          <Select value="poblacional">
          <SelectTrigger>
            <SelectValue placeholder="Type"/>
          </SelectTrigger>
          <SelectContent position="left">
            <SelectItem value="poblacional">Parametro</SelectItem>
            <SelectItem value="estadistico">Poblacional</SelectItem>
          </SelectContent>
        </Select>
        <Select value="poblacional">
          <SelectTrigger>
            <SelectValue placeholder="Decimal"/>
          </SelectTrigger>
          <SelectContent position="left">
            <SelectItem value="poblacional">0.1</SelectItem>
            <SelectItem value="estadistico">0.01</SelectItem>
            <SelectItem value="estadistico">0.001</SelectItem>
            <SelectItem value="estadistico">0.0001</SelectItem>
            <SelectItem value="estadistico">0.00001</SelectItem>
          </SelectContent>
        </Select>
        <Select value="poblacional">
          <SelectTrigger>
            <SelectValue placeholder="Type"/>
          </SelectTrigger>
          <SelectContent position="left">
            <SelectItem value="poblacional">Parametro</SelectItem>
            <SelectItem value="estadistico">Poblacional</SelectItem>
          </SelectContent>
        </Select>
        <Select value="poblacional">
          <SelectTrigger>
            <SelectValue placeholder="Type"/>
          </SelectTrigger>
          <SelectContent position="left">
            <SelectItem value="poblacional">Parametro</SelectItem>
            <SelectItem value="estadistico">Poblacional</SelectItem>
          </SelectContent>
        </Select>
        </div>
      </div>
    <section class="border border-neutral-800 p-2 rounded-lg bg-neutral-900">

      <table class="font-times w-full">
        <thead>
          <tr>
            {#each table.columns as column}
              <th class="px-2">{column.name}</th>
            {/each}
            <td>
              <button onclick={() => table.addColumn()} class="flex items-center gap-1 text-xs rounded-lg p-1 border border-neutral-600">
                <IconPlus class="size-4"/>
              </button>
            </td>
          </tr>
        </thead>
        <tbody>
          {#each { length: table.numberOfRows }, i}
            <tr>
              {#each table.columns as column}
                <td>
                  <input data-column="{column.id}" data-row={i} type="text" value={column.values[i]} class="w-20 text-right outline-zinc-800 py-0.5 px-1 focus:outline-purple-500 focus:bg-neutral-800">
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </section>
    <div class="flex justify-center">

      <button onclick={() => table.addRow()} class="flex items-center gap-1 text-xs rounded-lg px-2 py-1 border border-neutral-600">
        <IconPlus class="size-4"/>
        Add New Row
      </button>
    </div>

  </div>

  <div bind:this={chartDiv} class="w-[400px] h-[300px]"></div>
</main>
<style>

</style>
