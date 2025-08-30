import { useState, useEffect } from 'react'

interface ProgressBarProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
}

export default function ProgressBar({ language, themeColor, isDarkMode }: ProgressBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      
      setScrollProgress(Math.min(Math.max(progress, 0), 100))
      setIsVisible(scrollTop > 50) // Show after scrolling 50px
    }

    const throttledUpdate = () => {
      requestAnimationFrame(updateScrollProgress)
    }

    window.addEventListener('scroll', throttledUpdate, { passive: true })
    updateScrollProgress() // Initial call

    return () => {
      window.removeEventListener('scroll', throttledUpdate)
    }
  }, [])

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      {/* Main Progress Bar Container */}
      <div 
        className="relative h-2 overflow-hidden"
        style={{
          background: isDarkMode 
            ? 'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.9) 100%)'
            : 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.95) 100%)',
          backdropFilter: 'blur(20px) saturate(130%)',
          borderBottom: `1px solid ${themeColor}30`,
          boxShadow: `
            0 4px 20px rgba(0,0,0,0.1),
            0 0 0 1px ${themeColor}20,
            inset 0 1px 0 rgba(255,255,255,0.1)
          `
        }}
      >
        {/* Animated Background Pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              ${themeColor}08 25%, 
              ${themeColor}15 50%, 
              ${themeColor}08 75%, 
              transparent 100%)`,
            animation: 'bg-slide 4s ease-in-out infinite alternate'
          }}
        />

        {/* Progress Fill */}
        <div 
          className="absolute top-0 left-0 h-full transition-all duration-300 ease-out"
          style={{
            width: `${scrollProgress}%`,
            background: `linear-gradient(90deg, 
              ${themeColor}80 0%, 
              ${themeColor} 25%, 
              ${themeColor}FF 50%, 
              ${themeColor} 75%, 
              ${themeColor}80 100%)`,
            boxShadow: `
              0 0 20px ${themeColor}60,
              0 0 40px ${themeColor}30,
              inset 0 1px 0 rgba(255,255,255,0.3)
            `,
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
          }}
        >
          {/* Progress Fill Shimmer Effect */}
          <div 
            className="absolute inset-0 opacity-80"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
              animation: 'shimmer 2s ease-in-out infinite'
            }}
          />
        </div>

        {/* Progress Glow Trail */}
        <div 
          className="absolute top-0 h-full transition-all duration-300 ease-out"
          style={{
            left: `${Math.max(scrollProgress - 5, 0)}%`,
            width: '10%',
            background: `radial-gradient(ellipse at center, ${themeColor}40 0%, transparent 70%)`,
            filter: 'blur(4px)'
          }}
        />

        {/* Floating Progress Indicator */}
        {scrollProgress > 5 && (
          <div 
            className="absolute top-0 h-full w-1 transition-all duration-300 ease-out"
            style={{
              left: `${scrollProgress}%`,
              transform: 'translateX(-50%)',
              background: `linear-gradient(180deg, ${themeColor}FF 0%, ${themeColor}80 100%)`,
              boxShadow: `
                0 0 15px ${themeColor}80,
                0 0 30px ${themeColor}40
              `,
              animation: 'indicator-pulse 2s ease-in-out infinite'
            }}
          >
            {/* Indicator Glow */}
            <div 
              className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              style={{
                background: themeColor,
                boxShadow: `
                  0 0 10px ${themeColor}FF,
                  0 0 20px ${themeColor}80,
                  0 0 30px ${themeColor}40
                `,
                animation: 'glow-pulse 1.5s ease-in-out infinite alternate'
              }}
            />
          </div>
        )}

        {/* Side Accent Lines */}
        <div 
          className="absolute top-0 left-0 w-20 h-full opacity-60"
          style={{
            background: `linear-gradient(90deg, ${themeColor}40 0%, transparent 100%)`
          }}
        />
        <div 
          className="absolute top-0 right-0 w-20 h-full opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${themeColor}40 100%)`
          }}
        />

        {/* Progress Percentage Display */}
        {scrollProgress > 10 && (
          <div 
            className={`absolute top-2 ${language === 'ar' ? 'left-4' : 'right-4'} 
              text-xs font-semibold px-2 py-1 rounded-full transition-all duration-500
              backdrop-blur-sm border border-white/20 transform hover:scale-105`}
            style={{
              background: `linear-gradient(135deg, ${themeColor}20 0%, ${themeColor}30 100%)`,
              color: isDarkMode ? '#ffffff' : themeColor,
              boxShadow: `0 4px 12px ${themeColor}20, inset 0 1px 0 rgba(255,255,255,0.1)`,
              animation: 'fade-in-up 0.5s ease-out'
            }}
          >
            {Math.round(scrollProgress)}%
          </div>
        )}

        {/* Advanced Animation Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes bg-slide {
              0% { 
                transform: translateX(-10px);
                opacity: 0.2;
              }
              100% { 
                transform: translateX(10px);
                opacity: 0.4;
              }
            }
            
            @keyframes shimmer {
              0% { 
                transform: translateX(-100%);
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
              100% { 
                transform: translateX(200%);
                opacity: 0;
              }
            }
            
            @keyframes indicator-pulse {
              0%, 100% { 
                transform: translateX(-50%) scaleY(1);
                opacity: 1;
              }
              50% { 
                transform: translateX(-50%) scaleY(1.2);
                opacity: 0.8;
              }
            }
            
            @keyframes glow-pulse {
              0% { 
                opacity: 0.8;
                transform: translateX(-50%) translateY(-50%) scale(0.8);
              }
              100% { 
                opacity: 1;
                transform: translateX(-50%) translateY(-50%) scale(1.2);
              }
            }
            
            @keyframes fade-in-up {
              0% { 
                opacity: 0;
                transform: translateY(10px);
              }
              100% { 
                opacity: 1;
                transform: translateY(0);
              }
            }
          `
        }} />
      </div>
    </div>
  )
}