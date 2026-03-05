import { C } from '../../tokens/colors'

export function TH({ children, style }) {
  return (
    <th
      style={{
        padding: '8px 12px',
        textAlign: 'left',
        fontSize: 10,
        fontWeight: 450,
        color: C.secText,
        background: C.tableBg,
        whiteSpace: 'nowrap',
        borderBottom: `1px solid ${C.stroke}`,
        ...style,
      }}
    >
      {children}
    </th>
  )
}
