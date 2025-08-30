import { useState } from 'react'
import { 
  Mail, 
  Bell, 
  Gift, 
  Star, 
  CheckCircle, 
  Sparkles,
  Crown,
  Send,
  Shield,
  Globe
} from 'lucide-react'
import { useScrollAnimation, getAnimationClass, useStaggeredAnimation } from './useScrollAnimation'

interface CommunicationsHubProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
}

export default function CommunicationsHub({ language, themeColor, isDarkMode }: CommunicationsHubProps) {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { elementRef: formRef, isVisible: formVisible } = useScrollAnimation()
  const { elementRef: benefitsRef, isVisible: benefitsVisible, getStaggeredClass } = useStaggeredAnimation(6, 150)

  const content = {
    ar: {
      header: 'انضم إلى نادي المسافرين المميزين',
      subtitle: 'احصل على دعوات حصرية لعروضنا الخاصة وأحدث الوجهات المميزة قبل الجميع',
      emailPlaceholder: 'أدخل بريدك الإلكتروني للحصول على العضوية المميزة',
      joinElite: 'انضم إلى النخبة',
      benefits: {
        exclusiveOffers: 'عروض حصرية لا تتوفر للجمهور',
        earlyAccess: 'الوصول المبكر للوجهات الجديدة',
        vipSupport: 'دعم كبار الشخصيات على مدار الساعة',
        personalizedRecommendations: 'توصيات مخصصة حسب تفضيلاتك',
        luxuryUpgrades: 'ترقيات فاخرة مجانية',
        privilegedPricing: 'أسعار مميزة للأعضاء'
      },
      successMessage: 'مرحباً بك في نادي المسافرين المميزين! ستصلك دعوتك الحصرية قريباً.',
      privacyNote: 'نحن نحترم خصوصيتك ولن نشارك بياناتك مع أي طرف ثالث',
      membersCount: 'أكثر من 15,000 عضو مميز',
      exclusiveClub: 'نادي حصري',
      memberBenefits: 'مزايا العضوية'
    },
    en: {
      header: 'Join Our Distinguished Travelers Club',
      subtitle: 'Receive exclusive invitations to our special offers and latest premium destinations before everyone else',
      emailPlaceholder: 'Enter your email for premium membership',
      joinElite: 'Join the Elite',
      benefits: {
        exclusiveOffers: 'Exclusive offers unavailable to the public',
        earlyAccess: 'Early access to new destinations',
        vipSupport: '24/7 VIP support',
        personalizedRecommendations: 'Personalized recommendations based on your preferences',
        luxuryUpgrades: 'Complimentary luxury upgrades',
        privilegedPricing: 'Privileged member pricing'
      },
      successMessage: 'Welcome to the Distinguished Travelers Club! Your exclusive invitation will arrive soon.',
      privacyNote: 'We respect your privacy and will never share your data with third parties',
      membersCount: 'Over 15,000 distinguished members',
      exclusiveClub: 'Exclusive Club',
      memberBenefits: 'Member Benefits'
    }
  }

  const benefits = [
    {
      icon: Gift,
      title: content[language].benefits.exclusiveOffers,
      description: { 
        ar: 'وصول حصري لعروض سفر فاخرة بخصومات تصل إلى 40%',
        en: 'Exclusive access to luxury travel offers with discounts up to 40%'
      }
    },
    {
      icon: Bell,
      title: content[language].benefits.earlyAccess,
      description: { 
        ar: 'كن أول من يعلم بالوجهات الجديدة والحجوزات المحدودة',
        en: 'Be first to know about new destinations and limited bookings'
      }
    },
    {
      icon: Crown,
      title: content[language].benefits.vipSupport,
      description: { 
        ar: 'خط ساخن خاص للأعضاء المميزين مع أولوية الاستجابة',
        en: 'Private member hotline with priority response'
      }
    },
    {
      icon: Sparkles,
      title: content[language].benefits.personalizedRecommendations,
      description: { 
        ar: 'اقتراحات رحلات مخصصة بناءً على اهتماماتك ورحلاتك السابقة',
        en: 'Customized trip suggestions based on your interests and past travels'
      }
    },
    {
      icon: Star,
      title: content[language].benefits.luxuryUpgrades,
      description: { 
        ar: 'ترقيات مجانية للأجنحة الفاخرة ودرجات الطيران المتميزة',
        en: 'Complimentary upgrades to luxury suites and premium flight classes'
      }
    },
    {
      icon: Shield,
      title: content[language].benefits.privilegedPricing,
      description: { 
        ar: 'أسعار خاصة للأعضاء أقل بنسبة 15-25% من الأسعار العادية',
        en: 'Special member pricing 15-25% lower than regular rates'
      }
    }
  ]

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubscribed(true)
    }, 2000)
  }

  if (isSubscribed) {
    return (
      <section className={`py-24 relative overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'} ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
          : 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white'
      }`}>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 gap-8 transform rotate-12 scale-150">
            {Array.from({ length: 64 }).map((_, index) => (
              <Crown key={index} className={`w-8 h-8 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
          
          {/* Success Animation */}
          <div className="max-w-2xl mx-auto">
            <div className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center animate-pulse"
              style={{ backgroundColor: `${themeColor}40` }}>
              <CheckCircle className="w-12 h-12" style={{ color: themeColor }} />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6"
              style={{ 
                color: themeColor,
                textShadow: `0 0 20px ${themeColor}40, 0 4px 8px rgba(0,0,0,0.3)`
              }}
            >
              {language === 'ar' ? 'مرحباً بك في النخبة!' : 'Welcome to the Elite!'}
            </h2>
            
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              {content[language].successMessage}
            </p>

            <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
              <Crown className="w-6 h-6" style={{ color: themeColor }} />
              <span className="text-lg font-semibold" style={{ color: themeColor }}>
                {content[language].exclusiveClub}
              </span>
              <Crown className="w-6 h-6" style={{ color: themeColor }} />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`py-24 relative overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'} ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white'
    }`}>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 gap-8 transform rotate-12 scale-150">
          {Array.from({ length: 64 }).map((_, index) => (
            <Crown key={index} className={`w-8 h-8 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
          ))}
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${
        isDarkMode 
          ? 'bg-gradient-to-t from-black/50 via-transparent to-black/30'
          : 'bg-gradient-to-t from-white/30 via-transparent to-white/10'
      }`} />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Premium Header */}
        <div ref={headerRef} className={`text-center mb-16 ${getAnimationClass('fadeUp', headerVisible)}`}>
          <div className={`inline-flex items-center px-6 py-3 rounded-full backdrop-blur-sm border mb-8 ${
            isDarkMode 
              ? 'bg-white/10 border-white/20'
              : 'bg-white/50 border-gray-200'
          }`}>
            <Crown className="w-5 h-5 mr-2" style={{ color: themeColor }} />
            <span className="text-sm font-semibold" style={{ color: themeColor }}>
              {content[language].exclusiveClub}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ 
              color: themeColor,
              textShadow: `0 0 20px ${themeColor}40, 0 4px 8px rgba(0,0,0,0.3)`
            }}
          >
            {content[language].header}
          </h2>
          
          <p className={`text-xl max-w-4xl mx-auto leading-relaxed mb-8 ${
            isDarkMode ? 'text-white/90' : 'text-gray-700'
          }`}
            style={{ 
              textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            {content[language].subtitle}
          </p>

          {/* Members Count */}
          <div className={`inline-flex items-center px-6 py-3 rounded-full backdrop-blur-sm border ${
            isDarkMode 
              ? 'bg-white/10 border-white/20'
              : 'bg-white/50 border-gray-200'
          }`}>
            <Globe className="w-5 h-5 mr-2" style={{ color: themeColor }} />
            <span className="text-sm font-semibold">
              {content[language].membersCount}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Subscription Form */}
          <div className="order-2 lg:order-1">
            <div ref={formRef} className={`backdrop-blur-md rounded-3xl p-8 md:p-12 border ${getAnimationClass('slideLeft', formVisible)} ${
              isDarkMode 
                ? 'bg-white/10 border-white/20'
                : 'bg-white/70 border-gray-200'
            }`}>
              
              <h3 className="text-3xl font-bold mb-6"
                style={{ 
                  color: themeColor,
                  textShadow: `0 0 15px ${themeColor}30`
                }}
              >
                {content[language].joinElite}
              </h3>

              <form onSubmit={handleSubscribe} className="space-y-6">
                <div className="relative">
                  <Mail className={`absolute left-4 rtl:right-4 rtl:left-auto top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-white/60' : 'text-gray-500'
                  }`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={content[language].emailPlaceholder}
                    className={`w-full pl-12 rtl:pr-12 rtl:pl-4 pr-4 py-4 rounded-2xl backdrop-blur-sm border focus:outline-none focus:ring-2 transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-white/10 border-white/20 text-white placeholder-white/60 focus:ring-white/30'
                        : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500/30'
                    }`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                    boxShadow: `0 16px 64px ${themeColor}40`
                  }}
                >
                  {isLoading ? (
                    <div className="animate-spin w-6 h-6 border-2 border-white/30 border-t-white rounded-full" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {content[language].joinElite}
                    </>
                  )}
                </button>
              </form>

              {/* Privacy Note */}
              <p className={`text-sm mt-6 leading-relaxed ${
                isDarkMode ? 'text-white/60' : 'text-gray-600'
              }`}>
                <Shield className="w-4 h-4 inline mr-2" />
                {content[language].privacyNote}
              </p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="order-1 lg:order-2">
            <div className={`mb-8 ${getAnimationClass('slideRight', benefitsVisible)}`}>
              <h3 className="text-3xl font-bold mb-4"
                style={{ 
                  color: themeColor,
                  textShadow: `0 0 15px ${themeColor}30`
                }}
              >
                {content[language].memberBenefits}
              </h3>
              <p className={isDarkMode ? 'text-white/80' : 'text-gray-600'}>
                {language === 'ar' 
                  ? 'استمتع بمزايا حصرية مصممة خصيصاً لتجربة سفر استثنائية'
                  : 'Enjoy exclusive benefits designed specifically for an exceptional travel experience'
                }
              </p>
            </div>

            <div ref={benefitsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                const staggered = getStaggeredClass(index, 'scale')
                
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${staggered.className} ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/10 hover:bg-white/10'
                        : 'bg-white/30 border-gray-200 hover:bg-white/50'
                    }`}
                    style={staggered.style}
                  >
                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${themeColor}40` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: themeColor }} />
                      </div>
                      
                      <div>
                        <h4 className={`font-bold mb-2 leading-tight ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {benefit.title}
                        </h4>
                        <p className={`text-sm leading-relaxed ${
                          isDarkMode ? 'text-white/70' : 'text-gray-600'
                        }`}>
                          {benefit.description[language]}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-6 rtl:space-x-reverse">
            {[Crown, Star, Sparkles, Gift].map((Icon, index) => (
              <Icon 
                key={index} 
                className="w-8 h-8 animate-pulse" 
                style={{ 
                  color: themeColor,
                  animationDelay: `${index * 0.5}s`
                }} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}