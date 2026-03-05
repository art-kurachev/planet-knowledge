import { C } from '../../tokens/colors'

export function TD({ children, style }) {
  return (
    <td
      style={{
        padding: '8px 12px',
        fontSize: 12,
        color: C.prText,
        borderBottom: `1px solid ${C.stroke}`,
        verticalAlign: 'middle',
        ...style,
      }}
    >
      {children}
    </td>
  )
}
