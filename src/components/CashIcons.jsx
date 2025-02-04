import Image from 'next/image'
import cashAth from '@/images/cash/ath.svg'
import cashAval from '@/images/cash/aval.svg'
import cashBAv from '@/images/cash/b_av.svg'
import cashBBancolombia from '@/images/cash/b_bancolombia.svg'
import cashBBbva from '@/images/cash/b_bbva.svg'
import cashBBogota from '@/images/cash/b_bogota.svg'
import cashBDavivienda from '@/images/cash/b_davivienda.svg'
import cashBOccidente from '@/images/cash/b_occidente.svg'
import cashCarulla from '@/images/cash/carulla.svg'
import cashEfecty from '@/images/cash/efecty.svg'
import cashExito from '@/images/cash/exito.svg'
import cashGana from '@/images/cash/gana.svg'
import cashSuperGiros from '@/images/cash/super_giros.svg'
import cashSuperInter from '@/images/cash/super_inter.svg'
import cashSurtimax from '@/images/cash/surtimax.svg'
import cashWesternUnion from '@/images/cash/western_union.svg'

const icons = [
    {
        name: 'ATH',
        icon: cashAth
    },
    {
        name: 'Grupo Aval',
        icon: cashAval
    },
    {
        name: 'Banco AV Villas',
        icon: cashBAv
    },
    {
        name: 'Bancolombia',
        icon: cashBBancolombia
    },
    {
        name: 'BBVA',
        icon: cashBBbva
    },
    {
        name: 'Banco de Bogotá',
        icon: cashBBogota
    },
    {
        name: 'Davivienda',
        icon: cashBDavivienda
    },
    {
        name: 'Banco de Occidente',
        icon: cashBOccidente
    },
    {
        name: 'Carulla',
        icon: cashCarulla
    },
    {
        name: 'Efecty',
        icon: cashEfecty
    },
    {
        name: 'Exito',
        icon: cashExito
    },
    {
        name: 'Gana',
        icon: cashGana
    },
    {
        name: 'SuperGIROS',
        icon: cashSuperGiros
    },
    {
        name: 'SuperINTER',
        icon: cashSuperInter
    },
    {
        name: 'SurtiMAX',
        icon: cashSurtimax
    },
    {
        name: 'Western Union',
        icon: cashWesternUnion
    }
]

export function CashIcons(){
    return (
        <div className='flex gap-1 w-full flex-wrap bg-gray-100 dark:bg-gray-800/40 p-1 rounded-sm'>
            {
                icons.map((icon, index) => (
                    <Image src={icon.icon} key={index} alt={icon.name} title={icon.name}  className='m-0' unoptimized />
                ))
            }
        </div>
    )
}