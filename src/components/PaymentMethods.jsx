import Image from 'next/image'
import logoVisa from '@/images/cards/visa.svg'
import logoVisaElectron from '@/images/cards/visa_electron.svg'
import logoDinersClub from '@/images/cards/diners_club.svg'
import logoDiscover from '@/images/cards/discover.svg'
import logoMastercard from '@/images/cards/mastercard.svg'
import logoMaestro from '@/images/cards/maestro.svg'
import logoSomos from '@/images/cards/somos.svg'
import logoAmex from '@/images/cards/american_express.svg'
import logoPaypal from '@/images/cards/paypal.svg'
import logoSafetifypay from '@/images/cards/safetypay.svg'
import logoCodensa from '@/images/cards/codensa.svg'
import logoComfandi from '@/images/cards/comfandi.svg'
import logoCafam from '@/images/cards/cafam.svg'
import logoMefia from '@/images/cards/mefia.svg'
import logoAlkosto from '@/images/cards/alkosto.svg'
import logoExito from '@/images/cards/exito_card.svg'
import logoOki from '@/images/cards/oki.svg'
import logoPagoEfectivo from '@/images/cards/pago_efectivo.svg'
import logoCompensar from '@/images/cards/compensar_wallet.svg'
import logoCash from '@/images/cards/cash.svg'
import logoPse from '@/images/cards/pse.svg'
import logoBancolombia from '@/images/cards/bancolombia.svg'
import logoBank from '@/images/cards/bank.svg'
import logoAthMovil from '@/images/cards/ath_movil.svg'
import logoAthCard from '@/images/cards/ath_card.svg'
import logoTarjetaClave from '@/images/cards/tarjeta_clave.svg'
import logoACH from '@/images/cards/ach.svg'
import { Heading } from './Heading'

const groupsByCountry = [
  {
    country: 'Global',
    items: [
      {name: 'Tarjeta Visa', code: 'visa', logo: logoVisa},
      { name: 'Tarjeta Mastercard', code: 'master', logo: logoMastercard},
      { name: 'Tarjeta Diners Club', code: 'diners', logo: logoDinersClub},
      { name: 'Tarjeta American Express', code: 'amex', logo: logoAmex},
      { name: 'Paypal', code: 'paypal', logo: logoPaypal},
      { name: 'Safety Pay', code: 'safetypay', logo: logoSafetifypay},
    ],
  },
  {
    country: 'Colombia',
    items: [
      {
        name: 'Débito a cuentas corrientes y ahorros (PSE)',
        code: 'pse',
        logo: logoPse,
      },
      {
        name: 'Tarjeta débito Visa Electron',
        code: 'visa_electron',
        logo: logoVisaElectron,
      },
      {
        name: 'Tarjeta Somos Grupo EPM',
        code: 'somos',
        logo: logoSomos,
      },
      { name: 'Tarjeta CODENSA', code: 'codensa', logo: logoCodensa },
      {
        name: 'Botón Bancolombia',
        code: 'bancolombia',
        logo: logoBancolombia,
      },
      { name: 'Comfandi', code: 'comfandi', logo: logoComfandi },
      { name: 'CAFAM', code: 'cafam', logo: logoCafam },
      { name: 'Tarjeta Mefia', code: 'mefia', logo: logoMefia },
      { name: 'Tarjeta Éxito', code: 'exito', logo: logoExito },
      { name: 'Tarjeta Alkosto', code: 'alkosto', logo: logoAlkosto },
      { name: 'OKI - Gana', code: 'gana', logo: logoOki },
      { name: 'Billetera Compensar', code: 'procesa', logo: logoCompensar },
      { name: 'Efectivo', code: 'ath', logo: logoCash },

    ],
  },

  {
    country: 'Chile y Uruguay',
    items: [
      { name: 'Tarjeta Maestro', code: 'maestro', logo: logoMaestro},
    ],
  },
  {
    country: 'Panamá / Costa Rica / Belice / Honduras',
    items: [
      {code: "discover", name: "Tarjeta Discover  ", logo: logoDiscover},
      {code: "telered", name: "Tarjeta Clave", logo: logoTarjetaClave},     
    ],
  },
  {
    country: 'Puerto Rico',
    items: [
      {code: "athmv", name: "ATH Móvil ", logo: logoAthMovil},
      {code: "ath_card", name: "Tarjeta ATH - EBUS", logo: logoAthCard},
      {code: "ebach", name: "ACH - EBUS", logo: logoACH},
    ],
  },
  {
    country: 'Perú',
    items: [
      { name: 'Pago Efectivo', code: 'pagoefectivo', logo: logoPagoEfectivo },
    ]
  }
]

export function PaymentMethods() {
  return (
    <div>
      {groupsByCountry.map((group) => (
        <div key={group.country}>
          <Heading level={2} id="payment-methods">
            {group.country}
          </Heading>
          <table className='mt-6'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {group.items.map((item) => (
                <tr key={item.code} className=''>
                  <td className="w-full">
                    <div className='not-prose flex gap-3'>
                      <Image
                        src={item.logo}
                        alt=""
                        className="h-7 w-9"
                        unoptimized
                      />
                      {item.name}
                    </div>
                  </td>
                  <td className='align-middle'>
                    <code>{item.code}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
