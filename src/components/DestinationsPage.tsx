import { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Grid3X3, 
  List, 
  Star,
  MapPin,
  Calendar,
  Users,
  Clock,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Plane,
  TrendingUp,
  Award,
  Eye,
  Bookmark,
  ArrowUpDown,
  X
} from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface DestinationsPageProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
}

// Premium destinations with real Unsplash images
const destinations = [
  {
    id: 1,
    name: { ar: 'اليابان الساحرة', en: 'Enchanting Japan' },
    location: { ar: 'طوكيو وكيوتو وأوساكا', en: 'Tokyo, Kyoto & Osaka' },
    country: { ar: 'اليابان', en: 'Japan' },
    continent: 'asia',
    price: { ar: '٥٬٩٩٥', en: '1,599' },
    originalPrice: { ar: '٧٬٢٠٠', en: '1,920' },
    currency: { ar: 'ر.س', en: '$' },
    rating: 4.9,
    reviews: 842,
    duration: { ar: '٧ أيام', en: '7 Days' },
    nights: { ar: '٦ ليالي', en: '6 Nights' },
    maxPeople: 12,
    category: 'cultural',
    difficulty: 'easy',
    bestSeason: { ar: 'الربيع والخريف', en: 'Spring & Autumn' },
    highlights: [
      { ar: 'معبد فوشيمي إيناري', en: 'Fushimi Inari Shrine' },
      { ar: 'حديقة شينجوكو الوطنية', en: 'Shinjuku National Garden' },
      { ar: 'قلعة أوساكا التاريخية', en: 'Historic Osaka Castle' },
      { ar: 'حي غيشا في غيون', en: 'Geisha District in Gion' }
    ],
    image: "https://images.unsplash.com/photo-1665590811905-27ed148ac952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMGNoZXJyeSUyMGJsb3Nzb20lMjB0ZW1wbGV8ZW58MXx8fHwxNzU2NTUxODgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 17,
    featured: true,
    trending: true,
    isNew: false
  },
  {
    id: 2,
    name: { ar: 'جزر المالديف الاستوائية', en: 'Tropical Maldives Paradise' },
    location: { ar: 'مالي وآري أتول', en: 'Male & Ari Atoll' },
    country: { ar: 'جزر المالديف', en: 'Maldives' },
    continent: 'asia',
    price: { ar: '٩٬٩٩٥', en: '2,665' },
    originalPrice: { ar: '١١٬٥٠٠', en: '3,067' },
    currency: { ar: 'ر.س', en: '$' },
    rating: 4.9,
    reviews: 1203,
    duration: { ar: '٦ أيام', en: '6 Days' },
    nights: { ar: '٥ ليالي', en: '5 Nights' },
    maxPeople: 2,
    category: 'luxury',
    difficulty: 'easy',
    bestSeason: { ar: 'طوال السنة', en: 'Year Round' },
    highlights: [
      { ar: 'فيلات مائية خاصة', en: 'Private overwater villas' },
      { ar: 'الشعاب المرجانية الملونة', en: 'Colorful coral reefs' },
      { ar: 'رياضات مائية متنوعة', en: 'Various water sports' },
      { ar: 'علاجات سبا على المحيط', en: 'Ocean spa treatments' }
    ],
    image: "https://images.unsplash.com/photo-1697898109604-e06e88b15271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMG92ZXJ3YXRlciUyMHZpbGxhfGVufDF8fHx8MTc1NjU1MTg4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 13,
    featured: true,
    trending: true,
    isNew: false
  },
  {
    id: 3,
    name: { ar: 'سويسرا الخلابة', en: 'Spectacular Switzerland' },
    location: { ar: 'زيورخ وإنترلاكن وزيرمات', en: 'Zurich, Interlaken & Zermatt' },
    country: { ar: 'سويسرا', en: 'Switzerland' },
    continent: 'europe',
    price: { ar: '٧٬٤٩٥', en: '1,999' },
    originalPrice: { ar: '٨٬٦٠٠', en: '2,293' },
    currency: { ar: 'ر.س', en: '$' },
    rating: 4.8,
    reviews: 567,
    duration: { ar: '٥ أيام', en: '5 Days' },
    nights: { ar: '٤ ليالي', en: '4 Nights' },
    maxPeople: 8,
    category: 'adventure',
    difficulty: 'moderate',
    bestSeason: { ar: 'الصيف والشتاء', en: 'Summer & Winter' },
    highlights: [
      { ar: 'جبل ماترهورن الشهير', en: 'Famous Matterhorn Mountain' },
      { ar: 'بحيرة جنيف الساحرة', en: 'Enchanting Lake Geneva' },
      { ar: 'قطار جونغفراو السياحي', en: 'Jungfrau Scenic Train' },
      { ar: 'قرية غريندلفالد الجبلية', en: 'Mountainous Grindelwald Village' }
    ],
    image: "https://images.unsplash.com/photo-1712960488067-b040b21b0d50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMGFscHMlMjBtb3VudGFpbiUyMGx1eHVyeXxlbnwxfHx8fDE3NTY1NTE4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 13,
    featured: true,
    trending: false,
    isNew: false
  },
  {
    id: 4,
    name: { ar: 'سانتوريني الرومانسية', en: 'Romantic Santorini' },
    location: { ar: 'فيرا وأويا', en: 'Fira & Oia' },
    country: { ar: 'اليونان', en: 'Greece' },
    continent: 'europe',
    price: { ar: '٦٬٢٩٥', en: '1,679' },
    originalPrice: { ar: '٧٬٤٠٠', en: '1,973' },
    currency: { ar: 'ر.س', en: '$' },
    rating: 4.8,
    reviews: 934,
    duration: { ar: '٥ أيام', en: '5 Days' },
    nights: { ar: '٤ ليالي', en: '4 Nights' },
    maxPeople: 6,
    category: 'luxury',
    difficulty: 'easy',
    bestSeason: { ar: 'الربيع والصيف', en: 'Spring & Summer' },
    highlights: [
      { ar: 'غروب شمس أويا الأسطوري', en: 'Legendary Oia Sunset' },
      { ar: 'البيوت البيضاء التقليدية', en: 'Traditional White Houses' },
      { ar: 'كروم العنب البركانية', en: 'Volcanic Vineyards' },
      { ar: 'الشواطئ السوداء الفريدة', en: 'Unique Black Sand Beaches' }
    ],
    image: "https://images.unsplash.com/photo-1677268357140-146d5c15307d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBzdW5zZXR8ZW58MXx8fHwxNzU2NTQ5MDU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 15,
    featured: false,
    trending: true,
    isNew: true
  },
  {
    id: 5,
    name: { ar: 'دبي الحديثة', en: 'Modern Dubai Experience' },
    location: { ar: 'دبي وأبوظبي', en: 'Dubai & Abu Dhabi' },
    country: { ar: 'الإمارات العربية المتحدة', en: 'United Arab Emirates' },
    continent: 'asia',
    price: { ar: '٤٬٩٩٥', en: '1,332' },
    originalPrice: { ar: '٥٬٨٠٠', en: '1,547' },
    currency: { ar: 'ر.س', en: '$' },
    rating: 4.7,
    reviews: 892,
    duration: { ar: '٤ أيام', en: '4 Days' },
    nights: { ar: '٣ ليالي', en: '3 Nights' },
    maxPeople: 15,
    category: 'urban',
    difficulty: 'easy',
    bestSeason: { ar: 'الشتاء والربيع', en: 'Winter & Spring' },
    highlights: [
      { ar: 'برج خليفة الشاهق', en: 'Towering Burj Khalifa' },
      { ar: 'نافورة دبي الراقصة', en: 'Dancing Dubai Fountain' },
      { ar: 'جزيرة النخلة الاصطناعية', en: 'Artificial Palm Island' },
      { ar: 'سوق الذهب التقليدي', en: 'Traditional Gold Souk' }
    ],
    image: "https://images.unsplash.com/photo-1583012802443-efc6e8b00f5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGJ1cmolMjBraGFsaWZhJTIwbHV4dXJ5fGVufDF8fHx8MTc1NjU1MTg5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 14,
    featured: false,
    trending: false,
    isNew: false
  },
  {
    id: 6,
    name: { ar: 'بالي الاستوائية', en: 'Tropical Bali Paradise' },
    location: { ar: 'أوبود وسيمينياك', en: 'Ubud & Seminyak' },
    country: { ar: 'إندونيسيا', en: 'Indonesia' },
    continent: 'asia',
    price: { ar: '٣٬٨٩٥', en: '1,039' },
    originalPrice: { ar: '٤٬٥٠٠', en: '1,200' },
    currency: { ar: 'ر.س', en: '$' },
    rating: 4.6,
    reviews: 743,
    duration: { ar: '٧ أيام', en: '7 Days' },
    nights: { ar: '٦ ليالي', en: '6 Nights' },
    maxPeople: 10,
    category: 'nature',
    difficulty: 'easy',
    bestSeason: { ar: 'أبريل إلى أكتوبر', en: 'April to October' },
    highlights: [
      { ar: 'مدرجات الأرز الخضراء', en: 'Green Rice Terraces' },
      { ar: 'معابد هندوسية قديمة', en: 'Ancient Hindu Temples' },
      { ar: 'شواطئ استوائية خلابة', en: 'Stunning Tropical Beaches' },
      { ar: 'غابات القرود المقدسة', en: 'Sacred Monkey Forest' }
    ],
    image: "https://images.unsplash.com/photo-1668276490368-409a6002756d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwaW5maW5pdHklMjBwb29sJTIwdHJvcGljYWx8ZW58MXx8fHwxNzU2NTUxOTAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 13,
    featured: true,
    trending: true,
    isNew: false
  },
  {
    id: 7,
    name: { ar: 'باريس الرومانسية', en: 'Romantic Paris' },
    location: { ar: 'باريس وفرساي', en: 'Paris & Versailles' },
    country: { ar: 'فرنسا', en: 'France' },
    continent: 'europe',
    price: { ar: '٨٬٢٩٥', en: '2,212' },
    originalPrice: { ar: '٩٬٦٠٠', en: '2,560' },
    currency: { ar: 'ر.س', en: '$' },
    rating: 4.9,
    reviews: 1156,
    duration: { ar: '٦ أيام', en: '6 Days' },
    nights: { ar: '٥ ليالي', en: '5 Nights' },
    maxPeople: 8,
    category: 'cultural',
    difficulty: 'easy',
    bestSeason: { ar: 'الربيع والصيف', en: 'Spring & Summer' },
    highlights: [
      { ar: 'برج إيفل الشهير', en: 'Famous Eiffel Tower' },
      { ar: 'متحف اللوفر العريق', en: 'Historic Louvre Museum' },
      { ar: 'كاتدرائية نوتردام', en: 'Notre-Dame Cathedral' },
      { ar: 'قصر فرساي الملكي', en: 'Royal Palace of Versailles' }
    ],
    image: "https://images.unsplash.com/photo-1683874022998-401ac10b5c62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyJTIwbHV4dXJ5fGVufDF8fHx8MTc1NjU1MTkwNHww&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 14,
    featured: true,
    trending: false,
    isNew: false
  },
  {
    id: 8,
    name: { ar: 'آيسلندا الساحرة', en: 'Enchanting Iceland' },
    location: { ar: 'ريكيافيك والحلقة الذهبية', en: 'Reykjavik & Golden Circle' },
    country: { ar: 'آيسلندا', en: 'Iceland' },
    continent: 'europe',
    price: { ar: '١١٬٢٩٥', en: '3,012' },
    originalPrice: { ar: '١٣٬٠٠٠', en: '3,467' },
    currency: { ar: 'ر.س', en: '$' },
    rating: 4.8,
    reviews: 387,
    duration: { ar: '٨ أيام', en: '8 Days' },
    nights: { ar: '٧ ليالي', en: '7 Nights' },
    maxPeople: 12,
    category: 'adventure',
    difficulty: 'moderate',
    bestSeason: { ar: 'سبتمبر إلى مارس', en: 'September to March' },
    highlights: [
      { ar: 'الشفق القطبي الساحر', en: 'Magical Northern Lights' },
      { ar: 'الينابيع الحارة الطبيعية', en: 'Natural Hot Springs' },
      { ar: 'الشلالات الجليدية', en: 'Glacial Waterfalls' },
      { ar: 'الكهوف الجليدية الزرقاء', en: 'Blue Ice Caves' }
    ],
    image: "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VsYW5kJTIwbm9ydGhlcm4lMjBsaWdodHN8ZW58MXx8fHwxNzU2NTQ1MjgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 13,
    featured: false,
    trending: true,
    isNew: true
  },
  {
    id: 9,
    name: { ar: 'المغرب الأصيل', en: 'Authentic Morocco' },
    location: { ar: 'مراكش وفاس والصحراء', en: 'Marrakech, Fez & Sahara' },
    country: { ar: 'المغرب', en: 'Morocco' },
    continent: 'africa',
    price: { ar: '٤٬٥٩٥', en: '1,225' },
    originalPrice: { ar: '٥٬٤٠٠', en: '1,440' },
    currency: { ar: 'ر.س', en: '$' },
    rating: 4.7,
    reviews: 692,
    duration: { ar: '٩ أيام', en: '9 Days' },
    nights: { ar: '٨ ليالي', en: '8 Nights' },
    maxPeople: 14,
    category: 'cultural',
    difficulty: 'moderate',
    bestSeason: { ar: 'أكتوبر إلى أبريل', en: 'October to April' },
    highlights: [
      { ar: 'ساحة جامع الفنا الشهيرة', en: 'Famous Jemaa el-Fnaa Square' },
      { ar: 'قصور ورياض تقليدية', en: 'Traditional Palaces & Riads' },
      { ar: 'رحلة الجمال في الصحراء', en: 'Desert Camel Trekking' },
      { ar: 'الأسواق التراثية الملونة', en: 'Colorful Heritage Souks' }
    ],
    image: "https://images.unsplash.com/photo-1706149796310-dc0d2ee67589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWFycmFrZWNoJTIwbHV4dXJ5fGVufDF8fHx8MTc1NjU1MTkxMXww&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 15,
    featured: false,
    trending: false,
    isNew: true
  }
]

