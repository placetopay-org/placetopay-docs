import { twMerge } from 'tailwind-merge'

export const EmailIcon = ({ className }) => {
  return (
    <svg
      className={twMerge(className, 'email')}
      viewBox="0 0 164 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="160" height="92" rx="12" fill="#F9FAFB" />
      <path
        d="M2 14c0-6.627 5.373-12 12-12h136c6.627 0 12 5.373 12 12v68c0 6.627-5.373 12-12 12H14C7.373 94 2 88.627 2 82V14z"
        stroke="#D1D5DB"
        strokeWidth="4"
      />
      <rect x="20" y="22" width="124" height="52" rx="8" fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="2" />
      <path
        d="M22 26.5L76.678 59.244a10 10 0 0010.322 0L142 26.5"
        stroke="#9CA3AF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 70l34.518-28.147M142 70l-34.518-28.147"
        stroke="#D1D5DB"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="131" cy="16" r="8" fill="#E5E7EB" />
      <path
        d="M126.5 16h9M131 11.5v9"
        stroke="#9CA3AF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}


