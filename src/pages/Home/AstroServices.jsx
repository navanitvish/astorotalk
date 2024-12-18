import { useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  FaScroll,
  FaRing,
  FaGem,
  FaCompass,
  FaPrayingHands,
  FaGift,
  FaBlog,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import translations from '../../components/translations/translations';

const AstroServices = () => {
  const scrollRef = useRef(null);
  
  // Get the current language from the Redux store
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  const services = [
    {
      id: 1,
      name: t.todayPanchang, // Translation key
      icon: FaScroll,
      link: "/Panchang",
      isNew: false,
    },
    {
      id: 2,
      name: t.kundaliMatching, // Translation key
      icon: FaRing,
      link: "/KundaliMatching",
      isNew: false,
    },
    {
      id: 3,
      name: t.gemstones, // Translation key
      icon: FaGem,
      link: "/GemstoneShowcase",
      isNew: true,
    },
    {
      id: 4,
      name: t.dailyHoroscope, // Translation key
      icon: FaCompass,
      link: "/DailyHoroscope",
      isNew: false,
    },
    {
      id: 5,
      name: t.onlinePuja, // Translation key
      icon: FaPrayingHands,
      link: "/ComingSoonPage",
      isNew: true,
    },
    {
      id: 6,
      name: t.freeServices, // Translation key
      icon: FaGift,
      link: "/AstrologyServices",
      isNew: false,
    },
    {
      id: 7,
      name: t.blog, // Translation key
      icon: FaBlog,
      link: "/AstrologyBlog",
      isNew: false,
    },
  ];


  const handleMouseEnter = (e) => {
    const container = scrollRef.current;
    const scrollAmount =
      e.clientX < container.getBoundingClientRect().width / 2 ? -100 : 100;
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full bg-pink-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div
          ref={scrollRef}
          onMouseMove={handleMouseEnter}
          className="
            grid 
            grid-flow-col
            auto-cols-[calc(50%-0.5rem)]
            sm:auto-cols-[calc(33%-0.5rem)]
            md:auto-cols-[calc(25%-0.5rem)]
            lg:auto-cols-[calc(14.28%-0.5rem)]
            gap-2
            overflow-x-auto
            scrollbar-hide
            snap-x
            snap-mandatory
            scroll-smooth
            no-scrollbar
          "
        >
          {services.map((service) => (
            <div key={service.id} className="snap-center w-full">
              <Link
                to={service.link}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border-2 border-pink-100 group-hover:border-red-400 transition-colors duration-300">
                    <service.icon className="w-8 h-8 text-red-500 group-hover:text-red-600 transition-colors duration-300" />
                  </div>

                  {service.isNew && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {t.new} {/* Translation key */}
                    </span>
                  )}
                </div>

                <span className="mt-3 text-sm font-medium text-gray-700 group-hover:text-red-500 transition-colors duration-300">
                  {service.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AstroServices;
