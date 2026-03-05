import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
import { colors } from '../tokens/colors';

interface DayHours {
  day: string;
  hours: number;
  isOvertime?: boolean;
}

interface TimelineEntry {
  date: string;
  hours: string;
  events?: { time: string; direction: 'in' | 'out'; location: string }[];
  total?: string;
  error?: string;
  chronologyTitle?: string;
  chronologyLocation?: string;
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

const DownloadIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 10v2.667A1.333 1.333 0 003.333 14h9.334A1.333 1.333 0 0014 12.667V10M4.667 6.667L8 10l3.333-3.333M8 10V2"
      stroke={colors.text.primary}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRight: React.FC<{ color?: string }> = ({ color = colors.text.muted }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowLeft: React.FC<{ color?: string }> = ({ color = colors.status.error }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M9.5 6h-7M5.5 3l-3 3 3 3" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MOCK_CHART: DayHours[] = [
  { day: 'Вс, 26 янв', hours: 5.5 },
  { day: 'Пн, 27 янв', hours: 7.2 },
  { day: 'Вт, 28 янв', hours: 8 },
  { day: 'Ср, 29 янв', hours: 4, isOvertime: true },
  { day: 'Чт, 30 янв', hours: 8 },
  { day: 'Пт, 31 янв', hours: 9, isOvertime: true },
  { day: 'Сб, 1 фев', hours: 0 },
];

const MOCK_TIMELINE: TimelineEntry[] = [
  {
    date: 'Вс, 26 янв',
    hours: '8.5 ч',
    chronologyLocation: 'ЖК Заря • КПП Главный',
    events: [
      { time: '09:00', direction: 'in', location: 'КПП Главный' },
      { time: '18:00', direction: 'out', location: 'КПП Главный' },
    ],
    total: '8 ч 30 мин',
  },
  {
    date: 'Пн, 27 янв',
    hours: '7.2 ч',
    chronologyLocation: 'ЖК Заря • КПП Главный',
    error: 'Ошибка данных — выход не зафиксирован. Возможно сотрудник забыл приложить карту или пропуск не работает.',
    events: [
      { time: '08:58', direction: 'in', location: 'КПП Главный' },
      { time: '13:02', direction: 'out', location: 'КПП Главный' },
      { time: '13:58', direction: 'in', location: 'КПП Главный' },
    ],
    total: '7 ч 09 мин',
  },
  {
    date: 'Вт, 28 янв',
    hours: '7.2 ч',
    chronologyLocation: 'ЖК Заря • КПП Северный',
    events: [
      { time: '08:45', direction: 'in', location: 'КПП Северный' },
      { time: '17:30', direction: 'out', location: 'КПП Северный' },
    ],
    total: '7 ч 12 мин',
  },
  { date: 'Ср, 29 янв', hours: '7.2 ч' },
  { date: 'Чт, 30 янв', hours: '7.2 ч' },
  { date: 'Пт, 31 янв', hours: '7.2 ч' },
  { date: 'Сб, 1 фев', hours: '' },
];

const CustomBarLabel: React.FC<{ x?: number; y?: number; width?: number; value?: number }> = (props) => {
  const { x = 0, y = 0, width = 0, value } = props;
  if (!value) return null;
  return (
    <text
      x={x + width / 2}
      y={y - 6}
      textAnchor="middle"
      fontSize={10}
      fontWeight={500}
      fontFamily="Inter, sans-serif"
      fill={colors.text.primary}
    >
      {value}
    </text>
  );
};

export const EmployeeDetail: React.FC<EmployeeDetailProps> = ({
  name = 'Махмудов Кобулбек Махмудович',
  projectName,
  label = 'Табель',
  chartData = MOCK_CHART,
  chartDateRange = '26 январь — 01 февраль',
  timeline = MOCK_TIMELINE,
  onPdfClick,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const selectedEntry = timeline[selectedDayIndex];

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.title}>{name}</span>
          <span style={styles.subtitle}>{label}</span>
        </div>
        <button style={styles.pdfBtn} onClick={onPdfClick}>
          <DownloadIcon />
          <span style={styles.pdfLabel}>PDF</span>
        </button>
      </div>

      <div style={styles.chartSection}>
        <div style={styles.chartWrap}>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={chartData} barCategoryGap={16} margin={{ top: 16, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid
                strokeDasharray="0"
                stroke={colors.stroke.subtle}
                vertical={false}
                horizontalValues={[0]}
              />
              <ReferenceLine y={4} stroke={colors.stroke.subtle} strokeDasharray="4 4" isFront={false} />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: colors.text.muted, fontFamily: 'Inter, sans-serif' }}
                interval={0}
              />
              <YAxis hide domain={[0, 10]} />
              <Bar dataKey="hours" radius={[4, 4, 0, 0]} label={<CustomBarLabel />}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.isOvertime ? colors.status.error : colors.status.success}
                    opacity={entry.hours === 0 ? 0 : 0.8}
                  />
                ))}
              </Bar>
              <ReferenceLine y={8} stroke={colors.status.success} strokeDasharray="4 4" strokeWidth={1} isFront={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={styles.chartLabel}>
          <span style={styles.chartLabelText}>Отработанные часы по дням</span>
          <span style={styles.chartLabelDate}>{chartDateRange}</span>
        </div>
      </div>

      <div style={styles.timelineSection}>
        <div style={styles.timelineTableHeader}>
          <span style={styles.timelineTableTitle}>Таблица проходов по дням</span>
        </div>
        <div style={styles.timelineTableBody}>
          <div style={styles.timelineLeftCol}>
            {timeline.map((entry, i) => {
              const isSelected = selectedDayIndex === i;
              const isAboveTarget = entry.hours && parseFloat(entry.hours) >= 8;
              return (
                <div
                  key={i}
                  style={{
                    ...styles.timelineDayRow,
                    ...(isSelected ? styles.timelineDayRowSelected : {}),
                    ...(i === timeline.length - 1 ? { borderBottom: 'none' } : {}),
                  }}
                  onClick={() => setSelectedDayIndex(i)}
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
          </div>
          <div style={styles.timelineRightCol}>
            {selectedEntry && (
              <div style={styles.chronoBlock}>
                <div style={styles.chronoBlockHeader}>
                  <span style={styles.chronoTitle}>
                    {selectedEntry.chronologyTitle ?? `Хронология — ${selectedEntry.date}`}
                  </span>
                  {(projectName || selectedEntry.chronologyLocation) && (() => {
                    const checkpointName = selectedEntry.chronologyLocation?.split(' • ')[1];
                    const complexName = projectName ?? selectedEntry.chronologyLocation?.split(' • ')[0];
                    return (
                      <span style={styles.chronoLocation}>
                        {complexName && <span>{complexName}</span>}
                        {complexName && checkpointName && <span> • </span>}
                        {checkpointName && <span>{checkpointName}</span>}
                      </span>
                    );
                  })()}
                </div>
                {selectedEntry.error && (
                  <div style={styles.errorBox}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <path
                        d="M6.84 2.48L1.12 12a1.33 1.33 0 001.16 2h11.44a1.33 1.33 0 001.16-2L9.16 2.48a1.33 1.33 0 00-2.32 0z"
                        fill={colors.status.warning}
                        opacity="0.2"
                      />
                      <path
                        d="M8 6v2.67M8 11.33h.007"
                        stroke={colors.status.warning}
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span style={styles.errorText}>{selectedEntry.error}</span>
                  </div>
                )}
                {selectedEntry.events?.map((evt, j) => (
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
                {selectedEntry.total && (
                  <div style={styles.totalRow}>
                    <span style={styles.totalLabel}>Итого за день</span>
                    <span style={styles.totalValue}>{selectedEntry.total}</span>
                  </div>
                )}
              </div>
            )}
          </div>
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
    fontSize: 20,
    fontWeight: 400,
    color: colors.text.primary,
    lineHeight: '24px',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 400,
    color: colors.text.muted,
    lineHeight: '15px',
  },
  pdfBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: '6px 12px',
    borderRadius: 8,
    border: `1px solid ${colors.stroke.default}`,
    backgroundColor: colors.bg.surface,
    cursor: 'pointer',
    flexShrink: 0,
  },
  pdfLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.text.primary,
    lineHeight: '16px',
  },
  chartSection: {
    padding: '0 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  chartWrap: {
    height: 120,
    backgroundColor: colors.bg.elevated,
    borderRadius: 16,
    padding: '0 8px 8px 0',
    border: `1px solid ${colors.stroke.subtle}`,
  },
  chartLabel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 4,
  },
  chartLabelText: {
    fontSize: 10,
    fontWeight: 400,
    color: colors.text.muted,
    lineHeight: '14px',
  },
  chartLabelDate: {
    fontSize: 10,
    fontWeight: 400,
    color: colors.text.primary,
    lineHeight: '14px',
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
    minHeight: 42,
    borderBottom: `1px solid ${colors.stroke.subtle}`,
    cursor: 'pointer',
    boxSizing: 'border-box',
  },
  timelineDayRowSelected: {
    backgroundColor: colors.primary.activeRow,
    borderLeft: `4px solid ${colors.primary.default}`,
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
  timelineRightCol: {
    flex: 1,
    minWidth: 0,
    padding: 0,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  chronoBlock: {
    flex: 1,
    margin: 0,
    backgroundColor: colors.bg.surface,
    border: `1px solid ${colors.stroke.subtle}`,
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
  chronoHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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

export default EmployeeDetail;
