import React from 'react';
import { colors } from '../tokens/colors';
import { MOCK_STATS } from '../mocks';
import type { StatItem } from '../mocks';

interface SummaryCardProps {
  title?: string;
  dateRange?: string;
  stats?: StatItem[];
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title = 'Сводка',
  dateRange = '26 янв — 01 фев',
  stats = MOCK_STATS,
}) => {
  const topRow = stats.slice(0, 2);
  const bottomRow = stats.slice(2, 4);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.title}>{title}</span>
        <span style={styles.dateRange}>{dateRange}</span>
      </div>
      <div style={styles.statsRow}>
        {topRow.map((s) => (
          <StatBlock key={s.id} item={s} />
        ))}
      </div>
      <div style={styles.statsRow}>
        {bottomRow.map((s) => (
          <StatBlock key={s.id} item={s} />
        ))}
      </div>
    </div>
  );
};

const StatBlock: React.FC<{ item: StatItem }> = ({ item }) => (
  <div style={styles.statBlock}>
    <span style={styles.statLabel}>{item.label}</span>
    <div style={styles.statValueWrap}>
      <div style={styles.statValueRow}>
        <span
          style={{
            ...styles.statValue,
            color: item.valueColor || colors.text.primary,
          }}
        >
          {item.value}
        </span>
        <span
          style={{
            ...styles.badge,
            backgroundColor: item.badgeBg,
            color: item.badgeColor,
          }}
        >
          {item.badge}
        </span>
      </div>
      <span style={styles.subtitle}>{item.subtitle}</span>
    </div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  card: {
    width: '100%',
    height: 'fit-content',
    minHeight: 220,
    backgroundColor: colors.bg.surface,
    borderRadius: 32,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    boxSizing: 'border-box',
    fontFamily: 'Inter, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '4px 8px',
    height: 33,
  },
  title: {
    fontSize: 20,
    fontWeight: 400,
    color: colors.text.primary,
    lineHeight: '25px',
  },
  dateRange: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.text.secondary,
    lineHeight: '17px',
    textAlign: 'right',
  },
  statsRow: {
    display: 'flex',
    gap: 8,
  },
  statBlock: {
    flex: 1,
    minWidth: 0,
    minHeight: 80,
    height: 96,
    backgroundColor: colors.bg.elevated,
    borderRadius: 12,
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    boxSizing: 'border-box',
  },
  statLabel: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.text.secondary,
    lineHeight: '16px',
  },
  statValueWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  statValueRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: '24px',
  },
  badge: {
    fontSize: 11,
    fontWeight: 500,
    padding: '4px 8px',
    borderRadius: 6,
    lineHeight: '14px',
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 400,
    color: colors.text.muted,
    lineHeight: '14px',
  },
};

export default SummaryCard;
