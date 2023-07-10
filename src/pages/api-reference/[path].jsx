import Head from 'next/head'
import SwaggerParser from '@apidevtools/swagger-parser'
import path from 'path'
import SessionPage from '@/contents/session.mdx'
import PaymentPage from '@/contents/payment.mdx'
import TokenPage from '@/contents/token.mdx'

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
      title: 'Sesión',
    },
  },
  {
    path: 'payment',
    component: PaymentPage,
    endpoints: ['/api/reverse', '/api/transaction'],
    props: {
      title: 'Pagos',
    },
  },
  {
    path: 'token',
    component: TokenPage,
    endpoints: ['/api/collect', '/api/instrument/invalidate'],
    props: {
      title: 'Token',
    },
  }
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
