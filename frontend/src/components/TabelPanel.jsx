import { useState } from 'react'
import { Badge, BtnPDF, IconDanger, HR } from './primitives'
import { BarChart } from './BarChart'
import { C } from '../tokens/colors'
import { DAYS, LOG, CHART } from '../data/mockData'

export function TabelPanel({ employee }) {
  const [activeDayId, setActiveDayId] = useState(2)

  return (
    <div
      style={{
        width: '100%',
        height: 'fit-content',
        paddingTop: 16,
        background: C.white,
        borderRadius: 24,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        gap: 8,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: '0 16px 0 16px',
          gap: 16,
          flexShrink: 0,
        }}
      >
        <span style={{ width: '100%', fontSize: 20, fontWeight: 400, color: C.prText, lineHeight: '24px', verticalAlign: 'middle' }}>
          {employee ? `Табель — ${employee.name}` : 'Табель — Махмудов Кобулбек Махмудович'}
        </span>
        <BtnPDF />
      </div>
      <div style={{ padding: '0 8px 8px' }}>
        <BarChart
          data={CHART}
          subtitle="Отработанные часы по дням"
          dateRange="26 январь — 01 февраль"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', height: '100%' }}>
        <div
          style={{
            background: C.tableBg,
            padding: '8px 44px 8px 12px',
            flexShrink: 0,
            borderBottom: `1px solid ${C.stroke}`,
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 450, color: C.secText }}>Таблица проходов по дням</span>
        </div>
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <div
            style={{
              width: 144,
              minWidth: 100,
              flexShrink: 1,
              height: '100%',
              borderRight: `1px solid ${C.stroke}`,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {DAYS.map((d, i) => {
              const isSel = activeDayId === d.id
              return (
                <div key={d.id}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => d.status !== 'off' && setActiveDayId(d.id)}
                    onKeyDown={(e) => e.key === 'Enter' && d.status !== 'off' && setActiveDayId(d.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 12px',
                      gap: 12,
                      background: isSel ? C.activeRowBg : 'transparent',
                      borderLeft: `2px solid ${isSel ? C.accentBlue : 'transparent'}`,
                      cursor: d.status !== 'off' ? 'pointer' : 'default',
                      transition: 'background 0.1s',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: isSel ? 500 : 400,
                        color: isSel ? C.prText : C.deltaText,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {d.label}
                    </span>
                    {d.status === 'off' ? (
                      <span style={{ fontSize: 12, fontWeight: 400, color: 'rgb(213,214,218)' }}>—</span>
                    ) : (
                      <Badge type={d.status === 'green' ? 'green' : 'red'}>{d.worked}</Badge>
                    )}
                  </div>
                  {i < DAYS.length - 1 && <HR />}
                </div>
              )
            })}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
            <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
              <div
                style={{
                  background: C.tableBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  gap: 12,
                  borderBottom: `1px solid ${C.stroke}`,
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 450, color: C.secText }}>Хронология — 29 фев</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 450, color: C.secText }}>ЖК Заря</span>
                  <div style={{ width: 2, height: 2, borderRadius: '50%', background: C.secText }} />
                  <span style={{ fontSize: 10, fontWeight: 450, color: C.secText }}>КПП Главный</span>
                </div>
              </div>
              {LOG.map((entry, i) => (
                <div key={i}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 12px',
                      gap: 12,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: C.prText,
                        width: 35,
                        flexShrink: 0,
                      }}
                    >
                      {entry.time}
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '4px 8px',
                        borderRadius: 4,
                        fontSize: 10,
                        fontWeight: 500,
                        width: 48,
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        background: entry.type === 'in' ? C.greenBg : C.redBg,
                        color: entry.type === 'in' ? C.greenText : C.redText,
                      }}
                    >
                      {entry.type === 'in' ? 'Вход' : 'Выход'}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        {entry.type === 'in' ? (
                          <path
                            d="M2 6h8M7 3l3 3-3 3"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        ) : (
                          <path
                            d="M10 6H2M5 9L2 6l3-3"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        )}
                      </svg>
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 400, color: C.secText }}>{entry.place}</span>
                  </div>
                  <HR />
                </div>
              ))}
              <div
                style={{
                  background: C.tableBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  gap: 12,
                  borderBottom: `1px solid ${C.stroke}`,
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 450, color: C.secText }}>Итого за день</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.prText }}>7 ч 09 мин</span>
              </div>
            </div>
            <div style={{ padding: '8px', flexShrink: 0 }}>
              <div
                style={{
                  background: C.yellowBg,
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                  padding: '8px',
                }}
              >
                <IconDanger size={16} />
                <span style={{ fontSize: 10, fontWeight: 450, color: C.yellowText, lineHeight: '14px' }}>
                  Ошибка данных — выход не зафиксирован. Возможно сотрудник забыл приложить карту или пропуск не
                  работает.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
