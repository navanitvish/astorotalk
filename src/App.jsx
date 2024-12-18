// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/Home/Home";
import AstrologerListing from "./pages/AstrologerListing";
import AstorolagerChat from "./pages/AstorolagerChat";
import PanchangPage from "./pages/Punchang/PanchangPage";
import KundaliMatching from "./pages/KundaliMatching/KundaliMatching";
import GemstoneShowcase from "./pages/Gemstone/GemstoneShowcase";
import DailyHoroscope from "./pages/DailyHoroscope/DailyHoroscope";
import Panchang from "./pages/Punchang/Panchang";
import AstrologyServices from "./pages/FreeServies/freeServies";
import BlogLayout from "./pages/Blog/Astorblog";
import ComingSoonPage from "./pages/OnlinePuja/PujaServies";
import { LiveAsro } from "./pages/LiveAsro";
// import AboutPage from './pages/AboutPage';
import Astrology from "./pages/KundaliMatching/Astrology";
import AstrologerProfile from "./pages/Home/AstrologerProfile";
import ModernPage from "./pages/Home/ModernPage";
// import { LanguageProvider } from "./components/context/LanguageContext";
import { Provider } from "react-redux";
import store from "./redux/store";
import PurnimaVrat from "./pages/vrat/PurnimaVrat";
import AmavasyaDates from "./pages/vrat/AmavasyaDates";
import Ekadashi from "./pages/vrat/Ekadashi";
import PradoshVrat from "./pages/vrat/PradoshVrat";
import SankashtiChaturthi from "./pages/vrat/SankashtiChaturthi";
import SankrantiDates from "./pages/vrat/SankrantiDates";
import SatyanarayanPuja from "./pages/vrat/SatyanarayanPuja";
import VinayakaChaturthi from "./pages/vrat/VinayakaChaturthi";
import Choghadiya from "./pages/Mhurat/Choghadiya";
import GowriPanchangam from "./pages/Mhurat/GowriPanchangam";
import RahuKalam from "./pages/Mhurat/RahuKalam";
import SHUBHHORA from "./pages/Mhurat/SHUBHHORA";
import FinanceBusinessSection from "./pages/getadvoceon/FinanceBusiness";
import JanamKundaliForm from "./pages/KundaliMatching/JanamKundaliForm";
import AstrologerRegistration from "./pages/AstrologerRegistration";
import About from "./pages/getadvoceon/About";
import PrivacyPolicy from "./pages/getadvoceon/PravicyPage";
import TermsOfUse from "./pages/getadvoceon/TermsOfUse";
import CookiePolicy from "./pages/getadvoceon/cookiePolicys";
import Disclaimer from "./pages/getadvoceon/disclaimerContent";
import GetAdviceOn from "./pages/getadvoceon/PageContent";
import LiveStreamingPage from "./pages/LiveStreamingPage";
import HoroscopePage from "./pages/DailyHoroscope/HoroscopePage";
import UserProfileDropdown from "./components/Navbar/UserProfileDropdown";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MonthlyHoroscope from "./pages/DailyHoroscope/YearlyHoroscope";
import YearlyHoroscope from "./pages/DailyHoroscope/MonthlyHoroscope";
import Horoscope from "./pages/DailyHoroscope/Horoscope";
import ScrollToTop from "./pages/scroolToTop";
import NotFound from "./pages/NotFound";
import AstrologerChat from "./pages/AstrologerChat";
import WalletRecharge from "./pages/WalletRecharge";
import AstrologerCallModal from "./pages/AstrologerCallModal";
function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/AstrologerListing" element={<AstrologerListing />} />
            <Route path="/Astrologchat" element={<AstorolagerChat />} />
            <Route path="/Panchang" element={<PanchangPage />} />
            <Route path="/KundaliMatching" element={<KundaliMatching />} />
            <Route path="/GemstoneShowcase" element={<GemstoneShowcase />} />
            <Route path="/DailyHoroscope" element={<DailyHoroscope />} />
            <Route path="/horoscope/:sign" element={<HoroscopePage />} />
            <Route path="/Panchangs" element={<Panchang />} />
            <Route path="/AstrologyServices" element={<AstrologyServices />} />
            <Route path="/AstrologyBlog" element={<BlogLayout />} />
            <Route path="/ComingSoonPage" element={<ComingSoonPage />} />
            <Route path="/LiveSessions" element={<LiveAsro />} />
            <Route path="/astrology" element={<Astrology />} />
            <Route path="/astrologer/:name" element={<AstrologerProfile />} />
            <Route path="/ModernPage" element={<ModernPage />} />
            <Route path="/Purnima" element={<PurnimaVrat />} />
            <Route path="/amavasya" element={<AmavasyaDates />} />
            <Route path="/ekadashi" element={<Ekadashi />} />
            <Route path="/pradoshvrat" element={<PradoshVrat />} />
            <Route path="/sankashti" element={<SankashtiChaturthi />} />
            <Route path="/sankranti" element={<SankrantiDates />} />
            <Route path="/satyanarayan" element={<SatyanarayanPuja />} />
            <Route path="/vinayaka" element={<VinayakaChaturthi />} />
            <Route path="/choghadiya" element={<Choghadiya />} />
            <Route path="/gowri" element={<GowriPanchangam />} />
            <Route path="/RahuKaal" element={<RahuKalam />} />
            <Route path="/shubhahora" element={<SHUBHHORA />} />
            <Route path="/finance" element={<FinanceBusinessSection />} />
            <Route path="/kundali-janam" element={<JanamKundaliForm />} />
            <Route
              path="/astrologer-registration"
              element={<AstrologerRegistration />}
            />
            <Route path="/about-us" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />

            {/* Add more routes as needed */}

            {/* Catch-all route for get-advice */}
            <Route path="/get-advice" element={<GetAdviceOn />} />
            <Route path="/get-advice/:category" element={<GetAdviceOn />} />

            <Route path="/live/:id" element={<LiveStreamingPage />} />
            <Route path="/profile" element={<UserProfileDropdown />} />

            <Route path="/yearly-horoscope" element={<MonthlyHoroscope />} />
            <Route path="/monthly-horoscope" element={<YearlyHoroscope />} />
            <Route path="/horoscope" element={<Horoscope />} />
            <Route path="/AstrologerChat" element={<AstrologerChat />} />
            <Route path="/WalletRecharge" element={<WalletRecharge />} />
            <Route path="/AstrologerCallModal" element={<AstrologerCallModal />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
      {/* Your app components */}
    </Provider>
  );
}

export default App;
