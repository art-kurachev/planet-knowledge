import React from 'react';
import { colors } from '../tokens/colors';
import { OverlayScrollArea } from '../OverlayScrollArea';
import { WarningIcon12 } from './icons';
import { MOCK_ATTENTION_ITEMS } from '../mocks';
import type { AttentionItem } from '../mocks';

interface AttentionCardProps {
  title?: string;
  items?: AttentionItem[];
  onItemClick?: (id: string, name: string) => void;
}

export const AttentionCard: React.FC<AttentionCardProps> = ({
  title = 'Требует внимания',
  items = MOCK_ATTENTION_ITEMS,
  onItemClick,
}) => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.title}>{title}</span>
      </div>
      <OverlayScrollArea style={styles.list}>
        <div style={styles.listInner}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{ ...styles.row, ...(onItemClick ? styles.rowClickable : {}) }}
            onClick={() => onItemClick?.(item.id, item.name)}
          >
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
              {item.badgeType === 'errors' && <WarningIcon12 />}
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
      </OverlayScrollArea>
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
    height: 'fit-content',
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
    borderRadius: 12,
    paddingBottom: 16,
    overflowY: 'auto',
  },
  listInner: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
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
  rowClickable: {
    cursor: 'pointer',
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
