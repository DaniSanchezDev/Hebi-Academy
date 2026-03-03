'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function TransitionSpinner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    // Función para iniciar la carga
    const handleRouteChangeStart = () => {
      setIsLoading(true)
    }
    
    // Función para finalizar la carga
    const handleRouteChangeComplete = () => {
      setIsLoading(false)
    }
    
    // Agregar event listeners para los eventos personalizados
    window.addEventListener('route-transition-start', handleRouteChangeStart)
    window.addEventListener('route-transition-end', handleRouteChangeComplete)
    
    // Cleanup
    return () => {
      window.removeEventListener('route-transition-start', handleRouteChangeStart)
      window.removeEventListener('route-transition-end', handleRouteChangeComplete)
    }
  }, [])
  
  // Reiniciar el estado cuando la ruta cambia
  useEffect(() => {
    setIsLoading(false)
  }, [pathname, searchParams])
  
  if (!isLoading) return null
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-indigo-50/80 to-violet-50/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/40 shadow-lg border border-indigo-100">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-indigo-100"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-violet-500 animate-spin"></div>
          <div className="absolute inset-0 m-3 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 animate-pulse"></div>
        </div>
        <p className="text-indigo-600 font-medium mt-2">Cargando...</p>
      </div>
    </div>
  )
}
