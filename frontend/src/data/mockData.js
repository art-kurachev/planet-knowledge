// Сводка — общие показатели за период
export const SUMMARY = {
  dateFrom: '26 январь',
  dateTo: '02 февраль',
  totalPasses: 792,
  overtime: '58 ч.',
  undertime: '48 ч.',
  passesByDay: [
    { label: 'пн', val: 234, isWeekend: false, active: false },
    { label: 'вт', val: 234, isWeekend: false, active: false },
    { label: 'ср', val: 234, isWeekend: false, active: true },
    { label: 'чт', val: 234, isWeekend: false, active: false },
    { label: 'пт', val: 234, isWeekend: false, active: false },
    { label: 'сб', val: 234, isWeekend: true, active: false },
    { label: 'вс', val: 765, isWeekend: true, active: false },
  ],
}

export const PROJECTS = [
  { id: 1, name: 'ул. Гагарина, д. 33, корп. 1 ЖК «Созвездие»', sub: 'ЖК Rakurs', passes: 100, over: '+ 3 456 ч.', under: '- 12 ч.' },
  { id: 2, name: 'ЖК Северный', sub: 'ЖК Rakurs', passes: 100, over: '+ 3 456 ч.', under: '- 12 ч.' },
  { id: 3, name: 'ул. Ленина, д. 15 ЖК «Алые Паруса»', sub: 'ЖК Rakurs', passes: 90, over: '+ 3 456 ч.', under: '- 12 ч.' },
  { id: 4, name: 'пер. Тихий, д. 7 ЖК «Лесная Сказка»', sub: 'ЖК Rakurs', passes: 67, over: '+ 3 456 ч.', under: '- 12 ч.' },
  { id: 5, name: 'ш. Энтузиастов, д. 12 ЖК «Новый Горизонт»', sub: 'ЖК Rakurs', passes: 456, over: '+ 3 456 ч.', under: '- 12 ч.' },
  { id: 6, name: 'пр. Мира, д. 45 ЖК «Солнечный Город»', sub: 'ЖК Rakurs', passes: 56, over: '+ 3 456 ч.', under: '- 12 ч.' },
  { id: 7, name: 'ул. Южная, д. 9 ЖК «Морской Бриз»', sub: 'ЖК Rakurs', passes: 234, over: '+ 3 456 ч.', under: '- 12 ч.' },
  { id: 8, name: 'наб. Речная, д. 21 ЖК «Речной Квартал»', sub: 'ЖК Rakurs', passes: 456, over: '+ 3 456 ч.', under: '- 12 ч.' },
  { id: 9, name: 'ул. Зеленая, д. 5 ЖК «Зеленый Остров»', sub: 'ЖК Rakurs', passes: 74, over: '+ 3 456 ч.', under: '- 12 ч.' },
  { id: 10, name: 'пл. Победы, д. 1 ЖК «Триумф Палас»', sub: 'ЖК Rakurs', passes: 34, over: '+ 3 456 ч.', under: '- 12 ч.' },
  { id: 11, name: 'ул. Цветочная, д. 18 ЖК «Цветочный Рай»', sub: 'ЖК Rakurs', passes: 567, over: '+ 3 456 ч.', under: '- 12 ч.' },
]

