import { useState } from 'react'
import { Star, MapPin, Clock, ArrowRight, ArrowLeft } from 'lucide-react'

interface DestinationsShowcaseProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
}

const destinations = [
  {
    id: 1,
    name: { ar: 'دبي', en: 'Dubai' },
    image: 'https://images.unsplash.com/photo-1727948539769-1151a581129d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGJ1cmolMjBhbCUyMGFyYWIlMjBnb2xkZW4lMjBza3lsaW5lfGVufDF8fHx8MTc1NjUzOTE3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    price: { ar: 'من $2,299', en: 'From $2,299' },
    duration: { ar: '5 أيام فاخرة', en: '5 Luxury Days' },
    description: { 
      ar: 'اكتشف سحر دبي مع إقامة في أفخم الفنادق وجولات حصرية', 
      en: 'Discover the magic of Dubai with luxury hotel stays and exclusive tours' 
    },
    rating: 4.9,
    reviews: 1247
  },
  {
    id: 2,
    name: { ar: 'جزر المالديف', en: 'Maldives' },
    image: 'https://images.unsplash.com/photo-1620483829646-8fb1d8162108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMG92ZXJ3YXRlciUyMHZpbGxhJTIwc3Vuc2V0fGVufDF8fHx8MTc1NjUzOTE2NHww&ixlib=rb-4.1.0&q=80&w=1080',
    price: { ar: 'من $3,499', en: 'From $3,499' },
    duration: { ar: '7 أيام رومانسية', en: '7 Romantic Days' },
    description: { 
      ar: 'أسبوع لا يُنسى في الفيلات المائية مع إطلالات خلابة', 
      en: 'An unforgettable week in overwater villas with stunning views' 
    },
    rating: 4.8,
    reviews: 893
  },
  {
    id: 3,
    name: { ar: 'سويسرا', en: 'Switzerland' },
    image: 'https://images.unsplash.com/photo-1736144595832-1c3c997f9177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMGFscHMlMjBsdXh1cnklMjBjaGFsZXQlMjBzbm93fGVufDF8fHx8MTc1NjUzOTE2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    price: { ar: 'من $2,899', en: 'From $2,899' },
    duration: { ar: '6 أيام مغامرة', en: '6 Adventure Days' },
    description: { 
      ar: 'استمتع بجمال جبال الألب وأنشطة المغامرة الشتوية', 
      en: 'Enjoy the beauty of the Alps and winter adventure activities' 
    },
    rating: 4.7,
    reviews: 672
  },
  {
    id: 4,
    name: { ar: 'اليابان', en: 'Japan' },
    image: 'https://images.unsplash.com/photo-1712244876693-a89f6172178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMGNoZXJyeSUyMGJsb3Nzb21zJTIwdGVtcGxlfGVufDF8fHx8MTc1NjUzOTE4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    price: { ar: 'من $2,799', en: 'From $2,799' },
    duration: { ar: '8 أيام ثقافية', en: '8 Cultural Days' },
    description: { 
      ar: 'رحلة ثقافية مذهلة عبر التقاليد والحداثة اليابانية', 
      en: 'An amazing cultural journey through Japanese traditions and modernity' 
    },
    rating: 4.9,
    reviews: 1156
  },
  {
    id: 5,
    name: { ar: 'تركيا', en: 'Turkey' },
    image: 'https://images.unsplash.com/photo-1680204412403-73110934f5aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJrZXklMjBjYXBwYWRvY2lhJTIwaG90JTIwYWlyJTIwYmFsbG9vbnN8ZW58MXx8fHwxNzU2NTM5MTg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: { ar: 'من $1,899', en: 'From $1,899' },
    duration: { ar: '7 أيام استكشاف', en: '7 Discovery Days' },
    description: { 
      ar: 'اكتشف عجائب كابادوكيا ومعالم إسطنبول التاريخية', 
      en: 'Discover the wonders of Cappadocia and Istanbul\'s historic landmarks' 
    },
    rating: 4.6,
    reviews: 945
  },
  {
    id: 6,
    name: { ar: 'مصر', en: 'Egypt' },
    image: 'https://images.unsplash.com/photo-1718724610253-515d745a4bef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdCUyMHB5cmFtaWRzJTIwbmlsZSUyMGNydWlzZXxlbnwxfHx8fDE3NTY1MzkxODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: { ar: 'من $1,799', en: 'From $1,799' },
    duration: { ar: '9 أيام تاريخية', en: '9 Historical Days' },
    description: { 
      ar: 'رحلة عبر التاريخ من الأهرامات إلى رحلة نيلية فاخرة', 
      en: 'A journey through history from the Pyramids to a luxury Nile cruise' 
    },
    rating: 4.5,
    reviews: 756
  },
  {
    id: 7,
    name: { ar: 'تايلاند', en: 'Thailand' },
    image: 'https://images.unsplash.com/photo-1712335871955-2c349e54136e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpbGFuZCUyMHRyb3BpY2FsJTIwYmVhY2hlcyUyMHRlbXBsZXN8ZW58MXx8fHwxNzU2NTM5MTkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: { ar: 'من $1,599', en: 'From $1,599' },
    duration: { ar: '8 أيام استوائية', en: '8 Tropical Days' },
    description: { 
      ar: 'استمتع بالشواطئ الاستوائية والمعابد البوذية الأثرية', 
      en: 'Enjoy tropical beaches and ancient Buddhist temples' 
    },
    rating: 4.4,
    reviews: 834
  },
  {
    id: 8,
    name: { ar: 'إيطاليا', en: 'Italy' },
    image: 'https://images.unsplash.com/photo-1686249907997-11b9edf9a951?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFseSUyMHZlbmljZSUyMGdvbmRvbGFzJTIwcm9tZSUyMGNvbG9zc2V1bXxlbnwxfHx8fDE3NTY1MzkxOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: { ar: 'من $2,199', en: 'From $2,199' },
    duration: { ar: '10 أيام فنية', en: '10 Artistic Days' },
    description: { 
      ar: 'جولة فنية عبر روما والبندقية وفلورنسا', 
      en: 'An artistic tour through Rome, Venice, and Florence' 
    },
    rating: 4.8,
    reviews: 1089
  }
]

