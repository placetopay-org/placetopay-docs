import { mdxAnnotations } from 'mdx-annotations'
import recmaNextjsStaticProps from 'recma-nextjs-static-props'

function recmaRemoveNamedExports() {
  return (tree) => {
    tree.body = tree.body.map((node) => {
      if (node.type === 'ExportNamedDeclaration') {
        return node.declaration
      }
      return node
    })
  }
}

function recmaAddOpenapiRefsToStaticProps() {
  return async (tree) => {
    if (
      !tree.body.some(
        (node) =>
          node.type === 'VariableDeclaration' &&
          node.declarations[0].id.name === 'apiRefs'
      )
    ) {
      return
    }

    tree.body.splice(1, 0, {
      type: 'ImportDeclaration',
      specifiers: [
        {
          type: 'ImportSpecifier',
          local: {
            type: 'Identifier',
            name: 'dereferenceOpenapi',
          },
          imported: {
            type: 'Identifier',
            name: 'dereferenceOpenapi',
          },
        },
      ],
      source: {
        type: 'Literal',
        value: '@/lib/dereferenceOpenapi',
        raw: "'@/lib/dereferenceOpenapi'",
      },
    })

    const getStaticPropsIndex = tree.body.findIndex(
      (node) =>
        node.type === 'ExportNamedDeclaration' &&
        node.declaration.declarations[0].id.name === 'getStaticProps'
    )
    tree.body[getStaticPropsIndex].declaration.declarations[0].init.async = true
    tree.body[
      getStaticPropsIndex
    ].declaration.declarations[0].init.body.properties[0].value.arguments[0].arguments[0].properties.push(
      {
        type: 'Property',
        method: false,
        shorthand: false,
        computed: false,
        kind: 'init',
        key: { type: 'Identifier', name: 'refs' },
        value: {
          type: 'AwaitExpression',
          argument: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'dereferenceOpenapi',
            },
            arguments: [
              {
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'MetaProperty',
                  meta: {
                    type: 'Identifier',
                    name: 'import',
                  },
                  property: {
                    type: 'Identifier',
                    name: 'meta',
                  },
                },
                property: {
                  type: 'Identifier',
                  name: 'url',
                },
              },
              {
                type: 'Identifier',
                name: 'apiRefs',
              },
            ],
          },
        },
      }
    )
  }
}

export const recmaPlugins = [
  mdxAnnotations.recma,
  recmaRemoveNamedExports,
  recmaNextjsStaticProps,
  recmaAddOpenapiRefsToStaticProps,
]
