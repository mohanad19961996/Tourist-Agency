import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface HeroCarouselProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
}

const carouselImages = [
  {
    url: 'https://images.unsplash.com/photo-1620483829646-8fb1d8162108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMG92ZXJ3YXRlciUyMHZpbGxhJTIwc3Vuc2V0fGVufDF8fHx8MTc1NjUzOTE2NHww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Maldives Overwater Villa',
    location: { ar: 'جزر المالديف', en: 'Maldives' }
  },
  {
    url: 'https://images.unsplash.com/photo-1736144595832-1c3c997f9177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMGFscHMlMjBsdXh1cnklMjBjaGFsZXQlMjBzbm93fGVufDF8fHx8MTc1NjUzOTE2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Swiss Alps Luxury Chalet',
    location: { ar: 'جبال الألب السويسرية', en: 'Swiss Alps' }
  },
  {
    url: 'https://images.unsplash.com/photo-1727948539769-1151a581129d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGJ1cmolMjBhbCUyMGFyYWIlMjBnb2xkZW4lMjBza3lsaW5lfGVufDF8fHx8MTc1NjUzOTE3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Dubai Burj Al Arab',
    location: { ar: 'دبي', en: 'Dubai' }
  },
  {
    url: 'https://images.unsplash.com/photo-1637170556969-169f43457274?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjB3aGl0ZSUyMGFyY2hpdGVjdHVyZSUyMGJsdWUlMjBzZWF8ZW58MXx8fHwxNzU2NTM5MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Santorini White Architecture',
    location: { ar: 'سانتوريني', en: 'Santorini' }
  },
  {
    url: 'https://images.unsplash.com/photo-1668276490368-409a6002756d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwaW5maW5pdHklMjBwb29sJTIwdHJvcGljYWwlMjBqdW5nbGV8ZW58MXx8fHwxNzU2NTM5MTc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Bali Infinity Pool',
    location: { ar: 'بالي', en: 'Bali' }
  }
]

