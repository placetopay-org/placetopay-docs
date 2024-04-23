import { LANGUAGES_CODES } from '@/components/LocaleProvider'

const CHECKOUT_NAVIGATION_ES = [
  {
    title: 'Checkout',
    links: [
      { title: 'Introducción', href: '/checkout' },
      { title: 'Cómo Funciona', href: '/checkout/how-checkout-works' },
      { title: 'Plugins', href: '/checkout/plugins' },
      { title: 'Lightbox', href: '/checkout/lightbox' },
    ],
  },
  {
    title: 'Integración',
    links: [
      { title: 'Autenticación', href: '/checkout/authentication' },
      { title: 'Crear Sesión', href: '/checkout/create-session' },
      { title: 'Notificación', href: '/checkout/notification' },
      { title: 'Localización', href: '/checkout/localization' },
      { title: 'Tipos de documento', href: '/checkout/document-types' },
      { title: 'Campos Adicionales', href: '/checkout/additional-fields' },
      { title: 'Montos y Monedas', href: '/checkout/tax-details' },
      { title: 'Métodos de pago', href: '/checkout/payment-methods' },
      {
        title: 'Como integrar con móvil',
        href: '/checkout/integration/mobile',
      },
      {
        title: 'Prueba tu integración',
        href: '/checkout/test-your-integration',
      },
      { title: 'Historial de cambios', href: '/checkout/changelog' },
      { title: 'Politica de cambios', href: '/checkout/api-policy' },
      { title: 'Consideraciones de seguridad', href: '/checkout/security-cosiderations'}
    ],
  },
  {
    title: 'API',
    links: [
      { title: 'Sesión', href: '/checkout/api-reference/session' },
      { title: 'Pagos', href: '/checkout/api-reference/payment' },
      { title: 'Token', href: '/checkout/api-reference/token' },
    ],
  },
]

const CHECKOUT_NAVIGATION_EN = [
  {
    title: 'Checkout',
    links: [
      { title: 'Introduction', href: '/checkout' },
      { title: 'How it works', href: '/checkout/how-checkout-works' },
      { title: 'Plugins', href: '/checkout/plugins' },
      { title: 'Lightbox', href: '/checkout/lightbox' },
    ],
  },
  {
    title: 'Integration',
    links: [
      { title: 'Authentication', href: '/checkout/authentication' },
      { title: 'Create Session', href: '/checkout/create-session' },
      { title: 'Notification', href: '/checkout/notification' },
      { title: 'Localization', href: '/checkout/localization' },
      { title: 'Document Types', href: '/checkout/document-types' },

      { title: 'Additional Fields', href: '/checkout/additional-fields' },
      { title: 'Amounts and Currencies', href: '/checkout/tax-details' },
      { title: 'Payment Methods', href: '/checkout/payment-methods' },
      {
        title: 'How to integrate with mobile',
        href: '/checkout/integration/mobile',
      },
      {
        title: 'Test your integration',
        href: '/checkout/test-your-integration',
      },
      { title: 'Changelog', href: '/checkout/changelog' },
      { title: 'API Policy', href: '/checkout/api-policy' },
      { title: 'Security considerations', href: '/checkout/security-cosiderations'}
    ],
  },
  {
    title: 'API',
    links: [
      { title: 'Session', href: '/checkout/api-reference/session' },
      { title: 'Payments', href: '/checkout/api-reference/payment' },
      { title: 'Token', href: '/checkout/api-reference/token' },
    ],
  },
]

export const CHECKOUT_NAVIGATION = {
  [LANGUAGES_CODES.ES]: CHECKOUT_NAVIGATION_ES,
  [LANGUAGES_CODES.EN]: CHECKOUT_NAVIGATION_EN,
}
