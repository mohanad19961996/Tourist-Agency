import { useState, useEffect } from 'react'
import { Loader2, Image, Sparkles } from 'lucide-react'

interface CarouselLoadingSpinnerProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'simple' | 'elegant' | 'premium'
  message?: string
  progress?: number
  showProgress?: boolean
}

export default function CarouselLoadingSpinner({
  language,
  themeColor,
  isDarkMode,
  size = 'md',
  variant = 'elegant',
  message,
  progress,
  showProgress = false
}: CarouselLoadingSpinnerProps) {
  const [dots, setDots] = useState('.')

  // Animated dots for loading text
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '.'
        return prev + '.'
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const content = {
    ar: {
      loading: 'جارٍ التحميل',
      preparingCarousel: 'إعداد العرض التقديمي',
      loadingImages: 'تحميل الصور',
      almostReady: 'جاهز تقريباً'
    },
    en: {
      loading: 'Loading',
      preparingCarousel: 'Preparing Carousel',
      loadingImages: 'Loading Images',
      almostReady: 'Almost Ready'
    }
  }

  const sizes = {
    sm: {
      container: 'w-32 h-32',
      spinner: 'w-8 h-8',
      icon: 'w-6 h-6',
      text: 'text-sm',
      progress: 'w-24 h-24'
    },
    md: {
      container: 'w-48 h-48',
      spinner: 'w-12 h-12',
      icon: 'w-8 h-8',
      text: 'text-base',
      progress: 'w-32 h-32'
    },
    lg: {
      container: 'w-64 h-64',
      spinner: 'w-16 h-16',
      icon: 'w-12 h-12',
      text: 'text-lg',
      progress: 'w-40 h-40'
    }
  }

  const currentSize = sizes[size]

  if (variant === 'simple') {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <Loader2 
          className={`${currentSize.spinner} animate-spin`}
          style={{ color: themeColor }}
        />
        <div className={`${currentSize.text} text-center`}>
          <p style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
            {message || content[language].loading}{dots}
          </p>
        </div>
      </div>
    )
  }

  if (variant === 'premium') {
    return (
      <div className={`${currentSize.container} relative flex items-center justify-center`}>
        {/* Background Glow */}
        <div 
          className="absolute inset-0 rounded-full opacity-20 animate-pulse blur-xl"
          style={{ backgroundColor: themeColor }}
        />
        
        {/* Main Container */}
        <div 
          className="relative rounded-3xl p-8 backdrop-blur-lg border"
          style={{
            background: isDarkMode 
              ? `linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)`
              : `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)`,
            borderColor: `${themeColor}30`,
            boxShadow: `0 20px 80px rgba(0,0,0,0.2), 0 0 0 1px ${themeColor}20`
          }}
        >
          {/* Floating Elements */}
          <div className="absolute inset-0">
            <Sparkles 
              className="absolute top-4 right-4 w-4 h-4 animate-pulse"
              style={{ color: themeColor }}
            />
            <Image 
              className="absolute bottom-4 left-4 w-4 h-4 animate-pulse delay-300"
              style={{ color: themeColor }}
            />
          </div>

          {/* Progress Ring */}
          {showProgress && progress !== undefined ? (
            <div className="relative flex items-center justify-center">
              <svg className={`${currentSize.progress} transform -rotate-90`} viewBox="0 0 120 120">
                {/* Background Circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke={isDarkMode ? '#374151' : '#E5E7EB'}
                  strokeWidth="6"
                />
                {/* Progress Circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke={themeColor}
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 - (progress / 100) * 2 * Math.PI * 50}`}
                  className="transition-all duration-300 ease-out"
                  style={{ 
                    filter: `drop-shadow(0 0 12px ${themeColor}60)` 
                  }}
                />
              </svg>
              
              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Loader2 
                  className={`${currentSize.spinner} animate-spin mb-2`}
                  style={{ color: themeColor }}
                />
                <span 
                  className="font-bold"
                  style={{ color: isDarkMode ? '#ffffff' : themeColor }}
                >
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* Spinning Icon */}
              <div className="relative">
                <div 
                  className="absolute inset-0 rounded-full animate-ping opacity-30"
                  style={{ backgroundColor: themeColor }}
                />
                <Loader2 
                  className={`${currentSize.spinner} animate-spin relative z-10`}
                  style={{ color: themeColor }}
                />
              </div>
              
              {/* Loading Text */}
              <div className={`${currentSize.text} text-center space-y-1`}>
                <p 
                  className="font-semibold"
                  style={{ color: isDarkMode ? '#ffffff' : themeColor }}
                >
                  {message || content[language].preparingCarousel}
                </p>
                <p 
                  className="text-sm opacity-70"
                  style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                >
                  {content[language].almostReady}{dots}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Elegant variant (default)
  return (
    <div className={`${currentSize.container} relative flex items-center justify-center`}>
      {/* Outer Ring */}
      <div 
        className="absolute inset-0 rounded-full border-2 opacity-20 animate-spin"
        style={{ 
          borderColor: `transparent ${themeColor} transparent transparent`,
          animationDuration: '2s'
        }}
      />
      
      {/* Inner Ring */}
      <div 
        className="absolute inset-4 rounded-full border-2 opacity-40 animate-spin"
        style={{ 
          borderColor: `transparent transparent ${themeColor} transparent`,
          animationDuration: '1.5s',
          animationDirection: 'reverse'
        }}
      />
      
      {/* Center Content */}
      <div 
        className="relative rounded-2xl p-6 backdrop-blur-sm"
        style={{
          background: isDarkMode 
            ? `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)`
            : `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)`,
          border: `1px solid ${themeColor}30`
        }}
      >
        <div className="flex flex-col items-center space-y-3">
          <Loader2 
            className={`${currentSize.spinner} animate-spin`}
            style={{ color: themeColor }}
          />
          
          <div className={`${currentSize.text} text-center`}>
            <p 
              className="font-medium"
              style={{ color: isDarkMode ? '#ffffff' : themeColor }}
            >
              {message || content[language].loadingImages}
            </p>
            <p 
              className="text-xs opacity-60 mt-1"
              style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
            >
              {dots}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}