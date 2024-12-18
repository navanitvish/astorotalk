import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchastrologers } from '../api/apiCalls';
import { Star, X, Phone, Lock } from 'lucide-react';

const AstrologerCallModal = ({ astrologerId, onClose }) => {
  const [isNotified, setIsNotified] = useState(false);

  // Fetch astrologer data from API
  const { data: astrologer, isLoading, error } = useQuery({
    queryKey: ['astrologer', astrologerId],
    queryFn: () => fetchastrologers(astrologerId),
    enabled: !!astrologerId, // Only run query if astrologerId is provided
  });

  console.log("astrologer", astrologer);
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading astrologer data: {error.message}</div>;

  const {
    name = "AnushreeB",
    reviews = 357,
    ratePerMinute = 15,
    freeMinutes = 3,
    image = "/api/placeholder/150/150",
    languages = ["Hindi"],
    experience = "4 Years",
    specialization = "Vedic Astrology",
    rating = 5,
    location,
    contact,
    availableHours,
  } = astrologer || {};

  const handleCallRequest = () => {
    setIsNotified(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Astrologer Info */}
        <div className="p-6">
          <div className="flex gap-4 items-start mb-4">
            <img
              src={image}
              alt={name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold">{name}</h2>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                Reviews {reviews}
                <div className="flex">
                  {[...Array(rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
              <div className="mt-1">
                <span className="font-semibold">₹{ratePerMinute}/Min</span>
                {freeMinutes > 0 && (
                  <span className="text-green-600 ml-2">
                    (First {freeMinutes} Minutes FREE)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Languages:</span> {languages.join(", ")}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Experience:</span> {experience}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Specialization:</span> {specialization}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Location:</span> {location}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Contact:</span> {contact}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Available Hours:</span> {availableHours}
            </p>
          </div>

          {/* Notification Message */}
          {isNotified && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-700 text-center">
                Your call request is notified to your chosen Astrologer. They will call you shortly.
              </p>
            </div>
          )}

          {/* Note */}
          <p className="text-xs text-gray-500 mb-4">
            Note: Our Astrologer will call you within the next few minutes. You can check your call transaction details in your "My Calls" section after completing your session.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleCallRequest}
              disabled={isNotified}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Phone size={20} />
              {isNotified ? "Request Sent" : "Request Call"}
            </button>
            <div className="flex items-center justify-center gap-1 text-green-600 text-sm">
              <Lock size={16} />
              <span>Your information is secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstrologerCallModal;
