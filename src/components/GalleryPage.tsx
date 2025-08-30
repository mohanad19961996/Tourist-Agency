import { useState, useEffect, useRef } from 'react'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  ZoomIn, 
  ZoomOut,
  X,
  Download,
  Share2,
  Filter,
  Search,
  Grid3X3,
  List,
  Heart,
  Star,
  MapPin,
  Calendar,
  Eye,
  Camera,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Maximize2,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Loader2
} from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useScrollAnimation, getAnimationClass, useStaggeredAnimation } from './useScrollAnimation'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface GalleryPageProps {
  language: 'ar' | 'en'
  themeColor: string
  isDarkMode: boolean
}

// Hero Carousel Images with Ken Burns Effect
const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1719294008010-44116946e5b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmF2ZWwlMjBkZXN0aW5hdGlvbnxlbnwxfHx8fDE3NTY1NTUxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "وجهات فاخرة حصرية", en: "Exclusive Luxury Destinations" },
    subtitle: { ar: "استكشف أجمل الأماكن في العالم", en: "Discover the world's most beautiful places" },
    kenBurns: "scale-110 translate-x-2"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1621561615799-96cc12892c10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleG90aWMlMjBiZWFjaCUyMHBhcmFkaXNlfGVufDF8fHx8MTc1NjU1NTE2MHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "جنة الشواطئ الاستوائية", en: "Tropical Beach Paradise" },
    subtitle: { ar: "مياه فيروزية ورمال ناعمة", en: "Turquoise waters and pristine sands" },
    kenBurns: "scale-125 -translate-x-3"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1631684181713-e697596d2165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NTY0OTY3MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "مغامرات جبلية ملحمية", en: "Epic Mountain Adventures" },
    subtitle: { ar: "قمم شاهقة ومناظر خلابة", en: "Towering peaks and breathtaking views" },
    kenBurns: "scale-115 translate-y-2"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1568650293649-d3c549868ce9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGFyY2hpdGVjdHVyZSUyMHRyYXZlbHxlbnwxfHx8fDE3NTY1NTUxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "تراث معماري عريق", en: "Ancient Architectural Heritage" },
    subtitle: { ar: "حضارات قديمة وعمارة مذهلة", en: "Ancient civilizations and stunning architecture" },
    kenBurns: "scale-120 translate-x-1 -translate-y-1"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1742516014153-6cae2ae4a6a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMHRyYXZlbHxlbnwxfHx8fDE3NTY0NjA1NDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "مدن عصرية نابضة", en: "Vibrant Modern Cities" },
    subtitle: { ar: "ناطحات سحاب وحياة ليلية", en: "Skyscrapers and vibrant nightlife" },
    kenBurns: "scale-105 -translate-x-2 translate-y-3"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1644659513503-abcbf75b4521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0cyUyMGF1cm9yYXxlbnwxfHx8fDE3NTY0NzA0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "الشفق القطبي الساحر", en: "Mesmerizing Northern Lights" },
    subtitle: { ar: "ألوان طبيعية خلابة في السماء", en: "Nature's spectacular light show" },
    kenBurns: "scale-130 translate-x-4"
  }
]

