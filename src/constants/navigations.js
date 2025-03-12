import { LANGUAGES_CODES } from '@/components/LocaleProvider'
import { Book, MonitorMobbile, Activity, SecurityCard, Link, Calendar, ShieldTick, DocumentCode } from 'iconsax-react'

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
      title: 'Token Requestor',
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
      title: 'Account Validator',
      description: 'Verificación de cuentas',
      href: '/account-validator',
      icon: SecurityCard,
    },
    {
      title: 'Api Scudo',
      description: 'Control de fraude',
      href: '/api-scudo',
      icon: ShieldTick,
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
      title: 'Account Validator',
      description: 'Account verification',
      href: '/account-validator',
      icon: SecurityCard,
    },
    {
      title: 'Api Scudo',
      description: 'Fraud control',
      href: '/en/api-scudo',
      icon: ShieldTick,
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
  ticket: 'ticket',
  core: 'core',
  'account-validator': 'accountValidator',
  'api-scudo': 'apiScudo',
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
            title: 'Flujo de Pago en Web Checkout',
            links: [
              { title: 'Proceso de pago', href: '/payments/process-pay' },
            ],
          },
          {
            title: 'Medios de pago',
            links: [
              { title: 'ACH Débito Bancario', href: '/payments/ach-bank-debit' },
              { title: 'Click to Pay', href: '/payments/clicktopay' },
              { title: 'CeroPay', href: '/payments/ceropay' },
              { title: 'Pago en efectivo', href: '/payments/cash' },
            ],
          },
          {
            title: 'Gestión ante Redes Procesadoras',
            links: [
              { title: 'Introducción', href: '/payments/processing-network/introduction' },
              { title: 'Preguntas Frecuentes (FAQ)', href: '/payments/processing-network/frequent-questions' },
              {
                title: 'Procedimientos redes procesadoras', links: [
                  { title: 'Credibanco', href: '/payments/processing-network/credibanco' },
                  { title: 'Redeban', href: '/payments/processing-network/redeban' },
                  { title: 'Errores Comunes', href: '/payments/processing-network/errors' },
                ],
              },
            ],
          },
          
          {
            title: 'Integraciones',
            links: [
              { title: 'Modificadores de transacción', href: '/payments/integrations/transaction-modifiers' },
            ],
          },
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
              { title: 'Introduction', href: '/payments' },
            ],
          },

          {
            title: 'Payment Links',
            links: [
              { title: 'Introduction', href: '/payments/payments-links/introduction' },
              { title: 'Create Payment Link', href: '/payments/payments-links/create-payment-link' },
              { title: 'Manage Payment Links', href: '/payments/payments-links/link-management' }
            ],
          },
          {
            title: 'Microsites',
            links: [
              { title: 'Introduction', href: '/payments/introduction-to-microsites' },
              {
                title: 'Open Microsite',
                links: [
                  { title: 'Introduction', href: '/payments/microsite-open/introduction' },
                  { title: 'Field Structure', href: '/payments/microsite-open/fields' },
                ],
              },
              {
                title: 'Closed Microsite',
                links: [
                  { title: 'Introduction', href: '/payments/microsite-closed/introduction' },
                  { title: 'Order Upload', href: '/payments/microsite-closed/charge-invoice' },
                ],
              },
            ],
          },
          {
            title: 'Payment Flow in Web Checkout',
            links: [
              { title: 'Payment Process', href: '/payments/process-pay' },
            ],
          },
          {
            title: 'Payment methods',
            links: [
              { title: 'ACH Bank Debit', href: '/payments/ach-bank-debit' },
              { title: 'Click to Pay', href: '/payments/clicktopay' },
              { title: 'CeroPay', href: '/payments/ceropay' },
              { title: 'Cash payment', href: '/payments/cash' },
            ],
          },
          {
            title: 'Management with Processing Networks',
            links: [
              { title: 'Introduction', href: '/payments/processing-network/introduction' },
              { title: 'Frequently Asked Questions (FAQ)', href: '/payments/processing-network/frequent-questions' },
              {
                title: 'Processing network procedures', links: [
                  { title: 'Credibanco', href: '/payments/processing-network/credibanco' },
                  { title: 'Redeban', href: '/payments/processing-network/redeban' },
                  { title: 'Common Errors', href: '/payments/processing-network/errors' },
                ],
              },
            ],
          },
          {
            title: 'Integrations',
            links: [
              { title: 'Transaction Modifiers', href: '/payments/integrations/transaction-modifiers' },
            ],
          },
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
              { title: 'Gateway Information', href: '/checkout/api/reference/gateway-information' },
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
              { title: 'Refund', href: '/checkout/refund' },
              {
                title: 'Processor Fields',
                href: '/checkout/processor-fields',
              },
              {
                title: 'Expiration Date',
                href: '/checkout/expiration',
              },
              {
                title: 'Skip result',
                href: '/checkout/skip-result',
              },
              {
                title: 'Metadata',
                href: '/checkout/metadata',
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
              { title: 'Gateway Information', href: '/checkout/api/reference/gateway-information' },
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
              {
                title: 'Notification',
                href: '/gateway/notification',
              },
              {
                title: 'Additional data',
                href: '/gateway/additional-data',
              },
              {
                title: 'Forwarding',
                href: '/gateway/forwarding',
              },
              {
                title: 'Card return',
                href: '/gateway/card-return',
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
            links: [{ title: 'API Policy', href: '/gateway/api/policy' }],
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
                title: '¿Qué es el Protocolo 3-D Secure?',
                href: '/three-d-s-server/introduction',
              },
              {
                title: 'Dominios y Componentes',
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
                title: 'Términos y Definiciones',
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
                title: 'Tarjetas de Prueba',
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
                title: 'API Detalle de una transacción',
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
                title: 'API Comercios',
                href: '/three-d-s-server/api/merchants/create',
              },
              {
                title: 'API Sucursales',
                href: '/three-d-s-server/api/merchants/branch',
              },
              {
                title: 'Suscribir Modelos',
                href: '/three-d-s-server/api/merchants/enrolment',
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
                href: '/three-d-s-server'
              },
              {
                title: 'What is the 3-D Secure Protocol?',
                href: '/three-d-s-server/introduction',
              },
              {
                title: 'Domains and Components',
                href: '/three-d-s-server/secure-protocol',
              },
              {
                title: 'About the 3DS Server Component',
                href: '/three-d-s-server/server-component',
              },
              {
                title: 'Error Codes',
                href: '/three-d-s-server/error-codes'
              },
              {
                title: 'Frequently Asked Questions about 3DSS Functioning',
                href: '/three-d-s-server/faq',
              },
              {
                title: 'HTTP Codes in the Authentication Process',
                href: '/three-d-s-server/http-Codes',
              },
              {
                title: '3DS Server Service Flow',
                href: '/three-d-s-server/service-flow',
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
                href: '/three-d-s-server/api'
              },
              {
                title: 'Requirements for the client who is going to integrate',
                href: '/three-d-s-server/api/client-requirements',
              },
              {
                title: 'Terms and Definitions',
                href: '/three-d-s-server/api/terms-and-definitions',
              },
              {
                title: 'Authentication process data',
                href: '/three-d-s-server/api/transaction-status',
              },
            ],
          },

          {
            title: 'Integration',
            links: [
              {
                title: 'Authentication',
                href: '/three-d-s-server/api/integration/authorization',
              },
              {
                title: 'Test Cards',
                href: '/three-d-s-server/api/integration/test-cards'
              },
            ],
          },

          {
            title: 'Use cases',
            links: [
              {
                title: 'Session',
                href: '/three-d-s-server/api/integration/session',
              },
              {
                title: 'Session with 3RI',
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
            title: 'Sessions',
            links: [
              {
                title: 'Rules',
                href: '/three-d-s-server/api/sessions/rules',
              },
              {
                title: 'API Sessions',
                href: '/three-d-s-server/api/sessions'
              },
              {
                title: 'Additional data',
                href: '/three-d-s-server/api/sessions/detail-info',
              },
            ],
          },
          {
            title: 'Transactions',
            links: [
              {
                title: 'Transaction show',
                href: '/three-d-s-server/api/transactions',
              },
              {
                title: 'Values returned in the response',
                href: '/three-d-s-server/api/transactions/values',
              },
              {
                title: 'Get authentication information',
                href: '/three-d-s-server/api/transactions/authentication-info',
              },
            ],
          },
          {
            title: 'Merchants',
            links: [
              {
                title: 'Merchants API',
                href: '/three-d-s-server/api/merchants/create',
              },
              {
                title: 'Branches API',
                href: '/three-d-s-server/api/merchants/branch',
              },
              {
                title: 'Enrolment model',
                href: '/three-d-s-server/api/merchants/enrolment',
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
            title: 'Token requestor',
            links: [
              { title: 'Introducción', href: '/token-requestor' },
              {
                title: 'Tipos de identificación',
                href: '/token-requestor/business-identification-types',
              },
              {
                title: 'Codigos de respuesta',
                href: '/token-requestor/response-codes',
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
            title: 'Registro de comerciante',
            links: [
              {
                title: 'Onboarding',
                href: '/token-requestor/api/onboarding'
              },
              {
                title: 'Onboarding status',
                href: '/token-requestor/api/onboarding-status',
              },
              {
                title: 'Get Merchant Subscriptions',
                href: '/token-requestor/api/get-merchant-subscriptions'
              },
              {
                title: 'Generate new authentication token',
                href: '/token-requestor/api/generate-new-authentication-token',
              },
              {
                title: 'Delete authentication tokens',
                href: '/token-requestor/api/delete-authentication-tokens',
              },
            ],
          },
          {
            title: 'Administracion del ciclo del token',
            links: [
              {
                title: 'Enroll card',
                href: '/token-requestor/api/enroll-card',
              },
              { title: 'Checkout', href: '/token-requestor/api/checkout' },
              {
                title: 'Get token status',
                href: '/token-requestor/api/get-token-status',
              },
              {
                title: 'Get Keys',
                href: '/token-requestor/api/keys'
              },
            ],
          },
        ],
      },
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'Documentación',
        identifier: 'token-requestor',
        href: '/en/token-requestor',
        icon: Book,
        links: [
          {
            title: 'Token requestor',
            links: [
              { title: 'Introduction', href: '/token-requestor' },
              {
                title: 'Merchant Identification Types',
                href: '/token-requestor/business-identification-types',
              },
              {
                title: 'Response Codes',
                href: '/token-requestor/response-codes',
              },
            ],
          },
          {
            title: 'Integration',
            links: [
              {
                title: 'Authentication',
                href: '/token-requestor/integration/authentication',
              },
              {
                title: 'Notifications',
                href: '/token-requestor/integration/notifications',
              },
              {
                title: 'Test Your Integration',
                href: '/token-requestor/integration/testing',
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
            links: [{ title: 'Home', href: '/token-requestor/api' }],
          },
          {
            title: 'Merchant registration',
            links: [
              {
                title: 'Onboarding',
                href: '/token-requestor/api/onboarding'
              },
              {
                title: 'Onboarding status',
                href: '/token-requestor/api/onboarding-status',
              },
              {
                title: 'Get Merchant Subscriptions',
                href: '/token-requestor/api/get-merchant-subscriptions'
              },
              {
                title: 'Generate new authentication token',
                href: '/token-requestor/api/generate-new-authentication-token',
              },
              {
                title: 'Delete authentication tokens',
                href: '/token-requestor/api/delete-authentication-tokens',
              },
            ],
          },
          {
            title: 'Token cycle management',
            links: [
              {
                title: 'Enroll card',
                href: '/token-requestor/api/enroll-card',
              },
              {
                title: 'Checkout',
                href: '/token-requestor/api/checkout'
              },
              {
                title: 'Get token status',
                href: '/token-requestor/api/get-token-status',
              },
              {
                title: 'Get Keys',
                href: '/token-requestor/api/keys'
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
        href: '/sdks/pinpad',
        icon: Book,
        links: [
          {
            title: 'SDKs',
            links: [{ title: 'PinPad', href: '/sdks/pinpad' }],
          },
        ],
      },
      {
        title: 'API',
        identifier: 'sdks/api',
        href: '/en/sdks/pinpad/api',
        icon: DocumentCode,
        links: [
          { title: 'API SDKs', links: [{ title: 'PinPad', href: '/sdks/pinpad/api' }] }
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
                title: '¿Qué es el Protocolo 3-D Secure?',
                href: '/acs/3-d-s-secure-protocol',
              },
              {
                title: '¿Cómo configurar ACS?',
                href: '/acs/a-c-s-general-configuration',
              },
              { title: 'Gestión de cuenta', href: '/acs/account' },
              { title: 'Motor de Control de Fraude', href: '/acs/antifraud' },
              {
                title: 'Estados del proceso de autenticación',
                href: '/acs/authentication-status',
              },
              { title: 'Autenticaciones', href: '/acs/authentications' },
              {
                title: 'Suscripción por marcas',
                href: '/acs/brands-subscriptions',
              },
              { title: 'Rangos de tarjetas', href: '/acs/card-ranges' },
              {
                title: 'Certificados',
                href: '/acs/certificates-configurations',
              },
              { title: 'Configuraciones', href: '/acs/configuration-fields' },
              { title: 'Países en ACS', href: '/acs/countries-configurations' },
              {
                title: 'Monedas utilizadas en ACS',
                href: '/acs/currencies-configurations',
              },
              {
                title: 'Autenticaciones Desacopladas',
                href: '/acs/decoupled-authentications',
              },
              { title: 'Disputas', href: '/acs/disputes' },
              { title: 'Códigos de error', href: '/acs/error-codes' },
              {
                title: 'Preguntas frecuentes sobre el funcionamiento ACS',
                href: '/acs/f-a-q',
              },
              {
                title: 'Campos de configuración',
                href: '/acs/fields-configurations',
              },
              { title: 'Marcas en ACS', href: '/acs/franchise-creation' },
              {
                title: 'Códigos HTTP en el proceso de autenticación',
                href: '/acs/http-codes',
              },
              { title: 'Importes', href: '/acs/imports-configurations' },
              { title: 'Invitaciones de usuarios', href: '/acs/invitations' },
              { title: 'Emisores en ACS', href: '/acs/issuer-configuration' },
              { title: 'Servicios del emisor', href: '/acs/issuer-services' },
              {
                title: 'Gestión de idioma',
                href: '/acs/language-configurations',
              },
              { title: 'Logs de Seguridad', href: '/acs/logs' },
              {
                title: 'Códigos de categoría del comercio',
                href: '/acs/merchant-codes-configurations',
              },
              { title: 'Métricas', href: '/acs/metrics' },
              { title: 'Perfiles', href: '/acs/profiles' },
              { title: 'Reportes', href: '/acs/reports' },
              { title: 'Roles', href: '/acs/roles' },
              { title: 'Alertas del servicio', href: '/acs/service-alerts' },
              {
                title: 'Términos y Definiciones',
                href: '/acs/terms-and-definitions',
              },
              { title: 'Tarjetas de Prueba', href: '/acs/test-cards' },
              { title: 'Usuarios', href: '/acs/users' },
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
        icon: 'Book',
        links: [
          {
            title: 'ACS',
            links: [
              { title: 'Introduction', href: '/acs' },
              {
                title: 'What is the 3-D Secure Protocol?',
                href: '/acs/3-d-s-secure-protocol',
              },
              {
                title: 'How to configure ACS?',
                href: '/acs/a-c-s-general-configuration',
              },
              { title: 'Account Management', href: '/acs/account' },
              { title: 'Fraud Control Engine', href: '/acs/antifraud' },
              {
                title: 'Authentication Process Status',
                href: '/acs/authentication-status',
              },
              { title: 'Authentications', href: '/acs/authentications' },
              {
                title: 'Brand Subscriptions',
                href: '/acs/brands-subscriptions',
              },
              { title: 'Card Ranges', href: '/acs/card-ranges' },
              {
                title: 'Certificates',
                href: '/acs/certificates-configurations',
              },
              { title: 'Configurations', href: '/acs/configuration-fields' },
              {
                title: 'Countries in ACS',
                href: '/acs/countries-configurations',
              },
              {
                title: 'Currencies Used in ACS',
                href: '/acs/currencies-configurations',
              },
              {
                title: 'Decoupled Authentications',
                href: '/acs/decoupled-authentications',
              },
              { title: 'Disputes', href: '/acs/disputes' },
              { title: 'Error Codes', href: '/acs/error-codes' },
              { title: 'FAQs about ACS Functionality', href: '/acs/f-a-q' },
              {
                title: 'Configuration Fields',
                href: '/acs/fields-configurations',
              },
              { title: 'Brands in ACS', href: '/acs/franchise-creation' },
              {
                title: 'HTTP Codes in the Authentication Process',
                href: '/acs/http-codes',
              },
              { title: 'Amounts', href: '/acs/imports-configurations' },
              { title: 'User Invitations', href: '/acs/invitations' },
              { title: 'Issuers in ACS', href: '/acs/issuer-configuration' },
              { title: 'Issuer Services', href: '/acs/issuer-services' },
              {
                title: 'Language Management',
                href: '/acs/language-configurations',
              },
              { title: 'Security Logs', href: '/acs/logs' },
              {
                title: 'Merchant Category Codes',
                href: '/acs/merchant-codes-configurations',
              },
              { title: 'Metrics', href: '/acs/metrics' },
              { title: 'Profiles', href: '/acs/profiles' },
              { title: 'Reports', href: '/acs/reports' },
              { title: 'Roles', href: '/acs/roles' },
              { title: 'Service Alerts', href: '/acs/service-alerts' },
              {
                title: 'Terms and Definitions',
                href: '/acs/terms-and-definitions',
              },
              { title: 'Test Cards', href: '/acs/test-cards' },
              { title: 'Users', href: '/acs/users' },
            ],
          },
        ],
      },
    ],
  },
  accountValidator: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'API',
        identifier: 'account-validator',
        href: '/account-validator/api',
        icon: DocumentCode,
        links: [
          {
            title: 'Documentación',
            links: [

              { title: 'Introducción', href: '/account-validator', },
              { title: '¿Cómo funciona?', href: '/account-validator/how-to-work' },
              { title: 'Flujo del usuario', href: '/account-validator/user-flow' },
              { title: 'Micro depósitos', href: '/account-validator/micro-deposits' },
              { title: 'Soporte para Lightbox', href: '/account-validator/support' },
              { title: 'Webhook de Eventos', href: '/account-validator/webhooks' }
            ]
          },
          {
            title: 'API',
            links: [
              { title: 'Url de ambientes', href: '/account-validator/api/environment-urls', },
              { title: 'Sesión', href: '/account-validator/api/session' },
              { title: 'Validador de cuenta', href: '/account-validator/api/validate-existing-account' },
            ],
          },
        ],
      },
    ],
    [LANGUAGES_CODES.EN]: [
      {
        title: 'API',
        identifier: 'account-validator',
        href: '/account-validator/api',
        icon: DocumentCode,
        links: [
          {
            title: 'Documentation',
            links: [

              { title: 'Introduction', href: '/account-validator', },
              { title: '¿How it works?', href: '/account-validator/how-to-work' },
              { title: 'User flow', href: '/account-validator/user-flow' },
              { title: 'Micro deposits', href: '/account-validator/micro-deposits' },
              { title: 'Lightbox Support', href: '/account-validator/support' },
              { title: 'Webhooks', href: '/account-validator/webhooks' }
            ]
          },
          {
            title: 'API',
            links: [
              { title: 'URL of environments', href: '/account-validator/api/environment-urls', },
              { title: 'Session', href: '/account-validator/api/session' },
              { title: 'Account validator', href: '/account-validator/api/validate-existing-account' },
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
                title: 'Cómo Funciona',
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
            title: 'Payment Links',
            links: [
              { title: 'Introduction', href: '/payment-links' },
              {
                title: 'How does it work?',
                href: '/payment-links/how-payment-links-works',
              },
            ],
          },
          {
            title: 'Integration',
            links: [
              {
                title: 'Authentication',
                href: '/payment-links/authentication',
              },
              { title: 'Notification', href: '/payment-links/notification' },
              { title: 'Localization', href: '/payment-links/localization' },
              {
                title: 'Test your integration',
                href: '/payment-links/test-your-integration',
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
                title: 'Links de pago',
                href: '/payment-links/api/reference/payment-links',
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
              { title: 'Introduction', href: '/microsites' },
            ],
          },
          {
            title: 'Integration',
            links: [
              { title: 'Authentication', href: '/microsites/authentication' },
              {
                title: 'Test your integration',
                href: '/microsites/test-your-integration',
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
                href: '/microsites/api/reference/microsites',
              },
            ],
          }
        ],
      },
    ],
  },
  ticket: {
    [LANGUAGES_CODES.ES]: [
      {
        title: 'API',
        identifier: 'ticket',
        href: '/ticket',
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
                title: 'Buscar tickets',
                href: '/ticket/reference/search',
              },
              {
                title: 'Crear ticket',
                href: '/ticket/reference/create',
              },
              {
                title: 'Remover ticket',
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
                href: '/ticket/reference',
              },
              {
                title: 'Search tickets',
                href: '/ticket/reference/search',
              },
              {
                title: 'Create ticket',
                href: '/ticket/reference/create',
              },
              {
                title: 'Remove ticket',
                href: '/ticket/reference/remove',
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
            ]
          },
        ],
      },
    ],
    [LANGUAGES_CODES.EN]: [
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
                title: 'Actions on Merchants',
                href: '/core/reference/merchant'
              },
              {
                title: 'Actions on Preferred Lists',
                href: '/core/reference/site/prefer-list'
              },
              {
                title: 'Actions on Site Payment Methods',
                href: '/core/reference/site/payment-methods'
              },
              {
                title: 'Actions on Payment Methods',
                href: '/core/reference/merchant/payment-methods'
              },
              {
                title: 'Actions on Sites',
                href: '/core/reference/site'
              },
              {
                title: 'Actions on Users',
                href: '/core/reference/user'
              },
              {
                title: 'Actions on Plans',
                href: '/core/reference/plans'
              },
              {
                title: 'Additional Procedures',
                href: '/core/reference/tools'
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
              { title: 'Busqueda de Validaciones', href: '/api-scudo/api/reference/search' },
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
              { title: 'Introduction', href: '/api-scudo' },
              { title: 'Scudo sequence', href: '/api-scudo/sequence' },
              { title: 'Data elements', href: '/api-scudo/elements' },
              { title: 'Signature', href: '/api-scudo/signature' },
              { title: 'Amounts format', href: '/api-scudo/amounts-format' },
              { title: 'Types of document', href: '/api-scudo/document-types', },
            ],
          },
          {
            title: 'Rules',
            links: [
              { title: 'Kount', href: '/api-scudo/kount' }
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
              { title: 'Environments directory', href: '/api-scudo/api/reference/environments' },
              { title: 'Validate transaction', href: '/api-scudo/api/reference/validate' },
              { title: 'Notify transaction', href: '/api-scudo/api/reference/notify' },
              { title: 'Get validation', href: '/api-scudo/api/reference/validation' },
              { title: 'Search for Validations', href: '/api-scudo/api/reference/search' },
              {
                title: '[Webhook] Notification of transaction resolved',
                href: '/api-scudo/api/reference/notify-resolved-validation'
              },
            ],
          },
        ],
      },
    ],
  },
}
