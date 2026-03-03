'use client'

import React from 'react'
import TestSpinnerButton from '@/components/ui/test-spinner-button'
import { startRouteTransition, endRouteTransition } from '@/components/ui/link-with-spinner'
import { useRouter } from 'next/navigation'

export default function TestSpinnerPage() {
  const router = useRouter()
  
  const navigateWithSpinner = (path: string) => {
    // Mostrar el spinner
    startRouteTransition()
    
    // Pequeña demora para que se vea el efecto
    setTimeout(() => {
      router.push(path)
      
      // Ocultar el spinner después de 500ms
      setTimeout(() => {
        endRouteTransition()
      }, 500)
    }, 100)
  }
  
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl p-8 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 shadow-md">
        <h1 className="text-3xl font-bold text-indigo-800 mb-6">Prueba de Spinner de Transición</h1>
        
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white/80 border border-indigo-100">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">Probar spinner sin navegación</h2>
            <p className="text-gray-600 mb-4">
              Este botón activará el spinner durante 2 segundos sin cambiar de página.
            </p>
            <TestSpinnerButton />
          </div>
          
          <div className="p-6 rounded-xl bg-white/80 border border-indigo-100">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">Probar spinner con navegación</h2>
            <p className="text-gray-600 mb-4">
              Estos botones activarán el spinner y navegarán a otra página.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigateWithSpinner('/')}
                className="px-6 py-3 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-medium hover:from-indigo-600 hover:to-violet-600 transition-all shadow-md hover:shadow-lg"
              >
                Go to Home
              </button>
              
              <button 
                onClick={() => navigateWithSpinner('/dashboard')}
                className="px-6 py-3 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-medium hover:from-indigo-600 hover:to-violet-600 transition-all shadow-md hover:shadow-lg"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 rounded-xl bg-indigo-100/50 border border-indigo-200">
          <h3 className="text-lg font-medium text-indigo-700 mb-2">¿Cómo funciona?</h3>
          <p className="text-gray-600">
            El spinner aparece durante las transiciones entre páginas o cuando se está cargando contenido.
            Utiliza un fondo con blur y un spinner con la paleta indigo-violeta que prefieres.
          </p>
        </div>
      </div>
    </div>
  )
}
