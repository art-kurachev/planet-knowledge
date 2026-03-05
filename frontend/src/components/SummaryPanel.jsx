import { C } from '../tokens/colors'
import { SUMMARY } from '../data/mockData'
import { BarChart } from './BarChart'

// Сводка — блок общих показателей (Figma 18177:12244)
export function SummaryPanel() {
  const { dateFrom, dateTo, totalPasses, overtime, undertime, passesByDay } = SUMMARY

  return (
    <div
      style={{
        width: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
        height: 'fit-content',
        flexShrink: 0,
        background: C.white,
        border: `1px solid ${C.stroke}`,
        borderRadius: 32,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        overflow: 'hidden',
      }}
    >
      {/* Заголовок: Сводка + период (Figma 18177:12245–12247) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 8px',
          gap: 8,
          minWidth: 0,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 400, color: C.prText, lineHeight: 'normal', flexShrink: 0 }}>
          Сводка
        </span>
        <span style={{ fontSize: 14, fontWeight: 400, color: C.secText, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {dateFrom} — {dateTo}
        </span>
      </div>

      {/* KPI карточки (Figma 18177:12248–12257) */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 4, minWidth: 0 }}>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: C.tableBg,
            borderRadius: 12,
            padding: '8px 12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: 4,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 500, color: C.secText, lineHeight: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: 100 }}>
            Всего проходов
          </span>
          <span style={{ fontSize: 20, fontWeight: 600, color: C.prText }}>
            {totalPasses}
          </span>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: C.greenBg,
            borderRadius: 12,
            padding: '8px 12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: 4,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 500, color: C.greenText, lineHeight: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Переработки
          </span>
          <span style={{ fontSize: 20, fontWeight: 600, color: C.prText }}>
            {overtime}
          </span>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: C.redBg,
            borderRadius: 12,
            padding: '8px 12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: 4,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 500, color: C.redText, lineHeight: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Недоработки
          </span>
          <span style={{ fontSize: 20, fontWeight: 600, color: C.prText }}>
            {undertime}
          </span>
        </div>
      </div>

      <div style={{ minWidth: 0, width: '100%', boxSizing: 'border-box' }}>
        <BarChart
          data={passesByDay}
          subtitle="Проходы по дням"
          dateRange={`${dateFrom} — ${dateTo}`}
          accentColor={C.accentBlue}
        />
      </div>
    </div>
  )
}