// Premium Destination Card Component
function DestinationCard({ 
  destination, 
  language, 
  themeColor, 
  isDarkMode, 
  content,
  onBookNow
}: {
  destination: any
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
  content: any
  onBookNow: (destination: any) => void
}) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="group relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
      
      {/* Main Image Container */}
      <div className="relative h-72 overflow-hidden">
        
        {/* Image */}
        <ImageWithFallback
          src={destination.image}
          alt={destination.name[language]}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse" />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto flex flex-wrap gap-2">
          {destination.featured && (
            <div className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
              <Award className="w-3 h-3 inline mr-1" />
              {language === 'ar' ? 'مميز' : 'Featured'}
            </div>
          )}
          {destination.trending && (
            <div className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 shadow-lg">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              {language === 'ar' ? 'رائج' : 'Trending'}
            </div>
          )}
          {destination.isNew && (
            <div className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
              {language === 'ar' ? 'جديد' : 'New'}
            </div>
          )}
        </div>

        {/* Discount Badge */}
        {destination.discount && (
          <div 
            className="absolute top-4 right-4 rtl:left-4 rtl:right-auto w-14 h-14 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
              boxShadow: `0 4px 20px ${themeColor}40`
            }}
          >
            -{destination.discount}%
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`w-10 h-10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/30">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/30">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        {/* Rating */}
        <div className="absolute bottom-4 left-4 rtl:right-4 rtl:left-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-bold text-gray-900 dark:text-white">{destination.rating}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">({destination.reviews})</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        
        {/* Location & Country */}
        <div className="flex items-center mb-3">
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: themeColor }} />
          <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {destination.location[language]}, {destination.country[language]}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
          {destination.name[language]}
        </h3>

        {/* Trip Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {destination.duration[language]} / {destination.nights[language]}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'حتى' : 'Up to'} {destination.maxPeople}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <div className="space-y-2">
            {destination.highlights.slice(0, 2).map((highlight: any, index: number) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0"
                  style={{ backgroundColor: themeColor }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {highlight[language]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Price & Booking */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-2">
              <span 
                className="text-2xl font-bold"
                style={{ color: themeColor }}
              >
                {destination.price[language]} {destination.currency[language]}
              </span>
              {destination.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {destination.originalPrice[language]} {destination.currency[language]}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {language === 'ar' ? 'لكل شخص' : 'per person'}
            </p>
          </div>

          {/* Book Now Button */}
          <button
            onClick={() => onBookNow(destination)}
            className="px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg group relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
              boxShadow: `0 4px 16px ${themeColor}40`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 8px 32px ${themeColor}60`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 4px 16px ${themeColor}40`
            }}
          >
            <span className="relative z-10">
              {language === 'ar' ? 'احجز الآن' : 'Book Now'}
            </span>
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(45deg, ${themeColor}80, transparent, ${themeColor}80)`
              }}
            />
          </button>
        </div>
      </div>

      {/* Card Glow Effect */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ 
          boxShadow: `inset 0 0 40px ${themeColor}40, 0 0 60px ${themeColor}20` 
        }} 
      />
    </div>
  )
}

