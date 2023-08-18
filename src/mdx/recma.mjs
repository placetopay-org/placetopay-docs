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

function recmaAddLayoutProperty() {
  return (tree) => {
    if (
      !tree.body.some(
        (node) =>
          node.type === 'VariableDeclaration' &&
          node.declarations[0].id.name === 'Layout'
      )
    ) {
      return
    }

    tree.body.push({
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'MemberExpression',
          computed: false,
          object: {
            type: 'Identifier',
            name: 'MDXContent',
          },
          property: {
            type: 'Identifier',
            name: 'Layout',
          },
        },
        right: {
          type: 'Identifier',
          name: 'Layout',
        },
      }
    })
  }
}

const recmaAddLocalizeHook = () => {
  return (tree) => {
    tree.body.splice(2, 0, {
      type: 'ImportDeclaration',
      specifiers: [
        {
          type: 'ImportSpecifier',
          local: {
            type: 'Identifier',
            name: 'useLocalizePath',
          },
          imported: {
            type: 'Identifier',
            name: 'useLocalizePath',
          },
        },
      ],
      source: {
        type: 'Literal',
        value: '@/hooks/useLocalizePath',
        raw: "'@/hooks/useLocalizePath'",
      },
    })

    const getCreateMdxContentIndex = tree.body.findIndex(
      (node) => node.type === 'FunctionDeclaration' && node.id.name === '_createMdxContent'
    )

    tree.body[getCreateMdxContentIndex].body.body.splice(0, 0, {
      type: 'VariableDeclaration',
      kind: 'const',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'localizePath',
          },
          init: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'useLocalizePath',
            },
            arguments: [],
            optional: false
          },
        },
      ],
    })
  }
}

export const recmaPlugins = [
  mdxAnnotations.recma,
  recmaRemoveNamedExports,
  recmaNextjsStaticProps,
  recmaAddOpenapiRefsToStaticProps,
  recmaAddLayoutProperty,
  recmaAddLocalizeHook,
]
