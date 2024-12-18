
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../redux/auth/authSlice"; // Import login action
import { Mail, Lock, ArrowRight, RotateCcw } from "lucide-react";
import { useMutation } from "@tanstack/react-query"; // Import useMutation
import { requestEmailOTP, verifyOTP } from "../../api/apiCalls"; // Import the functions


const EmailOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(30); // Cooldown period in seconds

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutateAsync: sendOTP, isLoading: isSendingOTP } = useMutation({
    mutationFn: requestEmailOTP,
    onSuccess: () => {
      setIsOTPSent(true);
      setIsResendDisabled(true);
      toast.success('OTP sent to your email!');
    },
    onError: (error) => {
      toast.error(error?.message || 'Error sending OTP');
    },
  });
  
  const { mutateAsync: verifyUserOTP, isLoading: isVerifyingOTP } = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      const { token } = data; // Extract token from the response
      localStorage.setItem("token", token); // Save token to localStorage
      dispatch(login({ email, token })); // Update Redux state with user and token
      toast.success("OTP verified! Logging in...");
      navigate("/"); // Redirect to the home page
    },
    onError: (error) => {
      toast.error(error?.message || "Invalid OTP. Please try again.");
    },
  });
  

  // Handle resend OTP timer
  useEffect(() => {
    let timer;
    if (isResendDisabled && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setIsResendDisabled(false);
      setResendTimer(30); // Reset timer
    }
    return () => clearInterval(timer);
  }, [isResendDisabled, resendTimer]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (email) {
      await sendOTP({ email });
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  const handleResendOTP = async () => {
    await sendOTP({ email });
    setIsResendDisabled(true);
    toast.info("OTP resent to your email!");
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    if (otp) {
      await verifyUserOTP({ email, otp });
    } else {
      toast.error("Please enter the OTP.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Email Verification
      </h2>
      <p className="mb-6 text-center text-gray-600">
        Enter your email to receive a One-Time Password (OTP).
      </p>
      <form onSubmit={handleSendOTP} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">
            Email
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <div className="px-4 py-2 text-gray-600">
              <Mail size={20} />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        {!isOTPSent && (
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition-colors"
            disabled={isSendingOTP}
          >
            {isSendingOTP ? "Sending OTP..." : "Get OTP"}
          </button>
        )}
      </form>

      {isOTPSent && (
        <div className="mt-6">
          <form onSubmit={handleSubmitOTP} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block mb-2 text-gray-700 font-medium">
                OTP
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <div className="px-4 py-2 text-gray-600">
                  <Lock size={20} />
                </div>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg outline-none"
                  placeholder="Enter the OTP"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center"
              disabled={isVerifyingOTP}
            >
              {isVerifyingOTP ? "Verifying..." : "Verify OTP"}
              <ArrowRight size={20} className="ml-2" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={handleResendOTP}
              disabled={isResendDisabled}
              className={`${
                isResendDisabled
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center`}
            >
              <RotateCcw size={20} className="mr-2" />
              {isResendDisabled
                ? `Resend OTP in ${resendTimer}s`
                : "Resend OTP"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailOTP;
