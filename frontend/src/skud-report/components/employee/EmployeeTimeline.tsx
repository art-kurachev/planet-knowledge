import React from 'react';
import { OverlayScrollArea } from '../../OverlayScrollArea';
import { colors } from '../../tokens/colors';
import type { TimelineEntry } from '../../mocks';

interface EmployeeTimelineProps {
  timeline: TimelineEntry[];
  selectedDayIndex: number;
  onSelectDay: (index: number) => void;
}

export const EmployeeTimeline: React.FC<EmployeeTimelineProps> = ({
  timeline,
  selectedDayIndex,
  onSelectDay,
}) => (
  <OverlayScrollArea style={styles.timelineLeftCol}>
    {timeline.map((entry, i) => {
      const isSelected = selectedDayIndex === i;
      const isAboveTarget = entry.hours && parseFloat(entry.hours) >= 8;
      return (
        <div
          key={i}
          className="skud-timeline-day-row"
          style={{
            ...styles.timelineDayRow,
            ...(isSelected ? styles.timelineDayRowSelected : {}),
            ...(entry.error ? { backgroundColor: colors.status.warningBg } : {}),
            ...(i === timeline.length - 1 ? { backgroundImage: 'none' } : {}),
          }}
          onClick={() => onSelectDay(i)}
        >
          <span style={{
            ...styles.timelineDayDate,
            ...(isSelected ? styles.timelineDayDateSelected : {}),
          }}>
            {entry.date}
          </span>
          {entry.hours ? (
            <span style={{
              ...styles.timelineHoursBadge,
              backgroundColor: isAboveTarget ? colors.status.successBg : colors.status.errorBg,
              color: isAboveTarget ? colors.status.success : colors.status.error,
            }}>
              {entry.hours}
            </span>
          ) : (
            <span style={styles.timelineHoursDash}>—</span>
          )}
        </div>
      );
    })}
  </OverlayScrollArea>
);

const styles: Record<string, React.CSSProperties> = {
  timelineLeftCol: {
    width: 144,
    flexShrink: 0,
    borderRight: `1px solid ${colors.stroke.subtle}`,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  timelineDayRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    minHeight: 44,
    backgroundImage: `linear-gradient(to bottom, transparent calc(100% - 1px), ${colors.stroke.subtle} calc(100% - 1px))`,
    cursor: 'pointer',
    boxSizing: 'border-box',
  },
  timelineDayRowSelected: {
    backgroundColor: colors.primary.activeRow,
    boxShadow: `inset 4px 0 0 0 ${colors.primary.default}`,
  },
  timelineDayDate: {
    fontSize: 12,
    fontWeight: 400,
    color: colors.text.secondary,
    lineHeight: '16px',
    width: 70,
  },
  timelineDayDateSelected: {
    fontWeight: 500,
    color: colors.text.primary,
  },
  timelineHoursBadge: {
    fontSize: 10,
    fontWeight: 500,
    padding: '4px 8px',
    borderRadius: 4,
    lineHeight: '10px',
    whiteSpace: 'nowrap',
  },
  timelineHoursDash: {
    fontSize: 12,
    color: colors.text.disabled,
  },
};
