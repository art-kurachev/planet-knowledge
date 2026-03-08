import React from 'react';
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
import { colors } from '../../tokens/colors';
import type { DayHours } from '../../mocks';

interface EmployeeChartProps {
  chartData: DayHours[];
  chartDateRange: string;
}

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

export const EmployeeChart: React.FC<EmployeeChartProps> = ({ chartData, chartDateRange }) => (
  // @figma-lock-start — график, ручная правка высоты
  <div style={styles.chartSection}>
    <div style={styles.chartWrap}>
      <ResponsiveContainer width="100%" height={147}>
        <BarChart data={chartData} barCategoryGap={16} margin={{ top: 16, right: 0, bottom: 0, left: 0 }}>
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
  // @figma-lock-end
);

const styles: Record<string, React.CSSProperties> = {
  chartSection: {
    padding: '0 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  chartWrap: {
    height: 140,
    backgroundColor: colors.bg.elevated,
    borderRadius: 16,
    padding: 0,
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
};
