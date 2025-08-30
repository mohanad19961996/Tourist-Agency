import { useState, useEffect, useRef } from 'react'
import { Users, MapPin, Calendar, HeartHandshake } from 'lucide-react'

interface StatsCounterProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
}

const statsData = [
  {
    id: 1,
    icon: Users,
    number: 25847,
    label: { ar: 'عميل سعيد', en: 'Happy Clients' },
    suffix: { ar: '', en: '' },
    prefix: { ar: '', en: '' }
  },
  {
    id: 2,
    icon: MapPin,
    number: 156,
    label: { ar: 'وجهة سياحية', en: 'Destinations' },
    suffix: { ar: '+', en: '+' },
    prefix: { ar: '', en: '' }
  },
  {
    id: 3,
    icon: Calendar,
    number: 15,
    label: { ar: 'سنة خبرة', en: 'Years Experience' },
    suffix: { ar: '+', en: '+' },
    prefix: { ar: '', en: '' }
  },
  {
    id: 4,
    icon: HeartHandshake,
    number: 238,
    label: { ar: 'خبير سفر', en: 'Travel Experts' },
    suffix: { ar: '', en: '' },
    prefix: { ar: '', en: '' }
  }
]

export default function StatsCounter({ language, themeColor, isDarkMode }: StatsCounterProps) {
  const [counters, setCounters] = useState(statsData.map(() => 0))
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          startCounting()
        }
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  const startCounting = () => {
    statsData.forEach((stat, index) => {
      const duration = 2000 // 2 seconds
      const steps = 60
      const stepValue = stat.number / steps
      const stepDuration = duration / steps

      let currentStep = 0
      const timer = setInterval(() => {
        currentStep++
        const newValue = Math.min(Math.floor(stepValue * currentStep), stat.number)
        
        setCounters(prev => {
          const newCounters = [...prev]
          newCounters[index] = newValue
          return newCounters
        })

        if (currentStep >= steps) {
          clearInterval(timer)
        }
      }, stepDuration)
    })
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  return (
    <section 
      ref={sectionRef}
      className={`py-20 px-4 lg:px-8 relative overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}
      style={{
        background: `linear-gradient(135deg, 
          ${themeColor}08 0%, 
          ${themeColor}15 50%, 
          ${themeColor}08 100%)`
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            background: `
              linear-gradient(45deg, transparent 30%, ${themeColor}20 50%, transparent 70%),
              linear-gradient(-45deg, transparent 30%, ${themeColor}15 50%, transparent 70%)
            `,
            backgroundSize: '400px 400px',
            animation: 'gradientShift 8s ease-in-out infinite'
          }}
        />
        
        {/* Floating Numbers Background */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute text-6xl font-bold animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                color: themeColor,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              {Math.floor(Math.random() * 9)}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={stat.id}
              className="group relative p-8 rounded-3xl backdrop-blur-2xl border border-white/30
                transform hover:scale-110 hover:-translate-y-4 transition-all duration-700 ease-out
                shadow-2xl hover:shadow-3xl cursor-pointer text-center"
              style={{
                background: `linear-gradient(135deg, 
                  ${isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'} 0%, 
                  ${isDarkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'} 50%,
                  ${isDarkMode ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)'} 100%)`,
                backdropFilter: 'blur(25px) saturate(180%)',
                boxShadow: `
                  0 25px 80px rgba(0,0,0,0.15),
                  0 0 60px ${themeColor}15,
                  inset 0 2px 0 rgba(255,255,255,0.2),
                  inset 0 -2px 0 rgba(0,0,0,0.1)
                `,
                animationDelay: `${index * 200}ms`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 40px 120px rgba(0,0,0,0.25),
                  0 0 100px ${themeColor}30,
                  inset 0 2px 0 rgba(255,255,255,0.3),
                  inset 0 -2px 0 rgba(0,0,0,0.15)
                `
                e.currentTarget.style.borderColor = `${themeColor}50`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 25px 80px rgba(0,0,0,0.15),
                  0 0 60px ${themeColor}15,
                  inset 0 2px 0 rgba(255,255,255,0.2),
                  inset 0 -2px 0 rgba(0,0,0,0.1)
                `
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
              }}
            >
              {/* Background Glow Effect */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(circle at center, ${themeColor}15 0%, transparent 70%)`
                }}
              />

              {/* Icon Container */}
              <div className="relative z-10 mb-6">
                <div 
                  className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center
                    transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500
                    shadow-xl group-hover:shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor}25, ${themeColor}15)`,
                    boxShadow: `
                      0 0 40px ${themeColor}30,
                      inset 0 2px 0 rgba(255,255,255,0.3),
                      inset 0 -2px 0 rgba(0,0,0,0.1)
                    `
                  }}
                >
                  <stat.icon 
                    className="w-10 h-10 transform group-hover:scale-110 transition-transform duration-300" 
                    style={{ color: themeColor }} 
                  />
                </div>
              </div>

              {/* Counter Number */}
              <div className="relative z-10 mb-4">
                <div 
                  className="text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-br bg-clip-text text-transparent
                    transform group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}80 100%)`
                  }}
                >
                  {stat.prefix[language]}{formatNumber(counters[index])}{stat.suffix[language]}
                </div>
                
                {/* Animated Underline */}
                <div 
                  className="w-0 h-1 mx-auto rounded-full group-hover:w-20 transition-all duration-500"
                  style={{ backgroundColor: themeColor }}
                />
              </div>

              {/* Label */}
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white 
                  group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                  {stat.label[language]}
                </h3>
              </div>

              {/* Floating Particles */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-60 
                      group-hover:animate-ping transition-all duration-300"
                    style={{
                      backgroundColor: themeColor,
                      top: `${30 + i * 20}%`,
                      left: `${20 + i * 30}%`,
                      right: `${20 + i * 25}%`,
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: '2s'
                    }}
                  />
                ))}
              </div>

              {/* Pulse Ring */}
              <div 
                className="absolute inset-0 rounded-3xl border-2 opacity-0 group-hover:opacity-100
                  group-hover:animate-pulse transition-all duration-300"
                style={{ borderColor: `${themeColor}30` }}
              />
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center mt-16">
          <div className="flex space-x-4 rtl:space-x-reverse">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full animate-pulse"
                style={{
                  backgroundColor: themeColor,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gradientShift {
            0%, 100% { transform: translateX(-50%) translateY(-50%) rotate(0deg); }
            50% { transform: translateX(-50%) translateY(-50%) rotate(180deg); }
          }
        `
      }} />
    </section>
  )
}