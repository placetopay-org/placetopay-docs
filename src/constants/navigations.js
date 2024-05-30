import { LANGUAGES_CODES } from '@/components/LocaleProvider'

export const TAB_NAVIGATION = {
  checkout: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'Documentación',
        identifier: 'checkout',
        href: '/checkout',
        links: [
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
              {
                title: 'Campos Adicionales',
                href: '/checkout/additional-fields',
              },
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
        ],
      },
      {
        title: 'API',
        identifier: 'checkout/api-reference',
        href: '/checkout/api-reference/session',
        links: [
          {
            title: 'API',
            links: [
              { title: 'Sesión', href: '/checkout/api-reference/session' },
              { title: 'Pagos', href: '/checkout/api-reference/payment' },
              { title: 'Token', href: '/checkout/api-reference/token' },
            ],
          },
        ],
      },
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'Documentation',
        identifier: 'checkout',
        href: '/en/checkout',
        links: [
          {
            title: 'Checkout',
            links: [
              { title: 'Introduction', href: '/en/checkout' },
              { title: 'How it works', href: '/en/checkout/how-checkout-works' },
              { title: 'Plugins', href: '/en/checkout/plugins' },
              { title: 'Lightbox', href: '/en/checkout/lightbox' },
            ],
          },
          {
            title: 'Integration',
            links: [
              { title: 'Authentication', href: '/en/checkout/authentication' },
              { title: 'Create Session', href: '/en/checkout/create-session' },
              { title: 'Notification', href: '/en/checkout/notification' },
              { title: 'Localization', href: '/en/checkout/localization' },
              { title: 'Document Types', href: '/en/checkout/document-types' },

              {
                title: 'Additional Fields',
                href: '/en/checkout/additional-fields',
              },
              {
                title: 'Amounts and Currencies',
                href: '/en/checkout/tax-details',
              },
              { title: 'Payment Methods', href: '/en/checkout/payment-methods' },
              {
                title: 'How to integrate with mobile',
                href: '/en/checkout/integration/mobile',
              },
              {
                title: 'Test your integration',
                href: '/en/checkout/test-your-integration',
              },
              { title: 'Changelog', href: '/en/checkout/changelog' },
              { title: 'API Policy', href: '/en/checkout/api-policy' },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'checkout/api-reference',
        href: '/en/checkout/api-reference/session',
        links: [
          {
            title: 'API',
            links: [
              { title: 'Session', href: '/checkout/api-reference/session' },
              { title: 'Payments', href: '/checkout/api-reference/payment' },
              { title: 'Token', href: '/checkout/api-reference/token' },
            ],
          },
        ],
      },
    ],
  },
  gateway: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'Documentación',
        identifier: 'gateway',
        href: '/gateway',
        links: [
          {
            title: 'Gateway',
            links: [
              { title: 'Introducción', href: '/gateway' },
              {
                title: 'Flujo de una transacción',
                href: '/gateway/transaction-flow',
              },
              { title: 'Obligaciones', href: '/gateway/obligations' },
            ],
          },
          {
            title: 'Integración',
            links: [
              { title: 'Autenticación', href: '/gateway/authentication' },
              {
                title: 'Números de tarjetas de pruebas',
                href: '/gateway/testing-card',
              },
              { title: 'Código de aerolíneas', href: '/gateway/airline-codes' },
              { title: 'Tipos de documentos', href: '/gateway/document-types' },
              {
                title: 'Tipos de transacciones',
                href: '/gateway/transaction-types',
              },
              {
                title: 'Control de idempotencia',
                href: '/gateway/idempotency',
              },
              {
                title: 'Importación ordenes de pago',
                href: '/gateway/import-payment-orders',
              },
              {
                title: 'Procesamiento con cuentas bancarias',
                href: '/gateway/processing-with-bank-accounts',
              },
              { title: 'Politica de cambios', href: '/gateway/api-policy' },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'gateway/api-reference',
        href: '/gateway/api-reference/information',
        links: [
          {
            title: 'API',
            links: [
              {
                title: 'Obtener información',
                href: '/gateway/api-reference/information',
              },
              {
                title: 'Transacciones',
                href: '/gateway/api-reference/transaction',
              },
              {
                title: 'Tokenización de tarjetas',
                href: '/gateway/api-reference/tokenize',
              },
              { title: 'Proceso 3DS', href: '/gateway/api-reference/3ds' },
              { title: 'Proceso OTP', href: '/gateway/api-reference/otp' },
              {
                title: 'Operaciones con PinPad',
                href: '/gateway/api-reference/pinpad',
              },
              {
                title: 'Reporte de operaciones realizadas',
                href: '/gateway/api-reference/report',
              },
            ],
          },
        ],
      },
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'Documentation',
        identifier: 'gateway',
        href: '/en/gateway',
        links: [
          {
            title: 'Gateway',
            links: [
              { title: 'Introduction', href: '/en/gateway' },
              { title: 'Transaction flow', href: '/en/gateway/transaction-flow' },
              { title: 'Obligations', href: '/en/gateway/obligations' },
            ],
          },
          {
            title: 'Integration',
            links: [
              { title: 'Authentication', href: '/en/gateway/authentication' },
              { title: 'Test card numbers', href: '/en/gateway/testing-card' },
              { title: 'Airline codes', href: '/en/gateway/airline-codes' },
              { title: 'Document types', href: '/en/gateway/document-types' },
              {
                title: 'Transaction types',
                href: '/en/gateway/transaction-types',
              },
              { title: 'Idempotency control', href: '/en/gateway/idempotency' },
              {
                title: 'Import payment orders',
                href: '/en/gateway/import-payment-orders',
              },
              {
                title: 'Processing with bank accounts',
                href: '/en/gateway/processing-with-bank-accounts',
              },
              { title: 'API Policy', href: '/en/gateway/api-policy' },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'gateway/api-reference',
        href: '/en/gateway/api-reference/information',
        links: [
          {
            title: 'API',
            links: [
              {
                title: 'Get information',
                href: '/en/gateway/api-reference/information',
              },
              {
                title: 'Transactions',
                href: '/en/gateway/api-reference/transaction',
              },
              {
                title: 'Card tokenization',
                href: '/en/gateway/api-reference/tokenize',
              },
              { title: '3DS process', href: '/en/gateway/api-reference/3ds' },
              { title: 'OTP process', href: '/en/gateway/api-reference/otp' },
              {
                title: 'PinPad Operations',
                href: '/en/gateway/api-reference/pinpad',
              },
              {
                title: 'Report of operations carried out',
                href: '/en/gateway/api-reference/report',
              },
            ],
          },
        ],
      },
    ],
  },
}
