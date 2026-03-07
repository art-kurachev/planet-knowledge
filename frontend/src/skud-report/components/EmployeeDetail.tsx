import React, { useState } from 'react';
import { OverlayScrollArea } from '../OverlayScrollArea';
import { colors } from '../tokens/colors';
import { PdfButton } from './shared';
import { WarningIconFilled, ArrowRight, ArrowLeft } from './icons';
import { EmployeeChart } from './employee/EmployeeChart';
import { EmployeeTimeline } from './employee/EmployeeTimeline';
import { EmployeeChronology } from './employee/EmployeeChronology';
import { MOCK_TIMELINE } from '../mocks';
import type { TimelineEntry, DayHours } from '../mocks';

function parseHoursFromTimeline(entry: TimelineEntry): number {
  const str = entry.total || entry.hours || '';
  if (!str.trim()) return 0;
  const hm = str.match(/(\d+)\s*ч\s*(\d+)\s*мин/);
  if (hm) return parseInt(hm[1], 10) + parseInt(hm[2], 10) / 60;
  const h = str.match(/([\d.,]+)\s*ч/);
  return h ? parseFloat(h[1].replace(',', '.')) : 0;
}

function timelineToChartData(timeline: TimelineEntry[]): DayHours[] {
  return timeline.map((entry) => {
    const hours = parseHoursFromTimeline(entry);
    return {
      day: entry.date,
      hours,
      isOvertime: hours < 8,
    };
  });
}

interface EmployeeDetailProps {
  name?: string;
  projectName?: string;
  label?: string;
  chartData?: DayHours[];
  chartDateRange?: string;
  timeline?: TimelineEntry[];
  onPdfClick?: () => void;
}

export const EmployeeDetail: React.FC<EmployeeDetailProps> = ({
  name = 'Махмудов Кобулбек Махмудович',
  projectName,
  label = 'Табель',
  chartData: chartDataProp,
  chartDateRange = '26 январь — 01 февраль',
  timeline = MOCK_TIMELINE,
  onPdfClick,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const selectedEntry = timeline[selectedDayIndex];
  const chartData = chartDataProp ?? timelineToChartData(timeline);
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.title}>{name}</span>
          <span style={styles.subtitle}>{label}</span>
        </div>
        <PdfButton onClick={onPdfClick} />
      </div>

      {/* @figma-lock-start — график, не синхронизировать */}
      <EmployeeChart chartData={chartData} chartDateRange={chartDateRange} />
      {/* @figma-lock-end */}

      <div style={styles.timelineSection}>
        <div style={styles.timelineTableHeader}>
          <span style={styles.timelineTableTitle}>Таблица проходов по дням</span>
        </div>
        <div style={styles.timelineTableBody}>
          <EmployeeTimeline
            timeline={timeline}
            selectedDayIndex={selectedDayIndex}
            onSelectDay={setSelectedDayIndex}
          />
          <OverlayScrollArea style={styles.timelineRightCol}>
            {selectedEntry && (
              <EmployeeChronology
                entry={selectedEntry}
                projectName={projectName}
              />
            )}
          </OverlayScrollArea>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    width: '100%',
    height: '100%',
    minHeight: 0,
    backgroundColor: colors.bg.surface,
    borderRadius: 24,
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    boxSizing: 'border-box',
    fontFamily: 'Inter, sans-serif',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '0 16px',
    minHeight: 40,
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 400,
    color: colors.text.primary,
    lineHeight: 1.2,
    width: '100%',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 400,
    color: colors.text.muted,
    lineHeight: '15px',
  },
  timelineSection: {
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  timelineTableHeader: {
    flexShrink: 0,
    backgroundColor: colors.bg.elevated,
    borderBottom: `1px solid ${colors.stroke.subtle}`,
    padding: '8px 12px 8px 44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  timelineTableTitle: {
    fontSize: 10,
    fontWeight: 450,
    color: colors.text.muted,
    lineHeight: '12px',
  },
  timelineTableBody: {
    flex: 1,
    minHeight: 0,
    display: 'flex',
    overflow: 'hidden',
  },
  timelineRightCol: {
    flex: 1,
    minWidth: 0,
    padding: 0,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
};

export default EmployeeDetail;
