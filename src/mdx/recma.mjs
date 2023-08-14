import { mdxAnnotations } from 'mdx-annotations'
import recmaNextjsStaticProps from 'recma-nextjs-static-props'
import esprima from 'esprima';
import SwaggerParser from '@apidevtools/swagger-parser'
import path from 'path'

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
    const filePath = path.join(process.cwd(), 'src', 'assets', 'apis', 'checkout', 'es.yaml')
    const api = await SwaggerParser.dereference(filePath);
    let apiRefs = null;

    tree.body = tree.body.map((node) => {
      if (node.type === "VariableDeclaration" && node.declarations[0].id.name === 'apiRefs') {
        const refs = node.declarations[0].init.elements
        const apiRefsWithOpenapi = refs.reduce((acc, apiRef) => {
          const apiRefValue = apiRef.value
          return { ...acc, [apiRefValue]: api.paths[apiRefValue] }
        }, {})

        const ast = esprima.parseModule(`(${JSON.stringify(apiRefsWithOpenapi)})`, {
          range: false,
          loc: false,
        });
        apiRefs = ast.body[0].expression;
      }
      
      if (node.type === 'ExportNamedDeclaration' && node.declaration.declarations[0].id.name === 'getStaticProps' && apiRefs !== null) {
        node.declaration.declarations[0].init.body.properties[0].value.arguments[0].arguments[0].properties = [
          ...node.declaration.declarations[0].init.body.properties[0].value.arguments[0].arguments[0].properties,
          {
            type: 'Property',
            method: false,
            shorthand: false,
            computed: false,
            kind: 'init',
            key: { type: 'Identifier', name: 'refs' },
            value: apiRefs,
          }
        ]
      }

      return node
    })
  }
}

export const recmaPlugins = [
  mdxAnnotations.recma,
  recmaRemoveNamedExports,
  recmaNextjsStaticProps,
  recmaAddOpenapiRefsToStaticProps,
]
