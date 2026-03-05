import { C } from '../../tokens/colors'

export function Badge({ type, children }) {
  const s = {
    green: { bg: C.greenBg, color: C.greenText },
    red: { bg: C.redBg, color: C.redText },
    yellow: { bg: C.yellowBg, color: C.yellowText },
  }[type] || { bg: C.greenBg, color: C.greenText }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '4px 8px', borderRadius: 4,
      fontSize: 10, fontWeight: 500, lineHeight: '10px',
      background: s.bg, color: s.color, whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  )
}
