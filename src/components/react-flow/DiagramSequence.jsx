export default function DiagramSequence({ description }) {
    return (
      <div style={{ border: "1px solid #ccc", padding: "16px", margin: "16px 0" }}>
        <strong>Diagrama de secuencia test</strong>
        {description && <p>Descripción: {description}</p>}
      </div>
    );
  }