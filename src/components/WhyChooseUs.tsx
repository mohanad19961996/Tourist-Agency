import { useState } from 'react'
import { 
  Globe, 
  Users, 
  Award, 
  Cpu,
  ChevronRight,
  Star,
  TrendingUp,
  Shield,
  Sparkles
} from 'lucide-react'
import { useScrollAnimation, getAnimationClass, useStaggeredAnimation } from './useScrollAnimation'

interface WhyChooseUsProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
}

// 4 Pillars of Excellence
const excellencePillars = [
  {
    id: 1,
    icon: Globe,
    title: { 
      ar: 'شبكة شراكات عالمية حصرية', 
      en: 'Exclusive Global Partnership Network' 
    },
    description: { 
      ar: 'علاقات مباشرة مع أرقى المنتجعات والفنادق في 156 وجهة حول العالم',
      en: 'Direct relationships with premium resorts and hotels across 156 global destinations'
    },
    stats: [
      { number: '156', label: { ar: 'وجهة حول العالم', en: 'Global Destinations' } },
      { number: '850+', label: { ar: 'شراكة فندقية فاخرة', en: 'Luxury Hotel Partners' } },
      { number: '120+', label: { ar: 'دولة في شبكتنا', en: 'Countries in Network' } }
    ],
    features: [
      { ar: 'شراكات حصرية مع فنادق ٥ نجوم', en: 'Exclusive partnerships with 5-star hotels' },
      { ar: 'أسعار مميزة غير متاحة للجمهور', en: 'Special rates unavailable to public' },
      { ar: 'ترقيات مجانية للأجنحة الفاخرة', en: 'Complimentary luxury suite upgrades' },
      { ar: 'خدمات كبار الشخصيات الحصرية', en: 'Exclusive VIP services' }
    ],
    gradient: 'from-blue-500 to-indigo-600',
    bgIcon: '🌍',
    highlight: 'إحصائية مميزة'
  },
  {
    id: 2,
    icon: Users,
    title: { 
      ar: 'فريق خبراء مختصين', 
      en: 'Specialized Expert Team' 
    },
    description: { 
      ar: '238 خبير سفر معتمد مع خبرة معمقة في كل وجهة نخدمها',
      en: '238 certified travel experts with deep expertise in every destination we serve'
    },
    stats: [
      { number: '238', label: { ar: 'خبير سفر معتمد', en: 'Certified Travel Experts' } },
      { number: '15+', label: { ar: 'سنة متوسط الخبرة', en: 'Years Average Experience' } },
      { number: '42', label: { ar: 'لغة مختلفة', en: 'Different Languages' } }
    ],
    features: [
      { ar: 'خبراء متخصصون لكل وجهة', en: 'Destination specialists for each location' },
      { ar: 'دعم متعدد اللغات على مدار الساعة', en: '24/7 multilingual support' },
      { ar: 'شهادات مهنية معتمدة دولياً', en: 'Internationally certified credentials' },
      { ar: 'تدريب مستمر على أحدث الاتجاهات', en: 'Continuous training on latest trends' }
    ],
    gradient: 'from-emerald-500 to-teal-600',
    bgIcon: '👥',
    highlight: 'فريق متميز'
  },
  {
    id: 3,
    icon: Award,
    title: { 
      ar: 'ضمان الرضا التام', 
      en: 'Complete Satisfaction Guarantee' 
    },
    description: { 
      ar: 'معدل رضا 99.2% من أكثر من 28,500 عميل في آخر 3 سنوات',
      en: '99.2% satisfaction rate from over 28,500 clients in the past 3 years'
    },
    stats: [
      { number: '99.2%', label: { ar: 'معدل رضا العملاء', en: 'Client Satisfaction Rate' } },
      { number: '28,500+', label: { ar: 'عميل راضٍ', en: 'Satisfied Clients' } },
      { number: '4.9/5', label: { ar: 'تقييم عام', en: 'Overall Rating' } }
    ],
    features: [
      { ar: 'ضمان استرداد كامل للمبلغ', en: 'Full money-back guarantee' },
      { ar: 'دعم عملاء على مدار الساعة', en: '24/7 customer support' },
      { ar: 'حلول فورية لأي مشكلة', en: 'Instant solutions for any issues' },
      { ar: 'متابعة دقيقة بعد انتهاء الرحلة', en: 'Detailed post-trip follow-up' }
    ],
    gradient: 'from-amber-500 to-orange-600',
    bgIcon: '🏆',
    highlight: 'إنجاز استثنائي'
  },
  {
    id: 4,
    icon: Cpu,
    title: { 
      ar: 'تقنيات حجز متقدمة', 
      en: 'Advanced Booking Technology' 
    },
    description: { 
      ar: 'منصة ذكية تضمن أفضل الأسعار والتوفر الفوري للحجوزات',
      en: 'Intelligent platform ensuring best prices and instant booking availability'
    },
    stats: [
      { number: '0.8s', label: { ar: 'زمن الاستجابة', en: 'Response Time' } },
      { number: '99.9%', label: { ar: 'وقت تشغيل المنصة', en: 'Platform Uptime' } },
      { number: '15+', label: { ar: 'طريقة دفع آمنة', en: 'Secure Payment Methods' } }
    ],
    features: [
      { ar: 'ذكاء اصطناعي لأفضل الأسعار', en: 'AI-powered best price finder' },
      { ar: 'حجز فوري بدون انتظار', en: 'Instant booking without delays' },
      { ar: 'تشفير بنكي من الدرجة الأولى', en: 'Bank-grade security encryption' },
      { ar: 'تطبيق محمول متقدم', en: 'Advanced mobile application' }
    ],
    gradient: 'from-purple-500 to-pink-600',
    bgIcon: '🚀',
    highlight: 'تقنية رائدة'
  }
]