export const EMPLOYEES = [
  { id: 1, num: '1', name: 'Махмудов Кобулбек Махмудович', tags: ['УЗБЕКИСТАН', '20.05.1984', 'Mob.'], worked: 100, plan: 100, delta: '+3', deltaType: 'green', error: false },
  { id: 2, num: '2', name: 'Герасимов Сергей Львович', tags: ['РОССИЯ', '03.06.1959', 'Mob.'], worked: 100, plan: 100, delta: '-12', deltaType: 'red', error: false },
  { id: 3, num: '3', name: 'Махмудов Кобулбек Махмудович', tags: ['УЗБЕКИСТАН', '20.05.1984', 'Mob.'], worked: 100, plan: 100, delta: '+3', deltaType: 'green', error: false },
  { id: 4, num: '4', name: 'Махмудов Кобулбек Махмудович', tags: ['УЗБЕКИСТАН', '20.05.1984', 'Mob.'], worked: 100, plan: 100, delta: '+3', deltaType: 'green', error: true },
  { id: 5, num: '5', name: 'Махмудов Кобулбек Махмудович', tags: ['УЗБЕКИСТАН', '20.05.1984', 'Mob.'], worked: 100, plan: 100, delta: '+3', deltaType: 'green', error: false },
  { id: 6, num: '6', name: 'Махмудов Кобулбек Махмудович', tags: ['УЗБЕКИСТАН', '20.05.1984', 'Mob.'], worked: 100, plan: 100, delta: '+3', deltaType: 'green', error: false },
  { id: 7, num: '7', name: 'Махмудов Кобулбек Махмудович', tags: ['УЗБЕКИСТАН', '20.05.1984', 'Mob.'], worked: 100, plan: 100, delta: '+3', deltaType: 'green', error: false },
  { id: 8, num: '8', name: 'Махмудов Кобулбек Махмудович', tags: ['УЗБЕКИСТАН', '20.05.1984', 'Mob.'], worked: 100, plan: 100, delta: '+3', deltaType: 'green', error: false },
  { id: 9, num: '9', name: 'Махмудов Кобулбек Махмудович', tags: ['УЗБЕКИСТАН', '20.05.1984', 'Mob.'], worked: 100, plan: 100, delta: '+3', deltaType: 'green', error: false },
  { id: 10, num: '10', name: 'Махмудов Кобулбек Махмудович', tags: ['УЗБЕКИСТАН', '20.05.1984', 'Mob.'], worked: 100, plan: 100, delta: '+3', deltaType: 'green', error: false },
  { id: 11, num: '11', name: 'Махмудов Кобулбек Махмудович', tags: ['УЗБЕКИСТАН', '20.05.1984', 'Mob.'], worked: 100, plan: 100, delta: '+3', deltaType: 'green', error: false },
  { id: 12, num: '12', name: 'Махмудов Кобулбек Махмудович', tags: ['УЗБЕКИСТАН', '20.05.1984', 'Mob.'], worked: 100, plan: 100, delta: '+3', deltaType: 'green', error: false },
  { id: 13, num: '13', name: 'Махмудов Кобулбек Махмудович', tags: ['УЗБЕКИСТАН', '20.05.1984', 'Mob.'], worked: 100, plan: 100, delta: '+3', deltaType: 'green', error: false },
  { id: 14, num: '14', name: 'Махмудов Кобулбек Махмудович', tags: ['УЗБЕКИСТАН', '20.05.1984', 'Mob.'], worked: 100, plan: 100, delta: '+3', deltaType: 'green', error: false },
]

export const DAYS = [
  { id: 1, label: 'Вс, 26 янв', worked: '8.5 ч', status: 'green' },
  { id: 2, label: 'Пн, 27 янв', worked: '7.2 ч', status: 'red', active: true },
  { id: 3, label: 'Вт, 28 янв', worked: '7.2 ч', status: 'red' },
  { id: 4, label: 'Ср, 29 янв', worked: '7.2 ч', status: 'red' },
  { id: 5, label: 'Чт, 30 янв', worked: '7.2 ч', status: 'red' },
  { id: 6, label: 'Пт, 31 янв', worked: '7.2 ч', status: 'red' },
  { id: 7, label: 'Сб, 1 фев', worked: null, status: 'off' },
]

export const LOG = [
  { time: '08:58', type: 'in', place: 'КПП Главный' },
  { time: '13:02', type: 'out', place: 'КПП Главный' },
  { time: '13:58', type: 'in', place: 'КПП Главный' },
]

export const CHART = [
  { label: 'Вс, 26 янв', val: 8.5, norm: 8 },
  { label: 'Пн, 27 янв', val: 7.2, norm: 8 },
  { label: 'Вт, 28 янв', val: 8.0, norm: 8 },
  { label: 'Ср, 29 янв', val: 4.0, norm: 8 },
  { label: 'Чт, 30 янв', val: 8.0, norm: 8 },
  { label: 'Пт, 31 янв', val: 9.0, norm: 8 },
  { label: 'Сб, 1 фев', val: 0, norm: 8 },
]
