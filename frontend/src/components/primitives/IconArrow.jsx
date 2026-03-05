export function IconArrow({ dir }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      {dir === 'in' ? (
        <path
          d="M2 6h8M7 3l3 3-3 3"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M10 6H2M5 9L2 6l3-3"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}
