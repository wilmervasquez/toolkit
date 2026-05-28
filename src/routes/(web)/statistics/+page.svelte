<script lang="ts">
  import * as d3 from 'd3';
  import * as echarts from "echarts";

  import { ButtonLink } from "$modules/shared/components/button";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$modules/shared/components/select';
  import { setColorSchemeContext } from "$modules/shared/contexts/color-scheme";
  import { TabsState } from '$modules/shared/states/localStorage.svelte';
  import ChartBarFeecuency from '$modules/statistics/components/chart/ChartBarFeecuency.svelte';
  import ChartCircleFeecuency from '$modules/statistics/components/chart/ChartCircleFeecuency.svelte';
  import ChartDispersion from '$modules/statistics/components/chart/ChartDispersion.svelte';
  import { IconCopy, IconPlus, IconTable, IconTrash } from "@tabler/icons-svelte";
  import { mean, median, std, variance } from "mathjs";
  import { onMount } from 'svelte';

  const theme = setColorSchemeContext()

  let tabs = new TabsState();


  let chartDiv: HTMLDivElement;
  let chart: echarts.ECharts;

  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    title: { text: "Ventas semanales" },
    tooltip: {},
    xAxis: {
      type: "category",
      data: ["Lun", "Mar", "Mié", "Jue", "Vie"]
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Ventas",
        type: "bar",
        data: [12, 19, 3, 5, 2]
      }
    ]
  };

  let numbersString = $state('0,100')

  let cad: number[] = $derived(numbersString.split(',').map(n => Number(n)).filter(n=>typeof n === "number" && isFinite(n)))


  function desviacionEstandar(datos: number[], esMuestra = false) {
    const n = datos.length;

    const media = datos.reduce((a, b) => a + b, 0) / n;

    const sumaCuadrados = datos
      .map(x => Math.pow(x - media, 2))
      .reduce((a, b) => a + b, 0);

    const divisor = esMuestra ? (n - 1) : n;

    return Math.sqrt(sumaCuadrados / divisor);
  }



  let charty: ChartDispersion;
  let charty2: ChartCircleFeecuency;
  let charty3: ChartBarFeecuency;

  $effect(() => {
    charty.updateValues(cad)
    charty2.updateValues(cad)
    charty3.updateValues(cad)
  })

  onMount(() => {
    chart = echarts.init(chartDiv, theme.isDark() ? 'dark' : ''); // 👈 tema oscuro
    chart.setOption(option);

    // Hacerlo responsive
    const resize = () => chart.resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      chart.dispose();
    };
  })
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
    <section class="border border-neutral-800 p-2 rounded-lg bg-neutral-900">
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
      <textarea placeholder="0" class="w-full bg-zinc-800 hover:outline-1 rounded-lg outline-brand p-2 px-3" name="" id="" bind:value={numbersString}></textarea>
      <div class="data grid grid-cols-9 p-2">
        {#each cad.toSorted((a,b) => a - b) as n}
          <div class="text-sm text-center">{n}</div>
        {/each}
      </div>
      <p class="flex gap-5 px-1 text-base">
        <span class="text-purple-500">Σ = {cad.length}</span>
        <span class="text-green-500">&mu; = {mean(...cad).toFixed(4)}</span>
        <span class="text-yellow-500">x̄ = {median(...cad)}</span>
        <span class="text-yellow-500">Moda: {d3.mode(cad)}</span>
        <span class="text-violet-500">&sigma; = {std(...cad).toFixed(4)} </span>
        <span class="text-red-500">σ² = {Number(variance(...cad)).toFixed(4)} </span>

      </p>
    </section>
    <div class="grid grid-cols-3 gap-2">
      <section class="border border-neutral-800 p-2 rounded-lg bg-neutral-900">
        <div class="flex justify-between">
          <h2 class="text-xl font-bold">Medidas estadisticos</h2>

        </div>
        <table class="text-sm">
          <tbody>
            <tr>
              <td>Media</td>
              <td>23</td>
              <td>230</td>
            </tr>
            <tr>
              <td>Mediana</td>
              <td>23</td>
              <td>230</td>
            </tr>
            <tr>
              <td>Moda</td>
              <td>23</td>
              <td>230</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section class="border border-neutral-800 p-2 rounded-lg bg-neutral-900">
        <div class="fl">
          <h2 class="text-base font-bold">Frequency Distribution Table</h2>
          <table class="w-full text-sm">
            <thead>
              <tr>
                <th class="italic px-2 text-center">id</th>
                <td class="italic px-2 text-center"><p>n<sub>i</sub></p></td>
                <td class="italic px-2 text-center"><p>f<sub>j</sub></p></td>
                <td class="italic px-2 text-center"><p>p<sub>j</sub></p></td>
                <td class="italic px-2 text-center"><p>P<sub>j</sub></p></td>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-2 text-center">1</td>
                <td class="px-2 text-center">23</td>
                <td class="px-2 text-center">2789.30</td>
                <td class="px-2 text-center">0.34</td>
                <td class="px-2 text-center">34%</td>
              </tr>
               <tr>
                <td class="px-2 text-center">1</td>
                <td class="px-2 text-center">23</td>
                <td class="px-2 text-center">230</td>
                <td class="px-2 text-center">0.34</td>
                <td class="px-2 text-center">34%</td>
              </tr>
               <tr>
                <td class="px-2 text-center">1</td>
                <td class="px-2 text-center">23</td>
                <td class="px-2 text-center">230</td>
                <td class="px-2 text-center">0.34</td>
                <td class="px-2 text-center">34%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="border border-neutral-800 p-2 rounded-lg bg-neutral-900">
        <div class="flex justify-between">
          <h2 class="text-xl font-bold">Dispercion</h2>

        </div>
        <p></p>
        <p class="font-">Σ={d3.sum(cad)}</p>
        <p class="font-">σ={desviacionEstandar(cad)}</p>
        <p class="font-">µ={(d3.sum(cad)/cad.length).toFixed(2)} / <span class="text-neutral-500">{(d3.sum(cad)/cad.length)}</span></p>
      </section>
    </div>
    <!-- Charts -->
    <div class="grid grid-cols-3 gap-2">

      <section class="border border-neutral-800 p-2 rounded-lg bg-neutral-900">
        <div class="flex justify-between">

          <h2 class="text-xl font-bold">Dispercion</h2>

        </div>
        <ChartDispersion bind:this={charty} values={cad}/>
      </section>
      <section class="border border-neutral-800 p-2 rounded-lg bg-neutral-900">
        <ChartCircleFeecuency bind:this={charty2} values={cad}/>
      </section>
      <section class="border border-neutral-800 p-2 rounded-lg bg-neutral-900">
        <ChartBarFeecuency bind:this={charty3} values={cad}/>
      </section>
    </div>
    <section class="border border-neutral-800 p-2 rounded-lg bg-neutral-900">
      <div class="flex justify-between">
        <h2 class="text-xl font-bold">Distrivucion Muestral</h2>
        <ButtonLink size="icon">
          <IconCopy/>
        </ButtonLink>
      </div>
      <table>
        <thead>
          <tr>
            <td>Intervalo</td>
            <td>Marca de clase</td>
            <td>Frecuencia</td>
            <td>FRecuencia acumlada</td>
            <td>Porcentaje</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>[123.4 - 3498)</td>
            <td>23</td>
            <td>230</td>
            <td>22</td>
            <td>212</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>

  <div bind:this={chartDiv} class="w-[400px] h-[300px]"></div>
</main>
<style>
  .font-{
    font-family: 'Times New Roman', Times, serif;
  }
  td {
    padding: 0 4px;
  }
  .data {
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  }
</style>
