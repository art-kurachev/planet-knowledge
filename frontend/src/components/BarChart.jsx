import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts'
import { C } from '../tokens/colors'

/** Бар-чарт с Recharts. Принимает data из API. accentColor — цвет баров для положительных значений (по умолчанию зелёный). */
export function BarChart({ data, subtitle, dateRange, accentColor }) {
  const maxVal = Math.max(...data.map((d) => d.val || 0), 9)
  const positiveColor = accentColor ?? C.greenText

  const getBarColor = (entry) => {
    if (entry.val === 0) return C.secText
    return entry.val < (entry.norm ?? 0) ? C.redText : positiveColor
  }

  return (
    <div style={{ padding: 0 }}>
      <div
        style={{
          background: C.tableBg,
          borderRadius: 16,
          padding: '24px 0 0',
          overflow: 'visible',
          width: '100%',
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            margin={{ top: 8, right: 20, left: 20, bottom: 8 }}
          >
            <YAxis domain={[0, maxVal]} hide />
            <XAxis
              dataKey="label"
              tickFormatter={(v) => (typeof v === 'string' ? v.split(', ')[0] : v)}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 400, fill: C.secText }}
              dy={8}
            />
            <Bar dataKey="val" maxBarSize={32} radius={[3, 3, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
              ))}
              <LabelList
                dataKey="val"
                position="top"
                formatter={(v) => (v > 0 ? v : '')}
                style={{ fontSize: 10, fontWeight: 400, fill: C.deltaText }}
              />
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
        <div style={{ height: 1, background: C.stroke, margin: '0 8px' }} />
      </div>
      {(subtitle || dateRange) && (
        <div style={{ display: 'flex', gap: 4, marginTop: 8, paddingLeft: 4, justifyContent: 'center', alignItems: 'flex-start' }}>
          {subtitle && (
            <span style={{ fontSize: 12, fontWeight: 400, color: C.secText }}>
              {subtitle}
            </span>
          )}
          {dateRange && (
            <span style={{ fontSize: 12, fontWeight: 400, color: C.prText }}>
              {dateRange}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
