import { getContext, setContext } from "svelte";

interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
}

// Chart svg configuration context
export function setChartSvgContext(width: number, height: number, margin: Margin) {
  return setContext('chart.svg', { width, height, margin });
}

export function getChartSvgContext() {
  return getContext<ReturnType<typeof setChartSvgContext>>('chart.svg')
}

// Chart SVG content context
export function setChartSvgContentContext(x: number, y: number, width: number, height: number): BoundingBox {
  return setContext('chart.svg.content', { x, y, width, height });
}

export function getChartSvgContentContext() {
  return getContext<ReturnType<typeof setChartSvgContentContext>>('chart.svg.content')
}

// Chart configuration context
export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
    class?: string
  }
}

export function setChartConfigContext(config: ChartConfig) {
  return setContext('chart.config', config)
}

export function getChartConfigContext() {
  return getContext<ReturnType<typeof setChartConfigContext>>('chart.config')
}

// Chart scale context
export interface ChartScale {
  x: d3.ScaleLinear<number, number>
  y: d3.ScaleLinear<number, number>
}

export function setChartScaleContext(scale: ChartScale) {
  return setContext('chart.scale', scale)
}

export function getChartScaleContext() {
  return getContext<ReturnType<typeof setChartScaleContext>>('chart.scale')
}


// Chart data context
export function setChartDataContext(data) {
return setContext('chart.data', data)
}

export function getChartDataContext() {
  return getContext<ReturnType<typeof setChartDataContext>>('chart.data')
}