export default function WhyChooseUs({ language, themeColor, isDarkMode }: WhyChooseUsProps) {
  const [activePillar, setActivePillar] = useState(0)
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null)
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation()
  const { elementRef: pillarsRef, isVisible: pillarsVisible, getStaggeredClass } = useStaggeredAnimation(excellencePillars.length, 200)

  const content = {
    ar: {
      header: 'لماذا نحن الرقم الأول في صناعة السفر الفاخر؟',
      subtitle: 'نتفوق على المنافسين من خلال أربع ركائز أساسية تضعنا في المقدمة كشركة الرحلات الفاخرة الأولى عالمياً',
      learnMore: 'تعرف على المزيد',
      exploreAll: 'استكشف جميع المزايا'
    },
    en: {
      header: 'Why We Lead the Luxury Travel Industry?',
      subtitle: 'We excel beyond competitors through four fundamental pillars that position us as the world\'s premier luxury travel company',
      learnMore: 'Learn More',
      exploreAll: 'Explore All Advantages'
    }
  }

  const currentPillar = excellencePillars[activePillar]
  const PillarIcon = currentPillar.icon

  return (
    <section className={`py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="text-[300px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {currentPillar.bgIcon}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Premium Header */}
        <div ref={headerRef} className={`text-center mb-20 ${getAnimationClass('fadeUp', headerVisible)}`}>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 mb-8">
            <Award className="w-5 h-5 mr-2" style={{ color: themeColor }} />
            <span className="text-sm font-semibold" style={{ color: themeColor }}>
              {language === 'ar' ? 'ركائز التميز' : 'Excellence Pillars'}
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

        {/* Main Content */}
        <div ref={contentRef} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${getAnimationClass('fadeLeft', contentVisible)}`}>
          
          {/* Pillars Navigation */}
          <div ref={pillarsRef} className="space-y-4">
            {excellencePillars.map((pillar, index) => {
              const Icon = pillar.icon
              const isActive = activePillar === index
              const isHovered = hoveredPillar === index
              const staggered = getStaggeredClass(index, 'slideLeft')

              return (
                <div
                  key={pillar.id}
                  className={`p-6 rounded-3xl cursor-pointer transition-all duration-500 transform ${staggered.className} ${
                    isActive 
                      ? 'scale-105 shadow-2xl' 
                      : 'hover:scale-102 shadow-lg hover:shadow-xl'
                  }`}
                  style={{
                    background: isActive 
                      ? `linear-gradient(135deg, ${themeColor}15, ${themeColor}05)`
                      : isDarkMode ? '#1f2937' : '#ffffff',
                    borderColor: isActive ? themeColor : 'transparent',
                    borderWidth: '2px'
                  }}
                  style={{...staggered.style}}
                  onClick={() => setActivePillar(index)}
                  onMouseEnter={() => setHoveredPillar(index)}
                  onMouseLeave={() => setHoveredPillar(null)}
                >
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    
                    {/* Icon */}
                    <div 
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isActive ? 'shadow-lg transform scale-110' : ''
                      }`}
                      style={{
                        background: isActive 
                          ? `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`
                          : `${themeColor}20`,
                        color: isActive ? 'white' : themeColor
                      }}
                    >
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <h3 className={`text-xl font-bold mb-2 transition-colors duration-300`}
                        style={{
                          color: isActive 
                            ? (isDarkMode ? '#ffffff' : themeColor)
                            : (isDarkMode ? 'rgba(209, 213, 219, 1)' : 'rgba(75, 85, 99, 1)'),
                          textShadow: isActive && isDarkMode 
                            ? `0 0 15px ${themeColor}30` 
                            : 'none'
                        }}
                      >
                        {pillar.title[language]}
                      </h3>
                      
                      <p className={`text-sm leading-relaxed transition-colors duration-300 mb-4 flex-1 ${
                        isActive 
                          ? 'text-gray-600 dark:text-gray-300' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {pillar.description[language]}
                      </p>

                      {/* Stats Preview */}
                      {isActive && (
                        <div className="mb-4 flex flex-wrap gap-4">
                          {pillar.stats.slice(0, 2).map((stat, statIndex) => (
                            <div key={statIndex} className="text-center">
                              <div className="text-2xl font-bold" style={{ color: themeColor }}>
                                {stat.number}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {stat.label[language]}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Show Details Button - Always Visible */}
                      <div className="mt-auto">
                        <button
                          className="group relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden"
                          style={{
                            background: isActive 
                              ? `linear-gradient(135deg, ${themeColor}20, ${themeColor}10)`
                              : `${themeColor}15`,
                            color: themeColor,
                            border: `1px solid ${themeColor}30`
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`
                            e.currentTarget.style.color = 'white'
                            e.currentTarget.style.boxShadow = `0 0 25px ${themeColor}60, 0 0 50px ${themeColor}40, 0 0 75px ${themeColor}20`
                            e.currentTarget.style.borderColor = themeColor
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = isActive 
                              ? `linear-gradient(135deg, ${themeColor}20, ${themeColor}10)`
                              : `${themeColor}15`
                            e.currentTarget.style.color = themeColor
                            e.currentTarget.style.boxShadow = 'none'
                            e.currentTarget.style.borderColor = `${themeColor}30`
                          }}
                        >
                          {/* Animated Background */}
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: `linear-gradient(45deg, ${themeColor}80, transparent, ${themeColor}80)`,
                              animation: 'shimmer 2s infinite'
                            }}
                          />
                          
                          {/* Button Text */}
                          <span className="relative z-10 flex items-center justify-center">
                            {language === 'ar' ? 'عرض التفاصيل' : 'Show Details'}
                            <ChevronRight className="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
                          </span>
                          
                          {/* Neon Glow Ring */}
                          <div 
                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: `linear-gradient(135deg, transparent, ${themeColor}30, transparent)`,
                              filter: 'blur(8px)',
                              transform: 'scale(1.1)'
                            }}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ChevronRight 
                      className={`w-6 h-6 transition-all duration-300 ${
                        isActive ? 'transform scale-125' : ''
                      }`}
                      style={{ color: isActive ? themeColor : '#9CA3AF' }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Active Pillar Details - Flip Card */}
          <div className="lg:sticky lg:top-8">
            
            {/* Hover Indicator */}
            <div className="absolute -top-4 -right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg flip-indicator"
                style={{ 
                  background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                  boxShadow: `0 0 20px ${themeColor}60`
                }}
              >
                <div className="text-white text-xs font-bold">
                  {language === 'ar' ? 'قلب' : 'FLIP'}
                </div>
              </div>
            </div>

            {/* Corner Indicator - Always Visible */}
            <div className="absolute top-4 right-4 z-20 opacity-60 group-hover:opacity-0 transition-all duration-300 pointer-events-none">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center float-glow"
                style={{ 
                  background: `${themeColor}20`,
                  border: `1px solid ${themeColor}40`
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: themeColor }}
                />
              </div>
            </div>

            <div className="perspective-1000 h-[600px] group relative">
              
              {/* Glow Effect */}
              <div 
                className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${themeColor}20, transparent, ${themeColor}20)`,
                  filter: 'blur(20px)'
                }}
              />

              <div className="relative w-full h-full transform-style-preserve-3d transition-all duration-700 ease-out group-hover:rotate-y-180 cursor-pointer">
                
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                  
                  {/* Header */}
                  <div className={`p-8 bg-gradient-to-r ${currentPillar.gradient} text-white relative overflow-hidden`}>
                    
                    {/* Background Icon */}
                    <div className="absolute top-0 right-0 opacity-20 transform translate-x-8 -translate-y-8">
                      <PillarIcon className="w-48 h-48" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4">
                          <PillarIcon className="w-6 h-6" />
                        </div>
                        <div className="text-sm font-semibold opacity-80">
                          {currentPillar.highlight}
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-bold mb-4 leading-tight">
                        {currentPillar.title[language]}
                      </h3>
                      
                      <p className="text-lg opacity-90 leading-relaxed">
                        {currentPillar.description[language]}
                      </p>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="p-8">
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      {currentPillar.stats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="text-3xl font-bold mb-2" style={{ color: themeColor }}>
                            {stat.number}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 leading-tight">
                            {stat.label[language]}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {currentPillar.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div 
                            className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                            style={{ backgroundColor: themeColor }}
                          />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">
                            {feature[language]}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button 
                      className="w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                        boxShadow: `0 8px 32px ${themeColor}40`
                      }}
                    >
                      {content[language].learnMore}
                    </button>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                  
                  {/* Enhanced Header */}
                  <div className={`p-8 bg-gradient-to-br ${currentPillar.gradient} text-white relative overflow-hidden`}>
                    
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="grid grid-cols-6 gap-4 transform rotate-12 scale-150">
                        {Array.from({ length: 24 }).map((_, index) => (
                          <PillarIcon key={index} className="w-8 h-8" />
                        ))}
                      </div>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4">
                            <PillarIcon className="w-8 h-8" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold opacity-80 mb-1">
                              {language === 'ar' ? 'تفاصيل متقدمة' : 'Advanced Details'}
                            </div>
                            <div className="text-xs opacity-70">
                              {language === 'ar' ? 'اكتشف المزيد' : 'Discover More'}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">#{currentPillar.id}</div>
                          <div className="text-xs opacity-70">
                            {language === 'ar' ? 'ركيزة' : 'Pillar'}
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 leading-tight">
                        {language === 'ar' ? 'مزايا حصرية وخدمات متميزة' : 'Exclusive Benefits & Premium Services'}
                      </h3>
                      
                      <p className="text-sm opacity-90 leading-relaxed">
                        {language === 'ar' 
                          ? 'اكتشف المزايا الحصرية والخدمات المتميزة التي تجعلنا الخيار الأول للعملاء المميزين'
                          : 'Discover exclusive benefits and premium services that make us the first choice for distinguished clients'
                        }
                      </p>
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="p-8">
                    
                    {/* Premium Features Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {currentPillar.features.map((feature, index) => (
                        <div key={index} className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                          <div className="flex items-start">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
                              style={{ backgroundColor: `${themeColor}20` }}
                            >
                              <div 
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: themeColor }}
                              />
                            </div>
                            <span className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                              {feature[language]}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Premium Stats */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl p-6 mb-6">
                      <h4 className="text-lg font-bold mb-4 text-center" style={{ color: themeColor }}>
                        {language === 'ar' ? 'إحصائيات التميز' : 'Excellence Metrics'}
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        {currentPillar.stats.map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className="text-2xl font-bold mb-1" style={{ color: themeColor }}>
                              {stat.number}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                              {stat.label[language]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="space-y-3">
                      <button 
                        className="w-full py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg group relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                          boxShadow: `0 4px 16px ${themeColor}40`
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = `0 0 30px ${themeColor}60`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = `0 4px 16px ${themeColor}40`
                        }}
                      >
                        <span className="relative z-10">
                          {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                        </span>
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(45deg, ${themeColor}80, transparent, ${themeColor}80)`
                          }}
                        />
                      </button>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          className="py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 border text-sm"
                          style={{
                            color: themeColor,
                            borderColor: `${themeColor}50`,
                            background: `${themeColor}10`
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `${themeColor}20`
                            e.currentTarget.style.borderColor = themeColor
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = `${themeColor}10`
                            e.currentTarget.style.borderColor = `${themeColor}50`
                          }}
                        >
                          {language === 'ar' ? 'تواصل معنا' : 'Contact'}
                        </button>
                        <button 
                          className="py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 border text-sm"
                          style={{
                            color: themeColor,
                            borderColor: `${themeColor}50`,
                            background: `${themeColor}10`
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `${themeColor}20`
                            e.currentTarget.style.borderColor = themeColor
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = `${themeColor}10`
                            e.currentTarget.style.borderColor = `${themeColor}50`
                          }}
                        >
                          {language === 'ar' ? 'تفاصيل' : 'Details'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button 
            className="px-12 py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
              boxShadow: `0 16px 64px ${themeColor}40`
            }}
          >
            {content[language].exploreAll}
          </button>
        </div>
      </div>
    </section>
  )
}