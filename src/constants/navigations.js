import { LANGUAGES_CODES } from '@/components/LocaleProvider'
import {
  Activity,
  Book,
  Calendar,
  Courthouse,
  DocumentCode,
  Link,
  MonitorMobbile,
  SecurityCard,
  Shop,
  ShieldTick
} from 'iconsax-react'

/**
 * List of options to be displayed in the navigation selector
 *
 * title: Title of the option
 * description: Description of the option
 * href: Route to redirect to
 * icon: Icon to display
 */
export const NAMESPACES_SELECTOR = {
  [LANGUAGES_CODES.ES]: [
    {
      title: 'Pagos',
      description: 'Pagos en línea.',
      href: '/payments',
      icon: MonitorMobbile,
    },
    {
      title: 'Web Checkout',
      description: 'Página de pagos prediseñada.',
      href: '/checkout',
      icon: MonitorMobbile,
    },
    {
      title: 'Gateway',
      description: 'Recibe pagos por API',
      href: '/gateway',
      icon: DocumentCode,
    },
    {
      title: '3DS Server',
      description: 'Pagos más seguros',
      href: '/three-d-s-server',
      icon: Activity,
    },
    {
      title: 'ACS',
      description: 'Pagos más seguros',
      href: '/acs',
      icon: Activity,
    },
    {
      title: 'Receptor de Tokens',
      description: 'Servicio de tokenización publica',
      href: '/token-requestor',
      icon: SecurityCard,
    },
    {
      title: 'Link de Pago',
      description: 'Crea y gestiona links de pago',
      href: '/payment-links',
      icon: Link,
    },
    {
      title: 'Micrositios',
      description: 'Creación y gestión de micrositios',
      href: '/microsites',
      icon: Calendar,
    },
    {
      title: 'Tokenización y Cobros masivos',
      description: 'Tokenización y Cobros masivos',
      href: '/tpm',
      icon: Book,
    },
    {
      title: 'Validador de cuentas',
      description: 'Verificación de cuentas',
      href: '/account-validator',
      icon: SecurityCard,
    },
    {
      title: 'PinPad SDK',
      description: 'SDK para gestionar el campo pinpad',
      href: '/sdks/pinpad',
      icon: MonitorMobbile,
    },
    {
      title: 'Tiquetes',
      description: 'Administración de tiquetes de aerolíneas',
      href: '/ticket/reference',
      icon: DocumentCode,
    },
    {
      title: 'Api Scudo',
      description: 'Control de fraude',
      href: '/api-scudo',
      icon: ShieldTick,
    },
    {
      title: 'Autodeclaraciones',
      description: 'Gestión de declaraciones',
      href: '/selfdeclarations',
      icon: Courthouse,
    },
    {
      title: 'Ordenes de pago',
      description: 'Gestión de ordenes de pago',
      href: '/invoices',
      icon: DocumentCode,
    },
    {
      title: 'AutoPay',
      description: 'Gestión de AutoPagos',
      href: '/autopay',
      icon: Courthouse,
    },
    {
      title: 'Onboarding',
      description: 'Registro y actualización de comercios',
      href: '/onboarding',
      icon: Shop,
    },
  ],
  [LANGUAGES_CODES.EN]: [
    {
      title: 'Payments',
      description: 'Online Payments.',
      href: '/en/payments',
      icon: MonitorMobbile,
    },
    {
      title: 'Web Checkout',
      description: 'Pre-designed payment page.',
      href: '/en/checkout',
      icon: MonitorMobbile,
    },
    {
      title: 'Gateway',
      description: 'Receive payments via API.',
      href: '/en/gateway',
      icon: DocumentCode,
    },
    {
      title: '3DS Server',
      description: 'Safer payments.',
      href: '/en/three-d-s-server',
      icon: Activity,
    },
    {
      title: 'ACS',
      description: 'Safer payments.',
      href: '/en/acs',
      icon: Activity,
    },
    {
      title: 'Token Requestor',
      description: 'Public tokenization service',
      href: '/en/token-requestor',
      icon: SecurityCard,
    },
    {
      title: 'Payment Link',
      description: 'Create and manage payment links',
      href: '/en/payment-links',
      icon: Link,
    },
    {
      title: 'Microsites',
      description: 'Create and manage microsites',
      href: '/en/microsites',
      icon: Calendar,
    },
    {
      title: 'Tokenization and Massive recurring',
      description: 'Tokenization and Massive recurring',
      href: '/en/tpm',
      icon: Calendar,
    },
    {
      title: 'Account Validator',
      description: 'Account verification',
      href: '/en/account-validator',
      icon: SecurityCard,
    },
    {
      title: 'PinPad SDK',
      description: 'SDK to manage the pinpad field',
      href: '/en/sdks/pinpad',
      icon: MonitorMobbile,
    },
    {
      title: 'Tickets',
      description: 'Airline ticket management',
      href: '/en/ticket/reference',
      icon: DocumentCode,
    },
    {
      title: 'Api Scudo',
      description: 'Fraud control',
      href: '/en/api-scudo',
      icon: ShieldTick,
    },
    {
      title: 'Selfdeclarations',
      description: 'Declaration management',
      href: '/en/selfdeclarations',
      icon: Courthouse,
    },
    {
      title: 'Payment order',
      description: 'Payment order management',
      href: '/en/invoices',
      icon: DocumentCode,
    },
    {
      title: 'AutoPay',
      description: 'AutoPay management',
      href: '/en/autopay',
      icon: Courthouse,
    },
    {
      title: 'Onboarding',
      description: 'Merchant registration and updates',
      href: '/en/onboarding',
      icon: Shop,
    },
  ],
}

/**
 * List of options used to map the URL path to
 * its corresponding path in the routes object
 *
 * KEY : URL path
 * VALUE : TAB_NAVIGATION key
 */
export const NAMESPACE_ROUTES = {
  payments: 'payments',
  checkout: 'checkout',
  gateway: 'gateway',
  'three-d-s-server': 'threeDsServer',
  acs: 'acs',
  sdks: 'sdks',
  'token-requestor': 'tokenRequestor',
  'payment-links': 'paymentLinks',
  microsites: 'microsites',
  tpm: 'tpm',
  ticket: 'ticket',
  core: 'core',
  'account-validator': 'accountValidator',
  'api-scudo': 'apiScudo',
  'selfdeclarations': 'selfdeclarations',
  invoices: 'invoices',
  'autopay': 'autopay',
  'onboarding': 'onboarding',
}

/**
 * List of options that will be displayed in
 * the left navigation menu within each page
 *
 * KEY : TAB_NAVIGATION key
 * VALUE : List of options
 *
 * title: Title of the option
 * identifier: Unique identifier of the option which must be included in the path to identify the object that is active on the page
 * href: Route to redirect to
 * icon: Icon to display
 * links: List of sub-options
 *
 * Sub-options (Sections):
 * title: Title of the sub-option
 * links: List of sub-options
 *
 * Sub-options (Pages):
 * title: Title of the sub-option
 * href: Route to redirect to
 */
