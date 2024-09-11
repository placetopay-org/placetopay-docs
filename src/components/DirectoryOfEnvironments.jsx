import { useLocale } from './LocaleProvider'
import { CopyContent } from '@/components/CopyContent'
import { DIRECTORY_ENVIRONMENTS } from "@/constants/directory-environments";
import { Heading } from './Heading'

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
    <div>
      {product.evironments.map((group) => (
        <div key={group.country}>
          <Heading level={2} id="environments" className="mt-0 scroll-mt-32">
            {group.country}
          </Heading>
          <table className="mt-6">
            <thead>
              <tr>
                <th>{isEn() ? 'Mode': 'Modo'}</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {group.environments.map((item) => (
                <tr key={item.url} className="">
                  <td className="align-middle">
                    {item.mode[locale]}
                  </td>
                  <td className="align-middle font-medium dark:text-white">
                    <CopyContent content={item.url} />
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
