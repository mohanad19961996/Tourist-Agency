import { useState, useEffect } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useScrollAnimation, getAnimationClass } from './useScrollAnimation'

interface TestimonialsSectionProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
}

// 6 Premium Testimonial Rotation
const premiumTestimonials = [
  {
    id: 1,
    name: { ar: 'سارة محمد الحمادي', en: 'Sarah Mohammed Al-Hamadi' },
    title: { ar: 'رئيسة تنفيذية', en: 'CEO' },
    location: { ar: 'الإمارات العربية المتحدة', en: 'United Arab Emirates' },
    rating: 5,
    destination: { ar: 'المالديف', en: 'Maldives' },
    tripDate: { ar: 'أبريل 2024', en: 'April 2024' },
    review: {
      ar: 'تجربة استثنائية تفوق كل التوقعات! من اللحظة الأولى للحجز وحتى العودة، كان كل شيء مثالياً. الفيلا المائية كانت أكثر من رائعة والخدمة الشخصية جعلتني أشعر وكأنني أميرة. بالتأكيد سأعود لحجز رحلتي القادمة معهم.',
      en: 'An exceptional experience beyond all expectations! From the first moment of booking until return, everything was perfect. The overwater villa was more than amazing and the personal service made me feel like a princess. I will definitely return to book my next trip with them.'
    },
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612d7c8?w=150&h=150&fit=crop&crop=face',
    verified: true,
    tripType: { ar: 'رحلة رومانسية', en: 'Romantic Getaway' }
  },
  {
    id: 2,
    name: { ar: 'ديفيد أندرسون', en: 'David Anderson' },
    title: { ar: 'مدير استثمار', en: 'Investment Manager' },
    location: { ar: 'الولايات المتحدة الأمريكية', en: 'United States' },
    rating: 5,
    destination: { ar: 'سويسرا', en: 'Switzerland' },
    tripDate: { ar: 'مارس 2024', en: 'March 2024' },
    review: {
      ar: 'مستوى الفخامة والاهتمام بالتفاصيل لا يصدق! الشاليه في جبال الألب كان حلماً يتحقق، والطيران الخاص جعل الرحلة مريحة للغاية. فريق العمل متمرس ومحترف، وكل ترتيب كان مثالياً. أنصح بها بشدة لمن يبحث عن التميز.',
      en: 'The level of luxury and attention to detail is incredible! The chalet in the Alps was a dream come true, and the private flight made the trip extremely comfortable. The team is experienced and professional, and every arrangement was perfect. I highly recommend it for those seeking excellence.'
    },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    verified: true,
    tripType: { ar: 'رحلة عائلية', en: 'Family Vacation' }
  },
  {
    id: 3,
    name: { ar: 'يوكي تاناكا', en: 'Yuki Tanaka' },
    title: { ar: 'مديرة تسويق', en: 'Marketing Director' },
    location: { ar: 'اليابان', en: 'Japan' },
    rating: 5,
    destination: { ar: 'دبي', en: 'Dubai' },
    tripDate: { ar: 'فبراير 2024', en: 'February 2024' },
    review: {
      ar: 'الضيافة العربية الأصيلة مع لمسة عصرية فاخرة! الجناح في برج العرب كان مذهلاً، والمرشد الشخصي جعل استكشاف دبي تجربة لا تُنسى. كل التفاصيل مدروسة بعناية فائقة، من وجبات الطعام الاستثنائية إلى النقل الفاخر.',
      en: 'Authentic Arabian hospitality with a luxurious modern touch! The suite at Burj Al Arab was stunning, and the personal guide made exploring Dubai an unforgettable experience. Every detail is carefully thought out, from exceptional meals to luxury transportation.'
    },
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    verified: true,
    tripType: { ar: 'رحلة أعمال فاخرة', en: 'Luxury Business Trip' }
  },
  {
    id: 4,
    name: { ar: 'مارتا جونزاليس', en: 'Marta González' },
    title: { ar: 'طبيبة', en: 'Doctor' },
    location: { ar: 'إسبانيا', en: 'Spain' },
    rating: 5,
    destination: { ar: 'بالي', en: 'Bali' },
    tripDate: { ar: 'يناير 2024', en: 'January 2024' },
    review: {
      ar: 'منتجع وسط الغابة المطيرة كان أشبه بالجنة على الأرض! الفيلا الخاصة مع المسبح اللامتناهي والإطلالة الخلابة جعلتني أشعر بالسلام الداخلي. خدمة السبا كانت استثنائية، وكل يوم كان مليئاً بالمفاجآت الجميلة.',
      en: 'The resort in the rainforest was like paradise on earth! The private villa with infinity pool and stunning views made me feel inner peace. The spa service was exceptional, and every day was full of beautiful surprises.'
    },
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    verified: true,
    tripType: { ar: 'رحلة استجمام', en: 'Wellness Retreat' }
  },
  {
    id: 5,
    name: { ar: 'أليكس مولر', en: 'Alex Müller' },
    title: { ar: 'مهندس معماري', en: 'Architect' },
    location: { ar: 'ألمانيا', en: 'Germany' },
    rating: 5,
    destination: { ar: 'اليابان', en: 'Japan' },
    tripDate: { ar: 'ديسمبر 2023', en: 'December 2023' },
    review: {
      ar: 'رحلة ثقافية عميقة إلى قلب التراث الياباني! الإقامة في الريوكان التقليدي مع الحمامات الساخنة الطبيعية كانت تجربة روحانية حقيقية. المرشد المحلي كان موسوعة ثقافية، وكل معبد زرناه حكى قصة حضارة عريقة.',
      en: 'A deep cultural journey to the heart of Japanese heritage! Staying at the traditional ryokan with natural hot springs was a true spiritual experience. The local guide was a cultural encyclopedia, and every temple we visited told a story of ancient civilization.'
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    verified: true,
    tripType: { ar: 'رحلة ثقافية', en: 'Cultural Journey' }
  },
  {
    id: 6,
    name: { ar: 'إيميلي روبرتس', en: 'Emily Roberts' },
    title: { ar: 'محامية', en: 'Lawyer' },
    location: { ar: 'أستراليا', en: 'Australia' },
    rating: 5,
    destination: { ar: 'سانتوريني', en: 'Santorini' },
    tripDate: { ar: 'نوفمبر 2023', en: 'November 2023' },
    review: {
      ar: 'غروب الشمس من الفيلا الخاصة في سانتوريني كان أجمل منظر رأيته في حياتي! كل تفصيل في الرحلة كان مخطط له بدقة متناهية. من النقل الخاص إلى العشاء الرومانسي على المنحدرات، كانت تجربة أحلام تتحقق على أرض الواقع.',
      en: 'The sunset from the private villa in Santorini was the most beautiful sight I have ever seen! Every detail of the trip was planned with utmost precision. From private transportation to romantic dinner on the cliffs, it was a dream experience coming true.'
    },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    verified: true,
    tripType: { ar: 'شهر عسل', en: 'Honeymoon' }
  }
]

// Elegant Testimonial Card Component
function TestimonialCard({ 
  testimonial, 
  language, 
  themeColor, 
  isDarkMode, 
  isActive, 
  content,
  isTransitioning,
  animationDirection 
}: {
  testimonial: any
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
  isActive: boolean
  content: any
  isTransitioning?: boolean
  animationDirection?: 'left' | 'right'
}) {
  return (
    <div className={`relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-600/50 overflow-hidden transition-all duration-500 ${
      isActive ? 'w-96 h-80 testimonial-glow' : 'w-80 h-72'
    } ${isActive && !isTransitioning ? 'testimonial-enter' : ''}`}
    style={{
      transform: isTransitioning && isActive 
        ? animationDirection === 'right' 
          ? language === 'ar' ? 'translateX(-50px) scale(0.95)' : 'translateX(50px) scale(0.95)'
          : language === 'ar' ? 'translateX(50px) scale(0.95)' : 'translateX(-50px) scale(0.95)'
        : 'translateX(0) scale(1)',
      opacity: isTransitioning && isActive ? 0.7 : 1,
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }}>
      
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ 
          background: `linear-gradient(135deg, ${themeColor}20, transparent)` 
        }} 
      />

      {/* Quote Icon */}
      <div className={`absolute top-4 ${language === 'ar' ? 'right-4' : 'left-4'} w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300`}
        style={{ backgroundColor: `${themeColor}20` }}>
        <Quote className="w-5 h-5" style={{ color: themeColor }} />
      </div>

      <div className={`p-6 ${isActive ? 'pt-16' : 'pt-14'} h-full flex flex-col`}>
        
        {/* Rating */}
        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star 
              key={index} 
              className="w-4 h-4 text-yellow-400" 
              fill="currentColor" 
            />
          ))}
        </div>

        {/* Review Text - Truncated for smaller cards */}
        <blockquote className={`leading-relaxed mb-4 flex-1 overflow-hidden ${
          isActive ? 'text-base' : 'text-sm'
        }`}
          style={{ 
            color: isDarkMode ? '#ffffff' : '#1f2937',
            display: '-webkit-box',
            WebkitLineClamp: isActive ? 4 : 3,
            WebkitBoxOrient: 'vertical'
          }}
        >
          "{testimonial.review[language]}"
        </blockquote>

        {/* Client Info - Compact */}
        <div className="mt-auto">
          <div className="flex items-center">
            
            {/* Avatar */}
            <div className="relative">
              <ImageWithFallback
                src={testimonial.avatar}
                alt={testimonial.name[language]}
                className={`rounded-full object-cover border-2 border-white/50 shadow-sm ${
                  isActive ? 'w-12 h-12' : 'w-10 h-10'
                }`}
              />
              {testimonial.verified && (
                <div className={`absolute -bottom-1 -right-1 rounded-full flex items-center justify-center ${
                  isActive ? 'w-5 h-5' : 'w-4 h-4'
                }`}
                  style={{ backgroundColor: themeColor }}>
                  <Star className={`text-white ${isActive ? 'w-2.5 h-2.5' : 'w-2 h-2'}`} fill="currentColor" />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="ml-3 flex-1 min-w-0">
              <h4 className={`font-bold text-gray-900 dark:text-white truncate ${
                isActive ? 'text-sm' : 'text-xs'
              }`}>
                {testimonial.name[language]}
              </h4>
              <p className={`text-gray-600 dark:text-gray-400 truncate ${
                isActive ? 'text-xs' : 'text-xs'
              }`}>
                {testimonial.title[language]}
              </p>
            </div>

            {/* Destination */}
            <div className={`text-right ${
              isActive ? 'text-xs' : 'text-xs'
            }`}>
              <div className="font-semibold truncate" style={{ color: themeColor }}>
                {testimonial.destination[language]}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Card Glow Effect */}
      {isActive && (
        <div 
          className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
          style={{ 
            boxShadow: `inset 0 0 20px ${themeColor}40, 0 0 40px ${themeColor}20` 
          }} 
        />
      )}
    </div>
  )
}

