export function  getPositionSvg(svg: SVGSVGElement, event: MouseEvent) {
  const point = new DOMPoint(event.clientX, event.clientY);
  const ctm = svg.getScreenCTM()?.inverse();

  if (ctm) {
    const svgPoint = point.matrixTransform(ctm);
    return { x: svgPoint.x, y: svgPoint.y }
  }

  return { x: 0, y: 0 }
}