export const TAB_NAVIGATION = {
  payments: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'Documentación',
        identifier: 'payments',
        href: '/payments',
        icon: Book,
        links: [
          {
            title: 'Pagos',
            links: [
              {
                title: 'Introducción', href: '/payments'
              },
              {
                title: 'Conversión dinámica de monedas', href: '/payments/currency-conversion',
              },
            ],
          },
          {
            title: 'Gestiona tu cuenta en nuestro Dash',
            links: [
              { title: 'Introducción', href: '/payments/newpanel/introduction' },
              {
                title: 'Ingreso a Dash',
                links: [
                  { title: 'Migración de usuario', href: '/payments/newpanel/users/migration' },
                  { title: 'Creación de usuario', href: '/payments/newpanel/users/createuser' },

                ],
              },
              {
                title: 'Transacciones', links: [
                  { title: 'Consulta de transacciones', href: '/payments/newpanel/transaction/search' }
                ],
              },
              {
                title: 'Reportes transaccionales', links: [
                  { title: 'Exportes y estadísticas', href: '/payments/newpanel/reports/export' }
                ],
              },
            ],
          },
          {
            title: 'Link de pagos',
            links: [
              { title: 'Introducción', href: '/payments/payments-links/introduction' },
              { title: 'Crear link de pagos', href: '/payments/payments-links/create-payment-link' },
              { title: 'Gestionar link de pagos', href: '/payments/payments-links/link-management' }
            ],
          },
          {
            title: 'Pagos con código QR',
            links: [
              { title: 'Introducción', href: '/payments/qr/introduction' },
              { title: 'Gestionar QR', href: '/payments/qr/qr-management' },
            ],
          },
          {
            title: 'Micrositios',
            links: [
              { title: 'Introducción', href: '/payments/introduction-to-microsites' },
              {
                title: 'Micrositio Abierto', links: [
                  { title: 'Introducción', href: '/payments/microsite-open/introduction' },
                  { title: 'Estructura de Campos', href: '/payments/microsite-open/fields' },

                ],
              },
              {
                title: 'Micrositio Cerrado', links: [
                  { title: 'Introducción', href: '/payments/microsite-closed/introduction' },
                  { title: 'Carga de Órdenes', href: '/payments/microsite-closed/charge-invoice' },
                ],
              },
            ],
          },
          {
            title: 'Micrositio Personalizado',
            links: [
              { title: 'Introducción', href: '/payments/microsite-customized/introduction' },
              { title: 'Cómo Funciona', href: '/payments/microsite-customized/how-to-work' },
              {
                title: 'Integración',
                links: [
                  { title: 'Autenticación', href: '/payments/microsite-customized/authentication' },
                  { title: 'Servicios', href: '/payments/microsite-customized/services' },
                  { title: 'Manejo de errores', href: '/payments/microsite-customized/error-handling' },
                  { title: 'Estructuras de datos', href: '/payments/microsite-customized/data-structures' },
                ],
              },
            ],
          },
          {
            title: 'Flujos de Pago',
            links: [
              { title: 'Proceso de pago en WebCheckout', href: '/payments/process-pay' },
              { title: 'Preautorización', href: '/payments/preauthorization' },
              { title: 'Conciliación', href: '/payments/conciliation' },
            ],
          },
          {
            title: 'Medios de pago',
            links: [
              {
                title: 'Introducción',
                href: '/payments/payment-methods/introduction',
              },
              {
                title: 'Tarjetas',
                links: [
                  { title: 'EBT', href: '/payments/cards/ebt' },
                ],
              },
              {
                title: 'Débitos bancarios',
                links: [
                  { title: 'ACH Débito Bancario', href: '/payments/external-redirects/ach-bank-debit' },
                ],
              },
               {
                 title: 'Redireccionamientos externos',
                 links: [
                   { title: 'ATH Móvil', href: '/payments/external-redirects/ath-movil' },
                   { title: 'Bre-B', href: '/payments/external-redirects/bre-b' },
                   { title: 'CeroPay', href: '/payments/external-redirects/ceropay' },
                   { title: 'Deuna!', href: '/payments/external-redirects/deuna' },
                   { title: 'Zunify', href: '/payments/external-redirects/zunify' },
                 ],
               },
              {
                title: 'Efectivo',
                links: [
                  { title: 'Pago en efectivo', href: '/payments/cash/cash' },
                ],
              },
              {
                title: 'Billeteras',
                links: [
                  { title: 'Click to Pay', href: '/payments/wallets/clicktopay' },
                  { title: 'Google Pay', href: '/payments/wallets/googlepay' },
                ],
              }
            ],
          },
          {
            title: 'Integraciones',
            links: [
              { title: 'Modificadores de transacción', href: '/payments/integrations/transaction-modifiers' },
            ],
          },
          {
            title: 'Reportes de conciliación bancaria ',
            links: [
              { title: 'Reportes de conciliación bancaria', href: '/payments/bank-reports/bank-reports-pr' },
              {
                title: 'Ejemplos de reportes de conciliación bancaria',
                href: '/payments/bank-reports/bank-reports-pr-examples'
              },
            ],
          }
        ],
      }
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'Documentation',
        identifier: 'payments',
        href: '/en/payments',
        icon: Book,
        links: [
          {
            title: 'Payments',
            links: [
              { title: 'Introduction', href: '/en/payments' },
              { title: 'Dynamic Currency Conversion', href: '/en/payments/currency-conversion' },
            ],
          },
          {
            title: 'Manage your account on our Dash',
            links: [
              { title: 'Introduction', href: '/en/payments/newpanel/introduction' },
              {
                title: 'Access to Dash',
                links: [
                  { title: 'User migration', href: '/en/payments/newpanel/users/migration' },
                  { title: 'User creation', href: '/en/payments/newpanel/users/createuser' },

                ],
              },
              {
                title: 'Transactions', links: [
                  { title: 'Transaction inquiry', href: '/en/payments/newpanel/transaction/search' }
                ],
              },
              {
                title: 'Transactional reports', links: [
                  { title: 'Exports and statistics', href: '/en/payments/newpanel/reports/export' }
                ],
              },
            ],
          },
          {
            title: 'Payment Links',
            links: [
              { title: 'Introduction', href: '/en/payments/payments-links/introduction' },
              { title: 'Create Payment Link', href: '/en/payments/payments-links/create-payment-link' },
              { title: 'Manage Payment Links', href: '/en/payments/payments-links/link-management' }
            ],
          },
          {
            title: 'QR code payments',
            links: [
              { title: 'Introduction', href: '/en/payments/qr/introduction' },
              { title: 'Manage QR code', href: '/en/payments/qr/qr-management' },
            ],
          },
          {
            title: 'Microsites',
            links: [
              { title: 'Introduction', href: '/en/payments/introduction-to-microsites' },
              {
                title: 'Open Microsite',
                links: [
                  { title: 'Introduction', href: '/en/payments/microsite-open/introduction' },
                  { title: 'Field Structure', href: '/en/payments/microsite-open/fields' },
                ],
              },
              {
                title: 'Closed Microsite',
                links: [
                  { title: 'Introduction', href: '/en/payments/microsite-closed/introduction' },
                  { title: 'Order Upload', href: '/en/payments/microsite-closed/charge-invoice' },
                ],
              },
            ],
          },
          {
            title: 'Custom Microsite',
            links: [
              { title: 'Introduction', href: '/en/payments/microsite-customized/introduction' },
              { title: 'How to Work', href: '/en/payments/microsite-customized/how-to-work' },
              {
                title: 'Integration',
                links: [
                  { title: 'Authentication', href: '/en/payments/microsite-customized/authentication' },
                  { title: 'Services', href: '/en/payments/microsite-customized/services' },
                  { title: 'Error handling', href: '/en/payments/microsite-customized/error-handling' },
                  { title: 'Data structures', href: '/en/payments/microsite-customized/data-structures' },
                ],
              },
            ],
          },
          {
            title: 'Payment Flows',
            links: [
              { title: 'Payment Process in Web Checkout', href: '/en/payments/process-pay' },
              { title: 'Preauthorization', href: '/en/payments/preauthorization' },
              { title: 'Conciliation', href: '/en/payments/conciliation' },
            ],
          },
          {
            title: 'Payment methods',
            links: [
              {
                title: 'Introduction',
                href: '/en/payments/payment-methods/introduction',
              },
              {
                title: 'Cards',
                links: [
                  { title: 'EBT', href: '/en/payments/cards/ebt' },
                ],
              },
              {
                title: 'Bank Debits',
                links: [
                  { title: 'ACH Bank Debit', href: '/en/payments/external-redirects/ach-bank-debit' },
                ],
              },
               {
                 title: 'External redirects',
                 links: [
                   { title: 'ATH Móvil', href: '/en/payments/external-redirects/ath-movil' },
                   { title: 'Bre-B', href: '/en/payments/external-redirects/bre-b' },
                   { title: 'CeroPay', href: '/en/payments/external-redirects/ceropay' },
                   { title: 'Deuna!', href: '/en/payments/external-redirects/deuna' },
                   { title: 'Zunify', href: '/en/payments/external-redirects/zunify' },
                 ],
               },
              {
                title: 'Cash',
                links: [
                  { title: 'Cash payment', href: '/en/payments/cash/cash' },
                ],
              },
              {
                title: 'Wallets',
                links: [
                  { title: 'Click to Pay', href: '/en/payments/wallets/clicktopay' },
                  { title: 'Google Pay', href: '/en/payments/wallets/googlepay' },
                ],
              }
            ],
          },
          {
            title: 'Integrations',
            links: [
              { title: 'Transaction Modifiers', href: '/en/payments/integrations/transaction-modifiers' },
            ],
          },
          {
            title: 'Bank reconciliation reports',
            links: [
              { title: 'Bank reconciliation reports', href: '/en/payments/bank-reports/bank-reports-pr' },
              {
                title: 'Examples of bank reconciliation reports',
                href: '/en/payments/bank-reports/bank-reports-pr-examples'
              },
            ],
          }
        ],
      },
    ],
  },
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
              { title: 'Cómo funciona', href: '/checkout/how-checkout-works' },
              { title: 'Plugins y librerías', href: '/checkout/plugins' },
              { title: 'Lightbox', href: '/checkout/lightbox' },
              { title: 'Navegadores soportados', href: '/checkout/browser-support' },
            ],
          },
          {
            title: 'Integración',
            links: [
              { title: 'Autenticación', href: '/checkout/authentication' },
              { title: 'Crear sesión', href: '/checkout/create-session' },
              { title: 'Notificación', href: '/checkout/notification' },
              { title: 'Cancelar sesión', href: '/checkout/cancel-session' },
              { title: 'Localización', href: '/checkout/localization' },
              { title: 'Tipos de documento', href: '/checkout/document-types' },
              {
                title: 'Campos adicionales',
                href: '/checkout/additional-fields',
              },
              { title: 'Montos y monedas', href: '/checkout/tax-details' },
              { title: 'Métodos de pago', href: '/checkout/payment-methods' },
              {
                title: 'Como integrar con móvil',
                href: '/checkout/integration/mobile',
              },
              {
                title: 'Prueba tu integración',
                href: '/checkout/test-your-integration',
              },
              { title: 'Reembolsos', href: '/checkout/refund' },
              {
                title: 'Campos de procesamiento',
                href: '/checkout/processor-fields',
              },
              {
                title: 'Fecha de expiración',
                href: '/checkout/expiration',
              },
              {
                title: 'Omitir resultado',
                href: '/checkout/skip-result',
              },
              {
                title: 'Metadata',
                href: '/checkout/metadata',
              },
              {
                title: 'Reintentos del proceso',
                href: '/checkout/attempts-limit',
              },
              {
                title: 'Sesiones con confirmación',
                href: '/checkout/confirmation-flow',
              }
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
              {
                title: 'Historial de cambios',
                href: '/checkout/api/changelog',
              },
            ],
          },
          {
            title: 'API',
            links: [
              { title: 'Sesión', href: '/checkout/api/reference/session' },
              { title: 'Pagos', href: '/checkout/api/reference/payment' },
              { title: 'Token', href: '/checkout/api/reference/token' },
              {
                title: 'Gateway', links: [
                  { title: 'Information', href: '/checkout/api/reference/gateway/information' },
                  { title: 'Token', href: '/checkout/api/reference/gateway/token' },
                ],
              }
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
              { title: 'Introduction', href: '/en/checkout' },
              { title: 'How it works', href: '/en/checkout/how-checkout-works' },
              { title: 'Plugins and libraries', href: '/en/checkout/plugins' },
              { title: 'Lightbox', href: '/en/checkout/lightbox' },
              { title: 'Browser support', href: '/en/checkout/browser-support' },
            ],
          },
          {
            title: 'Integration',
            links: [
              { title: 'Authentication', href: '/en/checkout/authentication' },
              { title: 'Create session', href: '/en/checkout/create-session' },
              { title: 'Notification', href: '/en/checkout/notification' },
              { title: 'Cancel session', href: '/en/checkout/cancel-session' },
              { title: 'Localization', href: '/en/checkout/localization' },
              { title: 'Document types', href: '/en/checkout/document-types' },
              {
                title: 'Additional fields',
                href: '/en/checkout/additional-fields',
              },
              {
                title: 'Amounts and currencies',
                href: '/en/checkout/tax-details',
              },
              { title: 'Payment methods', href: '/en/checkout/payment-methods' },
              {
                title: 'How to integrate with mobile',
                href: '/en/checkout/integration/mobile',
              },
              {
                title: 'Test your integration',
                href: '/en/checkout/test-your-integration',
              },
              { title: 'Refund', href: '/en/checkout/refund' },
              {
                title: 'Processor fields',
                href: '/en/checkout/processor-fields',
              },
              {
                title: 'Expiration date',
                href: '/en/checkout/expiration',
              },
              {
                title: 'Skip result',
                href: '/en/checkout/skip-result',
              },
              {
                title: 'Metadata',
                href: '/en/checkout/metadata',
              },
              {
                title: 'Process retries',
                href: '/en/checkout/attempts-limit',
              },
              {
                title: 'Session with confirmation',
                href: '/en/checkout/confirmation-flow',
              },
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
              { title: 'API policy', href: '/en/checkout/api/policy' },
              { title: 'Changelog', href: '/en/checkout/api/changelog' },
            ],
          },
          {
            title: 'API',
            links: [
              { title: 'Session', href: '/en/checkout/api/reference/session' },
              { title: 'Payments', href: '/en/checkout/api/reference/payment' },
              { title: 'Token', href: '/en/checkout/api/reference/token' },
              {
                title: 'Gateway', links: [
                  { title: 'Information', href: '/en/checkout/api/reference/gateway/information' },
                  { title: 'Token', href: '/en/checkout/api/reference/gateway/token' },
                ],
              }
            ]
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
              {
                title: 'Notificación',
                href: '/gateway/notification',
              },
              {
                title: 'Datos adicionales',
                href: '/gateway/additional-data',
              },
              {
                title: 'Forwarding',
                href: '/gateway/forwarding',
              },
              {
                title: 'Retorno de tarjeta',
                href: '/gateway/card-return',
              },
              {
                title: 'Webhooks',
                href: '/gateway/webhooks',
              },
              {
                title: 'Indicador de iniciador de transacción',
                href: '/gateway/initiator-indicator',
              },
              {
                title: 'Orquestador de pagos',
                href: '/gateway/orchestrator',
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
                title: 'Operaciones con ordenes de pago',
                href: '/gateway/api/reference/cashorder',
              },
              {
                title: 'Reporte de operaciones realizadas',
                href: '/gateway/api/reference/report',
              },
              {
                title: 'Account validator',
                href: '/gateway/api/reference/account-validator',
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
              {
                title: 'Notification',
                href: '/en/gateway/notification',
              },
              {
                title: 'Additional data',
                href: '/en/gateway/additional-data',
              },
              {
                title: 'Forwarding',
                href: '/en/gateway/forwarding',
              },
              {
                title: 'Card return',
                href: '/en/gateway/card-return',
              },
              {
                title: 'Webhooks',
                href: '/en/gateway/webhooks',
              },
              {
                title: 'Transaction initiator indicator',
                href: '/en/gateway/initiator-indicator',
              },
              {
                title: 'Payment orchestrator',
                href: '/en/gateway/orchestrator',
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
            links: [{ title: 'API Policy', href: '/en/gateway/api/policy' }],
          },
          {
            title: 'API',
            links: [
              {
                title: 'Get information',
                href: '/en/gateway/api/reference/information',
              },
              {
                title: 'Transactions',
                href: '/en/gateway/api/reference/transaction',
              },
              {
                title: 'Card tokenization',
                href: '/en/gateway/api/reference/tokenize',
              },
              { title: '3DS process', href: '/en/gateway/api/reference/3ds' },
              { title: 'OTP process', href: '/en/gateway/api/reference/otp' },
              {
                title: 'PinPad operations',
                href: '/en/gateway/api/reference/pinpad',
              },
              {
                title: 'Cash orders operations',
                href: '/en/gateway/api/reference/cashorder',
              },
              {
                title: 'Report of operations carried out',
                href: '/en/gateway/api/reference/report',
              },
              {
                title: 'Account validator',
                href: '/en/gateway/api/reference/account-validator',
              },
            ],
          },
        ],
      },
    ],
  },
  threeDsServer: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'Documentación',
        identifier: 'three-d-s-server',
        href: '/three-d-s-server',
        icon: Book,
        links: [
          {
            title: '3DS Server',
            links: [
              {
                title: 'Introducción',
                href: '/three-d-s-server'
              },
              {
                title: '¿Qué es el protocolo 3D-Secure?',
                href: '/three-d-s-server/introduction',
              },
              {
                title: 'Dominios y componentes',
                href: '/three-d-s-server/secure-protocol',
              },
              {
                title: 'Acerca del componente 3DS Server',
                href: '/three-d-s-server/server-component',
              },
              {
                title: 'Códigos de Error',
                href: '/three-d-s-server/error-codes',
              },
              {
                title:
                  'Preguntas frecuentes sobre el funcionamiento 3DS Server',
                href: '/three-d-s-server/faq',
              },
              {
                title: 'Códigos HTTP en el proceso de autenticación',
                href: '/three-d-s-server/http-codes',
              },
              {
                title: 'Flujo del servicio de 3DS Server',
                href: '/three-d-s-server/service-flow',
              },
              {
                title: '¿Qué es 3RI?',
                href: '/three-d-s-server/information-3ri',
              },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'three-d-s-server/api',
        href: '/three-d-s-server/api',
        icon: DocumentCode,
        links: [
          {
            title: 'Introducción',
            links: [
              {
                title: 'Inicio',
                href: '/three-d-s-server/api'
              },
              {
                title: 'Requerimientos para el cliente que va a integrarse',
                href: '/three-d-s-server/api/client-requirements',
              },
              {
                title: 'Términos y definiciones',
                href: '/three-d-s-server/api/terms-and-definitions',
              },
              {
                title: 'Datos del proceso de autenticación',
                href: '/three-d-s-server/api/transaction-status',
              },
            ],
          },

          {
            title: 'Integración',
            links: [
              {
                title: 'Autenticación',
                href: '/three-d-s-server/api/integration/authorization',
              },
              {
                title: 'Tarjetas de prueba',
                href: '/three-d-s-server/api/integration/test-cards',
              },
            ],
          },

          {
            title: 'Casos de uso',
            links: [
              {
                title: 'Sesión',
                href: '/three-d-s-server/api/integration/session',
              },
              {
                title: 'Sesión 3RI',
                href: '/three-d-s-server/api/integration/session-r-i',
              },
              {
                title: 'BME: Bridging Message Extension',
                href: '/three-d-s-server/api/integration/session-b-m-e',
              },
              {
                title: 'DAF: Digital Authentication Framework',
                href: '/three-d-s-server/api/integration/session-d-a-f',
              },
            ],
          },
          {
            title: 'Sesiones',
            links: [
              {
                title: 'Reglas',
                href: '/three-d-s-server/api/sessions/rules',
              },
              {
                title: 'API de sesiones',
                href: '/three-d-s-server/api/sessions',
              },
              {
                title: 'Datos adicionales',
                href: '/three-d-s-server/api/sessions/detail-info',
              },
            ],
          },
          {
            title: 'Transacciones',
            links: [
              {
                title: 'API detalle de una transacción',
                href: '/three-d-s-server/api/transactions',
              },
              {
                title: 'Valores devueltos en la respuesta',
                href: '/three-d-s-server/api/transactions/values',
              },
              {
                title: 'Obtener información de una autenticación',
                href: '/three-d-s-server/api/transactions/authentication-info',
              },
            ],
          },
          {
            title: 'Comercios',
            links: [
              {
                title: 'API comercios',
                href: '/three-d-s-server/api/merchants/create',
              },
              {
                title: 'API sucursales',
                href: '/three-d-s-server/api/merchants/branch',
              },
              {
                title: 'API suscripciones',
                href: '/three-d-s-server/api/subscriptions/show',
              },
              {
                title: 'API tokens',
                href: '/three-d-s-server/api/tokens/show',
              },
            ],
          },
        ],
      },
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'Documentation',
        identifier: 'three-d-s-server',
        href: '/en/three-d-s-server',
        icon: 'Book',
        links: [
          {
            title: '3DS',
            links: [
              {
                title: 'Introduction',
                href: '/en/three-d-s-server'
              },
              {
                title: 'What is the 3D-Secure protocol?',
                href: '/en/three-d-s-server/introduction',
              },
              {
                title: 'Domains and components',
                href: '/en/three-d-s-server/secure-protocol',
              },
              {
                title: 'About the 3DS server component',
                href: '/en/three-d-s-server/server-component',
              },
              {
                title: 'Error codes',
                href: '/en/three-d-s-server/error-codes'
              },
              {
                title: 'Frequently asked questions about 3DSS functioning',
                href: '/en/three-d-s-server/faq',
              },
              {
                title: 'HTTP codes in the authentication process',
                href: '/en/three-d-s-server/http-codes',
              },
              {
                title: '3DS server service flow',
                href: '/en/three-d-s-server/service-flow',
              },
              {
                title: 'What is 3RI?',
                href: '/en/three-d-s-server/information-3ri',
              },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'three-d-s-server/api',
        href: '/en/three-d-s-server/api/',
        icon: DocumentCode,
        links: [
          {
            title: 'Introduction',
            links: [
              {
                title: 'Home',
                href: '/en/three-d-s-server/api'
              },
              {
                title: 'Requirements for the client who is going to integrate',
                href: '/en/three-d-s-server/api/client-requirements',
              },
              {
                title: 'Terms and definitions',
                href: '/en/three-d-s-server/api/terms-and-definitions',
              },
              {
                title: 'Authentication process data',
                href: '/en/three-d-s-server/api/transaction-status',
              },
            ],
          },

          {
            title: 'Integration',
            links: [
              {
                title: 'Authentication',
                href: '/en/three-d-s-server/api/integration/authorization',
              },
              {
                title: 'Test Cards',
                href: '/en/three-d-s-server/api/integration/test-cards'
              },
            ],
          },

          {
            title: 'Use cases',
            links: [
              {
                title: 'Session',
                href: '/en/three-d-s-server/api/integration/session',
              },
              {
                title: 'Session with 3RI',
                href: '/en/three-d-s-server/api/integration/session-r-i',
              },
              {
                title: 'BME: Bridging Message Extension',
                href: '/en/three-d-s-server/api/integration/session-b-m-e',
              },
              {
                title: 'DAF: Digital Authentication Framework',
                href: '/en/three-d-s-server/api/integration/session-d-a-f',
              },
            ],
          },
          {
            title: 'Sessions',
            links: [
              {
                title: 'Rules',
                href: '/en/three-d-s-server/api/sessions/rules',
              },
              {
                title: 'API sessions',
                href: '/en/three-d-s-server/api/sessions'
              },
              {
                title: 'Additional data',
                href: '/en/three-d-s-server/api/sessions/detail-info',
              },
            ],
          },
          {
            title: 'Transactions',
            links: [
              {
                title: 'Transaction show',
                href: '/en/three-d-s-server/api/transactions',
              },
              {
                title: 'Values returned in the response',
                href: '/en/three-d-s-server/api/transactions/values',
              },
              {
                title: 'Get authentication information',
                href: '/en/three-d-s-server/api/transactions/authentication-info',
              },
            ],
          },
          {
            title: 'Merchants',
            links: [
              {
                title: 'Merchants API',
                href: '/en/three-d-s-server/api/merchants/create',
              },
              {
                title: 'Branches API',
                href: '/en/three-d-s-server/api/merchants/branch',
              },
              {
                title: 'Subscriptions API',
                href: '/en/three-d-s-server/api/subscriptions/show',
              },
              {
                title: 'Tokens API',
                href: '/en/three-d-s-server/api/tokens/show',
              },
            ],
          },
        ],
      },
    ],
  },
  tokenRequestor: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'Documentación',
        identifier: 'token-requestor',
        href: '/token-requestor',
        icon: Book,
        links: [
          {
            title: 'Receptor de Tokens',
            links: [
              {
                title: 'Introducción',
                href: '/token-requestor'
              },
              {
                title: 'Definiciones clave',
                href: '/token-requestor/definitions',
              },
            ],
          },
          {
            title: 'Integración',
            links: [
              {
                title: 'Autenticación',
                href: '/token-requestor/integration/authentication',
              },
              {
                title: 'Códigos de razón',
                href: '/token-requestor/integration/reason-codes',
              },
              {
                title: 'Notificaciones',
                href: '/token-requestor/integration/notifications',
              },
              {
                title: 'Prueba tu integración',
                href: '/token-requestor/integration/testing',
              },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'token-requestor/api',
        href: '/token-requestor/api',
        icon: DocumentCode,
        links: [
          {
            title: 'Introducción',
            links: [{ title: 'Inicio', href: '/token-requestor/api' }],
          },
          {
            title: 'Administracion del ciclo del token',
            links: [
              {
                title: 'Enroll card',
                href: '/token-requestor/api/enroll-card',
              },
              { title: 'Get cryptogram', href: '/token-requestor/api/checkout' },
              {
                title: 'Get token status',
                href: '/token-requestor/api/get-token-status',
              },
              {
                title: 'Delete token',
                href: '/token-requestor/api/delete-token'
              },
            ],
          },
          {
            title: 'Api de administración',
            links: [
              {
                title: 'Administración de credenciales',
                href: '/token-requestor/api/admin/credentials',
              },
              {
                title: 'Administración de sitios',
                href: '/token-requestor/api/admin/sites',
              },
              {
                title: 'Administración de comercios',
                href: '/token-requestor/api/admin/merchant',
              },
            ],
          },
        ],
      },
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'Documentation',
        identifier: 'token-requestor',
        href: '/en/token-requestor',
        icon: Book,
        links: [
          {
            title: 'Token requestor',
            links: [
              {
                title: 'Introduction',
                href: '/en/token-requestor'
              },
              {
                title: 'Key definitions',
                href: '/en/token-requestor/definitions',
              },
            ],
          },
          {
            title: 'Integration',
            links: [
              {
                title: 'Authentication',
                href: '/en/token-requestor/integration/authentication',
              },
              {
                title: 'Reason codes',
                href: '/en/token-requestor/integration/reason-codes',
              },
              {
                title: 'Notifications',
                href: '/en/token-requestor/integration/notifications',
              },
              {
                title: 'Test your integration',
                href: '/en/token-requestor/integration/testing',
              },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'token-requestor/api',
        href: '/en/token-requestor/api',
        icon: DocumentCode,
        links: [
          {
            title: 'Introduction',
            links: [{ title: 'Home', href: '/en/token-requestor/api' }],
          },
          {
            title: 'Token cycle management',
            links: [
              {
                title: 'Enroll card',
                href: '/en/token-requestor/api/enroll-card',
              },
              {
                title: 'Get cryptogram',
                href: '/en/token-requestor/api/checkout'
              },
              {
                title: 'Get token status',
                href: '/en/token-requestor/api/get-token-status',
              },
              {
                title: 'Delete token',
                href: '/en/token-requestor/api/delete-token'
              },
            ],
          },
          {
            title: 'Management API',
            links: [
              {
                title: 'Credential management',
                href: '/en/token-requestor/api/admin/credentials',
              },
              {
                title: 'Sites management',
                href: '/en/token-requestor/api/admin/sites',
              },
              {
                title: 'Merchant management',
                href: '/en/token-requestor/api/admin/merchant',
              },
            ],
          },
        ],
      },
    ],
  },
  sdks: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'Documentación',
        identifier: 'sdks',
        href: '/sdks/pinpad',
        icon: Book,
        links: [
          { title: 'SDKs', links: [{ title: 'PinPad', href: '/sdks/pinpad' }] },
        ],
      },
      {
        title: 'API',
        identifier: 'sdks/api',
        href: '/sdks/pinpad/api',
        icon: DocumentCode,
        links: [
          { title: 'API SDKs', links: [{ title: 'PinPad', href: '/sdks/pinpad/api' }] }
        ],
      }
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'Documentation',
        identifier: 'sdks',
        href: '/en/sdks/pinpad',
        icon: Book,
        links: [
          {
            title: 'SDKs',
            links: [{ title: 'PinPad', href: '/en/sdks/pinpad' }],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'sdks/api',
        href: '/en/sdks/pinpad/api',
        icon: DocumentCode,
        links: [
          { title: 'API SDKs', links: [{ title: 'PinPad', href: '/en/sdks/pinpad/api' }] }
        ],
      }
    ],
  },
  acs: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'Documentación',
        identifier: 'acs',
        href: '/acs',
        icon: Book,
        links: [
          {
            title: 'ACS',
            links: [
              { title: 'Introducción', href: '/acs' },
              {
                title: '¿Qué es el Protocolo 3D-Secure?',
                href: '/acs/3-d-s-secure-protocol',
              },
              {
                title: '¿Cómo configurar ACS?',
                href: '/acs/a-c-s-general-configuration',
              },

              {
                title: 'Emisores en ACS',
                href: '/acs/issuer-configuration'
              },
              {
                title: 'Términos y definiciones',
                href: '/acs/terms-and-definitions',
              },
              {
                title: 'Tarjetas de prueba',
                href: '/acs/test-cards'
              },
              {
                title: 'Preguntas frecuentes sobre el funcionamiento ACS',
                href: '/acs/f-a-q',
              },
            ],
          },
        ],
      },
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'Documentation',
        identifier: 'acs',
        href: '/en/acs',
        icon: Book,
        links: [
          {
            title: 'ACS',
            links: [
              { title: 'Introduction', href: '/en/acs' },
              {
                title: 'What is the 3D-Secure protocol?',
                href: '/en/acs/3-d-s-secure-protocol',
              },
              {
                title: 'How to configure ACS?',
                href: '/en/acs/a-c-s-general-configuration',
              },
              {
                title: 'Issuers in ACS',
                href: '/en/acs/issuer-configuration'
              },
              {
                title: 'Terms and definitions',
                href: '/en/acs/terms-and-definitions',
              },
              {
                title: 'Test cards',
                href: '/en/acs/test-cards'
              },
              {
                title: 'FAQs about ACS functionality',
                href: '/en/acs/f-a-q'
              },
            ],
          },
        ],
      },
    ],
  },
  accountValidator: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'Documentación',
        identifier: 'account-validator',
        href: '/account-validator',
        icon: Book,
        links: [
          {
            title: 'Validador de cuentas',
            links: [
              { title: 'Introducción', href: '/account-validator' },
              { title: '¿Cómo funciona?', href: '/account-validator/how-to-work' },
              { title: 'Flujo del usuario', href: '/account-validator/user-flow' },
              { title: 'Micro depósitos', href: '/account-validator/micro-deposits' },
              { title: 'Soporte para Lightbox', href: '/account-validator/support' },
              { title: 'Webhook de Eventos', href: '/account-validator/webhooks' },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'account-validator/api',
        href: '/account-validator/api/environment-urls',
        icon: DocumentCode,
        links: [
          {
            title: 'API',
            links: [
              { title: 'Url de ambientes', href: '/account-validator/api/environment-urls' },
              { title: 'Sesión', href: '/account-validator/api/session' },
              { title: 'Validador de cuenta', href: '/account-validator/api/validate-existing-account' },
            ],
          },
        ],
      },
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'Documentation',
        identifier: 'account-validator',
        href: '/en/account-validator',
        icon: Book,
        links: [
          {
            title: 'Account Validator',
            links: [
              { title: 'Introduction', href: '/en/account-validator' },
              { title: 'How it works', href: '/en/account-validator/how-to-work' },
              { title: 'User flow', href: '/en/account-validator/user-flow' },
              { title: 'Micro deposits', href: '/en/account-validator/micro-deposits' },
              { title: 'Lightbox support', href: '/en/account-validator/support' },
              { title: 'Webhooks', href: '/en/account-validator/webhooks' },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'account-validator/api',
        href: '/en/account-validator/api/environment-urls',
        icon: DocumentCode,
        links: [
          {
            title: 'API',
            links: [
              { title: 'Environment URLs', href: '/en/account-validator/api/environment-urls' },
              { title: 'Session', href: '/en/account-validator/api/session' },
              { title: 'Account validator', href: '/en/account-validator/api/validate-existing-account' },
            ],
          },
        ],
      },
    ],
  },
  paymentLinks: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'Documentación',
        identifier: 'payment-links',
        href: '/payment-links',
        icon: Book,
        links: [
          {
            title: 'Links de pago',
            links: [
              { title: 'Introducción', href: '/payment-links' },
              {
                title: 'Cómo funciona',
                href: '/payment-links/how-payment-links-works',
              },
            ],
          },
          {
            title: 'Integración',
            links: [
              { title: 'Autenticación', href: '/payment-links/authentication' },
              { title: 'Notificación', href: '/payment-links/notification' },
              { title: 'Localización', href: '/payment-links/localization' },
              {
                title: 'Prueba tu integración',
                href: '/payment-links/test-your-integration',
              },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'payment-links/api',
        href: '/payment-links/api/reference/payment-links',
        icon: DocumentCode,
        links: [
          {
            title: 'API',
            links: [
              {
                title: 'Links de pago',
                href: '/payment-links/api/reference/payment-links',
              },
            ],
          },
        ],
      },
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'Documentation',
        identifier: 'payment-links',
        href: '/en/payment-links',
        icon: Book,
        links: [
          {
            title: 'Payment links',
            links: [
              { title: 'Introduction', href: '/en/payment-links' },
              {
                title: 'How does it work?',
                href: '/en/payment-links/how-payment-links-works',
              },
            ],
          },
          {
            title: 'Integration',
            links: [
              {
                title: 'Authentication',
                href: '/en/payment-links/authentication',
              },
              { title: 'Notification', href: '/en/payment-links/notification' },
              { title: 'Localization', href: '/en/payment-links/localization' },
              {
                title: 'Test your integration',
                href: '/en/payment-links/test-your-integration',
              },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'payment-links/api',
        href: '/en/payment-links/api/reference/payment-links',
        icon: DocumentCode,
        links: [
          {
            title: 'API',
            links: [
              {
                title: 'Payment links',
                href: '/en/payment-links/api/reference/payment-links',
              },
            ],
          },
        ],
      },
    ],
  },
  microsites: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'Documentación',
        identifier: 'microsites',
        href: '/microsites',
        icon: Book,
        links: [
          {
            title: 'Micrositios',
            links: [
              { title: 'Introducción', href: '/microsites' },
            ],
          },
          {
            title: 'Integración',
            links: [
              { title: 'Autenticación', href: '/microsites/authentication' },
              {
                title: 'Prueba tu integración',
                href: '/microsites/test-your-integration',
              },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'microsites/api',
        href: '/microsites/api/reference/microsites',
        icon: DocumentCode,
        links: [
          {
            title: 'API',
            links: [
              {
                title: 'Microsites',
                href: '/microsites/api/reference/microsites',
              },
            ],
          }
        ],
      },
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'Documentation',
        identifier: 'microsites',
        href: '/en/microsites',
        icon: Book,
        links: [
          {
            title: 'Microsites',
            links: [
              { title: 'Introduction', href: '/en/microsites' },
            ],
          },
          {
            title: 'Integration',
            links: [
              { title: 'Authentication', href: '/en/microsites/authentication' },
              {
                title: 'Test your integration',
                href: '/en/microsites/test-your-integration',
              },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'microsites/api',
        href: '/en/microsites/api/reference/microsites',
        icon: DocumentCode,
        links: [
          {
            title: 'API',
            links: [
              {
                title: 'Microsites',
                href: '/en/microsites/api/reference/microsites',
              },
            ],
          }
        ],
      },
    ],
  },
    tpm: {
        [LANGUAGES_CODES.ES]: [
            {
                title: 'Documentación',
                identifier: 'tpm',
                href: '/tpm',
                icon: Book,
                links: [
                    {
                        title: 'Tokenización y cobros masivos',
                        links: [{ title: 'Introducción', href: '/tpm' }],
                    },
                    {
                        title: 'Integración',
                        links: [
                            { title: 'Tokenización', href: '/tpm/tokenization' },
                            {
                                title: 'Cobros Masivos',
                                href: '/tpm/massive-recurring',
                            },
                        ],
                    },
                ],
            },
        ],
        [LANGUAGES_CODES.EN]: [
            {
                title: 'Documentation',
                identifier: 'tpm',
                href: '/en/tpm',
                icon: Book,
                links: [
                    {
                        title: 'Tokenization and massive recurring',
                        links: [{ title: 'Introduction', href: '/en/tpm' }],
                    },
                    {
                        title: 'Integration',
                        links: [
                            { title: 'Tokenization', href: '/en/tpm/tokenization' },
                            {
                                title: 'Massive Recurring',
                                href: '/en/tpm/massive-recurring',
                            },
                        ],
                    },
                ],
            },
        ],
    },
  ticket: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'API',
        identifier: 'ticket',
        href: '/ticket/reference',
        icon: DocumentCode,
        links: [
          {
            title: 'API',
            links: [
              {
                title: 'URL de ambientes',
                href: '/ticket/reference',
              },
              {
                title: 'Buscar tiquetes',
                href: '/ticket/reference/search',
              },
              {
                title: 'Crear tiquete',
                href: '/ticket/reference/create',
              },
              {
                title: 'Remover tiquete',
                href: '/ticket/reference/remove',
              },
            ],
          },
        ],
      }
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'API',
        identifier: 'ticket',
        href: '/en/ticket/reference',
        icon: DocumentCode,
        links: [
          {
            title: 'API',
            links: [
              {
                title: 'Environment URLs',
                href: '/en/ticket/reference',
              },
              {
                title: 'Search tickets',
                href: '/en/ticket/reference/search',
              },
              {
                title: 'Create ticket',
                href: '/en/ticket/reference/create',
              },
              {
                title: 'Remove ticket',
                href: '/en/ticket/reference/remove',
              },
            ],
          },
        ],
      }
    ],
  },
  core: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'API',
        identifier: 'core',
        href: '/core',
        icon: DocumentCode,
        links: [
          {
            title: 'API',
            links: [
              {
                title: 'URL de ambientes',
                href: '/core',
              },
              {
                title: 'Acciones sobre comercios',
                href: '/core/reference/merchant'
              },
              {
                title: 'Acciones sobre lista de preferidos',
                href: '/core/reference/site/prefer-list'
              },
              {
                title: 'Acciones sobre medios de pago de sitios',
                href: '/core/reference/site/payment-methods'
              },
              {
                title: 'Acciones sobre métodos de pago',
                href: '/core/reference/merchant/payment-methods'
              },
              {
                title: 'Acciones sobre sitios',
                href: '/core/reference/site'
              },
              {
                title: 'Acciones sobre usuarios',
                href: '/core/reference/user'
              },
              {
                title: 'Acciones sobre planes',
                href: '/core/reference/plans'
              },
              {
                title: 'Procedimientos adicionales',
                href: '/core/reference/tools'
              },
              {
                title: 'Acciones sobre facturas',
                href: '/core/reference/invoice'
              },
              {
                title: 'Acciones sobre integraciones de comercios',
                href: '/core/reference/merchant/integrations'
              },
              {
                title: 'Acciones sobre integraciones de sitios',
                href: '/core/reference/site/integrations'
              },
            ]
          },
        ],
      },
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'API',
        identifier: 'core',
        href: '/en/core',
        icon: DocumentCode,
        links: [
          {
            title: 'API',
            links: [
              {
                title: 'Environment URLs',
                href: '/en/core',
              },
              {
                title: 'Actions on merchants',
                href: '/en/core/reference/merchant'
              },
              {
                title: 'Actions on preferred lists',
                href: '/en/core/reference/site/prefer-list'
              },
              {
                title: 'Actions on site payment methods',
                href: '/en/core/reference/site/payment-methods'
              },
              {
                title: 'Actions on payment methods',
                href: '/en/core/reference/merchant/payment-methods'
              },
              {
                title: 'Actions on sites',
                href: '/en/core/reference/site'
              },
              {
                title: 'Actions on users',
                href: '/en/core/reference/user'
              },
              {
                title: 'Actions on plans',
                href: '/en/core/reference/plans'
              },
              {
                title: 'Additional procedures',
                href: '/en/core/reference/tools'
              },
              {
                title: 'Actions on invoices',
                href: '/en/core/reference/invoice'
              },
              {
                title: 'Actions on merchant integrations',
                href: '/en/core/reference/merchant/integrations'
              },
              {
                title: 'Actions on site integrations',
                href: '/en/core/reference/site/integrations'
              },
            ]
          },
        ],
      }
    ]
  },
  apiScudo: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'Documentación',
        identifier: 'api-scudo',
        href: '/api-scudo',
        icon: Book,
        links: [
          {
            title: 'Api Scudo',
            links: [
              { title: 'Introducción', href: '/api-scudo' },
              {
                title: 'Secuencia de Scudo',
                href: '/api-scudo/sequence',
              },
              {
                title: 'Elementos de datos',
                href: '/api-scudo/elements',
              },
              {
                title: 'Firma',
                href: '/api-scudo/signature',
              },
              {
                title: 'Formato de montos',
                href: '/api-scudo/amounts-format',
              },
              {
                title: 'Tipos de documento',
                href: '/api-scudo/document-types',
              },
            ],

          },
          {
            title: 'Reglas',
            links: [
              { title: 'Kount', href: '/api-scudo/kount' }
            ]
          }
        ],
      },
      {
        title: 'API',
        identifier: '/api-scudo/api/reference',
        href: '/api-scudo/api/reference/environments',
        icon: DocumentCode,
        links: [
          {
            title: 'API',
            links: [
              { title: 'Directorio de ambientes', href: '/api-scudo/api/reference/environments' },
              { title: 'Validar transacción', href: '/api-scudo/api/reference/validate' },
              { title: 'Notificar transacción', href: '/api-scudo/api/reference/notify' },
              { title: 'Obtener validación', href: '/api-scudo/api/reference/validation' },
              { title: 'Busqueda de validaciones', href: '/api-scudo/api/reference/search' },
              {
                title: '[Webhook] Notificación de transacción resuelta',
                href: '/api-scudo/api/reference/notify-resolved-validation'
              },
            ],
          },
        ],
      },
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'Documentation',
        identifier: 'api-scudo',
        href: '/en/api-scudo',
        icon: Book,
        links: [
          {
            title: 'Api Scudo',
            links: [
              { title: 'Introduction', href: '/en/api-scudo' },
              { title: 'Scudo sequence', href: '/en/api-scudo/sequence' },
              { title: 'Data elements', href: '/en/api-scudo/elements' },
              { title: 'Signature', href: '/en/api-scudo/signature' },
              { title: 'Amounts format', href: '/en/api-scudo/amounts-format' },
              { title: 'Types of document', href: '/en/api-scudo/document-types', },
            ],
          },
          {
            title: 'Rules',
            links: [
              { title: 'Kount', href: '/en/api-scudo/kount' }
            ]
          }
        ],
      },
      {
        title: 'API',
        identifier: 'api-scudo/api/reference',
        href: '/en/api-scudo/api/reference/environments',
        icon: DocumentCode,
        links: [
          {
            title: 'API',
            links: [
              { title: 'Environments directory', href: '/en/api-scudo/api/reference/environments' },
              { title: 'Validate transaction', href: '/en/api-scudo/api/reference/validate' },
              { title: 'Notify transaction', href: '/en/api-scudo/api/reference/notify' },
              { title: 'Get validation', href: '/en/api-scudo/api/reference/validation' },
              { title: 'Search for validations', href: '/en/api-scudo/api/reference/search' },
              {
                title: '[Webhook] Notification of transaction resolved',
                href: '/en/api-scudo/api/reference/notify-resolved-validation'
              },
            ],
          },
        ],
      },
    ],
  },
  autopay: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'Documentación',
        identifier: 'autopay',
        href: '/autopay',
        icon: Book,
        links: [
          {
            title: 'Autopay',
            links: [
              { title: 'Introducción', href: '/autopay' },
              { title: 'Cómo funciona', href: '/autopay/how-autopay-works' },
            ],
          },
          {
            title: 'Integración',
            links: [
              { title: 'Autenticación API', href: '/autopay/authentication' },
              { title: 'Autenticación de contratos', href: '/autopay/contract-authentication' },
              { title: 'Configuración de recurrencia', href: '/autopay/recurring-setup' },
              { title: 'Códigos de respuesta', href: '/autopay/codes' },
              { title: 'Reintentos', href: '/autopay/retries'},
              { title: 'Tipos de cobro', href: '/autopay/charge-types'},
              { title: 'Estados', href: '/autopay/status'},
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: '/autopay/api',
        href: '/autopay/api',
        icon: DocumentCode,
        links: [
          {
            title: 'General',
            links: [
              { title: 'Introducción', href: '/autopay/api' },
            ]
          },
          {
            title: 'API',
            links: [
              { title: 'Crear o actualizar sesión de AutoPago', href: '/autopay/api/session' },
              { title: 'Consultar sesión de AutoPago', href: '/autopay/api/query' },
              { title: 'Cancelar AutoPago', href: '/autopay/api/cancel' },
              { title: 'Consulta de AutoPagos', href: '/autopay/api/search' },
              { title: 'Transacciones de AutoPago', href: '/autopay/api/transactions' },
            ],
          },
        ],
      },
      {
        title: 'Contratos',
        identifier: '/autopay/contracts',
        href: '/autopay/contracts',
        icon: DocumentCode,
        links: [
          {
            title: 'Documentos',
            links: [
              { title: 'Introducción', href: '/autopay/contracts' },
            ],
          },
          {
            title: 'Servicios',
            links: [
              { title: 'Consultar monto a cobrar', href: '/autopay/contracts/balance' },
              { title: 'Confirmar / Asentar pago', href: '/autopay/contracts/settlement' },
              { title: 'Notificaciones (Webhook)', href: '/autopay/contracts/webhook' },
            ],
          },
        ],
      },
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'Documentation',
        identifier: 'autopay',
        href: '/en/autopay',
        icon: Book,
        links: [
          {
            title: 'Autopay',
            links: [
              { title: 'Introduction', href: '/en/autopay' },
              { title: 'How it works', href: '/en/autopay/how-autopay-works' },
            ],
          },
          {
            title: 'Integration',
            links: [
              { title: 'API Authentication', href: '/en/autopay/authentication' },
              { title: 'Contract authentication', href: '/en/autopay/contract-authentication' },
              { title: 'Recurring setup', href: '/en/autopay/recurring-setup' },
              { title: 'Response codes', href: '/en/autopay/codes' },
              { title: 'Retries', href: '/en/autopay/retries'},
              { title: 'Charge Types', href: '/en/autopay/charge-types' },
              { title: 'States', href: '/en/autopay/status'},
            ],
          }
        ],
      },
      {
        title: 'API',
        identifier: '/autopay/api',
        href: '/en/autopay/api',
        icon: DocumentCode,
        links: [
          {
            title: 'General',
            links: [
              { title: 'Introduction', href: '/en/autopay/api' },
            ]
          },
          {
            title: 'API',
            links: [
              { title: 'Create or update an AutoPay session', href: '/en/autopay/api/session' },
              { title: 'Query an AutoPay session', href: '/en/autopay/api/query' },
              { title: 'Cancel AutoPay', href: '/en/autopay/api/cancel' },
              { title: 'AutoPay search', href: '/en/autopay/api/search' },
              { title: 'AutoPay transactions', href: '/en/autopay/api/transactions' },
            ],
          },
        ],
      },
      {
        title: 'Contracts',
        identifier: '/autopay/contracts',
        href: '/en/autopay/contracts',
        icon: DocumentCode,
        links: [
          {
            title: 'Documents',
            links: [
              { title: 'Introduction', href: '/en/autopay/contracts' },
            ],
          },
          {
            title: 'Services',
            links: [
              { title: 'Query amount to charge', href: '/en/autopay/contracts/balance' },
              { title: 'Settle / Confirm payment', href: '/en/autopay/contracts/settlement' },
              { title: 'Notifications (Webhook)', href: '/en/autopay/contracts/webhook' },
            ],
          },
        ],
      },
    ],
  },
  selfdeclarations: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'Documentación',
        identifier: 'selfdeclarations',
        href: '/selfdeclarations',
        icon: Book,
        links: [
          {
            title: 'Autodeclaraciones',
            links: [
              { title: 'Introducción', href: '/selfdeclarations' },
            ],
          },
          {
            title: 'Manual de usuario',
            links: [
              { title: 'Contenido', href: '/selfdeclarations/content' },
              {
                title: 'General',
                links: [
                  { title: 'Filtros', href: '/selfdeclarations/general/filters' },
                  {
                    title: 'Solución a posibles problemas',
                    href: '/selfdeclarations/general/problem-solutions'
                  },
                  { title: 'Idioma', href: '/selfdeclarations/general/language' },
                  {
                    title: 'Medidas de seguridad y contingencia',
                    href: '/selfdeclarations/general/security-and-contingency'
                  },
                  {
                    title: 'Gestión del servicio y mesa de ayuda',
                    href: '/selfdeclarations/general/service-management-and-help-desk'
                  },
                ],
              },
              {
                title: 'Usuario administrador',
                links: [
                  { title: 'Acciones', href: '/selfdeclarations/admin-user/actions' },
                  {
                    title: 'Entrada y salida del software',
                    href: '/selfdeclarations/admin-user/entry-and-exit'
                  },
                ],
              },
              {
                title: 'Usuario declarante',
                links: [
                  { title: 'Acciones', href: '/selfdeclarations/declarant-user/actions' },
                  {
                    title: 'Entrada y salida del software',
                    href: '/selfdeclarations/declarant-user/entry-and-exit'
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'selfdeclarations/api',
        href: '/selfdeclarations/api',
        icon: DocumentCode,
        links: [
          {
            title: 'Introducción',
            links: [{ title: 'Inicio', href: '/selfdeclarations/api' }],
          },
          {
            title: 'API',
            links: [
              { title: 'Botón de pago - AIO', href: '/selfdeclarations/api/payment-button-AIO' },
              { title: 'Solicitud de información', href: '/selfdeclarations/api/information-request' },
              { title: 'PDF de ingresos', href: '/selfdeclarations/api/income-pdf' },
              { title: 'Empresas - Creación/Actualización', href: '/selfdeclarations/api/companies' },
              { title: 'Usuarios - Creación/Actualización', href: '/selfdeclarations/api/company-bidders' },
            ],
          },
        ],
      },
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'Documentation',
        identifier: 'selfdeclarations',
        href: '/en/selfdeclarations',
        icon: Book,
        links: [
          {
            title: 'Selfdeclarations',
            links: [
              { title: 'Introduction', href: '/en/selfdeclarations' },
            ],
          },
          {
            title: 'User manual',
            links: [
              { title: 'Content', href: '/en/selfdeclarations/content' },
              {
                title: 'General',
                links: [
                  { title: 'Filters', href: '/en/selfdeclarations/general/filters' },
                  {
                    title: 'Solutions to possible problems',
                    href: '/en/selfdeclarations/general/problem-solutions'
                  },
                  { title: 'Language', href: '/en/selfdeclarations/general/language' },
                  {
                    title: 'Security and contingency measures',
                    href: '/en/selfdeclarations/general/security-and-contingency'
                  },
                  {
                    title: 'Service management and help desk',
                    href: '/en/selfdeclarations/general/service-management-and-help-desk'
                  },
                ],
              },
              {
                title: 'Admin user',
                links: [
                  { title: 'Actions', href: '/en/selfdeclarations/admin-user/actions' },
                  {
                    title: 'Logging in and out of the software',
                    href: '/en/selfdeclarations/admin-user/entry-and-exit'
                  },
                ],
              },
              {
                title: 'Declaring user',
                links: [
                  { title: 'Actions', href: '/en/selfdeclarations/declarant-user/actions' },
                  {
                    title: 'Logging in and out of the software',
                    href: '/en/selfdeclarations/declarant-user/entry-and-exit'
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'selfdeclarations/api',
        href: '/en/selfdeclarations/api',
        icon: DocumentCode,
        links: [
          {
            title: 'Introduction',
            links: [{ title: 'Home', href: '/en/selfdeclarations/api' }],
          },
          {
            title: 'API',
            links: [
              { title: 'Payment Button - AIO', href: '/en/selfdeclarations/api/payment-button-AIO' },
              { title: 'Information Request', href: '/en/selfdeclarations/api/information-request' },
              { title: 'Income PDF', href: '/en/selfdeclarations/api/income-pdf' },
              { title: 'Companies - Create/Update', href: '/en/selfdeclarations/api/companies' },
              { title: 'Users - Create/Update', href: '/en/selfdeclarations/api/company-bidders' },
            ],
          },
        ],
      },
    ],
  },
  invoices: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'Documentación',
        identifier: 'invoices',
        href: '/invoices',
        icon: Book,
        links: [
          {
            title: 'Ordenes de pago',
            links: [
              {
                title: 'Introducción',
                href: '/invoices'
              },
            ],
          },
          {
            title: 'Integración',
            links: [
              {
                title: 'Autenticación',
                href: '/invoices/integration/authentication',
              },
              {
                title: 'Estados de las ordenes de pago',
                href: '/invoices/integration/status',
              },
              {
                title: 'Definiciones',
                href: '/invoices/integration/definitions',
              },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'invoices/api',
        href: '/invoices/api',
        icon: DocumentCode,
        links: [
          {
            title: 'Introducción',
            links: [
              {
                title: 'Inicio',
                href: '/invoices/api'
              }
            ],
          },
          {
            title: 'Gestión de ordenes de pago',
            links: [
              {
                title: 'Creación',
                href: '/invoices/api/create',
              },
              {
                title: 'Eliminación',
                href: '/invoices/api/remove'
              },
              {
                title: 'Eliminación masiva',
                href: '/invoices/api/flush'
              },
              {
                title: 'Bloqueo o liberación',
                href: '/invoices/api/hold',
              },
              {
                title: 'Búsqueda',
                href: '/invoices/api/search'
              },
            ],
          },
        ],
      },
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'Documentation',
        identifier: 'invoices',
        href: '/en/invoices',
        icon: Book,
        links: [
          {
            title: 'Payment orders',
            links: [
              {
                title: 'Introduction',
                href: '/en/invoices'
              },
            ],
          },
          {
            title: 'Integration',
            links: [
              {
                title: 'Authentication',
                href: '/en/invoices/integration/authentication',
              },
              {
                title: 'Payment order status',
                href: '/en/invoices/integration/status',
              },
              {
                title: 'Definitions',
                href: '/en/invoices/integration/definitions',
              },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'invoices/api',
        href: '/en/invoices/api',
        icon: DocumentCode,
        links: [
          {
            title: 'Introduction',
            links: [
              {
                title: 'Home',
                href: '/en/invoices/api'
              }
            ],
          },
          {
            title: 'Payment order management',
            links: [
              {
                title: 'Creation',
                href: '/en/invoices/api/create',
              },
              {
                title: 'Deletion',
                href: '/en/invoices/api/remove'
              },
              {
                title: 'Bulk deletion',
                href: '/en/invoices/api/flush'
              },
              {
                title: 'Hold or release',
                href: '/en/invoices/api/hold',
              },
              {
                title: 'Search',
                href: '/en/invoices/api/search'
              },
            ],
          },
        ],
      },
    ],
  },
  onboarding: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'Documentación',
        identifier: 'onboarding',
        href: '/onboarding',
        icon: Book,
        links: [
          {
            title: 'Onboarding',
            links: [
              { title: 'Introducción', href: '/onboarding' },
              { title: 'Cómo funciona', href: '/onboarding/how-onboarding-works' },
              { title: 'Primeros pasos', href: '/onboarding/quickstart' },
            ],
          },
          {
            title: 'Integración',
            links: [
              { title: 'Autenticación', href: '/onboarding/authentication' },
              { title: 'Idempotencia', href: '/onboarding/idempotency' },
              { title: 'Crear un comercio', href: '/onboarding/create-merchant' },
              { title: 'Consultar el proceso', href: '/onboarding/process-status' },
              { title: 'Notificación', href: '/onboarding/notification' },
              { title: 'Actualizar un comercio', href: '/onboarding/update-merchant' },
              { title: 'Errores', href: '/onboarding/errors' },
            ],
          },
          {
            title: 'Datos del comercio',
            links: [
              { title: 'Datos del comercio', href: '/onboarding/merchant-data' },
              { title: 'Integraciones', href: '/onboarding/integrations' },
              { title: 'Medios de pago', href: '/onboarding/payment-methods' },
            ],
          },
          {
            title: 'Sitios',
            links: [
              { title: 'Sitios', href: '/onboarding/sites' },
              { title: 'Integraciones del sitio', href: '/onboarding/site-integrations' },
              { title: 'Medios de pago del sitio', href: '/onboarding/site-payment-methods' },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'onboarding/api',
        href: '/onboarding/api/reference/merchants',
        icon: DocumentCode,
        links: [
          {
            title: 'Introducción',
            links: [
              { title: 'Historial de cambios', href: '/onboarding/api/changelog' },
            ],
          },
          {
            title: 'API',
            links: [
              { title: 'Comercios', href: '/onboarding/api/reference/merchants' },
              { title: 'Procesos', href: '/onboarding/api/reference/processes' },
              { title: 'Consumidor', href: '/onboarding/api/reference/user' },
            ],
          },
        ],
      },
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'Documentation',
        identifier: 'onboarding',
        href: '/en/onboarding',
        icon: Book,
        links: [
          {
            title: 'Onboarding',
            links: [
              { title: 'Introduction', href: '/en/onboarding' },
              { title: 'How it works', href: '/en/onboarding/how-onboarding-works' },
              { title: 'Quickstart', href: '/en/onboarding/quickstart' },
            ],
          },
          {
            title: 'Integration',
            links: [
              { title: 'Authentication', href: '/en/onboarding/authentication' },
              { title: 'Idempotency', href: '/en/onboarding/idempotency' },
              { title: 'Create a merchant', href: '/en/onboarding/create-merchant' },
              { title: 'Check the process', href: '/en/onboarding/process-status' },
              { title: 'Notification', href: '/en/onboarding/notification' },
              { title: 'Update a merchant', href: '/en/onboarding/update-merchant' },
              { title: 'Errors', href: '/en/onboarding/errors' },
            ],
          },
          {
            title: 'Merchant data',
            links: [
              { title: 'Merchant data', href: '/en/onboarding/merchant-data' },
              { title: 'Integrations', href: '/en/onboarding/integrations' },
              { title: 'Payment methods', href: '/en/onboarding/payment-methods' },
            ],
          },
          {
            title: 'Sites',
            links: [
              { title: 'Sites', href: '/en/onboarding/sites' },
              { title: 'Site integrations', href: '/en/onboarding/site-integrations' },
              { title: 'Site payment methods', href: '/en/onboarding/site-payment-methods' },
            ],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'onboarding/api',
        href: '/en/onboarding/api/reference/merchants',
        icon: DocumentCode,
        links: [
          {
            title: 'Introduction',
            links: [
              { title: 'Changelog', href: '/en/onboarding/api/changelog' },
            ],
          },
          {
            title: 'API',
            links: [
              { title: 'Merchants', href: '/en/onboarding/api/reference/merchants' },
              { title: 'Processes', href: '/en/onboarding/api/reference/processes' },
              { title: 'Consumer', href: '/en/onboarding/api/reference/user' },
            ],
          },
        ],
      },
    ],
  },
}
