import { TimerFormatter } from './TimerFormatter';
export class Timer {
  private startTime: number;
  private elapsedTime: number = 0;

  constructor () {
    this.startTime = performance.now()
  }

  end () {
    this.elapsedTime = performance.now() - this.startTime
    return this
  }

  getElapsedTime () {
    return this.elapsedTime
  }

  getFormatted() {
    return new TimerFormatter(this.elapsedTime);
  }
}
