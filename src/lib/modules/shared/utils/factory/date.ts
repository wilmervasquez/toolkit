export class DateFactory {
  static fromHours(hours: number): Date {
    return new Date(hours * 60 * 60 * 1000);
  }

  static fromDays(days: number): Date {
    return new Date(days * 24 * 60 * 60 * 1000);
  }
}

export function DateGo() {
  const date = DateFactory.fromHours(24);
  console.log(date);
}