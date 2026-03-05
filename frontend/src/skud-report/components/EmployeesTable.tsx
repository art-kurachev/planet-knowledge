import React, { useState, useEffect } from 'react';
import { colors } from '../tokens/colors';

interface EmployeeRow {
  id: string;
  num: number;
  name: string;
  worked: number;
  plan: number;
  delta: string;
  deltaColor?: string;
  deltaBg?: string;
  hasWarning?: boolean;
}

interface EmployeesTableProps {
  address?: string;
  subtitle?: string;
  rows?: EmployeeRow[];
  activeId?: string;
  onRowClick?: (id: string, name: string) => void;
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

const WarningIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M6.84 2.48L1.12 12a1.33 1.33 0 001.16 2h11.44a1.33 1.33 0 001.16-2L9.16 2.48a1.33 1.33 0 00-2.32 0zM8 6v2.67M8 11.33h.007"
      stroke={colors.status.warning}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MOCK_ROWS: EmployeeRow[] = [
  { id: '1', num: 1, name: 'Иванов Пётр Сергеевич', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
  { id: '2', num: 2, name: 'Герасимов Сергей Львович', worked: 100, plan: 100, delta: '-12', deltaColor: colors.status.error, deltaBg: colors.status.errorBg },
  { id: '3', num: 3, name: 'Козлова Анна Михайловна', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
  { id: '4', num: 4, name: 'Махмудов Кобулбек Махмудович', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg, hasWarning: true },
  { id: '5', num: 5, name: 'Сидорова Елена Владимировна', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
  { id: '6', num: 6, name: 'Петров Алексей Николаевич', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
  { id: '7', num: 7, name: 'Новикова Мария Игоревна', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
  { id: '8', num: 8, name: 'Махмудов Кобулбек Махмудович', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
  { id: '9', num: 9, name: 'Махмудов Кобулбек Махмудович', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
  { id: '10', num: 10, name: 'Махмудов Кобулбек Махмудович', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
  { id: '11', num: 11, name: 'Махмудов Кобулбек Махмудович', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
  { id: '12', num: 12, name: 'Махмудов Кобулбек Махмудович', worked: 100, plan: 100, delta: '+3', deltaColor: colors.status.success, deltaBg: colors.status.successBg },
];

export const EmployeesTable: React.FC<EmployeesTableProps> = ({
  address = 'ул. Гагарина, д. 33, корп. 1 ЖК «Созвездие»',
  subtitle = 'Нажмите на сотрудника для деталей',
  rows = MOCK_ROWS,
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
        <button className="skud-pdf-btn" style={styles.pdfBtn} onClick={onPdfClick}>
          <DownloadIcon />
          <span style={styles.pdfLabel}>PDF</span>
        </button>
      </div>
      <div style={styles.tableWrap}>
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
                    borderBottom: `1px solid ${colors.stroke.subtle}`,
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
                      {row.hasWarning && <WarningIcon />}
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
