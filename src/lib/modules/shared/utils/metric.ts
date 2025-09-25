import { readFile, writeFile } from "fs/promises"

interface IMetric {
  times: number[],
  updatedAt: string,
  color: string
}

const FILE_JSON_METRICS = '.temp/metrics.json'
const FILE_HTML_METRICS = '.temp/metrics.html'

const metrics: Record<string, IMetric> = JSON.parse(await readFile(FILE_JSON_METRICS, 'utf8'));

const limit = 1000;

const colors: string[] = [
  'oklch(0.808 0.114 19.571)',
  'oklch(0.837 0.128 66.29)',
  'oklch(0.879 0.169 91.605)',
  'oklch(0.905 0.182 98.111)',
  'oklch(0.897 0.196 126.665)',
  'oklch(0.871 0.15 154.449)',
  'oklch(0.845 0.143 164.978)',
  'oklch(0.855 0.138 181.071)',
  'oklch(0.865 0.127 207.078)',
  'oklch(0.828 0.111 230.318)',
  'oklch(0.809 0.105 251.813)',
  'oklch(0.785 0.115 274.713)',
  'oklch(0.811 0.111 293.571)',
  'oklch(0.827 0.119 306.383)',
  'oklch(0.833 0.145 321.434)',
  'oklch(0.823 0.12 346.018)',
  'oklch(0.81 0.117 11.638)',
]

const svg = {
  width: 600,
  height: 300
}

const margin = {
  left: 30,
  right: 10,
  top: 10,
  bottom: 10
}

const frame = {
  x: margin.left,
  y: margin.right,
  width: svg.width - (margin.left + margin.right),
  height: svg.height - (margin.top + margin.bottom),
}

function arange(max: number, parts: number,) {
  const d = []
  for (let i = 0; i < parts; i++) {
    d.push(max / (parts - 1) * i)
  }
  return d
}

class LineBuilder {
  constructor(
    public x1: number,
    public y1: number,
    public x2: number,
    public y2: number,
    public attributes: Record<string, string | number> = {}
  ) { }
  setStroke(color: string) {
    this.attributes['stroke'] = color
    return this
  }
  setStrokeWidth (widht: number) {
    this.attributes['stroke-width'] = widht
    return this
  }
  toString() {
    const attributesArray = Object.entries(this.attributes).map(([key, value]) => {
      return `${key}="${value}"`
    })
    return `<line x1="${this.x1}" y1="${this.y1}" x2="${this.x2}" y2="${this.y2}" ${attributesArray.join(' ')}/>`
  }
}

class TextBuilder {
  constructor (
    public label: string | number,
    public x: number,
    public y: number
  ) { }
  toString() {
    return `<text x="${this.x}" y="${this.y}" style="font-family: monospace;font-size: 12px" fill="white" text-anchor="end" dominant-baseline="middle">${this.label}</text>`
  }
}


