interface Size {
  width: number;
  height: number;
}

interface Position {
  points: Point[];
  range: number;
  size: Size;
}

interface Point {
  x: number
  y: number
}

// Web site: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d
interface PathProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
}

const Path = {
  C: ({ x1, y1, x2, y2, x3, y3 }: PathProps) => `C ${x1} ${y1}, ${x2} ${y2}, ${x3} ${y3}`
}

export function calculatePosition(x: number, y: number, width: number, height: number, data: number[]): Position {
  const max = Math.max(...data);
  const range = width / (data.length - 1);

  const points = data.map((n, i) => {
    return {
      x: x + range * i,
      y: height - (height / max) * n
    };
  });

  return { points, range, size: { width, height } };
}

export class Vector {
  constructor(public x: number, public y: number) {

  }
  getUnit() {
    const magnitude = this.getMagnitude()
    return new Vector(this.x / magnitude, this.y / magnitude)
  }
  getUnitAbs() {
    const magnitude = this.getMagnitude()
    return new Vector(Math.abs(this.x / magnitude), Math.abs(this.y / magnitude))
  }
  getMagnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
}

export function getCirclePoint(x: number, y: number, deg: number, r:number) {
  x = x - Math.cos(deg) * 20;
  y = y - Math.sin(deg) * 20;

  return {x,y}
}
export class LinearCurveGrafic {
  d:string =""
  r: number = 0
  constructor(){}
  start(x:number,y:number, deg:number) {
    this.d += `M ${x} ${y} C ${2} ${2} `
  }
  add(x:number,y:number, deg:number) {

    this.d += `${x} ${y} ${x} ${y} C ${8} ${9}`
  }
  end(x:number,y:number, deg:number) {
    this.d += `${8} ${9} ${x} ${y}`
  }
}

export function LinearGraphic(points: Point[]) {
  let d = ''

  points.forEach(({x,y},i) => {

  });

}

interface LinearCurveProps extends Position {
  point: Point;
  points: Point[];
  range: number;
}

export function LinearCurve({ points, range, size, point }: LinearCurveProps ) {

  const d = points.map(({ x, y }, i) => {
    const prev = points[i - 1]
    const next = points[i + 1]

    if (i == 0) return `M ${x} ${y}`

    if ((i + 1) === points.length) {
      return Path.C({
        x1: x - (range / 2),
        y1: prev.y,
        x2: x - (range / 2),
        y2: y,
        x3: x,
        y3: y
      })
    }

    if (prev.y < y && y > next.y) {
      return Path.C({
        x1: x - (range / 2),
        y1: prev.y,
        x2: x - (range / 2),
        y2: y,
        x3: x,
        y3: y
      })
    }

    if (prev.y < y && next.y > y) {
      const v = new Vector(prev.x - next.x, prev.y - next.y)

      const unit = v.getUnitAbs()
      console.log(unit, '----------------');
      console.log([x - unit.x*(range/2), y - unit.y * (range/2)],);
      return Path.C({
        x1: prev.x + unit.x * (range / 2),
        y1: prev.y + unit.y * (range / 2),
        x2: x - unit.x * (range / 2),
        y2: y - unit.y * (range / 2),
        x3: x,
        y3: y
      })
    }
  });

  const base = points.map(({ x, y }, i) => {
    if (i == 0) return `M ${x} ${y}`

    let h = 10;
    return Path.C({
      x1: x - (range / 2),
      y1: point.y + h,
      x2: x - (range / 2),
      y2: point.y + h,
      x3: x,
      y3: point.y + h
    })
  });

  return {
    linear: d.join(' '),
    base: base.join(' '),
    range
  }
}

export function path() {

}
