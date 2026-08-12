/* eslint-disable @next/next/no-img-element */
import { createContext, useContext, useState } from "react"
import { Dialog } from '@headlessui/react'

const ImageZoomContext = createContext()

export function ImageZoomProvider(props) {
  // Estado para manejar el zoom y la imagen activa
  const [activeImage, setActiveImage] = useState(null)

  const isZoomed = Boolean(activeImage)

  // Función para alternar el zoom y establecer la imagen activa
  const toggleZoom = (imageSrc) => {
    setActiveImage(imageSrc || null) // Si no hay imagen, limpiamos el estado
  }

  return (
    <ImageZoomContext.Provider value={{ isZoomed, activeImage, toggleZoom }}>
      <Dialog
        open={isZoomed}
        onClose={() => toggleZoom(null)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-55 backdrop-blur-md"
          aria-hidden="true"
        />
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          onClick={() => toggleZoom(null)}
        >
          <Dialog.Panel className="flex items-center justify-center">
            <img
              src={activeImage || undefined}
              alt="Zoomed view"
              className="max-h-[90vh] max-w-full rounded-md shadow-lg sm:max-h-[80vh] sm:max-w-[90%] md:max-h-[75vh] md:max-w-[85%] lg:max-h-[70vh] lg:max-w-[80%]"
            />
          </Dialog.Panel>
        </div>
      </Dialog>
      {props.children}
    </ImageZoomContext.Provider>
  )
}

export function ImageZoom(props) {
  const { toggleZoom } = useContext(ImageZoomContext)

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleZoom(props.src)
    }
  }

  return (
    <img
      alt="image with zoom"
      role="button"
      tabIndex={0}
      {...props}
      onClick={() => toggleZoom(props.src)}
      onKeyDown={handleKeyDown}
    />
  )
}
