import { useLocale } from './LocaleProvider'

const examples = [
    {
      key: "credit",
      example: "{\"type\": \"00\", \"groupCode\": \"C\", \"code\": \"0\", \"installments\": 0}",
      description: {
        es: "Datos de credito.",
        en: "Credit data."
      }
    },
    {
      key: "totalAmount",
      example: 63.58,
      description: {
        es: "Monto total.",
        en: "Total amount."
      }
    },
    {
      key: "interestAmount",
      example: 5.78,
      description: {
        es: "Monto de interés.",
        en: "Interest amount."
      }
    },
    {
      key: "installmentAmount",
      example: 2.65,
      description: {
        es: "Monto de la cuota.",
        en: "Installment amount."
      }
    },
    {
      key: "iceAmount",
      example: 0,
      description: {
        es: "Monto de ICE.",
        en: "ICE amount."
      }
    },
    {
      key: "line",
      example: 123,
      description: {
        es: "Posición en el archivo de cierre (Línea).",
        en: "Position in the closing file (Line)."
      }
    },
    {
      key: "cardType",
      example: "credit",
      description: {
        es: "Tipo de tarjeta.",
        en: "Card type."
      }
    },
    {
      key: "trazabilyCode",
      example: 999900,
      description: {
        es: "Código de trazabilidad.",
        en: "Traceability code."
      }
    },
    {
      key: "transactionCycle",
      example: 3,
      description: {
        es: "Ciclo de transacción.",
        en: "Transaction cycle."
      }
    },
    {
      key: "RequestId",
      example: "1560778247",
      description: {
        es: "ID de solicitud.",
        en: "Request ID."
      }
    },
    {
      key: "PartnerAuthCode",
      example: "5d029607e1abb",
      description: {
        es: "Código de autorización de socio.",
        en: "Partner authorization code."
      }
    },
    {
      key: "merchantCode",
      example: "4682312740123",
      description: {
        es: "Código de negocio.",
        en: "Merchant code."
      }
    },
    {
      key: "terminalNumber",
      example: "00990101",
      description: {
        es: "Número de terminal.",
        en: "Terminal number."
      }
    },
    {
      key: "bin",
      example: "411076",
      description: {
        es: "Bin, primeros dígitos de la tarjeta.",
        en: "BIN, first digits of the card."
      }
    },
    {
      key: "bankName",
      example: "Bank Name",
      description: {
        es: "Nombre de banco.",
        en: "Bank name."
      }
    },
    {
      key: "accountNumber",
      example: "1111",
      description: {
        es: "Número de cuenta.",
        en: "Account number."
      }
    },
    {
      key: "expiration",
      example: "1222",
      description: {
        es: "Expiración de la tarjeta en formato (mes)(año).",
        en: "Card expiration in the format (month)(year)."
      }
    },
    {
      key: "installments",
      example: "2",
      description: {
        es: "Número de cuotas.",
        en: "Number of installments."
      }
    },
    {
      key: "pocket",
      example: "80",
      description: {
        es: "Número de identificación del bolsillo dependiendo del proveedor.",
        en: "Pocket identification number depending on the provider."
      }
    },
    {
      key: "fiscalControlNumber",
      example: "Control: MYHFC-KEHKC",
      description: {
        es: "Número de control fiscal.",
        en: "Fiscal control number."
      }
    },
    {
      key: "fiscalControlProvider",
      example: "ET",
      description: {
        es: "Proveedor de control fiscal, de ejemplo ET como Evertec.",
        en: "Fiscal control provider, example ET as Evertec."
      }
    },
    {
        key: "_wcTransactionId_",
        example: "56",
        description: {
            es: "Identificador de transacción en comercio.",
            en: "Transaction identifier in commerce."
        }
    }
  ];

export function AdditionalDataExamples({extraExamples}) {
  const { locale, isEn } = useLocale()

  return (
    <table className="mt-6">
      <thead>
        <tr>
          <th>{isEn() ? 'Key' : 'Clave'}</th>
          <th>{isEn() ? 'Example' : 'Ejemplo'}</th>
          <th>{isEn() ? 'Description' : 'Descripción'}</th>
        </tr>
      </thead>
      <tbody>
        {examples.map((example) => (
          <tr key={example.key} className="">
            <td className="align-middle">
             <code>{example.key}</code> 
            </td>
            <td className="align-middle">
              {example.example}
            </td>
            <td className="w-full">
              {example.description[locale]}
            </td>
          </tr>
        ))}
        {extraExamples && extraExamples.map((example) => (
          <tr key={example.key} className="">
            <td className="align-middle">
             <code>{example.key}</code> 
            </td>
            <td className="align-middle">
              {example.example}
            </td>
            <td className="w-full">
              {example.description[locale]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
