import { useState, useEffect, useRef } from 'react'
import { 
  Building,
  Globe,
  Award,
  Trophy,
  Smartphone,
  Crown,
  Users,
  Shield,
  Target,
  Heart,
  Lightbulb,
  Handshake,
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  MapPin,
  Plane,
  TrendingUp,
  Clock,
  Phone,
  DollarSign,
  Settings,
  Eye,
  Flag,
  ChevronRight,
  LinkedinIcon
} from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface AboutPageProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
}

// Leadership team data
const teamMembers = [
  {
    id: 1,
    name: { ar: 'المهندس عبدالرحمن السالم', en: 'Eng. Abdulrahman Al-Salem' },
    position: { ar: 'المدير التنفيذي والمؤسس', en: 'CEO & Founder' },
    experience: { ar: '20+ سنة في صناعة السفر والسياحة', en: '20+ years in travel & tourism industry' },
    specialization: { ar: 'خبير في السفر الفاخر والرحلات الملكية', en: 'Expert in luxury travel and royal trips' },
    education: { ar: 'ماجستير إدارة أعمال - جامعة الملك سعود', en: 'MBA - King Saud University' },
    achievement: { ar: 'قاد أكثر من 500 رحلة VIP لشخصيات مرموقة', en: 'Led 500+ VIP trips for distinguished personalities' },
    image: "https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBDRU8lMjBleGVjdXRpdmUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY1NTIyODR8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    name: { ar: 'الأستاذة سارة العثمان', en: 'Sarah Al-Othman' },
    position: { ar: 'مديرة العمليات والتطوير', en: 'Operations & Development Director' },
    experience: { ar: '15+ سنة في تطوير الخدمات السياحية', en: '15+ years in tourism services development' },
    specialization: { ar: 'خبيرة في التخطيط الاستراتيجي وضمان الجودة', en: 'Expert in strategic planning and quality assurance' },
    education: { ar: 'بكالوريوس سياحة وفندقة - جامعة الأمير سلطان', en: 'Bachelor in Tourism & Hospitality - Prince Sultan University' },
    achievement: { ar: 'طورت نظام الجودة الحاصل على ISO 9001', en: 'Developed ISO 9001 certified quality system' },
    image: "https://images.unsplash.com/photo-1754298949882-216a1c92dbb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3dvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2NTUyMjg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    name: { ar: 'الأستاذ محمد الحربي', en: 'Mohammed Al-Harbi' },
    position: { ar: 'مدير المبيعات والشراكات', en: 'Sales & Partnerships Director' },
    experience: { ar: '12+ سنة في مبيعات السفر المتخصصة', en: '12+ years in specialized travel sales' },
    specialization: { ar: 'خبير في بناء الشراكات الاستراتيجية', en: 'Expert in building strategic partnerships' },
    education: { ar: 'بكالوريوس تسويق - جامعة الملك فهد للبترول', en: 'Bachelor in Marketing - KFUPM' },
    achievement: { ar: 'حقق أعلى معدلات نمو في المبيعات 5 سنوات متتالية', en: 'Achieved highest sales growth rates for 5 consecutive years' },
    image: "https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHN1aXQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY0NTY2MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 4,
    name: { ar: 'الدكتورة منى الشهري', en: 'Dr. Muna Al-Shehri' },
    position: { ar: 'مديرة تجربة العملاء', en: 'Customer Experience Director' },
    experience: { ar: '18+ سنة في خدمة العملاء المتميزة', en: '18+ years in exceptional customer service' },
    specialization: { ar: 'خبيرة في تصميم التجارب الاستثنائية', en: 'Expert in designing exceptional experiences' },
    education: { ar: 'دكتوراه في إدارة الضيافة - جامعة إنترناشيونال', en: 'PhD in Hospitality Management - International University' },
    achievement: { ar: 'حققت معدل رضا عملاء 99.2% لمدة 3 سنوات', en: 'Achieved 99.2% customer satisfaction rate for 3 years' },
    image: "https://images.unsplash.com/photo-1754298949882-216a1c92dbb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmZW1hbGUlMjBleGVjdXRpdmUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY1NTIyOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 5,
    name: { ar: 'المهندس خالد الغامدي', en: 'Eng. Khalid Al-Ghamdi' },
    position: { ar: 'مدير التقنية والابتكار', en: 'Technology & Innovation Director' },
    experience: { ar: '10+ سنوات في تقنيات السفر الرقمية', en: '10+ years in digital travel technologies' },
    specialization: { ar: 'خبير في حلول السفر الذكية والأتمتة', en: 'Expert in smart travel solutions and automation' },
    education: { ar: 'ماجستير هندسة البرمجيات - KAUST', en: 'Master in Software Engineering - KAUST' },
    achievement: { ar: 'طور منصة الحجز الذكي الحاصلة على براءة اختراع', en: 'Developed patented smart booking platform' },
    image: "https://images.unsplash.com/photo-1712174766230-cb7304feaafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWNoJTIwZXhlY3V0aXZlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2NTUyMjk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 6,
    name: { ar: 'الأستاذ أحمد الدوسري', en: 'Ahmed Al-Dosari' },
    position: { ar: 'المدير المالي', en: 'Financial Director' },
    experience: { ar: '14+ سنة في الإدارة المالية للشركات', en: '14+ years in corporate financial management' },
    specialization: { ar: 'خبير في التخطيط المالي وإدارة المخاطر', en: 'Expert in financial planning and risk management' },
    education: { ar: 'ماجستير محاسبة - جامعة الملك عبدالعزيز', en: 'Master in Accounting - King Abdulaziz University' },
    achievement: { ar: 'حافظ على نمو مالي مستدام بمعدل 25% سنوياً', en: 'Maintained sustainable financial growth at 25% annually' },
    image: "https://images.unsplash.com/photo-1736939678218-bd648b5ef3bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBmaW5hbmNpYWwlMjBkaXJlY3RvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjU1MjI5OHww&ixlib=rb-4.1.0&q=80&w=1080"
  }
]

