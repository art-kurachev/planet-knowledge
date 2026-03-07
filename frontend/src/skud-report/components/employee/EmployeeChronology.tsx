import React from 'react';
import { colors } from '../../tokens/colors';
import { DangerIcon16, ArrowRight, ArrowLeft } from '../icons';
import type { TimelineEntry } from '../../mocks';

interface EmployeeChronologyProps {
  entry: TimelineEntry;
  projectName?: string;
}

export const EmployeeChronology: React.FC<EmployeeChronologyProps> = ({ entry, projectName }) => (
  <div style={styles.chronoBlock}>
    <div style={styles.chronoBlockHeader}>
      <span style={styles.chronoTitle}>
        {entry.chronologyTitle ?? `Хронология — ${entry.date}`}
      </span>
      {(projectName || entry.chronologyLocation) && (() => {
        const checkpointName = entry.chronologyLocation?.split(' • ')[1];
        const complexName = projectName ?? entry.chronologyLocation?.split(' • ')[0];
        return (
          <span style={styles.chronoLocation}>
            {complexName && <span>{complexName}</span>}
            {complexName && checkpointName && <span> • </span>}
            {checkpointName && <span>{checkpointName}</span>}
          </span>
        );
      })()}
    </div>
    {entry.error && (
      <div style={styles.errorBox}>
        <DangerIcon16 />
        <span style={styles.errorText}>{entry.error}</span>
      </div>
    )}
    {entry.events?.map((evt, j) => (
      <div key={j} style={styles.eventRow}>
        <span style={styles.eventTime}>{evt.time}</span>
        <span
          style={{
            ...styles.eventDirection,
            backgroundColor:
              evt.direction === 'in'
                ? colors.status.successBg
                : colors.status.errorBg,
            color:
              evt.direction === 'in'
                ? colors.status.success
                : colors.status.error,
          }}
        >
          {evt.direction === 'in' ? (
            <>
              Вход
              <ArrowRight color={colors.status.success} />
            </>
          ) : (
            <>
              <ArrowLeft color={colors.status.error} />
              Выход
            </>
          )}
        </span>
        <span style={styles.eventLocation}>{evt.location}</span>
      </div>
    ))}
    {entry.total && (
      <div style={styles.totalRow}>
        <span style={styles.totalLabel}>Итого за день</span>
        <span style={styles.totalValue}>{entry.total}</span>
      </div>
    )}
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  chronoBlock: {
    flex: 1,
    margin: 0,
    backgroundColor: colors.bg.surface,
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
  },
  chronoBlockHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: colors.bg.elevated,
    borderBottom: `1px solid ${colors.stroke.subtle}`,
  },
  chronoTitle: {
    fontSize: 10,
    fontWeight: 500,
    color: colors.text.primary,
    lineHeight: '12px',
  },
  chronoLocation: {
    fontSize: 10,
    fontWeight: 400,
    color: colors.text.muted,
    lineHeight: '12px',
    textAlign: 'right',
  },
  errorBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 4,
    backgroundColor: colors.status.warningBg,
    borderRadius: 6,
    padding: '6px 8px',
  },
  errorText: {
    fontSize: 10,
    fontWeight: 400,
    color: colors.status.warning,
    lineHeight: '13px',
  },
  eventRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '8px 12px',
    borderBottom: `1px solid ${colors.stroke.subtle}`,
  },
  eventTime: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.text.primary,
    lineHeight: '15px',
    width: 40,
  },
  eventDirection: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 10,
    fontWeight: 500,
    padding: '4px 8px',
    borderRadius: 4,
    lineHeight: '14px',
    minWidth: 64,
    justifyContent: 'center',
  },
  eventLocation: {
    fontSize: 12,
    fontWeight: 400,
    color: colors.text.muted,
    lineHeight: '15px',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: colors.bg.elevated,
  },
  totalLabel: {
    fontSize: 10,
    fontWeight: 400,
    color: colors.text.muted,
    lineHeight: '12px',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.text.primary,
    lineHeight: '17px',
  },
};
