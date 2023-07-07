# Notificacion

Una notificación permite informar al comercio sobre el estado de las sesiones.

Configura en tu servidor una URL de notificación usando los puertos 80 o 443 y en caso de que la sesión se cancele o apruebe, reciba una notificación mediante POST.

```json json_schema
{
  "type": "object",
  "properties": {
    "requestID": {
      "type": "integer"
    },
    "reference": {
      "type": "string"
    },
    "signature": {
      "type": "string"
    }
  }
}
```

De manera asincrónica, una notificación del estado de la petición será enviada a una URL definida por configuración del comercio en PlacetoPay.

**Al recibir la notificación su sitio debe:**

**Identificar operación:**
Con el identificador de la sesión requestId y la referencia reference identifican la sesión notificada. Para esta sesión debe validar que el estado de la operación notificada están pendientes en su sistema.


**Validar autenticidad de la notificación:**
Puedes validar que se trate de una respuesta de PlacetoPay haciendo un SHA-1 con los datos requestId + status + date + secretKey.

**Validar que la transacción se encuentre sin resolver**

Si deseas obtener más información sobre la sesión debes usar el método **`getRequestInformation`**

```json
Bajo ninguna circunstancia reveles tu secretKey en ninguna parte accesible a los clientes o usuarios de su aplicación.
```

Luego de obtener el estado de la sesión, puede continuar con la regla de negocio de su sitio. (ejemplo: si la operación es aprobada, envía un correo electrónico al usuario).