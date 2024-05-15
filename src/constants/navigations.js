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

const GATEWAY_NAVIGATION_ES = [
  {
    title: 'Gateway',
    links: [
      { title: 'Introducción', href: '/gateway' },
      { title: 'Flujo de una transacción', href: '/gateway/transaction-flow' },
      { title: 'Obligaciones', href: '/gateway/obligations' },
    ]
  },
  {
    title: 'Integración',
    links: [
      { title: 'Autenticación', href: '/gateway/authentication' },
      { title: 'Números de tarjetas de pruebas', href: '/gateway/testing-card' },
      { title: 'Código de aerolíneas', href: '/gateway/airline-codes' },
      { title: 'Tipos de documentos', href: '/gateway/document-types' },
      { title: 'Tipos de transacciones', href: '/gateway/transaction-types' },
      { title: 'Control de idempotencia', href: '/gateway/idempotency' },
      { title: 'Importación ordenes de pago', href: '/gateway/import-payment-orders' },
      { title: 'Procesamiento con cuentas bancarias', href: '/gateway/processing-with-bank-accounts' },
    ]
  },
  {
    title: 'API',
    links: [
      { title: 'Obtener información', href: '/gateway/api-reference/information' },
      { title: 'Transacciones', href: '/gateway/api-reference/transaction' },
      { title: 'Tokenización de tarjetas', href: '/gateway/api-reference/tokenize' },
      { title: 'Proceso 3DS', href: '/gateway/api-reference/3ds' },
      { title: 'Proceso OTP', href: '/gateway/api-reference/otp' },
      { title: 'Operaciones con PinPad', href: '/gateway/api-reference/pinpad' },
      { title: 'Reporte de operaciones realizadas', href: '/gateway/api-reference/report' },
    ],
  }
]

const GATEWAY_NAVIGATION_EN = [
  {
    title: 'Gateway',
    links: [
      { title: 'Introduction', href: '/gateway' },
      { title: 'Transaction flow', href: '/gateway/transaction-flow' },
      { title: 'Obligations', href: '/gateway/obligations' },
    ]
  },
  {
    title: 'Integration',
    links: [
      { title: 'Authentication', href: '/gateway/authentication' },
      { title: 'Test card numbers', href: '/gateway/testing-card' },
      { title: 'Airline codes', href: '/gateway/airline-codes' },
      { title: 'Document types', href: '/gateway/document-types' },
      { title: 'Transaction types', href: '/gateway/transaction-types' },
      { title: 'Idempotency control', href: '/gateway/idempotency' },
      { title: 'Import payment orders', href: '/gateway/import-payment-orders' },
      { title: 'Processing with bank accounts', href: '/gateway/processing-with-bank-accounts' },
    ]
  },
  {
    title: 'API',
    links: [
      { title: 'Get information', href: '/gateway/api-reference/information' },
      { title: 'Transactions', href: '/gateway/api-reference/transaction' },
      { title: 'Card tokenization', href: '/gateway/api-reference/tokenize' },
      { title: '3DS process', href: '/gateway/api-reference/3ds' },
      { title: 'OTP process', href: '/gateway/api-reference/otp' },
      { title: 'PinPad Operations', href: '/gateway/api-reference/pinpad' },
      { title: 'Report of operations carried out', href: '/gateway/api-reference/report' },
    ],
  }
]

export const CHECKOUT_NAVIGATION = {
  [LANGUAGES_CODES.ES]: CHECKOUT_NAVIGATION_ES,
  [LANGUAGES_CODES.EN]: CHECKOUT_NAVIGATION_EN,
}

export const GATEWAY_NAVIGATION = {
  [LANGUAGES_CODES.ES]: GATEWAY_NAVIGATION_ES,
  [LANGUAGES_CODES.EN]: GATEWAY_NAVIGATION_EN,
}
