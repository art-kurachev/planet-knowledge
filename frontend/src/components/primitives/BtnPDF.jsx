import { C } from '../../tokens/colors'

export function BtnPDF() {
  return (
    <button
      type="button"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '6px 12px',
        borderRadius: 8,
        border: `1px solid ${C.stroke}`,
        background: C.white,
        fontSize: 12,
        fontWeight: 500,
        color: C.prText,
        cursor: 'pointer',
        flexShrink: 0,
        lineHeight: '16px',
      }}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path
          d="M6.5 1v8M3 6l3.5 3.5L10 6M1 12h11"
          stroke={C.prText}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      PDF
    </button>
  )
}
