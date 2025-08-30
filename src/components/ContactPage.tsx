import { useState, useEffect, useRef } from 'react'
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Star,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Plus,
  Minus,
  Calendar,
  Users,
  CreditCard,
  Shield,
  AlertCircle,
  MessageCircle,
  Send,
  Upload,
  Search,
  Navigation,
  Building,
  Award,
  Camera,
  Headphones,
  FileText,
  HelpCircle,
  ThumbsUp,
  ExternalLink,
  Zap,
  Heart,
  MessageSquare,
  Share2,
  Bird,
  Video,
  Wifi,
  Car,
  Plane,
  Hotel,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  ArrowLeft,
  Target,
  Sparkles,
  Crown
} from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface ContactPageProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
}

// Booking form data structures
const destinations = [
  { id: 1, name: { ar: 'دبي، الإمارات', en: 'Dubai, UAE' } },
  { id: 2, name: { ar: 'باريس، فرنسا', en: 'Paris, France' } },
  { id: 3, name: { ar: 'طوكيو، اليابان', en: 'Tokyo, Japan' } },
  { id: 4, name: { ar: 'نيويورك، أمريكا', en: 'New York, USA' } },
  { id: 5, name: { ar: 'لندن، بريطانيا', en: 'London, UK' } },
  { id: 6, name: { ar: 'روما، إيطاليا', en: 'Rome, Italy' } }
]

const packageTypes = [
  { id: 1, name: { ar: 'رحلة فاخرة', en: 'Luxury Package' }, price: '$2,500' },
  { id: 2, name: { ar: 'رحلة عائلية', en: 'Family Package' }, price: '$1,800' },
  { id: 3, name: { ar: 'شهر العسل', en: 'Honeymoon Package' }, price: '$3,200' },
  { id: 4, name: { ar: 'رحلة أعمال', en: 'Business Package' }, price: '$2,000' }
]

const budgetRanges = [
  { id: 1, range: { ar: '$1,000 - $2,500', en: '$1,000 - $2,500' }, value: [1000, 2500] },
  { id: 2, range: { ar: '$2,500 - $5,000', en: '$2,500 - $5,000' }, value: [2500, 5000] },
  { id: 3, range: { ar: '$5,000 - $10,000', en: '$5,000 - $10,000' }, value: [5000, 10000] },
  { id: 4, range: { ar: '$10,000+', en: '$10,000+' }, value: [10000, 50000] }
]

const travelClasses = [
  { id: 1, name: { ar: 'درجة اقتصادية', en: 'Economy Class' } },
  { id: 2, name: { ar: 'درجة أعمال', en: 'Business Class' } },
  { id: 3, name: { ar: 'درجة أولى', en: 'First Class' } }
]

const hotelRatings = [
  { id: 3, name: { ar: '3 نجوم', en: '3 Stars' } },
  { id: 4, name: { ar: '4 نجوم', en: '4 Stars' } },
  { id: 5, name: { ar: '5 نجوم', en: '5 Stars' } },
  { id: 7, name: { ar: '7 نجوم فاخرة', en: '7 Stars Luxury' } }
]

