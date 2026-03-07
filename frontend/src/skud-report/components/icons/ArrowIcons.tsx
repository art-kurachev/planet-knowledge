import React from 'react';
import { colors } from '../../tokens/colors';

export const ArrowRight: React.FC<{ color?: string }> = ({ color = colors.text.muted }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowLeft: React.FC<{ color?: string }> = ({ color = colors.status.error }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M9.5 6h-7M5.5 3l-3 3 3 3" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
