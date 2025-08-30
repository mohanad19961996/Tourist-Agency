import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useScrollAnimation, getAnimationClass } from './useScrollAnimation'

interface HeroCarouselProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
  onToggleBooking: () => void
}

const premiumDestinations = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1620483829646-8fb1d8162108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMG92ZXJ3YXRlciUyMHZpbGxhJTIwc3Vuc2V0fGVufDF8fHx8MTc1NjUzOTE2NHww&ixlib=rb-4.1.0&q=80&w=1080',
    name: {
      ar: 'منتجعات المالديف الخاصة',
      en: 'Maldives Private Resort'
    },
    description: {
      ar: 'أجنحة مائية حصرية في وقت الغروب الذهبي',
      en: 'Exclusive overwater pavilion at golden hour'
    }
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1633974242338-e87a5e02214c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMGx1eHVyeSUyMGFscGluZSUyMGNoYWxldCUyMG1vdW50YWluc3xlbnwxfHx8fDE3NTY1NDI4OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    name: {
      ar: 'المنتجع الألبي السويسري الفاخر',
      en: 'Swiss Luxury Alpine Retreat'
    },
    description: {
      ar: 'شاليه فاخر مع إطلالات بانورامية على الجبال',
      en: 'Premium chalet with panoramic mountain vistas'
    }
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1735320864239-798f9bd96c3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGJ1cmolMjBhbCUyMGFyYWIlMjBzdWl0ZSUyMHRlcnJhY2V8ZW58MXx8fHwxNzU2NTQyODkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    name: {
      ar: 'تجربة دبي الملكية',
      en: 'Dubai Royal Experience'
    },
    description: {
      ar: 'جناح رئاسي في برج العرب مع إطلالة على التراس',
      en: 'Burj Al Arab Presidential Suite terrace view'
    }
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1581873328926-829e53d85d06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBpbmZpbml0eSUyMHBvb2wlMjBjYWxkZXJhfGVufDF8fHx8MTc1NjU0Mjg5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    name: {
      ar: 'فيلا سانتوريني النخبوية',
      en: 'Santorini Elite Villa'
    },
    description: {
      ar: 'مسبح لا متناهي خاص يطل على الكالديرا',
      en: 'Private infinity pool overlooking Caldera'
    }
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1677886197692-483d0c53e9b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwbHV4dXJ5JTIwanVuZ2xlJTIwcmVzb3J0JTIwaGVsaXBhZHxlbnwxfHx8fDE3NTY1NDI4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    name: {
      ar: 'ملاذ بالي الحصري',
      en: 'Bali Exclusive Sanctuary'
    },
    description: {
      ar: 'منتجع غابات فائق الفخامة مع مهبط طائرات خاص',
      en: 'Ultra-luxury jungle retreat with private helipad'
    }
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1717241748627-ae30b53c3981?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxreW90byUyMHRyYWRpdGlvbmFsJTIwcnlva2FuJTIwbHV4dXJ5fGVufDF8fHx8MTc1NjU0Mjg5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    name: {
      ar: 'ريوكان يابانية متميزة',
      en: 'Japanese Ryokan Excellence'
    },
    description: {
      ar: 'إقامة تقليدية فاخرة في كيوتو',
      en: 'Traditional luxury accommodation in Kyoto'
    }
  }
]

