import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Clock } from 'lucide-react'

interface CarouselIndicatorProps {
  currentIndex: number
  totalItems: number
  duration: number // Duration in milliseconds
  isAutoPlaying: boolean
  onToggleAutoPlay?: () => void
  onReset?: () => void
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'top-center' | 'bottom-center'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'minimal' | 'full' | 'compact'
  showProgress?: boolean
  showControls?: boolean
  showTimer?: boolean
  label?: string
}

export default function CarouselIndicator({
  currentIndex,
  totalItems,
  duration,
  isAutoPlaying,
  onToggleAutoPlay,
  onReset,
  language,
  themeColor,
  isDarkMode,
  position = 'bottom-right',
  size = 'md',
  variant = 'full',
  showProgress = true,
  showControls = true,
  showTimer = false,
  label
}: CarouselIndicatorProps) {
  const [progress, setProgress] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(duration)

  // Reset progress when slide changes
  useEffect(() => {
    setProgress(0)
    setTimeRemaining(duration)
  }, [currentIndex, duration])

  // Update progress and timer
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = 100 / (duration / 50) // Update every 50ms
        const newProgress = Math.min(prev + increment, 100)
        
        // Update time remaining
        setTimeRemaining(Math.max(duration - (newProgress * duration / 100), 0))
        
        return newProgress
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isAutoPlaying, duration])

  const content = {
    ar: {
      slide: 'شريحة',
      of: 'من',
      autoPlay: 'التشغيل التلقائي',
      pause: 'إيقاف مؤقت',
      play: 'تشغيل',
      reset: 'إعادة تشغيل',
      remaining: 'متبقي',
      seconds: 'ثانية'
    },
    en: {
      slide: 'Slide',
      of: 'of',
      autoPlay: 'Auto Play',
      pause: 'Pause',
      play: 'Play',
      reset: 'Reset',
      remaining: 'remaining',
      seconds: 'seconds'
    }
  }

  const sizes = {
    sm: {
      container: 'text-sm',
      progress: 'w-16 h-16',
      progressStroke: '3',
      icon: 'w-4 h-4',
      padding: 'p-2'
    },
    md: {
      container: 'text-base',
      progress: 'w-20 h-20',
      progressStroke: '4',
      icon: 'w-5 h-5',
      padding: 'p-3'
    },
    lg: {
      container: 'text-lg',
      progress: 'w-24 h-24',
      progressStroke: '5',
      icon: 'w-6 h-6',
      padding: 'p-4'
    }
  }

  const currentSize = sizes[size]

  const positionClasses = {
    'top-left': 'top-6 left-6',
    'top-right': 'top-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'top-center': 'top-6 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2'
  }

  // Calculate circumference for progress circle
  const radius = variant === 'compact' ? 16 : 24
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  if (variant === 'minimal') {
    return (
      <div 
        className={`absolute ${positionClasses[position]} z-30 flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-500 ${currentSize.container}`}
        style={{
          background: isDarkMode 
            ? `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)`
            : `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)`,
          backdropFilter: 'blur(12px)',
          border: `1px solid ${themeColor}30`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.15), 0 0 0 1px ${themeColor}20`
        }}
      >
        {/* Progress Dots */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalItems }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'scale-125' : ''
              }`}
              style={{
                backgroundColor: index === currentIndex ? themeColor : (isDarkMode ? '#4B5563' : '#D1D5DB')
              }}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        {isAutoPlaying && (
          <div className="flex items-center ml-2">
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: themeColor }}
            />
          </div>
        )}
      </div>
    )
  }

  if (variant === 'compact') {
    // Enhanced styling for large size and bottom-center position (Services section)
    const isServicesSection = size === 'lg' && position === 'bottom-center'
    
    return (
      <div 
        className={`absolute ${positionClasses[position]} z-30 ${currentSize.padding} ${isServicesSection ? 'rounded-2xl' : 'rounded-lg'} transition-all duration-500`}
        style={{
          background: isDarkMode 
            ? `linear-gradient(135deg, rgba(0,0,0,${isServicesSection ? '0.9' : '0.8'}) 0%, rgba(0,0,0,${isServicesSection ? '0.7' : '0.6'}) 100%)`
            : `linear-gradient(135deg, rgba(255,255,255,${isServicesSection ? '0.98' : '0.95'}) 0%, rgba(255,255,255,${isServicesSection ? '0.9' : '0.8'}) 100%)`,
          backdropFilter: `blur(${isServicesSection ? '16px' : '12px'})`,
          border: `${isServicesSection ? '2px' : '1px'} solid ${themeColor}${isServicesSection ? '40' : '30'}`,
          boxShadow: isServicesSection 
            ? `0 12px 48px rgba(0,0,0,0.2), 0 0 0 1px ${themeColor}30, 0 0 24px ${themeColor}20`
            : `0 8px 32px rgba(0,0,0,0.15), 0 0 0 1px ${themeColor}20`
        }}
      >
        <div className="relative flex items-center justify-center">
          {/* Progress Circle */}
          {showProgress && (
            <svg className={`${isServicesSection ? 'w-16 h-16' : 'w-12 h-12'} transform -rotate-90`} viewBox={`0 0 ${isServicesSection ? '64' : '48'} ${isServicesSection ? '64' : '48'}`}>
              {/* Background Circle */}
              <circle
                cx={isServicesSection ? "32" : "24"}
                cy={isServicesSection ? "32" : "24"}
                r={isServicesSection ? "26" : "20"}
                fill="none"
                stroke={isDarkMode ? '#374151' : '#E5E7EB'}
                strokeWidth={isServicesSection ? "4" : "3"}
              />
              {/* Progress Circle */}
              <circle
                cx={isServicesSection ? "32" : "24"}
                cy={isServicesSection ? "32" : "24"}
                r={isServicesSection ? "26" : "20"}
                fill="none"
                stroke={themeColor}
                strokeWidth={isServicesSection ? "5" : "4"}
                strokeDasharray={`${2 * Math.PI * (isServicesSection ? 26 : 20)}`}
                strokeDashoffset={`${2 * Math.PI * (isServicesSection ? 26 : 20) - (progress / 100) * 2 * Math.PI * (isServicesSection ? 26 : 20)}`}
                className="transition-all duration-100 ease-linear"
                style={{ 
                  filter: `drop-shadow(0 0 ${isServicesSection ? '8px' : '4px'} ${themeColor}40)` 
                }}
              />
            </svg>
          )}

          {/* Center Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span 
              className={`font-bold ${isServicesSection ? 'text-lg' : 'text-sm'}`}
              style={{ 
                color: isDarkMode ? '#ffffff' : themeColor,
                textShadow: isServicesSection ? `0 0 8px ${themeColor}30` : 'none'
              }}
            >
              {currentIndex + 1}/{totalItems}
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Full variant
  return (
    <div 
      className={`absolute ${positionClasses[position]} z-30 ${currentSize.padding} rounded-xl transition-all duration-500 ${currentSize.container}`}
      style={{
        background: isDarkMode 
          ? `linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)`
          : `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)`,
        backdropFilter: 'blur(16px)',
        border: `1px solid ${themeColor}30`,
        boxShadow: `0 12px 48px rgba(0,0,0,0.15), 0 0 0 1px ${themeColor}20`
      }}
    >
      <div className="flex flex-col items-center space-y-3">
        {/* Label */}
        {label && (
          <div className="text-center">
            <span 
              className="font-semibold"
              style={{ color: isDarkMode ? '#ffffff' : themeColor }}
            >
              {label}
            </span>
          </div>
        )}

        {/* Progress Circle with Content */}
        <div className="relative flex items-center justify-center">
          {showProgress && (
            <svg className={`${currentSize.progress} transform -rotate-90`} viewBox="0 0 60 60">
              {/* Background Circle */}
              <circle
                cx="30"
                cy="30"
                r="26"
                fill="none"
                stroke={isDarkMode ? '#374151' : '#E5E7EB'}
                strokeWidth={currentSize.progressStroke}
              />
              {/* Progress Circle */}
              <circle
                cx="30"
                cy="30"
                r="26"
                fill="none"
                stroke={themeColor}
                strokeWidth={currentSize.progressStroke}
                strokeDasharray={`${2 * Math.PI * 26}`}
                strokeDashoffset={`${2 * Math.PI * 26 - (progress / 100) * 2 * Math.PI * 26}`}
                className="transition-all duration-100 ease-linear"
                style={{ 
                  filter: `drop-shadow(0 0 8px ${themeColor}40)` 
                }}
              />
            </svg>
          )}

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span 
              className="font-bold"
              style={{ color: isDarkMode ? '#ffffff' : themeColor }}
            >
              {currentIndex + 1}
            </span>
            <span 
              className="text-xs opacity-70"
              style={{ color: isDarkMode ? '#ffffff' : themeColor }}
            >
              {content[language].of} {totalItems}
            </span>
          </div>
        </div>

        {/* Timer */}
        {showTimer && (
          <div className="flex items-center space-x-1 text-xs opacity-80">
            <Clock className="w-3 h-3" />
            <span>
              {Math.ceil(timeRemaining / 1000)}s {content[language].remaining}
            </span>
          </div>
        )}

        {/* Controls */}
        {showControls && (
          <div className="flex items-center space-x-2">
            {onToggleAutoPlay && (
              <button
                onClick={onToggleAutoPlay}
                className={`${currentSize.padding} rounded-lg transition-all duration-300 hover:scale-110`}
                style={{
                  backgroundColor: `${themeColor}20`,
                  color: themeColor
                }}
                title={isAutoPlaying ? content[language].pause : content[language].play}
              >
                {isAutoPlaying ? (
                  <Pause className={currentSize.icon} />
                ) : (
                  <Play className={currentSize.icon} />
                )}
              </button>
            )}

            {onReset && (
              <button
                onClick={onReset}
                className={`${currentSize.padding} rounded-lg transition-all duration-300 hover:scale-110`}
                style={{
                  backgroundColor: `${themeColor}20`,
                  color: themeColor
                }}
                title={content[language].reset}
              >
                <RotateCcw className={currentSize.icon} />
              </button>
            )}
          </div>
        )}

        {/* Auto-play Status */}
        <div className="flex items-center space-x-2 text-xs opacity-70">
          <div 
            className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'animate-pulse' : ''}`}
            style={{ backgroundColor: isAutoPlaying ? '#10B981' : '#EF4444' }}
          />
          <span>
            {isAutoPlaying ? content[language].autoPlay : content[language].pause}
          </span>
        </div>
      </div>
    </div>
  )
}