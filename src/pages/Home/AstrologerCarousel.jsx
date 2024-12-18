import React, { useState } from "react";
import Slider from "react-slick";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import translations from "../../components/translations/translations";
import { useQuery } from "@tanstack/react-query";
import { fetchTopRatedAstrologers } from "../../api/apiCalls";

// Custom Arrow Component with mobile responsiveness
const CustomArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`
      absolute top-1/2 -translate-y-1/2 z-20
      ${direction === "left" ? "left-0 md:-left-2" : "right-0 md:-right-2"}
      flex items-center justify-center
      w-6 h-6 md:w-8 md:h-8 rounded-full
      bg-white/90 
      border border-pink-500 md:border-2
      hover:bg-pink-50 transition-colors
      focus:outline-none
      shadow-md
    `}
  >
    <span className="text-pink-500 text-xl md:text-3xl text-center leading-none">
      {direction === "left" ? <FiChevronLeft /> : <FiChevronRight />}
    </span>
  </button>
);

const AstrologerCarousel3D = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  const { data } = useQuery({
    queryKey: ["fetchTopRatedAstrologers"],
    queryFn: fetchTopRatedAstrologers,
  });
  // if (isLoading) return (
  //   <div className="flex items-center justify-center p-4 md:p-8">
  //     <div className="inline-block w-12 h-12 md:w-16 md:h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
  //     <p className="ml-4 text-sm md:text-base">{t.loading}</p>
  //   </div>
  // );

  // if (error) return (
  //   <div className="p-4 text-center text-red-500">
  //     <p className="text-sm md:text-base">Error: {error.message}</p>
  //   </div>
  // );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    prevArrow: <CustomArrow direction="left" />,
    nextArrow: <CustomArrow direction="right" />,
    beforeChange: (current, next) => setActiveSlide(next),
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
          dots: false,
          arrows: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
          dots: false,
          arrows: false,
        }
      }
    ],
  };

  return (
    <div className="bg-pink-50 py-4 md:py-6 px-2 md:px-6 perspective-1000">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-4 md:mb-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-amber-500 to-pink-500 text-transparent bg-clip-text">
            {t.ourAstrologers}
          </h2>
          <div className="w-32 md:w-48 h-0.5 bg-pink-500 mx-auto mb-2 md:mb-4"></div>
          <p className="text-gray-700 text-sm md:text-base px-4">{t.contactAstrologers}</p>
        </div>

        <div className="px-0 md:px-8">
          <Slider {...settings}>
            {data?.map(({ astrologer, averageRating, totalReviews }, index) => (
              <div
                key={astrologer._id}
                className={`
                  px-2 md:px-3 transform transition-all duration-300 ease-in-out p-6
                  ${index === activeSlide ? "scale-100 opacity-100 z-10" : "scale-90 md:scale-75 opacity-70 z-0"}
                `}
              >
                <div
                  className="
                    bg-white rounded-lg border border-red-500 p-6 md:p-6 
                    shadow-sm text-center mx-auto max-w-[280px] h-[300px] md:h-80
                    cursor-pointer hover:shadow-lg transition-all
                    transform transition-transform duration-300
                    hover:-translate-y-1 md:hover:-translate-y-2
                  "
                  onClick={() => navigate(`/astrologer/${astrologer._id}`)}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-2 md:mb-4 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src={astrologer.image}
                      alt={astrologer.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-medium text-base md:text-lg mb-1 md:mb-2">{astrologer.name}</h3>
                  <p className="text-sm md:text-base text-gray-700 text-center line-clamp-3">
                  {astrologer.bio}
                  </p>
                  <div className="text-xs md:text-sm">
                    {/* {t.reviews}: <span className="text-pink-500">{totalReviews}</span> */}
                  </div>
                  <div className="flex justify-center mt-4 md:mt-2 text-yellow-400 text-sm md:text-base">
                    {"★".repeat(Math.round(averageRating))}
                    {"☆".repeat(5 - Math.round(averageRating))}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style jsx>{`
        .custom-dots {
          bottom: -30px;
          display: flex !important;
          justify-content: center;
          list-style: none;
          padding: 0;
        }
        .custom-dots li {
          margin: 0 4px;
        }
        .custom-dots li button {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #e2e8f0;
          border: none;
          padding: 0;
          font-size: 0;
          transition: all 0.3s ease;
        }
        .custom-dots li.slick-active button {
          background-color: #ec4899;
          transform: scale(1.2);
        }
        @media (max-width: 768px) {
          .custom-dots li button {
            width: 6px;
            height: 6px;
          }
        }
      `}</style>
    </div>
  );
};

export default AstrologerCarousel3D;