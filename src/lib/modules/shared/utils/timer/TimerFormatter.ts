
export class TimerFormatter {
  constructor (public time: number) { }

  getUnit(): 'ms' | 's' {
    return this.time >= 1000 ? 's' : 'ms';
  }

  getNumeric(fractionDigits?: number): number {
    const time = this.time
    let result = time >= 1000 ? time / 1000 : time;
    return fractionDigits ? +result.toFixed(fractionDigits) : result
  }

  getFormatString(fractionDigits?: number): string {
    return this.getNumeric(fractionDigits) + this.getUnit();
  }
}