export default function DestinationsShowcase({ language, themeColor, isDarkMode }: DestinationsShowcaseProps) {
  const [flippedCards, setFlippedCards] = useState<number[]>([])

  const heading = {
    ar: 'وجهاتنا الحصرية المختارة بعناية',
    en: 'Our Handpicked Exclusive Destinations'
  }

  const toggleFlip = (cardId: number) => {
    setFlippedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    )
  }

  return (
    <section className={`py-20 px-4 lg:px-8 relative ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-10 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${themeColor}30 0%, transparent 70%)`,
            animationDuration: '4s'
          }}
        />
        <div 
          className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full opacity-10 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${themeColor}30 0%, transparent 70%)`,
            animationDuration: '6s',
            animationDelay: '2s'
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
            {heading[language]}
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: themeColor }}
          />
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group relative h-80 cursor-pointer perspective-1000"
              onClick={() => toggleFlip(destination.id)}
            >
              <div 
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d
                  ${flippedCards.includes(destination.id) ? 'rotate-y-180' : ''}`}
              >
                {/* Front of Card */}
                <div 
                  className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden
                    shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, 
                      ${isDarkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'} 0%, 
                      ${isDarkMode ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'} 100%)`,
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${themeColor}30`
                  }}
                >
                  {/* Image */}
                  <div 
                    className="h-2/3 bg-cover bg-center relative overflow-hidden"
                    style={{ backgroundImage: `url(${destination.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Rating Badge */}
                    <div 
                      className="absolute top-4 right-4 rtl:left-4 rtl:right-auto backdrop-blur-xl rounded-lg px-3 py-1
                        border border-white/30 flex items-center space-x-1 rtl:space-x-reverse"
                      style={{
                        background: `linear-gradient(135deg, 
                          rgba(255,255,255,0.2) 0%, 
                          rgba(255,255,255,0.1) 100%)`,
                        backdropFilter: 'blur(15px)'
                      }}
                    >
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-medium">{destination.rating}</span>
                    </div>

                    {/* Location Badge */}
                    <div 
                      className="absolute bottom-4 left-4 rtl:right-4 rtl:left-auto backdrop-blur-xl rounded-lg px-3 py-1
                        border border-white/30 flex items-center space-x-2 rtl:space-x-reverse"
                      style={{
                        background: `linear-gradient(135deg, ${themeColor}40, ${themeColor}20)`,
                        backdropFilter: 'blur(15px)'
                      }}
                    >
                      <MapPin className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-medium">
                        {destination.name[language]}
                      </span>
                    </div>
                  </div>

                  {/* Front Content */}
                  <div className="h-1/3 p-4 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {destination.name[language]}
                    </h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                      <Clock className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" style={{ color: themeColor }} />
                      <span>{destination.duration[language]}</span>
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div 
                  className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden
                    shadow-xl transform rotate-y-180 p-6 flex flex-col justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor}15, ${themeColor}05)`,
                    backdropFilter: 'blur(25px)',
                    border: `1px solid ${themeColor}40`,
                    boxShadow: `0 0 40px ${themeColor}20, inset 0 1px 0 rgba(255,255,255,0.1)`
                  }}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                      {destination.name[language]}
                    </h3>
                    
                    <div 
                      className="text-3xl font-bold mb-4"
                      style={{ color: themeColor }}
                    >
                      {destination.price[language]}
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                      {destination.description[language]}
                    </p>
                    
                    <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse mb-6">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1 rtl:ml-1 rtl:mr-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {destination.rating} ({destination.reviews})
                        </span>
                      </div>
                    </div>
                    
                    <button 
                      className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300
                        transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}CC 100%)`,
                        boxShadow: `0 0 20px ${themeColor}40`
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle booking logic
                      }}
                    >
                      <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                        <span>{language === 'ar' ? 'احجز الآن' : 'Book Now'}</span>
                        {language === 'ar' ? 
                          <ArrowLeft className="w-4 h-4" /> : 
                          <ArrowRight className="w-4 h-4" />
                        }
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `
      }} />
    </section>
  )
}