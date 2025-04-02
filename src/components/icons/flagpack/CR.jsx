export function CR(props) {
    return (
        <svg
            {... props}
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="21"
            fill="none"
            viewBox="0 0 28 21"
        >
            <g clipPath="url(#clip0_2748_6959)">
                <mask
                    id="mask0_2748_6959"
                    width="28"
                    height="21"
                    x="0"
                    y="0"
                    maskUnits="userSpaceOnUse"
                    style={{ maskType: "luminance" }}
                >
                    <path fill="#fff" d="M.667.738h26.667v20H.667z"></path>
                </mask>
                <g mask="url(#mask0_2748_6959)">
                    <path
                        fill="#2E42A5"
                        fillRule="evenodd"
                        d="M.667.738v20h26.666v-20z"
                        clipRule="evenodd"
                    ></path>
                    <mask
                        id="mask1_2748_6959"
                        width="28"
                        height="21"
                        x="0"
                        y="0"
                        maskUnits="userSpaceOnUse"
                        style={{ maskType: "luminance" }}
                    >
                        <path
                            fill="#fff"
                            fillRule="evenodd"
                            d="M.667.738v20h26.666v-20z"
                            clipRule="evenodd"
                        ></path>
                    </mask>
                    <g mask="url(#mask1_2748_6959)">
                        <path
                            fill="#E31D1C"
                            stroke="#F7FCFF"
                            strokeWidth="2"
                            d="M.667 8.07h-1v5.334h28.666V8.071H.667Z"
                        ></path>
                    </g>
                </g>
            </g>
            <defs>
                <clipPath id="clip0_2748_6959">
                    <rect
                        width="26.667"
                        height="20"
                        x="0.667"
                        y="0.738"
                        fill="#fff"
                        rx="3"
                    ></rect>
                </clipPath>
            </defs>
        </svg>
    )
}
