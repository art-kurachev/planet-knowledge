import React, { useState } from 'react';
import { colors } from '../tokens/colors';
import { OverlayScrollArea } from '../OverlayScrollArea';
import { MOCK_PROJECT_ROWS } from '../mocks';
import type { ProjectRow } from '../mocks';

interface ProjectsTableProps {
  title?: string;
  subtitle?: string;
  dateRange?: string;
  rows?: ProjectRow[];
  activeId?: string;
  onRowClick?: (id: string, name: string) => void;
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({
  title = 'Проекты',
  subtitle = 'Нажмите на проект для деталей',
  dateRange = '26 янв — 01 фев',
  rows = MOCK_PROJECT_ROWS,
  activeId: controlledActiveId,
  onRowClick,
}) => {
  const [internalActiveId, setInternalActiveId] = useState<string | null>(null);
  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

  const handleClick = (row: ProjectRow) => {
    setInternalActiveId(row.id);
    onRowClick?.(row.id, row.name);
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.title}>{title}</span>
          <span style={styles.subtitle}>{subtitle}</span>
        </div>
        <span style={styles.dateRange}>{dateRange}</span>
      </div>
      <OverlayScrollArea style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, textAlign: 'left' }}>Проект</th>
              <th style={{ ...styles.th, width: 70, textAlign: 'right' }}>Проходы, шт.</th>
              <th style={{ ...styles.th, width: 60 }}>Перераб., ч.</th>
              <th style={{ ...styles.th, width: 60 }}>Недораб., ч.</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isActive = activeId != null && row.id === activeId;
              return (
                <tr
                  key={row.id}
                  className="skud-table-row"
                  onClick={() => handleClick(row)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: isActive
                      ? colors.primary.activeRow
                      : 'transparent',
                    backgroundImage: `linear-gradient(to bottom, transparent calc(100% - 1px), ${colors.stroke.subtle} calc(100% - 1px))`,
                    boxShadow: isActive
                      ? `inset 4px 0 0 0 ${colors.primary.default}`
                      : 'none',
                  }}
                >
                  <td
                    style={{
                      ...styles.td,
                      paddingLeft: 10,
                    }}
                  >
                    <div style={styles.projectCell}>
                      <div
                        style={{
                          ...styles.avatar,
                          backgroundColor: row.avatarColor,
                        }}
                      />
                      <span style={styles.projectName}>{row.name}</span>
                    </div>
                  </td>
                  <td style={{ ...styles.td, textAlign: 'right' }}>
                    <span style={styles.cellText}>{row.passes}</span>
                  </td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.valueBadge,
                        backgroundColor: colors.status.successBg,
                        color: colors.status.success,
                      }}
                    >
                      {row.overtime}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.valueBadge,
                        backgroundColor: colors.status.errorBg,
                        color: colors.status.error,
                      }}
                    >
                      {row.shortage}
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
    padding: '0 24px',
    minHeight: 40,
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
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
  dateRange: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.text.secondary,
    lineHeight: '17px',
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
    textAlign: 'center',
    lineHeight: '12px',
    whiteSpace: 'nowrap',
  },
  td: {
    padding: '8px 12px',
    verticalAlign: 'middle',
    minHeight: 44,
    height: 44,
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  projectCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    flexShrink: 0,
  },
  projectName: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.text.primary,
    lineHeight: '15px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cellText: {
    fontSize: 12,
    fontWeight: 400,
    color: colors.text.primary,
    lineHeight: '16px',
  },
  valueBadge: {
    fontSize: 10,
    fontWeight: 500,
    padding: '4px 6px',
    borderRadius: 4,
    lineHeight: '10px',
    whiteSpace: 'nowrap',
  },
};

export default ProjectsTable;
