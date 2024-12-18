import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import translations from "../../components/translations/translations";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../../api/apiCalls";

const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 
    -translate-x-2 md:-translate-x-6 
    w-8 h-8 md:w-12 md:h-12 
    rounded-full bg-white/90 shadow-lg 
    flex items-center justify-center 
    hover:bg-gray-50 focus:outline-none 
    focus:ring-2 focus:ring-red-500 z-10 
    border border-gray-200"
    aria-label="Previous slide"
  >
    <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 
    translate-x-2 md:translate-x-6 
    w-8 h-8 md:w-12 md:h-12 
    rounded-full bg-white/90 shadow-lg 
    flex items-center justify-center 
    hover:bg-gray-50 focus:outline-none 
    focus:ring-2 focus:ring-red-500 z-10 
    border border-gray-200"
    aria-label="Next slide"
  >
    <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
  </button>
);

const BlogSection = () => {
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs", { limit: 10, page: 1 }],
    queryFn: () => fetchBlogs({ limit: 10, page: 1 }),
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-4 md:p-8">
        <div
          className="inline-block w-12 h-12 md:w-16 md:h-16 
        border-4 border-t-4 border-gray-200 
        border-t-blue-500 rounded-full animate-spin"
        />
        <p className="ml-4 text-sm md:text-base">Loading blogs...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-center text-red-500">
        <p className="text-sm md:text-base">Error: {error.message}</p>
      </div>
    );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          centerMode: true,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <section className="py-8 md:py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2
            className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 
            bg-gradient-to-r from-amber-500 to-pink-500 
            text-transparent bg-clip-text"
          >
            {t.blog1}
          </h2>
          <div className="w-16 md:w-24 h-1 bg-red-500 mx-auto mb-4 md:mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base px-4">
            {t.blogdec1}
          </p>
        </div>

        <div className="relative px-2 md:px-8">
          <Slider {...settings}>
            {data?.data.map((post) => (
              <div key={post._id} className="px-2 md:px-4">
                <div
                  className="bg-white border w-[] border-red-500 rounded-lg 
                  shadow-lg overflow-hidden transition-transform 
                  duration-300 hover:-translate-y-1 h-full"
                >
                  <div className="relative">
                    <img
                      src={post.profileImage || ""}
                      alt={post.title}
                      className="w-full h-48 md:h-64 object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4 md:p-6 text-center">
                    <h3
                      className="text-lg md:text-xl font-semibold mb-2 md:mb-3 
                      line-clamp-2 min-h-[3.5rem]"
                    >
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm md:text-base">
                      {post.bio}
                    </p>
                    <Link
                      to="/ModernPage"
                      className="inline-flex items-center justify-center 
                        text-red-500 border border-red-500 
                        rounded-full px-4 md:px-6 py-1.5 md:py-2 
                        text-sm md:text-base font-medium 
                        hover:bg-red-50 transition-colors duration-200"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style jsx>{`
        .slick-dots {
          bottom: -30px;
          display: flex !important;
          justify-content: center;
          list-style: none;
          padding: 0;
        }
        .slick-dots li {
          margin: 0 4px;
        }
        .slick-dots li button {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #e2e8f0;
          border: none;
          padding: 0;
          font-size: 0;
          transition: all 0.3s ease;
        }
        .slick-dots li.slick-active button {
          background-color: #ef4444;
          transform: scale(1.2);
        }
        @media (max-width: 768px) {
          .slick-dots li button {
            width: 6px;
            height: 6px;
          }
        }
      `}</style>
    </section>
  );
};

export default BlogSection;
