import React from 'react'
import { CourseProgressDisplayProps } from './CourseProgressDisplay.types'
import { DownloadCertificate } from './DownloadCertificate'

export function CourseProgressDisplay(props: CourseProgressDisplayProps) {
    const {progress, titleCourse, userName} = props

    const showProgress = progress === 100

    return showProgress ? (
        <div className="flex justify-center">
            <DownloadCertificate userName={userName} titleCourse={titleCourse}/> 
        </div>
    ) : (
        <div className="w-40 sm:w-56 p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 shadow-md hover:shadow-lg transition-all">
            <div className="relative mb-3">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Progreso</span>
                    <span className="text-violet-600 font-semibold">{progress}%</span>
                </div>
                <div className="h-2 flex rounded-full bg-slate-200 overflow-hidden">
                    {/* Segmentos para el progreso */}
                    {[...Array(10)].map((_, i) => {
                        const segmentValue = i * 10;
                        const nextSegmentValue = (i + 1) * 10;
                        
                        const isFullyFilled = progress >= nextSegmentValue;
                        
                        const isPartiallyFilled = progress > segmentValue && progress < nextSegmentValue;
                        
                        const fillPercentage = isPartiallyFilled ? ((progress - segmentValue) / 10) * 100 : 0;
                        
                        return (
                            <div 
                                key={i}
                                style={{ width: '10%' }}
                                className="h-full border-r border-white last:border-0 relative overflow-hidden"
                            >
                                {isFullyFilled && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 shadow-[0_0_8px_rgba(124,58,237,0.5)]"></div>
                                )}
                                
                                {isPartiallyFilled && (
                                    <div 
                                        className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 shadow-[0_0_8px_rgba(124,58,237,0.5)]"
                                        style={{ width: `${fillPercentage}%` }}
                                    ></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
