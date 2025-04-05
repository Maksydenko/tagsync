export enum Time {
  DaysInWeek = 7,
  HoursInDay = 24,
  MillisecondsInSecond = 1000,
  MinutesInHour = 60,
  /* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values */
  SecondsInMinute = 60,
  MillisecondsInDay = Time.HoursInDay *
    Time.MinutesInHour *
    Time.SecondsInMinute *
    Time.MillisecondsInSecond,
  MillisecondsInWeek = Time.DaysInWeek * Time.MillisecondsInDay,
}
