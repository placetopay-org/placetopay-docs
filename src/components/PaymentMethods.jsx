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
import ceropay from '@/images/cards/ceropay.svg'
import logoBank from '@/images/cards/bank.svg'
import logoEbt from '@/images/cards/ebt.svg'
import logoAthMovil from '@/images/cards/ath_movil.svg'
import logoAthCard from '@/images/cards/ath_card.svg'
import logoTarjetaClave from '@/images/cards/tarjeta_clave.svg'
import logoACH from '@/images/cards/ach.svg'
import logoDilo from '@/images/cards/dilo.svg'
import { Heading } from './Heading'
import { useLocale } from './LocaleProvider'

const groupsByCountry = [
  {
    country: 'Global',
    items: [
      {
        name: { es: 'Tarjeta Visa', en: 'Visa' },
        code: 'visa',
        logo: logoVisa,
      },
      {
        name: { es: 'Tarjeta Mastercard', en: 'Mastercard' },
        code: 'master',
        logo: logoMastercard,
      },
      {
        name: { es: 'Tarjeta Diners Club', en: 'Diners Club' },
        code: 'diners',
        logo: logoDinersClub,
      },
      {
        name: { es: 'Tarjeta American Express', en: 'American Express' },
        code: 'amex',
        logo: logoAmex,
      },
      { name: 'Paypal', code: 'paypal', logo: logoPaypal },
      { name: 'Safety Pay', code: 'safetypay', logo: logoSafetifypay },
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
        name: 'Botón Bancolombia',
        code: 'bancolombia',
        logo: logoBancolombia,
      },
      {
        name: {
          es: 'CeroPay del Banco de Bogóta', en: 'CeroPay from Banco de Bogóta'
        },
        code: 'banco_bogota',
        logo: ceropay,
      },
      { name: { es: 'Efectivo', en: 'Cash' }, code: 'ath', logo: logoCash },
      {
        name: { es: 'Tarjeta débito Visa Electron', en: 'Visa Electron' },
        code: 'visa_electron',
        logo: logoVisaElectron,
      },
      {
        name: { es: 'Tarjeta Somos Grupo EPM', en: 'Somos Grupo EPM' },
        code: 'somos',
        logo: logoSomos,
      },
      {
        name: { es: 'Tarjeta CODENSA', en: 'CODENSA' },
        code: 'codensa',
        logo: logoCodensa,
      },
      { name: 'Comfandi', code: 'comfandi', logo: logoComfandi },
      { name: 'CAFAM', code: 'cafam', logo: logoCafam },
      {
        name: { es: 'Tarjeta Mefia', en: 'Mefia' },
        code: 'mefia',
        logo: logoMefia,
      },
      {
        name: { es: 'Tarjeta Éxito', en: 'Éxito' },
        code: 'exito',
        logo: logoExito,
      },
      {
        name: { es: 'Tarjeta Alkosto', en: 'Alkosto' },
        code: 'alkosto',
        logo: logoAlkosto,
      },
      { name: 'OKI - Gana', code: 'gana', logo: logoOki },
      {
        name: { es: 'Billetera Compensar', en: 'Wallet Compensar' },
        code: 'procesa',
        logo: logoCompensar,
      }
    ],
  },

  {
    country: 'Chile y Uruguay',
    items: [
      {
        name: { es: 'Tarjeta Maestro', en: 'Maestro Card' },
        code: 'maestro',
        logo: logoMaestro,
      },
    ],
  },
  {
    country: 'Honduras',
    items: [
      {
        code: 'dilo',
        name: { es: 'Billetera Digital Dilo', en: 'Billetera Digital Dilo' },
        logo: logoDilo,
      }
    ],
  },
  {
    country: 'Panamá / Costa Rica / Belice',
    items: [
      {
        code: 'discover',
        name: { es: 'Tarjeta Discover', en: 'Discover' },
        logo: logoDiscover,
      },
      {
        code: 'telered',
        name: { es: 'Tarjeta Clave', en: 'Clave Card' },
        logo: logoTarjetaClave,
      },
    ],
  },
  {
    country: 'Puerto Rico',
    items: [
      { code: 'athmv', name: 'ATH Móvil', logo: logoAthMovil },
      {
        code: 'ath_card',
        name: { es: 'Tarjeta ATH - EBUS', en: 'ATH - EBUS Card' },
        logo: logoAthCard,
      },
      { code: 'ebach', name: 'ACH - EBUS', logo: logoACH },
      {
        code: 'discover',
        name: { es: 'Tarjeta Discover - EBUS', en: 'Discover - EBUS' },
        logo: logoDiscover,
      },
      {
        code: ['ebt', 'EBTCH', 'EBTRG'],
        name: { es: 'EBT', en: 'EBT' },
        logo: logoEbt,
      },

    ],
  },
  {
    country: 'Perú',
    items: [
      {
        name: 'PagoEfectivo',
        code: 'pagoefectivo',
        logo: logoPagoEfectivo,
      },
    ],
  },
]

export function PaymentMethods() {
  const { locale, isEn } = useLocale()
  return (
    <div>
      {groupsByCountry.map((group) => (
        <div key={group.country}>
          <Heading level={2} id="payment-methods">
            {group.country}
          </Heading>
          <table className="mt-6">
            <thead>
              <tr>
                <th>{isEn() ? 'Name' : 'Nombre'}</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {group.items.map((item) => (
                <tr key={item.code} className="text-end">
                  <td className="w-full">
                    <div className="not-prose flex gap-3">
                      <Image
                        src={item.logo}
                        alt=""
                        className="h-7 w-9"
                        unoptimized
                      />
                      {typeof item.name === 'string'
                        ? item.name
                        : item.name[locale]}
                    </div>
                  </td>
                  <td className="align-middle">
                    {Array.isArray(item.code) ? (<> {item.code.map((code) => <code className='ml-2'>{code}</code>)}</>) : <code>{item.code}</code>}
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
