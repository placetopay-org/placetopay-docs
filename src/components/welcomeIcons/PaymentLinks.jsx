import { twMerge } from "tailwind-merge";

export const PaymentLinks = ({ className }) => {
  return (
    <svg className={twMerge(className, "payment-links")} xmlns="http://www.w3.org/2000/svg" viewBox="-10 10 180 60" width="164" height="96" fill="none">
      <mask
        id="a"
        width="164"
        height="64"
        x="0"
        y="0.337"
        fill="#000"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#fff" d="M0 .337h164v64H0z"></path>
        <path d="M2 12.337c0-5.523 4.477-10 10-10h140c5.523 0 10 4.477 10 10v36c0 5.523-4.477 10-10 10H12c-5.523 0-10-4.477-10-10v-36z"></path>
      </mask>
      <path
        fill="#F9FAFB"
        d="M2 12.337c0-5.523 4.477-10 10-10h140c5.523 0 10 4.477 10 10v36c0 5.523-4.477 10-10 10H12c-5.523 0-10-4.477-10-10v-36z"
      ></path>
      <path
        fill="#D1D5DB"
        d="M0 12.337c0-6.627 5.373-12 12-12h140c6.627 0 12 5.373 12 12h-4a8 8 0 00-8-8H12a8 8 0 00-8 8H0zm164 40c0 6.627-5.373 12-12 12H12c-6.627 0-12-5.373-12-12l4-4c0 2.21 3.582 4 8 4h140c4.418 0 8-1.79 8-4l4 4zm-152 12c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12v4a8 8 0 00-8 8v36c0 2.21 3.582 4 8 4v12zm140-64c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12v-12c4.418 0 8-1.79 8-4v-36a8 8 0 00-8-8v-4z"
        mask="url(#a)"
      ></path>
      <path
        fill="#9CA3AF"
        d="M87.667 44.337a2.333 2.333 0 100-4.667 2.333 2.333 0 000 4.667zm-10.667 0a2.333 2.333 0 100-4.667 2.333 2.333 0 000 4.667zM72.453 19.59l-.266 3.267a1.058 1.058 0 001.066 1.147h20.414c.56 0 1.026-.427 1.066-.987.174-2.36-1.626-4.28-3.986-4.28H74.36a3.635 3.635 0 00-.813-1.613 3.545 3.545 0 00-2.56-1.12h-2.32c-.547 0-1 .453-1 1 0 .546.453 1 1 1h2.32c.413 0 .8.173 1.08.466.28.307.413.707.386 1.12zm20.894 6.414H72.893a1.07 1.07 0 00-1.066.973l-.48 5.8a3.897 3.897 0 003.88 4.227h14.826c2 0 3.76-1.64 3.907-3.64l.44-6.227a1.043 1.043 0 00-1.053-1.133z"
      ></path>
      <g filter="url(#b)">
        <path
          fill="#F9FAFB"
          fillRule="evenodd"
          d="M134.373 63.86L150 58.138l-42-23.8 12.244 47.76 9.17-14.243 10.978 14.483 4.959-3.994-10.978-14.482z"
          clipRule="evenodd"
        ></path>
        <path
          stroke="#9CA3AF"
          strokeWidth="4"
          d="M150.688 60.015l4.059-1.487-3.761-2.131-42-23.8-4.091-2.318 1.168 4.555 12.244 47.76 1.138 4.44 2.481-3.854 7.621-11.838 9.251 12.203 1.244 1.641 1.604-1.291 4.959-3.994 1.513-1.218-1.173-1.548-9.344-12.327 13.087-4.793z"
        ></path>
      </g>
      <defs>
        <filter
          id="b"
          width="63.704"
          height="71.75"
          x="98.79"
          y="24.22"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="1"></feOffset>
          <feGaussianBlur stdDeviation="1.5"></feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1039_1499"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1039_1499"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}
