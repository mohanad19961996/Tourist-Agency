import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroCarousel from './components/HeroCarousel'
import BookingPanel from './components/BookingPanel'
import DestinationsShowcase from './components/DestinationsShowcase'
import ServicesCarousel from './components/ServicesCarousel'
import WhyChooseUs from './components/WhyChooseUs'
import StatsCounter from './components/StatsCounter'

export default function App() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar')
  const [themeColor, setThemeColor] = useState('#0ea5e9')
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Apply theme color as CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', themeColor)
  }, [themeColor])

  // Apply language direction
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }, [language])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 transition-all duration-1000">
      
      <Navbar 
        language={language}
        setLanguage={setLanguage}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Hero Section with Full-Screen Carousel */}
      <HeroCarousel 
        language={language}
        themeColor={themeColor}
        isDarkMode={isDarkMode}
      />

      {/* Floating Quick Booking Panel */}
      <BookingPanel 
        language={language}
        themeColor={themeColor}
        isDarkMode={isDarkMode}
      />

      {/* Premium Destinations Showcase */}
      <DestinationsShowcase 
        language={language}
        themeColor={themeColor}
        isDarkMode={isDarkMode}
      />

      {/* Luxury Services Carousel */}
      <ServicesCarousel 
        language={language}
        themeColor={themeColor}
        isDarkMode={isDarkMode}
      />

      {/* Why Choose Us Section */}
      <WhyChooseUs 
        language={language}
        themeColor={themeColor}
        isDarkMode={isDarkMode}
      />

      {/* Live Statistics Counter */}
      <StatsCounter 
        language={language}
        themeColor={themeColor}
        isDarkMode={isDarkMode}
      />

    </div>
  )
}