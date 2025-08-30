import { Award, DollarSign, Globe, Heart } from 'lucide-react'

interface WhyChooseUsProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
}

const features = [
  {
    id: 1,
    icon: Award,
    title: { ar: 'خبرة 15 عامًا', en: '15 Years Expertise' },
    description: { 
      ar: 'نخبة من خبراء السفر الأكثر تميزًا في المنطقة', 
      en: 'Elite team of the region\'s most distinguished travel experts' 
    },
    stats: { ar: 'أكثر من 15 عامًا من التميز', en: 'Over 15 years of excellence' },
    gradient: 'from-blue-500 to-cyan-400'
  },
  {
    id: 2,
    icon: DollarSign,
    title: { ar: 'ضمان أفضل سعر', en: 'Best Price Guarantee' },
    description: { 
      ar: 'نضمن لك أفضل الأسعار أو نعيد الفرق مضاعفًا', 
      en: 'We guarantee the best prices or return double the difference' 
    },
    stats: { ar: 'ضمان مدى الحياة', en: 'Lifetime guarantee' },
    gradient: 'from-green-500 to-emerald-400'
  },
  {
    id: 3,
    icon: Globe,
    title: { ar: 'شبكة عالمية حصرية', en: 'Exclusive Global Network' },
    description: { 
      ar: 'شراكات مميزة مع أفخم الفنادق والمنتجعات عالمياً', 
      en: 'Premium partnerships with the world\'s most luxurious hotels and resorts' 
    },
    stats: { ar: '500+ شريك حول العالم', en: '500+ partners worldwide' },
    gradient: 'from-purple-500 to-pink-400'
  },
  {
    id: 4,
    icon: Heart,
    title: { ar: 'رضا العملاء 99%', en: '99% Customer Satisfaction' },
    description: { 
      ar: 'أكثر من 25,000 عميل سعيد يثق بخدماتنا', 
      en: 'Over 25,000 happy clients trust our services' 
    },
    stats: { ar: 'تقييم 4.9/5 نجوم', en: '4.9/5 star rating' },
    gradient: 'from-red-500 to-orange-400'
  }
]

