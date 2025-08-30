import { useState, useEffect } from 'react'
import { Plane, Hotel, Users, Car, Shield, Map, Headphones, ChevronLeft, ChevronRight } from 'lucide-react'

interface ServicesCarouselProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
}

const services = [
  {
    id: 1,
    icon: Plane,
    title: { ar: 'طيران درجة أولى', en: 'First-Class Flights' },
    description: { 
      ar: 'احجز مقاعد الدرجة الأولى مع أفضل شركات الطيران العالمية', 
      en: 'Book first-class seats with the world\'s best airlines' 
    },
    features: [
      { ar: 'مقاعد مريحة وواسعة', en: 'Comfortable and spacious seats' },
      { ar: 'وجبات فاخرة', en: 'Luxury meals' },
      { ar: 'خدمة شخصية مميزة', en: 'Premium personal service' }
    ]
  },
  {
    id: 2,
    icon: Hotel,
    title: { ar: 'فنادق خمس نجوم', en: '5-Star Accommodations' },
    description: { 
      ar: 'إقامة في أفخم الفنادق والمنتجعات حول العالم', 
      en: 'Stay in the world\'s most luxurious hotels and resorts' 
    },
    features: [
      { ar: 'أجنحة فاخرة مع إطلالات خلابة', en: 'Luxury suites with stunning views' },
      { ar: 'خدمة الغرف على مدار الساعة', en: '24/7 room service' },
      { ar: 'مرافق سبا ومسابح حصرية', en: 'Exclusive spa and pool facilities' }
    ]
  },
  {
    id: 3,
    icon: Users,
    title: { ar: 'جولات خاصة مع مرشد', en: 'Private Guided Tours' },
    description: { 
      ar: 'جولات حصرية مع مرشدين محليين خبراء', 
      en: 'Exclusive tours with expert local guides' 
    },
    features: [
      { ar: 'مرشدين معتمدين ومتخصصين', en: 'Certified and specialized guides' },
      { ar: 'برامج مخصصة حسب اهتماماتك', en: 'Customized programs based on your interests' },
      { ar: 'دخول VIP للمعالم السياحية', en: 'VIP access to tourist attractions' }
    ]
  },
  {
    id: 4,
    icon: Car,
    title: { ar: 'نقل فيب حصري', en: 'Exclusive VIP Transport' },
    description: { 
      ar: 'سيارات فاخرة وطائرات خاصة للتنقل بأناقة', 
      en: 'Luxury cars and private jets for elegant transportation' 
    },
    features: [
      { ar: 'سيارات فاخرة مع سائق شخصي', en: 'Luxury cars with personal driver' },
      { ar: 'طائرات هليكوبتر للجولات الجوية', en: 'Helicopter tours' },
      { ar: 'يخوت خاصة للرحلات البحرية', en: 'Private yachts for sea tours' }
    ]
  },
  {
    id: 5,
    icon: Shield,
    title: { ar: 'تأمين سفر شامل', en: 'Comprehensive Travel Insurance' },
    description: { 
      ar: 'حماية شاملة لرحلتك من أي طوارئ محتملة', 
      en: 'Complete protection for your trip from any potential emergencies' 
    },
    features: [
      { ar: 'تغطية طبية شاملة', en: 'Comprehensive medical coverage' },
      { ar: 'تأمين ضد إلغاء الرحلة', en: 'Trip cancellation insurance' },
      { ar: 'مساعدة طوارئ على مدار الساعة', en: '24/7 emergency assistance' }
    ]
  },
  {
    id: 6,
    icon: Map,
    title: { ar: 'تخطيط رحلات مخصص', en: 'Personalized Itinerary Planning' },
    description: { 
      ar: 'برامج سياحية مصممة خصيصاً لتناسب تفضيلاتك', 
      en: 'Custom travel programs designed to match your preferences' 
    },
    features: [
      { ar: 'استشارة مجانية مع خبراء السفر', en: 'Free consultation with travel experts' },
      { ar: 'برامج مرنة قابلة للتعديل', en: 'Flexible and customizable programs' },
      { ar: 'تجارب حصرية غير متاحة للجمهور', en: 'Exclusive experiences not available to the public' }
    ]
  },
  {
    id: 7,
    icon: Headphones,
    title: { ar: 'دعم 24/7', en: '24/7 Concierge Support' },
    description: { 
      ar: 'خدمة عملاء متميزة على مدار الساعة طوال أيام الأسبوع', 
      en: 'Premium customer service available 24/7 throughout the week' 
    },
    features: [
      { ar: 'فريق دعم متعدد اللغات', en: 'Multilingual support team' },
      { ar: 'حلول فورية لأي مشكلة', en: 'Instant solutions for any problem' },
      { ar: 'خدمة كونسيرج شخصية', en: 'Personal concierge service' }
    ]
  }
]

