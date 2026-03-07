import { colors } from '../tokens/colors';

export interface ProjectRow {
  id: string;
  name: string;
  avatarColor: string;
  passes: number;
  overtime: string;
  shortage: string;
}

export const MOCK_PROJECT_ROWS: ProjectRow[] = [
  { id: '1', name: 'ул. Гагарина, д. 33, корп. 1 ЖК «Созвездие»', avatarColor: '#E8D5B7', passes: 100, overtime: '+ 3 456', shortage: '- 12' },
  { id: '2', name: 'ЖК Северный', avatarColor: '#C5D8E8', passes: 100, overtime: '+ 3 456', shortage: '- 12' },
  { id: '3', name: 'ул. Ленина, д. 15 ЖК «Алые Паруса»', avatarColor: '#D5C8E8', passes: 90, overtime: '+ 3 456', shortage: '- 12' },
  { id: '4', name: 'ул. Ленина, д. 15 ЖК «Алые Паруса»', avatarColor: '#D5C8E8', passes: 90, overtime: '+ 3 456', shortage: '- 12' },
  { id: '5', name: 'пер. Тихий, д. 7 ЖК «Лесная Сказка»', avatarColor: '#C8E8D5', passes: 67, overtime: '+ 3 456', shortage: '- 12' },
  { id: '6', name: 'пер. Тихий, д. 7 ЖК «Лесная Сказка»', avatarColor: '#C8E8D5', passes: 67, overtime: '+ 3 456', shortage: '- 12' },
  { id: '7', name: 'ш. Энтузиастов, д. 12 ЖК «Новый Горизонт»', avatarColor: '#E8C8C8', passes: 456, overtime: '+ 3 456', shortage: '- 12' },
  { id: '8', name: 'ш. Энтузиастов, д. 12 ЖК «Новый Горизонт»', avatarColor: '#E8C8C8', passes: 456, overtime: '+ 3 456', shortage: '- 12' },
  { id: '9', name: 'пр. Мира, д. 45 ЖК «Солнечный Город»', avatarColor: '#B7D8E8', passes: 56, overtime: '+ 3 456', shortage: '- 12' },
  { id: '10', name: 'пр. Мира, д. 45 ЖК «Солнечный Город»', avatarColor: '#B7D8E8', passes: 56, overtime: '+ 3 456', shortage: '- 12' },
  { id: '11', name: 'ул. Южная, д. 9 ЖК «Морской Бриз»', avatarColor: '#D8E8B7', passes: 234, overtime: '+ 3 456', shortage: '- 12' },
  { id: '12', name: 'ул. Южная, д. 9 ЖК «Морской Бриз»', avatarColor: '#D8E8B7', passes: 234, overtime: '+ 3 456', shortage: '- 12' },
];
