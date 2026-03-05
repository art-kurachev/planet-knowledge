import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { colors } from '../tokens/colors';

interface DayData {
  day: string;
  value: number;
  isWeekend?: boolean;
}

interface DailyChartProps {
  title?: string;
  dateRange?: string;
  data?: DayData[];
}

const MOCK_DATA: DayData[] = [
  { day: 'пн', value: 350 },
  { day: 'вт', value: 280 },
  { day: 'ср', value: 320 },
  { day: 'чт', value: 200 },
  { day: 'пт', value: 250 },
  { day: 'сб', value: 180, isWeekend: true },
  { day: 'вс', value: 120, isWeekend: true },
];

const CustomTooltip: React.FC<{ active?: boolean; payload?: Array<{ value: number }> }> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={tooltipStyles.container}>
        <span style={tooltipStyles.text}>{payload[0].value} шт.</span>
        <div style={tooltipStyles.tip} />
      </div>
    );
  }
  return null;
};

export const DailyChart: React.FC<DailyChartProps> = ({
  title = 'Всего проходов по дням',
  dateRange = '26 янв — 01 фев',
  data = MOCK_DATA,
}) => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.title}>{title}</span>
        <span style={styles.dateRange}>{dateRange}</span>
      </div>
      <div style={styles.chartWrap}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 16, right: 16, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={colors.primary.default}
                  stopOpacity={0.15}
                />
                <stop
                  offset="100%"
                  stopColor={colors.primary.default}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="0"
              stroke={colors.stroke.subtle}
              vertical={false}
              horizontalValues={[0]}
            />
            <ReferenceLine y={250} stroke={colors.stroke.subtle} strokeDasharray="4 4" isFront={false} />
            <ReferenceLine y={500} stroke={colors.stroke.subtle} strokeDasharray="4 4" isFront={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={(props: { x?: number; y?: number; payload?: { value: string } }) => {
                const { x = 0, y = 0, payload } = props;
                const item = data.find((d) => d.day === payload?.value);
                return (
                  <text
                    x={x}
                    y={(y || 0) + 12}
                    textAnchor="middle"
                    fontSize={10}
                    fontWeight={400}
                    fontFamily="Inter, sans-serif"
                    fill={
                      item?.isWeekend
                        ? colors.status.error
                        : colors.text.muted
                    }
                  >
                    {payload?.value}
                  </text>
                );
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fontWeight: 400,
                fontFamily: 'Inter, sans-serif',
                fill: colors.text.muted,
              }}
              ticks={[0, 250, 500]}
              width={35}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={colors.primary.default}
              strokeWidth={2}
              fill="url(#chartGrad)"
              dot={{
                r: 4,
                fill: colors.bg.surface,
                stroke: colors.primary.default,
                strokeWidth: 2,
              }}
              activeDot={{
                r: 8,
                fill: colors.primary.default,
                stroke: colors.bg.surface,
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    width: '100%',
    height: '100%',
    minHeight: 200,
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
    height: 'fit-content',
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
  chartWrap: {
    flex: 1,
    backgroundColor: colors.bg.elevated,
    borderRadius: 16,
    padding: '0 8px 8px 0',
  },
};

const tooltipStyles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: colors.text.primary,
    borderRadius: 8,
    padding: '8px 8px 2px 8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    color: colors.text.onPrimary,
    fontSize: 11,
    fontWeight: 500,
    fontFamily: 'Inter, sans-serif',
  },
  tip: {
    width: 0,
    height: 0,
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderTop: `6px solid ${colors.text.primary}`,
    marginTop: 2,
  },
};

export default DailyChart;