export default function ServicesCarousel({ language, themeColor, isDarkMode }: ServicesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)

  const heading = {
    ar: 'خدماتنا الفاخرة الشاملة',
    en: 'Our Comprehensive Luxury Services'
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2)
      } else {
        setVisibleCards(3)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + visibleCards >= services.length ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, services.length - visibleCards) : prev - 1
    )
  }

  const visibleServices = services.slice(currentIndex, currentIndex + visibleCards)
  if (visibleServices.length < visibleCards) {
    visibleServices.push(...services.slice(0, visibleCards - visibleServices.length))
  }

  return (
    <section 
      className={`py-20 px-4 lg:px-8 relative overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}
      style={{
        background: `linear-gradient(135deg, 
          ${themeColor}03 0%, 
          ${themeColor}08 50%, 
          ${themeColor}03 100%)`
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full opacity-10 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${themeColor}40 0%, transparent 70%)`,
            animationDuration: '8s'
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full opacity-10 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${themeColor}40 0%, transparent 70%)`,
            animationDuration: '6s',
            animationDelay: '3s'
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
            {heading[language]}
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: themeColor }}
          />
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 rtl:right-0 rtl:left-auto top-1/2 transform -translate-y-1/2 z-20
              p-4 rounded-full backdrop-blur-xl border border-white/30 
              text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white
              transition-all duration-300 transform hover:scale-110 cursor-pointer
              shadow-xl hover:shadow-2xl"
            style={{
              background: `linear-gradient(135deg, 
                ${isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'} 0%, 
                ${isDarkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'} 100%)`,
              backdropFilter: 'blur(20px)',
              boxShadow: `0 0 30px ${themeColor}20, inset 0 1px 0 rgba(255,255,255,0.2)`
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 rtl:left-0 rtl:right-auto top-1/2 transform -translate-y-1/2 z-20
              p-4 rounded-full backdrop-blur-xl border border-white/30 
              text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white
              transition-all duration-300 transform hover:scale-110 cursor-pointer
              shadow-xl hover:shadow-2xl"
            style={{
              background: `linear-gradient(135deg, 
                ${isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'} 0%, 
                ${isDarkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'} 100%)`,
              backdropFilter: 'blur(20px)',
              boxShadow: `0 0 30px ${themeColor}20, inset 0 1px 0 rgba(255,255,255,0.2)`
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-16">
            {visibleServices.map((service, index) => (
              <div
                key={`${service.id}-${index}`}
                className="group relative p-8 rounded-3xl backdrop-blur-2xl border border-white/20
                  transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out
                  shadow-xl hover:shadow-2xl cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, 
                    ${isDarkMode ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)'} 0%, 
                    ${isDarkMode ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'} 100%)`,
                  backdropFilter: 'blur(25px) saturate(180%)',
                  boxShadow: `
                    0 20px 60px rgba(0,0,0,0.1),
                    0 0 40px ${themeColor}10,
                    inset 0 1px 0 rgba(255,255,255,0.15)
                  `
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `
                    0 30px 80px rgba(0,0,0,0.2),
                    0 0 60px ${themeColor}20,
                    inset 0 1px 0 rgba(255,255,255,0.2)
                  `
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `
                    0 20px 60px rgba(0,0,0,0.1),
                    0 0 40px ${themeColor}10,
                    inset 0 1px 0 rgba(255,255,255,0.15)
                  `
                }}
              >
                {/* Icon Container */}
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6
                    transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor}20, ${themeColor}10)`,
                    boxShadow: `0 0 30px ${themeColor}20, inset 0 1px 0 rgba(255,255,255,0.2)`
                  }}
                >
                  <service.icon 
                    className="w-10 h-10" 
                    style={{ color: themeColor }} 
                  />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {service.title[language]}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description[language]}
                </p>

                {/* Features List */}
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      className="flex items-start space-x-3 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div 
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: themeColor }}
                      />
                      <span>{feature[language]}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Effect Overlay */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
                    transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${themeColor}10 0%, transparent 70%)`
                  }}
                />
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-3 rtl:space-x-reverse mt-12">
            {Array.from({ length: Math.ceil(services.length / visibleCards) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * visibleCards)}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer
                  ${Math.floor(currentIndex / visibleCards) === index ? 'scale-125' : 'scale-100 hover:scale-110'}`}
                style={{
                  backgroundColor: Math.floor(currentIndex / visibleCards) === index ? themeColor : 'rgba(128,128,128,0.5)',
                  boxShadow: Math.floor(currentIndex / visibleCards) === index 
                    ? `0 0 20px ${themeColor}60`
                    : '0 0 10px rgba(128,128,128,0.3)'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}