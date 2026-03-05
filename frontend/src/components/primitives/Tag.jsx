import { C } from '../../tokens/colors'

export function Tag({ children }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '4px 4px', borderRadius: 8,
      fontSize: 8, fontWeight: 500, lineHeight: '6px',
      background: C.tagBg, color: C.secText, whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  )
}