export default function HeroCarousel({ language, themeColor, isDarkMode }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const content = {
    ar: {
      headline: 'رحلات فاخرة إلى أجمل وجهات العالم',
      subheadline: 'نحن نحول أحلام السفر إلى تجارب استثنائية لا تُنسى مع أرقى الخدمات وأفضل الأسعار',
      primaryCTA: 'ابدأ رحلتك المثالية',
      secondaryCTA: 'استكشف العروض الحصرية'
    },
    en: {
      headline: 'Luxury Escapes to the World\'s Most Extraordinary Destinations',
      subheadline: 'We transform travel dreams into exceptional experiences with premium services and unbeatable value',
      primaryCTA: 'Start Your Perfect Journey',
      secondaryCTA: 'Discover Exclusive Offers'
    }
  }

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  return (
    <section className={`relative h-screen w-full overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${image.url})`,
                filter: 'brightness(0.7) contrast(1.1)'
              }}
            />
            {/* Gradient Overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(0,0,0,0.4) 0%, 
                  rgba(0,0,0,0.2) 30%, 
                  transparent 60%, 
                  rgba(0,0,0,0.3) 100%)`
              }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Hero Content Container */}
          <div 
            className="backdrop-blur-2xl rounded-3xl p-8 lg:p-12 border border-white/20
              transform hover:scale-[1.02] transition-all duration-700 ease-out"
            style={{
              background: `linear-gradient(135deg, 
                rgba(255,255,255,0.15) 0%, 
                rgba(255,255,255,0.05) 50%, 
                rgba(255,255,255,0.1) 100%)`,
              backdropFilter: 'blur(25px) saturate(180%)',
              boxShadow: `
                0 25px 80px rgba(0,0,0,0.3),
                0 0 60px ${themeColor}20,
                inset 0 1px 0 rgba(255,255,255,0.2),
                inset 0 -1px 0 rgba(0,0,0,0.1)
              `
            }}
          >
            {/* Location Badge */}
            <div 
              className="inline-flex items-center px-6 py-3 rounded-2xl mb-8 backdrop-blur-xl border border-white/30
                transform hover:scale-105 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${themeColor}30, ${themeColor}15)`,
                boxShadow: `0 0 30px ${themeColor}30, inset 0 1px 0 rgba(255,255,255,0.2)`
              }}
            >
              <span className="text-white font-medium">
                {carouselImages[currentSlide].location[language]}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              <span 
                className="bg-gradient-to-r from-white via-white to-gray-100 bg-clip-text text-transparent
                  drop-shadow-2xl"
              >
                {content[language].headline}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              {content[language].subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Primary CTA */}
              <button 
                className="group relative px-12 py-5 rounded-2xl overflow-hidden cursor-pointer
                  text-white font-semibold transform hover:scale-105 transition-all duration-300
                  shadow-2xl hover:shadow-3xl backdrop-blur-lg border border-white/30"
                style={{
                  background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}CC 100%)`,
                  boxShadow: `
                    0 0 40px ${themeColor}60, 
                    0 15px 40px rgba(0,0,0,0.3),
                    inset 0 2px 0 rgba(255,255,255,0.3)
                  `
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `
                    0 0 60px ${themeColor}80, 
                    0 20px 50px rgba(0,0,0,0.4),
                    inset 0 2px 0 rgba(255,255,255,0.4)
                  `
                  e.currentTarget.style.transform = 'scale(1.05) translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `
                    0 0 40px ${themeColor}60, 
                    0 15px 40px rgba(0,0,0,0.3),
                    inset 0 2px 0 rgba(255,255,255,0.3)
                  `
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/10 
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                />
                <span className="relative z-10">{content[language].primaryCTA}</span>
              </button>

              {/* Secondary CTA */}
              <button 
                className="group relative px-12 py-5 rounded-2xl overflow-hidden cursor-pointer
                  text-white font-semibold transform hover:scale-105 transition-all duration-300
                  shadow-xl hover:shadow-2xl backdrop-blur-xl border-2 border-white/40"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(255,255,255,0.2) 0%, 
                    rgba(255,255,255,0.1) 100%)`,
                  backdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: `
                    0 0 30px rgba(255,255,255,0.2), 
                    0 10px 30px rgba(0,0,0,0.2),
                    inset 0 1px 0 rgba(255,255,255,0.3)
                  `
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, 
                    rgba(255,255,255,0.3) 0%, 
                    rgba(255,255,255,0.15) 100%)`
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'
                  e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, 
                    rgba(255,255,255,0.2) 0%, 
                    rgba(255,255,255,0.1) 100%)`
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <span className="relative z-10">{content[language].secondaryCTA}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-4 rtl:space-x-reverse">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="group p-4 rounded-full backdrop-blur-xl border border-white/30 
              text-white hover:text-white transition-all duration-300
              transform hover:scale-110 hover:-translate-y-1 cursor-pointer"
            style={{
              background: `linear-gradient(135deg, 
                rgba(255,255,255,0.15) 0%, 
                rgba(255,255,255,0.05) 100%)`,
              backdropFilter: 'blur(20px)',
              boxShadow: `
                0 0 30px rgba(255,255,255,0.2),
                0 8px 25px rgba(0,0,0,0.3),
                inset 0 1px 0 rgba(255,255,255,0.2)
              `
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="flex space-x-3 rtl:space-x-reverse items-center px-6">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer
                  ${index === currentSlide ? 'scale-125' : 'scale-100 hover:scale-110'}`}
                style={{
                  backgroundColor: index === currentSlide ? themeColor : 'rgba(255,255,255,0.5)',
                  boxShadow: index === currentSlide 
                    ? `0 0 20px ${themeColor}60, inset 0 1px 0 rgba(255,255,255,0.3)`
                    : '0 0 10px rgba(255,255,255,0.3)'
                }}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="group p-4 rounded-full backdrop-blur-xl border border-white/30 
              text-white hover:text-white transition-all duration-300
              transform hover:scale-110 hover:-translate-y-1 cursor-pointer"
            style={{
              background: `linear-gradient(135deg, 
                rgba(255,255,255,0.15) 0%, 
                rgba(255,255,255,0.05) 100%)`,
              backdropFilter: 'blur(20px)',
              boxShadow: `
                0 0 30px rgba(255,255,255,0.2),
                0 8px 25px rgba(0,0,0,0.3),
                inset 0 1px 0 rgba(255,255,255,0.2)
              `
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}