// Timeline milestones data
const timelineMilestones = [
  {
    id: 1,
    year: '2007',
    icon: Building,
    title: { ar: 'البداية المتميزة', en: 'Distinguished Beginning' },
    content: { ar: 'تأسست الشركة برؤية طموحة لتقديم خدمات سفر استثنائية للعملاء العرب، بدأنا بفريق صغير من 5 خبراء سفر متخصصين', en: 'Company founded with ambitious vision to provide exceptional travel services for Arab clients, started with small team of 5 specialized travel experts' },
    achievement: { ar: '100 عميل في العام الأول', en: '100 clients in first year' }
  },
  {
    id: 2,
    year: '2012',
    icon: Globe,
    title: { ar: 'التوسع الإقليمي', en: 'Regional Expansion' },
    content: { ar: 'افتتحنا 3 فروع جديدة في الرياض وجدة والدمام، وأصبحنا الوكيل الحصري لـ 25 منتجع فاخر حول العالم', en: 'Opened 3 new branches in Riyadh, Jeddah and Dammam, became exclusive agent for 25 luxury resorts worldwide' },
    achievement: { ar: 'وصلنا لـ 5,000 عميل سنوياً', en: 'Reached 5,000 clients annually' }
  },
  {
    id: 3,
    year: '2017',
    icon: Trophy,
    title: { ar: 'التميز والاعتراف', en: 'Excellence & Recognition' },
    content: { ar: 'حصدنا جائزة أفضل وكالة سفر في المملكة العربية السعودية، وأطلقنا برنامج الولاء الماسي للعملاء المميزين', en: 'Won best travel agency award in Saudi Arabia, launched diamond loyalty program for distinguished clients' },
    achievement: { ar: 'جائزة التميز السياحي الذهبية', en: 'Golden Tourism Excellence Award' }
  },
  {
    id: 4,
    year: '2020',
    icon: Smartphone,
    title: { ar: 'التحول الرقمي', en: 'Digital Transformation' },
    content: { ar: 'أطلقنا منصتنا الرقمية المتقدمة مع تقنيات الذكاء الاصطناعي لتخصيص الرحلات، وقدمنا خدمات الحجز الافتراضي', en: 'Launched advanced digital platform with AI technologies for trip customization, introduced virtual booking services' },
    achievement: { ar: '25,000 حجز رقمي ناجح', en: '25,000 successful digital bookings' }
  },
  {
    id: 5,
    year: '2024',
    icon: Crown,
    title: { ar: 'الريادة المطلقة', en: 'Absolute Leadership' },
    content: { ar: 'أصبحنا الشركة الرائدة في السفر الفاخر مع شبكة من 200+ شريك عالمي، وفريق من 50 خبير سفر معتمد دولياً', en: 'Became leading company in luxury travel with network of 200+ global partners, team of 50 internationally certified travel experts' },
    achievement: { ar: 'أكثر من 50,000 عميل راضٍ', en: '50,000+ satisfied clients' }
  }
]

