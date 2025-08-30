import { useState, useEffect, useRef } from 'react'
import { 
  Plane,
  Car,
  Ship,
  Hotel,
  Home,
  Trees,
  Map,
  Mountain,
  Utensils,
  Heart,
  Users,
  Briefcase,
  FileText,
  Shield,
  DollarSign,
  Crown,
  Star,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  Clock,
  Award,
  Target,
  Lightbulb,
  Settings,
  Camera,
  Phone,
  Wifi,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Globe,
  Calendar,
  Eye,
  Package,
  Headphones,
  Zap,
  Sparkles
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
    title: { ar: 'الطيران الخاص', en: 'Private Aviation' },
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
  },
  {
    id: 7,
    icon: Ship,
    title: { ar: 'اليخوت الفاخرة', en: 'Luxury Yachts' },
    description: { ar: 'رحلات بحرية فاخرة على متن أجمل اليخوت مع طاقم متخصص وخدمات راقية', en: 'Luxury sea trips aboard the most beautiful yachts with specialized crew and upscale services' },
    features: [
      { ar: 'يخوت فاخرة بتصميم عصري', en: 'Luxury yachts with modern design' },
      { ar: 'طاقم محترف ومدرب', en: 'Professional trained crew' },
      { ar: 'أنشطة بحرية متنوعة', en: 'Various marine activities' }
    ],
    price: '$8,000',
    cta: { ar: 'استأجر يختك', en: 'Charter Your Yacht' },
    image: "https://images.unsplash.com/photo-1648997934392-7213a9ce50b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMG9jZWFuJTIwY3J1aXNlfGVufDF8fHx8MTc1NjQ1Nzg5NHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 8,
    icon: Mountain,
    title: { ar: 'السفاري الصحراوي', en: 'Desert Safari' },
    description: { ar: 'تجارب صحراوية أصيلة مع مخيمات فاخرة وأنشطة تراثية مميزة', en: 'Authentic desert experiences with luxury camps and distinctive heritage activities' },
    features: [
      { ar: 'مخيمات صحراوية فاخرة', en: 'Luxury desert camps' },
      { ar: 'تجارب تراثية أصيلة', en: 'Authentic heritage experiences' },
      { ar: 'أنشطة ترفيهية متنوعة', en: 'Various entertainment activities' }
    ],
    price: '$1,200',
    cta: { ar: 'اكتشف الصحراء', en: 'Discover the Desert' },
    image: "https://images.unsplash.com/photo-1548182397-261253f88d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBzYWZhcmklMjBsdXh1cnklMjBjYW1wfGVufDF8fHx8MTc1NjU1MjczMXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 9,
    icon: Briefcase,
    title: { ar: 'سفر الأعمال', en: 'Business Travel' },
    description: { ar: 'حلول سفر متكاملة للشركات مع خدمات MICE وتنظيم المؤتمرات والمعارض', en: 'Comprehensive corporate travel solutions with MICE services and conference & exhibition organization' },
    features: [
      { ar: 'تنظيم المؤتمرات والمعارض', en: 'Conference & exhibition organization' },
      { ar: 'برامج الحوافز المؤسسية', en: 'Corporate incentive programs' },
      { ar: 'خدمات السفر التنفيذية', en: 'Executive travel services' }
    ],
    price: '$5,000',
    cta: { ar: 'خطط سفر أعمالك', en: 'Plan Your Business Travel' },
    image: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRyYXZlbCUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzU2NTUyNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 10,
    icon: Heart,
    title: { ar: 'السياحة الطبية', en: 'Medical Tourism' },
    description: { ar: 'برامج علاجية متخصصة في أفضل المستشفيات العالمية مع خدمات مرافقة كاملة', en: 'Specialized treatment programs in the best hospitals worldwide with complete companion services' },
    features: [
      { ar: 'مستشفيات عالمية معتمدة', en: 'Accredited international hospitals' },
      { ar: 'أطباء متخصصون', en: 'Specialized doctors' },
      { ar: 'خدمات المرافقة والترجمة', en: 'Companion & translation services' }
    ],
    price: '$12,000',
    cta: { ar: 'استشر طبيبك', en: 'Consult Your Doctor' },
    image: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jaWVyZ2UlMjBzZXJ2aWNlJTIwbHV4dXJ5JTIwaG90ZWx8ZW58MXx8fHwxNzU2NTUyNzQwfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 11,
    icon: FileText,
    title: { ar: 'التأشيرات السريعة', en: 'Fast Visa Processing' },
    description: { ar: 'استخراج جميع أنواع التأشيرات بسرعة وكفاءة مع ضمان الحصول عليها', en: 'Processing all types of visas quickly and efficiently with guarantee of approval' },
    features: [
      { ar: 'استخراج سريع خلال 24 ساعة', en: 'Fast processing within 24 hours' },
      { ar: 'ضمان الحصول على التأشيرة', en: 'Visa approval guarantee' },
      { ar: 'دعم لجميع أنواع التأشيرات', en: 'Support for all visa types' }
    ],
    price: '$200',
    cta: { ar: 'اطلب تأشيرتك', en: 'Apply for Your Visa' },
    image: "https://images.unsplash.com/photo-1743193143977-bc57e2c100ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXNhJTIwZG9jdW1lbnRzJTIwcGFzc3BvcnR8ZW58MXx8fHwxNzU2NTUyNzM3fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 12,
    icon: Headphones,
    title: { ar: 'خدمة الكونسيرج', en: 'Concierge Service' },
    description: { ar: 'خدمات شخصية متكاملة على مدار الساعة لتلبية جميع احتياجاتك أثناء السفر', en: 'Comprehensive personal services 24/7 to meet all your travel needs' },
    features: [
      { ar: 'مساعد شخصي مخصص', en: 'Dedicated personal assistant' },
      { ar: 'خدمة 24/7 في جميع أنحاء العالم', en: '24/7 service worldwide' },
      { ar: 'تنفيذ جميع الطلبات الخاصة', en: 'Fulfillment of all special requests' }
    ],
    price: '$500',
    cta: { ar: 'احصل على مساعدك الشخصي', en: 'Get Your Personal Assistant' },
    image: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jaWVyZ2UlMjBzZXJ2aWNlJTIwbHV4dXJ5JTIwaG90ZWx8ZW58MXx8fHwxNzU2NTUyNzQwfDA&ixlib=rb-4.1.0&q=80&w=1080"
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

// Pricing tiers data - 3 Premium Tiers Only
const pricingTiers = [
  {
    id: 1,
    name: { ar: 'الباكج الفاخر', en: 'Luxury Package' },
    badge: { ar: 'الأكثر طلباً', en: 'Most Popular' },
    price: '$2,080',
    originalPrice: '$2,500',
    duration: { ar: 'رحلة 7 أيام', en: '7-day trip' },
    popular: true,
    description: { ar: 'تجربة سفر فاخرة مع خدمات متميزة وإقامة في أرقى الفنادق', en: 'Luxury travel experience with distinguished services and stay in finest hotels' },
    included: [
      { ar: 'حجز الطيران درجة أولى', en: 'First class flight booking' },
      { ar: 'إقامة في منتجعات 5 نجوم ديلوكس', en: '5-star deluxe resort accommodation' },
      { ar: 'جميع الوجبات + مطاعم فاخرة', en: 'All meals + luxury restaurants' },
      { ar: 'سيارة خاصة مع سائق', en: 'Private car with driver' },
      { ar: 'جولات VIP حصرية', en: 'Exclusive VIP tours' },
      { ar: 'مرشد سياحي VIP شخصي', en: 'Personal VIP tour guide' },
      { ar: 'تأمين السفر البلاتيني', en: 'Platinum travel insurance' },
      { ar: 'كونسيرج شخصي 24/7', en: 'Personal concierge 24/7' },
      { ar: '3 جلسات سبا فاخرة', en: '3 luxury spa sessions' }
    ],
    bonuses: [
      { ar: 'ترقية لأجنحة فاخرة', en: 'Upgrade to luxury suites' },
      { ar: 'تجارب طعام حصرية', en: 'Exclusive dining experiences' },
      { ar: 'هدايا تذكارية فاخرة', en: 'Luxury souvenir gifts' }
    ]
  },
  {
    id: 2,
    name: { ar: 'الباكج الملكي', en: 'Royal Package' },
    badge: { ar: 'الأفضل قيمة', en: 'Best Value' },
    price: '$4,200',
    originalPrice: '$5,000',
    duration: { ar: 'رحلة 10 أيام', en: '10-day trip' },
    popular: false,
    description: { ar: 'تجربة ملكية استثنائية مع خدمات حصرية وإقامة في أرقى الأجنحة', en: 'Exceptional royal experience with exclusive services and stay in finest suites' },
    included: [
      { ar: 'طيران خاص أو درجة أولى', en: 'Private jet or first class' },
      { ar: 'أجنحة ملكية وفلل خاصة', en: 'Royal suites and private villas' },
      { ar: 'شيف خاص للطبخ', en: 'Private chef for cooking' },
      { ar: 'فريق خدمة شخصي كامل', en: 'Complete personal service team' },
      { ar: 'تجارب حصرية لا تتكرر', en: 'Exclusive unrepeatable experiences' },
      { ar: 'تأمين VIP شامل', en: 'Comprehensive VIP insurance' },
      { ar: 'خدمات طبية متخصصة', en: 'Specialized medical services' },
      { ar: 'تصوير احترافي للرحلة', en: 'Professional trip photography' },
      { ar: 'وصول حصري للمواقع المميزة', en: 'Exclusive access to premium locations' }
    ],
    bonuses: [
      { ar: 'وصول حصري للقصور والمتاحف', en: 'Exclusive access to palaces and museums' },
      { ar: 'لقاءات مع شخصيات مهمة', en: 'Meetings with important personalities' },
      { ar: 'تجارب لا تُباع للعموم', en: 'Experiences not sold to public' }
    ]
  },
  {
    id: 3,
    name: { ar: 'الباكج الأسطوري', en: 'Legendary Package' },
    badge: { ar: 'تجربة استثنائية', en: 'Ultimate Experience' },
    price: '$8,500',
    originalPrice: '$10,000',
    duration: { ar: 'رحلة مخصصة بالكامل', en: 'Fully customized trip' },
    popular: false,
    description: { ar: 'أقصى درجات الفخامة والتميز مع تخصيص كامل وخدمات لا محدودة', en: 'Ultimate luxury and excellence with complete customization and unlimited services' },
    included: [
      { ar: 'أسطول طائرات خاصة متاح', en: 'Private jet fleet available' },
      { ar: 'قصور وفلل حصرية', en: 'Exclusive palaces and villas' },
      { ar: 'فريق طهاة عالميين', en: 'World-class chef team' },
      { ar: 'حارس أمن شخصي', en: 'Personal security detail' },
      { ar: 'مخطط رحلات شخصي', en: 'Personal trip planner' },
      { ar: 'طبيب مرافق', en: 'Accompanying physician' },
      { ar: 'مترجم شخصي', en: 'Personal interpreter' },
      { ar: 'كل ما تتمناه متاح', en: 'Everything you wish available' },
      { ar: 'تجارب مستحيلة للآخرين', en: 'Experiences impossible for others' }
    ],
    bonuses: [
      { ar: 'حفل استقبال خاص', en: 'Private welcome ceremony' },
      { ar: 'مأدبة عشاء مع المشاهير', en: 'Celebrity dinner gala' },
      { ar: 'مجموعة هدايا أسطورية', en: 'Legendary gift collection' }
    ]
  }
]

// Add-on services data
const addonServices = [
  {
    category: { ar: 'ترقيات النقل', en: 'Transportation Upgrades' },
    items: [
      { title: { ar: 'ترقية السيارة', en: 'Car Upgrade' }, price: '$53/day' },
      { title: { ar: 'ترقية درجة الطيران', en: 'Flight Class Upgrade' }, price: '$400' },
      { title: { ar: 'رحلة هليكوبتر', en: 'Helicopter Ride' }, price: '$213' }
    ]
  },
  {
    category: { ar: 'تحسينات الإقامة', en: 'Accommodation Enhancements' },
    items: [
      { title: { ar: 'ترقية الغرفة', en: 'Room Upgrade' }, price: '$80/night' },
      { title: { ar: 'خدمة الغرف 24/7', en: '24/7 Room Service' }, price: '$40/day' },
      { title: { ar: 'ترتيب رومانسي للغرفة', en: 'Romantic Room Setup' }, price: '$107' }
    ]
  },
  {
    category: { ar: 'تجارب إضافية', en: 'Additional Experiences' },
    items: [
      { title: { ar: 'عروض وفعاليات خاصة', en: 'Special Shows & Events' }, price: '$133' },
      { title: { ar: 'تذوق النبيذ والطعام', en: 'Wine & Food Tasting' }, price: '$93' },
      { title: { ar: 'مصور شخصي', en: 'Personal Photographer' }, price: '$160/day' }
    ]
  },
  {
    category: { ar: 'الصحة والسبا', en: 'Wellness & Spa' },
    items: [
      { title: { ar: 'جلسات سبا إضافية', en: 'Additional Spa Sessions' }, price: '$107' },
      { title: { ar: 'جلسات يوغا خاصة', en: 'Private Yoga Sessions' }, price: '$53' },
      { title: { ar: 'فحص طبي شامل', en: 'Comprehensive Medical Checkup' }, price: '$213' }
    ]
  },
  {
    category: { ar: 'التسوق والترفيه', en: 'Shopping & Entertainment' },
    items: [
      { title: { ar: 'جولة تسوق مع مستشار', en: 'Shopping Tour with Consultant' }, price: '$80' },
      { title: { ar: 'عروض موسيقية حصرية', en: 'Exclusive Musical Shows' }, price: '$120' },
      { title: { ar: 'ليلة في الكازينو', en: 'Casino Night' }, price: '$67' }
    ]
  },
  {
    category: { ar: 'التقنية والاتصالات', en: 'Technology & Communication' },
    items: [
      { title: { ar: 'جهاز واي فاي محمول', en: 'Portable WiFi Device' }, price: '$21/day' },
      { title: { ar: 'خط هاتف دولي', en: 'International Phone Line' }, price: '$32/week' },
      { title: { ar: 'خدمات الأعمال', en: 'Business Services' }, price: '$53/day' }
    ]
  }
]

// Service Card Component
function ServiceCard({ service, language, themeColor, isDarkMode }: any) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = service.icon

  return (
    <div 
      className="group relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={service.image}
          alt={service.title[language]}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Service Icon */}
        <div 
          className="absolute top-4 left-4 w-12 h-12 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm border border-white/20"
          style={{ backgroundColor: `${themeColor}80` }}
        >
          <Icon className="w-6 h-6" />
        </div>

        {/* Price Badge */}
        <div 
          className="absolute top-4 right-4 px-4 py-2 rounded-xl text-white font-bold backdrop-blur-sm border border-white/20"
          style={{ backgroundColor: `${themeColor}90` }}
        >
          {language === 'ar' ? 'ابتداءً من' : 'Starting from'} {service.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {service.title[language]}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {service.description[language]}
        </p>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {service.features.map((feature: any, index: number) => (
            <div key={index} className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {feature[language]}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          className="w-full py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
            boxShadow: `0 4px 16px ${themeColor}40`
          }}
        >
          <span className="relative z-10">{service.cta[language]}</span>
          {isHovered && (
            <div 
              className="absolute inset-0 opacity-30 transition-opacity duration-300"
              style={{
                background: `linear-gradient(45deg, ${themeColor}80, transparent, ${themeColor}80)`
              }}
            />
          )}
        </button>
      </div>
    </div>
  )
}

// Process Step Component
function ProcessStep({ step, index, language, themeColor, isDarkMode, isVisible }: any) {
  const Icon = step.icon

  return (
    <div 
      className={`relative flex items-start transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Step Number & Icon */}
      <div className="flex flex-col items-center mr-8">
        <div 
          className="relative w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg z-10"
          style={{ 
            background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
            boxShadow: `0 8px 32px ${themeColor}40`
          }}
        >
          <Icon className="w-8 h-8" />
          {isVisible && (
            <div 
              className="absolute inset-0 rounded-full animate-ping opacity-30"
              style={{ backgroundColor: themeColor }}
            />
          )}
        </div>
        
        {/* Step Number */}
        <div 
          className="mt-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
          style={{ backgroundColor: themeColor }}
        >
          {index + 1}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {step.title[language]}
          </h3>
          <span 
            className="px-3 py-1 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: themeColor }}
          >
            {step.duration[language]}
          </span>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {step.description[language]}
        </p>
      </div>
    </div>
  )
}

// Mega Dropdown Component
function MegaDropdown({ category, language, themeColor, isDarkMode, isOpen, onToggle }: any) {
  const Icon = category.icon

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 w-full text-left ${
          isOpen ? 'text-white' : 'text-gray-800 dark:text-gray-200 hover:text-white'
        }`}
        style={{
          background: isOpen 
            ? `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`
            : 'transparent',
          boxShadow: isOpen ? `0 8px 32px ${themeColor}40` : 'none'
        }}
      >
        <Icon className="w-6 h-6" />
        <span className="font-semibold">{category.title[language]}</span>
        <ChevronDown className={`w-5 h-5 ml-auto transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="mt-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {category.services.map((service: any, index: number) => {
              const ServiceIcon = service.icon
              return (
                <div key={index}>
                  <div className="flex items-center mb-3">
                    <ServiceIcon className="w-5 h-5 mr-3" style={{ color: themeColor }} />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {service.title[language]}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {service.items.map((item: any, itemIndex: number) => (
                      <li key={itemIndex} className="flex items-center">
                        <ChevronRight className="w-3 h-3 mr-2 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item[language]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ServicesPage({ language, themeColor, isDarkMode }: ServicesPageProps) {
  const [openCategory, setOpenCategory] = useState<number | null>(null)
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const processRef = useRef<HTMLDivElement>(null)

  const content = {
    ar: {
      hero: {
        title: 'خدماتنا المتكاملة لتجربة سفر لا تُضاهى',
        subtitle: 'مجموعة شاملة من الخدمات الفاخرة المصممة لتلبية جميع احتياجاتك السياحية بأعلى معايير الجودة والتميز',
        cta: 'استكشف جميع خدماتنا'
      },
      categories: {
        title: 'تصفح خدماتنا حسب التخصص',
        subtitle: 'اختر من مجموعة واسعة من الخدمات المتخصصة المصممة لتلبية كافة احتياجاتك'
      },
      featured: {
        title: 'خدماتنا الأكثر طلباً والأعلى تقييماً',
        subtitle: 'اكتشف أشهر خدماتنا التي حازت على ثقة ورضا عملائنا'
      },
      process: {
        title: 'كيف نحول حلم رحلتك إلى حقيقة استثنائية؟',
        subtitle: 'عملية مدروسة ومنظمة لضمان تجربة سفر مثالية من البداية للنهاية'
      },
      pricing: {
        title: 'باكجاتنا وأسعارنا الشفافة لجميع الميزانيات',
        subtitle: 'اختر الباكج الذي يناسب احتياجاتك وميزانيتك مع ضمان الشفافية الكاملة',
        included: 'مشمول',
        notIncluded: 'غير مشمول',
        bonuses: 'مزايا إضافية',
        selectPlan: 'اختر هذا الباكج'
      },
      addons: {
        title: 'خدمات إضافية لتخصيص رحلتك أكثر',
        subtitle: 'أضف لمسات خاصة لرحلتك مع مجموعة من الخدمات الإضافية المميزة'
      }
    },
    en: {
      hero: {
        title: 'Our Comprehensive Services for an Unmatched Travel Experience',
        subtitle: 'A complete range of luxury services designed to meet all your tourism needs with the highest standards of quality and excellence',
        cta: 'Explore All Our Services'
      },
      categories: {
        title: 'Browse Our Services by Specialization',
        subtitle: 'Choose from a wide range of specialized services designed to meet all your needs'
      },
      featured: {
        title: 'Our Most Requested and Highest Rated Services',
        subtitle: 'Discover our most popular services that have earned the trust and satisfaction of our clients'
      },
      process: {
        title: 'How Do We Turn Your Travel Dream into an Exceptional Reality?',
        subtitle: 'A studied and organized process to ensure a perfect travel experience from start to finish'
      },
      pricing: {
        title: 'Our Transparent Packages and Pricing for All Budgets',
        subtitle: 'Choose the package that suits your needs and budget with complete transparency guarantee',
        included: 'Included',
        notIncluded: 'Not Included',
        bonuses: 'Additional Benefits',
        selectPlan: 'Select This Package'
      },
      addons: {
        title: 'Additional Services to Customize Your Trip Further',
        subtitle: 'Add special touches to your trip with a range of distinctive additional services'
      }
    }
  }

  // Handle scroll-triggered animations for process steps
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleSteps(prev => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 }
    )

    const processItems = processRef.current?.querySelectorAll('.process-step')
    processItems?.forEach(item => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1616620418653-c2f1603f507d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmF2ZWwlMjBzZXJ2aWNlcyUyMG1vbnRhZ2V8ZW58MXx8fHwxNzU2NTUyNzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Luxury Travel Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              {content[language].hero.title}
            </h1>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed text-gray-200 mb-12">
              {content[language].hero.subtitle}
            </p>
            
            <button
              className="px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                boxShadow: `0 8px 32px ${themeColor}40`
              }}
            >
              {content[language].hero.cta}
            </button>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: themeColor }}
            >
              {content[language].categories.title}
            </h2>
            <p className="text-xl max-w-4xl mx-auto text-gray-600 dark:text-gray-400">
              {content[language].categories.subtitle}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {serviceCategories.map((category) => (
              <MegaDropdown
                key={category.id}
                category={category}
                language={language}
                themeColor={themeColor}
                isDarkMode={isDarkMode}
                isOpen={openCategory === category.id}
                onToggle={() => setOpenCategory(openCategory === category.id ? null : category.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: themeColor }}
            >
              {content[language].featured.title}
            </h2>
            <p className="text-xl max-w-4xl mx-auto text-gray-600 dark:text-gray-400">
              {content[language].featured.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredServices.map((service, index) => (
              <div
                key={service.id}
                className="animate-fadeIn"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards',
                  opacity: 0
                }}
              >
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

      {/* Process Section */}
      <section className="py-20" ref={processRef}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: themeColor }}
            >
              {content[language].process.title}
            </h2>
            <p className="text-xl max-w-4xl mx-auto text-gray-600 dark:text-gray-400">
              {content[language].process.subtitle}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-12">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className="process-step"
                data-index={index}
              >
                <ProcessStep
                  step={step}
                  index={index}
                  language={language}
                  themeColor={themeColor}
                  isDarkMode={isDarkMode}
                  isVisible={visibleSteps.includes(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: themeColor }}
            >
              {content[language].pricing.title}
            </h2>
            <p className="text-xl max-w-4xl mx-auto text-gray-600 dark:text-gray-400">
              {content[language].pricing.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div 
                key={tier.id}
                className={`relative group transition-all duration-700 hover:scale-105 ${
                  tier.popular ? 'lg:-mt-8 lg:mb-8' : ''
                }`}
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                {/* Main Card */}
                <div 
                  className={`relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-4xl p-10 shadow-2xl border-2 transition-all duration-700 hover:shadow-3xl ${
                    tier.popular 
                      ? 'border-transparent scale-110' 
                      : 'border-gray-200/30 dark:border-gray-700/30 hover:border-opacity-50'
                  }`}
                  style={{
                    borderColor: tier.popular ? `${themeColor}50` : undefined,
                    boxShadow: tier.popular 
                      ? `0 30px 80px ${themeColor}25, 0 0 0 1px ${themeColor}20, inset 0 1px 0 rgba(255,255,255,0.2)` 
                      : '0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.1)',
                    background: tier.popular
                      ? `linear-gradient(135deg, rgba(255,255,255,0.98) 0%, ${themeColor}05 50%, rgba(255,255,255,0.98) 100%)`
                      : undefined
                  }}
                >
                  {/* Popular Badge */}
                  {tier.popular && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div 
                        className="px-8 py-3 rounded-2xl text-white font-bold text-sm tracking-wide shadow-xl"
                        style={{ 
                          background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                          boxShadow: `0 8px 32px ${themeColor}40`
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <Crown className="w-4 h-4" />
                          <span>{tier.badge[language]}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Non-popular Badge */}
                  {!tier.popular && (
                    <div 
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-xl text-white font-semibold text-sm"
                      style={{ backgroundColor: themeColor }}
                    >
                      {tier.badge[language]}
                    </div>
                  )}

                  {/* Header */}
                  <div className="text-center mb-10 mt-6">
                    <h3 className={`font-bold text-gray-900 dark:text-white mb-4 ${
                      tier.popular ? 'text-3xl' : 'text-2xl'
                    }`}>
                      {tier.name[language]}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {tier.description[language]}
                    </p>

                    {/* Pricing */}
                    <div className="mb-4">
                      {tier.originalPrice && (
                        <div className="text-gray-400 line-through text-lg mb-2">
                          {tier.originalPrice}
                        </div>
                      )}
                      <div className="flex items-center justify-center space-x-2">
                        <span 
                          className={`font-bold ${tier.popular ? 'text-5xl' : 'text-4xl'}`}
                          style={{ color: themeColor }}
                        >
                          {tier.price}
                        </span>
                        <div className="text-gray-500 dark:text-gray-400">
                          <div className="text-sm">/ {language === 'ar' ? 'شخص' : 'person'}</div>
                        </div>
                      </div>
                      {tier.originalPrice && (
                        <div 
                          className="text-sm font-semibold mt-2"
                          style={{ color: themeColor }}
                        >
                          {language === 'ar' ? 'وفر ' : 'Save '}
                          ${parseInt(tier.originalPrice.replace('$', '').replace(',', '')) - parseInt(tier.price.replace('$', '').replace(',', ''))}
                        </div>
                      )}
                    </div>
                    
                    <div 
                      className={`text-sm font-medium px-4 py-2 rounded-xl inline-block ${
                        tier.popular ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                      }`}
                      style={{
                        backgroundColor: tier.popular ? `${themeColor}20` : 'rgba(0,0,0,0.05)',
                        border: tier.popular ? `1px solid ${themeColor}30` : '1px solid rgba(0,0,0,0.1)'
                      }}
                    >
                      {tier.duration[language]}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">
                      {content[language].pricing.included}
                    </h4>
                    <ul className="space-y-4">
                      {tier.included.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start group/item">
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 transition-all duration-300 group-hover/item:scale-110"
                            style={{ backgroundColor: `${themeColor}15`, border: `2px solid ${themeColor}` }}
                          >
                            <Check className="w-3 h-3 text-white" style={{ backgroundColor: themeColor }} />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                            {feature[language]}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bonuses */}
                  {tier.bonuses && (
                    <div className="mb-8">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-6 text-lg flex items-center">
                        <Sparkles className="w-5 h-5 mr-2" style={{ color: themeColor }} />
                        {content[language].pricing.bonuses}
                      </h4>
                      <ul className="space-y-4">
                        {tier.bonuses.map((bonus, bonusIndex) => (
                          <li key={bonusIndex} className="flex items-start group/bonus">
                            <div 
                              className="w-6 h-6 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 transition-all duration-300 group-hover/bonus:scale-110"
                              style={{ backgroundColor: `${themeColor}20` }}
                            >
                              <Sparkles className="w-3 h-3" style={{ color: themeColor }} />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                              {bonus[language]}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA Button */}
                  <button
                    className={`w-full py-5 rounded-2xl font-bold text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden group/btn ${
                      tier.popular ? 'text-lg' : ''
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                      boxShadow: `0 12px 40px ${themeColor}35`
                    }}
                  >
                    <span className="relative z-10">{content[language].pricing.selectPlan}</span>
                    
                    {/* Button shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"
                        style={{ opacity: 0.2 }}
                      />
                    </div>
                  </button>
                </div>

                {/* Glow effect for popular card */}
                {tier.popular && (
                  <div 
                    className="absolute inset-0 rounded-4xl opacity-30 -z-10 blur-xl"
                    style={{ backgroundColor: themeColor }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-on Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: themeColor }}
            >
              {content[language].addons.title}
            </h2>
            <p className="text-xl max-w-4xl mx-auto text-gray-600 dark:text-gray-400">
              {content[language].addons.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {addonServices.map((category, index) => (
              <div 
                key={index}
                className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {category.category[language]}
                </h3>
                
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow duration-300"
                    >
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.title[language]}
                      </span>
                      <span 
                        className="text-sm font-bold px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: themeColor }}
                      >
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}