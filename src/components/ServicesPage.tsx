import { useState } from 'react'
import { 
  Plane, Car, Ship, Hotel, Home, Trees, Map, Mountain, Utensils, Heart, Users, Briefcase, FileText, Shield, DollarSign, Crown, Star, Check, ChevronDown, ArrowRight, Globe, Calendar, CheckCircle, Headphones, Target, Settings, CreditCard, Award
} from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface ServicesPageProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
}

// Service categories data
const serviceCategories = [
  {
    id: 1,
    icon: Plane,
    title: { ar: 'خدمات الطيران والنقل', en: 'Aviation & Transportation' },
    services: [
      {
        icon: Plane,
        title: { ar: 'حجز تذاكر الطيران', en: 'Flight Booking' },
        items: [
          { ar: 'درجة رجال الأعمال والأولى', en: 'Business & First Class' },
          { ar: 'رحلات اقتصادية بأفضل الأسعار', en: 'Economy flights at best prices' },
          { ar: 'طيران خاص وتشارتر', en: 'Private & Charter flights' }
        ]
      },
      {
        icon: Car,
        title: { ar: 'خدمات النقل البري', en: 'Ground Transportation' },
        items: [
          { ar: 'سيارات VIP مع سائق', en: 'VIP cars with driver' },
          { ar: 'حافلات سياحية فاخرة', en: 'Luxury tour buses' },
          { ar: 'تأجير سيارات متنوعة', en: 'Various car rentals' }
        ]
      },
      {
        icon: Ship,
        title: { ar: 'النقل البحري', en: 'Marine Transportation' },
        items: [
          { ar: 'رحلات كروز فاخرة', en: 'Luxury cruise trips' },
          { ar: 'يخوت خاصة ورحلات بحرية', en: 'Private yachts & sea trips' },
          { ar: 'عبارات سياحية منتظمة', en: 'Regular tourist ferries' }
        ]
      }
    ]
  },
  {
    id: 2,
    icon: Hotel,
    title: { ar: 'الإقامة والضيافة', en: 'Accommodation & Hospitality' },
    services: [
      {
        icon: Hotel,
        title: { ar: 'الفنادق الفاخرة', en: 'Luxury Hotels' },
        items: [
          { ar: 'منتجعات 5 نجوم حصرية', en: 'Exclusive 5-star resorts' },
          { ar: 'فنادق بوتيك مميزة', en: 'Distinguished boutique hotels' },
          { ar: 'أجنحة رئاسية وملكية', en: 'Presidential & royal suites' }
        ]
      },
      {
        icon: Home,
        title: { ar: 'الإقامات البديلة', en: 'Alternative Accommodations' },
        items: [
          { ar: 'فلل خاصة مفروشة', en: 'Private furnished villas' },
          { ar: 'شقق فندقية راقية', en: 'Upscale serviced apartments' },
          { ar: 'منازل تراثية أصيلة', en: 'Authentic heritage homes' }
        ]
      },
      {
        icon: Trees,
        title: { ar: 'المنتجعات المتخصصة', en: 'Specialized Resorts' },
        items: [
          { ar: 'منتجعات السبا والاستجمام', en: 'Spa & wellness resorts' },
          { ar: 'منتجعات المغامرات', en: 'Adventure resorts' },
          { ar: 'منتجعات الأطفال والعائلات', en: 'Family & kids resorts' }
        ]
      }
    ]
  },
  {
    id: 3,
    icon: Map,
    title: { ar: 'الجولات والأنشطة', en: 'Tours & Activities' },
    services: [
      {
        icon: Map,
        title: { ar: 'الجولات الثقافية', en: 'Cultural Tours' },
        items: [
          { ar: 'جولات المتاحف والمعالم', en: 'Museums & landmarks tours' },
          { ar: 'التجارب التراثية الأصيلة', en: 'Authentic heritage experiences' },
          { ar: 'ورش الحرف التقليدية', en: 'Traditional craft workshops' }
        ]
      },
      {
        icon: Mountain,
        title: { ar: 'جولات المغامرة', en: 'Adventure Tours' },
        items: [
          { ar: 'رحلات السفاري الصحراوية', en: 'Desert safari trips' },
          { ar: 'تسلق الجبال والمشي', en: 'Mountain climbing & hiking' },
          { ar: 'الرياضات المائية', en: 'Water sports' }
        ]
      },
      {
        icon: Utensils,
        title: { ar: 'التجارب الطعام', en: 'Food Experiences' },
        items: [
          { ar: 'جولات الطبخ المحلي', en: 'Local cooking tours' },
          { ar: 'تذوق المأكولات الفاخرة', en: 'Gourmet food tasting' },
          { ar: 'العشاء مع العائلات المحلية', en: 'Dinner with local families' }
        ]
      }
    ]
  },
  {
    id: 4,
    icon: Heart,
    title: { ar: 'خدمات متخصصة', en: 'Specialized Services' },
    services: [
      {
        icon: Heart,
        title: { ar: 'رحلات شهر العسل', en: 'Honeymoon Trips' },
        items: [
          { ar: 'باكجات رومانسية حصرية', en: 'Exclusive romantic packages' },
          { ar: 'احتفالات زفاف وجهة', en: 'Destination wedding celebrations' },
          { ar: 'تجارب رومانسية فريدة', en: 'Unique romantic experiences' }
        ]
      },
      {
        icon: Users,
        title: { ar: 'السفر العائلي', en: 'Family Travel' },
        items: [
          { ar: 'برامج مصممة للأطفال', en: 'Child-friendly programs' },
          { ar: 'أنشطة تعليمية ترفيهية', en: 'Educational entertainment activities' },
          { ar: 'إقامات صديقة للعائلة', en: 'Family-friendly accommodations' }
        ]
      },
      {
        icon: Briefcase,
        title: { ar: 'سفر الأعمال', en: 'Business Travel' },
        items: [
          { ar: 'تنظيم المؤتمرات والمعارض', en: 'Conference & exhibition organization' },
          { ar: 'برامج الحوافز للشركات', en: 'Corporate incentive programs' },
          { ar: 'اجتماعات العمل الفاخرة', en: 'Luxury business meetings' }
        ]
      }
    ]
  },
  {
    id: 5,
    icon: FileText,
    title: { ar: 'الخدمات المساندة', en: 'Support Services' },
    services: [
      {
        icon: FileText,
        title: { ar: 'التأشيرات والوثائق', en: 'Visas & Documents' },
        items: [
          { ar: 'استخراج التأشيرات السياحية', en: 'Tourist visa processing' },
          { ar: 'تصديق الوثائق الرسمية', en: 'Official document authentication' },
          { ar: 'خدمات الترجمة المعتمدة', en: 'Certified translation services' }
        ]
      },
      {
        icon: Shield,
        title: { ar: 'التأمين والحماية', en: 'Insurance & Protection' },
        items: [
          { ar: 'تأمين السفر الشامل', en: 'Comprehensive travel insurance' },
          { ar: 'تأمين الإلغاء والتأجيل', en: 'Cancellation & delay insurance' },
          { ar: 'خدمات الطوارئ الطبية', en: 'Medical emergency services' }
        ]
      },
      {
        icon: DollarSign,
        title: { ar: 'الخدمات المالية', en: 'Financial Services' },
        items: [
          { ar: 'صرف العملات بأفضل الأسعار', en: 'Currency exchange at best rates' },
          { ar: 'خدمات البنك المتنقل', en: 'Mobile banking services' },
          { ar: 'بطاقات السفر المدفوعة مقدماً', en: 'Prepaid travel cards' }
        ]
      }
    ]
  },
  {
    id: 6,
    icon: Crown,
    title: { ar: 'خدمات VIP الحصرية', en: 'Exclusive VIP Services' },
    services: [
      {
        icon: Crown,
        title: { ar: 'الخدمات الملكية', en: 'Royal Services' },
        items: [
          { ar: 'مرافق شخصي متخصص', en: 'Specialized personal companion' },
          { ar: 'خدمة الكونسيرج 24/7', en: '24/7 concierge service' },
          { ar: 'وصول حصري للأماكن المميزة', en: 'Exclusive access to premium locations' }
        ]
      },
      {
        icon: Plane,
        title: { ar: 'الطيران الخاص', en: 'Private Aviation' },
        items: [
          { ar: 'طائرات خاصة بأحجام مختلفة', en: 'Private jets of various sizes' },
          { ar: 'مطارات VIP وصالات حصرية', en: 'VIP airports & exclusive lounges' },
          { ar: 'خدمات الطعام الفاخر على متن الطائرة', en: 'Luxury in-flight dining services' }
        ]
      }
    ]
  }
]

