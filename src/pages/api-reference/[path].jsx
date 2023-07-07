import Head from 'next/head'
import SwaggerParser from '@apidevtools/swagger-parser'
import path from 'path'
import SessionPage from '@/contents/session.mdx'

export default function Page({
  pageProps,
  api,
  params: { path: contentPath },
}) {
  const { component: Component } = paths.find((p) => p.path === contentPath)

  return (
    <>
      <Head>
        <title>{`${pageProps.title} - Placetopay Docs`}</title>
      </Head>
      <Component api={api} />
    </>
  )
}

const paths = [
  {
    path: 'session',
    component: SessionPage,
    endpoints: ['/api/session', '/api/session/{requestId}'],
    props: {
      title: 'Session',
    },
  },
]

export async function getStaticPaths() {
  return {
    paths: paths.map((p) => ({ params: { path: p.path } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  let api = {}
  const pageData = paths.find((p) => p.path === params.path)
  try {
    const filePath = path.join(process.cwd(), 'public', 'api-ES.yaml')
    api = await SwaggerParser.dereference(filePath)

    api = api.paths
      ? pageData.endpoints.reduce((acc, current) => {
          return { ...acc, [current]: api.paths[current] }
        }, {})
      : {}
  } catch (e) {
    console.log(e)
  }

  return {
    props: {
      api,
      params,
      pageProps: pageData.props,
    },
  }
}