// Competitive advantages data
const advantages = [
  {
    id: 1,
    icon: Crown,
    title: { ar: 'خبرة عريقة وموثوقة', en: 'Established & Trusted Experience' },
    description: { ar: '17 عامًا من التميز في تنظيم أكثر من 75,000 رحلة ناجحة للعملاء العرب حول العالم مع معدل رضا استثنائي', en: '17 years of excellence organizing 75,000+ successful trips for Arab clients worldwide with exceptional satisfaction rate' }
  },
  {
    id: 2,
    icon: Globe,
    title: { ar: 'شبكة شراكات عالمية حصرية', en: 'Exclusive Global Partnership Network' },
    description: { ar: 'شراكات استراتيجية مع أكثر من 200 شريك عالمي في 85 دولة تضمن لك أفضل الأسعار والخدمات الحصرية', en: 'Strategic partnerships with 200+ global partners in 85 countries ensuring best prices and exclusive services' }
  },
  {
    id: 3,
    icon: Users,
    title: { ar: 'فريق خبراء معتمدين دولياً', en: 'Internationally Certified Expert Team' },
    description: { ar: '50 خبير سفر معتمد من أفضل المعاهد العالمية، كل منهم متخصص في مناطق جغرافية محددة لضمان أعلى جودة', en: '50 certified travel experts from top global institutes, each specialized in specific geographical regions ensuring highest quality' }
  },
  {
    id: 4,
    icon: Clock,
    title: { ar: 'دعم لا ينقطع على مدار الساعة', en: 'Round-the-Clock Support' },
    description: { ar: 'خدمة عملاء استثنائية متاحة 24/7 بـ 3 لغات مع خط ساخن مخصص للطوارئ في جميع أنحاء العالم', en: 'Exceptional customer service available 24/7 in 3 languages with dedicated emergency hotline worldwide' }
  },
  {
    id: 5,
    icon: DollarSign,
    title: { ar: 'ضمان أفضل سعر أو استرداد مضاعف', en: 'Best Price Guarantee or Double Refund' },
    description: { ar: 'نضمن لك أفضل الأسعار في السوق، وفي حال وجود سعر أقل، نعيد لك الفرق مضاعفاً دون أي شروط معقدة', en: 'We guarantee best market prices, if you find lower price, we refund double the difference without complex conditions' }
  },
  {
    id: 6,
    icon: Settings,
    title: { ar: 'تخصيص كامل حسب رغباتك', en: 'Complete Customization to Your Preferences' },
    description: { ar: 'كل رحلة مصممة خصيصاً لك باستخدام تقنيات الذكاء الاصطناعي وخبرة فريقنا لضمان تجربة فريدة لا تتكرر', en: 'Every trip custom-designed for you using AI technologies and our team expertise ensuring unique unrepeatable experience' }
  },
  {
    id: 7,
    icon: Shield,
    title: { ar: 'أمان وحماية شاملة', en: 'Comprehensive Security & Protection' },
    description: { ar: 'تأمين شامل ضد جميع المخاطر، بروتوكولات أمان متقدمة، وضمانات مالية كاملة لحماية استثمارك في الرحلة', en: 'Comprehensive insurance against all risks, advanced security protocols, complete financial guarantees protecting your trip investment' }
  },
  {
    id: 8,
    icon: Star,
    title: { ar: 'معاملة VIP في كل مرحلة', en: 'VIP Treatment at Every Stage' },
    description: { ar: 'من لحظة التخطيط حتى العودة، تحصل على معاملة VIP مع خدمات حصرية تليق بمكانتك وتتجاوز توقعاتك', en: 'From planning moment to return, you receive VIP treatment with exclusive services befitting your status and exceeding expectations' }
  }
]

