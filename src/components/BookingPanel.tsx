import { useState } from 'react'
import { 
  Calendar, 
  MapPin, 
  Users, 
  Search, 
  ChevronDown, 
  Plane, 
  ArrowRight, 
  X, 
  Bed,
  Star,
  Clock,
  TrendingUp,
  CheckCircle,
  Sparkles
} from 'lucide-react'

interface BookingPanelProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
  isOpen: boolean
  onClose: () => void
}

// Premium Destinations with Smart Suggestions
const premiumDestinations = [
  { 
    id: 1,
    ar: 'جزر المالديف', 
    en: 'Maldives', 
    icon: '🏝️',
    price: { ar: 'من ١٨٬٧٤٧ ر.س', en: 'From $4,999' },
    rating: 4.9,
    availability: 'high',
    trending: true
  },
  { 
    id: 2,
    ar: 'سويسرا الألبية', 
    en: 'Swiss Alps', 
    icon: '🏔️',
    price: { ar: 'من ١٤٬٢٤٧ ر.س', en: 'From $3,799' },
    rating: 4.8,
    availability: 'medium',
    trending: false
  },
  { 
    id: 3,
    ar: 'دبي الملكية', 
    en: 'Royal Dubai', 
    icon: '🏙️',
    price: { ar: 'من ١٠٬٨٧٢ ر.س', en: 'From $2,899' },
    rating: 4.7,
    availability: 'high',
    trending: true
  },
  { 
    id: 4,
    ar: 'اليابان الثقافية', 
    en: 'Cultural Japan', 
    icon: '🏯',
    price: { ar: 'من ٧٬٤٩٧ ر.س', en: 'From $1,999' },
    rating: 4.9,
    availability: 'low',
    trending: false
  },
  { 
    id: 5,
    ar: 'سانتوريني الساحرة', 
    en: 'Santorini Magic', 
    icon: '🏛️',
    price: { ar: 'من ٦٬٧٤٧ ر.س', en: 'From $1,799' },
    rating: 4.8,
    availability: 'medium',
    trending: true
  },
  { 
    id: 6,
    ar: 'بالي الاستوائية', 
    en: 'Tropical Bali', 
    icon: '🌺',
    price: { ar: 'من ٤٬٤٩٧ ر.س', en: 'From $1,199' },
    rating: 4.6,
    availability: 'high',
    trending: false
  }
]

// Accommodation Types
const accommodationTypes = [
  { 
    id: 'luxury-resort',
    ar: 'منتجع فاخر', 
    en: 'Luxury Resort',
    icon: '🏨',
    description: { ar: 'منتجعات ٥ نجوم مع خدمات متميزة', en: '5-star resorts with premium services' }
  },
  { 
    id: 'private-villa',
    ar: 'فيلا خاصة', 
    en: 'Private Villa',
    icon: '🏡',
    description: { ar: 'فلل خاصة مع مسابح ومرافق حصرية', en: 'Private villas with pools and exclusive facilities' }
  },
  { 
    id: 'boutique-hotel',
    ar: 'فندق بوتيك', 
    en: 'Boutique Hotel',
    icon: '🏛️',
    description: { ar: 'فنادق فريدة بطابع محلي أصيل', en: 'Unique hotels with authentic local character' }
  },
  { 
    id: 'overwater-bungalow',
    ar: 'بنغل مائي', 
    en: 'Overwater Bungalow',
    icon: '🛖',
    description: { ar: 'أكواخ مائية مع إطلالات خلابة', en: 'Water bungalows with stunning views' }
  }
]

