import { Heading } from '@/components/Heading'
import { ItemsList } from '@/components/ItemsList'
import logoWooComerce from '@/images/logos/woocomerce.svg'
import logoMagento from '@/images/logos/magento.svg'
import logoPrestashop from '@/images/logos/prestashop.svg'
import logoCSharp from '@/images/logos/csharp.svg'
import logoJava from '@/images/logos/java.svg'
import logoPhp from '@/images/logos/php.svg'
import logoShopify from '@/images/logos/shopify.svg'
import logoVtex from '@/images/logos/vtex.svg'
import logoJumpseller from '@/images/logos/jumpseller.svg'

const plugins = [
  {
    href: 'https://dev.placetopay.com/web/wp-content/uploads/2021/03/woocommerce-gateway-placetopay-2.17.2.zip',
    name: 'WooCommerce',
    description:
      'Plugin para WordPress. Diseñado para tiendas y comercios en linea que usan WordPress.',
    logo: logoWooComerce,
    action: 'Ver más'
  },
  {
    href: 'https://dev.placetopay.com/web/wp-content/uploads/2021/03/magento2-placetopay-1.7.7.zip',
    name: 'Magento',
    description:
      'Plataforma de código abierto para comercio electrónico escrita en PHP.',
    logo: logoMagento,
    action: 'Ver más'
  },
  {
    href: 'https://dev.placetopay.com/web/wp-content/uploads/2021/03/placetopaypayment_3.4.7.zip',
    name: 'PrestaShop',
    description:
      'Plataforma especializada en la creación y gestión de tiendas online.',
    logo: logoPrestashop,
    action: 'Ver más'
  },
  {
    href: 'https://dev.placetopay.com/web/wp-content/uploads/2021/03/placetopaypayment_3.4.7.zip',
    name: 'Jumpseller',
    description:
      'Plataforma de comercio electrónico para crear tu tienda en línea.',
    logo: logoJumpseller,
  },
  {
    href: 'https://dev.placetopay.com/web/wp-content/uploads/2021/03/placetopaypayment_3.4.7.zip',
    name: 'Vtex',
    description:
      'Plataforma de comercio digital para grandes empresas.',
    logo: logoVtex,
  },
  {
    href: 'https://dev.placetopay.com/web/wp-content/uploads/2021/03/placetopaypayment_3.4.7.zip',
    name: 'Shopify',
    description:
      'En desarrollo...',
    logo: logoShopify,
  },
]

const libraries = [
  {
    href: 'https://github.com/dnetix/redirection',
    name: 'PHP',
    description:
      'Lenguaje de programación de código abierto, especialmente adecuado para el desarrollo web',
    logo: logoPhp,
    action: 'Ver más'
  },
  {
    href: 'https://github.com/placetopay/redirection-csharp-sdk',
    name: 'C#',
    description:
      'Lenguaje de programación moderno y orientado a objetos desarrollado por Microsoft',
    logo: logoCSharp,
    action: 'Ver más'
  },
  {
    href: 'https://github.com/placetopay/java-placetopay',
    name: 'Java',
    description:
      'Lenguaje de programación de alto nivel y orientado a objetos',
    logo: logoJava,
    action: 'Ver más'
  },
]

export function Libraries() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="plugins">
        Plugins
      </Heading>
      <ItemsList items={plugins}></ItemsList>

      <Heading level={2} id="libraries">
        Librerias
      </Heading>
      <ItemsList items={libraries}></ItemsList>
    </div>
  )
}
