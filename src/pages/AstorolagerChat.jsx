import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchastrologers, addEnquiry } from "../api/apiCalls";
import { Star, MessageSquare, X, Home } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
// Custom Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative z-50 bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

// Call Modal Component
const CallIntakeForm = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    gender: "",
    dob: "",
    dot: "",
    birthPlace: "",
    maritalStatus: "",
    reason: "",
    mobile: "",
    type: "call",
  });

  console.log("formData", formData);

  const [errors, setErrors] = useState({});

  const mutation = useMutation({
    mutationFn: addEnquiry,
    onSuccess: (data) => {
      toast.success("Enquiry submitted successfully!", { duration: 3000 });
      console.log("Enquiry added successfully:", data);
      onClose();
      navigate("/AstrologerChat");
    },
    onError: (error) => {
      toast.error(
        error.message ||
          "There was an error submitting the enquiry. Please try again.",
        {
          duration: 4000,
        }
      );
      console.error("Error submitting enquiry:", error);
    },
  });

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.fname.trim()) newErrors.fname = "First name is required";
    if (!formData.lname.trim()) newErrors.lname = "Last name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.birthPlace.trim())
      newErrors.birthPlace = "Place of birth is required";
    if (!formData.maritalStatus)
      newErrors.maritalStatus = "Marital status is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (!formData.reason.trim())
      newErrors.reason = "Topic of concern is required";

    // Mobile number validation
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      mutation.mutate(formData);
    } else {
      toast.error("Please fill in all required fields correctly.", {
        duration: 3000,
      });
      const firstError = document.querySelector(".error-field");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const InputField = ({
    label,
    name,
    type = "text",
    required = false,
    options,
    value,
  }) => {
    const hasError = errors[name];
    const inputClasses = `w-full p-2 border rounded ${
      hasError ? "border-red-500 bg-red-50" : "border-gray-300"
    } focus:outline-none focus:ring-2 focus:ring-yellow-400`;

    return (
      <div className={`${hasError ? "error-field" : ""}`}>
        <label className="block text-sm font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {type === "select" ? (
          <select
            value={value}
            onChange={(e) => handleInputChange(name, e.target.value)}
            className={inputClasses}
          >
            <option value="">--Select--</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => handleInputChange(name, e.target.value)}
            className={inputClasses}
          />
        )}
        {hasError && <p className="text-red-500 text-sm mt-1">{hasError}</p>}
      </div>
    );
  };

  // Updated enum values to match backend schema
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const maritalStatusOptions = [
    { value: "Single", label: "Single" },
    { value: "Married", label: "Married" },
    { value: "Divorced", label: "Divorced" },
    { value: "Widowed", label: "Widowed" },
    { value: "Separated", label: "Separated" },
  ];

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">chat Intake Form</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg mb-4">
            <p>Yay! You are eligible for the first 3-minute free session.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="First Name"
                name="fname"
                required
                value={formData.fname}
              />
              <InputField
                label="Last Name"
                name="lname"
                required
                value={formData.lname}
              />
            </div>

            <InputField
              label="Gender"
              name="gender"
              type="select"
              required
              value={formData.gender}
              options={genderOptions}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Date of Birth"
                name="dob"
                type="date"
                required
                value={formData.dob}
              />
              <InputField
                label="Time of Birth"
                name="dot"
                type="time"
                value={formData.dot}
              />
            </div>

            <InputField
              label="Place of Birth"
              name="birthPlace"
              required
              value={formData.birthPlace}
            />

            <InputField
              label="Marital Status"
              name="maritalStatus"
              type="select"
              required
              value={formData.maritalStatus}
              options={maritalStatusOptions}
            />

            <div>
              <label className="block text-sm font-medium mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <select className="w-24 p-2 border rounded-l border-r-0">
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                </select>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  className={`flex-1 p-2 border rounded-r ${
                    errors.mobile
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
              </div>
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>

            <InputField
              label="Topic of Concern"
              name="reason"
              required
              value={formData.reason}
            />

            <button
              type="submit"
              disabled={mutation.isLoading}
              className={`w-full text-black font-semibold py-2 px-4 rounded transition-colors ${
                mutation.isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500"
              }`}
            >
              {mutation.isLoading ? "Submitting..." : `Start Chat with `}
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

const AstrologerCard = ({ astrologer }) => {
  const [showCallModal, setShowCallModal] = useState(false);

  // Fallback for missing or undefined data
  const safeAstrologer = {
    name: astrologer?.name || "Astrologer",
    profileImage: astrologer?.profileImage || "/api/placeholder/300/400",
    rating: astrologer?.rating || "N/A",
    specialties: astrologer?.specialties || [],
    pricing: astrologer?.pricing || 0,
    experience: astrologer?.experience || 0,
  };

  return (
    <div className="flex w-full max-w-md bg-white  rounded-xl shadow-lg border border-red-600 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Profile Image Section */}
      <div className="w-2/5 relative">
        <img
          src={safeAstrologer.profileImage}
          alt={`${safeAstrologer.name} profile`}
          className="w-full h-full object-cover"
        />
        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded-full flex items-center">
          {safeAstrologer.rating} <Star className="ml-1 w-3 h-3" />
        </div>
      </div>

      {/* Content Section */}
      <div className="w-3/5 p-4 flex flex-col justify-between">
        {/* Header and Name */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {safeAstrologer.name}
          </h3>

          {/* Specialties */}
          <div className="mb-3">
            {/* <h4 className="text-xs font-medium text-gray-500 mb-1 uppercase">
              Specialties
            </h4> */}
            <div className="flex flex-wrap gap-1">
              {safeAstrologer.specialties.length > 0 ? (
                safeAstrologer.specialties.slice(0, 3).map((spec) => (
                  <span
                    key={spec._id || spec.name}
                    className="bg-gray-100 text-gray-700 text-[10px] px-2 py-0.5 rounded-full"
                  >
                    {spec.name}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400">
                  No specialties listed
                </span>
              )}
              {safeAstrologer.specialties.length > 3 && (
                <span className="text-xs text-gray-500 ml-1">
                  +{safeAstrologer.specialties.length - 3} more
                </span>
              )}
            </div>
            <p className="text-sm mx-2 ">
              Exp: {safeAstrologer.experience} year
            </p>
            <p className="text-sm mx-2">Hindi</p>
          </div>

          {/* Pricing */}
          <div className="text-lg font-bold text-yellow-600 mb-3">
            ₹{safeAstrologer.pricing}/Min
          </div>
        </div>

        {/* Action Section */}
        <div className="flex items-center justify-between">
          {/* Online Status */}
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">
              Online Now
            </span>
          </div>

          {/* Call Button */}
          <button
            onClick={() => setShowCallModal(true)}
            className="flex items-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-xs px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <MessageSquare className="w-4 h-4 text-green-500" /> Chat
          </button>
        </div>
      </div>

      {/* Call Modal */}
      <CallIntakeForm
        isOpen={showCallModal}
        onClose={() => setShowCallModal(false)}
        astrologer={astrologer}
      />
    </div>
  );
};

const AstrologerListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("All");
  const [sortBy, setSortBy] = useState("All");

  const {
    data: astrologerData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["astrologers"],
    queryFn: fetchastrologers,
  });

  const specializations = [
    "All",
    "Marital Life",
    "Love & Relationship",
    "Career & Job",
    "Cheating & Affairs",
    "Finance & Business",
    "Break-Up & Divorce",
    "Vedic Astrology",
    "Kids & Education",
    "Tarot Reading",
    "Horary Astrology",
    "Psychic Reading",
    "Numerology",
    "Palm Reading",
    "Relationship Counseling",
  ];

  const sortOptions = [
    "Online",
    "Newest",
    "Oldest",
    "Lowest Price",
    "Highest Price",
    "Highest Rating",
    "Highest Review Count",
  ];

  const sortAstrologers = (astrologers) => {
    switch (sortBy) {
      case "Newest":
        return [...astrologers].sort(
          (a, b) => new Date(b.joinedDate) - new Date(a.joinedDate)
        );
      case "Oldest":
        return [...astrologers].sort(
          (a, b) => new Date(a.joinedDate) - new Date(b.joinedDate)
        );
      case "Lowest Price":
        return [...astrologers].sort(
          (a, b) => a.originalPrice - b.originalPrice
        );
      case "Highest Price":
        return [...astrologers].sort(
          (a, b) => b.originalPrice - a.originalPrice
        );
      case "Highest Rating":
        return [...astrologers].sort((a, b) => b.rating - a.rating);
      case "Highest Review Count":
        return [...astrologers].sort((a, b) => b.reviews - a.reviews);
      default:
        return astrologers;
    }
  };

  const filteredAstrologers = astrologerData?.data
    ? sortAstrologers(
        astrologerData.data.filter((astrologer) => {
          const matchesSearch =
            astrologer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (astrologer.specializations &&
              astrologer.specializations.some((spec) =>
                spec.toLowerCase().includes(searchTerm.toLowerCase())
              )) ||
            (astrologer.language &&
              astrologer.language.some((lang) =>
                lang.toLowerCase().includes(searchTerm.toLowerCase())
              ));

          const matchesSpecialization =
            specializationFilter === "All" ||
            (astrologer.specializations &&
              astrologer.specializations.includes(specializationFilter));

          return matchesSearch && matchesSpecialization;
        })
      )
    : [];

  console.log("specializations", astrologerData);
  if (isLoading)
    return <p className="text-center w-full">Loading astrologers...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <nav className="bg-rose-500 text-white p-4">
        <div className="container mx-auto flex items-center gap-2">
          <span>
            {" "}
            <Link to="/">
              <Home className="w-5 h-5" />
            </Link>
          </span>

          <span>
            <span className="font-medium">Chat Astrologers</span>
          </span>
        </div>
      </nav>
      <div className="bg-yellow-400 p-6 mb-8 ">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-4 max-w-6xl mx-auto ">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Need guidance for your life problems?
            </h1>
            <h2 className="text-xl lg:text-2xl">
              Talk to the best Astrologers in India
            </h2>
            <div className="bg-white text-black px-4 py-2 rounded-full inline-block mt-4">
              First Session FREE
            </div>
          </div>
          <img
            src="https://cdn.anytimeastro.com/dashaspeaks/psychics/13ecd392-f1e7-4047-98ce-76600fe99498.png"
            alt="Astrologer"
            className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover rounded-full"
          />
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col md:flex-row md:gap-4 gap-2 mb-4">
          <input
            type="text"
            placeholder="Search astrologers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full md:w-auto flex-1"
          />
          <select
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full md:w-auto"
          >
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full md:w-auto"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredAstrologers.map((astrologer) => (
            <AstrologerCard key={astrologer._id} astrologer={astrologer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AstrologerListing;