export default function WhyChooseUs({ language, themeColor, isDarkMode }: WhyChooseUsProps) {
  const heading = {
    ar: 'لماذا نحن الخيار الأول لرحلاتكم الفاخرة؟',
    en: 'Why Are We Your Premier Choice for Luxury Travel?'
  }

  return (
    <section 
      className={`py-20 px-4 lg:px-8 relative overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}
      style={{
        background: `linear-gradient(135deg, 
          ${isDarkMode ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)'} 0%, 
          ${themeColor}05 50%, 
          ${isDarkMode ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)'} 100%)`
      }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-5"
          style={{
            background: `radial-gradient(ellipse at top left, ${themeColor} 0%, transparent 50%),
                        radial-gradient(ellipse at bottom right, ${themeColor} 0%, transparent 50%)`
          }}
        />
        
        {/* Floating Particles */}
        <div 
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full opacity-30 animate-pulse"
          style={{ 
            backgroundColor: themeColor,
            animationDuration: '3s',
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full opacity-20 animate-pulse"
          style={{ 
            backgroundColor: themeColor,
            animationDuration: '4s',
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full opacity-25 animate-pulse"
          style={{ 
            backgroundColor: themeColor,
            animationDuration: '5s',
            animationDelay: '2s'
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group relative p-8 lg:p-10 rounded-3xl backdrop-blur-2xl border border-white/20
                transform hover:scale-105 hover:-translate-y-3 transition-all duration-700 ease-out
                shadow-xl hover:shadow-3xl cursor-pointer overflow-hidden"
              style={{
                background: `linear-gradient(135deg, 
                  ${isDarkMode ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)'} 0%, 
                  ${isDarkMode ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'} 50%,
                  ${isDarkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'} 100%)`,
                backdropFilter: 'blur(25px) saturate(180%)',
                boxShadow: `
                  0 25px 80px rgba(0,0,0,0.1),
                  0 0 40px ${themeColor}10,
                  inset 0 2px 0 rgba(255,255,255,0.15),
                  inset 0 -2px 0 rgba(0,0,0,0.05)
                `,
                animationDelay: `${index * 200}ms`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 40px 120px rgba(0,0,0,0.2),
                  0 0 80px ${themeColor}20,
                  inset 0 2px 0 rgba(255,255,255,0.2),
                  inset 0 -2px 0 rgba(0,0,0,0.1)
                `
                e.currentTarget.style.borderColor = `${themeColor}40`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 25px 80px rgba(0,0,0,0.1),
                  0 0 40px ${themeColor}10,
                  inset 0 2px 0 rgba(255,255,255,0.15),
                  inset 0 -2px 0 rgba(0,0,0,0.05)
                `
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              }}
            >
              {/* Background Gradient Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700
                  rounded-3xl"
                style={{
                  background: `radial-gradient(circle at center, ${themeColor}08 0%, transparent 70%)`
                }}
              />

              {/* Icon Container */}
              <div className="relative z-10 mb-8">
                <div 
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center
                    transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500
                    shadow-lg group-hover:shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor}20, ${themeColor}10)`,
                    boxShadow: `
                      0 0 40px ${themeColor}20,
                      inset 0 2px 0 rgba(255,255,255,0.3),
                      inset 0 -2px 0 rgba(0,0,0,0.1)
                    `
                  }}
                >
                  <feature.icon 
                    className="w-10 h-10 lg:w-12 lg:h-12 transform group-hover:scale-110 transition-transform duration-300" 
                    style={{ color: themeColor }} 
                  />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-4 
                  group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                  {feature.title[language]}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed
                  group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description[language]}
                </p>

                {/* Stats Badge */}
                <div 
                  className="inline-flex items-center px-4 py-2 rounded-xl backdrop-blur-lg border border-white/30
                    transform group-hover:scale-105 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor}15, ${themeColor}05)`,
                    boxShadow: `0 0 20px ${themeColor}15, inset 0 1px 0 rgba(255,255,255,0.2)`
                  }}
                >
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: themeColor }}
                  >
                    {feature.stats[language]}
                  </span>
                </div>
              </div>

              {/* Animated Border */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  border-2 border-transparent"
                style={{
                  background: `linear-gradient(45deg, ${themeColor}30, transparent, ${themeColor}30) border-box`,
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'exclude'
                }}
              />

              {/* Pulse Effect */}
              <div 
                className="absolute top-4 right-4 rtl:left-4 rtl:right-auto w-3 h-3 rounded-full
                  group-hover:animate-ping transition-all duration-300"
                style={{ backgroundColor: themeColor }}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button 
            className="group relative px-12 py-5 rounded-2xl font-semibold text-white
              transform hover:scale-105 transition-all duration-300 cursor-pointer
              shadow-2xl hover:shadow-3xl backdrop-blur-lg border border-white/30"
            style={{
              background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}CC 100%)`,
              boxShadow: `
                0 0 40px ${themeColor}50, 
                0 15px 40px rgba(0,0,0,0.3),
                inset 0 2px 0 rgba(255,255,255,0.3)
              `
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `
                0 0 60px ${themeColor}70, 
                0 20px 50px rgba(0,0,0,0.4),
                inset 0 2px 0 rgba(255,255,255,0.4)
              `
              e.currentTarget.style.transform = 'scale(1.05) translateY(-3px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `
                0 0 40px ${themeColor}50, 
                0 15px 40px rgba(0,0,0,0.3),
                inset 0 2px 0 rgba(255,255,255,0.3)
              `
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/10 
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700
                rounded-2xl"
            />
            <span className="relative z-10">
              {language === 'ar' ? 'ابدأ رحلتك معنا اليوم' : 'Start Your Journey With Us Today'}
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}