export default function TestimonialsSection({ language, themeColor, isDarkMode }: TestimonialsSectionProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('right')
  const { elementRef, isVisible } = useScrollAnimation()

  const content = {
    ar: {
      header: 'شهادات عملائنا المميزين',
      subtitle: 'استمع إلى قصص نجاح عملائنا وتجاربهم الاستثنائية التي تعكس التزامنا بتقديم أفضل الخدمات',
      verified: 'رحلة موثقة',
      next: 'التالي',
      previous: 'السابق'
    },
    en: {
      header: 'Distinguished Client Testimonials',
      subtitle: 'Listen to our clients\' success stories and exceptional experiences that reflect our commitment to providing the finest services',
      verified: 'Verified Trip',
      next: 'Next',
      previous: 'Previous'
    }
  }

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % premiumTestimonials.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setAnimationDirection('right')
    
    setTimeout(() => {
      setActiveTestimonial((prev) => (prev + 1) % premiumTestimonials.length)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 300)
  }

  const prevTestimonial = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setAnimationDirection('left')
    
    setTimeout(() => {
      setActiveTestimonial((prev) => (prev - 1 + premiumTestimonials.length) % premiumTestimonials.length)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 300)
  }

  const goToTestimonial = (index: number) => {
    if (isTransitioning || index === activeTestimonial) return
    setIsTransitioning(true)
    setAnimationDirection(index > activeTestimonial ? 'right' : 'left')
    
    setTimeout(() => {
      setActiveTestimonial(index)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 300)
  }

  const currentTestimonial = premiumTestimonials[activeTestimonial]

  return (
    <section ref={elementRef} className={`py-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="grid grid-cols-12 gap-8 transform rotate-12 scale-150">
          {Array.from({ length: 48 }).map((_, index) => (
            <Quote key={index} className="w-6 h-6 text-gray-400" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Compact Header */}
        <div className={`text-center mb-12 ${getAnimationClass('fadeUp', isVisible)}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 mb-6">
            <Star className="w-4 h-4 mr-2 text-yellow-500" fill="currentColor" />
            <span className="text-sm font-semibold" style={{ color: themeColor }}>
              {language === 'ar' ? 'تقييمات متميزة' : 'Premium Reviews'}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
            style={{ 
              color: themeColor,
              textShadow: isDarkMode 
                ? `0 0 20px ${themeColor}40, 0 4px 8px rgba(0,0,0,0.3)` 
                : `0 4px 8px rgba(0,0,0,0.1)`
            }}
          >
            {content[language].header}
          </h2>
          
          <p className="text-lg max-w-3xl mx-auto leading-relaxed opacity-80"
            style={{ 
              color: isDarkMode ? 'rgba(156, 163, 175, 1)' : themeColor
            }}
          >
            {content[language].subtitle}
          </p>
        </div>

        {/* Elegant Carousel with Side Preview */}
        <div className={`relative max-w-5xl mx-auto perspective-1000 ${getAnimationClass('scale', isVisible)}`} style={{ 
          transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? '300ms' : '0ms'}`
        }}>
          
          {/* Navigation Controls */}
          <button
            onClick={prevTestimonial}
            disabled={isTransitioning}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 z-30
              w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl
              flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-white transition-all duration-300
              transform hover:scale-110 group cursor-pointer border border-gray-200/50 dark:border-gray-600/50
              ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{
              transform: isTransitioning ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!isTransitioning) {
                setIsAutoPlaying(false)
                e.currentTarget.style.backgroundColor = themeColor
                e.currentTarget.style.boxShadow = `0 0 25px ${themeColor}40`
              }
            }}
            onMouseLeave={(e) => {
              setIsAutoPlaying(true)
              e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)'
              e.currentTarget.style.boxShadow = ''
            }}
          >
            <ChevronLeft className={`w-5 h-5 transition-transform duration-300 ${
              isTransitioning ? 'scale-90' : 'group-hover:scale-110'
            }`} />
          </button>

          <button
            onClick={nextTestimonial}
            disabled={isTransitioning}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className={`absolute ${language === 'ar' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 z-30
              w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl
              flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-white transition-all duration-300
              transform hover:scale-110 group cursor-pointer border border-gray-200/50 dark:border-gray-600/50
              ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{
              transform: isTransitioning ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!isTransitioning) {
                setIsAutoPlaying(false)
                e.currentTarget.style.backgroundColor = themeColor
                e.currentTarget.style.boxShadow = `0 0 25px ${themeColor}40`
              }
            }}
            onMouseLeave={(e) => {
              setIsAutoPlaying(true)
              e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)'
              e.currentTarget.style.boxShadow = ''
            }}
          >
            <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
              isTransitioning ? 'scale-90' : 'group-hover:scale-110'
            }`} />
          </button>

          {/* Cards Container */}
          <div className="relative flex items-center justify-center min-h-[400px]"
               style={{
                 transform: isTransitioning 
                   ? animationDirection === 'right' 
                     ? 'translateX(-10px)' 
                     : 'translateX(10px)'
                   : 'translateX(0)',
                 transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
               }}>
            
            {/* Previous Card (Blurred, Smaller, Left Side) */}
            <div className={`absolute ${language === 'ar' ? 'right-0' : 'left-0'} top-8 z-10 transform-gpu transition-all duration-700 ease-out
              scale-75 blur-sm opacity-60 hover:scale-80 hover:blur-none hover:opacity-80 cursor-pointer`}
              onClick={prevTestimonial}
              style={{ 
                transform: `${language === 'ar' ? 'translateX(25%)' : 'translateX(-25%)'} translateY(10%) scale(0.75)`,
                filter: 'blur(2px)',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              <TestimonialCard 
                testimonial={premiumTestimonials[(activeTestimonial - 1 + premiumTestimonials.length) % premiumTestimonials.length]}
                language={language}
                themeColor={themeColor}
                isDarkMode={isDarkMode}
                isActive={false}
                content={content}
                isTransitioning={isTransitioning}
                animationDirection={animationDirection}
              />
            </div>

            {/* Active Card (Center, Full Size) */}
            <div className="relative z-20 transform-gpu transition-all duration-700 ease-out scale-100"
                 style={{
                   animation: !isTransitioning ? 'testimonialFadeIn 0.6s ease-out' : 'none'
                 }}>
              <TestimonialCard 
                testimonial={currentTestimonial}
                language={language}
                themeColor={themeColor}
                isDarkMode={isDarkMode}
                isActive={true}
                content={content}
                isTransitioning={isTransitioning}
                animationDirection={animationDirection}
              />
            </div>

            {/* Next Card (Blurred, Smaller, Right Side) */}
            <div className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} top-8 z-10 transform-gpu transition-all duration-700 ease-out
              scale-75 blur-sm opacity-60 hover:scale-80 hover:blur-none hover:opacity-80 cursor-pointer`}
              onClick={nextTestimonial}
              style={{ 
                transform: `${language === 'ar' ? 'translateX(-25%)' : 'translateX(25%)'} translateY(10%) scale(0.75)`,
                filter: 'blur(2px)',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              <TestimonialCard 
                testimonial={premiumTestimonials[(activeTestimonial + 1) % premiumTestimonials.length]}
                language={language}
                themeColor={themeColor}
                isDarkMode={isDarkMode}
                isActive={false}
                content={content}
                isTransitioning={isTransitioning}
                animationDirection={animationDirection}
              />
            </div>
          </div>
        </div>

        {/* Elegant Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {premiumTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              disabled={isTransitioning}
              className={`relative transition-all duration-500 cursor-pointer ${
                index === activeTestimonial ? 'scale-125' : 'hover:scale-110'
              } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className={`w-3 h-3 rounded-full border transition-all duration-500 ${
                index === activeTestimonial 
                  ? 'shadow-lg transform scale-125' 
                  : 'bg-gray-300 dark:bg-gray-600 border-gray-400 dark:border-gray-500 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`} style={{
                backgroundColor: index === activeTestimonial ? themeColor : undefined,
                borderColor: index === activeTestimonial ? themeColor : undefined,
                boxShadow: index === activeTestimonial ? `0 0 15px ${themeColor}60` : undefined
              }} />
              
              {/* Subtle Progress Indicator */}
              {index === activeTestimonial && isAutoPlaying && !isTransitioning && (
                <div className="absolute inset-0 rounded-full">
                  <div 
                    className="w-full h-full rounded-full border border-transparent animate-spin opacity-60"
                    style={{
                      borderTopColor: themeColor,
                      animationDuration: '8s',
                      animationIterationCount: 'infinite',
                      animationTimingFunction: 'linear'
                    }}
                  />
                </div>
              )}
              
              {/* Transition Indicator */}
              {isTransitioning && (
                <div className="absolute inset-0 rounded-full">
                  <div 
                    className="w-full h-full rounded-full border-2 border-transparent animate-pulse"
                    style={{
                      borderTopColor: `${themeColor}80`,
                      animationDuration: '0.5s'
                    }}
                  />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Compact Client Avatars */}
        <div className="mt-8 flex justify-center space-x-3">
          {premiumTestimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => goToTestimonial(index)}
              disabled={isTransitioning}
              className={`group relative transition-all duration-500 cursor-pointer ${
                index === activeTestimonial ? 'scale-110' : 'hover:scale-105'
              } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{
                transform: index === activeTestimonial && !isTransitioning 
                  ? 'scale(1.1) translateY(-2px)' 
                  : index === activeTestimonial && isTransitioning 
                    ? 'scale(1.05) translateY(0px)' 
                    : 'scale(1) translateY(0px)',
                transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              <ImageWithFallback
                src={testimonial.avatar}
                alt={testimonial.name[language]}
                className={`w-12 h-12 rounded-full object-cover border-2 transition-all duration-500 ${
                  index === activeTestimonial 
                    ? 'shadow-lg opacity-100' 
                    : 'border-gray-300 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500 opacity-60 hover:opacity-80'
                }`}
                style={{
                  borderColor: index === activeTestimonial ? themeColor : undefined,
                  boxShadow: index === activeTestimonial ? `0 0 20px ${themeColor}40` : undefined
                }}
              />
              
              {/* Verified Badge for Active */}
              {testimonial.verified && index === activeTestimonial && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ 
                    backgroundColor: themeColor,
                    transform: isTransitioning ? 'scale(0.8)' : 'scale(1)',
                    boxShadow: `0 0 10px ${themeColor}60`
                  }}>
                  <Star className="w-2 h-2 text-white" fill="currentColor" />
                </div>
              )}
              
              {/* Active Ring Indicator */}
              {index === activeTestimonial && !isTransitioning && (
                <div 
                  className="absolute inset-0 rounded-full border-2 opacity-60 animate-pulse"
                  style={{ 
                    borderColor: themeColor,
                    animationDuration: '2s'
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}