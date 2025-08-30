import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Plane, 
  Building, 
  MapPin, 
  Car, 
  Shield, 
  Calendar, 
  Headphones, 
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle
} from 'lucide-react'
import CarouselLoadingSpinner from './CarouselLoadingSpinner'
import { useScrollAnimation, getAnimationClass } from './useScrollAnimation'


interface ServicesCarouselProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
}

// 8-Service Premium Carousel
const luxuryServices = [
  {
    id: 1,
    icon: Plane,
    name: { 
      ar: 'الطيران الخاص والدرجة الأولى', 
      en: 'Private Aviation & First-Class Travel' 
    },
    description: { 
      ar: 'طيران خاص وتذاكر درجة أولى مع أرقى شركات الطيران العالمية لضمان تجربة سفر استثنائية لا مثيل لها',
      en: 'Private jets and first-class tickets with world\'s finest airlines ensuring an unparalleled travel experience of absolute luxury'
    },
    features: [
      { ar: 'طائرات خاصة فاخرة', en: 'Luxury private jets' },
      { ar: 'درجة أولى حصرية', en: 'Exclusive first-class' },
      { ar: 'صالات كبار الشخصيات', en: 'VIP airport lounges' },
      { ar: 'خدمة مضيفين شخصيين', en: 'Personal flight attendants' }
    ],
    gradient: 'from-blue-500 to-indigo-600',
    bgPattern: '🛩️'
  },
  {
    id: 2,
    icon: Building,
    name: { 
      ar: 'إقامات فندقية استثنائية', 
      en: 'Extraordinary Hotel Accommodations' 
    },
    description: { 
      ar: 'أجنحة رئاسية وفيلات خاصة في أفخم الفنادق والمنتجعات العالمية مع خدمات متميزة على مدار الساعة',
      en: 'Presidential suites and private villas in the world\'s most luxurious hotels and resorts with exceptional 24/7 services'
    },
    features: [
      { ar: 'أجنحة رئاسية حصرية', en: 'Exclusive presidential suites' },
      { ar: 'فيلات خاصة مع مسابح', en: 'Private villas with pools' },
      { ar: 'خدمة الإسنقبال الشخصي', en: 'Personal concierge service' },
      { ar: 'إطلالات بانورامية خلابة', en: 'Breathtaking panoramic views' }
    ],
    gradient: 'from-amber-500 to-orange-600',
    bgPattern: '🏨'
  },
  {
    id: 3,
    icon: MapPin,
    name: { 
      ar: 'جولات مرشدة حصرية', 
      en: 'Exclusive Guided Experiences' 
    },
    description: { 
      ar: 'جولات خاصة مع مرشدين خبراء معتمدين لاستكشاف أسرار الوجهات السياحية والمعالم التاريخية النادرة',
      en: 'Private tours with certified expert guides to explore destination secrets and rare historical landmarks'
    },
    features: [
      { ar: 'مرشدين خبراء محليين', en: 'Expert local guides' },
      { ar: 'جولات خاصة مخصصة', en: 'Customized private tours' },
      { ar: 'دخول حصري للمعالم', en: 'Exclusive landmark access' },
      { ar: 'تجارب ثقافية أصيلة', en: 'Authentic cultural experiences' }
    ],
    gradient: 'from-emerald-500 to-teal-600',
    bgPattern: '🗺️'
  },
  {
    id: 4,
    icon: Car,
    name: { 
      ar: 'خدمات النقل الفاخرة', 
      en: 'Luxury Transportation Services' 
    },
    description: { 
      ar: 'أسطول من السيارات الفاخرة واليخوت الخاصة مع سائقين محترفين لتنقلات آمنة ومريحة في جميع الأوقات',
      en: 'Fleet of luxury vehicles and private yachts with professional chauffeurs for safe and comfortable transfers at all times'
    },
    features: [
      { ar: 'ليموزين وسيارات فاخرة', en: 'Limousines & luxury cars' },
      { ar: 'يخوت خاصة للرحلات', en: 'Private yachts for cruises' },
      { ar: 'سائقين محترفين', en: 'Professional chauffeurs' },
      { ar: 'خدمة على مدار الساعة', en: '24/7 transportation service' }
    ],
    gradient: 'from-purple-500 to-pink-600',
    bgPattern: '🚗'
  },
  {
    id: 5,
    icon: Shield,
    name: { 
      ar: 'التأمين الشامل المتقدم', 
      en: 'Advanced Comprehensive Insurance' 
    },
    description: { 
      ar: 'تغطية تأمينية شاملة ومتقدمة تشمل الطوارئ الطبية والإلغاءات مع دعم عالمي فوري في جميع الظروف',
      en: 'Comprehensive and advanced insurance coverage including medical emergencies and cancellations with instant global support'
    },
    features: [
      { ar: 'تأمين طبي شامل', en: 'Comprehensive medical coverage' },
      { ar: 'تغطية إلغاء الرحلات', en: 'Trip cancellation coverage' },
      { ar: 'دعم طوارئ عالمي', en: 'Global emergency support' },
      { ar: 'تأمين الأمتعة والممتلكات', en: 'Luggage & property insurance' }
    ],
    gradient: 'from-red-500 to-rose-600',
    bgPattern: '🛡️'
  },
  {
    id: 6,
    icon: Calendar,
    name: { 
      ar: 'التخطيط المخصص للرحلات', 
      en: 'Bespoke Itinerary Design' 
    },
    description: { 
      ar: 'تصميم برامج سياحية مخصصة بالكامل وفقاً لتفضيلاتك الشخصية واهتماماتك مع اهتمام فائق بأدق التفاصيل',
      en: 'Fully customized travel programs designed according to your personal preferences and interests with supreme attention to detail'
    },
    features: [
      { ar: 'برامج مخصصة بالكامل', en: 'Fully customized programs' },
      { ar: 'مخططين خبراء للسفر', en: 'Expert travel planners' },
      { ar: 'تجارب فريدة حصرية', en: 'Unique exclusive experiences' },
      { ar: 'مرونة كاملة في التعديل', en: 'Complete flexibility for changes' }
    ],
    gradient: 'from-cyan-500 to-blue-600',
    bgPattern: '📅'
  },
  {
    id: 7,
    icon: Headphones,
    name: { 
      ar: 'الدعم العالمي على مدار الساعة', 
      en: 'Global 24/7 Concierge Support' 
    },
    description: { 
      ar: 'فريق دعم متخصص متاح على مدار الساعة لتلبية جميع احتياجاتك وحل أي تحديات قد تواجهها أثناء رحلتك',
      en: 'Specialized support team available 24/7 to meet all your needs and resolve any challenges you may face during your journey'
    },
    features: [
      { ar: 'دعم متعدد اللغات', en: 'Multilingual support' },
      { ar: 'استجابة فورية', en: 'Instant response' },
      { ar: 'حلول مخصصة', en: 'Customized solutions' },
      { ar: 'خط ساخن مخصص', en: 'Dedicated hotline' }
    ],
    gradient: 'from-indigo-500 to-purple-600',
    bgPattern: '🎧'
  },
  {
    id: 8,
    icon: UserCheck,
    name: { 
      ar: 'خدمات الاستقبال والمغادرة', 
      en: 'Arrival & Departure Assistance' 
    },
    description: { 
      ar: 'خدمات استقبال ومغادرة فاخرة في المطارات مع مرافقين شخصيين لضمان انتقالات سلسة ومريحة بدون أي عناء',
      en: 'Luxury arrival and departure services at airports with personal escorts ensuring smooth and comfortable transitions effortlessly'
    },
    features: [
      { ar: 'استقبال شخصي بالمطار', en: 'Personal airport reception' },
      { ar: 'مساعدة في إجراءات السفر', en: 'Travel procedures assistance' },
      { ar: 'صالات كبار الشخصيات', en: 'VIP airport lounges' },
      { ar: 'خدمة الأمتعة الفاخرة', en: 'Luxury luggage service' }
    ],
    gradient: 'from-green-500 to-emerald-600',
    bgPattern: '✈️'
  }
]

