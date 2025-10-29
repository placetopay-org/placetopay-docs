
import { useLocale } from './LocaleProvider'
import { CL } from '@/components/icons/flagpack/CL';
import { UY } from '@/components/icons/flagpack/UY';
import { CO } from '@/components/icons/flagpack/CO';
import { EC } from '@/components/icons/flagpack/EC';
import { CR } from '@/components/icons/flagpack/CR';
import { PR } from '@/components/icons/flagpack/PR';
import { PA } from '@/components/icons/flagpack/PA';
import { HN } from '@/components/icons/flagpack/HN';
import { US } from '@/components/icons/flagpack/US';
import { MX } from '@/components/icons/flagpack/MX';

const countryFlags = {
    'CL': { 'es': 'Chile', icon: CL},
    'CO': { 'es': 'Colombia', icon: CO },
    'UY': { 'es': 'Uruguay', icon: UY },
    'EC': { 'es': 'Ecuador', icon: EC },
    'PA': { 'es': 'Panamá' ,  'en': 'Panama', icon: PA },
    'CR': { 'es': 'Costa Rica', icon: CR }, 
    'PR': { 'es': 'Puerto Rico', icon: PR },
    'HN': { 'es': 'Honduras', icon: HN }, 
    'US': { 'en': 'United States', 'es': 'Estados Unidos', icon: US },
    'MX': { 'en': 'Mexico', 'es': 'México', icon: MX },
}

export function CountryFlags({ countries = "", isHorizontal = true, prefix = "", className = "", withCountryName = true, ...props }) {
    const { isEn } = useLocale();
    
    const flagList = countries
        .split(",")
        .map(code => code.trim().toUpperCase())
        .filter(code => countryFlags[code])
        .map(code => countryFlags[code]);

    return (
        <div
            className={`inline-flex justify-start items-center align-baseline ${isHorizontal ? "flex-row gap-x-2" : "grid gap-y-2"} ${className}`}
            {...props}
        >
            {prefix && <span>{prefix}</span>}
            {flagList.length > 0 ? (
                flagList.map((flag, index) => {
                    const Icon = flag.icon
                    return (
                        <div className={`flex gap-x-2  items-center ${withCountryName ? "border border-gray-400 rounded-md px-1" : '' }`} key={index}>
                            {Icon && <Icon className="w-6 h-6" />}
                           { withCountryName && <span className='text-sm font-medium'> {isEn() ? flag.en || flag.es : flag.es} </span> }
                        </div>
                    );
                })
            ) : (
                <span className="text-gray-500">No flags available</span>
            )}
        </div>
    );
}
