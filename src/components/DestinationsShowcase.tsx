import { useState } from 'react'
import { Star, MapPin, Calendar, Users, ArrowRight, Heart, BookOpen, Check, CreditCard, Plane, Shield, Clock, Award } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useScrollAnimation, getAnimationClass, useStaggeredAnimation } from './useScrollAnimation'

interface DestinationsShowcaseProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
}

// 6 Premium Destinations with USD pricing only
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
    category: { ar: 'رحلة شهر العسل', en: 'Honeymoon' },
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
    category: { ar: 'مغامرة العائلة', en: 'Family Adventure' },
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
    category: { ar: 'رحلة فاخرة', en: 'Luxury' },
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
    category: { ar: 'رومانسية', en: 'Romance' },
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
    category: { ar: 'ثقافية', en: 'Cultural' },
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
    category: { ar: 'تاريخية', en: 'Historical' },
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
      subtitle: 'تجارب سفر استثنائية مع أسعار شفافة بالدولار الأمريكي',
      bookNow: 'احجز الآن',
      viewDetails: 'عرض التفاصيل',
      from: 'من',
      perPerson: 'للشخص',
      guests: 'ضيف',
      save: 'وفر',
      exploreAll: 'استكشف جميع الوجهات',
      features: 'المميزات المتضمنة',
      highlights: 'تجارب حصرية',
      totalPrice: 'السعر الكامل',
      featured: 'مميز',
      bestseller: 'الأكثر مبيعاً',
      new: 'جديد'
    },
    en: {
      header: 'Our Exclusive Curated Destinations',
      subtitle: 'Exceptional travel experiences with transparent USD pricing',
      bookNow: 'Book Now',
      viewDetails: 'View Details',
      from: 'From',
      perPerson: 'per person',
      guests: 'guests',
      save: 'Save',
      exploreAll: 'Explore All Destinations',
      features: 'Included Features',
      highlights: 'Exclusive Experiences',
      totalPrice: 'Total Price',
      featured: 'Featured',
      bestseller: 'Bestseller',
      new: 'New'
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

  const getBadgeType = (index: number) => {
    if (index === 0) return 'featured'
    if (index === 1) return 'bestseller'
    if (index === 2) return 'new'
    return null
  }

  const getBadgeColor = (type: string | null) => {
    switch (type) {
      case 'featured':
        return 'bg-gradient-to-r from-purple-500 to-pink-500'
      case 'bestseller':
        return 'bg-gradient-to-r from-orange-500 to-red-500'
      case 'new':
        return 'bg-gradient-to-r from-green-500 to-teal-500'
      default:
        return ''
    }
  }

  return (
    <section className={`py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Premium Section Header */}
        <div ref={headerRef} className={`text-center mb-20 ${getAnimationClass('fadeUp', headerVisible)}`}>
          <div 
            className="inline-flex items-center px-8 py-4 rounded-full backdrop-blur-sm border mb-8 cursor-pointer
              transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${themeColor}15, ${themeColor}08)`,
              borderColor: `${themeColor}30`,
              boxShadow: `0 8px 32px ${themeColor}15`
            }}
          >
            <MapPin className="w-6 h-6 mr-3 rtl:ml-3 rtl:mr-0" style={{ color: themeColor }} />
            <span className="text-lg font-bold" style={{ color: themeColor }}>
              {language === 'ar' ? 'وجهات مميزة' : 'Premium Destinations'}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
            style={{ 
              color: themeColor,
              textShadow: isDarkMode 
                ? `0 0 20px ${themeColor}40, 0 4px 8px rgba(0,0,0,0.3)` 
                : `0 4px 8px rgba(0,0,0,0.1)`
            }}
          >
            {content[language].header}
          </h2>
          
          <p className="max-w-4xl mx-auto leading-relaxed text-xl font-medium"
            style={{ 
              color: isDarkMode ? 'rgba(156, 163, 175, 1)' : themeColor,
              opacity: isDarkMode ? 1 : 0.8
            }}
          >
            {content[language].subtitle}
          </p>
        </div>

        {/* Premium Destination Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {premiumDestinations.map((destination, index) => {
            const isLiked = likedDestinations.has(destination.id)
            const savings = destination.originalPrice - destination.price
            const badgeType = getBadgeType(index)
            const staggered = getStaggeredClass(index, 'scale')
            
            return (
              <div
                key={destination.id}
                className={`group relative h-[520px] cursor-pointer ${staggered.className}`}
                style={staggered.style}
              >
                {/* 3D Flip Card Container */}
                <div className="relative w-full h-full transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
                  
                  {/* FRONT CARD */}
                  <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden
                    bg-white dark:bg-gray-800 shadow-2xl border transition-all duration-500"
                    style={{
                      borderColor: `${themeColor}20`,
                      boxShadow: `
                        0 25px 100px rgba(0,0,0,0.1),
                        0 0 0 1px rgba(255,255,255,0.1),
                        0 8px 40px ${themeColor}10
                      `
                    }}
                  >
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <ImageWithFallback
                        src={destination.image}
                        alt={destination.name[language]}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Enhanced Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Category Badge */}
                      {badgeType && (
                        <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-white text-sm font-bold
                          backdrop-blur-sm border border-white/20 ${getBadgeColor(badgeType)}`}>
                          {content[language][badgeType as keyof typeof content[typeof language]]}
                        </div>
                      )}
                      
                      {/* Savings Badge */}
                      {savings > 0 && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-bold
                          bg-red-500 backdrop-blur-sm border border-red-300">
                          -{Math.round((savings / destination.originalPrice) * 100)}%
                        </div>
                      )}

                      {/* Like Button */}
                      <button
                        onClick={(e) => toggleLike(destination.id, e)}
                        className="absolute bottom-4 right-4 w-12 h-12 rounded-full backdrop-blur-sm 
                          bg-white/90 dark:bg-gray-800/90 flex items-center justify-center transition-all duration-300
                          hover:scale-110 border border-white/20"
                      >
                        <Heart 
                          className={`w-6 h-6 transition-all duration-300 ${
                            isLiked 
                              ? 'text-red-500 fill-current' 
                              : 'text-gray-600 dark:text-gray-300'
                          }`}
                        />
                      </button>

                      {/* Location Pin */}
                      <div className="absolute bottom-4 left-4 flex items-center text-white 
                        px-3 py-2 rounded-full backdrop-blur-md bg-black/40 border border-white/20">
                        <MapPin className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                        <span className="text-sm font-medium">
                          {destination.location[language]}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Category & Rating */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium px-3 py-1 rounded-full"
                          style={{ 
                            background: `${themeColor}15`,
                            color: themeColor
                          }}>
                          {destination.category[language]}
                        </span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                          <span className="font-bold text-sm">{destination.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">({destination.reviews})</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-4 leading-tight"
                        style={{ color: isDarkMode ? '#ffffff' : '#1f2937' }}>
                        {destination.name[language]}
                      </h3>

                      {/* Trip Details */}
                      <div className="flex items-center justify-between mb-6 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{destination.duration[language]}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{destination.guests} {content[language].guests}</span>
                        </div>
                      </div>

                      {/* USD Pricing Section */}
                      <div className="mb-6">
                        <div className="flex items-baseline justify-between">
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold" style={{ color: themeColor }}>
                              ${destination.price.toLocaleString()}
                            </span>
                            {destination.originalPrice > destination.price && (
                              <span className="text-lg text-gray-400 line-through ml-3">
                                ${destination.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          {savings > 0 && (
                            <div className="text-right">
                              <div className="text-sm font-bold text-green-600">
                                {content[language].save} ${savings.toLocaleString()}
                              </div>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {content[language].perPerson}
                        </p>
                      </div>

                      {/* Book Now Button */}
                      <button 
                        className="w-full py-4 rounded-2xl font-bold text-white transition-all duration-500 
                          hover:scale-105 transform relative overflow-hidden group"
                        style={{
                          background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                          boxShadow: `0 8px 32px ${themeColor}30`
                        }}
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          {content[language].bookNow}
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                          transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                          transition-transform duration-700"></div>
                      </button>
                    </div>
                  </div>

                  {/* BACK CARD */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl overflow-hidden
                    bg-white dark:bg-gray-800 shadow-2xl border transition-all duration-500"
                    style={{
                      borderColor: `${themeColor}40`,
                      boxShadow: `
                        0 25px 100px rgba(0,0,0,0.15),
                        0 0 0 2px ${themeColor}20,
                        0 8px 40px ${themeColor}20
                      `
                    }}
                  >
                    {/* Back Card Header */}
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700" 
                      style={{ background: `linear-gradient(135deg, ${themeColor}08, ${themeColor}03)` }}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold" style={{ color: themeColor }}>
                          {destination.name[language]}
                        </h3>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                          <span className="font-bold text-sm">{destination.rating}</span>
                        </div>
                      </div>
                      
                      {/* Prominent USD Pricing */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold" style={{ color: themeColor }}>
                            ${destination.price.toLocaleString()}
                          </span>
                          {destination.originalPrice > destination.price && (
                            <span className="text-xl text-gray-400 line-through ml-3">
                              ${destination.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {destination.duration[language]}
                          </div>
                          <div className="text-xs text-gray-500">
                            {content[language].perPerson}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features & Highlights */}
                    <div className="p-6 space-y-6 overflow-y-auto max-h-80">
                      {/* Features Section */}
                      <div>
                        <h4 className="font-bold mb-3 flex items-center text-lg" style={{ color: themeColor }}>
                          <Check className="w-5 h-5 mr-2" />
                          {content[language].features}
                        </h4>
                        <div className="space-y-2">
                          {destination.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm">
                              <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0" 
                                style={{ backgroundColor: themeColor }}></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                {feature[language]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Highlights Section */}
                      <div>
                        <h4 className="font-bold mb-3 flex items-center text-lg" style={{ color: themeColor }}>
                          <Award className="w-5 h-5 mr-2" />
                          {content[language].highlights}
                        </h4>
                        <div className="space-y-2">
                          {destination.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center text-sm">
                              <Star className="w-4 h-4 mr-3 flex-shrink-0" style={{ color: themeColor }} />
                              <span className="text-gray-700 dark:text-gray-300">
                                {highlight[language]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Service Guarantees */}
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="text-center">
                          <CreditCard className="w-6 h-6 mx-auto mb-2" style={{ color: themeColor }} />
                          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            {language === 'ar' ? 'دفع آمن' : 'Secure Pay'}
                          </span>
                        </div>
                        <div className="text-center">
                          <Shield className="w-6 h-6 mx-auto mb-2" style={{ color: themeColor }} />
                          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            {language === 'ar' ? 'إلغاء مجاني' : 'Free Cancel'}
                          </span>
                        </div>
                        <div className="text-center">
                          <Plane className="w-6 h-6 mx-auto mb-2" style={{ color: themeColor }} />
                          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            {language === 'ar' ? 'دعم 24/7' : '24/7 Support'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Book Now Button */}
                    <div className="p-6">
                      <button 
                        className="w-full py-4 rounded-2xl font-bold text-white transition-all duration-500 
                          hover:scale-105 transform relative overflow-hidden group"
                        style={{
                          background: `linear-gradient(135deg, ${themeColor}, ${themeColor}BB)`,
                          boxShadow: `0 12px 40px ${themeColor}40`
                        }}
                      >
                        <span className="relative z-10 flex items-center justify-center text-lg">
                          {content[language].bookNow}
                          <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                          transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                          transition-transform duration-800"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Explore All Button */}
        <div className="text-center mt-20">
          <button 
            className="px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-105 
              backdrop-blur-sm border-2 relative overflow-hidden group"
            style={{
              background: `linear-gradient(135deg, ${themeColor}10, ${themeColor}05)`,
              borderColor: themeColor,
              color: themeColor,
              boxShadow: `0 8px 32px ${themeColor}20`
            }}
          >
            <span className="relative z-10 flex items-center justify-center">
              {content[language].exploreAll}
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
              transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
              transition-transform duration-700"></div>
          </button>
        </div>
      </div>
    </section>
  )
}