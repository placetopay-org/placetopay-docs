
import { useLocale } from './LocaleProvider'

const countryFlags = {
    'CL': { 'es': 'Chile', icon: "🇨🇱" },
    'CO': { 'es': 'Colombia', icon: "🇨🇴" },
    'CR': { 'en': 'Costa Rica', icon: "🇨🇷" },
    'PR': { 'es': 'Puerto Rico', icon: "🇵🇷" },
    'HN': { 'es': 'Honduras', icon: "🇭🇳" },
    'US': { 'en': 'United States', 'es': 'Estados Unidos', icon: "🇺🇸"},
    'MX': { 'en': 'Mexico', 'es': 'México', icon: "🇲🇽"},
    'UY': { 'es': 'Uruguay', icon: "🇺🇾" },
}

export function CountryFlags({ countries = "", isHorizontal = true, prefix = "", className = "", ...props }) {
    const { isEn } = useLocale();
    
    const flagList = countries
        .split(",")
        .map(code => code.trim().toUpperCase())
        .filter(code => countryFlags[code])
        .map(code => countryFlags[code]);

    return (
        <div
            className={`inline-flex items-center align-baseline ${isHorizontal ? "flex-row gap-x-2" : "flex-col gap-y-2"} ${className}`}
            {...props}
        >
            {prefix && <span>{prefix}</span>}
            {flagList.length > 0 ? (
                flagList.map((flag, index) => {
                    return (
                        <div className='flex gap-x-2 border border-gray-400 rounded-md px-1 items-center' key={index} >
                            <span key={index} className="text-2xl">{flag.icon}</span>
                            <span className='text-sm font-medium'> {isEn() ? flag.en || flag.es : flag.es} </span>
                        </div>
                    );
                })
            ) : (
                <span className="text-gray-500">No flags available</span>
            )}
        </div>
    );
}
