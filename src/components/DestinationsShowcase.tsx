import { useState } from 'react'
import { Star, MapPin, Calendar, Users, ArrowRight, Heart, BookOpen } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useScrollAnimation, getAnimationClass, useStaggeredAnimation } from './useScrollAnimation'

interface DestinationsShowcaseProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
}

// 6 Premium Destinations with $5 pricing
const premiumDestinations = [
  {
    id: 1,
    name: { ar: 'جزر المالديف الخاصة', en: 'Maldives Private Islands' },
    location: { ar: 'المحيط الهندي', en: 'Indian Ocean' },
    price: 2495,
    originalPrice: 3299,
    duration: { ar: '7 أيام', en: '7 Days' },
    rating: 4.9,
    reviews: 847,
    guests: 2,
    image: 'https://images.unsplash.com/photo-1620483829646-8fb1d8162108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMG92ZXJ3YXRlciUyMHZpbGxhJTIwc3Vuc2V0fGVufDF8fHx8MTc1NjUzOTE2NHww&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      { ar: 'فيلا مائية خاصة', en: 'Private Overwater Villa' },
      { ar: 'إفطار شامل', en: 'All-Inclusive Breakfast' },
      { ar: 'نقل بالطائرة المائية', en: 'Seaplane Transfer' },
      { ar: 'سبا عالمي', en: 'World-Class Spa' }
    ],
    highlights: [
      { ar: 'غروب خاص', en: 'Private Sunset' },
      { ar: 'غطس مع الدلافين', en: 'Dolphin Diving' },
      { ar: 'عشاء رومانسي', en: 'Romantic Dinner' }
    ]
  },
  {
    id: 2,
    name: { ar: 'جبال الألب السويسرية', en: 'Swiss Alpine Luxury' },
    location: { ar: 'زيرمات، سويسرا', en: 'Zermatt, Switzerland' },
    price: 1895,
    originalPrice: 2599,
    duration: { ar: '6 أيام', en: '6 Days' },
    rating: 4.8,
    reviews: 623,
    guests: 4,
    image: 'https://images.unsplash.com/photo-1633974242338-e87a5e02214c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMGx1eHVyeSUyMGFscGluZSUyMGNoYWxldCUyMG1vdW50YWluc3xlbnwxfHx8fDE3NTY1NDI4OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      { ar: 'شاليه جبلي فاخر', en: 'Luxury Mountain Chalet' },
      { ar: 'تزلج خاص', en: 'Private Skiing' },
      { ar: 'إطلالة مونبلان', en: 'Mont Blanc Views' },
      { ar: 'مطعم حائز جوائز', en: 'Award-Winning Restaurant' }
    ],
    highlights: [
      { ar: 'رحلة هليكوبتر', en: 'Helicopter Tour' },
      { ar: 'تدليك ألبي', en: 'Alpine Spa' },
      { ar: 'تجربة الثلج', en: 'Snow Experience' }
    ]
  },
  {
    id: 3,
    name: { ar: 'دبي الملكية', en: 'Dubai Royal Experience' },
    location: { ar: 'دبي، الإمارات', en: 'Dubai, UAE' },
    price: 1695,
    originalPrice: 2299,
    duration: { ar: '5 أيام', en: '5 Days' },
    rating: 4.7,
    reviews: 892,
    guests: 2,
    image: 'https://images.unsplash.com/photo-1735320864239-798f9bd96c3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGJ1cmolMjBhbCUyMGFyYWIlMjBzdWl0ZSUyMHRlcnJhY2V8ZW58MXx8fHwxNzU2NTQyODkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      { ar: 'جناح ملكي', en: 'Royal Suite' },
      { ar: 'ليموزين خاصة', en: 'Private Limousine' },
      { ar: 'مرشد شخصي', en: 'Personal Guide' },
      { ar: 'تسوق حصري', en: 'Exclusive Shopping' }
    ],
    highlights: [
      { ar: 'برج خليفة VIP', en: 'Burj Khalifa VIP' },
      { ar: 'عشاء صحراوي', en: 'Desert Dinner' },
      { ar: 'طيران خاص', en: 'Private Jet' }
    ]
  },
  {
    id: 4,
    name: { ar: 'سانتوريني الرومانسية', en: 'Romantic Santorini' },
    location: { ar: 'سانتوريني، اليونان', en: 'Santorini, Greece' },
    price: 1295,
    originalPrice: 1799,
    duration: { ar: '6 أيام', en: '6 Days' },
    rating: 4.9,
    reviews: 756,
    guests: 2,
    image: 'https://images.unsplash.com/photo-1581873328926-829e53d85d06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBpbmZpbml0eSUyMHBvb2wlMjBjYWxkZXJhfGVufDF8fHx8MTc1NjU0Mjg5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      { ar: 'فيلا خاصة', en: 'Private Villa' },
      { ar: 'مسبح لا متناهي', en: 'Infinity Pool' },
      { ar: 'إطلالة الغروب', en: 'Sunset Views' },
      { ar: 'يخت خاص', en: 'Private Yacht' }
    ],
    highlights: [
      { ar: 'جولة الجزر', en: 'Island Hopping' },
      { ar: 'تذوق النبيذ', en: 'Wine Tasting' },
      { ar: 'حفل زفاف', en: 'Wedding Ceremony' }
    ]
  },
  {
    id: 5,
    name: { ar: 'اليابان الثقافية', en: 'Cultural Japan' },
    location: { ar: 'كيوتو، اليابان', en: 'Kyoto, Japan' },
    price: 995,
    originalPrice: 1399,
    duration: { ar: '8 أيام', en: '8 Days' },
    rating: 4.8,
    reviews: 634,
    guests: 2,
    image: 'https://images.unsplash.com/photo-1696454833067-bac121528d6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMGN1bHR1cmFsJTIwdGVtcGxlJTIwa3lvdG98ZW58MXx8fHwxNzU2NTQzMDYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      { ar: 'ريوكان تقليدي', en: 'Traditional Ryokan' },
      { ar: 'حفل الشاي', en: 'Tea Ceremony' },
      { ar: 'جولة المعابد', en: 'Temple Tours' },
      { ar: 'طعام الكايسيكي', en: 'Kaiseki Dining' }
    ],
    highlights: [
      { ar: 'جبل فوجي', en: 'Mount Fuji' },
      { ar: 'حديقة الخيزران', en: 'Bamboo Forest' },
      { ar: 'الجيشا التقليدية', en: 'Traditional Geisha' }
    ]
  },
  {
    id: 6,
    name: { ar: 'إيطاليا الساحرة', en: 'Enchanting Italy' },
    location: { ar: 'توسكانا، إيطاليا', en: 'Tuscany, Italy' },
    price: 895,
    originalPrice: 1299,
    duration: { ar: '7 أيام', en: '7 Days' },
    rating: 4.6,
    reviews: 543,
    guests: 4,
    image: 'https://images.unsplash.com/photo-1527409208255-fd7f12b0b341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFseSUyMHJlbmFpc3NhbmNlJTIwZmxvcmVuY2UlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU2NTQzMDYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      { ar: 'فيلا توسكان', en: 'Tuscan Villa' },
      { ar: 'جولة النبيذ', en: 'Wine Tours' },
      { ar: 'دروس الطبخ', en: 'Cooking Classes' },
      { ar: 'جولات فنية', en: 'Art Tours' }
    ],
    highlights: [
      { ar: 'روما العتيقة', en: 'Ancient Rome' },
      { ar: 'فلورنسا الفنية', en: 'Artistic Florence' },
      { ar: 'ساحل أمالفي', en: 'Amalfi Coast' }
    ]
  }
]