// Team Card Component
function TeamCard({ member, language, themeColor, isDarkMode }: any) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div 
      className="group relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Professional Portrait */}
      <div className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src={member.image}
          alt={member.name[language]}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Social Media Link */}
        <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:scale-110 transition-transform">
            <LinkedinIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {member.name[language]}
        </h3>
        <p className="text-lg font-semibold mb-4" style={{ color: themeColor }}>
          {member.position[language]}
        </p>
        
        <div className="space-y-3">
          <div className="flex items-start">
            <Clock className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-gray-500" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {member.experience[language]}
            </p>
          </div>
          
          <div className="flex items-start">
            <Target className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-gray-500" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {member.specialization[language]}
            </p>
          </div>
        </div>

        {/* Expandable Details */}
        <div className={`mt-4 space-y-3 transition-all duration-500 overflow-hidden ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex items-start">
            <Award className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-gray-500" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {member.education[language]}
            </p>
          </div>
          
          <div className="flex items-start">
            <Trophy className="w-4 h-4 mr-3 mt-1 flex-shrink-0" style={{ color: themeColor }} />
            <p className="text-sm font-semibold" style={{ color: themeColor }}>
              {member.achievement[language]}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Timeline Component
function Timeline({ milestones, language, themeColor, isDarkMode }: any) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleItems(prev => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 }
    )

    const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item')
    timelineItems?.forEach(item => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={timelineRef} className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 to-gray-500 dark:from-gray-600 dark:to-gray-400"></div>
      
      <div className="space-y-12">
        {milestones.map((milestone: any, index: number) => {
          const Icon = milestone.icon
          const isVisible = visibleItems.includes(index)
          
          return (
            <div 
              key={milestone.id}
              className={`timeline-item relative flex items-start transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              data-index={index}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Timeline Icon */}
              <div 
                className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg mr-8"
                style={{ 
                  background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                  boxShadow: `0 8px 32px ${themeColor}40`
                }}
              >
                <Icon className="w-8 h-8" />
                
                {/* Pulse Animation */}
                {isVisible && (
                  <div 
                    className="absolute inset-0 rounded-full animate-ping opacity-30"
                    style={{ backgroundColor: themeColor }}
                  />
                )}
              </div>

              {/* Content Card */}
              <div className="flex-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {milestone.title[language]}
                  </h3>
                  <span 
                    className="text-3xl font-bold px-4 py-2 rounded-xl text-white"
                    style={{ backgroundColor: themeColor }}
                  >
                    {milestone.year}
                  </span>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {milestone.content[language]}
                </p>
                
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  <span className="font-semibold" style={{ color: themeColor }}>
                    {milestone.achievement[language]}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let start = 0
    const increment = end / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isVisible, end, duration])

  return (
    <div ref={ref} className="text-4xl lg:text-5xl font-bold">
      {count.toLocaleString()}{suffix}
    </div>
  )
}

