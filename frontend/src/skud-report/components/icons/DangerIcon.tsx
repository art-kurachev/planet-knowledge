import React from 'react';
import { colors } from '../../tokens/colors';

/** Danger/warning triangle 16×16 — для ошибки данных */
export const DangerIcon16: React.FC<{ color?: string }> = ({ color = colors.status.warning }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M7.99979 6.00006V9.33339M7.99613 11.3334H8.00212M7.99979 14.2734H3.95979C1.64646 14.2734 0.679793 12.6201 1.79979 10.6001L3.87979 6.85339L5.83979 3.33339C7.02646 1.19339 8.97313 1.19339 10.1598 3.33339L14.1998 10.6067C15.3198 12.6267 14.3465 14.2801 12.0398 14.2801H7.99979V14.2734Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Danger/warning triangle 12×12 — для ошибки данных в бейджах */
export const DangerIcon12: React.FC<{ color?: string }> = ({ color = colors.status.warning }) => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M7.99979 6.00006V9.33339M7.99613 11.3334H8.00212M7.99979 14.2734H3.95979C1.64646 14.2734 0.679793 12.6201 1.79979 10.6001L3.87979 6.85339L5.83979 3.33339C7.02646 1.19339 8.97313 1.19339 10.1598 3.33339L14.1998 10.6067C15.3198 12.6267 14.3465 14.2801 12.0398 14.2801H7.99979V14.2734Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
