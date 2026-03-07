import React from 'react';
import { DownloadIcon } from '../icons';
import { colors } from '../../tokens/colors';

interface PdfButtonProps {
  onClick?: () => void;
}

export const PdfButton: React.FC<PdfButtonProps> = ({ onClick }) => (
  <button className="skud-pdf-btn" style={styles.pdfBtn} onClick={onClick}>
    <DownloadIcon />
    <span style={styles.pdfLabel}>PDF</span>
  </button>
);

const styles: Record<string, React.CSSProperties> = {
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
};
