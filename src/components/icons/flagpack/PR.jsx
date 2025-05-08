export function PR(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 27 21">
            <g clipPath="url(#a)">
                <mask
                    id="b"
                    width="27"
                    height="21"
                    x="0"
                    y="0"
                    maskUnits="userSpaceOnUse"
                    style={{ maskType: "luminance" }}
                >
                    <path fill="#fff" d="M0 .738h26.667v20H0z"></path>
                </mask>
                <g mask="url(#b)">
                    <path
                        fill="#EF0000"
                        fillRule="evenodd"
                        d="M0 .738v20h26.667v-20z"
                        clipRule="evenodd"
                    ></path>
                    <mask
                        id="c"
                        width="27"
                        height="21"
                        x="0"
                        y="0"
                        maskUnits="userSpaceOnUse"
                        style={{ maskType: "luminance" }}
                    >
                        <path
                            fill="#fff"
                            fillRule="evenodd"
                            d="M0 .738v20h26.667v-20z"
                            clipRule="evenodd"
                        ></path>
                    </mask>
                    <g mask="url(#c)">
                        <path
                            fill="#EF0000"
                            stroke="#F7FCFF"
                            strokeWidth="2"
                            d="M0 8.07h-1v5.334h28.667V8.071z"
                        ></path>
                    </g>
                    <path
                        fill="#3D58DB"
                        fillRule="evenodd"
                        d="M0 .738v20l15-10z"
                        clipRule="evenodd"
                    ></path>
                    <mask
                        id="d"
                        width="15"
                        height="21"
                        x="0"
                        y="0"
                        maskUnits="userSpaceOnUse"
                        style={{ maskType: "luminance" }}
                    >
                        <path
                            fill="#fff"
                            fillRule="evenodd"
                            d="M0 .738v20l15-10z"
                            clipRule="evenodd"
                        ></path>
                    </mask>
                    <g mask="url(#d)">
                        <path
                            fill="#F7FCFF"
                            fillRule="evenodd"
                            d="M5.573 12.585 2.513 14.2l1.49-3.245-1.898-1.733 2.343-.087 1.125-2.934.859 2.934h2.34l-1.56 1.82 1.24 3.245z"
                            clipRule="evenodd"
                        ></path>
                    </g>
                </g>
            </g>
            <defs>
                <clipPath id="a">
                    <rect width="26.667" height="20" y="0.738" fill="#fff" rx="3"></rect>
                </clipPath>
            </defs>
        </svg>
    )
}
