import { Badge, Tag, BtnPDF, IconDanger } from './primitives'
import { TH, TD } from './table'
import { C } from '../tokens/colors'
import { EMPLOYEES } from '../data/mockData'

export function EmployeesPanel({ project, selected, onSelect }) {
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <span style={{ fontSize: 20, fontWeight: 400, color: C.prText, lineHeight: '24px', verticalAlign: 'middle' }}>
            {project ? `Сотрудники — ${project.name.split(' ').slice(-1)[0]}` : 'Сотрудники — ЖК Северный'}
          </span>
          <span style={{ fontSize: 12, fontWeight: 400, color: C.secText }}>Нажмите на сотрудника для деталей</span>
        </div>
        <BtnPDF />
      </div>
      <div style={{ overflowY: 'auto', overflowX: 'hidden', flex: 1, height: 'fit-content' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '5%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '18%' }} />
            <col style={{ width: '18%' }} />
            <col style={{ width: '19%' }} />
          </colgroup>
          <thead>
            <tr>
              <TH>№</TH>
              <TH>Проект</TH>
              <TH style={{ textAlign: 'right' }}>Отработано, ч.</TH>
              <TH style={{ textAlign: 'right' }}>План, ч.</TH>
              <TH style={{ textAlign: 'right' }}>Дельта, ч.</TH>
            </tr>
          </thead>
          <tbody>
            {EMPLOYEES.map((e) => {
              const isSel = selected?.id === e.id
              return (
                <tr
                  key={e.id}
                  onClick={() => onSelect(isSel ? null : e)}
                  style={{
                    background: e.error ? C.yellowBg : isSel ? C.activeRowBg : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.1s',
                    ...(isSel && {
                      border: 'none',
                      borderLeft: `3px solid ${C.accentBlue}`,
                    }),
                  }}
                >
                  <TD style={{ color: C.secText, fontSize: 10, fontWeight: 450 }}>{e.num}</TD>
                  <TD style={{ paddingRight: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, flex: 1 }}>
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
                          {e.name}
                        </span>
                        <div style={{ display: 'flex', gap: 2, flexWrap: 'nowrap' }}>
                          {e.tags.map((t, i) => (
                            <Tag key={i}>{t}</Tag>
                          ))}
                        </div>
                      </div>
                      {e.error && <IconDanger size={16} />}
                    </div>
                  </TD>
                  <TD style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: C.prText }}>{e.worked}</span>
                  </TD>
                  <TD style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: C.deltaText }}>{e.plan}</span>
                  </TD>
                  <TD style={{ textAlign: 'right' }}>
                    <Badge type={e.deltaType}>{e.delta}</Badge>
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
