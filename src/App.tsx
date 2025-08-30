import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import ProgressBar from './components/ProgressBar'
import Navbar from './components/Navbar'
import HeroCarousel from './components/HeroCarousel'
import BookingPanel from './components/BookingPanel'
import DestinationsShowcase from './components/DestinationsShowcase'
import ServicesCarousel from './components/ServicesCarousel'
import WhyChooseUs from './components/WhyChooseUs'

import TestimonialsSection from './components/TestimonialsSection'
import CommunicationsHub from './components/CommunicationsHub'
import DestinationsPage from './components/DestinationsPage'
import AboutPage from './components/AboutPage'
import ServicesPage from './components/ServicesPage'
import ContactPage from './components/ContactPage'
import GalleryPage from './components/GalleryPage'

export default function App() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar')
  const [themeColor, setThemeColor] = useState('#0ea5e9')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<'home' | 'destinations' | 'about' | 'services' | 'contact' | 'gallery'>('home')

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

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 relative">
      {/* Main Content */}
      <div className="relative">
        {/* Premium Progress Bar */}
        <ProgressBar 
          language={language}
          themeColor={themeColor}
          isDarkMode={isDarkMode}
        />
        
        <Navbar 
          language={language}
          setLanguage={setLanguage}
          themeColor={themeColor}
          setThemeColor={setThemeColor}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {/* Page Content */}
        {currentPage === 'home' ? (
          <>
            {/* Hero Section with Full-Screen Carousel */}
            <HeroCarousel 
              language={language}
              themeColor={themeColor}
              isDarkMode={isDarkMode}
              onToggleBooking={() => setIsBookingOpen(!isBookingOpen)}
            />

            {/* Content Sections */}
            <div className="space-y-0">
              {/* SECTION 3: Signature Destinations Portfolio */}
              <DestinationsShowcase 
                language={language}
                themeColor={themeColor}
                isDarkMode={isDarkMode}
              />

              {/* SECTION 4: Comprehensive Service Excellence */}
              <ServicesCarousel 
                language={language}
                themeColor={themeColor}
                isDarkMode={isDarkMode}
              />

              {/* SECTION 5: Competitive Advantages Showcase */}
              <WhyChooseUs 
                language={language}
                themeColor={themeColor}
                isDarkMode={isDarkMode}
              />



              {/* SECTION 7: Client Testimonials Excellence */}
              <TestimonialsSection 
                language={language}
                themeColor={themeColor}
                isDarkMode={isDarkMode}
              />

              {/* SECTION 8: Exclusive Communications Hub */}
              <CommunicationsHub 
                language={language}
                themeColor={themeColor}
                isDarkMode={isDarkMode}
              />
            </div>
          </>
        ) : currentPage === 'destinations' ? (
          <div className="pt-16">
            <DestinationsPage 
              language={language}
              themeColor={themeColor}
              isDarkMode={isDarkMode}
            />
          </div>
        ) : currentPage === 'about' ? (
          <div className="pt-16">
            <AboutPage 
              language={language}
              themeColor={themeColor}
              isDarkMode={isDarkMode}
            />
          </div>
        ) : currentPage === 'services' ? (
          <div className="pt-16">
            <ServicesPage 
              language={language}
              themeColor={themeColor}
              isDarkMode={isDarkMode}
            />
          </div>
        ) : currentPage === 'contact' ? (
          <div className="pt-16">
            <ContactPage 
              language={language}
              themeColor={themeColor}
              isDarkMode={isDarkMode}
            />
          </div>
        ) : currentPage === 'gallery' ? (
          <div className="pt-16">
            <GalleryPage 
              language={language}
              themeColor={themeColor}
              isDarkMode={isDarkMode}
            />
          </div>
        ) : null}
      </div>

      {/* Backdrop Overlay */}
      {isBookingOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 transition-opacity duration-500"
          onClick={() => setIsBookingOpen(false)}
        />
      )}

      {/* Floating Quick Booking Panel */}
      <BookingPanel 
        language={language}
        themeColor={themeColor}
        isDarkMode={isDarkMode}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Floating Toggle Button */}
      {!isBookingOpen && (
        <button
          onClick={() => setIsBookingOpen(true)}
          className={`fixed bottom-6 ${language === 'ar' ? 'left-6' : 'right-6'} z-40 
            w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl
            transform hover:scale-110 transition-all duration-300
            flex items-center justify-center cursor-pointer group`}
          style={{
            background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
            boxShadow: `0 8px 32px ${themeColor}40`
          }}
        >
          <Search className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
          
          {/* Pulse Animation */}
          <div 
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ backgroundColor: themeColor }}
          />
        </button>
      )}
    </div>
  )
}