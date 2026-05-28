<script lang="ts">
  import * as d3 from 'd3';

  import { ButtonLink } from "$modules/shared/components/button";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$modules/shared/components/select';
  import { setColorSchemeContext } from "$modules/shared/contexts/color-scheme";
  import { IconCopy, IconPlus, IconPointer, IconSkewX, IconTriangle } from "@tabler/icons-svelte";

  setColorSchemeContext()

  let completium = $state([])
  let tabs = $state(['Prueba'])

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

  let pointer = $state({ x: 50, y: 50})

  $effect(()=>{
    const ctx = canvas.getContext('2d')!

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle ="#666"
    const xScale = d3.scaleLinear([d3.min(cad) ?? 0, d3.max(cad) ?? 10], [6, canvas.width-6])


    // lines
    ctx.lineWidth = 0.5
    for (let index = 0; index < 40; index++) {
      ctx.beginPath()
      ctx.moveTo(6,index*30+6)
      ctx.lineTo(canvas.width-6,index*30+6)

      ctx.moveTo(index*30+6, 6)
      ctx.lineTo(index*30+6, canvas.height-6)
      ctx.stroke()
    }

    // rect
    ctx.strokeStyle ="#ccc"
    ctx.strokeRect(6,6,canvas.width-12, canvas.height-12)

    ctx.font = '14px Times'
    ctx.textAlign = "center";
    ctx.fillStyle='#888'
    ctx.fillText(String(d3.min(cad)),pointer.x, pointer.y)
    ctx.fillText(String(d3.max(cad)),pointer.x, pointer.y+56)

  })

  function onmousemove({ x, y }: MouseEvent) {
    pointer = { x, y}
  }
</script>
<main class="max-w-6xl m-auto p-4">
  <div class="flex items-center gap-6">

    <h2 class="text-2xl font-bold p-2">Geo</h2>
    <div class="flex gap-3 text-neutral-400 items-center">
      <IconPointer/>
      <IconTriangle/>
      <IconSkewX/>
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
          <SelectValue placeholder="Projexts"/>
        </SelectTrigger>
        <SelectContent position="left">
          {#each tabs as tab}
            <SelectItem value="poblacional">{tab}</SelectItem>
          {/each}
        </SelectContent>
      </Select>
      <button onclick={() => tabs.push('Untitled')} class="border text-neutral-500 border-neutral-800 rounded-lg p-1">
        <IconPlus/>
      </button>
    </div>
  </div>

  <div class="font- flex flex-col gap-2 p-2">
    <section class="border border-neutral-800 p-2 rounded-lg bg-neutral-900">
      <canvas {onmousemove} bind:this={canvas} width="1000" height="500"></canvas>
    </section>
    <section class="border border-neutral-800 p-2 rounded-lg bg-neutral-900">
      <div class="flex items-center justify-between pb-2">
        <h2 class="text-xl font-bold">Datos <span class="text-neutral-400">{cad.length}</span></h2>
        <div class="flex gap-2">
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
      <textarea class="w-full bg-zinc-800 hover:outline-1 rounded-lg outline-brand p-2 px-3" name="" id="" bind:value={numbersString}></textarea>
      <div class="data grid grid-cols-9 p-2">
        {#each cad.toSorted((a,b) => a - b) as n}
          <div class="text-sm text-right">{n}</div>
        {/each}
      </div>
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
