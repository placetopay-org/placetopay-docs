import { twMerge } from 'tailwind-merge'

export const EmailIcon = ({ className }) => {
  return (
    <svg
      className={twMerge(className, 'email')}
      viewBox="0 0 164 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(10 8) scale(0.86)">
        <rect x="4" y="6" width="132" height="84" rx="10" fill="#D1D5DB" />
        <rect x="4" y="6" width="132" height="11" rx="10" fill="#F9FAFB" />
        <circle cx="12" cy="11.5" r="1.6" fill="#E5E7EB" />
        <circle cx="19" cy="11.5" r="1.6" fill="#E5E7EB" />
        <circle cx="26" cy="11.5" r="1.6" fill="#E5E7EB" />
        <rect x="42" y="9.5" width="58" height="4" rx="2" fill="#E5E7EB" />

        <rect x="12" y="20" width="116" height="62" rx="8" fill="#F9FAFB" />

        <path
          d="M24 35c0-4.418 3.582-8 8-8h44c4.418 0 8 3.582 8 8v16c0 4.418-3.582 8-8 8H53.5l-8 7v-7H32c-4.418 0-8-3.582-8-8V35z"
          fill="#F9FAFB"
          stroke="#D1D5DB"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect x="33" y="37" width="40" height="3.5" rx="1.75" fill="#E5E7EB" />
        <rect x="33" y="44" width="28" height="3.5" rx="1.75" fill="#E5E7EB" />
        <rect x="33" y="51" width="35" height="3.5" rx="1.75" fill="#E5E7EB" />

        <path
          d="M72 56c0-4.418 3.582-8 8-8h24c4.418 0 8 3.582 8 8v12c0 4.418-3.582 8-8 8H92l-6.5 6v-6H80c-4.418 0-8-3.582-8-8V56z"
          fill="#F9FAFB"
          stroke="#D1D5DB"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect x="79.5" y="58" width="24" height="3" rx="1.5" fill="#E5E7EB" />
        <rect x="79.5" y="64" width="18" height="3" rx="1.5" fill="#E5E7EB" />

        <circle cx="111" cy="32" r="7" fill="#E5E7EB" />
        <path
          d="M111 27v5.5M111 36.5h.01"
          stroke="#D1D5DB"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}