function Card(name: string, times: number[], updatedAt: Date, color: string) {
  times = times.slice(-300)
  const bgId = crypto.randomUUID()

  const max = Math.max(...times);

  const coordinates = times.map((n, i) => {
    return {
      x: frame.width  / (times.length - 1) * i + margin.left,
      y: frame.height - (n * frame.height / max) + margin.top,
      n
    }
  })

  const polygon = coordinates.map(({x,y})=> `${x},${y}`);

  let suma = 0;
  const polygonAvg = coordinates.map(({x,y}, i)=> {
    suma += y;
    return `${x},${suma / (i+1)}`
  });
  const rects = coordinates.map(({x,y,n})=> `
    <g class="label">
      <rect class="rect" x="${x - (frame.width / (times.length - 1) / 2)}" y="${frame.y}" width="${frame.width / (times.length - 1)}" height="${frame.height}" fill="transparent" style="--bg-gradient: url(#${bgId})"/>
      <text x="${x+5}" y="${y-5}" style="font-family: monospace;font-size: 12px" fill="none">${(n > 1000 ? n / 1000 : n).toFixed(1)}${n > 1000 ? 's' : 'ms'}</text>
      <line x1="${x}" y1="${y}" x2="${x}" y2="${frame.y + frame.height}" stroke="${color}" stroke-width="1" opacity="0"/>
      <circle cx="${x}" cy="${y}" r="0" fill="${color}"/>
    </g>
  `);


  const g = Array.from({ length: 5 }).map((_, i) => {
    const y = i * (frame.height/4) + frame.y
    return new LineBuilder(27.5, y, 32.5, y).setStroke(color).toString()
  })

  const f = arange(max, 5).toReversed().map((n, i)=>{
    const y = i * (frame.height / 4) + frame.y
    return new TextBuilder(`${(n > 1000 ? n / 1000 : n).toFixed(0)}${n > 1000 ? 's' : 'ms'}`, 25, y).toString()
  })


  return `
    <article id="${name}" class="p-3">
      <h2 class="flex items-center gap-3 text-lg font-bold pb-2">
        ${name}
        <span style="color: gray">${updatedAt.toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'})}</span>
        ${times.length}
      </h2>
      <svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" class="m-3">
        <defs>
          <linearGradient id="${bgId}" x1="50%" y1="0%" x2="50%" y2="90%">
            <stop offset="0%" stop-color="${color}" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <rect x="${margin.left}" y="${margin.top}" width="${frame.width}" height="${frame.height}" stroke="${color}" stroke-width="1" fill="none" opacity="0.2"/>
        <line x1="${frame.x}" y1="${frame.height - (limit * frame.height / max)}" x2="${frame.x + frame.width}" y2="${frame.height - (limit * frame.height / max)}" stroke="${color}" stroke-width="1"/>
        <polygon points="${polygon.join(' ')} ${frame.width + frame.x},${frame.height + frame.y} ${frame.x},${frame.height}" fill="url(#${bgId})" />
        <polyline points="${polygon.join(' ')}" fill="none" stroke="${color}" />
        <polyline points="${polygonAvg.join(' ')}" fill="none" stroke="#fff" />
        ${rects.join('')}
        ${g.join('')}
        ${f.join('')}
      </svg>
    </article>
  `
}

function createViewHtml() {
  const metricsEntries = Object.entries(metrics)
    .sort((a, b) => new Date(b[1].updatedAt).getTime() - new Date(a[1].updatedAt).getTime())

  const cards = metricsEntries
    .map(([name, metric]) => {
      return Card(name, metric.times, new Date(metric.updatedAt), metric.color)
    })

  const links = metricsEntries.map(([name]) => {
    return `<a href="#${name}" class="flex items-center gap-2 text-sm hover:text-cyan-300 px-2">
      󰄨 ${name}
    </a>`
  })

  writeFile(FILE_HTML_METRICS, `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Metrics</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style type="text/tailwindcss">
      @theme {
        --font-sans: JetBrainsMono Nerd Font Propo;
        --font-mono: JetBrainsMono Nerd Font Propo;
      }
      svg {
        background: none;
      }
    </style>
    <style>
      :root {
        color-scheme: dark light
      }
      #root{
        grid-template-columns: 200px 1fr;
      }
      svg {
        display: block;
        overflow: visible
      }
      .label:hover rect {
        transition: 0.5s linear;
        fill: var(--bg-gradient);
      }
      .label:hover text {
        fill: white;
      }
      .label:hover line {
        opacity: 1;
      }
      .label:hover circle {
        r: 4;
        transition: 0.1s linear;
      }
      .views {
        grid-template-columns: repeat(auto-fill, minmax(400px,1fr));
      }
    </style>
  </head>
  <body>
    <div id="root" class="grid">
      <section class="flex flex-col sticky top-0 p-2 font-mono">
        ${links.join('')}
      </section>
      <section class="grid gap-3 views p-3">
        ${cards.join(``)}
      </section>
    </div>
  </body>
  </html>
  `, 'utf8')
}

const timelines = new Map()

export class Metric {
  static start(key: string) {
    timelines.set(key, performance.now())
  }
  static end(key: string) {
    if (timelines.has(key)) {
      Metric.register(key, performance.now() - timelines.get(key))
    }
  }
  static async  register (name: string, time: number) {
    if (name in metrics) {
      metrics[name].times.push(+time.toFixed(2))
      metrics[name].updatedAt = new Date().toJSON()
    } else {
      metrics[name] = {
        times: [+time.toFixed(2)],
        updatedAt: new Date().toJSON(),
        color: colors.sort(() => Math.random() - 0.5)[10]
      }
    }
    await writeFile(FILE_JSON_METRICS, JSON.stringify(metrics, null, 2), 'utf8')
    createViewHtml()
  }
}
