import { C } from '../../tokens/colors'

export function HR({ style }) {
  return (
    <div
      style={{
        height: 1,
        background: C.stroke,
        flexShrink: 0,
        ...style,
      }}
    />
  )
}
