import React from 'react';
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import translations from "../../components/translations/translations";
import { useQuery } from "@tanstack/react-query";
import { fetchTopRatedAstrologers } from "../../api/apiCalls";

const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-pink-500 bg-white shadow-lg items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 z-10"
  >
    <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-pink-500" />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-2 border-pink-500 shadow-lg items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 z-10"
  >
    <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-pink-500" />
  </button>
);

const CustomerStories = () => {
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchTopRatedAstrologers"],
    queryFn: fetchTopRatedAstrologers,
  });

  if (isLoading) {
    return (
      <div className="text-center p-4 md:p-8">
        <div className="inline-block w-12 h-12 md:w-16 md:h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-sm md:text-base">Loading top-rated astrologers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 p-4">
        Error fetching top-rated astrologers: {error.message}
      </p>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    swipeToSlide: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
          centerMode: true,
          centerPadding: '24px',
        }
      }
    ]
  };

  return (
    <div className="bg-red-50">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-pink-500 text-transparent bg-clip-text">
            {t.Customer}
          </h2>
          <div className="flex justify-center items-center">
            <div className="h-1 w-16 md:w-24 bg-red-500"></div>
          </div>
          <p className="text-sm md:text-base text-gray-600 mt-4">{t.desc}</p>
        </div>

        <div className="relative px-0 md:px-16">
          <Slider {...settings}>
            {data?.map(({ astrologer, averageRating }) => (
              <div key={astrologer._id} className="px-2 md:px-4">
                <div className="bg-white border border-red-500 rounded-lg shadow-lg p-4 md:p-8 h-full">
                  <div className="flex flex-col items-center">
                    <img
                      src={astrologer.image}
                      alt={astrologer.name}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 object-cover"
                    />
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl md:text-2xl">
                          ★
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-1 text-center">
                      {astrologer.name}
                    </h3>
                    {astrologer.role && (
                      <p className="text-sm md:text-base text-gray-600 mb-1 text-center">
                        {astrologer.role}
                      </p>
                    )}
                    {astrologer.location && (
                      <p className="text-sm md:text-base text-gray-600 mb-4 text-center">
                        {astrologer.location}
                      </p>
                    )}
                    <p className="text-sm md:text-base text-gray-700 text-center line-clamp-3">
                      {astrologer.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CustomerStories;