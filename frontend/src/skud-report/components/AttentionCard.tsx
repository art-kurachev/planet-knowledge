import React from 'react';
import { colors } from '../tokens/colors';

type BadgeType = 'shortage' | 'errors';

interface AttentionItem {
  id: string;
  name: string;
  avatarColor: string;
  badgeType: BadgeType;
  badgeText: string;
}

interface AttentionCardProps {
  title?: string;
  items?: AttentionItem[];
}

const MOCK_ITEMS: AttentionItem[] = [
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

const WarningIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M5.13 1.86L.84 9a1 1 0 00.87 1.5h8.58a1 1 0 00.87-1.5L6.87 1.86a1 1 0 00-1.74 0zM6 4.5v2M6 8.5h.005"
      stroke={colors.status.warning}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AttentionCard: React.FC<AttentionCardProps> = ({
  title = 'Требует внимания',
  items = MOCK_ITEMS,
}) => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.title}>{title}</span>
      </div>
      <div style={styles.list}>
        {items.map((item) => (
          <div key={item.id} style={styles.row}>
            <div style={styles.projectInfo}>
              <div
                style={{
                  ...styles.avatar,
                  backgroundColor: item.avatarColor,
                }}
              />
              <span style={styles.projectName}>{item.name}</span>
            </div>
            <div
              style={{
                ...styles.badge,
                backgroundColor:
                  item.badgeType === 'shortage'
                    ? colors.status.errorBg
                    : colors.status.warningBg,
              }}
            >
              {item.badgeType === 'errors' && <WarningIcon />}
              <span
                style={{
                  ...styles.badgeText,
                  color:
                    item.badgeType === 'shortage'
                      ? colors.status.error
                      : colors.status.warning,
                }}
              >
                {item.badgeText}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.bg.surface,
    borderRadius: 32,
    border: 'none',
    padding: '16px 16px 0 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    boxSizing: 'border-box',
    fontFamily: 'Inter, sans-serif',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '4px 8px',
    height: 33,
    flexShrink: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 400,
    color: colors.text.primary,
    lineHeight: '25px',
  },
  list: {
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    borderRadius: 12,
    paddingBottom: 16,
    overflowY: 'auto',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.bg.elevated,
    height: 44,
    boxSizing: 'border-box',
  },
  projectInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    minWidth: 0,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    flexShrink: 0,
  },
  projectName: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.text.primary,
    lineHeight: '15px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    padding: 6,
    borderRadius: 4,
    flexShrink: 0,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 500,
    lineHeight: '10px',
    whiteSpace: 'nowrap',
  },
};

export default AttentionCard;
