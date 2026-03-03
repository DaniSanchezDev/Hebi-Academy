import React from 'react'
import { Payments, SubscriptorsChart, TotalRevenue } from './components'

export default function AnalyticsPage() {
  return (
    <div className='m-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <SubscriptorsChart />
            <TotalRevenue />
        </div>
           <Payments />
    </div>
  )
}
