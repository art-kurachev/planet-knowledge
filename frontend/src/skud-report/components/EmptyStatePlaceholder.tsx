import React from 'react';
import { colors } from '../tokens/colors';

interface EmptyStatePlaceholderProps {
  title: string;
  subtitle: string;
  icon: 'people' | 'personalcard';
}

/** Иконка «люди» — группа сотрудников (meet.svg) */
const PeopleIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ display: 'block' }}>
    <path
      d="M22.6267 19.2533C24.4533 19.56 26.4667 19.24 27.88 18.2933C29.76 17.04 29.76 14.9866 27.88 13.7333C26.4533 12.7866 24.4133 12.4666 22.5867 12.7866M9.33331 19.2533C7.50665 19.56 5.49332 19.24 4.07998 18.2933C2.19998 17.04 2.19998 14.9866 4.07998 13.7333C5.50665 12.7866 7.54665 12.4666 9.37331 12.7866M24 9.54663C23.92 9.5333 23.8267 9.5333 23.7467 9.54663C21.9067 9.47996 20.44 7.9733 20.44 6.10663C20.44 4.19996 21.9733 2.66663 23.88 2.66663C25.7867 2.66663 27.32 4.2133 27.32 6.10663C27.3067 7.9733 25.84 9.47996 24 9.54663ZM7.95998 9.54663C8.03998 9.5333 8.13331 9.5333 8.21331 9.54663C10.0533 9.47996 11.52 7.9733 11.52 6.10663C11.52 4.19996 9.98665 2.66663 8.07998 2.66663C6.17331 2.66663 4.63998 4.2133 4.63998 6.10663C4.65331 7.9733 6.11998 9.47996 7.95998 9.54663ZM16 19.5066C15.92 19.4933 15.8266 19.4933 15.7466 19.5066C13.9066 19.44 12.44 17.9333 12.44 16.0666C12.44 14.16 13.9733 12.6266 15.88 12.6266C17.7866 12.6266 19.32 14.1733 19.32 16.0666C19.3066 17.9333 17.84 19.4533 16 19.5066ZM12.12 23.7066C10.24 24.96 10.24 27.0133 12.12 28.2666C14.2533 29.6933 17.7466 29.6933 19.88 28.2666C21.76 27.0133 21.76 24.96 19.88 23.7066C17.76 22.2933 14.2533 22.2933 12.12 23.7066Z"
      stroke={colors.text.muted}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Иконка «личная карта» / табель (personalcard.svg) */
const PersonalCardIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ display: 'block' }}>
    <path
      d="M18.6666 10.6667H25.3333M20 16H25.3333M22.6666 21.3333H25.3333M16 21.7733C15.8133 19.84 14.28 18.32 12.3466 18.1467C11.68 18.08 11 18.08 10.32 18.1467C8.38663 18.3333 6.85329 19.84 6.66663 21.7733M22.6666 28H9.33329C3.99996 28 2.66663 26.6667 2.66663 21.3333V10.6667C2.66663 5.33333 3.99996 4 9.33329 4H22.6666C28 4 29.3333 5.33333 29.3333 10.6667V21.3333C29.3333 26.6667 28 28 22.6666 28ZM13.7466 12.64C13.7466 13.9728 12.6661 15.0533 11.3333 15.0533C10.0004 15.0533 8.91996 13.9728 8.91996 12.64C8.91996 11.3072 10.0004 10.2267 11.3333 10.2267C12.6661 10.2267 13.7466 11.3072 13.7466 12.64Z"
      stroke={colors.text.muted}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