export default function DestinationsShowcase({ language, themeColor, isDarkMode }: DestinationsShowcaseProps) {
  const [likedDestinations, setLikedDestinations] = useState<Set<number>>(new Set())
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { elementRef: gridRef, isVisible: gridVisible, getStaggeredClass } = useStaggeredAnimation(premiumDestinations.length, 150)

  const content = {
    ar: {
      header: 'وجهاتنا الحصرية المنتقاة',
      subtitle: 'تجارب سفر استثنائية مع أسعار مميزة',
      bookNow: 'احجز الآن',
      viewDetails: 'التفاصيل',
      from: 'من',
      guests: 'ضيف',
      save: 'وفر',
      exploreAll: 'استكشف جميع الوجهات'
    },
    en: {
      header: 'Our Exclusive Curated Destinations',
      subtitle: 'Exceptional travel experiences with premium pricing',
      bookNow: 'Book Now',
      viewDetails: 'Details',
      from: 'From',
      guests: 'guests',
      save: 'Save',
      exploreAll: 'Explore All Destinations'
    }
  }

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const newLiked = new Set(likedDestinations)
    if (newLiked.has(id)) {
      newLiked.delete(id)
    } else {
      newLiked.add(id)
    }
    setLikedDestinations(newLiked)
  }

  return (
    <section className={`py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Premium Section Header */}
        <div ref={headerRef} className={`text-center mb-16 ${getAnimationClass('fadeUp', headerVisible)}`}>
          <div 
            className="inline-flex items-center px-6 py-3 rounded-full backdrop-blur-sm border mb-8 cursor-pointer
              transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${themeColor}15, ${themeColor}08)`,
              borderColor: `${themeColor}30`,
              boxShadow: `0 8px 32px ${themeColor}15`
            }}
          >
            <MapPin className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" style={{ color: themeColor }} />
            <span className="font-semibold" style={{ color: themeColor }}>
              {language === 'ar' ? 'وجهات مميزة' : 'Premium Destinations'}
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
          
          <p className="max-w-3xl mx-auto leading-relaxed text-[24px] font-bold"
            style={{ 
              color: isDarkMode ? 'rgba(156, 163, 175, 1)' : themeColor,
              opacity: isDarkMode ? 1 : 0.8
            }}
          >
            {content[language].subtitle}
          </p>
        </div>

        {/* Professional Flip Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {premiumDestinations.map((destination, index) => {
            const isLiked = likedDestinations.has(destination.id)
            const savings = destination.originalPrice - destination.price

            const staggered = getStaggeredClass(index, 'scale')
            
            return (
              <div
                key={destination.id}
                className={`group relative h-[420px] cursor-pointer ${staggered.className}`}
                style={staggered.style}
              >
                {/* Flip Card Container */}
                <div className="relative w-full h-full transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
                  
                  {/* FRONT CARD */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden
                    bg-white dark:bg-gray-800 transition-all duration-500 border-2"
                    style={{
                      borderColor: `${themeColor}40`,
                      boxShadow: `
                        0 20px 80px rgba(0,0,0,0.15), 
                        0 0 0 1px ${themeColor}20,
                        0 0 20px ${themeColor}10,
                        inset 0 1px 0 rgba(255,255,255,0.1)
                      `
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = themeColor
                      e.currentTarget.style.boxShadow = `
                        0 30px 100px rgba(0,0,0,0.2), 
                        0 0 0 2px ${themeColor}60,
                        0 0 40px ${themeColor}30,
                        0 0 80px ${themeColor}15,
                        inset 0 1px 0 rgba(255,255,255,0.2)
                      `
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${themeColor}40`
                      e.currentTarget.style.boxShadow = `
                        0 20px 80px rgba(0,0,0,0.15), 
                        0 0 0 1px ${themeColor}20,
                        0 0 20px ${themeColor}10,
                        inset 0 1px 0 rgba(255,255,255,0.1)
                      `
                      e.currentTarget.style.transform = 'translateY(0px) scale(1)'
                    }}
                  >
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <ImageWithFallback
                        src={destination.image}
                        alt={destination.name[language]}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      
                      {/* Professional Like Button */}
                      <button
                        onClick={(e) => toggleLike(destination.id, e)}
                        className="absolute top-4 right-4 w-12 h-12 rounded-full backdrop-blur-sm 
                          flex items-center justify-center transition-all duration-500
                          cursor-pointer group border-2"
                        style={{
                          background: isLiked 
                            ? `linear-gradient(135deg, #ef4444, #dc2626)` 
                            : `rgba(255,255,255,0.9)`,
                          borderColor: isLiked ? '#ef4444' : `${themeColor}40`,
                          boxShadow: isLiked 
                            ? `0 0 20px #ef444460, 0 8px 32px rgba(239,68,68,0.3)`
                            : `0 4px 16px rgba(0,0,0,0.1), 0 0 0 1px ${themeColor}20`
                        }}
                        onMouseEnter={(e) => {
                          if (isLiked) {
                            e.currentTarget.style.boxShadow = `
                              0 0 40px #ef4444FF,
                              0 0 80px #ef444680,
                              0 12px 40px rgba(239,68,68,0.4)
                            `
                            e.currentTarget.style.transform = 'scale(1.15) rotate(5deg)'
                          } else {
                            e.currentTarget.style.borderColor = themeColor
                            e.currentTarget.style.boxShadow = `
                              0 0 30px ${themeColor}60,
                              0 8px 32px ${themeColor}30,
                              inset 0 1px 0 rgba(255,255,255,0.3)
                            `
                            e.currentTarget.style.transform = 'scale(1.15)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (isLiked) {
                            e.currentTarget.style.boxShadow = `0 0 20px #ef444460, 0 8px 32px rgba(239,68,68,0.3)`
                            e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
                          } else {
                            e.currentTarget.style.borderColor = `${themeColor}40`
                            e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,0,0,0.1), 0 0 0 1px ${themeColor}20`
                            e.currentTarget.style.transform = 'scale(1)'
                          }
                        }}
                      >
                        <Heart 
                          className={`w-6 h-6 transition-all duration-300 ${
                            isLiked 
                              ? 'text-white fill-current drop-shadow-lg' 
                              : 'text-gray-600 dark:text-gray-300 group-hover:scale-110'
                          }`}
                          style={{
                            filter: isLiked ? 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' : 'none'
                          }}
                        />
                        
                        {/* Heart Beat Animation */}
                        {isLiked && (
                          <div 
                            className="absolute inset-0 rounded-full animate-ping opacity-30"
                            style={{ backgroundColor: '#ef4444' }}
                          />
                        )}
                        
                        {/* Glow Ring on Hover */}
                        <div 
                          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
                            transition-opacity duration-500 -z-10"
                          style={{
                            background: `radial-gradient(circle, ${isLiked ? '#ef444440' : `${themeColor}40`} 0%, transparent 70%)`,
                            transform: 'scale(1.8)'
                          }}
                        />
                      </button>

                      {/* Professional Savings Badge */}
                      {savings > 0 && (
                        <div 
                          className="absolute top-4 left-4 px-4 py-2 rounded-full text-white font-bold
                            backdrop-blur-sm border-2 transition-all duration-500 cursor-pointer
                            hover:scale-110 group relative overflow-hidden"
                          style={{ 
                            background: `linear-gradient(135deg, ${themeColor}FF, ${themeColor}BB)`,
                            borderColor: `${themeColor}80`,
                            boxShadow: `
                              0 0 20px ${themeColor}60,
                              0 8px 32px ${themeColor}40,
                              inset 0 1px 0 rgba(255,255,255,0.3)
                            `,
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `
                              0 0 40px ${themeColor}FF,
                              0 0 80px ${themeColor}60,
                              0 12px 40px ${themeColor}50,
                              inset 0 1px 0 rgba(255,255,255,0.5)
                            `
                            e.currentTarget.style.textShadow = '0 0 15px rgba(255,255,255,0.8)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = `
                              0 0 20px ${themeColor}60,
                              0 8px 32px ${themeColor}40,
                              inset 0 1px 0 rgba(255,255,255,0.3)
                            `
                            e.currentTarget.style.textShadow = '0 2px 4px rgba(0,0,0,0.3)'
                          }}
                        >
                          <span className="relative z-10">
                            {content[language].save} ${savings}
                          </span>
                          
                          {/* Animated Background Glow */}
                          <div 
                            className="absolute inset-0 rounded-full opacity-60"
                            style={{
                              background: `conic-gradient(from 0deg, ${themeColor}80, ${themeColor}FF, ${themeColor}60, ${themeColor}FF, ${themeColor}80)`,
                              animation: 'badge-glow 3s linear infinite'
                            }}
                          />
                          
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                            transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                            transition-transform duration-800 ease-out rounded-full" />
                          
                          {/* Pulsing Glow Ring */}
                          <div 
                            className="absolute inset-0 rounded-full opacity-40"
                            style={{
                              background: `radial-gradient(circle, transparent 60%, ${themeColor}40 70%, transparent 80%)`,
                              animation: 'badge-pulse 2s ease-in-out infinite'
                            }}
                          />
                          
                          {/* Badge Animations */}
                          <style dangerouslySetInnerHTML={{
                            __html: `
                              @keyframes badge-glow {
                                0% { 
                                  transform: rotate(0deg);
                                  opacity: 0.6;
                                }
                                50% {
                                  opacity: 0.8;
                                }
                                100% { 
                                  transform: rotate(360deg);
                                  opacity: 0.6;
                                }
                              }
                              
                              @keyframes badge-pulse {
                                0%, 100% { 
                                  transform: scale(1);
                                  opacity: 0.4;
                                }
                                50% { 
                                  transform: scale(1.2);
                                  opacity: 0.7;
                                }
                              }
                            `
                          }} />
                        </div>
                      )}

                      {/* Professional Location Pin */}
                      <div className="absolute bottom-4 left-4 flex items-center text-white 
                        px-3 py-2 rounded-full backdrop-blur-md border border-white/30
                        transition-all duration-300 cursor-pointer hover:scale-105 group"
                        style={{
                          background: 'rgba(0,0,0,0.4)',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${themeColor}80`
                          e.currentTarget.style.borderColor = `${themeColor}FF`
                          e.currentTarget.style.boxShadow = `
                            0 0 20px ${themeColor}60,
                            0 8px 32px ${themeColor}30
                          `
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(0,0,0,0.4)'
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)'
                        }}
                      >
                        <MapPin 
                          className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 transition-all duration-300 
                            group-hover:scale-110"
                          style={{
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                          }}
                        />
                        <span className="text-sm font-medium"
                          style={{
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                          }}
                        >
                          {destination.location[language]}
                        </span>
                        
                        {/* Location Glow Effect */}
                        <div 
                          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
                            transition-opacity duration-500 -z-10"
                          style={{
                            background: `radial-gradient(circle, ${themeColor}30 0%, transparent 70%)`,
                            transform: 'scale(1.5)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Title */}
                      <h3 className="text-xl font-bold mb-2 line-clamp-1"
                        style={{ 
                          color: isDarkMode ? '#ffffff' : themeColor,
                          textShadow: isDarkMode 
                            ? `0 0 15px ${themeColor}30` 
                            : '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      >
                        {destination.name[language]}
                      </h3>

                      {/* Rating & Reviews */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1 rtl:ml-1 rtl:mr-0" fill="currentColor" />
                          <span className="font-semibold text-gray-900 dark:text-white text-sm mr-1 rtl:ml-1 rtl:mr-0">
                            {destination.rating}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({destination.reviews})
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <Users className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          <span>{destination.guests} {content[language].guests}</span>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold" style={{ color: themeColor }}>
                            ${destination.price}
                          </span>
                          {destination.originalPrice > destination.price && (
                            <span className="text-sm text-gray-400 line-through ml-2 rtl:mr-2 rtl:ml-0">
                              ${destination.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {destination.duration[language]}
                        </span>
                      </div>

                      {/* Premium Action Button */}
                      <button 
                        className="w-full py-3 rounded-xl font-bold text-white transition-all duration-500 
                          transform cursor-pointer relative overflow-hidden group"
                        style={{
                          background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                          boxShadow: `0 8px 32px ${themeColor}40`
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `linear-gradient(135deg, ${themeColor}FF, ${themeColor}BB)`
                          e.currentTarget.style.boxShadow = `
                            0 0 30px ${themeColor}80,
                            0 0 60px ${themeColor}60,
                            0 0 100px ${themeColor}40,
                            0 15px 40px ${themeColor}50,
                            inset 0 1px 0 rgba(255,255,255,0.3)
                          `
                          e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)'
                          e.currentTarget.style.textShadow = `0 0 20px rgba(255,255,255,0.8)`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`
                          e.currentTarget.style.boxShadow = `0 8px 32px ${themeColor}40`
                          e.currentTarget.style.transform = 'scale(1) translateY(0px)'
                          e.currentTarget.style.textShadow = 'none'
                        }}
                      >
                        {/* Button Content */}
                        <span className="relative z-10 flex items-center justify-center">
                          {content[language].bookNow}
                          <ArrowRight className={`w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 transition-transform duration-300 
                            group-hover:translate-x-1 ${language === 'ar' ? 'rtl:group-hover:-translate-x-1' : ''}`} />
                        </span>
                        
                        {/* Neon Pulse Effect */}
                        <div 
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `radial-gradient(circle at center, ${themeColor}60 0%, transparent 70%)`,
                            animation: 'neon-pulse 2s ease-in-out infinite'
                          }}
                        />
                        
                        {/* Moving Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                          transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                          transition-transform duration-1000 ease-out rounded-xl" />
                        
                        {/* Electric Border Effect */}
                        <div 
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            boxShadow: `inset 0 0 20px ${themeColor}40, inset 0 0 40px ${themeColor}20`,
                            border: `1px solid ${themeColor}60`
                          }}
                        />

                        {/* Corner Sparks */}
                        <div 
                          className="absolute top-1 left-1 w-2 h-2 rounded-full opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: themeColor,
                            boxShadow: `0 0 10px ${themeColor}FF, 0 0 20px ${themeColor}80`,
                            animation: 'spark-dance 1.5s ease-in-out infinite'
                          }}
                        />
                        <div 
                          className="absolute top-1 right-1 w-2 h-2 rounded-full opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: themeColor,
                            boxShadow: `0 0 10px ${themeColor}FF, 0 0 20px ${themeColor}80`,
                            animation: 'spark-dance 1.5s ease-in-out infinite 0.3s'
                          }}
                        />
                        <div 
                          className="absolute bottom-1 left-1 w-2 h-2 rounded-full opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: themeColor,
                            boxShadow: `0 0 10px ${themeColor}FF, 0 0 20px ${themeColor}80`,
                            animation: 'spark-dance 1.5s ease-in-out infinite 0.6s'
                          }}
                        />
                        <div 
                          className="absolute bottom-1 right-1 w-2 h-2 rounded-full opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: themeColor,
                            boxShadow: `0 0 10px ${themeColor}FF, 0 0 20px ${themeColor}80`,
                            animation: 'spark-dance 1.5s ease-in-out infinite 0.9s'
                          }}
                        />
                        
                        {/* Advanced Button Animations */}
                        <style dangerouslySetInnerHTML={{
                          __html: `
                            @keyframes neon-pulse {
                              0%, 100% { 
                                opacity: 0.6;
                                transform: scale(1);
                              }
                              50% { 
                                opacity: 1;
                                transform: scale(1.05);
                              }
                            }
                            
                            @keyframes spark-dance {
                              0%, 100% { 
                                opacity: 1;
                                transform: scale(1) rotate(0deg);
                              }
                              25% { 
                                opacity: 0.8;
                                transform: scale(1.2) rotate(90deg);
                              }
                              50% { 
                                opacity: 1;
                                transform: scale(0.8) rotate(180deg);
                              }
                              75% { 
                                opacity: 0.9;
                                transform: scale(1.1) rotate(270deg);
                              }
                            }
                          `
                        }} />
                      </button>
                    </div>
                  </div>

                  {/* BACK CARD */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden
                    bg-white dark:bg-gray-800 shadow-xl p-6 flex flex-col justify-between"
                    style={{
                      background: isDarkMode 
                        ? `linear-gradient(135deg, rgba(31,41,55,0.95) 0%, rgba(17,24,39,0.95) 100%)`
                        : `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,250,251,0.95) 100%)`,
                      boxShadow: `0 20px 80px rgba(0,0,0,0.15), 0 0 0 1px ${themeColor}20`
                    }}
                  >
                    {/* Features Section */}
                    <div>
                      <div className="flex items-center mb-4">
                        <BookOpen className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" style={{ color: themeColor }} />
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          {language === 'ar' ? 'المميزات المشمولة' : 'Included Features'}
                        </h4>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        {destination.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <div 
                              className="w-2 h-2 rounded-full mt-2 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0"
                              style={{ backgroundColor: themeColor }}
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                              {feature[language]}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Highlights */}
                      <div className="mb-6">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">
                          {language === 'ar' ? 'أبرز المعالم' : 'Highlights'}
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {destination.highlights.map((highlight, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm
                                border transition-all duration-300 cursor-pointer hover:scale-105"
                              style={{
                                background: `${themeColor}10`,
                                color: themeColor,
                                borderColor: `${themeColor}30`
                              }}
                            >
                              {highlight[language]}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button 
                        className="w-full py-3 rounded-xl font-bold text-white transition-all duration-300 
                          transform hover:scale-105 hover:shadow-lg cursor-pointer"
                        style={{
                          background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                          boxShadow: `0 8px 32px ${themeColor}40`
                        }}
                      >
                        {content[language].bookNow}
                      </button>
                      
                      <button 
                        className="w-full py-3 rounded-xl font-semibold transition-all duration-300 
                          transform hover:scale-105 border-2 cursor-pointer hover:shadow-lg"
                        style={{
                          borderColor: themeColor,
                          color: themeColor,
                          background: 'transparent'
                        }}
                      >
                        {content[language].viewDetails}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button 
            className="px-12 py-4 rounded-2xl font-bold text-white transition-all duration-300 
              transform hover:scale-105 hover:shadow-2xl cursor-pointer group relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
              boxShadow: `0 16px 64px ${themeColor}40`
            }}
          >
            <span className="relative z-10 flex items-center justify-center">
              {content[language].exploreAll}
              <ArrowRight className={`w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 transition-transform duration-300 
                group-hover:translate-x-1 ${language === 'ar' ? 'rtl:group-hover:-translate-x-1' : ''}`} />
            </span>
            
            {/* Button Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
              transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>
      </div>
    </section>
  )
}