export default function ServicesCarousel({ language, themeColor, isDarkMode }: ServicesCarouselProps) {
  const [activeService, setActiveService] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [direction, setDirection] = useState(0)
  const { elementRef, isVisible } = useScrollAnimation()

  const content = {
    ar: {
      header: 'منظومة خدماتنا الفاخرة الشاملة',
      subtitle: 'نقدم مجموعة متكاملة من الخدمات الفاخرة المصممة لتلبية أعلى التوقعات وضمان تجربة سفر لا مثيل لها',
      exploreService: 'استكشف الخدمة',
      learnMore: 'تعرف على المزيد',
      loadingServices: 'تحميل الخدمات الفاخرة'
    },
    en: {
      header: 'Our Comprehensive Luxury Service Ecosystem',
      subtitle: 'We offer an integrated suite of luxury services designed to exceed the highest expectations and ensure an unparalleled travel experience',
      exploreService: 'Explore Service',
      learnMore: 'Learn More',
      loadingServices: 'Loading Premium Services'
    }
  }

  // Loading simulation - Extended for better visibility
  useEffect(() => {
    if (!isLoading) return

    const loadingInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          // Keep loading for a bit longer to show completion
          setTimeout(() => setIsLoading(false), 800)
          clearInterval(loadingInterval)
          return 100
        }
        return prev + 5 // Slower increment: 5% instead of 10%
      })
    }, 300) // Slower interval: 300ms instead of 150ms

    return () => clearInterval(loadingInterval)
  }, [isLoading])

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || isLoading) return

    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % luxuryServices.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isLoading])

  const nextService = () => {
    setDirection(1)
    setActiveService((prev) => (prev + 1) % luxuryServices.length)
  }

  const prevService = () => {
    setDirection(-1)
    setActiveService((prev) => (prev - 1 + luxuryServices.length) % luxuryServices.length)
  }

  const goToService = (index: number) => {
    if (index === activeService) return
    setDirection(index > activeService ? 1 : -1)
    setActiveService(index)
  }

  const triggerLoading = () => {
    setIsLoading(true)
    setLoadingProgress(0)
  }

  const currentService = luxuryServices[activeService]
  const ServiceIcon = currentService.icon

  // Simple slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const featureVariants = {
    hidden: { 
      opacity: 0, 
      y: 10 
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  }

  return (
    <section ref={elementRef} className={`py-24 bg-white dark:bg-gray-950 relative overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0"
            style={{
              background: isDarkMode 
                ? `linear-gradient(135deg, rgba(3, 7, 18, 0.95) 0%, rgba(3, 7, 18, 0.9) 100%)`
                : `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)`,
              backdropFilter: 'blur(8px)'
            }}
          />
          <div className="relative z-10">
            <CarouselLoadingSpinner
              language={language}
              themeColor={themeColor}
              isDarkMode={isDarkMode}
              size="lg"
              variant="premium"
              message={content[language].loadingServices}
              progress={loadingProgress}
              showProgress={true}
            />
          </div>
        </div>
      )}
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="text-[200px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out">
          {currentService.bgPattern}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Premium Header */}
        <div className={`text-center mb-20 ${getAnimationClass('fadeUp', isVisible)}`}>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 backdrop-blur-sm border border-gray-200 dark:border-gray-700 mb-8">
            <ServiceIcon className="w-5 h-5 mr-2" style={{ color: themeColor }} />
            <span className="text-sm font-semibold" style={{ color: themeColor }}>
              {language === 'ar' ? 'خدمات متميزة' : 'Premium Services'}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ 
              color: themeColor,
              textShadow: isDarkMode 
                ? `0 0 20px ${themeColor}40, 0 4px 8px rgba(0,0,0,0.3)` 
                : `0 4px 8px rgba(0,0,0,0.1)`
            }}
          >
            {content[language].header}
          </h2>
          
          <p className="text-xl max-w-4xl mx-auto leading-relaxed"
            style={{ 
              color: isDarkMode ? 'rgba(156, 163, 175, 1)' : themeColor,
              opacity: isDarkMode ? 1 : 0.8
            }}
          >
            {content[language].subtitle}
          </p>
        </div>

        {/* Main Service Display */}
        <div className={`relative ${getAnimationClass('scale', isVisible)}`} style={{ 
          transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? '300ms' : '0ms'}`
        }}>
          
          {/* Navigation Controls */}
          <button
            onClick={prevService}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className={`absolute ${language === 'ar' ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 z-20
              w-16 h-16 rounded-full bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700
              flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-white transition-all duration-300
              group cursor-pointer`}
            onMouseEnter={(e) => {
              setIsAutoPlaying(false)
              e.currentTarget.style.backgroundColor = themeColor
              e.currentTarget.style.boxShadow = `0 0 20px ${themeColor}40`
            }}
            onMouseLeave={(e) => {
              setIsAutoPlaying(true)
              e.currentTarget.style.backgroundColor = isDarkMode ? '#1f2937' : '#ffffff'
              e.currentTarget.style.boxShadow = ''
            }}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <button
            onClick={nextService}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 z-20
              w-16 h-16 rounded-full bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700
              flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-white transition-all duration-300
              group cursor-pointer`}
            onMouseEnter={(e) => {
              setIsAutoPlaying(false)
              e.currentTarget.style.backgroundColor = themeColor
              e.currentTarget.style.boxShadow = `0 0 20px ${themeColor}40`
            }}
            onMouseLeave={(e) => {
              setIsAutoPlaying(true)
              e.currentTarget.style.backgroundColor = isDarkMode ? '#1f2937' : '#ffffff'
              e.currentTarget.style.boxShadow = ''
            }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Service Content Card */}
          <div className="max-w-6xl mx-auto relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeService}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { duration: 0.4, ease: "easeOut" },
                  opacity: { duration: 0.4, ease: "easeOut" }
                }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl overflow-hidden shadow-2xl"
              >
              
                {/* Service Header */}
                <div className={`p-8 md:p-12 bg-gradient-to-r ${currentService.gradient} text-white relative overflow-hidden`}>
                  
                  {/* Static Background Icon */}
                  <div className="absolute top-0 right-0 opacity-10 transform translate-x-8 -translate-y-8">
                    <ServiceIcon className="w-64 h-64" />
                  </div>

                  <div className="relative z-10">
                    <motion.div 
                      className="flex items-center mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mr-6">
                        <ServiceIcon className="w-8 h-8" />
                      </div>
                      <div>
                        <motion.div 
                          className="text-sm font-semibold opacity-80 mb-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
                        >
                          {language === 'ar' ? `الخدمة ${activeService + 1} من ${luxuryServices.length}` : `Service ${activeService + 1} of ${luxuryServices.length}`}
                        </motion.div>
                        <motion.h3 
                          className="text-3xl md:text-4xl font-bold leading-tight"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
                        >
                          {currentService.name[language]}
                        </motion.h3>
                      </div>
                    </motion.div>
                    
                    <motion.p 
                      className="text-xl opacity-90 leading-relaxed max-w-4xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25, duration: 0.3, ease: "easeOut" }}
                    >
                      {currentService.description[language]}
                    </motion.p>
                  </div>
                </div>

                {/* Service Features */}
                <div className="p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {currentService.features.map((feature, index) => (
                      <motion.div 
                        key={`${activeService}-${index}`}
                        custom={index}
                        variants={featureVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700"
                      >
                        <CheckCircle 
                          className="w-6 h-6 mr-4 flex-shrink-0" 
                          style={{ color: themeColor }} 
                        />
                        <span className="text-gray-900 dark:text-white font-medium">
                          {feature[language]}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}
                  >
                    <button 
                      className="px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:opacity-90 cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                        boxShadow: `0 8px 32px ${themeColor}40`
                      }}
                    >
                      {content[language].exploreService}
                    </button>
                    
                    <button 
                      className="px-8 py-4 rounded-2xl border-2 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 cursor-pointer"
                      style={{
                        borderColor: themeColor,
                        color: themeColor
                      }}
                    >
                      {content[language].learnMore}
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Service Navigation Dots */}
        <div className="flex justify-center mt-12 space-x-3">
          {luxuryServices.map((_, index) => (
            <button
              key={index}
              onClick={() => goToService(index)}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="relative transition-all duration-300 cursor-pointer"
            >
              <div 
                className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  index === activeService ? 'scale-125' : 'hover:scale-110'
                }`}
                style={{
                  backgroundColor: index === activeService ? themeColor : (isDarkMode ? '#4B5563' : '#D1D5DB'),
                  borderColor: index === activeService ? themeColor : (isDarkMode ? '#6B7280' : '#9CA3AF')
                }}
              />
              
              {/* Progress Ring for Active Service */}
              {index === activeService && (
                <div 
                  className="absolute inset-0 rounded-full border-2 border-gray-300 dark:border-gray-600 animate-spin"
                  style={{
                    borderTopColor: themeColor,
                    borderRightColor: `${themeColor}80`,
                    borderBottomColor: 'transparent',
                    borderLeftColor: 'transparent',
                    animationDuration: '6s'
                  }}
                />
              )}
              
              {/* Simple pulse effect */}
              {index === activeService && (
                <div 
                  className="absolute inset-0 rounded-full opacity-20 animate-ping"
                  style={{ 
                    backgroundColor: themeColor,
                    animationDuration: '2s'
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Service Icons Grid */}
        <div className="mt-16 grid grid-cols-4 md:grid-cols-8 gap-4">
          {luxuryServices.map((service, index) => {
            const Icon = service.icon
            return (
              <button
                key={service.id}
                onClick={() => goToService(index)}
                className={`p-4 rounded-2xl group relative transition-all duration-300 hover:scale-105 cursor-pointer ${
                  index === activeService ? 'scale-110' : ''
                }`}
                style={{
                  backgroundColor: index === activeService ? `${themeColor}20` : (isDarkMode ? '#1F2937' : '#F3F4F6'),
                  borderColor: index === activeService ? themeColor : 'transparent',
                  borderWidth: '2px'
                }}
              >
                <Icon 
                  className="w-6 h-6 mx-auto transition-all duration-300 group-hover:rotate-12" 
                  style={{ 
                    color: index === activeService ? themeColor : (isDarkMode ? '#9CA3AF' : '#6B7280'),
                    transform: index === activeService ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
                
                {/* Active indicator */}
                {index === activeService && (
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none animate-pulse"
                    style={{ 
                      backgroundColor: themeColor,
                      animationDuration: '2s'
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Demo Loading Button - For Testing */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={triggerLoading}
            className="px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            style={{
              borderColor: themeColor,
              color: themeColor,
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)'
            }}
          >
            {language === 'ar' ? '🔄 عرض التحميل' : '🔄 Show Loading'}
          </button>
        </div>
      </div>
    </section>
  )
}