// Gallery Images organized by categories
const galleryImages = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1722409195473-d322e99621e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjBwb29sfGVufDF8fHx8MTc1NjQ1ODk1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "منتجع فاخر", en: "Luxury Resort" },
    category: "luxury",
    location: { ar: "جزر المالديف", en: "Maldives" },
    date: "2024-01-15",
    likes: 324,
    views: 1250,
    aspect: "landscape"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1667550536285-c32a815d5f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjB3aWxkbGlmZSUyMHRyYXZlbHxlbnwxfHx8fDE3NTY1NTUxNzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "سفاري إفريقيا", en: "African Safari" },
    category: "wildlife",
    location: { ar: "كينيا", en: "Kenya" },
    date: "2024-02-20",
    likes: 567,
    views: 2100,
    aspect: "landscape"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1534759445199-f2ad3d6fd55b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMHRyYXZlbCUyMHRlbXBsZXxlbnwxfHx8fDE3NTY1NTUxODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "معبد تاريخي", en: "Historic Temple" },
    category: "culture",
    location: { ar: "كمبوديا", en: "Cambodia" },
    date: "2024-03-10",
    likes: 892,
    views: 3400,
    aspect: "portrait"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1598330363729-837777cc68af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmVzJTIwdHJhdmVsfGVufDF8fHx8MTc1NjQ3MDQ3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "أمواج المحيط", en: "Ocean Waves" },
    category: "nature",
    location: { ar: "هاواي", en: "Hawaii" },
    date: "2024-04-05",
    likes: 445,
    views: 1680,
    aspect: "landscape"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1721579182807-94b05f30b12a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBkdW5lcyUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTY1Mzg0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "كثبان الصحراء", en: "Desert Dunes" },
    category: "adventure",
    location: { ar: "المغرب", en: "Morocco" },
    date: "2024-05-12",
    likes: 723,
    views: 2890,
    aspect: "landscape"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1575110445943-15b543686b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjcnVpc2UlMjBzaGlwfGVufDF8fHx8MTc1NjQ1NTk1NXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "رحلة بحرية", en: "Luxury Cruise" },
    category: "luxury",
    location: { ar: "البحر الكاريبي", en: "Caribbean" },
    date: "2024-06-18",
    likes: 612,
    views: 2340,
    aspect: "landscape"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1648847672459-58111edbbfe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHBpbmUlMjBtb3VudGFpbnMlMjBzbm93fGVufDF8fHx8MTc1NjU1NTE5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "جبال الألب", en: "Alpine Mountains" },
    category: "adventure",
    location: { ar: "سويسرا", en: "Switzerland" },
    date: "2024-07-22",
    likes: 983,
    views: 4120,
    aspect: "landscape"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1738003106298-20495321685e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGp1bmdsZSUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NTY1NTUxOTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "أدغال استوائية", en: "Tropical Jungle" },
    category: "nature",
    location: { ar: "كوستاريكا", en: "Costa Rica" },
    date: "2024-08-30",
    likes: 567,
    views: 2180,
    aspect: "portrait"
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1543175547-faf7863981a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW55b24lMjBzdW5zZXQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU2NTU1MTk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "وادي الغروب", en: "Canyon Sunset" },
    category: "nature",
    location: { ar: "أريزونا", en: "Arizona" },
    date: "2024-09-14",
    likes: 834,
    views: 3560,
    aspect: "landscape"
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1608479083307-5b06272e5d7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbmQlMjBwYXJhZGlzZSUyMGFlcmlhbHxlbnwxfHx8fDE3NTY1NTUyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "جزيرة جنة", en: "Paradise Island" },
    category: "luxury",
    location: { ar: "بورا بورا", en: "Bora Bora" },
    date: "2024-10-08",
    likes: 1245,
    views: 5670,
    aspect: "landscape"
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1746338790421-eb8d0269228a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGwlMjBuYXR1cmUlMjB0cmF2ZWx8ZW58MXx8fHwxNzU2NTU1MjA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "شلال طبيعي", en: "Natural Waterfall" },
    category: "nature",
    location: { ar: "آيسلندا", en: "Iceland" },
    date: "2024-11-12",
    likes: 678,
    views: 2890,
    aspect: "portrait"
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1709630998478-7c310df16bc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGludGVyaW9yfGVufDF8fHx8MTc1NjUyOTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "فندق فاخر", en: "Luxury Hotel" },
    category: "luxury",
    location: { ar: "دبي", en: "Dubai" },
    date: "2024-12-01",
    likes: 892,
    views: 3240,
    aspect: "landscape"
  },
  {
    id: 13,
    image: "https://images.unsplash.com/photo-1711867459887-476ce666d20f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwdHJhaW4lMjB0cmF2ZWx8ZW58MXx8fHwxNzU2NTU1MjEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "رحلة قطار كلاسيكية", en: "Vintage Train Journey" },
    category: "culture",
    location: { ar: "أوروبا", en: "Europe" },
    date: "2024-12-15",
    likes: 534,
    views: 1980,
    aspect: "landscape"
  },
  {
    id: 14,
    image: "https://images.unsplash.com/photo-1625006864610-9ed894325241?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxpY29wdGVyJTIwdG91ciUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTY1NTUyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "جولة هليكوبتر", en: "Helicopter Tour" },
    category: "adventure",
    location: { ar: "نيوزيلندا", en: "New Zealand" },
    date: "2024-12-20",
    likes: 756,
    views: 3120,
    aspect: "landscape"
  },
  {
    id: 15,
    image: "https://images.unsplash.com/photo-1705094655478-1e41c6736104?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMHNhaWxpbmclMjBvY2VhbnxlbnwxfHx8fDE3NTY1NTUyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "يخت فاخر", en: "Luxury Yacht" },
    category: "luxury",
    location: { ar: "البحر المتوسط", en: "Mediterranean" },
    date: "2024-12-25",
    likes: 923,
    views: 4350,
    aspect: "landscape"
  },
  {
    id: 16,
    image: "https://images.unsplash.com/photo-1708892930078-b88e2a77ce2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3QlMjBhaXIlMjBiYWxsb29uJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1NjU1NTIyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: { ar: "منطاد هوائي", en: "Hot Air Balloon" },
    category: "adventure",
    location: { ar: "تركيا", en: "Turkey" },
    date: "2024-12-30",
    likes: 1167,
    views: 4890,
    aspect: "landscape"
  }
]

