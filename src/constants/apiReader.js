/**
 * Diccionario de textos usado al interpretar definiciones OpenAPI.
 *
 * Es compartido entre `ApiReader` (web) y el generador de texto plano de
 * TF-2716 (versión para IA). Cualquier cambio en cómo se interpretan los
 * esquemas debe replicarse en ambos lados para que no diverjan.
 */
export const API_TITLES = {
  request: {
    es: 'Solicitud',
    en: 'Request',
  },
  response: {
    es: 'Respuesta',
    en: 'Response',
  },
  params: {
    es: {
      params: 'Parámetros',
      query: 'Parámetros de consulta',
      header: 'Cabecera',
    },
    en: {
      params: 'Params',
      query: 'Query params',
      header: 'Headers',
    },
  },
  propertyInformation: {
    es: {
      enum: 'Valores permitidos',
      default: 'Valor por defecto',
      example: 'Ejemplo',
      format: 'Formato',
      pattern: 'Patrón',
      maxLength: 'Longitud máxima',
      minLength: 'Longitud mínima',
      nullable: 'Nullable',
      yes: 'Sí',
      no: 'No',
    },
    en: {
      enum: 'Allowed values',
      default: 'Default value',
      example: 'Example',
      format: 'Format',
      pattern: 'Pattern',
      maxLength: 'Max length',
      minLength: 'Min length',
      nullable: 'Nullable',
      yes: 'Yes',
      no: 'No',
    },
  },
  deprecated: {
    es: 'Versión Obsoleta',
    en: 'Deprecated Version',
  },
  binaryResponse: {
    es: 'Esta operación devuelve un archivo en formato',
    en: 'This operation returns a file in',
  },
}
