export function PA(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="22"
            fill="none"
            viewBox="0 0 20 15"
        >
            <g clipPath="url(#clip0_270_61003)">
                <rect width="20" height="15" fill="#fff" rx="2"></rect>
                <path
                    fill="#F7FCFF"
                    fillRule="evenodd"
                    d="M0 0v15h20V0z"
                    clipRule="evenodd"
                ></path>
                <mask
                    id="mask0_270_61003"
                    width="20"
                    height="15"
                    x="0"
                    y="0"
                    maskUnits="userSpaceOnUse"
                    style={{ maskType: "luminance" }}
                >
                    <path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M0 0v15h20V0z"
                        clipRule="evenodd"
                    ></path>
                </mask>
                <g fillRule="evenodd" clipRule="evenodd" mask="url(#mask0_270_61003)">
                    <path
                        fill="#E31D1C"
                        d="M10 0v7.5h10V0zM14.388 11.969l-1.439.89.559-1.495-1.223-1.132h1.483l.62-1.616.473 1.617h1.486l-1.07 1.131.524 1.495z"
                    ></path>
                    <path
                        fill="#2E42A5"
                        d="m5.638 5.228-1.439.89.559-1.494-1.223-1.132h1.483l.62-1.617.473 1.617h1.486l-1.07 1.132.523 1.494zM0 7.5V15h10V7.5z"
                    ></path>
                </g>
            </g>
            <defs>
                <clipPath id="clip0_270_61003">
                    <rect width="20" height="15" fill="#fff" rx="2"></rect>
                </clipPath>
            </defs>
        </svg>
    )
}
