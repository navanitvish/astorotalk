import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, Star, Moon, Sun, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import translations from '../../components/translations/translations';

const EnhancedAstrologyLanding = () => {
  const language = useSelector((state) => state.language.language);
  const t = translations[language];
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      id: 1,
      badge: t.badge1,
      title: t.title1,
      subtitle: t.subtitle1,
      description: t.description1,
      features: [
        { icon: <Phone className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />, text: t.phone1 },
        { icon: <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />, text: t.message1 },
      ],
    },
    {
      id: 2,
      badge: t.badge2,
      title: t.title2,
      subtitle: t.subtitle2,
      description: t.description2,
      features: [
        { icon: <Phone className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />, text: t.phone2 },
        { icon: <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />, text: t.message2 },
      ],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSlideChange = (index) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveSlide(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-500 to-pink-500 relative overflow-hidden ">
      {/* Animated Background Elements - Hidden on small screens for better performance */}
      <div className="absolute inset-0 hidden md:block">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 10}s infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <Star className="w-4 h-4 md:w-6 md:h-6 text-white" fill="currentColor" />
          </div>
        ))}

        <div className="absolute top-20 right-20 animate-pulse hidden md:block">
          <Moon className="w-12 h-12 md:w-16 md:h-16 text-black" fill="currentColor" />
        </div>

        <div className="absolute bottom-20 left-20 animate-spin-slow hidden md:block">
          <Sun className="w-16 h-16 md:w-24 md:h-24 text-white" fill="currentColor" />
        </div>

        {[...Array(20)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 4}s infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-20">
        {/* Main Slider Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl p-4 md:p-8">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-opacity duration-700 ${
                index === activeSlide ? "opacity-100" : "opacity-0 absolute inset-0"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {/* Video Section */}
                <div className="bg-gray-900 rounded-xl md:rounded-2xl h-[200px] md:h-[300px] flex items-center justify-center overflow-hidden">
                  <video
                    className="w-full h-[200px] md:h-[300px] object-cover rounded-xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source
                      src="https://cdn.anytimeastro.com/dashaspeaks/web/content/anytimeastro/videos/live/astrologer-b.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Text Content Section */}
                <div className="flex flex-col justify-center space-y-4 md:space-y-6">
                  <div className="space-y-3 md:space-y-4">
                    <span className="px-3 py-1 md:px-4 md:py-2 bg-yellow-500/30 text-white rounded-full text-xs md:text-sm inline-block">
                      {slide.badge}
                    </span>
                    <h1 className="text-2xl md:text-4xl font-bold text-white bg-clip-text bg-gradient-to-r from-yellow-300 to-red-400">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/80">{slide.subtitle}</p>
                    <p className="text-sm md:text-base text-white/70">{slide.description}</p>
                  </div>

                  {/* Features Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {slide.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-yellow-500/20 transition"
                      >
                        {feature.icon}
                        <span className="text-sm md:text-base text-white">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full md:w-auto py-3 px-6 bg-gradient-to-r from-yellow-400 to-red-500 text-white rounded-full hover:from-yellow-500 hover:to-red-600 transition-all text-sm md:text-base">
                    {t.StartConsultation}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Indicators */}
        <div className="mt-6 md:mt-8 flex justify-center space-x-3 md:space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`h-2 md:h-3 w-2 md:w-3 rounded-full transition-all ${
                index === activeSlide
                  ? "bg-yellow-500 scale-125"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Call-to-Action Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-8 md:mt-12">
          <Link to="/AstrologerListing" className="flex items-center p-4 md:p-6 bg-white/10 backdrop-blur-lg rounded-xl hover:bg-yellow-500/20 transition">
            <Phone className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" />
            <div className="ml-3 md:ml-4">
              <h2 className="text-lg md:text-xl font-semibold text-white">{t.TalktoAstrologer}</h2>
            </div>
          </Link>

          <Link to="/Astrologchat" className="flex items-center p-4 md:p-6 bg-white/10 backdrop-blur-lg rounded-xl hover:bg-blue-500/20 transition">
            <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
            <div className="ml-3 md:ml-4">
              <h2 className="text-lg md:text-xl font-semibold text-white">{t.ChatwithAstrologer}</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAstrologyLanding;