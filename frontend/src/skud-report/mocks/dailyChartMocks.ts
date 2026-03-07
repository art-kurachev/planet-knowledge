export interface DayData {
  day: string;
  value: number;
  isWeekend?: boolean;
}

export const MOCK_DAILY_DATA: DayData[] = [
  { day: 'пн', value: 350 },
  { day: 'вт', value: 280 },
  { day: 'ср', value: 320 },
  { day: 'чт', value: 200 },
  { day: 'пт', value: 250 },
  { day: 'сб', value: 180, isWeekend: true },
  { day: 'вс', value: 120, isWeekend: true },
];
