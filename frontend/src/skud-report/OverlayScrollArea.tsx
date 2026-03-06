import React from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const OPTIONS = {
  scrollbars: {
    autoHide: 'scroll' as const,
    autoHideDelay: 600,
    theme: 'os-theme-light',
  },
};

interface OverlayScrollAreaProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const OverlayScrollArea: React.FC<OverlayScrollAreaProps> = ({
  children,
  style,
  className,
}) => (
  <OverlayScrollbarsComponent
    element="div"
    options={OPTIONS}
    defer
    style={style}
    className={className}
  >
    {children}
  </OverlayScrollbarsComponent>
);
