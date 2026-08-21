import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram"
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor"
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction"
import Line from "@/components/react-flow/SequenceDiagram/Line"
import { useLocale } from "@/components/LocaleProvider"

const T = {
  es: {
    app: "Tu aplicación",
    user: "Usuario final",
    start: "Inicio",
    createValidation: `<span>Crear validación<br><b>POST /api/validations</b></span>`,
    return201: `<span>Responde <b>201</b> con <b>token</b><br>y envía el mensaje por los canales</span>`,
    sendLink: `<span>Envía el enlace de confirmación<br>(automático en SMS/Email, WhatsApp con <b>[URL_VALIDATION]</b>)</span>`,
    openLink: `<span>Abre la página de confirmación</span>`,
    decide: `<span>Aprueba o rechaza la validación</span>`,
    webhookResult: `<span>Envía webhook con estado<br><b>APPROVED</b> o <b>REJECTED</b></span>`,
    expire: "Expiración",
    expireAction: `<span>Si no responde en <b>minutes_by_expire</b><br>pasa a <b>PARTIAL_EXPIRED</b></span>`,
    webhookExpired: `<span>Envía webhook con estado<br><b>PARTIAL_EXPIRED</b></span>`,
    query: "Consulta",
    queryStatus: "Consultar validación",
    queryResult: `<span>Retorna el estado actual<br>de la solicitud</span>`,
  },
  en: {
    app: "Your app",
    user: "End user",
    start: "Start",
    createValidation: `<span>Create validation<br><b>POST /api/validations</b></span>`,
    return201: `<span>Returns <b>201</b> with a <b>token</b> and sends<br>the message through the channels</span>`,
    sendLink: `<span>Sends the confirmation link<br>(automatic in SMS/Email; WhatsApp requires <b>[URL_VALIDATION]</b>)</span>`,
    openLink: `<span>Opens the confirmation page</span>`,
    decide: `<span>Approves or rejects the validation</span>`,
    webhookResult: `<span>Sends webhook with status<br><b>APPROVED</b> or <b>REJECTED</b></span>`,
    expire: "Expiration",
    expireAction: `<span>If there is no response within <b>minutes_by_expire</b><br>it becomes <b>PARTIAL_EXPIRED</b></span>`,
    webhookExpired: `<span>Sends webhook with status<br><b>PARTIAL_EXPIRED</b></span>`,
    query: "Query",
    queryStatus: "Query validation",
    queryResult: `<span>Returns the current status<br>of the request</span>`,
  },
}

export default function ValidationLifecycle() {
  const { locale } = useLocale()
  const t = T[locale] ?? T.es

  return (
    <SequenceDiagram customView={{ height: 1150, x: 80, y: 27.2727 }}>
      <SequenceActor id="app" color="bg-blueFlow" label={t.app} positionX="0" positionY="0" height="1150px" />
      <SequenceActor id="service" color="bg-orangeFlow" label="MSV Service" positionX="320" positionY="0" height="1150px" />
      <SequenceActor id="user" color="bg-greenFlow" label={t.user} positionX="850" positionY="0" height="1150px" />

      <Line id="lineStart" label={t.start} positionX="-100" positionY="35" width="1100px" />
      <SequenceAction
        id="createValidation"
        from="app"
        to="service"
        message={t.createValidation}
        positionX="75"
        positionY="80"
      />
      <SequenceAction
        id="return201"
        from="service"
        to="app"
        message={t.return201}
        positionX="40"
        positionY="170"
      />
      <SequenceAction
        id="sendLink"
        from="service"
        to="user"
        message={t.sendLink}
        positionX="370"
        positionY="260"
      />
      <SequenceAction
        id="openLink"
        from="user"
        to="service"
        message={t.openLink}
        positionX="460"
        positionY="350"
      />
      <SequenceAction
        id="decide"
        from="user"
        to="service"
        message={t.decide}
        positionX="460"
        positionY="430"
      />
      <SequenceAction
        id="webhookResult"
        from="service"
        to="app"
        message={t.webhookResult}
        positionX="60"
        positionY="520"
      />

      <Line id="lineExpire" label={t.expire} positionX="-100" positionY="600" width="1100px" />
      <SequenceAction
        id="expire"
        from="service"
        to="service"
        message={t.expireAction}
        positionX="350"
        positionY="660"
        sourcePositionY="600"
        targetPositionY="720"
      />
      <SequenceAction
        id="webhookExpired"
        from="service"
        to="app"
        message={t.webhookExpired}
        positionX="60"
        positionY="790"
      />

      <Line id="lineQuery" label={t.query} positionX="-100" positionY="870" width="1100px" />
      <SequenceAction
        id="query"
        from="app"
        to="service"
        message={t.queryStatus}
        positionX="80"
        positionY="930"
      />
      <SequenceAction
        id="queryResult"
        from="service"
        to="app"
        message={t.queryResult}
        positionX="70"
        positionY="1010"
      />
    </SequenceDiagram>
  )
}

