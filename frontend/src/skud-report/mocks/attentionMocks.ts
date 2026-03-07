export type BadgeType = 'shortage' | 'errors';

export interface AttentionItem {
  id: string;
  name: string;
  avatarColor: string;
  badgeType: BadgeType;
  badgeText: string;
}

export const MOCK_ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: '1',
    name: 'ул. Гагарина, д. 33, корп. 1 ЖК «Созвездие»',
    avatarColor: '#E8D5B7',
    badgeType: 'shortage',
    badgeText: '−42 ч. недоработка',
  },
  {
    id: '2',
    name: 'ЖК Северный',
    avatarColor: '#C5D8E8',
    badgeType: 'shortage',
    badgeText: '−38 ч. недоработка',
  },
  {
    id: '3',
    name: 'ул. Ленина, д. 15 ЖК «Алые Паруса»',
    avatarColor: '#D5C8E8',
    badgeType: 'errors',
    badgeText: '11 ошибок данных',
  },
  {
    id: '4',
    name: 'пр. Мира, д. 45 ЖК «Солнечный Город»',
    avatarColor: '#C8E8D5',
    badgeType: 'errors',
    badgeText: '11 ошибок данных',
  },
  {
    id: '5',
    name: 'наб. Речная, д. 21 ЖК «Речной Квартал»',
    avatarColor: '#E8C8C8',
    badgeType: 'shortage',
    badgeText: '−42 ч. недоработка',
  },
];