const categories = [
  { value: 'all', label: { ar: 'الكل', en: 'All' }, count: galleryImages.length },
  { value: 'luxury', label: { ar: 'فاخر', en: 'Luxury' }, count: galleryImages.filter(img => img.category === 'luxury').length },
  { value: 'adventure', label: { ar: 'مغامرة', en: 'Adventure' }, count: galleryImages.filter(img => img.category === 'adventure').length },
  { value: 'nature', label: { ar: 'طبيعة', en: 'Nature' }, count: galleryImages.filter(img => img.category === 'nature').length },
  { value: 'culture', label: { ar: 'ثقافة', en: 'Culture' }, count: galleryImages.filter(img => img.category === 'culture').length },
  { value: 'wildlife', label: { ar: 'حياة برية', en: 'Wildlife' }, count: galleryImages.filter(img => img.category === 'wildlife').length }
]

const sortOptions = [
  { value: 'date-desc', label: { ar: 'الأحدث أولاً', en: 'Newest First' } },
  { value: 'date-asc', label: { ar: 'الأقدم أولاً', en: 'Oldest First' } },
  { value: 'likes-desc', label: { ar: 'الأكثر إعجاباً', en: 'Most Liked' } },
  { value: 'views-desc', label: { ar: 'الأكثر مشاهدة', en: 'Most Viewed' } },
  { value: 'name-asc', label: { ar: 'أبجدياً', en: 'Alphabetical' } }
]