// Office locations data
const officeLocations = [
  {
    id: 1,
    type: { ar: 'المقر الرئيسي', en: 'Headquarters' },
    name: { ar: 'مكتب دبي الرئيسي', en: 'Dubai Main Office' },
    address: { ar: 'برج خليفة، الطابق 45، دبي، الإمارات', en: 'Burj Khalifa, 45th Floor, Dubai, UAE' },
    phones: ['+971 4 123 4567', '+971 50 123 4567'],
    email: 'dubai@goldentravel.com',
    hours: { ar: 'الأحد - الخميس: 9:00 - 18:00', en: 'Sun - Thu: 9:00 AM - 6:00 PM' },
    services: [
      { ar: 'جميع أنواع الرحلات', en: 'All Travel Services' },
      { ar: 'خدمات VIP', en: 'VIP Services' },
      { ar: 'حجوزات طيران خاص', en: 'Private Jet Bookings' }
    ],
    teamSize: 25,
    languages: ['Arabic', 'English', 'French'],
    coordinates: [25.2048, 55.2708],
    image: "https://images.unsplash.com/photo-1577003833619-76bbd8a82b7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBvZmZpY2UlMjBkdWJhaSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc1NjU1MzAwMXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    type: { ar: 'فرع إقليمي', en: 'Regional Branch' },
    name: { ar: 'فرع الرياض', en: 'Riyadh Branch' },
    address: { ar: 'برج المملكة، الطابق 30، الرياض، السعودية', en: 'Kingdom Tower, 30th Floor, Riyadh, Saudi Arabia' },
    phones: ['+966 11 234 5678', '+966 50 234 5678'],
    email: 'riyadh@goldentravel.com',
    hours: { ar: 'الأحد - الخميس: 8:00 - 17:00', en: 'Sun - Thu: 8:00 AM - 5:00 PM' },
    services: [
      { ar: 'رحلات داخلية وخارجية', en: 'Domestic & International Travel' },
      { ar: 'حج وعمرة VIP', en: 'VIP Hajj & Umrah' },
      { ar: 'رحلات أعمال', en: 'Business Travel' }
    ],
    teamSize: 18,
    languages: ['Arabic', 'English'],
    coordinates: [24.7136, 46.6753],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZyUyMHNreXNjcmFwZXJ8ZW58MXx8fHwxNzU2NTUzMDA0fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    type: { ar: 'فرع إقليمي', en: 'Regional Branch' },
    name: { ar: 'فرع القاهرة', en: 'Cairo Branch' },
    address: { ar: 'وسط البلد، شارع التحرير، القاهرة، مصر', en: 'Downtown, Tahrir Street, Cairo, Egypt' },
    phones: ['+20 2 345 6789', '+20 10 345 6789'],
    email: 'cairo@goldentravel.com',
    hours: { ar: 'الأحد - الخميس: 9:00 - 17:00', en: 'Sun - Thu: 9:00 AM - 5:00 PM' },
    services: [
      { ar: 'رحلات أثرية', en: 'Archaeological Tours' },
      { ar: 'رحلات ثقافية', en: 'Cultural Tours' },
      { ar: 'رحلات نيلية', en: 'Nile Cruises' }
    ],
    teamSize: 12,
    languages: ['Arabic', 'English', 'German'],
    coordinates: [30.0444, 31.2357],
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d5fcde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZyUyMGNhaXJvfGVufDF8fHx8MTc1NjU1MzAwN3ww&ixlib=rb-4.1.0&q=80&w=1080"
  }
]

// FAQ data
const faqCategories = [
  {
    category: { ar: 'عملية الحجز', en: 'Booking Process' },
    questions: [
      {
        question: { ar: 'كيف يمكنني حجز رحلة؟', en: 'How can I book a trip?' },
        answer: { ar: 'يمكنك حجز رحلتك من خلال موقعنا الإلكتروني أو زيارة أحد مكاتبنا أو الاتصال بنا هاتفياً. نوفر خدمة حجز على مدار 24 ساعة.', en: 'You can book your trip through our website, visit one of our offices, or call us. We offer 24/7 booking service.' }
      },
      {
        question: { ar: 'ما هي مدة تأكيد الحجز؟', en: 'How long does booking confirmation take?' },
        answer: { ar: 'عادة ما يتم تأكيد الحجز خلال 24 ساعة من استلام المعلومات المطلوبة والدفعة الأولى.', en: 'Booking confirmation usually takes within 24 hours of receiving required information and initial payment.' }
      }
    ]
  },
  {
    category: { ar: 'الدفع والأسعار', en: 'Payment & Pricing' },
    questions: [
      {
        question: { ar: 'ما هي طرق الدفع المتاحة؟', en: 'What payment methods are available?' },
        answer: { ar: 'نقبل جميع البطاقات الائتمانية الرئيسية، التحويل البنكي، والدفع النقدي في مكاتبنا. كما نوفر خطط تقسيط مرنة.', en: 'We accept all major credit cards, bank transfers, and cash payment at our offices. We also offer flexible installment plans.' }
      }
    ]
  },
  {
    category: { ar: 'متطلبات السفر', en: 'Travel Requirements' },
    questions: [
      {
        question: { ar: 'ما هي الوثائق المطلوبة للسفر؟', en: 'What documents are required for travel?' },
        answer: { ar: 'تحتاج إلى جواز سفر ساري المفعول لمدة 6 أشهر على الأقل، تأشيرة دخول للوجهة المختارة، وشهادة التطعيمات المطلوبة.', en: 'You need a passport valid for at least 6 months, entry visa for chosen destination, and required vaccination certificates.' }
      }
    ]
  }
]

