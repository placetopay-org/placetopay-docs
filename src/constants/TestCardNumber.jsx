import Image from 'next/image'
import logoVisa from '@/images/cards/visa.svg'
import logoDinersClub from '@/images/cards/diners_club.svg'
import logoDiscover from '@/images/cards/discover.svg'
import logoMastercard from '@/images/cards/mastercard.svg'
import logoMaestro from '@/images/cards/maestro.svg'
import logoSomos from '@/images/cards/somos.svg'
import logoAmex from '@/images/cards/american_express.svg'
import logoComfandi from '@/images/cards/comfandi.svg'
import logoMefia from '@/images/cards/mefia.svg'
import logoAlkosto from '@/images/cards/alkosto.svg'
import logoExito from '@/images/cards/exito_card.svg'
import logoAthCard from '@/images/cards/ath_card.svg'
import logoDilo from '@/images/cards/dilo.svg'
import { Heading } from './Heading'
import { useLocale } from './LocaleProvider'
import { CopyContent } from '@/components/CopyContent'

const groupsByFranchise = [
  {
    id: 'diners',
    logo: logoDinersClub,
    franchise: 'Diners',
    items: [
      {
        number : '36545400000008',
        behavior: { es: 'Aprueba', en: 'Approve' }
      },
      {
        number : '36545407032848',
        behavior: { es: 'Aprueba',  en: 'Approve' }
      },
      {
        number : '36545400000248',
        behavior: { es: 'Rechaza', en: 'Denies' }
      },
      {
        number : '36545400000701',
        behavior: { 
          es: 'Deja la transacción en procesamiento manual y si se procesa queda en estado aprobado', 
          en: 'Leave the transaction in manual processing and if it is processed it remains in approved status' 
        }
      },
      {
        number : '36545407030701',
        behavior: { 
          es: 'Deja la transacción en estado pendiente y se resuelve a rechazado', 
          en: 'Leaves the transaction in pending status and resolves to rejected' 
        },
      },
      {
        number : '36545400000438',
        behavior: { 
          es: 'Se tarda 180 segundos en responder y queda en estado aprobado', 
          en: 'It takes 180 seconds to respond and is in approved status' 
        },
      },
      {
        number : '36545407032780',
        behavior: { 
          es: 'Deja la transacción en procesamiento manual y si se procesa queda en estado aprobado', 
          en: 'Leave the transaction in manual processing and if it is processed it remains in approved status' 
        },
      },
      {
        number : '36545407032806',
        behavior: { 
          es: 'Deja la transacción en estado pendiente y se resuelve a aprobado', 
          en: 'Leave the transaction in pending status and it is resolved to approved' 
        },
      }
    ],
  },
  {
    id: 'visa',
    logo: logoVisa,
    franchise: 'Visa',
    items: [
      {
        number : '4110760000000081',
        behavior: {
           es: 'Aprueba', 
           en: 'Approve' 
          },
      },
      {
        number : '4110770010002837',
        behavior: {
           es: 'Aprueba', 
           en: 'Approve' 
          },
      },
      {
        number : '4381080000000029',
        behavior: {
           es: 'Aprueba' ,
           en: 'Approve',
          },
      },
      {
        number : '4111111111111111',
        behavior: {
           es: 'Aprueba 3DS-Y' ,
           en: 'Approve 3DS-Y',
          },
      },
      {
        number : '4110760000000008',
        behavior: { es: 'Aprueba 3DS-C', en: 'Approve 3DS-C' },
      },
      {
        number : '4110760000000016',
        behavior: { es: 'Rechaza', en: 'Denies' },
      },
      {
        number : '4005580000000040',
        behavior: { es: 'Rechaza', en: 'Denies' },
      },
      {
        number : '4716375184092180',
        behavior: { es: 'Rechaza', en: 'Denies' },
      },
      {
        number : '4381080000000011',
        behavior: { es: 'Rechaza', en: 'Denies' },
      },
      {
        number : '4716375184092180',
        behavior: { es: 'Rechaza', en: 'Denies' },
      },
      {
        number : '4110760000000032',
        behavior: {
           es: 'Deja la transacción en estado pendiente y se resuelve a aprobado 3DS-C', 
           en: 'Leave the transaction in pending status and it is resolved to approved 3DS-C' 
          },
      },
      {
        number : '4110760000000040',
        behavior: {
           es: 'Deja la transacción en estado pendiente y se resuelve a rechazado 3DS-A', 
           en: 'Leaves the transaction in pending status and resolves to rejected 3DS-A' 
          },
      },
      {
        number : '4048370000000037',
        behavior: {
           es: 'Deja la transacción en estado pendiente y se resuelve a rechazado', 
           en: 'Leaves the transaction in pending status and resolves to rejected' 
          },
      },
      {
        number : '4110760000000073',
        behavior: {
           es: 'Deja la transacción en estado pendiente y se resuelve a aprobado', 
           en: 'Leave the transaction in pending status and it is resolved to approved' 
          },
      },
      {
        number : '4110760000000065',
        behavior: {
           es: 'Arroja una excepción en el proceso 3DS-N', 
           en: 'Throws an exception in the process 3DS-N' 
          },
      },
      {
        number : '4110760000000024',
        behavior: {
           es: 'Se tarda 180 segundos en responder y queda en estado aprobado', 
           en: 'It takes 180 seconds to respond and is in approved status' 
          },
      },
      {
        number : '4110760000000115',
        behavior: {
           es: 'Se tarda 180 segundos en responder y queda en estado rechazado', 
           en: 'It takes 180 seconds to respond and remains in a rejected state' 
          },
      },
      {
        number : '4110760000000057',
        behavior: {
           es: 'Aprueba si el monto es inferior a 200USD de lo contrario rechaza', 
           en: 'Approve if the amount is less than 200 USD otherwise reject' 
          },
      },
      {
        number : '4012888888881881',
        behavior: {
           es: 'Aprueba si se proporciona la expiración 11/28 y el cvv 917 de lo contrario rechaza', 
           en: 'Approves if expiration 11/28 is given and cvv 917 otherwise rejects' 
          },
      },
      {
        number : '4381080000000003',
        behavior: {
           es: 'Deja la transacción en estado pendiente y se resuelve a rechazado', 
           en: 'Leaves the transaction in pending status and resolves to rejected' 
          },
      },
      {
        number : '4509564638437551',
        behavior: {
           es: 'Deja la transacción en estado pendiente y se resuelve a aprobado' ,
           en: 'Leave the transaction in pending status and it is resolved to approved',
          },
      },
      {
        number : '4864921336824366',
        behavior: {
           es: 'Deja la transacción en estado pendiente y se resuelve a rechazado' ,
           en: 'Leaves the transaction in pending status and resolves to rejected',
          },
      },
      {
        number : '4931974429847108',
        behavior: {
           es: 'Deja la transacción en estado pendiente y se resuelve a rechazado' ,
           en: 'Leaves the transaction in pending status and resolves to rejected',
          },
      },
      {
        number : '4532034637206853',
        behavior: {
           es: 'Deja la transacción en procesamiento manual y si se procesa queda en estado rechazado' ,
           en: 'Leave the transaction in manual processing and if it is processed it remains in rejected status',
          },
      },
      {
        number : '4666666666666669',
        behavior: {
           es: 'Se tarda 180 segundos en responder y queda en estado aprobado' ,
           en: 'It takes 180 seconds to respond and is in approved status',
          },
      },
    ]
  },
  {
    id: 'mastercard',
    logo: logoMastercard,
    franchise: 'Mastercard',
    items: [
      {
        number : '5367680000000005',
        behavior: { 
          es: 'Aprueba',
          en: 'Approve'
        },
      },
      {
        number : '5180300000000005',
        behavior: { es: 'Aprueba 3DS-Y', en: 'Approve 3DS-Y' },
      },
      {
        number : '5292594382060745',
        behavior: { es: 'Aprueba 3DS-C',  en: 'Approve 3DS-C' },
      },
      {
        number : '5367680000000013',
        behavior: { 
          es: 'Rechaza', 
          en: 'Denies'
        },
      },
      {
        number : '5180300000000039',
        behavior: { es: 'Rechaza 3DS-N', en: 'Denies 3DS-N' },
      },
      {
        number : '5180300000000047',
        behavior: { 
          es: 'Deja la transacción en estado pendiente y se resuelve a aprobado 3DS-C', 
          en: 'Leave the transaction in pending status and it is resolved to approved 3DS-C'
        },
      },
      {
        number : '5180300000000054',
        behavior: { 
          es: 'Deja la transacción en estado pendiente y se resuelve a rechazado **3DS-A**', 
          en: 'Leaves the transaction in pending status and resolves to rejected 3DS-A'
        },
      }
    ]
  },
  {
    id: 'amirican-express',
    logo: logoAmex,
    franchise: 'American Express',
    items: [
      {
        number : '376651001281274',
        behavior: { 
          es: 'Aprueba si se proporciona la expiración 06/34 y el cvv 4637 de lo contrario rechaza',
          en: 'Approves if expiration 06/34 is given and cvv 4637 otherwise rejects' },
      },
    ],
  },
  {
    id: 'discover',
    logo: logoDiscover,
    franchise: 'Discover',
    items: [
      {
        number : '6550590000000001',
        behavior: { es: 'Apreuba', en: 'Approve' }
      },
      {
        number : '6557351234543156',
        behavior: { es: 'Aprueba', en: 'Approve' }
      },
      {
        number : '6550590000000019',
        behavior: { es: 'Rechaza', en: 'Denies' }
      },
      {
        number : '6557351234543164',
        behavior: { es: 'Rechaza', en: 'Denies'}
      },
      {
        number : '6550590000000027',
        behavior: { 
          es: 'Deja la transacción en estado pendiente y se resuelve a aprobado', 
          en: 'Leave the transaction in pending status and it is resolved to approved' 
        }
      },
      {
        number : '6550590000000035',
        behavior: { 
          es: 'Deja la transacción en estado pendiente y se resuelve a rechazado', 
          en: 'Leaves the transaction in pending status and resolves to rejected' 
        }
      }
    ],
  },
  {
    id: 'maestro',
    logo: logoMaestro,
    franchise: 'Maestro',
    items: [
      {
        number : '6759649826438453',
        behavior: { es: 'Aprueba', en: 'Approve' }
      },
    ],
  },
  {
    id: 'somos',
    logo: logoSomos,
    franchise: 'Somos',
    items: [
      {
        number : '8810060001592705',
        behavior: {  es: 'Aprueba', en: 'Approve' },
      },
    ],
  },
  {
    id: 'exito',
    logo: logoExito,
    franchise: 'Exito',
    items: [
      {
        number : '5903090000000000',
        behavior: { es: 'Aprueba', en: 'Approve' },
      },
    ],
  },
  {
    id: 'alkosto',
    logo: logoAlkosto,
    franchise: 'Alkosto',
    items: [
      {
        number : '5903120000000000',
        behavior: { es: 'Aprueba', en: 'Approve' },
      },
    ],
  },
  {
    id: 'comfandi',
    logo: logoComfandi,
    franchise: 'Comfandi',
    items: [
      {
        number : '9391111111111111',
        behavior: { es: 'Aprueba', en: 'Approve' },
      },
      {
        number : '9395555555555555',
        behavior: { es: 'Rechaza', en: 'Denies' },
      },
    ],
  },
  {
    id: 'mefia',
    logo: logoMefia,
    franchise: 'Mefia',
    items: [
      {
        number : '6377470106963215',
        behavior: { es: 'Aprueba', en: 'Approve' },
      },
      {
        number : '6377470100506457',
        behavior: { es: 'Aprueba', en: 'Approve' },
      },
      {
        number : '6377470102391155',
        behavior: {
            es: 'Aprueba si se proporciona la expiración 12/24',
            en: 'Approves if 12/24 expiration is provided' 
          },
      },
      {
        number : '6377470107014851',
        behavior: { es: 'Rechaza', en: 'Denies' },
      },
      {
        number : '6377470106672139',
        behavior: { es: 'Rechaza', en: 'Denies' },
      },
      {
        number : '6377470105684614',
        behavior: { 
          es: 'Deja la transacción en estado pendiente y se resuelve a aprobado',
          en: 'Leave the transaction in pending status and it is resolved to approved' 
        },
      },
      {
        number : '6377470106813436',
        behavior: { 
          es: 'Deja la transacción en estado pendiente y se resuelve a rechazado',
          en: 'Leaves the transaction in pending status and resolves to rejected' 
        },
      }
    ],
  },
  {
    id: 'tarjeta-ath',
    logo: logoAthCard,
    franchise: 'Tarjeta ATH',
    items: [
      {
        number : '0215020177972730',
        behavior: { es: 'Aprueba', en: 'Approve' },
      },
      {
        number : '2215714777972730',
        behavior: { es: 'Aprueba', en: 'Approve' },
      },
      {
        number : '0215026116775785',
        behavior: { es: 'Rechaza', en: 'Denies' },
      },
      {
        number : '0215025888083941',
        behavior: { 
          es: 'Deja la transacción en estado pendiente y se resuelve a rechazado', 
          en: 'Leaves the transaction in pending status and resolves to rejected' 
        },
      },
      {
        number : '2215716999194052',
        behavior: { 
          es: 'Deja la transacción en estado pendiente y se resuelve a aprobado', 
          en: 'Leave the transaction in pending status and it is resolved to approved' 
        },
      },
      {
        number : '0215027111105163',
        behavior: { 
          es: 'Deja la transacción en estado pendiente y se resuelve a rechazado', 
          en: 'Leaves the transaction in pending status and resolves to rejected' 
        },
      },
      {
        number : '2215719446775653',
        behavior: { 
          es: 'Arroja una excepción en el proceso', 
          en: 'Throws an exception in the process' 
        },
      },
    ],
  },
  {
    id: 'dilo',
    logo: logoDilo,
    franchise: 'Billetera Digital Dilo',
    items: [
      {
        number : '+50488888888',
        behavior: { es: 'Rechaza', en: 'Denies' },
      },
      {
        number : '+50499999999',
        behavior: { 
          es: 'Deja la transacción en estado pendiente y se resuelve a aprobado', 
          en: 'Leave the transaction in pending status and it is resolved to approved' 
        },
      },
      {
        number : '+50491111111',
        behavior: { 
          es: 'Deja la transacción en estado pendiente y se resuelve a aprobado', 
          en: 'Leave the transaction in pending status and it is resolved to approved' 
        },
      },
      {
        number : '+50492222222',
        behavior: { 
          es: 'Deja la transacción en estado pendiente y se resuelve a rechazado', 
          en: 'Leaves the transaction in pending status and resolves to rejected' 
        },
      },
      {
        number : '+50494444444',
        behavior: { 
          es: 'Deja la transacción en estado pendiente', 
          en: 'Leaves the transaction in pending status' 
        },
      },
    ],
  },
]

export function TestCardNumbers() {
  const { locale, isEn } = useLocale()
  return (
    <div>
      {groupsByFranchise.map((group) => (
        <div key={group.franchise}>
          <Heading level={2} id={"test-card-numbers-"+group.id}>
          { <Image
                        src={group.logo}
                        alt=""
                        className="h-7 w-9 inline-block mr-2 mt-0 mb-0"
                        unoptimized
                      />}
            {group.franchise}
          </Heading>
          <table className="mt-6">
            <thead>
              <tr>
                <th>{isEn() ? 'Number' : 'Número'}</th>
                <th>{isEn() ? 'Behavior' : 'Comportamiento'}</th>
              </tr>
            </thead>
            <tbody>
              {group.items.map((item) => (
                <tr key={item.behavior} className="">
                  <td className="align-middle">
                  <CopyContent content={item.number}/>
                  </td>
                  <td className="w-full">
                    <div className="not-prose flex gap-3">
                      {typeof item.behavior === 'string'
                        ? item.behavior
                        : item.behavior[locale]}
                    </div>
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
