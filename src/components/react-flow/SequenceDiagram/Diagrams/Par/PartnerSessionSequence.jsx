import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram"
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor"
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction"
import Line from "@/components/react-flow/SequenceDiagram/Line"
import { useLocale } from "@/components/LocaleProvider"

const T = {
  es: {
    server: "Tu servidor",
    par: "PAR",
    browser: "Navegador del tarjetahabiente",
    token: "Token",
    requestToken: `<span>Solicita el token<br>con tus <b>credenciales</b></span>`,
    validate: `<span>Valida credenciales<br>y datos</span>`,
    issued: `<span>Responde el <b>token</b><br>de un solo uso</span>`,
    login: "Inicio de sesión",
    postToken: `<span><b>POST</b> del <b>token</b><br>a la URL de inicio</span>`,
    consume: `<span>Consume el token<br>e inicia la sesión</span>`,
    handOff: `<span>Entrega la sesión<br>al navegador</span>`,
    enrollment: "Inscripción",
    enroll: `<span>El tarjetahabiente<br>inscribe el autopago</span>`,
    return: "Retorno",
    back: `<span>Vuelve a tu<br><b>URL de retorno</b></span>`,
    status: `<span>Consulta el estado<br>con el <b>token</b> (comercios)</span>`,
    authorized: `<span>Responde si quedó<br><b>autorizado</b></span>`,
  },
  en: {
    server: "Your server",
    par: "PAR",
    browser: "Cardholder's browser",
    token: "Token",
    requestToken: `<span>Requests the token<br>with your <b>credentials</b></span>`,
    validate: `<span>Validates credentials<br>and data</span>`,
    issued: `<span>Returns the single-use<br><b>token</b></span>`,
    login: "Login",
    postToken: `<span><b>POST</b> of the <b>token</b><br>to the login URL</span>`,
    consume: `<span>Consumes the token<br>and starts the session</span>`,
    handOff: `<span>Hands the session<br>over to the browser</span>`,
    enrollment: "Enrollment",
    enroll: `<span>The cardholder<br>enrolls the autopay</span>`,
    return: "Return",
    back: `<span>Goes back to your<br><b>return URL</b></span>`,
    status: `<span>Checks the status<br>with the <b>token</b> (merchants)</span>`,
    authorized: `<span>Answers whether it was<br><b>authorized</b></span>`,
  },
}

export default function PartnerSessionSequence() {
  const { locale } = useLocale()
  const t = T[locale] ?? T.es

  return (
    <SequenceDiagram customView={{ height: 820, x: 60, y: 27.2727, zoom: 0.62 }}>
      <SequenceActor
        id="server"
        color="bg-blueFlow"
        label={t.server}
        positionX="0"
        positionY="0"
        height="1080px"
      />
      <SequenceActor
        id="par"
        color="bg-orangeFlow"
        label={t.par}
        positionX="400"
        positionY="0"
        height="1080px"
      />
      <SequenceActor
        id="browser"
        label={t.browser}
        positionX="800"
        positionY="0"
        height="1080px"
      />

      <Line id="lineToken" label={t.token} positionX="-60" positionY="35" width="1000px" />
      <SequenceAction
        id="requestToken"
        from="server"
        to="par"
        message={t.requestToken}
        positionX="85"
        positionY="80"
      />
      <SequenceAction
        id="validate"
        from="par"
        to="par"
        message={t.validate}
        positionX="430"
        positionY="150"
        sourcePositionY="118"
        targetPositionY="220"
      />
      <SequenceAction
        id="issued"
        from="par"
        to="server"
        message={t.issued}
        positionX="95"
        positionY="240"
      />

      <Line id="lineLogin" label={t.login} positionX="-60" positionY="310" width="1000px" />
      <SequenceAction
        id="postToken"
        from="browser"
        to="par"
        message={t.postToken}
        positionX="500"
        positionY="355"
      />
      <SequenceAction
        id="consume"
        from="par"
        to="par"
        message={t.consume}
        positionX="430"
        positionY="425"
        sourcePositionY="393"
        targetPositionY="495"
      />
      <SequenceAction
        id="handOff"
        from="par"
        to="browser"
        message={t.handOff}
        positionX="490"
        positionY="515"
      />

      <Line id="lineEnrollment" label={t.enrollment} positionX="-60" positionY="585" width="1000px" />
      <SequenceAction
        id="enroll"
        from="browser"
        to="par"
        message={t.enroll}
        positionX="500"
        positionY="630"
      />

      <Line id="lineReturn" label={t.return} positionX="-60" positionY="700" width="1000px" />
      <SequenceAction
        id="back"
        from="browser"
        to="server"
        message={t.back}
        positionX="500"
        positionY="745"
      />
      <SequenceAction
        id="status"
        from="server"
        to="par"
        message={t.status}
        positionX="70"
        positionY="815"
      />
      <SequenceAction
        id="authorized"
        from="par"
        to="server"
        message={t.authorized}
        positionX="90"
        positionY="885"
      />
    </SequenceDiagram>
  )
}
