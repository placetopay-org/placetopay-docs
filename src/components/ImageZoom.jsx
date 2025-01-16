/* eslint-disable @next/next/no-img-element */
import { createContext, useContext, useState } from "react"

const ImageZoomContext = createContext()

export function ImageZoomProvider(props) {
  // Estado para manejar el zoom y la imagen activa
  const [isZoomed, setIsZoomed] = useState(false)
  const [activeImage, setActiveImage] = useState(null)

  // Función para alternar el zoom y establecer la imagen activa
  const toggleZoom = (imageSrc) => {
    setIsZoomed(!isZoomed)
    setActiveImage(imageSrc || null) // Si no hay imagen, limpiamos el estado
  }

  return (
    <ImageZoomContext.Provider value={{ isZoomed, activeImage, toggleZoom }}>
      {isZoomed && activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-55 backdrop-blur-md"

          onClick={() => toggleZoom(null)}
        >
          <div className="flex items-center justify-center w-full h-full p-4">
            <img
              src={activeImage}
              alt="Zoomed view"
              className="max-h-[90vh] max-w-full rounded-md shadow-lg sm:max-h-[80vh] sm:max-w-[90%] md:max-h-[75vh] md:max-w-[85%] lg:max-h-[70vh] lg:max-w-[80%]"
            />
          </div>
        </div>
      )}
      {props.children}
    </ImageZoomContext.Provider>
  )
}

export function ImageZoom(props) {
  const { toggleZoom } = useContext(ImageZoomContext)

  return <img alt="image with zoom" {...props} tabIndex={0} onClick={() => toggleZoom(props.src)} />
}