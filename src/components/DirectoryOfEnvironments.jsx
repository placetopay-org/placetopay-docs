import { useLocale } from './LocaleProvider'
import { CopyContent } from '@/components/CopyContent'
import { DIRECTORY_ENVIRONMENTS } from "@/constants/directory-environments";

const groupsByProducts = [
  {
    id: 'checkout',
    evironments: DIRECTORY_ENVIRONMENTS.checkout
  }
]

export function DirectoryOfEnvironments({productName}) {
  const {locale, isEn } = useLocale()
  const product = groupsByProducts.find((product) => product.id == productName);

  return (
    <table className="mt-6">
      <thead>
        <tr>
          <th>{isEn() ? 'Country' : 'País'}</th>
          <th>{isEn() ? 'Mode' : 'Modo'}</th>
          <th>{isEn() ? 'URL' : 'URL'}</th>
        </tr>
      </thead>
      <tbody>
        {product && product.evironments.map((environment) => (
            <tr key={environment.url} className="">
                <td className="align-middle font-medium">
                  {environment.country}
                </td>
                <td className="align-middle">
                  {environment.mode[locale]}
                </td>
                <td className="align-middle font-medium dark:text-white">
                  <CopyContent content={environment.url} />
                </td>
            </tr>
           ))}
      </tbody>
    </table>
  )
}
