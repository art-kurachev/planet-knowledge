import React from 'react';
import { colors } from '../tokens/colors';
import { PeopleIcon, PersonalCardIcon } from './icons';

interface EmptyStatePlaceholderProps {
  title: string;
  subtitle: string;
  icon: 'people' | 'personalcard';
}

/**
 * Заглушка Empty State — по макету Figma (node 18176:11415, 18176:11427).
 * Варианты: NoData/NoResults, Regular.
 */
export const EmptyStatePlaceholder: React.FC<EmptyStatePlaceholderProps> = ({
  title,
  subtitle,
  icon,
}) => (
  <div style={styles.card}>
    <div style={styles.inner}>
      <div style={styles.iconWrapper}>
        {icon === 'people' ? <PeopleIcon /> : <PersonalCardIcon />}
      </div>
      <div style={styles.textBlock}>
        <span style={styles.title}>{title}</span>
        <span style={styles.subtitle}>{subtitle}</span>
      </div>
    </div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  card: {
    width: '100%',
    height: '100%',
    minHeight: 0,
    backgroundColor: colors.bg.surface,
    borderRadius: 24,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, sans-serif',
  },
  inner: {
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: '40px 24px',
    backgroundColor: colors.bg.elevated,
    flexShrink: 0,
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 16,
    backgroundColor: colors.bg.input,
    flexShrink: 0,
  },
  textBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.text.primary,
    lineHeight: '19px',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 200,
    color: colors.text.muted,
    lineHeight: 1,
  },
};

export default EmptyStatePlaceholder;
