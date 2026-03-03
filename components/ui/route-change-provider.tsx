'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type RouteChangeContextType = {
  isChangingRoute: boolean
}

const RouteChangeContext = createContext<RouteChangeContextType>({
  isChangingRoute: false
})

export const useRouteChange = () => useContext(RouteChangeContext)

export function RouteChangeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isChangingRoute, setIsChangingRoute] = useState(false)

  useEffect(() => {
    const handleStart = () => {
      setIsChangingRoute(true)
    }

    const handleComplete = () => {
      setTimeout(() => {
        setIsChangingRoute(false)
      }, 300)
    }

    window.addEventListener('routeChangeStart', handleStart)
    window.addEventListener('routeChangeComplete', handleComplete)

    return () => {
      window.removeEventListener('routeChangeStart', handleStart)
      window.removeEventListener('routeChangeComplete', handleComplete)
    }
  }, [])

  useEffect(() => {
    setIsChangingRoute(false)
  }, [pathname, searchParams])

  return (
    <RouteChangeContext.Provider value={{ isChangingRoute }}>
      {children}
      {isChangingRoute && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/60 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-indigo-100"></div>
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-violet-500 animate-spin"></div>
            </div>
            <p className="text-indigo-600 font-medium mt-2">Cargando...</p>
          </div>
        </div>
      )}
    </RouteChangeContext.Provider>
  )
}
