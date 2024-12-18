import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import FAQ from "./FAQ/LiveFAQ";

const LiveIndicator = () => (
  <div className="absolute top-2 right-2 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full z-10">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
    </span>
    <span className="text-sm font-medium">LIVE</span>
  </div>
);

const ScheduledIndicator = () => (
  <div className="absolute top-2 right-2 flex items-center gap-2 bg-gray-600 text-white px-3 py-1 rounded-full z-10">
    <span className="relative flex h-2 w-2">
      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
    </span>
    <span className="text-sm font-medium">SCHEDULED</span>
  </div>
);

const SessionCard = ({ id, name, topic, time, status, image }) => {
  const navigate = useNavigate();
  const isLive = status === "live";

  const handleJoinSession = () => {
    if (isLive) {
      navigate(`/live/${id}`, { state: { name, topic, time, image } });
    }
  };

  return (
    <div className="relative flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-all bg-red-50/80 rounded-2xl p-3 sm:p-4 gap-3 sm:gap-4">
      <div className="relative w-full h-40 sm:h-48 flex-shrink-0">
        <img
          src={image}
          alt={`${name}'s session`}
          className="w-full h-full object-cover rounded-xl"
        />
        {isLive ? <LiveIndicator /> : <ScheduledIndicator />}
      </div>

      <div className="flex flex-col flex-grow justify-between py-1 sm:py-2">
        <div>
          <div
            className={`inline-block mb-2 sm:mb-3 px-2 sm:px-3 py-1 rounded text-xs ${
              isLive ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
            }`}
          >
            {time}
          </div>

          <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{name}</h3>
          <p className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4">{topic}</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={handleJoinSession}
            className={`py-1.5 sm:py-2 px-4 sm:px-6 rounded-full text-sm sm:text-base ${
              isLive ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {isLive ? "Join Live Session" : "Notify Me"}
          </button>
          <span className="text-xl sm:text-2xl border rounded-full p-1.5 sm:p-2 hover:bg-gray-100 cursor-pointer">💬</span>
        </div>
      </div>
    </div>
  );
};

export const LiveAsro = () => {
  const sessions = [
    {
      id: 1,
      name: "PoojaD",
      topic: "Love Relationship",
      time: "22 Nov, 09:00 AM IST",
      status: "live",
      image: "https://cdn.anytimeastro.com/anytimeastro/lives_exp/live/2723789/3da519f2-f512-4521-ad13-ce49260c8f63.png",
    },
    {
      id: 2,
      name: "Akshayk",
      topic: "Daily Predictions",
      time: "22 Nov, 09:00 PM IST",
      status: "scheduled",
      image: "https://cdn.anytimeastro.com/anytimeastro/lives_exp/live/3301733/a3bee38a-fbed-4d44-a805-2218ddbcfb68.png",
    },
    {
      id: 3,
      name: "Priyanka M",
      topic: "Career Guidance",
      time: "22 Nov, 11:00 AM IST",
      status: "live",
      image: "/api/placeholder/400/320",
    },
    {
      id: 4,
      name: "Rajesh S",
      topic: "Business Astrology",
      time: "22 Nov, 02:00 PM IST",
      status: "scheduled",
      image: "/api/placeholder/400/320",
    },
    {
      id: 5,
      name: "Meera K",
      topic: "Marriage Compatibility",
      time: "22 Nov, 04:00 PM IST",
      status: "live",
      image: "/api/placeholder/400/320",
    },
    {
      id: 6,
      name: "Amit R",
      topic: "Financial Astrology",
      time: "22 Nov, 06:00 PM IST",
      status: "scheduled",
      image: "/api/placeholder/400/320",
    },
    {
      id: 7,
      name: "Sanjana P",
      topic: "Health & Wellness",
      time: "22 Nov, 07:30 PM IST",
      status: "live",
      image: "/api/placeholder/400/320",
    },
    {
      id: 8,
      name: "Vikram J",
      topic: "Vedic Astrology",
      time: "22 Nov, 10:00 PM IST",
      status: "scheduled",
      image: "/api/placeholder/400/320",
    }
  ];

  return (
    <div>
      <nav className="bg-rose-500 text-white p-3 sm:p-4">
        <Link to="/" className="container mx-auto flex items-center gap-2">
          <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium text-sm sm:text-base">Live</span>
        </Link>
      </nav>

      <div className="bg-rose-50 py-6 sm:py-8 p-4 sm:p-6">
        <div className="container mx-auto px-3 sm:px-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            INTERACTIVE LIVE SESSIONS
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Talk to premium Astrologers through Free Live Sessions
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <h2 className="text-xl sm:text-2xl text-center font-bold mb-4 sm:mb-6">
          Live & Upcoming Sessions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sessions.map((session) => (
            <SessionCard key={session.id} {...session} />
          ))}
        </div>
      </div>

      <FAQ />
    </div>
  );
};

export default LiveAsro;