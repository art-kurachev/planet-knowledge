import React, { useState, useEffect } from 'react';
import { colors } from '../tokens/colors';
import { OverlayScrollArea } from '../OverlayScrollArea';
import { DangerIcon16 } from './icons';
import { PdfButton } from './shared';
import { MOCK_EMPLOYEE_ROWS } from '../mocks';
import type { EmployeeRow } from '../mocks';

interface EmployeesTableProps {
  address?: string;
  subtitle?: string;
  rows?: EmployeeRow[];
  activeId?: string;
  onRowClick?: (id: string, name: string) => void;
  onPdfClick?: () => void;
}

export const EmployeesTable: React.FC<EmployeesTableProps> = ({
  address = 'ул. Гагарина, д. 33, корп. 1 ЖК «Созвездие»',
  subtitle = 'Нажмите на сотрудника для деталей',
  rows = MOCK_EMPLOYEE_ROWS,
  activeId: controlledActiveId,
  onRowClick,
  onPdfClick,
}) => {
  const [internalActiveId, setInternalActiveId] = useState<string | null>(null);
  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

  useEffect(() => {
    if (controlledActiveId !== undefined) {
      setInternalActiveId(controlledActiveId);
    }
  }, [controlledActiveId]);

  const handleClick = (row: EmployeeRow) => {
    setInternalActiveId(row.id);
    onRowClick?.(row.id, row.name);
  };

  const isActive = (id: string) => activeId != null && id === activeId;

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.title}>{address}</span>
          <span style={styles.subtitle}>{subtitle}</span>
        </div>
        <PdfButton onClick={onPdfClick} />
      </div>
      <OverlayScrollArea style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, width: 16 }}>№</th>
              <th style={{ ...styles.th, ...styles.thEmployee }}>Сотрудник</th>
              <th style={{ ...styles.th, width: 70 }}>Отработано, ч.</th>
              <th style={{ ...styles.th, width: 50 }}>План, ч.</th>
              <th style={{ ...styles.th, width: 50, ...styles.thDelta }}>Дельта, ч.</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const active = isActive(row.id);
              const isWarningRow = row.hasWarning;
              return (
                <tr
                  key={row.id}
                  className="skud-table-row"
                  onClick={() => handleClick(row)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: isWarningRow
                      ? colors.status.warningBg
                      : active
                      ? colors.primary.activeRow
                      : 'transparent',
                    backgroundImage: `linear-gradient(to bottom, transparent calc(100% - 1px), ${colors.stroke.subtle} calc(100% - 1px))`,
                  }}
                >
                  <td
                    style={{
                      ...styles.td,
                      borderLeft: active
                        ? `4px solid ${colors.primary.default}`
                        : '4px solid transparent',
                    }}
                  >
                    <span style={styles.numText}>{row.num}</span>
                  </td>
                  <td style={{ ...styles.td, ...styles.tdEmployee }}>
                    <div style={styles.nameCell}>
                      <span style={styles.nameText}>{row.name}</span>
                      {row.hasWarning && <DangerIcon16 />}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.cellText}>{row.worked}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.planText}>{row.plan}</span>
                  </td>
                  <td style={{ ...styles.td, ...styles.tdDelta }}>
                    <span
                      style={{
                        ...styles.deltaBadge,
                        backgroundColor: row.deltaBg,
                        color: row.deltaColor,
                      }}
                    >
                      {row.delta}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </OverlayScrollArea>
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
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 400,
    color: colors.text.muted,
    lineHeight: '15px',
  },
  tableWrap: {
    flex: 1,
    minHeight: 0,
    overflowX: 'auto',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    position: 'relative',
    transform: 'translateZ(0)',
  },
  table: {
    width: '100%',
    minWidth: 320,
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
  },
  th: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: colors.bg.elevated,
    padding: '8px 12px',
    fontSize: 10,
    fontWeight: 450,
    color: colors.text.muted,
    textAlign: 'right',
    lineHeight: '12px',
    whiteSpace: 'nowrap',
  },
  thEmployee: { textAlign: 'left' },
  thDelta: { textAlign: 'center' },
  td: {
    padding: '8px 12px',
    verticalAlign: 'middle',
    minHeight: 44,
    height: 44,
    boxSizing: 'border-box',
    textAlign: 'right',
  },
  tdEmployee: { textAlign: 'left' },
  tdDelta: { textAlign: 'center' },
  numText: {
    fontSize: 10,
    fontWeight: 450,
    color: colors.text.muted,
    lineHeight: '12px',
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  nameText: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.text.primary,
    lineHeight: '12px',
  },
  cellText: {
    fontSize: 12,
    fontWeight: 400,
    color: colors.text.primary,
    lineHeight: '16px',
  },
  planText: {
    fontSize: 12,
    fontWeight: 400,
    color: colors.text.muted,
    lineHeight: '16px',
  },
  deltaBadge: {
    fontSize: 10,
    fontWeight: 500,
    padding: '4px 6px',
    borderRadius: 4,
    lineHeight: '10px',
    whiteSpace: 'nowrap',
  },
};

export default EmployeesTable;
