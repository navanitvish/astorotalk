import { useSelector } from "react-redux";
import translations from "../../components/translations/translations";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchastrologers } from "../../api/apiCalls";
import { useState, useEffect } from "react";

// Custom Arrow Components with responsive sizing
const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 
    bg-white/90 backdrop-blur-sm
    border border-pink-500 md:border-2 
    text-pink-500 
    p-1.5 md:p-2 
    rounded-full 
    hover:bg-pink-300 
    transition-all
    z-10
    hidden md:block
    touch-manipulation"
    style={{ left: "0.5rem", "@media (min-width: 768px)": { left: "-1.5rem" } }}
  >
    <FaArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 
    bg-white/90 backdrop-blur-sm
    border border-pink-500 md:border-2 
    text-pink-500 
    p-1.5 md:p-2 
    rounded-full 
    hover:bg-pink-300 
    transition-all
    z-10
    hidden md:block
    touch-manipulation"
    style={{
      right: "0.5rem",
      "@media (min-width: 768px)": { right: "-1.5rem" },
    }}
  >
    <FaArrowRight className="w-3 h-3 md:w-4 md:h-4" />
  </button>
);

const LiveSessions = () => {
  const language = useSelector((state) => state.language.language);
  const t = translations[language];
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { data } = useQuery({
    queryKey: ["blogs", { limit: 10, page: 1 }],
    queryFn: () => fetchastrologers({ limit: 10, page: 1 }),
  });

  // if (isLoading)
  //   return (
  //     <div className="text-center p-4 md:p-8">
  //       <div
  //         className="inline-block w-12 h-12 md:w-16 md:h-16 
  //       border-4 border-t-4 border-gray-200 border-t-blue-500 
  //       rounded-full animate-spin"
  //       ></div>
  //       <p className="mt-2 md:mt-4 text-sm md:text-base">
  //         Loading top-rated astrologers...
  //       </p>
  //     </div>
  //   );

  // if (error)
  //   return (
  //     <p className="text-center p-4 text-sm md:text-base text-red-500">
  //       Error: {error.message}
  //     </p>
  //   );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    swipeToSlide: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          dots: false,
          arrows: false,
          centerMode: true,
          centerPadding: "24px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: false,
          arrows: false,
          centerMode: true,
          centerPadding: "32px",
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 py-6 md:py-12">
      <div className="text-center mb-6 md:mb-12">
        <h2
          className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 
          bg-gradient-to-r from-amber-500 to-pink-500 
          text-transparent bg-clip-text"
        >
          {t.LIVESESSIONS}
        </h2>
        <div className="flex justify-center items-center">
          <div className="h-0.5 md:h-1 w-16 md:w-24 bg-red-500"></div>
        </div>
        <p
          className="text-gray-600 mt-2 md:mt-4 max-w-2xl mx-auto 
          text-sm md:text-base px-4"
        >
          {t.descri}
        </p>
      </div>

      <div className="relative px-0 md:px-4">
        <Slider {...settings}>
          {data?.data.map((astrologer) => (
            <div key={astrologer.id} className="px-1 md:px-2">
              <div
                className="relative rounded-xl md:rounded-2xl overflow-hidden 
                shadow-md md:shadow-lg group cursor-pointer 
                transition-transform duration-300 transform 
                border border-red-600 
                hover:shadow-xl"
              >
                <div className="absolute top-2 md:top-4 left-2 md:left-4 z-10">
                  <span
                    className="bg-red-500 text-white 
                    px-2 md:px-3 py-0.5 md:py-1 
                    rounded-full text-xs md:text-sm font-semibold 
                    flex items-center gap-1"
                  >
                    <span
                      className="animate-pulse w-1.5 md:w-2 h-1.5 md:h-2 
                      bg-white rounded-full"
                    ></span>
                    {t.live}
                  </span>
                </div>
                <div className="aspect-[3/4] relative">
                  <img
                    src={astrologer.profileImage || "defaultImage"}
                    alt={astrologer.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t 
                    from-black/60 to-transparent"
                  ></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 text-white">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <div
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden 
                      border-2 border-white"
                    >
                      <img
                        src={astrologer.profileImage}
                        alt={`${astrologer.name} avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base">
                      {astrologer.name}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-yellow-400">
                    {astrologer.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="text-center mt-6 md:mt-8">
        <Link
          to="/LiveSessions"
          className="inline-flex items-center justify-center 
            px-6 md:px-10 py-1.5 md:py-2 
            border border-red-500 text-red-500 
            text-sm md:text-base
            rounded-full hover:bg-red-500 hover:text-white 
            transition-colors duration-300"
        >
          {t.ViewMore}
        </Link>
      </div>
    </div>
  );
};

export default LiveSessions;
