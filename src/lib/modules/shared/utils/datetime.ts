export class DateTime {

}

export class DateFactory {
  static fromTime(h: number, m: number, s: number) {
    const dt = new Date()
    dt.setHours(h)
    dt.setMinutes(m)
    dt.setSeconds(s)
    return dt
  }
}


DateFactory.fromTime(12,45,6)
