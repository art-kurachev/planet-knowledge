import { Badge, HR } from './primitives'
import { TH, TD } from './table'
import { C } from '../tokens/colors'
import { PROJECTS } from '../data/mockData'

export function ProjectsPanel({ selected, onSelect }) {
  return (
    <div
      style={{
        width: '100%',
        minWidth: 0,
        flex: 1,
        background: C.white,
        borderRadius: 24,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px 0 24px',
          gap: 16,
          minHeight: 56,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 20, fontWeight: 400, color: C.prText, lineHeight: '24px' }}>Проекты</span>
          <span style={{ fontSize: 12, fontWeight: 400, color: C.secText }}>26 янв — 01 фев</span>
        </div>
        <span
          style={{
            padding: '6px 8px',
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 500,
            background: C.greenBg,
            color: C.greenText,
          }}
        >
          Норма
        </span>
      </div>
      <HR />
      <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'fit-content' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '50%' }} />
            <col style={{ width: '17%' }} />
            <col style={{ width: '17%' }} />
            <col style={{ width: '16%' }} />
          </colgroup>
          <thead>
            <tr>
              <TH>Проект</TH>
              <TH style={{ textAlign: 'right' }}>Проходы</TH>
              <TH style={{ textAlign: 'right' }}>Переработка</TH>
              <TH style={{ textAlign: 'right' }}>Недоработка</TH>
            </tr>
          </thead>
          <tbody>
            {PROJECTS.map((p) => {
              const isSel = selected?.id === p.id
              return (
                <tr
                  key={p.id}
                  onClick={() => onSelect(isSel ? null : p)}
                  style={{
                    background: isSel ? C.activeRowBg : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.1s',
                    ...(isSel && {
                      border: 'none',
                      borderLeft: `3px solid ${C.accentBlue}`,
                    }),
                  }}
                >
                  <TD>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 8 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: C.stroke,
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: C.prText,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {p.name}
                        </span>
                        <span style={{ fontSize: 10, fontWeight: 400, color: C.secText }}>{p.sub}</span>
                      </div>
                    </div>
                  </TD>
                  <TD style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.prText }}>{p.passes}</span>
                  </TD>
                  <TD style={{ textAlign: 'right' }}>
                    <Badge type="green">{p.over}</Badge>
                  </TD>
                  <TD style={{ textAlign: 'right' }}>
                    <Badge type="red">{p.under}</Badge>
                  </TD>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
