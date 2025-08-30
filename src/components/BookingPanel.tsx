import { useState } from 'react'
import { Calendar, MapPin, Users, Search, ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface BookingPanelProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
}

const destinations = [
  { ar: 'دبي', en: 'Dubai' },
  { ar: 'جزر المالديف', en: 'Maldives' },
  { ar: 'سويسرا', en: 'Switzerland' },
  { ar: 'اليابان', en: 'Japan' },
  { ar: 'تركيا', en: 'Turkey' },
  { ar: 'مصر', en: 'Egypt' },
  { ar: 'تايلاند', en: 'Thailand' },
  { ar: 'إيطاليا', en: 'Italy' }
]

export default function BookingPanel({ language, themeColor, isDarkMode }: BookingPanelProps) {
  const [selectedDestination, setSelectedDestination] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [travelers, setTravelers] = useState(2)
  const [showDestinations, setShowDestinations] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const labels = {
    ar: {
      destination: 'الوجهة',
      departure: 'تاريخ المغادرة',
      return: 'تاريخ العودة',
      travelers: 'المسافرون',
      search: 'ابحث عن رحلتك',
      selectDestination: 'اختر الوجهة',
      adults: 'بالغ',
      children: 'طفل'
    },
    en: {
      destination: 'Destination',
      departure: 'Departure',
      return: 'Return',
      travelers: 'Travelers',
      search: 'Find Your Trip',
      selectDestination: 'Select Destination',
      adults: 'Adult',
      children: 'Child'
    }
  }

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      // Handle search logic here
    }, 2000)
  }

  return (
    <div 
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-6xl px-4 
        ${language === 'ar' ? 'rtl' : 'ltr'}`}
    >
      <div 
        className="backdrop-blur-2xl rounded-3xl p-6 lg:p-8 border border-white/30
          transform hover:scale-[1.02] transition-all duration-500 ease-out
          shadow-2xl hover:shadow-3xl"
        style={{
          background: `linear-gradient(135deg, 
            ${isDarkMode ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.25)'} 0%, 
            ${isDarkMode ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)'} 50%, 
            ${isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'} 100%)`,
          backdropFilter: 'blur(30px) saturate(180%)',
          boxShadow: `
            0 25px 80px rgba(0,0,0,0.3),
            0 0 60px ${themeColor}20,
            inset 0 2px 0 rgba(255,255,255,0.2),
            inset 0 -2px 0 rgba(0,0,0,0.1)
          `
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
          
          {/* Destination Selector */}
          <div className="relative">
            <label className="block text-sm font-medium text-white/90 mb-2">
              {labels[language].destination}
            </label>
            <div className="relative">
              <button
                onClick={() => setShowDestinations(!showDestinations)}
                className="w-full p-4 rounded-xl backdrop-blur-lg border border-white/30 
                  text-white/90 hover:text-white transition-all duration-300
                  transform hover:scale-105 cursor-pointer flex items-center justify-between"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(255,255,255,0.1) 0%, 
                    rgba(255,255,255,0.05) 100%)`,
                  backdropFilter: 'blur(15px)',
                  boxShadow: `
                    0 0 20px rgba(255,255,255,0.1),
                    inset 0 1px 0 rgba(255,255,255,0.2)
                  `
                }}
              >
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0" style={{ color: themeColor }} />
                  <span>
                    {selectedDestination || labels[language].selectDestination}
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${
                  showDestinations ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Dropdown */}
              {showDestinations && (
                <div 
                  className="absolute top-full left-0 right-0 mt-2 backdrop-blur-2xl rounded-2xl border border-white/30
                    shadow-2xl z-40 max-h-60 overflow-y-auto"
                  style={{
                    background: `linear-gradient(135deg, 
                      ${isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'} 0%, 
                      ${isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)'} 100%)`,
                    backdropFilter: 'blur(25px) saturate(180%)'
                  }}
                >
                  {destinations.map((dest, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedDestination(dest[language])
                        setShowDestinations(false)
                      }}
                      className="w-full p-4 text-left hover:bg-white/10 dark:hover:bg-white/5 
                        transition-all duration-300 first:rounded-t-2xl last:rounded-b-2xl
                        text-gray-800 dark:text-white cursor-pointer"
                    >
                      {dest[language]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              {labels[language].departure}
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 rtl:right-4 rtl:left-auto top-1/2 transform -translate-y-1/2 w-5 h-5" 
                style={{ color: themeColor }} />
              <Input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="pl-12 rtl:pr-12 rtl:pl-4 pr-4 py-4 rounded-xl backdrop-blur-lg border border-white/30 
                  text-white/90 placeholder-white/60 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(255,255,255,0.1) 0%, 
                    rgba(255,255,255,0.05) 100%)`,
                  backdropFilter: 'blur(15px)',
                  boxShadow: `
                    0 0 20px rgba(255,255,255,0.1),
                    inset 0 1px 0 rgba(255,255,255,0.2)
                  `
                }}
              />
            </div>
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              {labels[language].return}
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 rtl:right-4 rtl:left-auto top-1/2 transform -translate-y-1/2 w-5 h-5" 
                style={{ color: themeColor }} />
              <Input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="pl-12 rtl:pr-12 rtl:pl-4 pr-4 py-4 rounded-xl backdrop-blur-lg border border-white/30 
                  text-white/90 placeholder-white/60 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(255,255,255,0.1) 0%, 
                    rgba(255,255,255,0.05) 100%)`,
                  backdropFilter: 'blur(15px)',
                  boxShadow: `
                    0 0 20px rgba(255,255,255,0.1),
                    inset 0 1px 0 rgba(255,255,255,0.2)
                  `
                }}
              />
            </div>
          </div>

          {/* Travelers */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              {labels[language].travelers}
            </label>
            <div 
              className="flex items-center p-4 rounded-xl backdrop-blur-lg border border-white/30"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(255,255,255,0.1) 0%, 
                  rgba(255,255,255,0.05) 100%)`,
                backdropFilter: 'blur(15px)',
                boxShadow: `
                  0 0 20px rgba(255,255,255,0.1),
                  inset 0 1px 0 rgba(255,255,255,0.2)
                `
              }}
            >
              <Users className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0" style={{ color: themeColor }} />
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <button
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 
                    text-white flex items-center justify-center transition-all duration-300
                    transform hover:scale-110 cursor-pointer"
                >
                  -
                </button>
                <span className="text-white/90 font-medium w-8 text-center">{travelers}</span>
                <button
                  onClick={() => setTravelers(travelers + 1)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 
                    text-white flex items-center justify-center transition-all duration-300
                    transform hover:scale-110 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full h-16 rounded-xl font-semibold text-white
                transform hover:scale-105 transition-all duration-300 cursor-pointer
                shadow-xl hover:shadow-2xl backdrop-blur-lg border border-white/30"
              style={{
                background: isSearching 
                  ? `linear-gradient(135deg, ${themeColor}80 0%, ${themeColor}60 100%)`
                  : `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}CC 100%)`,
                boxShadow: `
                  0 0 40px ${themeColor}50, 
                  0 10px 30px rgba(0,0,0,0.3),
                  inset 0 2px 0 rgba(255,255,255,0.3)
                `
              }}
            >
              <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
                {isSearching ? (
                  <div 
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                  />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span>{labels[language].search}</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}