export default function BookingPanel({ language, themeColor, isDarkMode, isOpen, onClose }: BookingPanelProps) {
  const [step, setStep] = useState(1) // Multi-step progress
  const [selectedDestination, setSelectedDestination] = useState<any>(null)
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [accommodationType, setAccommodationType] = useState('')
  const [travelers, setTravelers] = useState({ adults: 2, children: 0 })
  const [showDestinations, setShowDestinations] = useState(false)
  const [showAccommodation, setShowAccommodation] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const content = {
    ar: {
      intelligentSearch: 'البحث الذكي عن الرحلة المثالية',
      desiredDestination: 'الوجهة المرغوبة',
      departureDate: 'تاريخ المغادرة',
      returnDate: 'تاريخ العودة',
      accommodationType: 'نوع الإقامة',
      travelers: 'عدد المسافرين',
      searchPerfectJourney: 'بحث ذكي عن الرحلة المثالية',
      selectDestination: 'اختر وجهتك المثالية',
      selectAccommodation: 'اختر نوع الإقامة المفضل',
      adults: 'البالغون',
      children: 'الأطفال',
      step: 'الخطوة',
      of: 'من',
      next: 'التالي',
      previous: 'السابق',
      search: 'ابحث الآن',
      trending: 'الأكثر طلباً',
      highAvailability: 'توفر عالي',
      mediumAvailability: 'توفر متوسط',
      lowAvailability: 'توفر محدود',
      smartSuggestions: 'اقتراحات ذكية',
      basedOnPreferences: 'بناءً على تفضيلاتك'
    },
    en: {
      intelligentSearch: 'Intelligent Perfect Journey Search',
      desiredDestination: 'Desired Destination',
      departureDate: 'Departure Date',
      returnDate: 'Return Date',
      accommodationType: 'Accommodation Type',
      travelers: 'Travelers',
      searchPerfectJourney: 'Intelligent Perfect Journey Search',
      selectDestination: 'Choose your perfect destination',
      selectAccommodation: 'Select your preferred accommodation',
      adults: 'Adults',
      children: 'Children',
      step: 'Step',
      of: 'of',
      next: 'Next',
      previous: 'Previous',
      search: 'Search Now',
      trending: 'Trending',
      highAvailability: 'High Availability',
      mediumAvailability: 'Medium Availability',
      lowAvailability: 'Limited Availability',
      smartSuggestions: 'Smart Suggestions',
      basedOnPreferences: 'Based on your preferences'
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'high': return '#10B981' // Green
      case 'medium': return '#F59E0B' // Yellow
      case 'low': return '#EF4444' // Red
      default: return '#6B7280' // Gray
    }
  }

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      onClose()
      // Handle search logic here
    }, 3000)
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const canProceed = () => {
    switch (step) {
      case 1: return selectedDestination && departureDate && returnDate
      case 2: return accommodationType
      case 3: return travelers.adults > 0
      default: return false
    }
  }

  return (
    <div 
      className={`fixed inset-0 z-50 transition-all duration-700 ease-out ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      } ${language === 'ar' ? 'rtl' : 'ltr'}`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel Container */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div 
          className={`relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-5xl max-h-[90vh] overflow-y-auto transition-all duration-700 ${
            isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
          }`}
        >
          
          {/* Header */}
          <div className="relative p-8 pb-6 bg-gradient-to-r" style={{
            background: `linear-gradient(135deg, ${themeColor}15, ${themeColor}05)`
          }}>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 rtl:left-6 rtl:right-auto w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Title */}
            <div className="pr-16 rtl:pl-16 rtl:pr-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0"
                  style={{ backgroundColor: `${themeColor}20` }}>
                  <Search className="w-6 h-6" style={{ color: themeColor }} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold"
                    style={{ 
                      color: isDarkMode ? '#ffffff' : themeColor,
                      textShadow: isDarkMode 
                        ? `0 0 15px ${themeColor}30` 
                        : '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    {content[language].intelligentSearch}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {content[language].basedOnPreferences}
                  </p>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex space-x-2 rtl:space-x-reverse">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i <= step ? 'scale-125' : ''
                      }`}
                      style={{
                        backgroundColor: i <= step ? themeColor : '#E5E7EB'
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {content[language].step} {step} {content[language].of} 3
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            
            {/* Step 1: Destination & Dates */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold mb-6"
                  style={{ 
                    color: isDarkMode ? '#ffffff' : themeColor,
                    textShadow: isDarkMode 
                      ? `0 0 15px ${themeColor}30` 
                      : '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {content[language].desiredDestination} & {content[language].departureDate}
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Destination Selector */}
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      {content[language].desiredDestination}
                    </label>
                    <div className="relative">
                      <button
                        onClick={() => setShowDestinations(!showDestinations)}
                        className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{ 
                          focusRingColor: `${themeColor}50`,
                          borderColor: showDestinations ? themeColor : undefined
                        }}
                      >
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          {selectedDestination ? (
                            <>
                              <span className="text-xl">{selectedDestination.icon}</span>
                              <div className="text-left rtl:text-right">
                                <div className="font-medium">{selectedDestination[language]}</div>
                                <div className="text-xs text-gray-500">{selectedDestination.price[language]}</div>
                              </div>
                            </>
                          ) : (
                            <>
                              <MapPin className="w-5 h-5 text-gray-400" />
                              <span className="text-gray-500">{content[language].selectDestination}</span>
                            </>
                          )}
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${showDestinations ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Smart Destinations Dropdown */}
                      {showDestinations && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl z-[60] max-h-80 overflow-y-auto">
                          
                          {/* Trending Header */}
                          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-center">
                              <TrendingUp className="w-4 h-4 mr-2" style={{ color: themeColor }} />
                              <span className="text-sm font-semibold" style={{ color: themeColor }}>
                                {content[language].smartSuggestions}
                              </span>
                            </div>
                          </div>

                          {premiumDestinations.map((dest) => (
                            <button
                              key={dest.id}
                              onClick={() => {
                                setSelectedDestination(dest)
                                setShowDestinations(false)
                              }}
                              className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 text-gray-900 dark:text-white cursor-pointer"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                  <span className="text-lg">{dest.icon}</span>
                                  <div>
                                    <div className="font-medium flex items-center">
                                      {dest[language]}
                                      {dest.trending && (
                                        <span className="ml-2 rtl:mr-2 rtl:ml-0 px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                          {content[language].trending}
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-sm text-gray-500">{dest.price[language]}</div>
                                  </div>
                                </div>
                                <div className="text-right rtl:text-left">
                                  <div className="flex items-center mb-1">
                                    <Star className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" />
                                    <span className="text-sm">{dest.rating}</span>
                                  </div>
                                  <div 
                                    className="text-xs px-2 py-1 rounded-full text-white"
                                    style={{ backgroundColor: getAvailabilityColor(dest.availability) }}
                                  >
                                    {content[language][`${dest.availability}Availability`]}
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Date Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      {content[language].departureDate}
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 rtl:right-4 rtl:left-auto top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="w-full pl-12 rtl:pr-12 rtl:pl-4 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      {content[language].returnDate}
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 rtl:right-4 rtl:left-auto top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full pl-12 rtl:pr-12 rtl:pl-4 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Accommodation Type */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold mb-6"
                  style={{ 
                    color: isDarkMode ? '#ffffff' : themeColor,
                    textShadow: isDarkMode 
                      ? `0 0 15px ${themeColor}30` 
                      : '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {content[language].accommodationType}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {accommodationTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setAccommodationType(type.id)}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                        accommodationType === type.id
                          ? 'shadow-lg transform scale-105'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      style={{
                        borderColor: accommodationType === type.id ? themeColor : undefined,
                        backgroundColor: accommodationType === type.id ? `${themeColor}10` : undefined
                      }}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-4">{type.icon}</div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                          {type[language]}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {type.description[language]}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Travelers */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold mb-6"
                  style={{ 
                    color: isDarkMode ? '#ffffff' : themeColor,
                    textShadow: isDarkMode 
                      ? `0 0 15px ${themeColor}30` 
                      : '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {content[language].travelers}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  
                  {/* Adults */}
                  <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {content[language].adults}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <button
                          onClick={() => setTravelers(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                          className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 flex items-center justify-center transition-all duration-200 transform hover:scale-110 cursor-pointer font-medium"
                        >
                          -
                        </button>
                        <span className="text-xl font-bold text-gray-900 dark:text-white w-8 text-center">
                          {travelers.adults}
                        </span>
                        <button
                          onClick={() => setTravelers(prev => ({ ...prev, adults: prev.adults + 1 }))}
                          className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 flex items-center justify-center transition-all duration-200 transform hover:scale-110 cursor-pointer font-medium"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Sparkles className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {content[language].children}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <button
                          onClick={() => setTravelers(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                          className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 flex items-center justify-center transition-all duration-200 transform hover:scale-110 cursor-pointer font-medium"
                        >
                          -
                        </button>
                        <span className="text-xl font-bold text-gray-900 dark:text-white w-8 text-center">
                          {travelers.children}
                        </span>
                        <button
                          onClick={() => setTravelers(prev => ({ ...prev, children: prev.children + 1 }))}
                          className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 flex items-center justify-center transition-all duration-200 transform hover:scale-110 cursor-pointer font-medium"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className="px-6 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {content[language].previous}
              </button>

              {step < 3 ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="px-8 py-3 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  style={{
                    background: canProceed() 
                      ? `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`
                      : '#9CA3AF',
                    boxShadow: canProceed() ? `0 8px 32px ${themeColor}40` : 'none'
                  }}
                >
                  {content[language].next}
                  <ArrowRight className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0" />
                </button>
              ) : (
                <button
                  onClick={handleSearch}
                  disabled={isSearching || !canProceed()}
                  className="px-8 py-3 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center relative overflow-hidden group"
                  style={{
                    background: canProceed() && !isSearching
                      ? `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`
                      : '#9CA3AF',
                    boxShadow: canProceed() && !isSearching ? `0 8px 32px ${themeColor}40` : 'none'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <div className="relative z-10 flex items-center">
                    {isSearching ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        {language === 'ar' ? 'جاري البحث...' : 'Searching...'}
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                        {content[language].search}
                      </>
                    )}
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}