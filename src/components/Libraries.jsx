import { Heading } from '@/components/Heading'
import { ItemsList } from '@/components/ItemsList'
import logoWooComerce from '@/images/logos/woocomerce.svg'
import logoMagento from '@/images/logos/magento.svg'
import logoPrestashop from '@/images/logos/prestashop.svg'
import logoCSharp from '@/images/logos/csharp.svg'
import logoJava from '@/images/logos/java.svg'
import logoPhp from '@/images/logos/php.svg'
import logoPython from '@/images/logos/python.svg'
import logoShopify from '@/images/logos/shopify.svg'
import logoVtex from '@/images/logos/vtex.svg'
import logoJumpseller from '@/images/logos/jumpseller.svg'
import { useLocale } from './LocaleProvider'

const plugins = [
  {
    href: {
      es: 'https://placetopay.dev/plugins/woocommerce',
      en: 'https://placetopay.dev/en/plugins/woocommerce',
    },
    name: 'WooCommerce',
    description: {
      es: 'Plugin para WordPress. Diseñado para tiendas y comercios en linea que usan WordPress.',
      en: 'Plugin for WordPress. Designed for stores and online stores that use WordPress.',
    },
    logo: logoWooComerce,
    action: { es: 'Ver más', en: 'See more' },
  },
  {
    href: {
      es: 'https://placetopay.dev/plugins/magento',
      en: 'https://placetopay.dev/en/plugins/magento',
    },
    name: 'Magento',
    description: {
      es: 'Plataforma de código abierto para comercio electrónico escrita en PHP.',
      en: 'Open source platform for e-commerce written in PHP.',
    },
    logo: logoMagento,
    action: { es: 'Ver más', en: 'See more' },
  },
  {
    href: {
      es: 'https://placetopay.dev/plugins/prestashop',
      en: 'https://placetopay.dev/en/plugins/prestashop',
    },
    name: 'PrestaShop',
    description: {
      es: 'Plataforma especializada en la creación y gestión de tiendas online.',
      en: 'Platform specialized in the creation and management of online stores.',
    },
    logo: logoPrestashop,
    action: { es: 'Ver más', en: 'See more' },
  },
  {
    href: {
      es: 'https://placetopay.dev/plugins/jumpseller',
      en: 'https://placetopay.dev/en/plugins/jumpseller',
    },
    name: 'Jumpseller',
    description: {
      es: 'Plataforma de comercio electrónico para crear tu tienda en línea.',
      en: 'E-commerce platform to create your online store.',
    },
    logo: logoJumpseller,
    action: { es: 'Ver más', en: 'See more' },
  },
  {
    href: {
      es: 'https://placetopay.dev/plugins/vtex',
      en: 'https://placetopay.dev/en/plugins/vtex',
    },
    name: 'Vtex',
    description: {
      es: 'Plataforma de comercio digital para grandes empresas.',
      en: 'Digital commerce platform for large companies.',
    },
    logo: logoVtex,
    action: { es: 'Ver más', en: 'See more' },
  },
  {
    href: {
      es: 'https://placetopay.dev/plugins/shopify',
      en: 'https://placetopay.dev/en/plugins/shopify',
    },
    name: 'Shopify',
    description: { 
      es: 'Plataforma de comercio electrónico para crear tu tienda en línea.',
      en: 'E-commerce platform to create your online store.',
    },
    logo: logoShopify,
    action: { es: 'Ver más', en: 'See more' },
  },
]

const libraries = [
  {
    href: 'https://github.com/dnetix/redirection',
    name: 'PHP',
    description: {
      es: 'Lenguaje de programación de código abierto, especialmente adecuado para el desarrollo web',
      en: 'Open source programming language, especially suitable for web development',
    },
    logo: logoPhp,
    action: { es: 'Ver más', en: 'See more' },
  },
  {
    href: 'https://github.com/placetopay/redirection-csharp-sdk',
    name: 'C#',
    description: {
      es: 'Lenguaje de programación moderno y orientado a objetos desarrollado por Microsoft',
      en: 'Modern and object-oriented programming language developed by Microsoft',
    },
    logo: logoCSharp,
    action: { es: 'Ver más', en: 'See more' },
  },
  {
    href: 'https://github.com/placetopay/java-placetopay',
    name: 'Java',
    description: {
      es: 'Lenguaje de programación de alto nivel y orientado a objetos',
      en: 'High level and object oriented programming language',
    },
    logo: logoJava,
    action: { es: 'Ver más', en: 'See more' },
  },
  {
    href: 'https://github.com/andrextor/python-checkout',
    name: 'Python',
    description: {
      es: 'Lenguaje de programación versátil y de alto nivel, ampliamente utilizado en el desarrollo de aplicaciones modernas.',
      en: 'Versatile and high-level programming language, widely used in modern application development.',
    },
    logo: logoPython,
    action: { es: 'Ver más', en: 'See more' },
  },
]

export function Libraries() {
  const { locale } = useLocale()
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="plugins">
        Plugins
      </Heading>
      <ItemsList
        items={plugins.map((plugin) => ({
          ...plugin,
          href: plugin.href[locale],
          description: plugin.description[locale],
          action: plugin.action ? plugin.action[locale] : undefined,
        }))}
      />

      <Heading level={2} id="libraries">
        Librerias
      </Heading>
      <ItemsList
        items={libraries.map((lib) => ({
          ...lib,
          description: lib.description[locale],
          action: lib.action ? lib.action[locale] : undefined,
        }))}
      />
    </div>
  )
}
