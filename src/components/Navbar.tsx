import { useState } from 'react'
import { Switch } from './ui/switch'
import { 
  Globe, 
  Palette, 
  Moon, 
  Sun, 
  Menu, 
  X 
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface NavbarProps {
  language: 'ar' | 'en'
  setLanguage: (lang: 'ar' | 'en') => void
  themeColor: string
  setThemeColor: (color: string) => void
  isDarkMode: boolean
  setIsDarkMode: (dark: boolean) => void
  currentPage?: 'home' | 'destinations' | 'about' | 'services' | 'contact' | 'gallery'
  setCurrentPage?: (page: 'home' | 'destinations' | 'about' | 'services' | 'contact' | 'gallery') => void
}

const themeColors = [
  { name: 'Ocean Blue', value: '#0ea5e9', class: 'bg-sky-500' },
  { name: 'Emerald Green', value: '#10b981', class: 'bg-emerald-500' },
  { name: 'Purple Magic', value: '#8b5cf6', class: 'bg-violet-500' },
  { name: 'Rose Gold', value: '#f43f5e', class: 'bg-rose-500' },
  { name: 'Amber Sun', value: '#f59e0b', class: 'bg-amber-500' },
  { name: 'Cyan Wave', value: '#06b6d4', class: 'bg-cyan-500' },
]

export default function Navbar({ 
  language, 
  setLanguage, 
  themeColor, 
  setThemeColor, 
  isDarkMode, 
  setIsDarkMode,
  currentPage = 'home',
  setCurrentPage
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = {
    ar: [
      { name: 'الرئيسية', page: 'home' },
      { name: 'الوجهات', page: 'destinations' },
      { name: 'المعرض', page: 'gallery' },
      { name: 'الخدمات', page: 'services' },
      { name: 'من نحن', page: 'about' },
      { name: 'اتصل بنا', page: 'contact' }
    ],
    en: [
      { name: 'Home', page: 'home' },
      { name: 'Destinations', page: 'destinations' },
      { name: 'Gallery', page: 'gallery' },
      { name: 'Services', page: 'services' },
      { name: 'About', page: 'about' },
      { name: 'Contact', page: 'contact' }
    ]
  }

  const text = {
    ar: {
      language: 'العربية',
      theme: 'اللون',
      darkMode: 'الوضع المظلم'
    },
    en: {
      language: 'English',
      theme: 'Theme',
      darkMode: 'Dark Mode'
    }
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50
        border-b shadow-2xl
        ${language === 'ar' ? 'rtl' : 'ltr'}`}
      style={{
        backdropFilter: 'blur(16px) saturate(120%)',
        background: `linear-gradient(135deg, 
          ${isDarkMode ? `rgba(0,0,0,0.85)` : `rgba(255,255,255,0.85)`} 0%, 
          ${isDarkMode ? `rgba(0,0,0,0.75)` : `rgba(255,255,255,0.75)`} 25%,
          ${themeColor}15 50%,
          ${isDarkMode ? `rgba(0,0,0,0.75)` : `rgba(255,255,255,0.75)`} 75%,
          ${isDarkMode ? `rgba(0,0,0,0.85)` : `rgba(255,255,255,0.85)`} 100%)`,
        borderColor: `${themeColor}50`,
        boxShadow: `
          0 8px 32px rgba(0,0,0,0.12),
          0 0 0 1px ${themeColor}40,
          inset 0 1px 0 rgba(255,255,255,0.15),
          inset 0 -1px 0 rgba(0,0,0,0.05),
          0 0 40px ${themeColor}20
        `
      }}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer group min-w-0 flex-shrink-0"
            onClick={() => setCurrentPage?.('home')}
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden
                backdrop-blur-2xl border border-white/30 dark:border-white/20
                transform hover:scale-105 transition-all duration-300 ease-out
                shadow-lg hover:shadow-xl"
              style={{
                background: `linear-gradient(135deg, 
                  ${themeColor}25 0%, 
                  ${themeColor}15 25%, 
                  ${themeColor}35 50%, 
                  ${themeColor}20 75%, 
                  ${themeColor}30 100%)`,
                backdropFilter: 'blur(20px)',
                boxShadow: `
                  0 0 20px ${themeColor}40, 
                  0 0 40px ${themeColor}20,
                  inset 0 1px 0 rgba(255,255,255,0.2),
                  inset 0 -1px 0 rgba(0,0,0,0.05)
                `
              }}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/15 to-transparent opacity-40" />
              <div className="relative z-10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-white drop-shadow-lg filter brightness-110" />
              </div>
              <div 
                className="absolute top-1.5 right-1.5 w-0.5 h-0.5 rounded-full bg-white/50 animate-pulse"
                style={{ animationDuration: '2s' }}
              />
            </div>
            
            <div className="flex flex-col min-w-0">
              <h1 
                className="text-base font-semibold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 truncate"
                style={{
                  backgroundImage: `linear-gradient(135deg, 
                    ${isDarkMode ? '#ffffff' : '#1f2937'} 0%, 
                    ${themeColor} 30%, 
                    ${isDarkMode ? '#e5e7eb' : '#4b5563'} 70%, 
                    ${themeColor} 100%)`
                }}
              >
                {language === 'ar' ? 'وكالة السفر الذهبية' : 'Golden Travel'}
              </h1>
              <p 
                className="text-xs transition-all duration-300 truncate"
                style={{
                  color: `${themeColor}90`
                }}
              >
                {language === 'ar' ? 'رحلات استثنائية' : 'Exceptional Journeys'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 rtl:space-x-reverse flex-1 justify-center max-w-3xl">
            {navItems[language].map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (setCurrentPage && (item.page === 'home' || item.page === 'destinations' || item.page === 'about' || item.page === 'services' || item.page === 'contact' || item.page === 'gallery')) {
                    setCurrentPage(item.page as 'home' | 'destinations' | 'about' | 'services' | 'contact' | 'gallery')
                  }
                }}
                className={`relative group px-2.5 xl:px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer
                  backdrop-blur-sm border border-transparent
                  transform hover:scale-105 hover:-translate-y-0.5
                  shadow-sm hover:shadow-lg text-xs xl:text-sm font-medium whitespace-nowrap ${
                    currentPage === item.page 
                      ? 'text-white' 
                      : 'text-gray-800 dark:text-gray-200 hover:text-white dark:hover:text-white'
                  }`}
                style={{
                  background: currentPage === item.page 
                    ? `linear-gradient(135deg, ${themeColor}40 0%, ${themeColor}30 50%, ${themeColor}50 100%)`
                    : `linear-gradient(135deg, 
                      ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)'} 0%, 
                      ${themeColor}10 50%,
                      ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.12)'} 100%)`,
                  backdropFilter: 'blur(8px)',
                  borderColor: currentPage === item.page ? `${themeColor}60` : `${themeColor}20`,
                  boxShadow: currentPage === item.page 
                    ? `0 0 25px ${themeColor}40, 0 6px 15px rgba(0,0,0,0.15)`
                    : `0 2px 4px rgba(0,0,0,0.05)`
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== item.page) {
                    e.currentTarget.style.background = `linear-gradient(135deg, 
                      ${themeColor}35 0%, 
                      ${themeColor}25 50%, 
                      ${themeColor}40 100%)`
                    e.currentTarget.style.borderColor = `${themeColor}50`
                    e.currentTarget.style.boxShadow = `
                      0 0 20px ${themeColor}30,
                      0 6px 15px rgba(0,0,0,0.1),
                      inset 0 1px 0 rgba(255,255,255,0.2)
                    `
                    e.currentTarget.style.backdropFilter = 'blur(10px) saturate(130%)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== item.page) {
                    e.currentTarget.style.background = `linear-gradient(135deg, 
                      ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)'} 0%, 
                      ${themeColor}10 50%,
                      ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.12)'} 100%)`
                    e.currentTarget.style.borderColor = `${themeColor}20`
                    e.currentTarget.style.boxShadow = `0 2px 4px rgba(0,0,0,0.05)`
                    e.currentTarget.style.backdropFilter = 'blur(8px)'
                  }
                }}
              >
                <span className="relative z-10">{item.name}</span>
                
                {/* Animated underline */}
                <div 
                  className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 rounded-full ${
                    currentPage === item.page ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  style={{ backgroundColor: themeColor }}
                />
                
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                  style={{
                    background: `radial-gradient(circle at center, ${themeColor}15 0%, transparent 70%)`
                  }}
                />
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse flex-shrink-0">
            
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="relative group h-9 px-2.5 xl:px-3 rounded-xl transition-all duration-300 cursor-pointer
                backdrop-blur-sm border flex items-center
                text-gray-800 dark:text-gray-200 hover:text-white dark:hover:text-white
                transform hover:scale-105 hover:-translate-y-0.5
                shadow-lg hover:shadow-xl font-medium hidden sm:flex"
              style={{
                background: `linear-gradient(135deg, 
                  ${isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.35)'} 0%, 
                  ${themeColor}15 50%,
                  ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.25)'} 100%)`,
                borderColor: `${themeColor}40`,
                backdropFilter: 'blur(8px) saturate(110%)',
                boxShadow: `
                  0 0 20px ${themeColor}30,
                  inset 0 1px 0 rgba(255,255,255,0.1),
                  0 2px 8px rgba(0,0,0,0.08)
                `
              }}
            >
              <Globe className="w-3 xl:w-3.5 h-3 xl:h-3.5 mr-1 xl:mr-1.5 rtl:ml-1 xl:rtl:ml-1.5 rtl:mr-0" />
              <span className="text-xs">{language === 'ar' ? 'ع' : 'En'}</span>
            </button>

            {/* Theme Color Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="relative group h-9 px-2.5 xl:px-3 rounded-xl transition-all duration-300 cursor-pointer
                    backdrop-blur-sm border flex items-center
                    text-gray-800 dark:text-gray-200 hover:text-white dark:hover:text-white
                    transform hover:scale-105 hover:-translate-y-0.5
                    shadow-lg hover:shadow-xl font-medium hidden md:flex"
                  style={{
                    background: `linear-gradient(135deg, 
                      ${isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.35)'} 0%, 
                      ${themeColor}15 50%,
                      ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.25)'} 100%)`,
                    borderColor: `${themeColor}40`,
                    backdropFilter: 'blur(8px) saturate(110%)',
                    boxShadow: `
                      0 0 20px ${themeColor}30,
                      inset 0 1px 0 rgba(255,255,255,0.1),
                      0 2px 8px rgba(0,0,0,0.08)
                    `
                  }}
                >
                  <Palette className="w-3 xl:w-3.5 h-3 xl:h-3.5 mr-1 xl:mr-1.5 rtl:ml-1 xl:rtl:ml-1.5 rtl:mr-0" />
                  <div 
                    className="w-3.5 xl:w-4 h-3.5 xl:h-4 rounded-full border border-white/30 shadow-md"
                    style={{ 
                      backgroundColor: themeColor,
                      boxShadow: `0 0 10px ${themeColor}50, inset 0 1px 0 rgba(255,255,255,0.2)`
                    }}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-56 p-3 backdrop-blur-2xl border rounded-2xl shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, 
                    ${isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'} 0%, 
                    ${isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)'} 100%)`,
                  borderColor: `${themeColor}40`,
                  backdropFilter: 'blur(25px) saturate(180%)',
                  boxShadow: `
                    0 20px 60px rgba(0,0,0,0.3),
                    0 0 0 1px ${themeColor}30,
                    inset 0 1px 0 rgba(255,255,255,0.2)
                  `
                }}
              >
                {themeColors.map((color) => (
                  <DropdownMenuItem
                    key={color.value}
                    onClick={() => setThemeColor(color.value)}
                    className="flex items-center space-x-3 rtl:space-x-reverse p-4 rounded-xl transition-all duration-300 cursor-pointer
                      hover:backdrop-blur-xl transform hover:scale-105"
                    style={{
                      background: themeColor === color.value 
                        ? `linear-gradient(135deg, ${color.value}25, ${color.value}15)`
                        : 'transparent'
                    }}
                  >
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-white/50 shadow-xl relative overflow-hidden"
                      style={{
                        backgroundColor: color.value,
                        boxShadow: `
                          0 0 20px ${color.value}50,
                          inset 0 1px 0 rgba(255,255,255,0.3),
                          inset 0 -1px 0 rgba(0,0,0,0.1)
                        `
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
                      {themeColor === color.value && (
                        <div className="absolute inset-0 border-2 border-white rounded-full animate-pulse" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {color.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {color.value.toUpperCase()}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dark Mode Toggle */}
            <div 
              className="flex items-center space-x-1.5 xl:space-x-2 rtl:space-x-reverse px-2.5 xl:px-3 py-2 rounded-xl backdrop-blur-sm border transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, 
                  ${isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.35)'} 0%, 
                  ${themeColor}15 50%,
                  ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.25)'} 100%)`,
                borderColor: `${themeColor}40`,
                backdropFilter: 'blur(8px) saturate(110%)',
                boxShadow: `
                  0 0 20px ${themeColor}30,
                  inset 0 1px 0 rgba(255,255,255,0.1),
                  0 2px 8px rgba(0,0,0,0.08)
                `
              }}
            >
              <div className="flex items-center space-x-1.5 xl:space-x-2 rtl:space-x-reverse">
                <Sun 
                  className={`w-3.5 xl:w-4 h-3.5 xl:h-4 transition-all duration-300 ${
                    !isDarkMode ? 'text-yellow-500 scale-105' : 'text-gray-400 scale-95'
                  }`} 
                />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  className="data-[state=checked]:bg-blue-600 cursor-pointer scale-75"
                  style={{
                    background: isDarkMode ? themeColor : '#e5e7eb'
                  }}
                />
                <Moon 
                  className={`w-3.5 xl:w-4 h-3.5 xl:h-4 transition-all duration-300 ${
                    isDarkMode ? 'text-blue-400 scale-105' : 'text-gray-400 scale-95'
                  }`} 
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative group h-9 w-9 rounded-xl transition-all duration-300 cursor-pointer
                backdrop-blur-sm border flex items-center justify-center
                text-gray-800 dark:text-gray-200 hover:text-white dark:hover:text-white
                transform hover:scale-105 hover:-translate-y-0.5
                shadow-lg hover:shadow-xl"
              style={{
                background: `linear-gradient(135deg, 
                  ${isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.35)'} 0%, 
                  ${themeColor}15 50%,
                  ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.25)'} 100%)`,
                borderColor: `${themeColor}40`,
                backdropFilter: 'blur(8px) saturate(110%)',
                boxShadow: `
                  0 0 20px ${themeColor}30,
                  inset 0 1px 0 rgba(255,255,255,0.1),
                  0 2px 8px rgba(0,0,0,0.08)
                `
              }}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            className="lg:hidden pb-4 animate-in slide-in-from-top-5 duration-300
              backdrop-blur-lg rounded-2xl mt-4 p-4 border shadow-xl mx-3"
            style={{
              background: `linear-gradient(135deg, 
                ${isDarkMode ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)'} 0%, 
                ${isDarkMode ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.75)'} 25%,
                ${themeColor}15 50%,
                ${isDarkMode ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.75)'} 75%,
                ${isDarkMode ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)'} 100%)`,
              borderColor: `${themeColor}40`,
              backdropFilter: 'blur(16px) saturate(120%)',
              boxShadow: `
                0 15px 40px rgba(0,0,0,0.2),
                0 0 0 1px ${themeColor}30,
                inset 0 1px 0 rgba(255,255,255,0.15)
              `
            }}
          >
            <div className="space-y-2">
              {navItems[language].map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (setCurrentPage && (item.page === 'home' || item.page === 'destinations' || item.page === 'about' || item.page === 'services' || item.page === 'contact' || item.page === 'gallery')) {
                      setCurrentPage(item.page as 'home' | 'destinations' | 'about' | 'services' | 'contact' | 'gallery')
                    }
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer
                    text-gray-800 dark:text-gray-200 hover:text-white dark:hover:text-white
                    backdrop-blur-sm border border-transparent
                    transform hover:scale-102 hover:-translate-y-0.5
                    shadow-sm hover:shadow-lg font-medium text-sm"
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(255,255,255,0.15) 0%, 
                      ${themeColor}08 50%,
                      rgba(255,255,255,0.08) 100%)`,
                    backdropFilter: 'blur(6px)'
                  }}
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile-only controls */}
              <div className="pt-3 mt-3 border-t border-white/10 dark:border-white/5">
                <div className="flex items-center justify-between gap-4">
                  {/* Language Toggle Mobile */}
                  <button
                    onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                    className="flex items-center px-3 py-2 rounded-lg text-sm cursor-pointer
                      text-gray-800 dark:text-gray-200 hover:text-white dark:hover:text-white
                      backdrop-blur-sm border transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(255,255,255,0.2) 0%, 
                        ${themeColor}10 50%,
                        rgba(255,255,255,0.12) 100%)`,
                      borderColor: `${themeColor}30`
                    }}
                  >
                    <Globe className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    <span>{text[language].language}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}