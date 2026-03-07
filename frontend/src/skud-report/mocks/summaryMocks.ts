import { colors } from '../tokens/colors';

export interface StatItem {
  id: string;
  label: string;
  value: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  valueColor?: string;
  subtitle: string;
}

export const MOCK_STATS: StatItem[] = [
  {
    id: '1',
    label: 'Всего проходов:',
    value: '2 847',
    badge: '+ 2%',
    badgeBg: colors.status.successBg,
    badgeColor: colors.status.success,
    subtitle: 'От прошлой недели',
  },
  {
    id: '2',
    label: 'Переработки',
    value: '+ 2 847 ч.',
    badge: '+ 2%',
    badgeBg: colors.status.successBg,
    badgeColor: colors.status.success,
    subtitle: 'От прошлой недели',
  },
  {
    id: '3',
    label: 'Недоработки',
    value: '- 547 ч.',
    badge: '- 4%',
    badgeBg: colors.status.errorBg,
    badgeColor: colors.status.error,
    valueColor: colors.status.error,
    subtitle: 'От прошлой недели',
  },
  {
    id: '4',
    label: 'Ошибки данных',
    value: '24',
    badge: '+ 10%',
    badgeBg: colors.status.warningBg,
    badgeColor: colors.status.warning,
    subtitle: 'От прошлой недели',
  },
];