export default function HeroCarousel({ language, themeColor, isDarkMode, onToggleBooking }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.3 })

  const heroContent = {
    ar: {
      headline: 'رحلات استثنائية تفوق كل التوقعات',
      subtitle: 'نحن نصمم تجارب سفر حصرية لا مثيل لها، حيث تلتقي الرفاهية بالإتقان والابتكار بالتقاليد العريقة في كل وجهة نقدمها',
      primaryAction: 'صمم رحلتك الحصرية',
      secondaryAction: 'استكشف مجموعتنا المميزة',
      scrollText: 'اكتشف المزيد'
    },
    en: {
      headline: 'Extraordinary Journeys Beyond All Expectations',
      subtitle: 'We craft unparalleled exclusive travel experiences where luxury meets perfection, and innovation embraces timeless traditions at every destination we offer',
      primaryAction: 'Design Your Exclusive Journey',
      secondaryAction: 'Explore Our Curated Collection',
      scrollText: 'Discover More'
    }
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % premiumDestinations.length)
    }, 9000) // 9-second sophisticated transitions

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % premiumDestinations.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + premiumDestinations.length) % premiumDestinations.length)
  }

  return (
    <section ref={elementRef} className="relative h-screen overflow-hidden bg-black">
      {/* Premium Background Carousel */}
      <div className="absolute inset-0">
        {premiumDestinations.map((destination, index) => (
          <div
            key={destination.id}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Parallax Zoom Effect */}
            <div className="w-full h-full transform scale-105 transition-transform duration-[9000ms] ease-out
              hover:scale-110">
              <ImageWithFallback
                src={destination.image}
                alt={destination.name[language]}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Premium Overlay Gradient - Lighter for better image visibility */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-black/20" />
            
            {/* Sophisticated Overlay Pattern - Much lighter */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Dynamic Theme Color Overlay */}
      <div 
        className="absolute inset-0 z-5 transition-all duration-1000 ease-in-out"
        style={{
          background: isDarkMode 
            ? `linear-gradient(135deg, ${themeColor}25 0%, ${themeColor}15 25%, ${themeColor}08 50%, ${themeColor}20 75%, ${themeColor}30 100%)`
            : `linear-gradient(135deg, ${themeColor}10 0%, ${themeColor}05 25%, transparent 50%, ${themeColor}08 75%, ${themeColor}15 100%)`,
          backdropFilter: isDarkMode ? 'blur(1px) brightness(0.9)' : 'blur(0.5px) brightness(1.05)'
        }}
      >
        {/* Animated Theme Pattern */}
        <div 
          className="absolute inset-0 opacity-30 transition-opacity duration-1000"
          style={{
            background: isDarkMode
              ? `radial-gradient(circle at 30% 80%, ${themeColor}20 0%, transparent 50%), 
                 radial-gradient(circle at 80% 20%, ${themeColor}25 0%, transparent 50%),
                 radial-gradient(circle at 40% 40%, ${themeColor}15 0%, transparent 50%)`
              : `radial-gradient(circle at 20% 90%, ${themeColor}08 0%, transparent 50%), 
                 radial-gradient(circle at 90% 10%, ${themeColor}12 0%, transparent 50%)`,
            animation: isDarkMode ? 'theme-pulse-dark 6s ease-in-out infinite' : 'theme-pulse-light 8s ease-in-out infinite'
          }}
        />
        
        {/* Theme Color Animation Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes theme-pulse-dark {
              0%, 100% { 
                opacity: 0.4;
                transform: scale(1);
              }
              50% { 
                opacity: 0.6;
                transform: scale(1.05);
              }
            }
            
            @keyframes theme-pulse-light {
              0%, 100% { 
                opacity: 0.2;
                transform: scale(1);
              }
              50% { 
                opacity: 0.4;
                transform: scale(1.02);
              }
            }
          `
        }} />
      </div>

      {/* Hero Content Architecture */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          {/* Simple Light Mode Theme Layout */}
          <div 
            className="max-w-6xl mx-auto relative transition-all duration-1000 ease-in-out"
            style={{
              background: isDarkMode 
                ? 'transparent' 
                : `linear-gradient(135deg, ${themeColor}08 0%, ${themeColor}12 25%, ${themeColor}06 50%, ${themeColor}10 75%, ${themeColor}08 100%)`,
              borderRadius: isDarkMode ? '0' : '2rem',
              padding: isDarkMode ? '0' : '3rem 2rem',
              backdropFilter: isDarkMode ? 'none' : 'blur(10px)',
              border: isDarkMode ? 'none' : `1px solid ${themeColor}20`,
              boxShadow: isDarkMode ? 'none' : `0 20px 80px ${themeColor}15, inset 0 0 0 1px ${themeColor}10`
            }}
          >
            {/* Premium Destination Tag */}
            <div className={`mb-8 ${getAnimationClass('fadeUp', isVisible)}`}>
              <div 
                className="inline-flex items-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-md 
                  border border-white/20 cursor-pointer transition-all duration-500 transform-gpu 
                  hover:scale-110 hover:bg-white/20 relative overflow-hidden group
                  shadow-lg hover:shadow-2xl"
                style={{
                  animation: 'destination-pulse 3s ease-in-out infinite, destination-float 4s ease-in-out infinite alternate',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${themeColor}20`
                  e.currentTarget.style.borderColor = `${themeColor}60`
                  e.currentTarget.style.boxShadow = `0 16px 64px ${themeColor}30, inset 0 0 0 1px ${themeColor}40`
                  e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                  e.currentTarget.style.boxShadow = ''
                  e.currentTarget.style.transform = 'scale(1) translateY(0px)'
                }}
              >
                {/* Background Glow Effect */}
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
                    transition-opacity duration-500 blur-xl"
                  style={{ backgroundColor: `${themeColor}30` }}
                />
                
                {/* Moving Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                  transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                  transition-transform duration-1000 ease-out rounded-full" />
                
                {/* Animated Map Pin Icon */}
                <div className="relative z-10 mr-3">
                  <MapPin 
                    className="w-5 h-5 text-white/80 group-hover:text-white transition-all duration-300
                      group-hover:scale-110 transform-gpu"
                    style={{
                      filter: `drop-shadow(0 0 8px ${themeColor}60)`,
                      animation: 'pin-bounce 2s ease-in-out infinite'
                    }}
                  />
                  
                  {/* Icon Glow Ring */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 
                      transition-opacity duration-500 animate-ping"
                    style={{ 
                      backgroundColor: themeColor,
                      transform: 'scale(1.5)'
                    }}
                  />
                </div>
                
                {/* Destination Name */}
                <span 
                  className="relative z-10 text-white/90 font-semibold tracking-wide
                    group-hover:text-white transition-all duration-300 group-hover:scale-105"
                  style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    filter: `drop-shadow(0 0 6px ${themeColor}40)`
                  }}
                >
                  {premiumDestinations[currentSlide].name[language]}
                </span>
                
                {/* Corner Accent Dots */}
                <div 
                  className="absolute top-1 right-1 w-2 h-2 rounded-full opacity-0 
                    group-hover:opacity-80 transition-opacity duration-500"
                  style={{ backgroundColor: themeColor }}
                />
                <div 
                  className="absolute bottom-1 left-1 w-2 h-2 rounded-full opacity-0 
                    group-hover:opacity-80 transition-opacity duration-500"
                  style={{ backgroundColor: themeColor }}
                />
                
                {/* Professional Animations */}
                <style dangerouslySetInnerHTML={{
                  __html: `
                    @keyframes destination-pulse {
                      0%, 100% { 
                        box-shadow: 0 0 20px rgba(255,255,255,0.1), 0 0 40px rgba(255,255,255,0.05);
                        border-color: rgba(255,255,255,0.2);
                      }
                      50% { 
                        box-shadow: 0 0 30px ${themeColor}20, 0 0 60px ${themeColor}10;
                        border-color: ${themeColor}40;
                      }
                    }
                    
                    @keyframes destination-float {
                      0% { transform: translateY(0px) translateX(0px); }
                      100% { transform: translateY(-3px) translateX(1px); }
                    }
                    
                    @keyframes pin-bounce {
                      0%, 100% { transform: translateY(0px) rotate(0deg); }
                      50% { transform: translateY(-2px) rotate(2deg); }
                    }
                  `
                }} />
              </div>
            </div>

            {/* Primary Headline with Simple Infinite Movement */}
            <h1 
              className={`md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight tracking-tight text-[48px] italic cursor-pointer transform-gpu hover:scale-105 px-8 py-4 rounded-2xl relative overflow-hidden group inline-block ${getAnimationClass('scale', isVisible)}`}
              style={{ 
                color: themeColor,
                animation: 'simple-move 3s ease-in-out infinite',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${isVisible ? '200ms' : '0ms'}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = themeColor
                e.currentTarget.style.color = 'white'
                e.currentTarget.style.textShadow = '0 0 20px rgba(255,255,255,0.5)'
                e.currentTarget.style.boxShadow = `0 16px 64px ${themeColor}60, inset 0 0 0 2px ${themeColor}`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = themeColor
                e.currentTarget.style.textShadow = 'none'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Moving Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                transition-transform duration-1000 ease-out" />
              
              {/* Headline Text */}
              <span className="relative z-10">
                {heroContent[language].headline}
              </span>
              
              {/* Corner Glow Effects */}
              <div 
                className="absolute top-2 left-2 w-16 h-16 rounded-full opacity-0 
                  group-hover:opacity-40 transition-opacity duration-500 blur-xl"
                style={{ backgroundColor: themeColor }}
              />
              <div 
                className="absolute bottom-2 right-2 w-16 h-16 rounded-full opacity-0 
                  group-hover:opacity-40 transition-opacity duration-500 blur-xl"
                style={{ backgroundColor: themeColor }}
              />
              
              {/* Simple Infinite Animation */}
              <style dangerouslySetInnerHTML={{
                __html: `
                  @keyframes simple-move {
                    0%, 100% { 
                      transform: translateY(0px) translateX(0px);
                    }
                    50% { 
                      transform: translateY(-2px) translateX(2px);
                    }
                  }
                `
              }} />
            </h1>
            
            {/* Premium Interactive Subtitle */}
            <div 
              className={`max-w-4xl mx-auto mb-12 ${getAnimationClass('fadeUp', isVisible)}`}
              style={{ 
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? '400ms' : '0ms'}`
              }}
            >
              <div 
                className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed 
                  cursor-pointer transition-all duration-500 transform-gpu
                  px-8 py-6 rounded-2xl relative overflow-hidden group
                  hover:scale-105 hover:text-white backdrop-blur-sm
                  border border-transparent hover:border-white/20"
                style={{
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${themeColor}15`
                  e.currentTarget.style.boxShadow = `0 16px 64px ${themeColor}20, inset 0 0 0 1px ${themeColor}30`
                  e.currentTarget.style.textShadow = `0 0 20px ${themeColor}40`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.textShadow = 'none'
                }}
              >
                {/* Animated Background Gradient */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor}10, ${themeColor}05, ${themeColor}15)`
                  }}
                />
                
                {/* Moving Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                  transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                  transition-transform duration-1000 ease-out" />
                
                {/* Subtitle Text */}
                <span className="relative z-10 block">
                  {heroContent[language].subtitle.split(' ').map((word, index) => (
                    <span
                      key={index}
                      className="inline-block mx-1 transition-all duration-300 hover:scale-110"
                      style={{
                        transitionDelay: `${index * 50}ms`
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = themeColor
                        e.target.style.textShadow = `0 0 15px ${themeColor}60`
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = ''
                        e.target.style.textShadow = 'none'
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
                
                {/* Corner Glow Effects */}
                <div 
                  className="absolute top-0 left-0 w-20 h-20 rounded-full opacity-0 
                    group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                  style={{ backgroundColor: themeColor }}
                />
                <div 
                  className="absolute bottom-0 right-0 w-20 h-20 rounded-full opacity-0 
                    group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                  style={{ backgroundColor: themeColor }}
                />
              </div>
            </div>

            {/* Premium Action Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-6 justify-center items-center ${getAnimationClass('bounce', isVisible)}`}
              style={{ 
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? '600ms' : '0ms'}`
              }}
            >
              <button
                onClick={onToggleBooking}
                className="group px-12 py-5 rounded-2xl font-bold text-white transition-all duration-500 
                  transform hover:scale-105 hover:shadow-2xl min-w-[280px] relative overflow-hidden
                  backdrop-blur-sm border border-white/20"
                style={{
                  background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                  boxShadow: `0 16px 64px ${themeColor}40`
                }}
              >
                <span className="relative z-10">{heroContent[language].primaryAction}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                  transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
              
              <button className="px-12 py-5 rounded-2xl font-bold text-white 
                border-2 border-white/30 backdrop-blur-md hover:bg-white/10 
                transition-all duration-500 transform hover:scale-105 min-w-[280px]
                hover:border-white/50 hover:shadow-xl">
                {heroContent[language].secondaryAction}
              </button>
            </div>

            {/* Destination Description */}
            <div 
              className={`mt-12 ${getAnimationClass('fadeUp', isVisible)}`}
              style={{ 
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? '800ms' : '0ms'}`
              }}
            >
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                {premiumDestinations[currentSlide].description[language]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Navigation Controls */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className={`absolute ${language === 'ar' ? 'right-8' : 'left-8'} top-1/2 -translate-y-1/2 z-20
          w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20
          flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300
          transform hover:scale-110 group cursor-pointer`}
      >
        {language === 'ar' ? (
          <ChevronRight className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <ChevronLeft className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
        )}
      </button>

      <button
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className={`absolute ${language === 'ar' ? 'left-8' : 'right-8'} top-1/2 -translate-y-1/2 z-20
          w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20
          flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300
          transform hover:scale-110 group cursor-pointer`}
      >
        {language === 'ar' ? (
          <ChevronLeft className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <ChevronRight className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
        )}
      </button>

      {/* Premium Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex space-x-6">
        {premiumDestinations.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className={`relative group transition-all duration-700 transform-gpu cursor-pointer ${
              index === currentSlide ? 'scale-150' : 'hover:scale-125'
            }`}
          >
            {/* Main Indicator Circle */}
            <div 
              className={`w-6 h-6 rounded-full border-2 transition-all duration-700 relative overflow-hidden ${
                index === currentSlide 
                  ? 'bg-white border-white shadow-2xl' 
                  : 'bg-white/20 border-white/40 hover:bg-white/40 hover:border-white/60'
              }`}
              style={{
                boxShadow: index === currentSlide 
                  ? `0 8px 32px rgba(255,255,255,0.3), 0 0 20px ${themeColor}40` 
                  : '0 4px 16px rgba(0,0,0,0.1)'
              }}
            >
              {/* Theme Color Inner Glow */}
              {index === currentSlide && (
                <div 
                  className="absolute inset-1 rounded-full animate-pulse"
                  style={{ backgroundColor: themeColor }}
                />
              )}
            </div>

            {/* Progress Ring - Only for Active Slide */}
            {index === currentSlide && isAutoPlaying && (
              <div className="absolute inset-0 rounded-full">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke={`${themeColor}60`}
                    strokeWidth="2"
                    strokeDasharray={`${2 * Math.PI * 10}`}
                    strokeDashoffset={`${2 * Math.PI * 10}`}
                    className="animate-pulse"
                    style={{
                      animation: 'progress-ring 9s linear infinite'
                    }}
                  />
                </svg>
              </div>
            )}

            {/* Progress Ring Animation */}
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes progress-ring {
                  0% {
                    stroke-dashoffset: ${2 * Math.PI * 10};
                  }
                  100% {
                    stroke-dashoffset: 0;
                  }
                }
              `
            }} />
          </button>
        ))}
      </div>
    </section>
  )
}