import { colors } from '../tokens/colors';

export interface EmployeeRow {
  id: string;
  num: number;
  name: string;
  worked: number;
  plan: number;
  delta: string;
  deltaColor?: string;
  deltaBg?: string;
  hasWarning?: boolean;
}

export const MOCK_EMPLOYEE_ROWS: EmployeeRow[] = [
  { id: '1', num: 1, name: 'Иванов Пётр Сергеевич', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
  { id: '2', num: 2, name: 'Герасимов Сергей Львович', worked: 100, plan: 100, delta: '-12', deltaColor: colors.status.error, deltaBg: colors.status.errorBg },
  { id: '3', num: 3, name: 'Козлова Анна Михайловна', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
  { id: '4', num: 4, name: 'Махмудов Кобулбек Махмудович', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg, hasWarning: true },
  { id: '5', num: 5, name: 'Сидорова Елена Владимировна', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
  { id: '6', num: 6, name: 'Петров Алексей Николаевич', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
  { id: '7', num: 7, name: 'Новикова Мария Игоревна', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
  { id: '8', num: 8, name: 'Махмудов Кобулбек Махмудович', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
  { id: '9', num: 9, name: 'Махмудов Кобулбек Махмудович', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
  { id: '10', num: 10, name: 'Махмудов Кобулбек Махмудович', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
  { id: '11', num: 11, name: 'Махмудов Кобулбек Махмудович', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
  { id: '12', num: 12, name: 'Махмудов Кобулбек Махмудович', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
];
