
const countryFlags = {
    "PR": "🇵🇷",
    'US': "🇺🇸",
    'CO': "🇨🇴",
    'EC': "🇪🇨",
    'CL': "🇨🇱",
    'UY': "🇺🇾",
    'MX': "🇲🇽",
    'HN': "🇭🇳",
    'CR': "🇨🇷"
}

export function getFlag(country) {
    return countryFlags[country.toUpperCase()] || "";
}

export function CountryFlags({ countries = "", isHorizontal = true, prefix = "", className = "", ...props }) {
    const flagList = countries
        .split(",")
        .map(code => code.trim().toUpperCase())
        .filter(code => countryFlags[code])
        .map(code => countryFlags[code]);

    return (
        <div
            className={`inline-flex align-baseline ${isHorizontal ? "flex-row gap-x-2" : "flex-col gap-y-2"
                } items-center ${className}`}
        >
            {prefix && <span >{prefix}</span>}
            {flagList.length > 0 ? (
                flagList.map((flag, index) => (
                    <span key={index} className="text-2xl">{flag}</span>
                ))
            ) : (
                <span className="text-gray-500">No flags available</span>
            )}
        </div>
    );
}