export const DIRECTORY_ENVIRONMENTS = {
  checkout : [
       {
          country: "Global",
          environments: [
            {
              country : 'Global',
              mode : { es: 'Pruebas', en : 'Test'},
              url: 'https://checkout-test.placetopay.com'
            },
            {
              country : 'Global',
              mode : { es: 'Producción', en : 'Production'},
              url: 'https://checkout.placetopay.com'
            },
          ]
      },
      {
        country: "Ecuador",
        environments: [
          {
            country : 'Ecuador',
            mode : { es: 'Pruebas', en : 'Test'},
            url: 'https://checkout-test.placetopay.ec'
          },
          {
            country : 'Ecuador',
            mode : { es: 'Producción', en : 'Production'},
            url: 'https://checkout.placetopay.ec'
          },
        ]
      },
      {
        country: "Chile",
        environments: [
          {
            country : 'Chile',
            mode : { es: 'Pruebas', en : 'Test'},
            url: 'https://checkout.test.getnet.cl'
          },
          {
            country : 'Chile',
            mode : { es: 'Producción', en : 'Production'},
            url: 'https://checkout.getnet.cl'
          },
        ]
      }
    ]
}
