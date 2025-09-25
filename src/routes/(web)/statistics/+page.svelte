<script lang="ts">
  import * as d3 from 'd3';

  import { ButtonLink } from "$modules/shared/components/button";
  import { setColorSchemeContext } from "$modules/shared/contexts/color-scheme";
  import { IconCopy, IconPlus, IconTable } from "@tabler/icons-svelte";

  setColorSchemeContext()

  let completium = $state([])

  async function lsp(search: string) {
    completium = await fetch(`/api/v1/lsp?q=${search}`).then(r => r.json())
    console.log(completium);
  }

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


  let canvas: HTMLCanvasElement

  $effect(()=>{
    const ctx = canvas.getContext('2d')!

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle ="#888"
    const xScale = d3.scaleLinear([d3.min(cad) ?? 0, d3.max(cad) ?? 10], [6, canvas.width-6])
    for (let i = 0; i < cad.length; i++) {
      const n = cad[i];

      ctx.fillStyle = `orange`
      ctx.beginPath()
      ctx.arc(xScale(n), 10, 4, 0, Math.PI * 2);
      ctx.fill()
    }

    ctx.beginPath()
    ctx.moveTo(6,20)
    ctx.lineTo(canvas.width-6,20)
    ctx.stroke()

    ctx.lineWidth = 1
    for (let index = 0; index < canvas.width; index+=20) {
      ctx.beginPath()
      ctx.moveTo(index+6,17)
      ctx.lineTo(index+6,23)
      ctx.stroke()
    }

    ctx.font = '14px Times'
    ctx.textAlign = "center";
    ctx.fillStyle='#888'
    ctx.fillText(String(d3.min(cad)),6,35)
    ctx.fillText(String(d3.max(cad)),canvas.width-6,35)

  })
</script>
<main class="max-w-6xl m-auto p-4">
  <h2 class="text-2xl font-bold p-2">Statistics</h2>
  <div class="flex p-2 gap-2">
    <ButtonLink variant="secondary">
      <IconTable/>
      edad
    </ButtonLink>
    <ButtonLink variant="secondary">
      <IconTable/>
      caminos
    </ButtonLink>
    <ButtonLink variant="secondary">
      <IconTable/>
      sources
    </ButtonLink>
     <ButtonLink variant="outline">
      <IconPlus/>
    </ButtonLink>
  </div>
  <div class="font- flex flex-col gap-2 p-2">
    <section class="border border-neutral-800 p-2 rounded-lg bg-neutral-900">
      <h2 class="text-xl font-bold">Datos</h2>
      <textarea class="w-full bg-zinc-800 hover:outline-1 rounded-lg outline-brand p-2 px-3" name="" id="" bind:value={numbersString}></textarea>
      <div class="data grid grid-cols-9 p-2">
        {#each cad as n}
          <div class="text-sm text-right">{n}</div>
        {/each}
      </div>
    </section>
    <div class="grid grid-cols-2 gap-2">
      <section class="border border-neutral-800 p-2 rounded-lg bg-neutral-900">
        <div class="flex justify-between">
          <h2 class="text-xl font-bold">Dispercion</h2>
          <ButtonLink size="icon">
            <IconCopy/>
          </ButtonLink>
        </div>
        <p></p>
        <p class="font-">Σ={d3.sum(cad)}</p>
        <p class="font-">σ={desviacionEstandar(cad)}</p>
        <p class="font-">µ={(d3.sum(cad)/cad.length).toFixed(2)} / <span class="text-neutral-500">{(d3.sum(cad)/cad.length)}</span></p>
      </section>
      <section class="border border-neutral-800 p-2 rounded-lg bg-neutral-900">
        <div class="flex justify-between">
          <h2 class="text-xl font-bold">Dispercion</h2>
          <ButtonLink size="icon">
            <IconCopy/>
          </ButtonLink>
        </div>
        <p></p>
        <p class="font-">Σ={d3.sum(cad)}</p>
        <p class="font-">σ={desviacionEstandar(cad)}</p>
        <p class="font-">µ={(d3.sum(cad)/cad.length).toFixed(2)} / <span class="text-neutral-500">{(d3.sum(cad)/cad.length)}</span></p>
      </section>
    </div>
    <section class="border border-neutral-800 p-2 rounded-lg bg-neutral-900">
      <div class="flex justify-between">

        <h2 class="text-xl font-bold">Dispercion</h2>
        <ButtonLink size="icon">
          <IconCopy/>
        </ButtonLink>
      </div>
      <canvas bind:this={canvas} width="1000" height="50"></canvas>
    </section>
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
