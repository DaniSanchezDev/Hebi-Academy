'use client'

import React from 'react'
import { startRouteTransition, endRouteTransition } from './link-with-spinner'

export default function TestSpinnerButton() {
  const handleClick = () => {
    startRouteTransition()
    
    setTimeout(() => {
      endRouteTransition()
    }, 2000)
  }
  
  return (
    <button 
      onClick={handleClick}
      className="px-6 py-3 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-medium hover:from-indigo-600 hover:to-violet-600 transition-all shadow-md hover:shadow-lg"
    >
      Probar Spinner
    </button>
  )
}
