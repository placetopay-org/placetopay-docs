# SequenceDiagram

The `SequenceDiagram` is the component to build a sequence diagram easier, it has 3 elements for creating the flows

- [Customize the rendering position](#customize-the-rendering-position)
- [Elements](#elements)
  - [Actor](#sequenceactor)
  - [Action](#sequenceaction)
    - [Simple example](#simple-example)
    - [Example of message with HTML](#example-of-message-with-html)
    - [Example when the action start and end on the same actor](#example-when-the-action-start-and-end-on-the-same-actor)
  - [Line](#line)
- [Example of how to implement](#example-of-how-to-implement)

## Customize the rendering position

You can customize the diagrams view adding the parameter **customView** and it receives these attributes 

| Name | Description | Default | Required|
| :--- | :--- | :--- | :--- |
| height | The value must be unique || Yes |
| x | Horizontal position || Yes |
| y | Upright position || Yes |
| zoom | Zoom of the diagram | 0.75 | No |

**Example with customView**
```jsx
import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram"

<SequenceDiagram customView={{ height:"600px", x:200, y:27.2727 }}>
```
**Example without customView**
In this case the main component will use the **fitView** attribute of reactflow

```jsx
import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram"

<SequenceDiagram>
```
## Elements

### SequenceActor

`SequenceActor` used to create the actors 

| Name | Description | Default | Required|
| :--- | :--- | :--- | :--- |
| id | The value must be unique || Yes |
| color       | Custom color, use **tailwind** | `bg-greenFlow` | No |
| label       | Text | `Actor` | No |
| positionX | Horizontal position || Yes |
| positionY | Upright position || Yes |
| height      | Actor's height || Yes |

**Example**
```jsx
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor"

  <SequenceActor 
  id="site" 
  color="bg-sky-500" 
  label="Tu sitio" 
  positionX="0" 
  positionY="0" 
  height="700px" 
  />
  
  <SequenceActor 
  id="server" 
  label="Tu servidor" 
  positionX="220" 
  positionY="0" 
  height="700px" 
  />

```

### SequenceAction
`SequenceAction` used to create the actions

| Name | Description | Default | Required|
| :--- | :--- | :--- | :--- |
| id | The value must be unique || Yes |
| from | Receives the actor's id where it starts ||Yes |
| to | Receives the id of the actor where to end || Yes |
| message | Action message, can receive text or html || Yes |
| sourcePositionY | Position of source handle || Only if **the action start and end on the same actor** |
| targetPositionY | Position of target handle || Only if **the action start and end on the same actor**|
| positionX | Horizontal position || Yes |
| positionY | Upright position || Yes |

#### Simple example
```jsx
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction"

  <SequenceAction 
    id="process"
    from="site" 
    to="server" 
    message="Iniciar proceso" 
    positionX="50" 
    positionY="70" 
  />
```

#### Example of message with HTML
```jsx
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction"

  <SequenceAction 
    id="process"
    from="site" 
    to="server" 
    message={`<span>Retornar <b>requestId</b><br> de pago y <b>processUrl</b></span>`} 
    positionX="50" 
    positionY="70" 
  />
```

#### Example when the action start and end on the same actor

```jsx
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction"

  <SequenceAction 
    id="complete"
    from="server" 
    to="server"
    positionX="550" v
    positionY="320" 
    sourcePositionY="240"
    targetPositionY="400"
    message={`<span>Usuario completa<br> el proceso</span>`} 
  />
```

### Line

`Line` used to build a horizontal dashed line to create sections in the diagram

| Name | Description | Default | Required|
| :--- | :--- | :--- | :--- |
| id | The value must be unique || Yes |
| label       | Text | `Line` | No |
| positionX | Horizontal position || Yes |
| positionY | Upright position || Yes |
| width      | Line's length || Yes |

**Example**
```jsx
import Line from "@/components/react-flow/SequenceDiagram/Line"

  <Line 
  id="line" 
  label="Inicio" 
  positionX="-100" 
  positionY="35" 
  width="800px" 
  />
```
## Example of how to implement

```jsx
import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram"
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor"
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction"
import Line from "@/components/react-flow/SequenceDiagram/Line"

<SequenceDiagram> 
  <SequenceActor id="site" color="bg-sky-500" label="Tu sitio" positionX="0" positionY="0" height="400px" />
  <SequenceActor id="server" label="Tu servidor" positionX="220" positionY="0" height="400px" />
  <Line id="line" label="Inicio" positionX="-100" positionY="35" width="500px" />
  <SequenceAction 
    id="process"
    from="site" 
    to="server" 
    message="Iniciar proceso" 
    positionX="55" 
    positionY="70" 
  />
  <SequenceAction 
    id="session"  
    from="server" 
    to="site" 
    message="Crear sesión de pago" 
    positionX="35" 
    positionY="140" 
  />
    <SequenceAction 
    id="complete"
    from="server" 
    to="server"
    positionX="250" 
    positionY="270" 
    sourcePositionY="180"
    targetPositionY="360"
    message={`<span>Usuario completa<br> el proceso</span>`} 
  />
</SequenceDiagram>
```