import SwaggerParser from '@apidevtools/swagger-parser'
import path from 'path'
import fs from 'fs'

const getLocale = (fileUrl) => {
  const possibleLocale = new URL(fileUrl).pathname.split('/src/pages/')[1].split('/')[0];
  return ['en'].includes(possibleLocale) ? possibleLocale : 'es';
}

const getRouteWithLocale = (fileUrl, assetPath = null) => {
  const locale = getLocale(fileUrl);
  const folder = assetPath ?? new URL(fileUrl).pathname.split(`/src/pages/${locale === 'es' ? '' : locale + '/'}`)[1].split('/')[0];
  return path.join(folder, `${locale}.yaml`)
}

export const dereferenceOpenapi = async (currentFileUrl, $refs, $assetPath = null) => {
  const fileName = getRouteWithLocale(currentFileUrl, $assetPath);
  const filePath = path.join(process.cwd(), 'src', 'assets', 'apis', fileName)

  if (!fs.existsSync(filePath)) {
    throw new Error(`File with OpenAPI structure ${filePath} does not exist`)
  }

  const api = await SwaggerParser.dereference(filePath);
  const apiRefsWithOpenapi = $refs.reduce((acc, apiRef) => {
    return { ...acc, [apiRef]: api.paths[apiRef] }
  }, {})

  return apiRefsWithOpenapi;
}