export default function AboutPage({ language, themeColor, isDarkMode }: AboutPageProps) {
  const content = {
    ar: {
      hero: {
        title: 'قصة تميز في عالم السفر والسياحة الفاخرة',
        subtitle: 'رحلة 17 عامًا من الإبداع والتميز في خدمة أحلام المسافرين العرب حول العالم'
      },
      timeline: {
        title: 'رحلتنا عبر السنين - قصة نجاح ملهمة'
      },
      team: {
        title: 'فريق القيادة - خبراء السفر الأكثر تميزاً',
        subtitle: 'نخبة من القادة المحترفين الذين يقودون رؤيتنا نحو التميز المطلق'
      },
      advantages: {
        title: 'لماذا نحن الخيار الأمثل لرحلاتكم المميزة؟',
        subtitle: 'مزايا تنافسية حصرية تجعلنا الشريك الأوثق لتحقيق أحلام سفركم'
      },
      statistics: {
        title: 'إنجازاتنا وأرقامنا المتميزة تتحدث عنا',
        subtitle: 'أرقام حقيقية تعكس التزامنا بالتميز والجودة العالية',
        clients: 'إجمالي العملاء الراضين',
        satisfaction: 'معدل الرضا والتقييم الإيجابي',
        rating: 'متوسط التقييمات على جميع المنصات',
        experience: 'سنة من الخبرة والتميز المتواصل',
        countries: 'دولة في شبكة وجهاتنا المميزة',
        partners: 'شريك موثوق حول العالم',
        experts: 'خبير سفر معتمد دولياً',
        support: 'ساعات الدعم المتواصل',
        awards: 'جائزة تميز محلية وإقليمية'
      },
      values: {
        title: 'قيمنا ورسالتنا التي توجه مسيرتنا',
        mission: {
          title: 'رسالتنا',
          content: 'نسعى لأن نكون الخيار الأول والأوثق للمسافرين العرب الباحثين عن تجارب سفر استثنائية، من خلال تقديم خدمات متميزة تجمع بين الأصالة العربية والمعايير العالمية للجودة والتميز'
        },
        vision: {
          title: 'رؤيتنا',
          content: 'أن نصبح أكبر وأرقى شبكة خدمات سفر في المنطقة العربية بحلول 2030، مع الحفاظ على قيم التميز والأصالة والابتكار في كل ما نقدمه لعملائنا الكرام'
        },
        coreValues: [
          { icon: Star, title: 'التميز', description: 'نسعى للكمال في كل تفصيلة' },
          { icon: Handshake, title: 'الثقة', description: 'نبني علاقات طويلة الأمد مع عملائنا' },
          { icon: Lightbulb, title: 'الابتكار', description: 'نطور حلولاً إبداعية لتجارب فريدة' },
          { icon: Heart, title: 'الأصالة', description: 'نفتخر بهويتنا العربية في خدماتنا' },
          { icon: Award, title: 'الاحترافية', description: 'نلتزم بأعلى معايير الجودة العالمية' },
          { icon: Shield, title: 'المسؤولية', description: 'نهتم بالاستدامة والأثر الإيجابي' }
        ]
      }
    },
    en: {
      hero: {
        title: 'A Story of Excellence in Luxury Travel & Tourism',
        subtitle: 'A 17-year journey of creativity and excellence serving Arab travelers\' dreams worldwide'
      },
      timeline: {
        title: 'Our Journey Through Years - An Inspiring Success Story'
      },
      team: {
        title: 'Leadership Team - Most Distinguished Travel Experts',
        subtitle: 'Elite of professional leaders driving our vision towards absolute excellence'
      },
      advantages: {
        title: 'Why We Are The Best Choice for Your Distinguished Trips?',
        subtitle: 'Exclusive competitive advantages making us the most trusted partner for your travel dreams'
      },
      statistics: {
        title: 'Our Outstanding Achievements and Numbers Speak for Us',
        subtitle: 'Real numbers reflecting our commitment to excellence and high quality',
        clients: 'Total Satisfied Clients',
        satisfaction: 'Satisfaction and Positive Rating Rate',
        rating: 'Average Ratings Across All Platforms',
        experience: 'Years of Continuous Experience and Excellence',
        countries: 'Countries in Our Distinguished Destinations Network',
        partners: 'Trusted Partners Worldwide',
        experts: 'Internationally Certified Travel Experts',
        support: 'Hours of Continuous Support',
        awards: 'Local and Regional Excellence Awards'
      },
      values: {
        title: 'Our Values and Mission That Guide Our Journey',
        mission: {
          title: 'Our Mission',
          content: 'We strive to be the first and most trusted choice for Arab travelers seeking exceptional travel experiences, by providing distinguished services that combine Arab authenticity with international standards of quality and excellence'
        },
        vision: {
          title: 'Our Vision',
          content: 'To become the largest and most prestigious travel services network in the Arab region by 2030, while maintaining values of excellence, authenticity and innovation in everything we provide to our valued clients'
        },
        coreValues: [
          { icon: Star, title: 'Excellence', description: 'We strive for perfection in every detail' },
          { icon: Handshake, title: 'Trust', description: 'We build long-term relationships with our clients' },
          { icon: Lightbulb, title: 'Innovation', description: 'We develop creative solutions for unique experiences' },
          { icon: Heart, title: 'Authenticity', description: 'We take pride in our Arab identity in our services' },
          { icon: Award, title: 'Professionalism', description: 'We commit to highest international quality standards' },
          { icon: Shield, title: 'Responsibility', description: 'We care about sustainability and positive impact' }
        ]
      }
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1718951874134-858868a94efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmF2ZWwlMjBvZmZpY2UlMjB0ZWFtfGVufDF8fHx8MTc1NjU1MjMwMXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Luxury Travel Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              {content[language].hero.title}
            </h1>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed text-gray-200">
              {content[language].hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: themeColor }}
            >
              {content[language].timeline.title}
            </h2>
          </div>
          
          <Timeline 
            milestones={timelineMilestones}
            language={language}
            themeColor={themeColor}
            isDarkMode={isDarkMode}
          />
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: themeColor }}
            >
              {content[language].team.title}
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
              {content[language].team.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamCard
                key={member.id}
                member={member}
                language={language}
                themeColor={themeColor}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: themeColor }}
            >
              {content[language].advantages.title}
            </h2>
            <p className="text-xl max-w-4xl mx-auto text-gray-600 dark:text-gray-400">
              {content[language].advantages.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage) => {
              const Icon = advantage.icon
              return (
                <div 
                  key={advantage.id}
                  className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:scale-105"
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${themeColor}20, ${themeColor}10)`,
                      border: `2px solid ${themeColor}30`
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: themeColor }} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {advantage.title[language]}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {advantage.description[language]}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: themeColor }}
            >
              {content[language].statistics.title}
            </h2>
            <p className="text-xl max-w-4xl mx-auto text-gray-600 dark:text-gray-400">
              {content[language].statistics.subtitle}
            </p>
          </div>
          
          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Top Row - Client Satisfaction */}
            <div className="text-center bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <div style={{ color: themeColor }} className="mb-4">
                <AnimatedCounter end={75847} />
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {content[language].statistics.clients}
              </p>
            </div>
            
            <div className="text-center bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <div style={{ color: themeColor }} className="mb-4">
                <AnimatedCounter end={99.2} suffix="%" />
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {content[language].statistics.satisfaction}
              </p>
            </div>
            
            <div className="text-center bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <div style={{ color: themeColor }} className="mb-4">
                <AnimatedCounter end={4.9} suffix="/5" />
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {content[language].statistics.rating}
              </p>
            </div>
          </div>

          {/* Middle Row - Business Scale */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <div style={{ color: themeColor }} className="mb-4">
                <AnimatedCounter end={17} suffix="+" />
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {content[language].statistics.experience}
              </p>
            </div>
            
            <div className="text-center bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <div style={{ color: themeColor }} className="mb-4">
                <AnimatedCounter end={85} />
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {content[language].statistics.countries}
              </p>
            </div>
            
            <div className="text-center bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <div style={{ color: themeColor }} className="mb-4">
                <AnimatedCounter end={200} suffix="+" />
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {content[language].statistics.partners}
              </p>
            </div>
          </div>

          {/* Bottom Row - Team Excellence */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <div style={{ color: themeColor }} className="mb-4">
                <AnimatedCounter end={50} />
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {content[language].statistics.experts}
              </p>
            </div>
            
            <div className="text-center bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <div style={{ color: themeColor }} className="mb-4">
                <AnimatedCounter end={24} suffix="/7" />
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {content[language].statistics.support}
              </p>
            </div>
            
            <div className="text-center bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <div style={{ color: themeColor }} className="mb-4">
                <AnimatedCounter end={15} />
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {content[language].statistics.awards}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: themeColor }}
            >
              {content[language].values.title}
            </h2>
          </div>
          
          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 mr-4" style={{ color: themeColor }} />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {content[language].values.mission.title}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {content[language].values.mission.content}
              </p>
            </div>
            
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center mb-6">
                <Eye className="w-8 h-8 mr-4" style={{ color: themeColor }} />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {content[language].values.vision.title}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {content[language].values.vision.content}
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content[language].values.coreValues.map((value, index) => {
              const Icon = value.icon
              return (
                <div 
                  key={index}
                  className="group text-center bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:scale-105"
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                      boxShadow: `0 8px 32px ${themeColor}40`
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}