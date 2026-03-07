import React from 'react';
import { colors } from '../../tokens/colors';

/** Warning triangle 16×16 — used in tables */
export const WarningIcon16: React.FC = () => (
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

/** Warning triangle 12×12 — used in attention card */
export const WarningIcon12: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M5.13 1.86L.84 9a1 1 0 00.87 1.5h8.58a1 1 0 00.87-1.5L6.87 1.86a1 1 0 00-1.74 0zM6 4.5v2M6 8.5h.005"
      stroke={colors.status.warning}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Warning triangle 16×16 with fill — used in error boxes */
export const WarningIconFilled: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M6.84 2.48L1.12 12a1.33 1.33 0 001.16 2h11.44a1.33 1.33 0 001.16-2L9.16 2.48a1.33 1.33 0 00-2.32 0z"
      fill={colors.status.warning}
      opacity="0.2"
    />
    <path
      d="M8 6v2.67M8 11.33h.007"
      stroke={colors.status.warning}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);
