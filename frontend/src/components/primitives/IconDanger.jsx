import { C } from '../../tokens/colors'

export function IconDanger({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M8 2L14.5 13H1.5L8 2Z"
        stroke={C.yellowText}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M8 6.5v3M8 11v.5"
        stroke={C.yellowText}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}
