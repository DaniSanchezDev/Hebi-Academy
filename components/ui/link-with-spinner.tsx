'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface LinkWithSpinnerProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

// Crea un evento global para la transición
export const startRouteTransition = () => {
  const event = new Event('route-transition-start')
  window.dispatchEvent(event)
}

// Función para terminar la transición
export const endRouteTransition = () => {
  const event = new Event('route-transition-end')
  window.dispatchEvent(event)
}

export default function LinkWithSpinner({ 
  href, 
  children, 
  className = '',
  onClick 
}: LinkWithSpinnerProps) {
  const router = useRouter()
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Iniciar transición
    startRouteTransition()
    
    // Callback personalizado si existe
    if (onClick) onClick()
    
    // Pequeña demora para que el spinner sea visible
    setTimeout(() => {
      router.push(href)
      
      // Terminar transición después de un breve período
      setTimeout(() => {
        endRouteTransition()
      }, 500)
    }, 100)
  }
  
  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}