// Featured services data
const featuredServices = [
  {
    id: 1,
    icon: Globe,
    title: { ar: 'حجز الرحلات الدولية', en: 'International Flight Booking' },
    description: { ar: 'خبرة 17 عامًا في حجز أفضل الرحلات الدولية بأسعار تنافسية وخيارات متنوعة لجميع الدرجات', en: '17 years of experience booking the best international flights at competitive prices with diverse options for all classes' },
    features: [
      { ar: 'أفضل الأسعار مضمونة', en: 'Best prices guaranteed' },
      { ar: 'مقاعد مؤكدة حتى في الموسم', en: 'Confirmed seats even in peak season' },
      { ar: 'تغيير مجاني للمواعيد', en: 'Free date changes' }
    ],
    price: '$320',
    cta: { ar: 'احجز رحلتك', en: 'Book Your Flight' },
    image: "https://images.unsplash.com/photo-1700811476854-52f99a9f2ec1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhaXJwbGFuZSUyMGZpcnN0JTIwY2xhc3N8ZW58MXx8fHwxNzU2NTUyNzExfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    icon: Heart,
    title: { ar: 'باكجات شهر العسل', en: 'Honeymoon Packages' },
    description: { ar: 'تجارب رومانسية لا تُنسى في أجمل الوجهات العالمية مع خدمات حصرية للأزواج الجدد', en: 'Unforgettable romantic experiences in the most beautiful destinations worldwide with exclusive services for newlyweds' },
    features: [
      { ar: 'إقامة في أجنحة رومانسية', en: 'Stay in romantic suites' },
      { ar: 'عشاء رومانسي على الشاطئ', en: 'Romantic beachside dinner' },
      { ar: 'خدمات سبا للأزواج', en: 'Couples spa services' }
    ],
    price: '$2,267',
    cta: { ar: 'صمم شهر عسلك', en: 'Design Your Honeymoon' },
    image: "https://images.unsplash.com/photo-1575908739966-50e20acd9847?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25leW1vb24lMjByb21hbnRpYyUyMGJlYWNoJTIwc3Vuc2V0fGVufDF8fHx8MTc1NjU1MjcxNnww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    icon: Map,
    title: { ar: 'الجولات الثقافية', en: 'Cultural Tours' },
    description: { ar: 'اكتشف حضارات العالم وثقافاتها الغنية مع مرشدين متخصصين وتجارب أصيلة لا تُنسى', en: 'Discover world civilizations and their rich cultures with specialized guides and unforgettable authentic experiences' },
    features: [
      { ar: 'مرشدين معتمدين ومتخصصين', en: 'Certified specialized guides' },
      { ar: 'دخول حصري للمواقع التاريخية', en: 'Exclusive access to historical sites' },
      { ar: 'تجارب طعام محلية أصيلة', en: 'Authentic local food experiences' }
    ],
    price: '$747',
    cta: { ar: 'استكشف الثقافات', en: 'Explore Cultures' },
    image: "https://images.unsplash.com/photo-1647179500576-dfbdc5367045?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMHRvdXIlMjBtdXNldW0lMjBndWlkZXxlbnwxfHx8fDE3NTY1NTI3MTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 4,
    icon: Mountain,
    title: { ar: 'رحلات المغامرة', en: 'Adventure Trips' },
    description: { ar: 'تجارب مثيرة للباحثين عن الإثارة والمغامرة مع أعلى معايير الأمان والتجهيزات المتقدمة', en: 'Thrilling experiences for adventure seekers with highest safety standards and advanced equipment' },
    features: [
      { ar: 'معدات مغامرة احترافية', en: 'Professional adventure equipment' },
      { ar: 'مرشدين خبراء في المغامرة', en: 'Expert adventure guides' },
      { ar: 'تأمين شامل ضد المخاطر', en: 'Comprehensive risk insurance' }
    ],
    price: '$853',
    cta: { ar: 'ابدأ مغامرتك', en: 'Start Your Adventure' },
    image: "https://images.unsplash.com/photo-1519229875649-6b8da16368fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBtb3VudGFpbiUyMGNsaW1iaW5nfGVufDF8fHx8MTc1NjU1MjcyMnww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 5,
    icon: Plane,
    title: { ar: 'الطiران الخاص', en: 'Private Aviation' },
    description: { ar: 'طائرات خاصة متنوعة الأحجام مع خدمات VIP كاملة لرحلات أعمال وترفيهية استثنائية', en: 'Various sized private jets with complete VIP services for exceptional business and leisure flights' },
    features: [
      { ar: 'طائرات حديثة ومجهزة بالكامل', en: 'Modern fully-equipped aircraft' },
      { ar: 'طيار وطاقم محترف', en: 'Professional pilot and crew' },
      { ar: 'خدمات طعام فاخرة', en: 'Luxury catering services' }
    ],
    price: '$15,000',
    cta: { ar: 'احجز طائرتك الخاصة', en: 'Book Your Private Jet' },
    image: "https://images.unsplash.com/photo-1661954864180-e61dea14208a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwamV0JTIwbHV4dXJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU2NTA4NDExfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 6,
    icon: Hotel,
    title: { ar: 'فنادق 7 نجوم', en: '7-Star Hotels' },
    description: { ar: 'إقامة في أرقى وأفخم الفنادق العالمية مع خدمات شخصية وتجارب حصرية', en: 'Stay in the most elegant and luxurious hotels worldwide with personal services and exclusive experiences' },
    features: [
      { ar: 'أجنحة ملكية فاخرة', en: 'Luxury royal suites' },
      { ar: 'خدمة كونسيرج شخصية', en: 'Personal concierge service' },
      { ar: 'تجارب طعام حصرية', en: 'Exclusive dining experiences' }
    ],
    price: '$2,000',
    cta: { ar: 'احجز إقامتك الفاخرة', en: 'Book Your Luxury Stay' },
    image: "https://images.unsplash.com/photo-1590490359854-dfba19688d70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHN1aXRlJTIwYmVkcm9vbXxlbnwxfHx8fDE3NTY1NDI3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
]

// Process steps data
const processSteps = [
  {
    id: 1,
    icon: Headphones,
    title: { ar: 'استشارة مجانية شخصية', en: 'Free Personal Consultation' },
    description: { ar: 'جلسة استشارة تفصيلية لفهم احتياجاتك وتفضيلاتك ووضع الخطة المثالية لرحلتك', en: 'Detailed consultation session to understand your needs and preferences and create the perfect plan for your trip' },
    duration: { ar: '30-60 دقيقة', en: '30-60 minutes' }
  },
  {
    id: 2,
    icon: Target,
    title: { ar: 'تخصيص مسار الرحلة', en: 'Trip Itinerary Customization' },
    description: { ar: 'فريقنا يصمم برنامجاً مخصصاً بالكامل حسب ميزانيتك واهتماماتك الشخصية', en: 'Our team designs a completely customized program according to your budget and personal interests' },
    duration: { ar: '24-48 ساعة', en: '24-48 hours' }
  },
  {
    id: 3,
    icon: FileText,
    title: { ar: 'عرض سعر شفاف ومفصل', en: 'Transparent & Detailed Price Quote' },
    description: { ar: 'نقدم لك عرض سعر واضح يشمل جميع التفاصيل بدون أي رسوم مخفية', en: 'We provide you with a clear price quote including all details without any hidden fees' },
    duration: { ar: 'فوري', en: 'Instant' }
  },
  {
    id: 4,
    icon: Settings,
    title: { ar: 'مراجعة وتعديل البرنامج', en: 'Program Review & Modification' },
    description: { ar: 'يمكنك طلب أي تعديلات على البرنامج حتى يصبح مثالياً ومتوافقاً مع رغباتك', en: 'You can request any modifications to the program until it becomes perfect and aligned with your desires' },
    duration: { ar: 'حسب الحاجة', en: 'As needed' }
  },
  {
    id: 5,
    icon: CreditCard,
    title: { ar: 'تأكيد الحجز والدفع الآمن', en: 'Booking Confirmation & Secure Payment' },
    description: { ar: 'حجز مؤكد مع خيارات دفع متنوعة وآمنة مع إمكانية التقسيط المريح', en: 'Confirmed booking with various secure payment options and convenient installment possibilities' },
    duration: { ar: '5 دقائق', en: '5 minutes' }
  },
  {
    id: 6,
    icon: CheckCircle,
    title: { ar: 'ترتيب جميع المتطلبات', en: 'Arranging All Requirements' },
    description: { ar: 'نهتم بكل التفاصيل: التأشيرات، التأمين، النقل، والحجوزات النهائية', en: 'We take care of all details: visas, insurance, transportation, and final reservations' },
    duration: { ar: '5-15 يوم', en: '5-15 days' }
  },
  {
    id: 7,
    icon: Plane,
    title: { ar: 'انطلاق الرحلة مع الدعم', en: 'Trip Launch with Support' },
    description: { ar: 'نرافقك منذ لحظة المغادرة مع دعم على مدار الساعة طوال فترة الرحلة', en: 'We accompany you from departure with 24/7 support throughout the entire trip' },
    duration: { ar: 'طوال الرحلة', en: 'Throughout the trip' }
  },
  {
    id: 8,
    icon: Star,
    title: { ar: 'تقييم التجربة والمتابعة', en: 'Experience Evaluation & Follow-up' },
    description: { ar: 'نتابع معك تجربة الرحلة ونحصل على تقييمك لتحسين خدماتنا المستقبلية', en: 'We follow up with you on the trip experience and get your evaluation to improve our future services' },
    duration: { ar: 'بعد العودة', en: 'After return' }
  }
]

// Service Category Card Component
function ServiceCategoryCard({ category, language, themeColor, isDarkMode, isExpanded, onToggle }: any) {
  const IconComponent = category.icon

  const toggleText = {
    ar: isExpanded ? 'إخفاء التفاصيل' : 'عرض التفاصيل',
    en: isExpanded ? 'Hide Details' : 'View Details'
  }

  return (
    <div className={`service-category-card overflow-hidden rounded-2xl border transition-all duration-500 hover:shadow-2xl
      ${isDarkMode 
        ? 'bg-gray-800/90 border-gray-700 hover:border-gray-600' 
        : 'bg-white/95 border-gray-200 hover:border-gray-300'
      } ${isExpanded ? 'shadow-2xl' : 'shadow-lg'}`}
      style={{
        boxShadow: isExpanded 
          ? `0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px ${themeColor}30`
          : undefined
      }}
    >
      {/* Header */}
      <button 
        onClick={() => onToggle(category.id)}
        className={`w-full p-6 text-left transition-all duration-300 hover:bg-opacity-80 focus:outline-none
          ${isExpanded ? 'pb-4' : 'pb-6'}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <div 
              className={`w-14 h-14 rounded-xl flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0 
                transition-all duration-300 ${isExpanded ? 'scale-110' : 'scale-100'}`}
              style={{
                background: `linear-gradient(135deg, ${themeColor}${isExpanded ? '' : '20'}, ${themeColor}${isExpanded ? 'DD' : '10'})`
              }}
            >
              <IconComponent 
                className={`w-7 h-7 transition-all duration-300 ${isExpanded ? 'scale-110' : ''}`}
                style={{ color: isExpanded ? 'white' : themeColor }}
              />
            </div>
            
            <div className="flex-1">
              <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {category.title[language]}
              </h3>
              
              <div className="flex items-center">
                <span 
                  className={`text-sm font-medium transition-all duration-300 ${isExpanded ? 'underline' : ''}`}
                  style={{ color: themeColor }}
                >
                  {toggleText[language]}
                </span>
                <ChevronDown 
                  className={`w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : 'rotate-0'
                  }`}
                  style={{ color: themeColor }}
                />
              </div>
            </div>
          </div>
          
          <div className={`text-sm px-3 py-1 rounded-full transition-all duration-300 ${
            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            {category.services.length} {language === 'ar' ? 'خدمات' : 'services'}
          </div>
        </div>
      </button>

      {/* Expandable Content */}
      <div className={`accordion-content transition-all duration-500 overflow-hidden ${
        isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className={`px-6 pb-6 border-t ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {category.services.map((service: any, index: number) => {
              const ServiceIcon = service.icon
              return (
                <div 
                  key={index} 
                  className={`service-item p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer group
                    ${isDarkMode 
                      ? 'bg-gray-700/50 hover:bg-gray-700/80 border border-gray-600' 
                      : 'bg-gray-50 hover:bg-white border border-gray-200 hover:border-gray-300'
                    }`}
                  style={{
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <div className="flex items-start mb-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${themeColor}20, ${themeColor}10)`
                      }}
                    >
                      <ServiceIcon 
                        className="w-5 h-5"
                        style={{ color: themeColor }}
                      />
                    </div>
                    <h5 className={`font-semibold text-sm leading-tight ${
                      isDarkMode ? 'text-white group-hover:text-gray-100' : 'text-gray-900 group-hover:text-gray-800'
                    }`}>
                      {service.title[language]}
                    </h5>
                  </div>
                  
                  <div className="space-y-2">
                    {service.items.slice(0, 3).map((item: any, itemIndex: number) => (
                      <div 
                        key={itemIndex}
                        className={`text-xs flex items-start transition-all duration-200 group-hover:translate-x-1
                          ${isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'}`}
                      >
                        <div 
                          className="w-1 h-1 rounded-full mt-1.5 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0"
                          style={{ backgroundColor: themeColor }}
                        />
                        <span className="line-clamp-2 leading-relaxed">
                          {item[language]}
                        </span>
                      </div>
                    ))}
                    {service.items.length > 3 && (
                      <div 
                        className="text-xs mt-2 font-medium"
                        style={{ color: themeColor }}
                      >
                        +{service.items.length - 3} {language === 'ar' ? 'المزيد' : 'more'}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Call to Action */}
          <div className={`mt-6 pt-6 border-t rounded-xl p-4 ${
            isDarkMode 
              ? 'border-gray-700 bg-gray-700/30' 
              : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-1 min-w-0">
                <h4 className={`font-bold text-base mb-1 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {language === 'ar' ? 'هل تحتاج استشارة مخصصة؟' : 'Need personalized consultation?'}
                </h4>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {language === 'ar' 
                    ? 'تحدث مع خبرائنا المتخصصين في هذا المجال' 
                    : 'Talk to our specialists in this area'
                  }
                </p>
              </div>
              <button 
                className={`px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 
                  hover:scale-105 hover:shadow-lg whitespace-nowrap`}
                style={{
                  background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                  boxShadow: `0 4px 16px ${themeColor}30`
                }}
              >
                {language === 'ar' ? 'استشارة مجانية' : 'Free Consultation'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Service Card Component
function ServiceCard({ service, language, themeColor, isDarkMode }: any) {
  const [isHovered, setIsHovered] = useState(false)
  const IconComponent = service.icon

  return (
    <div 
      className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105
        ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}
      style={{
        boxShadow: isHovered 
          ? `0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px ${themeColor}20`
          : '0 10px 30px rgba(0,0,0,0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={service.image}
          alt={service.title[language]}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Price Badge */}
        <div 
          className="absolute top-4 right-4 px-4 py-2 rounded-full backdrop-blur-md text-white font-bold"
          style={{
            background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`
          }}
        >
          {service.price}
        </div>

        {/* Icon */}
        <div 
          className="absolute bottom-4 left-4 w-12 h-12 rounded-xl backdrop-blur-md flex items-center justify-center"
          style={{
            background: `rgba(255,255,255,0.95)`
          }}
        >
          <IconComponent 
            className="w-6 h-6"
            style={{ color: themeColor }}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-3 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {service.title[language]}
        </h3>
        
        <p className={`text-sm mb-4 line-clamp-3 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {service.description[language]}
        </p>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {service.features.slice(0, 3).map((feature: any, index: number) => (
            <div key={index} className="flex items-center text-sm">
              <Check 
                className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0"
                style={{ color: themeColor }}
              />
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                {feature[language]}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button 
          className="w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
            boxShadow: `0 4px 16px ${themeColor}30`
          }}
        >
          {service.cta[language]}
        </button>
      </div>
    </div>
  )
}

// Process Step Component
function ProcessStep({ step, index, language, themeColor, isDarkMode }: any) {
  const IconComponent = step.icon

  return (
    <div className="relative group">
      <div className={`flex items-start space-x-6 rtl:space-x-reverse p-6 rounded-2xl transition-all duration-500
        ${isDarkMode 
          ? 'bg-gray-800/60 hover:bg-gray-800/80 border-gray-700' 
          : 'bg-white/80 hover:bg-white border-gray-200'
        } border backdrop-blur-sm hover:shadow-xl`}
        style={{
          boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
          background: isDarkMode 
            ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.8), rgba(31, 41, 55, 0.6))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8))'
        }}
      >
        {/* Step Number & Icon */}
        <div className="flex flex-col items-center space-y-3">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300"
            style={{
              background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`
            }}
          >
            <IconComponent className="w-8 h-8 text-white relative z-10" />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${themeColor}80, ${themeColor}60)`
            }}
          >
            {index + 1}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <h4 className={`text-lg font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-white group-hover:text-gray-100' : 'text-gray-900 group-hover:text-gray-800'
            }`}>
              {step.title[language]}
            </h4>
            
            <div 
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {step.duration[language]}
            </div>
          </div>
          
          <p className={`text-sm leading-relaxed ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {step.description[language]}
          </p>
        </div>

        {/* Arrow Indicator */}
        {index < processSteps.length - 1 && (
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <ArrowRight 
              className={`w-6 h-6 ${language === 'ar' ? 'rotate-180' : ''} opacity-60`}
              style={{ color: themeColor }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// Main Services Page Component
export default function ServicesPage({ language, themeColor, isDarkMode }: ServicesPageProps) {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)

  // Toggle function for accordion
  const handleCategoryToggle = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const heroText = {
    title: {
      ar: 'اكتشف مجموعة شاملة من خدماتنا السياحية المتميزة التي صُممت خصيصاً لتلبية جميع احتياجاتك وتحقق لك تجربة سفر لا تُنسى',
      en: 'Discover our comprehensive range of premium travel services designed specifically to meet all your needs and deliver an unforgettable travel experience'
    },
    subtitle: {
      ar: 'استكshف خدماتنا',
      en: 'Explore Our Services'
    },
    cta1: {
      ar: 'استكشف خدماتنا',
      en: 'Explore Our Services'
    },
    cta2: {
      ar: 'تحدث مع خبير',
      en: 'Talk to Expert'
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-950' : 'bg-gray-50'
    }`}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-pink-600/10" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {heroText.subtitle[language]}
            </h1>
            
            <p className={`text-lg md:text-xl max-w-4xl mx-auto mb-12 leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {heroText.title[language]}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                className="px-8 py-4 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                  boxShadow: `0 8px 32px ${themeColor}40`
                }}
              >
                {heroText.cta1[language]}
              </button>
              
              <button className={`px-8 py-4 rounded-2xl font-semibold border-2 transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}>
                {heroText.cta2[language]}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {language === 'ar' ? 'فئات الخدمات الرئيسية' : 'Main Service Categories'}
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {language === 'ar' 
                ? 'اختر من بين مجموعتنا الشاملة من الخدمات المصممة لتوفير تجربة سفر استثنائية'
                : 'Choose from our comprehensive collection of services designed to provide an exceptional travel experience'
              }
            </p>
          </div>

          <div className="space-y-6">
            {serviceCategories.map((category, index) => (
              <div key={category.id}>
                <ServiceCategoryCard
                  category={category}
                  language={language}
                  themeColor={themeColor}
                  isDarkMode={isDarkMode}
                  isExpanded={expandedCategory === category.id}
                  onToggle={handleCategoryToggle}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {language === 'ar' ? 'خدماتنا المميزة' : 'Our Featured Services'}
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {language === 'ar' 
                ? 'تعرف على أشهر خدماتنا وأكثرها طلباً من عملائنا حول العالم'
                : 'Discover our most popular and highly requested services from clients worldwide'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <div key={service.id}>
                <ServiceCard
                  service={service}
                  language={language}
                  themeColor={themeColor}
                  isDarkMode={isDarkMode}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {language === 'ar' ? 'كيف نخطط لرحلتك المثالية' : 'How We Plan Your Perfect Trip'}
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {language === 'ar' 
                ? 'عملية مدروسة من 8 خطوات لضمان حصولك على تجربة سفر لا تُنسى'
                : 'A carefully designed 8-step process to ensure you get an unforgettable travel experience'
              }
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <div key={step.id}>
                  <ProcessStep
                    step={step}
                    index={index}
                    language={language}
                    themeColor={themeColor}
                    isDarkMode={isDarkMode}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`p-12 rounded-3xl ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border`}
            style={{
              background: isDarkMode 
                ? `linear-gradient(135deg, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.9))`
                : `linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(249, 250, 251, 0.8))`,
              boxShadow: '0 25px 60px rgba(0,0,0,0.1)'
            }}
          >
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {language === 'ar' ? 'جاهز لبدء رحلتك القادمة؟' : 'Ready to Start Your Next Journey?'}
            </h3>
            
            <p className={`text-lg mb-8 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {language === 'ar' 
                ? 'تواصل معنا اليوم واحصل على استشارة مجانية لتخطيط رحلة أحلامك'
                : 'Contact us today and get a free consultation to plan your dream trip'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-8 py-4 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                  boxShadow: `0 8px 32px ${themeColor}40`
                }}
              >
                {language === 'ar' ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
              </button>
              
              <button className={`px-8 py-4 rounded-2xl font-semibold border-2 transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}>
                {language === 'ar' ? 'تصفح الباكجات' : 'Browse Packages'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}