// Progress step component
function ProgressStep({ step, currentStep, language, themeColor }: any) {
  const isActive = currentStep === step.id
  const isCompleted = currentStep > step.id
  const Icon = step.icon

  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <div 
          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
            isCompleted 
              ? 'text-white border-transparent' 
              : isActive 
                ? 'text-white border-transparent'
                : 'text-gray-400 border-gray-300'
          }`}
          style={{
            backgroundColor: isCompleted || isActive ? themeColor : 'transparent',
            boxShadow: isCompleted || isActive ? `0 0 20px ${themeColor}40` : 'none'
          }}
        >
          {isCompleted ? (
            <Check className="w-6 h-6" />
          ) : (
            <Icon className="w-6 h-6" />
          )}
        </div>
        <span className={`text-xs mt-2 font-medium ${
          isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500'
        }`}>
          {step.name[language]}
        </span>
      </div>
    </div>
  )
}

// Booking form component
function BookingForm({ language, themeColor, isDarkMode }: any) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    destination: '',
    packageType: '',
    budget: '',
    startDate: '',
    endDate: '',
    adults: 1,
    children: 0,
    travelClass: '',
    hotelRating: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  })

  const steps = [
    { id: 1, name: { ar: 'الوجهة', en: 'Destination' }, icon: MapPin },
    { id: 2, name: { ar: 'التواريخ', en: 'Dates' }, icon: Calendar },
    { id: 3, name: { ar: 'المسافرون', en: 'Travelers' }, icon: Users },
    { id: 4, name: { ar: 'التفضيلات', en: 'Preferences' }, icon: Crown },
    { id: 5, name: { ar: 'المعلومات', en: 'Information' }, icon: FileText },
    { id: 6, name: { ar: 'التأكيد', en: 'Confirmation' }, icon: CheckCircle }
  ]

  const content = {
    ar: {
      title: 'احجز رحلتك المثالية',
      subtitle: 'استكمل النموذج التالي وسنتواصل معك خلال 24 ساعة',
      next: 'التالي',
      previous: 'السابق',
      submit: 'إرسال الطلب',
      step1: {
        title: 'اختر وجهتك وباكج الرحلة',
        destination: 'الوجهة المفضلة',
        package: 'نوع الباكج',
        budget: 'الميزانية المتوقعة'
      },
      step2: {
        title: 'حدد تواريخ سفرك',
        startDate: 'تاريخ المغادرة',
        endDate: 'تاريخ العودة',
        flexible: 'مواعيد مرنة'
      },
      step3: {
        title: 'عدد المسافرين',
        adults: 'البالغون',
        children: 'الأطفال (أقل من 12 سنة)'
      },
      step4: {
        title: 'تفضيلات السفر',
        travelClass: 'درجة السفر',
        hotelRating: 'تصنيف الفندق'
      },
      step5: {
        title: 'معلوماتك الشخصية',
        firstName: 'الاسم الأول',
        lastName: 'اسم العائلة',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        specialRequests: 'طلبات خاصة (اختياري)'
      },
      step6: {
        title: 'مراجعة وتأكيد الحجز',
        summary: 'ملخص الرحلة',
        confirm: 'تأكيد الحجز'
      }
    },
    en: {
      title: 'Book Your Perfect Trip',
      subtitle: 'Complete the following form and we\'ll contact you within 24 hours',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit Request',
      step1: {
        title: 'Choose Your Destination & Package',
        destination: 'Preferred Destination',
        package: 'Package Type',
        budget: 'Expected Budget'
      },
      step2: {
        title: 'Select Your Travel Dates',
        startDate: 'Departure Date',
        endDate: 'Return Date',
        flexible: 'Flexible Dates'
      },
      step3: {
        title: 'Number of Travelers',
        adults: 'Adults',
        children: 'Children (under 12)'
      },
      step4: {
        title: 'Travel Preferences',
        travelClass: 'Travel Class',
        hotelRating: 'Hotel Rating'
      },
      step5: {
        title: 'Your Personal Information',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        phone: 'Phone Number',
        specialRequests: 'Special Requests (Optional)'
      },
      step6: {
        title: 'Review & Confirm Booking',
        summary: 'Trip Summary',
        confirm: 'Confirm Booking'
      }
    }
  }

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {content[language].step1.destination}
              </label>
              <select 
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 transition-all duration-300"
                style={{ focusRingColor: `${themeColor}50` }}
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
              >
                <option value="">{language === 'ar' ? 'اختر الوجهة' : 'Select Destination'}</option>
                {destinations.map(dest => (
                  <option key={dest.id} value={dest.name[language]}>{dest.name[language]}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {content[language].step1.package}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packageTypes.map(pkg => (
                  <div
                    key={pkg.id}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      formData.packageType === pkg.name[language] 
                        ? 'border-transparent shadow-lg' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    style={{
                      borderColor: formData.packageType === pkg.name[language] ? themeColor : undefined,
                      backgroundColor: formData.packageType === pkg.name[language] ? `${themeColor}10` : undefined
                    }}
                    onClick={() => setFormData({...formData, packageType: pkg.name[language]})}
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white">{pkg.name[language]}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{pkg.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {content[language].step1.budget}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {budgetRanges.map(budget => (
                  <div
                    key={budget.id}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      formData.budget === budget.range[language] 
                        ? 'border-transparent shadow-lg' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    style={{
                      borderColor: formData.budget === budget.range[language] ? themeColor : undefined,
                      backgroundColor: formData.budget === budget.range[language] ? `${themeColor}10` : undefined
                    }}
                    onClick={() => setFormData({...formData, budget: budget.range[language]})}
                  >
                    <p className="font-semibold text-gray-900 dark:text-white">{budget.range[language]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {content[language].step2.startDate}
                </label>
                <input
                  type="date"
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 transition-all duration-300"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {content[language].step2.endDate}
                </label>
                <input
                  type="date"
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 transition-all duration-300"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {content[language].step3.adults}
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, adults: Math.max(1, formData.adults - 1)})}
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                    style={{ borderColor: themeColor, color: themeColor }}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-semibold text-gray-900 dark:text-white w-8 text-center">
                    {formData.adults}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, adults: formData.adults + 1})}
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                    style={{ borderColor: themeColor, color: themeColor }}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {content[language].step3.children}
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, children: Math.max(0, formData.children - 1)})}
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                    style={{ borderColor: themeColor, color: themeColor }}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-semibold text-gray-900 dark:text-white w-8 text-center">
                    {formData.children}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, children: formData.children + 1})}
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                    style={{ borderColor: themeColor, color: themeColor }}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {content[language].step4.travelClass}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {travelClasses.map(cls => (
                  <div
                    key={cls.id}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      formData.travelClass === cls.name[language] 
                        ? 'border-transparent shadow-lg' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    style={{
                      borderColor: formData.travelClass === cls.name[language] ? themeColor : undefined,
                      backgroundColor: formData.travelClass === cls.name[language] ? `${themeColor}10` : undefined
                    }}
                    onClick={() => setFormData({...formData, travelClass: cls.name[language]})}
                  >
                    <p className="font-semibold text-gray-900 dark:text-white">{cls.name[language]}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {content[language].step4.hotelRating}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hotelRatings.map(rating => (
                  <div
                    key={rating.id}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      formData.hotelRating === rating.name[language] 
                        ? 'border-transparent shadow-lg' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    style={{
                      borderColor: formData.hotelRating === rating.name[language] ? themeColor : undefined,
                      backgroundColor: formData.hotelRating === rating.name[language] ? `${themeColor}10` : undefined
                    }}
                    onClick={() => setFormData({...formData, hotelRating: rating.name[language]})}
                  >
                    <p className="font-semibold text-gray-900 dark:text-white text-center">{rating.name[language]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {content[language].step5.firstName}
                </label>
                <input
                  type="text"
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 transition-all duration-300"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {content[language].step5.lastName}
                </label>
                <input
                  type="text"
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 transition-all duration-300"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {content[language].step5.email}
                </label>
                <input
                  type="email"
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 transition-all duration-300"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {content[language].step5.phone}
                </label>
                <input
                  type="tel"
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 transition-all duration-300"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {content[language].step5.specialRequests}
              </label>
              <textarea
                rows={4}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 transition-all duration-300"
                value={formData.specialRequests}
                onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                placeholder={language === 'ar' ? 'أخبرنا عن أي طلبات خاصة...' : 'Tell us about any special requests...'}
              />
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {content[language].step6.summary}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{content[language].step1.destination}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{content[language].step1.package}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.packageType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{content[language].step3.adults}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.adults}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{content[language].step3.children}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.children}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{content[language].step5.email}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.email}</span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {content[language].title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {content[language].subtitle}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-8 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-shrink-0">
            <ProgressStep
              step={step}
              currentStep={currentStep}
              language={language}
              themeColor={themeColor}
            />
            {index < steps.length - 1 && (
              <div 
                className={`w-8 md:w-16 h-0.5 mx-2 transition-all duration-500 ${
                  currentStep > step.id ? 'opacity-100' : 'opacity-30'
                }`}
                style={{ backgroundColor: themeColor }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          {content[language][`step${currentStep}`]?.title}
        </h3>
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
            currentStep === 1 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:shadow-lg hover:scale-105'
          }`}
          style={{
            backgroundColor: currentStep === 1 ? '#e5e7eb' : `${themeColor}20`,
            color: currentStep === 1 ? '#9ca3af' : themeColor,
            border: `2px solid ${currentStep === 1 ? '#e5e7eb' : themeColor}`
          }}
        >
          {language === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{content[language].previous}</span>
        </button>

        <button
          onClick={currentStep === 6 ? () => alert(language === 'ar' ? 'تم إرسال طلبك بنجاح!' : 'Your request has been submitted successfully!') : nextStep}
          className="px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-2"
          style={{
            backgroundColor: themeColor,
            boxShadow: `0 4px 16px ${themeColor}40`
          }}
        >
          <span>{currentStep === 6 ? content[language].submit : content[language].next}</span>
          {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

// FAQ Component
function FAQSection({ language, themeColor, isDarkMode }: any) {
  const [openCategory, setOpenCategory] = useState<number | null>(null)
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  const content = {
    ar: {
      title: 'الأسئلة الشائعة',
      subtitle: 'إجابات على أكثر الأسئلة المتكررة من عملائنا',
      search: 'ابحث في الأسئلة...',
      helpful: 'هل كانت هذه الإجابة مفيدة؟',
      yes: 'نعم',
      no: 'لا',
      contact: 'اتصل بنا للمزيد من المساعدة'
    },
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to the most common questions from our clients',
      search: 'Search questions...',
      helpful: 'Was this answer helpful?',
      yes: 'Yes',
      no: 'No',
      contact: 'Contact us for more help'
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: themeColor }}>
          {content[language].title}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {content[language].subtitle}
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {faqCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-6">
            <button
              onClick={() => setOpenCategory(openCategory === categoryIndex ? null : categoryIndex)}
              className="w-full flex items-center justify-between p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {category.category[language]}
              </h3>
              <ChevronDown 
                className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
                  openCategory === categoryIndex ? 'rotate-180' : ''
                }`}
                style={{ color: themeColor }}
              />
            </button>

            {openCategory === categoryIndex && (
              <div className="mt-4 space-y-4">
                {category.questions.map((faq, questionIndex) => (
                  <div 
                    key={questionIndex}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenQuestion(openQuestion === questionIndex ? null : questionIndex)}
                      className="w-full flex items-center justify-between p-4 text-left transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        {faq.question[language]}
                      </span>
                      <ChevronRight 
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                          openQuestion === questionIndex ? 'rotate-90' : ''
                        }`}
                      />
                    </button>

                    {openQuestion === questionIndex && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {faq.answer[language]}
                        </p>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">{content[language].helpful}</span>
                          <div className="flex space-x-2">
                            <button 
                              className="flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-all duration-300 hover:bg-green-100 dark:hover:bg-green-900"
                              style={{ color: '#10b981' }}
                            >
                              <ThumbsUp className="w-4 h-4" />
                              <span>{content[language].yes}</span>
                            </button>
                            <button 
                              className="flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-all duration-300 hover:bg-red-100 dark:hover:bg-red-900"
                              style={{ color: '#ef4444' }}
                            >
                              <X className="w-4 h-4" />
                              <span>{content[language].no}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ContactPage({ language, themeColor, isDarkMode }: ContactPageProps) {
  const [activeTab, setActiveTab] = useState<'booking' | 'contact' | 'locations'>('booking')

  const content = {
    ar: {
      hero: {
        title: 'تواصل معنا واحجز رحلتك المثالية',
        subtitle: 'فريقنا المتخصص جاهز لمساعدتك في تصميم رحلة أحلامك على مدار 24 ساعة',
        bookNow: 'احجز الآن',
        contactUs: 'تواصل معنا'
      },
      tabs: {
        booking: 'حجز الرحلة',
        contact: 'اتصل بنا',
        locations: 'مواقع المكاتب'
      },
      contact: {
        title: 'نموذج الاتصال السريع',
        subtitle: 'أرسل لنا رسالة وسنرد عليك خلال ساعتين',
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        subject: 'موضوع الاستفسار',
        message: 'رسالتك',
        send: 'إرسال الرسالة',
        quickContact: 'طرق التواصل السريع',
        socialMedia: 'تابعنا على وسائل التواصل'
      },
      locations: {
        title: 'مواقع مكاتبنا حول العالم',
        subtitle: 'زورنا في أي من مكاتبنا للحصول على استشارة شخصية',
        headquarters: 'المقر الرئيسي',
        branch: 'فرع',
        team: 'فريق',
        services: 'الخدمات المتوفرة',
        hours: 'ساعات العمل',
        getDirections: 'احصل على الاتجاهات',
        callNow: 'اتصل الآن'
      },
      quickActions: {
        whatsapp: 'واتساب',
        call: 'اتصال',
        email: 'بريد إلكتروني',
        chat: 'دردشة مباشرة',
        emergency: 'طوارئ 24/7'
      }
    },
    en: {
      hero: {
        title: 'Contact Us & Book Your Perfect Trip',
        subtitle: 'Our specialized team is ready to help you design your dream journey 24/7',
        bookNow: 'Book Now',
        contactUs: 'Contact Us'
      },
      tabs: {
        booking: 'Book Trip',
        contact: 'Contact Us',
        locations: 'Office Locations'
      },
      contact: {
        title: 'Quick Contact Form',
        subtitle: 'Send us a message and we\'ll respond within two hours',
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        subject: 'Inquiry Subject',
        message: 'Your Message',
        send: 'Send Message',
        quickContact: 'Quick Contact Methods',
        socialMedia: 'Follow Us on Social Media'
      },
      locations: {
        title: 'Our Office Locations Worldwide',
        subtitle: 'Visit us at any of our offices for personal consultation',
        headquarters: 'Headquarters',
        branch: 'Branch',
        team: 'Team',
        services: 'Available Services',
        hours: 'Business Hours',
        getDirections: 'Get Directions',
        callNow: 'Call Now'
      },
      quickActions: {
        whatsapp: 'WhatsApp',
        call: 'Call',
        email: 'Email',
        chat: 'Live Chat',
        emergency: '24/7 Emergency'
      }
    }
  }

  const quickContactMethods = [
    {
      icon: MessageSquare,
      title: content[language].quickActions.whatsapp,
      value: '+971 50 123 4567',
      color: '#25D366',
      action: () => window.open('https://wa.me/971501234567', '_blank')
    },
    {
      icon: Phone,
      title: content[language].quickActions.call,
      value: '+971 4 123 4567',
      color: themeColor,
      action: () => window.open('tel:+97141234567')
    },
    {
      icon: Mail,
      title: content[language].quickActions.email,
      value: 'info@goldentravel.com',
      color: '#ea4335',
      action: () => window.open('mailto:info@goldentravel.com')
    },
    {
      icon: MessageCircle,
      title: content[language].quickActions.chat,
      value: language === 'ar' ? 'دردشة مباشرة' : 'Live Chat',
      color: '#1877f2',
      action: () => alert(language === 'ar' ? 'سيتم تشغيل الدردشة المباشرة قريباً' : 'Live chat will be available soon')
    }
  ]

  const socialMediaLinks = [
    { icon: Share2, color: '#1877f2', url: 'https://facebook.com/goldentravel' },
    { icon: Camera, color: '#e4405f', url: 'https://instagram.com/goldentravel' },
    { icon: Bird, color: '#1da1f2', url: 'https://twitter.com/goldentravel' },
    { icon: Video, color: '#ff0000', url: 'https://youtube.com/goldentravel' }
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwdXMlMjBjdXN0b21lciUyMHNlcnZpY2V8ZW58MXx8fHwxNzU2NTUzMDEwfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Contact Us"
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
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('booking')}
                className="px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                  boxShadow: `0 8px 32px ${themeColor}40`
                }}
              >
                {content[language].hero.bookNow}
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className="px-8 py-4 rounded-xl font-bold text-white border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-white hover:text-gray-900"
                style={{ borderColor: 'white' }}
              >
                {content[language].hero.contactUs}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Quick Contact */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col space-y-3">
          {quickContactMethods.slice(0, 2).map((method, index) => {
            const Icon = method.icon
            return (
              <button
                key={index}
                onClick={method.action}
                className="w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                style={{
                  backgroundColor: method.color,
                  boxShadow: `0 8px 32px ${method.color}40`
                }}
              >
                <Icon className="w-6 h-6 text-white" />
                <div className="absolute right-16 bg-black/80 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {method.title}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Navigation */}
      <section className="py-8 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-center">
            <div className="flex bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              {(['booking', 'contact', 'locations'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab ? 'text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  style={{
                    backgroundColor: activeTab === tab ? themeColor : 'transparent',
                    boxShadow: activeTab === tab ? `0 4px 16px ${themeColor}40` : 'none'
                  }}
                >
                  {content[language].tabs[tab]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          {activeTab === 'booking' && (
            <BookingForm language={language} themeColor={themeColor} isDarkMode={isDarkMode} />
          )}

          {activeTab === 'contact' && (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {content[language].contact.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    {content[language].contact.subtitle}
                  </p>

                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {content[language].contact.name}
                      </label>
                      <input
                        type="text"
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 transition-all duration-300"
                        style={{ focusRingColor: `${themeColor}50` }}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {content[language].contact.email}
                        </label>
                        <input
                          type="email"
                          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {content[language].contact.phone}
                        </label>
                        <input
                          type="tel"
                          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {content[language].contact.subject}
                      </label>
                      <select className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 transition-all duration-300">
                        <option value="">{language === 'ar' ? 'اختر الموضوع' : 'Select Subject'}</option>
                        <option value="booking">{language === 'ar' ? 'استفسار حجز' : 'Booking Inquiry'}</option>
                        <option value="complaint">{language === 'ar' ? 'شكوى' : 'Complaint'}</option>
                        <option value="suggestion">{language === 'ar' ? 'اقتراح' : 'Suggestion'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {content[language].contact.message}
                      </label>
                      <textarea
                        rows={5}
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 transition-all duration-300"
                        placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                      style={{
                        backgroundColor: themeColor,
                        boxShadow: `0 4px 16px ${themeColor}40`
                      }}
                    >
                      <Send className="w-5 h-5" />
                      <span>{content[language].contact.send}</span>
                    </button>
                  </form>
                </div>

                {/* Quick Contact Methods */}
                <div className="space-y-8">
                  <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      {content[language].contact.quickContact}
                    </h3>
                    <div className="space-y-4">
                      {quickContactMethods.map((method, index) => {
                        const Icon = method.icon
                        return (
                          <button
                            key={index}
                            onClick={method.action}
                            className="w-full flex items-center space-x-4 p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 hover:scale-105"
                            style={{ borderColor: method.color }}
                          >
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${method.color}20` }}
                            >
                              <Icon className="w-6 h-6" style={{ color: method.color }} />
                            </div>
                            <div className="flex-1 text-left">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{method.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{method.value}</p>
                            </div>
                            <ExternalLink className="w-5 h-5 text-gray-400" />
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      {content[language].contact.socialMedia}
                    </h3>
                    <div className="flex space-x-4">
                      {socialMediaLinks.map((social, index) => {
                        const Icon = social.icon
                        return (
                          <button
                            key={index}
                            onClick={() => window.open(social.url, '_blank')}
                            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                            style={{ backgroundColor: `${social.color}20`, border: `2px solid ${social.color}` }}
                          >
                            <Icon className="w-6 h-6" style={{ color: social.color }} />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'locations' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: themeColor }}>
                  {content[language].locations.title}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  {content[language].locations.subtitle}
                </p>
              </div>

              {/* Interactive Map Placeholder */}
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 mx-auto mb-4" style={{ color: themeColor }} />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {language === 'ar' ? 'خريطة تفاعلية' : 'Interactive Map'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'انقر على الموقع لعرض التفاصيل' : 'Click on location to view details'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Locations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {officeLocations.map((location) => (
                  <div 
                    key={location.id}
                    className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-3xl transition-all duration-500 hover:scale-105"
                  >
                    <div className="relative h-48">
                      <ImageWithFallback
                        src={location.image}
                        alt={location.name[language]}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                          style={{ backgroundColor: themeColor }}
                        >
                          {location.type[language]}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {location.name[language]}
                      </h3>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 mt-0.5 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {location.address[language]}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-gray-500" />
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {location.phones.map((phone, index) => (
                              <div key={index}>{phone}</div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {location.hours[language]}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {content[language].locations.team}: {location.teamSize}
                          </span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {content[language].locations.services}
                        </h4>
                        <div className="space-y-1">
                          {location.services.map((service, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4" style={{ color: themeColor }} />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {service[language]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => window.open(`tel:${location.phones[0]}`)}
                          className="flex-1 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105"
                          style={{
                            backgroundColor: themeColor,
                            boxShadow: `0 4px 16px ${themeColor}40`
                          }}
                        >
                          {content[language].locations.callNow}
                        </button>
                        <button
                          onClick={() => window.open(`https://maps.google.com/?q=${location.coordinates[0]},${location.coordinates[1]}`, '_blank')}
                          className="flex-1 py-3 rounded-xl font-medium border-2 transition-all duration-300 hover:scale-105 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          style={{ borderColor: themeColor }}
                        >
                          {content[language].locations.getDirections}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6 lg:px-12">
          <FAQSection language={language} themeColor={themeColor} isDarkMode={isDarkMode} />
        </div>
      </section>
    </div>
  )
}