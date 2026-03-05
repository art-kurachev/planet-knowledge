import { C } from '../../tokens/colors'

export function VR({ style }) {
  return (
    <div
      style={{
        width: 1,
        background: C.stroke,
        flexShrink: 0,
        alignSelf: 'stretch',
        ...style,
      }}
    />
  )
}
