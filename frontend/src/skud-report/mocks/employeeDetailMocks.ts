export interface TimelineEntry {
  date: string;
  hours: string;
  events?: { time: string; direction: 'in' | 'out'; location: string }[];
  total?: string;
  error?: string;
  chronologyTitle?: string;
  chronologyLocation?: string;
}

export interface DayHours {
  day: string;
  hours: number;
  isOvertime?: boolean;
}

export const MOCK_TIMELINE: TimelineEntry[] = [
  {
    date: 'Вс, 26 янв',
    hours: '8.5 ч',
    chronologyLocation: 'ЖК Заря • КПП Главный',
    events: [
      { time: '09:00', direction: 'in', location: 'КПП Главный' },
      { time: '18:00', direction: 'out', location: 'КПП Главный' },
    ],
    total: '8 ч 30 мин',
  },
  {
    date: 'Пн, 27 янв',
    hours: '7.2 ч',
    chronologyLocation: 'ЖК Заря • КПП Главный',
    error: 'Ошибка данных — выход не зафиксирован. Возможно сотрудник забыл приложить карту или пропуск не работает.',
    events: [
      { time: '08:58', direction: 'in', location: 'КПП Главный' },
      { time: '13:02', direction: 'out', location: 'КПП Главный' },
      { time: '13:58', direction: 'in', location: 'КПП Главный' },
    ],
    total: '7 ч 09 мин',
  },
  {
    date: 'Вт, 28 янв',
    hours: '7.2 ч',
    chronologyLocation: 'ЖК Заря • КПП Северный',
    events: [
      { time: '08:45', direction: 'in', location: 'КПП Северный' },
      { time: '17:30', direction: 'out', location: 'КПП Северный' },
    ],
    total: '7 ч 12 мин',
  },
  { date: 'Ср, 29 янв', hours: '7.2 ч' },
  { date: 'Чт, 30 янв', hours: '7.2 ч' },
  { date: 'Пт, 31 янв', hours: '7.2 ч' },
  { date: 'Сб, 1 фев', hours: '' },
];
