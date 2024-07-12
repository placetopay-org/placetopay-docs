import { LANGUAGES_CODES } from '@/components/LocaleProvider'
import { Book, DocumentCode } from 'iconsax-react'

export const TAB_NAVIGATION = {
  checkout: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'Documentación',
        identifier: 'checkout',
        href: '/checkout',
        icon: Book,
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
              { title: 'Reembolsos', href: '/checkout/refund'}
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'checkout/api',
        href: '/checkout/api/reference/session',
        icon: DocumentCode,
        links: [
          {
            title: 'Introducción',
            links: [
              { title: 'Politica de cambios', href: '/checkout/api/policy' },
              { title: 'Historial de cambios', href: '/checkout/api/changelog' },
            ],
          },
          {
            title: 'API',
            links: [
              { title: 'Sesión', href: '/checkout/api/reference/session' },
              { title: 'Pagos', href: '/checkout/api/reference/payment' },
              { title: 'Token', href: '/checkout/api/reference/token' },
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
        icon: Book,
        links: [
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
              {
                title: 'Additional Fields',
                href: '/checkout/additional-fields',
              },
              {
                title: 'Amounts and Currencies',
                href: '/checkout/tax-details',
              },
              { title: 'Payment Methods', href: '/checkout/payment-methods' },
              {
                title: 'How to integrate with mobile',
                href: '/checkout/integration/mobile',
              },
              {
                title: 'Test your integration',
                href: '/checkout/test-your-integration',
              },
              { title: 'Refund', href: '/checkout/refund'},
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'checkout/api',
        href: '/en/checkout/api/reference/session',
        icon: DocumentCode,
        links: [
          {
            title: 'Introduction',
            links: [
              { title: 'API Policy', href: '/checkout/api/policy' },
              { title: 'Changelog', href: '/checkout/api/changelog' },
            ],
          },
          {
            title: 'API',
            links: [
              { title: 'Session', href: '/checkout/api/reference/session' },
              { title: 'Payments', href: '/checkout/api/reference/payment' },
              { title: 'Token', href: '/checkout/api/reference/token' },
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
        icon: Book,
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
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'gateway/api',
        href: '/gateway/api/reference/information',
        icon: DocumentCode,
        links: [
          {
            title: 'Introducción',
            links: [
              { title: 'Politica de cambios', href: '/gateway/api/policy' },
            ],
          },
          {
            title: 'API',
            links: [
              {
                title: 'Obtener información',
                href: '/gateway/api/reference/information',
              },
              {
                title: 'Transacciones',
                href: '/gateway/api/reference/transaction',
              },
              {
                title: 'Tokenización de tarjetas',
                href: '/gateway/api/reference/tokenize',
              },
              { title: 'Proceso 3DS', href: '/gateway/api/reference/3ds' },
              { title: 'Proceso OTP', href: '/gateway/api/reference/otp' },
              {
                title: 'Operaciones con PinPad',
                href: '/gateway/api/reference/pinpad',
              },
              {
                title: 'Reporte de operaciones realizadas',
                href: '/gateway/api/reference/report',
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
        icon: Book,
        links: [
          {
            title: 'Gateway',
            links: [
              { title: 'Introduction', href: '/gateway' },
              { title: 'Transaction flow', href: '/gateway/transaction-flow' },
              { title: 'Obligations', href: '/gateway/obligations' },
            ],
          },
          {
            title: 'Integration',
            links: [
              { title: 'Authentication', href: '/gateway/authentication' },
              { title: 'Test card numbers', href: '/gateway/testing-card' },
              { title: 'Airline codes', href: '/gateway/airline-codes' },
              { title: 'Document types', href: '/gateway/document-types' },
              {
                title: 'Transaction types',
                href: '/gateway/transaction-types',
              },
              { title: 'Idempotency control', href: '/gateway/idempotency' },
              {
                title: 'Import payment orders',
                href: '/gateway/import-payment-orders',
              },
              {
                title: 'Processing with bank accounts',
                href: '/gateway/processing-with-bank-accounts',
              },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'gateway/api',
        href: '/en/gateway/api/reference/information',
        icon: DocumentCode,
        links: [
          {
            title: 'Introduction',
            links: [
              { title: 'API Policy', href: '/gateway/api/policy' },
            ],
          },
          {
            title: 'API',
            links: [
              {
                title: 'Get information',
                href: '/gateway/api/reference/information',
              },
              {
                title: 'Transactions',
                href: '/gateway/api/reference/transaction',
              },
              {
                title: 'Card tokenization',
                href: '/gateway/api/reference/tokenize',
              },
              { title: '3DS process', href: '/gateway/api/reference/3ds' },
              { title: 'OTP process', href: '/gateway/api/reference/otp' },
              {
                title: 'PinPad Operations',
                href: '/gateway/api/reference/pinpad',
              },
              {
                title: 'Report of operations carried out',
                href: '/gateway/api/reference/report',
              },
            ],
          },
        ],
      },
    ],
  },
  three_d_s_server: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'Documentación',
        identifier: 'three_d_s_server',
        href: '/three_d_s_server',
        icon: Book,
        links: [
          {
            title: '3DS Server',
            links: [
              { title: 'Introducción', href: '/three_d_s_server' },
              { title: '¿Qué es el Protocolo 3-D Secure?', href: '/three_d_s_server/introduction' },
              { title: 'Dominios y Componentes', href: '/three_d_s_server/secure-protocol' },
              { title: 'Acerca del componente 3DS Server', href: '/three_d_s_server/server-component' },
              { title: 'Códigos de Error', href: '/three_d_s_server/error-codes' },
              { title: 'Preguntas frecuentes sobre el funcionamiento 3DS Server', href: '/three_d_s_server/f-a-q' },
              { title: 'Códigos HTTP en el proceso de autenticación', href: '/three_d_s_server/http-codes' },
              { title: 'Flujo del servicio de 3DS Server', href: '/three_d_s_server/service-flow' },
              { title: 'Tarjetas de Prueba', href: '/three_d_s_server/test-cards' },
            ],
          },
          {
            title: 'Integración',
            links: [
              { title: 'Obtener información de una autenticación', href: '/three_d_s_server/integration/authentication-info' },
              { title: 'Autorización', href: '/three_d_s_server/integration/authorization' },
              { title: 'Requerimientos para el cliente que va a integrarse', href: '/three_d_s_server/integration/client-requirements' },
              { title: 'Sesión', href: '/three_d_s_server/integration/session' },
              { title: 'Sesión con Digital Authentication Framework', href: '/three_d_s_server/integration/session-daf' },
              { title: 'Sesión desacoplada', href: '/three_d_s_server/integration/session-decoupled'},
              { title: 'Sesión con información previa', href: '/three_d_s_server/integration/session-prior-info' },
              { title: 'Sesión transacción recurrente', href: '/three_d_s_server/integration/session-recurrent' },
              { title: 'Sesión transacciones de no pago', href: '/three_d_s_server/integration/session-subscription'},
              { title: 'Términos y Definiciones', href: '/three_d_s_server/integration/terms-and-definitions'},
              { title: 'Datos del proceso de autenticación', href: '/three_d_s_server/integration/transaction-status'}
            ],
          },
          {
            title: 'Panel',
            links: [
              { title: 'Autenticaciones', href: '/three_d_s_server/panel/authentications' },
              { title: 'Franquicias en 3DS Server', href: '/three_d_s_server/panel/franchise-configuration' },
              { title: 'Página de Inicio (Home)', href: '/three_d_s_server/panel/home' },
              { title: 'Categorías de actividad económica', href: '/three_d_s_server/panel/configurations' },
              { title: 'Funcionalidades', href: '/three_d_s_server/panel/functionalities' },
              { title: '¿Cómo configurar 3DS Server?', href: '/three_d_s_server/panel/general-configuration'},
              { title: 'Tokens', href: '/three_d_s_server/panel/security' },
              { title: 'Comercios en 3DS Server', href: '/three_d_s_server/panel/merchant-configuration' },
              { title: 'Métricas', href: '/three_d_s_server/panel/metrics'},
              { title: 'Reportes', href: '/three_d_s_server/panel/reports'},
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'three_d_s_server/api',
        href: '/three_d_s_server/api/',
        icon: DocumentCode,
        links: [
          {
            title: '',
            links: [
              { title: '', href: '' },
              { title: '', href: '' },
            ],
          },
        ],
      },
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: "Documentation",
        identifier: "three_d_s_server",
        href: "/three_d_s_server",
        icon: "Book",
        links: [
          {
            title: "3DS",
            links: [
              { title: "Introduction", "href": "/three_d_s_server" },
              { title: "What is the 3-D Secure Protocol?", "href": "/three_d_s_server/introduction" },
              { title: "Domains and Components", "href": "/three_d_s_server/secure-protocol" },
              { title: "About the 3DS Server Component", "href": "/three_d_s_server/server-component" },
              { title: "Error Codes", "href": "/three_d_s_server/error-codes" },
              { title: "Frequently Asked Questions about MPI Functioning", "href": "/three_d_s_server/f-a-q" },
              { title: "HTTP Codes in the Authentication Process", "href": "/three_d_s_server/http-Codes" },
              { title: "3DS Server Service Flow", "href": "/three_d_s_server/service-flow" },
              { title: "Test Cards", "href": "/three_d_s_server/test-cards" }
            ]
          },
          {
            title: "Integration",
            links: [
              { title: "Obtain Authentication Information", "href": "/three_d_s_server/integration/authentication-info" },
              { title: "Authorization", "href": "/three_d_s_server/integration/authorization" },
              { title: "Client Integration Requirements", "href": "/three_d_s_server/integration/client-requirements" },
              { title: "Session", "href": "/three_d_s_server/integration/session" },
              { title: "Session with Digital Authentication Framework", "href": "/three_d_s_server/integration/session-daf" },
              { title: "Decoupled Session", "href": "/three_d_s_server/integration/session-decoupled" },
              { title: "Session with Prior Information", "href": "/three_d_s_server/integration/session-prior-info" },
              { title: "Recurrent Transaction Session", "href": "/three_d_s_server/integration/session-recurrent" },
              { title: "Non-payment Transaction Session", "href": "/three_d_s_server/integration/session-subscription" },
              { title: "Terms and Definitions", "href": "/three_d_s_server/integration/terms-and-definitions" },
              { title: "Authentication Process Data", "href": "/three_d_s_server/integration/transaction-status" }
            ]
          },
          {
            title: "Panel",
            links: [
              { title: "Authentications", "href": "/three_d_s_server/panel/authentications" },
              { title: "3DS Server Franchises", "href": "/three_d_s_server/panel/franchise-configuration" },
              { title: "Home Page", "href": "/three_d_s_server/panel/home" },
              { title: "Economic Activity Categories", "href": "/three_d_s_server/panel/configurations" },
              { title: "Functionalities", "href": "/three_d_s_server/panel/functionalities" },
              { title: "How to Configure MPI?", "href": "/three_d_s_server/panel/general-configuration" },
              { title: "Tokens", "href": "/three_d_s_server/panel/security" },
              { title: "Merchants in 3DS Server", "href": "/three_d_s_server/panel/merchant-configuration" },
              { title: "Metrics", "href": "/three_d_s_server/panel/metrics" },
              { title: "Reports", "href": "/three_d_s_server/panel/reports" }
            ]
          }
        ]
      },
      {
        title: "API",
        identifier: "three_d_s_server/api",
        href: "/three_d_s_server/api/",
        icon: "DocumentCode",
        links: [
          {
            title: "",
            links: [
              { "title": "", "href": "" },
              { "title": "", "href": "" }
            ]
          }
        ]
      }
    ]
  },
}
