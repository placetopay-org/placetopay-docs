import SwaggerParser from '@apidevtools/swagger-parser'
import { useEffect } from 'react'



export function ApiReader() {
  useEffect(() => {
    ( async () => {
      const apiswagg = await SwaggerParser.parse('WebCheckout-ES.yaml')
      console.log(apiswagg)
    })()
  },[])
  
  return (<div>hello</div>)
}