export default function GalleryPage({ language, themeColor, isDarkMode }: GalleryPageProps) {
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  
  // Gallery State
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('date-desc')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry')
  const [isGridLoading, setIsGridLoading] = useState(false)
  
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<any>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxZoom, setLightboxZoom] = useState(1)
  const [lightboxPan, setLightboxPan] = useState({ x: 0, y: 0 })
  
  // 3D Coverflow State
  const [coverflowIndex, setCoverflowIndex] = useState(2)
  const [coverflowItems, setCoverflowItems] = useState(galleryImages.slice(0, 5))
  
  // Circular Gallery State
  const [circularRotation, setCircularRotation] = useState(0)
  const [isCircularPlaying, setIsCircularPlaying] = useState(true)
  
  // Animation Refs
  const heroRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()
  const progressRef = useRef<number>(0)
  
  // Scroll Animations
  const { elementRef: heroAnimRef, isVisible: isHeroVisible } = useScrollAnimation({ threshold: 0.3 })
  const { elementRef: galleryAnimRef, isVisible: isGalleryVisible } = useScrollAnimation({ threshold: 0.1 })
  const { elementRef: coverflowAnimRef, isVisible: isCoverflowVisible } = useScrollAnimation({ threshold: 0.2 })
  const { elementRef: circularAnimRef, isVisible: isCircularVisible } = useScrollAnimation({ threshold: 0.2 })
  
  const text = {
    ar: {
      title: "معرض الصور المذهل",
      subtitle: "اكتشف جمال العالم من خلال مجموعتنا الفاخرة من الصور",
      heroPlay: "تشغيل",
      heroPause: "إيقاف",
      heroSkip: "تخطي",
      search: "البحث في الصور...",
      filter: "تصنيف",
      sort: "ترتيب",
      viewGrid: "شبكة",
      viewMasonry: "فسيفساء",
      location: "الموقع",
      date: "التاريخ",
      likes: "إعجاب",
      views: "مشاهدة",
      download: "تحميل",
      share: "مشاركة",
      close: "إغلاق",
      zoomIn: "تكبير",
      zoomOut: "تصغير",
      reset: "إعادة تعيين",
      fullscreen: "ملء الشاشة",
      previous: "السابق",
      next: "التالي",
      loading: "جاري التحميل...",
      coverflowTitle: "معرض ثلاثي الأبعاد",
      circularTitle: "معرض دائري تفاعلي",
      masonryTitle: "شبكة الصور التفاعلية",
      timelineTitle: "الخط الزمني للرحلات"
    },
    en: {
      title: "Stunning Visual Gallery",
      subtitle: "Discover the world's beauty through our premium collection of travel photography",
      heroPlay: "Play",
      heroPause: "Pause",
      heroSkip: "Skip",
      search: "Search images...",
      filter: "Filter",
      sort: "Sort",
      viewGrid: "Grid",
      viewMasonry: "Masonry",
      location: "Location",
      date: "Date",
      likes: "Likes",
      views: "Views",
      download: "Download",
      share: "Share",
      close: "Close",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      reset: "Reset",
      fullscreen: "Fullscreen",
      previous: "Previous",
      next: "Next",
      loading: "Loading...",
      coverflowTitle: "3D Coverflow Gallery",
      circularTitle: "Interactive Circular Gallery",
      masonryTitle: "Interactive Image Grid",
      timelineTitle: "Travel Timeline"
    }
  }

  // Hero Carousel Auto-play Effect
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        progressRef.current += 2
        setProgress(progressRef.current)
        
        if (progressRef.current >= 100) {
          setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
          progressRef.current = 0
          setProgress(0)
        }
      }, 160)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying])

  // Circular Gallery Auto-rotation
  useEffect(() => {
    if (isCircularPlaying && isCircularVisible) {
      const circularInterval = setInterval(() => {
        setCircularRotation(prev => prev + 0.5)
      }, 50)
      
      return () => clearInterval(circularInterval)
    }
  }, [isCircularPlaying, isCircularVisible])

  // Filter and Sort Images
  const filteredImages = galleryImages
    .filter(img => {
      const categoryMatch = selectedCategory === 'all' || img.category === selectedCategory
      const searchMatch = searchQuery === '' || 
        img.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.location[language].toLowerCase().includes(searchQuery.toLowerCase())
      return categoryMatch && searchMatch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'likes-desc':
          return b.likes - a.likes
        case 'views-desc':
          return b.views - a.views
        case 'name-asc':
          return a.title[language].localeCompare(b.title[language])
        default:
          return 0
      }
    })

  // Lightbox Navigation
  const openLightbox = (image: any, index: number) => {
    setLightboxImage(image)
    setLightboxIndex(index)
    setLightboxOpen(true)
    setLightboxZoom(1)
    setLightboxPan({ x: 0, y: 0 })
  }

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
      : (lightboxIndex + 1) % filteredImages.length
    
    setLightboxIndex(newIndex)
    setLightboxImage(filteredImages[newIndex])
    setLightboxZoom(1)
    setLightboxPan({ x: 0, y: 0 })
  }

  // Coverflow Navigation
  const navigateCoverflow = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setCoverflowIndex(prev => (prev + 1) % galleryImages.length)
    } else {
      setCoverflowIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length)
    }
  }

  // Hero Slide Navigation
  const navigateHero = (direction: 'prev' | 'next') => {
    progressRef.current = 0
    setProgress(0)
    
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    } else {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
      {/* SECTION 1: HERO MASTERPIECE SLIDER */}
      <section 
        ref={heroAnimRef}
        className={`relative h-screen overflow-hidden ${getAnimationClass('fadeUp', isHeroVisible)}`}
      >
        {/* Background Images with Ken Burns Effect */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div 
                className={`w-full h-full bg-cover bg-center transition-transform duration-8000 ease-linear ${
                  index === currentSlide ? slide.kenBurns : 'scale-100'
                }`}
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              />
              
              {/* Parallax Overlay Gradient */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(0,0,0,0.6) 0%, 
                    rgba(0,0,0,0.3) 30%, 
                    ${themeColor}20 50%, 
                    rgba(0,0,0,0.3) 70%, 
                    rgba(0,0,0,0.7) 100%)`
                }}
              />
            </div>
          ))}
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center px-6 max-w-4xl mx-auto">
            {/* Animated Title */}
            <h1 
              className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-white gallery-gradient-text
                px-2 py-6 min-h-[1.2em]
                transform transition-all duration-1000 delay-300 ${
                  isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
              style={{
                textShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 40px ${themeColor}40`,
                backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${themeColor} 50%, #ffffff 100%)`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {text[language].title}
            </h1>

            {/* Animated Subtitle */}
            <p 
              className={`text-lg md:text-xl lg:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed
                transform transition-all duration-1000 delay-500 ${
                  isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.8)'
              }}
            >
              {text[language].subtitle}
            </p>

            {/* Slide Information */}
            <div 
              className={`backdrop-blur-lg rounded-3xl border border-white/20 p-6 mb-8 max-w-md mx-auto
                transform transition-all duration-1000 delay-700 ${
                  isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              style={{
                background: `linear-gradient(135deg, 
                  rgba(255,255,255,0.1) 0%, 
                  ${themeColor}15 50%, 
                  rgba(255,255,255,0.05) 100%)`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.3), 
                           0 0 0 1px rgba(255,255,255,0.1),
                           inset 0 1px 0 rgba(255,255,255,0.2)`
              }}
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {heroSlides[currentSlide].title[language]}
              </h3>
              <p className="text-gray-300 text-sm">
                {heroSlides[currentSlide].subtitle[language]}
              </p>
            </div>
          </div>
        </div>

        {/* Hero Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex items-center gap-4 backdrop-blur-lg rounded-2xl border border-white/20 p-4"
            style={{
              background: `linear-gradient(135deg, 
                rgba(255,255,255,0.1) 0%, 
                ${themeColor}15 50%, 
                rgba(255,255,255,0.05) 100%)`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.3)`
            }}
          >
            {/* Play/Pause Button */}
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              variant="ghost"
              size="sm"
              className="text-white hover:text-white hover:bg-white/10 rounded-xl"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>

            {/* Previous Button */}
            <Button
              onClick={() => navigateHero('prev')}
              variant="ghost"
              size="sm"
              className="text-white hover:text-white hover:bg-white/10 rounded-xl"
            >
              <SkipBack className="w-5 h-5" />
            </Button>

            {/* Progress Bar */}
            <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-200"
                style={{ 
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${themeColor}, ${themeColor}80)`
                }}
              />
            </div>

            {/* Next Button */}
            <Button
              onClick={() => navigateHero('next')}
              variant="ghost"
              size="sm"
              className="text-white hover:text-white hover:bg-white/10 rounded-xl"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 right-8 z-30">
          <div className="flex flex-col gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index)
                  progressRef.current = 0
                  setProgress(0)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'scale-125' : 'scale-100 hover:scale-110'
                }`}
                style={{
                  backgroundColor: index === currentSlide ? themeColor : 'rgba(255,255,255,0.4)',
                  boxShadow: index === currentSlide ? `0 0 20px ${themeColor}80` : 'none'
                }}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="absolute bottom-8 left-8 z-30">
          <div className="flex gap-2 backdrop-blur-lg rounded-2xl border border-white/20 p-2"
            style={{
              background: `linear-gradient(135deg, 
                rgba(255,255,255,0.1) 0%, 
                ${themeColor}15 50%, 
                rgba(255,255,255,0.05) 100%)`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.3)`
            }}
          >
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => {
                  setCurrentSlide(index)
                  progressRef.current = 0
                  setProgress(0)
                }}
                className={`w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                  index === currentSlide 
                    ? 'scale-110 border-white' 
                    : 'scale-100 border-white/30 hover:border-white/60'
                }`}
                style={{
                  boxShadow: index === currentSlide ? `0 0 20px ${themeColor}60` : 'none'
                }}
              >
                <ImageWithFallback 
                  src={slide.image}
                  alt={slide.title[language]}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: GALLERY CONTROLS */}
      <section 
        ref={galleryAnimRef}
        className={`py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 ${getAnimationClass('fadeUp', isGalleryVisible)}`}
        style={{
          background: isDarkMode 
            ? `linear-gradient(135deg, rgba(0,0,0,0.95) 0%, ${themeColor}05 50%, rgba(0,0,0,0.95) 100%)`
            : `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, ${themeColor}05 50%, rgba(255,255,255,0.95) 100%)`
        }}
      >
        <div className="container mx-auto px-6">
          {/* Gallery Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, 
                  ${isDarkMode ? '#ffffff' : '#1f2937'} 0%, 
                  ${themeColor} 50%, 
                  ${isDarkMode ? '#e5e7eb' : '#4b5563'} 100%)`
              }}
            >
              {text[language].masonryTitle}
            </h2>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-6 rounded-3xl backdrop-blur-lg border"
            style={{
              background: `linear-gradient(135deg, 
                ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)'} 0%, 
                ${themeColor}10 50%, 
                ${isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.5)'} 100%)`,
              borderColor: `${themeColor}30`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px ${themeColor}20`
            }}
          >
            {/* Search */}
            <div className="flex-1 min-w-64 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder={text[language].search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 
                    rounded-xl backdrop-blur-sm focus:ring-2 focus:border-transparent transition-all duration-300`}
                  style={{
                    focusRingColor: `${themeColor}40`
                  }}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  className={`rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.value
                      ? 'text-white shadow-lg'
                      : 'hover:bg-white/10 dark:hover:bg-gray-800/50'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category.value ? themeColor : 'transparent',
                    borderColor: selectedCategory === category.value ? themeColor : `${themeColor}40`,
                    boxShadow: selectedCategory === category.value ? `0 0 20px ${themeColor}40` : 'none'
                  }}
                >
                  {category.label[language]}
                  <Badge 
                    className="ml-2"
                    style={{ 
                      backgroundColor: selectedCategory === category.value ? 'rgba(255,255,255,0.2)' : `${themeColor}20`,
                      color: selectedCategory === category.value ? 'white' : themeColor
                    }}
                  >
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 rounded-xl backdrop-blur-sm"
                  style={{
                    borderColor: `${themeColor}40`,
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl backdrop-blur-lg border"
                  style={{
                    background: `linear-gradient(135deg, 
                      ${isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)'} 0%, 
                      ${themeColor}10 50%, 
                      ${isDarkMode ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)'} 100%)`,
                    borderColor: `${themeColor}40`
                  }}
                >
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label[language]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex rounded-xl overflow-hidden border"
                style={{ borderColor: `${themeColor}40` }}
              >
                <Button
                  onClick={() => setViewMode('masonry')}
                  variant={viewMode === 'masonry' ? "default" : "ghost"}
                  size="sm"
                  className="rounded-none"
                  style={{
                    backgroundColor: viewMode === 'masonry' ? themeColor : 'transparent',
                    color: viewMode === 'masonry' ? 'white' : themeColor
                  }}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? "default" : "ghost"}
                  size="sm"
                  className="rounded-none"
                  style={{
                    backgroundColor: viewMode === 'grid' ? themeColor : 'transparent',
                    color: viewMode === 'grid' ? 'white' : themeColor
                  }}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Masonry Gallery Grid */}
          <div className={`${
            viewMode === 'masonry' 
              ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6' 
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          }`}>
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className={`${viewMode === 'masonry' ? 'break-inside-avoid mb-6' : 'aspect-square'} 
                  group cursor-pointer transform transition-all duration-500 hover:scale-105`}
                onClick={() => openLightbox(image, index)}
              >
                <Card className="overflow-hidden backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, 
                      ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)'} 0%, 
                      ${themeColor}10 50%, 
                      ${isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.6)'} 100%)`,
                    borderColor: `${themeColor}20`,
                    boxShadow: `0 10px 40px rgba(0,0,0,0.1), 0 0 0 1px ${themeColor}10`
                  }}
                >
                  <CardContent className="p-0 relative">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={image.image}
                        alt={image.title[language]}
                        className={`w-full ${
                          viewMode === 'masonry' ? 'h-auto' : 'h-full object-cover'
                        } transition-transform duration-700 group-hover:scale-110`}
                      />
                      
                      {/* Hover Overlay */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                        style={{
                          background: `linear-gradient(135deg, 
                            rgba(0,0,0,0.6) 0%, 
                            ${themeColor}40 50%, 
                            rgba(0,0,0,0.8) 100%)`
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <ZoomIn className="w-12 h-12 mx-auto mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                            <p className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                              {text[language].zoomIn}
                            </p>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Add to favorites logic
                            }}
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Share logic
                            }}
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Stats */}
                        <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-400">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                {image.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {image.views}
                              </span>
                            </div>
                            <Badge 
                              className="text-xs"
                              style={{ 
                                backgroundColor: `${themeColor}80`,
                                color: 'white'
                              }}
                            >
                              {categories.find(cat => cat.value === image.category)?.label[language]}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Image Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 truncate">
                        {image.title[language]}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          {image.location[language]}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(image.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Loading State */}
          {isGridLoading && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: themeColor }} />
                <p className="text-gray-600 dark:text-gray-400">{text[language].loading}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: 3D COVERFLOW GALLERY */}
      <section 
        ref={coverflowAnimRef}
        className={`py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden ${getAnimationClass('scale', isCoverflowVisible)}`}
      >
        {/* Background Effects */}
        <div className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, ${themeColor}10 0%, transparent 70%)`
          }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6"
              style={{
                textShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 40px ${themeColor}40`
              }}
            >
              {text[language].coverflowTitle}
            </h2>
          </div>

          {/* 3D Coverflow Container */}
          <div className="relative h-96 perspective-1000">
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(5)].map((_, index) => {
                const imageIndex = (coverflowIndex - 2 + index + galleryImages.length) % galleryImages.length
                const image = galleryImages[imageIndex]
                const isCenter = index === 2
                const distance = Math.abs(index - 2)
                
                return (
                  <div
                    key={`coverflow-${imageIndex}`}
                    className={`absolute w-64 h-80 transition-all duration-700 cursor-pointer transform-style-preserve-3d ${
                      isCenter ? 'z-30' : `z-${20 - distance * 5}`
                    }`}
                    style={{
                      transform: `
                        translateX(${(index - 2) * 120}px) 
                        translateZ(${isCenter ? 0 : -distance * 100}px)
                        rotateY(${(index - 2) * -25}deg)
                        scale(${isCenter ? 1 : 1 - distance * 0.2})
                      `,
                      filter: `brightness(${isCenter ? 1 : 0.6 - distance * 0.2}) blur(${distance * 2}px)`
                    }}
                    onClick={() => setCoverflowIndex(imageIndex)}
                  >
                    <Card className="w-full h-full overflow-hidden border-4 border-white/20 shadow-2xl backdrop-blur-lg"
                      style={{
                        background: `linear-gradient(135deg, 
                          rgba(255,255,255,0.1) 0%, 
                          ${themeColor}15 50%, 
                          rgba(255,255,255,0.05) 100%)`,
                        boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)`
                      }}
                    >
                      <CardContent className="p-0 h-full relative">
                        <ImageWithFallback
                          src={image.image}
                          alt={image.title[language]}
                          className="w-full h-3/4 object-cover"
                        />
                        
                        {/* Reflection Effect */}
                        <div 
                          className="absolute bottom-0 left-0 right-0 h-1/4 opacity-30"
                          style={{
                            background: `linear-gradient(to bottom, 
                              transparent 0%, 
                              rgba(0,0,0,0.8) 100%)`,
                            maskImage: `url(${image.image})`,
                            maskSize: 'cover',
                            transform: 'scaleY(-1) translateY(-100%)'
                          }}
                        />

                        {/* Image Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="font-semibold text-sm mb-1 truncate">
                            {image.title[language]}
                          </h3>
                          <p className="text-xs text-gray-300 truncate">
                            {image.location[language]}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Coverflow Controls */}
          <div className="flex items-center justify-center mt-12 gap-6">
            <Button
              onClick={() => navigateCoverflow('prev')}
              variant="ghost"
              size="lg"
              className="text-white hover:text-white hover:bg-white/10 rounded-full w-14 h-14 p-0"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <div className="flex gap-2">
              {galleryImages.slice(0, 10).map((_, index) => (
                <button
                  key={`coverflow-indicator-${index}`}
                  onClick={() => setCoverflowIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === coverflowIndex % 10 ? 'scale-150' : 'scale-100 hover:scale-125'
                  }`}
                  style={{
                    backgroundColor: index === coverflowIndex % 10 ? themeColor : 'rgba(255,255,255,0.4)',
                    boxShadow: index === coverflowIndex % 10 ? `0 0 15px ${themeColor}80` : 'none'
                  }}
                />
              ))}
            </div>

            <Button
              onClick={() => navigateCoverflow('next')}
              variant="ghost"
              size="lg"
              className="text-white hover:text-white hover:bg-white/10 rounded-full w-14 h-14 p-0"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 4: CIRCULAR ROTATION GALLERY */}
      <section 
        ref={circularAnimRef}
        className={`py-20 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden ${getAnimationClass('rotate', isCircularVisible)}`}
        style={{
          background: isDarkMode 
            ? `linear-gradient(135deg, rgba(0,0,0,0.95) 0%, ${themeColor}08 50%, rgba(0,0,0,0.90) 100%)`
            : `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, ${themeColor}08 50%, rgba(255,255,255,0.90) 100%)`
        }}
      >
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, 
                  ${isDarkMode ? '#ffffff' : '#1f2937'} 0%, 
                  ${themeColor} 50%, 
                  ${isDarkMode ? '#e5e7eb' : '#4b5563'} 100%)`
              }}
            >
              {text[language].circularTitle}
            </h2>
          </div>

          {/* Circular Gallery Container */}
          <div className="relative h-96 flex items-center justify-center perspective-1000">
            {galleryImages.slice(0, 8).map((image, index) => {
              const angle = (index * 45 + circularRotation) * (Math.PI / 180)
              const radius = 200
              const x = Math.cos(angle) * radius
              const z = Math.sin(angle) * radius
              const scale = (z + radius) / (2 * radius) * 0.5 + 0.5
              const opacity = (z + radius) / (2 * radius) * 0.7 + 0.3
              
              return (
                <div
                  key={`circular-${image.id}`}
                  className="absolute w-32 h-40 cursor-pointer transition-all duration-100"
                  style={{
                    transform: `translateX(${x}px) translateZ(${z}px) scale(${scale}) rotateY(${-angle * (180 / Math.PI)}deg)`,
                    opacity,
                    zIndex: Math.round(z + radius)
                  }}
                  onClick={() => openLightbox(image, index)}
                >
                  <Card className="w-full h-full overflow-hidden border-2 border-white/30 shadow-xl backdrop-blur-lg hover:border-white/60 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, 
                        ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)'} 0%, 
                        ${themeColor}15 50%, 
                        ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)'} 100%)`,
                      boxShadow: `0 10px 30px rgba(0,0,0,0.2)`
                    }}
                  >
                    <CardContent className="p-0 h-full">
                      <ImageWithFallback
                        src={image.image}
                        alt={image.title[language]}
                        className="w-full h-3/4 object-cover"
                      />
                      <div className="p-2 h-1/4 flex flex-col justify-center">
                        <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {image.title[language]}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {image.location[language]}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>

          {/* Circular Gallery Controls */}
          <div className="flex items-center justify-center mt-12 gap-6">
            <Button
              onClick={() => setIsCircularPlaying(!isCircularPlaying)}
              variant="outline"
              size="lg"
              className="rounded-full"
              style={{
                borderColor: themeColor,
                color: themeColor,
                backgroundColor: 'transparent'
              }}
            >
              {isCircularPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>

            <Button
              onClick={() => setCircularRotation(prev => prev - 45)}
              variant="outline"
              size="lg"
              className="rounded-full"
              style={{
                borderColor: themeColor,
                color: themeColor,
                backgroundColor: 'transparent'
              }}
            >
              <RotateCcw className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && lightboxImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center">
          {/* Close Button */}
          <Button
            onClick={() => setLightboxOpen(false)}
            variant="ghost"
            size="lg"
            className="absolute top-6 right-6 z-60 text-white hover:text-white hover:bg-white/10 rounded-full w-12 h-12 p-0"
          >
            <X className="w-8 h-8" />
          </Button>

          {/* Image Container */}
          <div className="relative max-w-7xl max-h-screen mx-auto p-6">
            <div 
              className="relative overflow-hidden rounded-2xl cursor-move"
              style={{
                transform: `scale(${lightboxZoom}) translate(${lightboxPan.x}px, ${lightboxPan.y}px)`
              }}
            >
              <ImageWithFallback
                src={lightboxImage.image}
                alt={lightboxImage.title[language]}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
          </div>

          {/* Navigation */}
          <Button
            onClick={() => navigateLightbox('prev')}
            variant="ghost"
            size="lg"
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-white hover:bg-white/10 rounded-full w-14 h-14 p-0"
          >
            <ArrowLeft className="w-8 h-8" />
          </Button>

          <Button
            onClick={() => navigateLightbox('next')}
            variant="ghost"
            size="lg"
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-white hover:bg-white/10 rounded-full w-14 h-14 p-0"
          >
            <ArrowRight className="w-8 h-8" />
          </Button>

          {/* Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-4 backdrop-blur-lg rounded-2xl border border-white/20 p-4"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(255,255,255,0.1) 0%, 
                  ${themeColor}15 50%, 
                  rgba(255,255,255,0.05) 100%)`
              }}
            >
              <Button
                onClick={() => setLightboxZoom(prev => Math.min(prev + 0.5, 3))}
                variant="ghost"
                size="sm"
                className="text-white hover:text-white hover:bg-white/10 rounded-xl"
              >
                <ZoomIn className="w-5 h-5" />
              </Button>

              <Button
                onClick={() => setLightboxZoom(prev => Math.max(prev - 0.5, 0.5))}
                variant="ghost"
                size="sm"
                className="text-white hover:text-white hover:bg-white/10 rounded-xl"
              >
                <ZoomOut className="w-5 h-5" />
              </Button>

              <Button
                onClick={() => {
                  setLightboxZoom(1)
                  setLightboxPan({ x: 0, y: 0 })
                }}
                variant="ghost"
                size="sm"
                className="text-white hover:text-white hover:bg-white/10 rounded-xl"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-white hover:bg-white/10 rounded-xl"
              >
                <Download className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-white hover:bg-white/10 rounded-xl"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Image Info */}
          <div className="absolute top-6 left-6 backdrop-blur-lg rounded-2xl border border-white/20 p-4 max-w-md"
            style={{
              background: `linear-gradient(135deg, 
                rgba(255,255,255,0.1) 0%, 
                ${themeColor}15 50%, 
                rgba(255,255,255,0.05) 100%)`
            }}
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {lightboxImage.title[language]}
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              {lightboxImage.location[language]}
            </p>
            <div className="flex items-center gap-4 text-gray-400 text-xs">
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {lightboxImage.likes}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {lightboxImage.views}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(lightboxImage.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
              </span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="absolute top-6 right-20 text-white text-sm">
            {lightboxIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  )
}