export default function DestinationsPage({ language, themeColor, isDarkMode }: DestinationsPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedContinent, setSelectedContinent] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState<any>(null)
  const itemsPerPage = 9

  const content = {
    ar: {
      title: 'اكتشف أجمل وجهات العالم',
      subtitle: 'رحلات استثنائية إلى أروع المدن والمعالم السياحية حول العالم مع خدمة فاخرة لا تُضاهى',
      searchPlaceholder: 'ابحث عن وجهتك المفضلة...',
      filters: 'المرشحات',
      sortBy: 'ترتيب بحسب',
      continent: 'القارة',
      category: 'الفئة',
      results: 'النتائج',
      noResults: 'لا توجد نتائج مطابقة لبحثك',
      showingResults: 'عرض',
      of: 'من',
      total: 'إجمالي',
      clearFilters: 'مسح المرشحات',
      continents: {
        all: 'جميع القارات',
        asia: 'آسيا',
        europe: 'أوروبا',
        africa: 'أفريقيا',
        america: 'أمريكا',
        oceania: 'أوقيانوسيا'
      },
      categories: {
        all: 'جميع الفئات',
        cultural: 'ثقافية',
        adventure: 'مغامرة',
        luxury: 'فاخرة',
        urban: 'حضرية',
        nature: 'طبيعية'
      },
      sortOptions: {
        featured: 'الأكثر تميزاً',
        price_low: 'السعر من الأقل',
        price_high: 'السعر من الأعلى',
        rating: 'التقييم الأعلى',
        trending: 'الأكثر طلباً',
        newest: 'الأحدث'
      }
    },
    en: {
      title: 'Discover the World\'s Most Beautiful Destinations',
      subtitle: 'Exceptional journeys to the most stunning cities and tourist attractions around the world with unparalleled luxury service',
      searchPlaceholder: 'Search for your favorite destination...',
      filters: 'Filters',
      sortBy: 'Sort By',
      continent: 'Continent',
      category: 'Category',
      results: 'Results',
      noResults: 'No results match your search',
      showingResults: 'Showing',
      of: 'of',
      total: 'total',
      clearFilters: 'Clear Filters',
      continents: {
        all: 'All Continents',
        asia: 'Asia',
        europe: 'Europe',
        africa: 'Africa',
        america: 'America',
        oceania: 'Oceania'
      },
      categories: {
        all: 'All Categories',
        cultural: 'Cultural',
        adventure: 'Adventure',
        luxury: 'Luxury',
        urban: 'Urban',
        nature: 'Nature'
      },
      sortOptions: {
        featured: 'Most Featured',
        price_low: 'Price Low to High',
        price_high: 'Price High to Low',
        rating: 'Highest Rating',
        trending: 'Most Popular',
        newest: 'Newest'
      }
    }
  }

  // Filter and sort destinations
  const filteredDestinations = destinations
    .filter(dest => {
      const matchesSearch = searchQuery === '' || 
        dest.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country[language].toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesContinent = selectedContinent === 'all' || dest.continent === selectedContinent
      const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory

      return matchesSearch && matchesContinent && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return parseInt(a.price.en) - parseInt(b.price.en)
        case 'price_high':
          return parseInt(b.price.en) - parseInt(a.price.en)
        case 'rating':
          return b.rating - a.rating
        case 'trending':
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0)
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      }
    })

  // Pagination
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedDestinations = filteredDestinations.slice(startIndex, startIndex + itemsPerPage)

  const handleBookNow = (destination: any) => {
    setSelectedDestination(destination)
    // Add booking logic here
    console.log('Booking:', destination.name[language])
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedContinent('all')
    setSelectedCategory('all')
    setSortBy('featured')
    setCurrentPage(1)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 gap-8 transform rotate-12 scale-150">
            {Array.from({ length: 64 }).map((_, index) => (
              <Plane key={index} className="w-8 h-8 text-gray-400" />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            
            {/* Premium Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 mb-8 shadow-lg">
              <Award className="w-5 h-5 mr-3 text-amber-500" />
              <span className="font-bold" style={{ color: themeColor }}>
                {language === 'ar' ? 'وجهات مميزة ومختارة بعناية' : 'Premium Curated Destinations'}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ 
                color: themeColor,
                textShadow: isDarkMode 
                  ? `0 0 30px ${themeColor}40, 0 8px 16px rgba(0,0,0,0.4)` 
                  : `0 8px 16px rgba(0,0,0,0.1)`
              }}
            >
              {content[language].title}
            </h1>
            
            <p className="text-xl max-w-4xl mx-auto leading-relaxed opacity-90"
              style={{ 
                color: isDarkMode ? 'rgba(156, 163, 175, 1)' : themeColor
              }}
            >
              {content[language].subtitle}
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8">
              
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-6 rtl:right-6 rtl:left-auto top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder={content[language].searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 px-16 rtl:pr-16 rtl:pl-6 bg-gray-50 dark:bg-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-4 transition-all"
                  style={{ 
                    focusRingColor: `${themeColor}20`,
                    borderColor: 'transparent'
                  }}
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`absolute right-4 rtl:left-4 rtl:right-auto top-1/2 -translate-y-1/2 p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                    showFilters ? 'text-white' : 'text-gray-600 dark:text-gray-400'
                  }`}
                  style={{ 
                    backgroundColor: showFilters ? themeColor : 'rgba(0,0,0,0.05)',
                    boxShadow: showFilters ? `0 4px 20px ${themeColor}40` : 'none'
                  }}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedContinent}
                  onChange={(e) => setSelectedContinent(e.target.value)}
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border-0 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                  style={{ focusRingColor: `${themeColor}50` }}
                >
                  {Object.entries(content[language].continents).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border-0 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                  style={{ focusRingColor: `${themeColor}50` }}
                >
                  {Object.entries(content[language].categories).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border-0 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all"
                  style={{ focusRingColor: `${themeColor}50` }}
                >
                  {Object.entries(content[language].sortOptions).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>

                {(searchQuery || selectedContinent !== 'all' || selectedCategory !== 'all' || sortBy !== 'featured') && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors flex items-center"
                  >
                    <X className="w-4 h-4 mr-2" />
                    {content[language].clearFilters}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          
          {/* Results Summary */}
          <div className="flex items-center justify-between mb-12">
            <div className="text-lg text-gray-600 dark:text-gray-400">
              {content[language].showingResults} {Math.min(itemsPerPage, filteredDestinations.length)} {content[language].of} {filteredDestinations.length} {content[language].results}
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {filteredDestinations.length} {content[language].total}
              </span>
            </div>
          </div>

          {/* Destinations Grid */}
          {paginatedDestinations.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-8">🏝️</div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {content[language].noResults}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                {language === 'ar' ? 'جرب تعديل معايير البحث' : 'Try adjusting your search criteria'}
              </p>
              <button
                onClick={clearFilters}
                className="px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                  boxShadow: `0 8px 32px ${themeColor}40`
                }}
              >
                {content[language].clearFilters}
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {paginatedDestinations.map((destination, index) => (
                  <div
                    key={destination.id}
                    className="animate-fadeIn"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'forwards',
                      opacity: 0
                    }}
                  >
                    <DestinationCard
                      destination={destination}
                      language={language}
                      themeColor={themeColor}
                      isDarkMode={isDarkMode}
                      content={content}
                      onBookNow={handleBookNow}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-4 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-6 py-4 rounded-xl font-bold transition-all hover:scale-105 ${
                        currentPage === page
                          ? 'text-white shadow-lg'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:shadow-lg'
                      }`}
                      style={{
                        backgroundColor: currentPage === page ? themeColor : undefined,
                        boxShadow: currentPage === page ? `0 8px 32px ${themeColor}40` : undefined
                      }}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-4 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}