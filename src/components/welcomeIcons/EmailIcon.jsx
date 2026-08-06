import { twMerge } from 'tailwind-merge'

export const EmailIcon = ({ className }) => {
  return (
    <svg
      className={twMerge(className, 'email')}
      viewBox="0 0 164 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(12 4) scale(0.98)">
        <rect x="4" y="6" width="132" height="84" rx="10" fill="#D1D5DB" />
        <rect x="4" y="6" width="132" height="11" rx="10" fill="#F9FAFB" />
        <circle cx="12" cy="11.5" r="1.6" fill="#E5E7EB" />
        <circle cx="19" cy="11.5" r="1.6" fill="#E5E7EB" />
        <circle cx="26" cy="11.5" r="1.6" fill="#E5E7EB" />
        <rect x="42" y="9.5" width="58" height="4" rx="2" fill="#E5E7EB" />

        <rect x="12" y="20" width="116" height="62" rx="8" fill="#F9FAFB" />

        <rect x="18" y="49" width="28" height="18" rx="6" fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="2" />
        <rect x="24" y="55" width="14" height="3" rx="1.5" fill="#E5E7EB" />
        <rect x="24" y="60" width="9" height="3" rx="1.5" fill="#E5E7EB" />

        <rect x="94" y="49" width="28" height="18" rx="6" fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="2" />
        <rect x="100" y="55" width="14" height="3" rx="1.5" fill="#E5E7EB" />
        <rect x="100" y="60" width="9" height="3" rx="1.5" fill="#E5E7EB" />

        <circle cx="70" cy="44" r="21" fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="2" />
        <path
          d="M70 31c-5.523 0-10 4.477-10 10v5.182c0 1.432-.568 2.804-1.58 3.817L56 52.42h28l-2.42-2.42A5.397 5.397 0 0180 46.182V41c0-5.523-4.477-10-10-10z"
          fill="#E5E7EB"
          stroke="#D1D5DB"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M65.5 56a4.5 4.5 0 009 0" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />

        <circle cx="86" cy="30" r="6.5" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="2" />
        <path d="M86 27v3.5M86 33.5h.01" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />

        <path d="M46 71h48" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
        <rect x="52" y="74" width="36" height="4" rx="2" fill="#E5E7EB" />
      </g>
    </svg>
  )
}








