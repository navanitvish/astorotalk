import { login, logout } from "../../redux/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../../redux/language/languageSlice.js";
import translations from "../translations/translations";
import { Link } from "react-router-dom";
import { Menu, X, User, Phone, MessageSquare } from "lucide-react";
import FullscreenMenu from "./FullscreenMenu";
import UserProfileDropdown from "./UserProfileDropdown";
import MobileMenu from "./MobileMenu";
import SignInPage from "../../pages/SignIn/SignInPage.jsx";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../api/apiCalls";
import {
  requestNotificationPermission,
  onForegroundMessage,
} from "../firebase.js";
import { Bell } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Store notifications

  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  useEffect(() => {
    if (data) {
      setNotifications(data);
      localStorage.setItem("admin", data.token); 

      // If there are new notifications, set the red dot indicator
      if (data.length > notifications.length) {
        setHasNewNotifications(true);
      }
      // if (data.token) {
      //   localStorage.setItem("authToken", data.token); // Store token
      // }
    }
  }, [data]);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);

    // Mark notifications as "read" when dropdown is opened
    if (!showDropdown) {
      setHasNewNotifications(false);
    }
  };

  console.log("Loading notifications", notifications);

  useEffect(() => {
    // Request notification permissions and get the FCM token
    const getToken = async () => {
      const token = await requestNotificationPermission();
      if (token) {
        console.log("FCM Token Retrieved:", token);
      }
    };
    getToken();

    // Listen for foreground messages
    onForegroundMessage((payload) => {
      setNotifications((prev) => [...prev, payload.notification]);
    });
  }, []);

  const language = useSelector((state) => state.language.language);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const t = translations[language];

  const handleLoginSuccess = (userData) => {
    dispatch(login(userData));
    setIsSignInOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
  };

  return (
    <nav className="w-full bg-white shadow-md px-4 py-2 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-3xl">☀</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-semibold">OHM Astro</h1>
              <p className="text-sm md:text-md text-gray-600">
                {t.consultOnline}
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/AstrologerListing"
            className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full transition-all duration-300"
          >
            <Phone size={20} />
            <span className="font-semibold">{t.talkToAstrologer}</span>
          </Link>
          <Link
            to="/Astrologchat"
            className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full transition-all duration-300"
          >
            <MessageSquare size={20} />
            <span className="font-semibold">{t.chatWithAstrologer}</span>
          </Link>
          <div className="relative">
            {/* Notification Bell */}
            <button
              onClick={handleDropdownToggle}
              className="relative focus:outline-none"
            >
              <Bell className="text-yellow-500" />

              {/* Red dot for new notifications */}
              {hasNewNotifications && (
                <span className="absolute top-0 right-0 bg-red-600 h-2 w-2 rounded-full"></span>
              )}

              {/* Notification count */}
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 translate-x-2 translate-y-1 bg-red-600 text-xs rounded-full px-1 text-white">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg">
                <ul>
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <li
                        key={index}
                        className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                      >
                        <h3 className="font-bold text-sm">
                          {notification.title}
                        </h3>
                        <p className="text-xs">{notification.body}</p>
                      </li>
                    ))
                  ) : (
                    <li className="p-2 text-center text-gray-500">
                      No notifications
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <select
            className="bg-transparent border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-yellow-400"
            value={language}
            onChange={(e) => dispatch(setLanguage(e.target.value))}
          >
            <option value="ENG">ENG</option>
            <option value="HIN">हिंदी</option>
          </select>
          <div className="relative">
            {isAuthenticated ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileOpen(!isProfileOpen);
                  }}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <User size={20} />
                  <span className="font-semibold">{user?.email || "User"}</span>
                </button>

                {isProfileOpen && (
                  <UserProfileDropdown
                    isOpen={isProfileOpen}
                    onClose={() => setIsProfileOpen(false)}
                    language={language}
                    onLogout={handleLogout}
                  />
                )}
              </>
            ) : (
              <button
                onClick={() => setIsSignInOpen(true)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <User size={20} />
                <span className="font-semibold">{t.signIn}</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Sign In Modal */}
      {isSignInOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <SignInPage
            onClose={() => setIsSignInOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
