import React from 'react'
import { IconBadgeProps } from './IconBadge.types'

export function IconBadge({ icon: Icon, text, className = '' }: IconBadgeProps) {
  return (
    <div className={`flex items-center gap-2 text-xs ${className}`}>
      <div className='w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-violet-400'>
        <Icon className='w-3.5 h-3.5 text-white'/>
      </div>
      <span className='text-slate-600 truncate text-xs'>{text}</span>
    </div>
  )
}
