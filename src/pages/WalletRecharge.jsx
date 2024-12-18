import { useState, useCallback } from "react";
import { Star, Phone, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPlans } from "../api/apiCalls";
const WalletRecharge = () => {
  // State management
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("UPI");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    data: getPlansData,
    isLoading,
    errors,
  } = useQuery({
    queryKey: ["Plans"],
    queryFn: getPlans,
  });

  console.log("getPlansData", getPlansData);

  // Astrologer data
  const astrologer = {
    name: "Akshayk",
    image:
      "https://cdn.anytimeastro.com/dashaspeaks/psychics/13ecd392-f1e7-4047-98ce-76600fe99498.png",
    minBalance: 5,
    minAmount: 22.0,
    currentBalance: 0,
  };

  // Featured packs data
  const featuredPacks = [
    {
      type: "Super Saver Pack",
      minutes: 15,
      discount: "5%",
      rating: 5,
      price: 627,
      originalPrice: 660,
      off: "5%",
    },
    {
      type: "Mega Saver Pack",
      minutes: 30,
      discount: "10%",
      rating: 5,
      price: 1188,
      originalPrice: 1320,
      off: "10%",
    },
  ];

  // Recharge plans data
  const rechargePlans = [
    { amount: 100, extra: "10% Extra" },
    { amount: 200, extra: "10% Extra" },
    { amount: 500, extra: "₹50.00 Extra", tag: "Most Popular" },
    { amount: 1000, extra: "5% Extra" },
    { amount: 1500, extra: "5% Extra" },
    { amount: 2000, extra: "15% Extra", tag: "Super Saver" },
    { amount: 4000, extra: "5% Extra" },
    { amount: 8000, extra: "5% Extra" },
    { amount: 15000, extra: "5% Extra" },
    { amount: 20000, extra: "5% Extra" },
    { amount: 50000, extra: "5% Extra" },
    { amount: 100000, extra: "5% Extra" },
  ];

  // Payment methods data
  const paymentMethods = [
    { id: "upi", name: "UPI", icon: "🔄" },
    { id: "card", name: "Debit/Credit Card", icon: "💳" },
    { id: "paytm", name: "Paytm Wallet + Postpaid", icon: "📱" },
    { id: "netbanking", name: "Net Banking", icon: "🏦" },
    { id: "phonepe", name: "Phone Pe", icon: "📱" },
    { id: "wallets", name: "Wallets", icon: "👛" },
  ];

  // Calculate order details based on selected amount and applied coupon
  const calculateOrderDetails = useCallback(() => {
    if (!selectedAmount) {
      return {
        planValue: 0,
        feesAndTaxes: 0,
        total: 0,
        cashback: {
          percentage: "0%",
          amount: "₹0.00 Extra",
        },
      };
    }

    const planValue = selectedAmount;
    const feesAndTaxes = Math.round(planValue * 0.18); // 18% GST
    let total = planValue + feesAndTaxes;
    let cashbackPercentage = "0%";
    let cashbackAmount = "₹0.00 Extra";

    // Apply coupon discount if valid
    if (appliedCoupon) {
      const discount = Math.round(total * (appliedCoupon.discount / 100));
      total -= discount;
    }

    // Calculate cashback based on amount
    if (planValue >= 2000) {
      cashbackPercentage = "15% cashback";
      cashbackAmount = `₹${Math.round(planValue * 0.15)} Extra`;
    } else if (planValue >= 500) {
      cashbackPercentage = "10% cashback";
      cashbackAmount = `₹${Math.round(planValue * 0.1)} Extra`;
    } else if (planValue >= 100) {
      cashbackPercentage = "5% cashback";
      cashbackAmount = `₹${Math.round(planValue * 0.05)} Extra`;
    }

    return {
      planValue,
      feesAndTaxes,
      total,
      cashback: {
        percentage: cashbackPercentage,
        amount: cashbackAmount,
      },
    };
  }, [selectedAmount, appliedCoupon]);

  // Handle amount selection
  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setError(""); // Clear any previous errors
  };

  // Handle payment method selection
  const handlePaymentSelect = (methodId) => {
    setSelectedPayment(methodId);
    setError(""); // Clear any previous errors
  };

  // Handle featured pack selection
  const handlePackSelect = (pack) => {
    setSelectedAmount(pack.price);
    setError(""); // Clear any previous errors
  };

  // Handle coupon code application
  const handleApplyCoupon = () => {
    setLoading(true);
    setError("");

    // Simulate API call to validate coupon
    setTimeout(() => {
      if (couponCode.toUpperCase() === "FIRST10") {
        setAppliedCoupon({
          code: couponCode,
          discount: 10,
          description: "10% off on your first recharge",
        });
      } else {
        setError("Invalid coupon code");
        setAppliedCoupon(null);
      }
      setLoading(false);
    }, 1000);
  };

  // Handle payment submission
  const handlePayment = async () => {
    if (!selectedAmount) {
      setError("Please select a recharge amount");
      return;
    }

    if (!selectedPayment) {
      setError("Please select a payment method");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate payment API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Handle successful payment
      alert("Payment successful! Your wallet has been recharged.");

      // Reset form
      setSelectedAmount(null);
      setCouponCode("");
      setAppliedCoupon(null);
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate current order details
  const orderDetails = calculateOrderDetails();

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-4 md:p-8">
        <div className="inline-block w-12 h-12 md:w-16 md:h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="ml-4 text-sm md:text-base">Loading...</p>
      </div>
    );

  if (errors)
    return (
      <div className="p-4 text-center text-red-500">
        <p className="text-sm md:text-base">Error: {error.message}</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="bg-red-500 text-white p-3 -mx-4 -mt-4 mb-6">
        <Link to="/" className="flex items-center gap-2">
          <span>›</span>
          <span>Wallet Recharge</span>
        </Link>
      </div>

      {/* Astrologer Profile */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={astrologer.image}
              alt={astrologer.name}
              className="w-24 h-24 rounded-full"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-full">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Exclusive Plans & Discounts By
              <span className="text-red-500 block md:inline">
                {" "}
                {astrologer.name}
              </span>
            </h1>
            <p className="text-gray-600 mt-2">
              A minimum wallet balance of {astrologer.minBalance} Minutes (₹
              {astrologer.minAmount}) is required to start session with{" "}
              {astrologer.name}.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Packs
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {getPlansData?.data.map((pack, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 relative cursor-pointer hover:border-red-500 transition-colors"
            onClick={() => handlePackSelect(pack)}
          >
            <div className="absolute -top-3 left-4">
              <span
                className={`${
                  pack.type === "Super Saver Pack"
                    ? "bg-purple-500"
                    : "bg-pink-500"
                } text-white px-4 py-1 rounded-full text-sm`}
              >
                {pack.type}
              </span>
            </div>
            <div className="absolute -top-3 right-4">
              <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm">
                {pack.off} Off
              </span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">
                    {pack.includesRemedies
                      ? "Included Remedies"
                      : "No Remedies"}
                  </h3>
                  <p className="text-gray-600">{pack.maxMessageSize}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">RATING</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="text-yellow-400 w-4 h-4 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 justify-end mt-1">
                    <span className="text-gray-600">{pack.questions}</span>
                    <Phone className="w-4 h-4" />
                    <span>questions</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-right">
                <span className="text-2xl font-bold">₹{pack.price}</span>
                <span className="text-gray-400 line-through ml-2">
                  ₹{pack.originalPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      {/* Other Recharge Plans */}
      <div className="mb-4 flex justify-between items-center max-w-6xl mx-auto">
        <h2 className="text-xl font-bold">
          Other Recharge Plans Available For You.
        </h2>
        <div className="text-red-500">
          Available Balance : ₹{astrologer.currentBalance}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
        {getPlansData?.data.map((plan, index) => (
          <div
            key={index}
            onClick={() => handleAmountSelect(plan.price)}
            className={`border rounded-lg p-4 cursor-pointer relative hover:border-red-500 transition-colors max-w-6xl ${
              selectedAmount === plan.price ? "border-red-500 bg-red-50" : ""
            }`}
          >
            {plan.tag && (
              <div className="absolute -top-3 right-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  {plan.tag}
                </span>
              </div>
            )}
            <div className="text-center">
              <div className="text-xl font-bold">₹{plan.price}</div>
              <div>
                <h3 className="text-md font-semibold">
                  {plan.includesRemedies ? "Included Remedies" : "No Remedies"}
                </h3>
                {/* <p className="text-gray-600">{plan.maxMessageSize}</p> */}
              </div>

              <div className="flex items-center gap-1 justify-center mt-1">
                <span className="text-gray-600">{plan.questions}</span>
                {/* <Phone className="w-4 h-4" /> */}
                <span>questions</span>
              </div>
              <div className="text-sm text-pink-500 mt-2">{plan.name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Payment Methods */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              Select your preferred payment method
            </h2>
            <span className="text-green-600 flex items-center gap-1">
              <Lock size={16} />
              PAY SAFELY
            </span>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => handlePaymentSelect(method.id)}
                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:border-red-500 transition-colors ${
                  selectedPayment === method.id
                    ? "border-red-500 bg-red-50"
                    : ""
                }`}
              >
                <span className="text-2xl">{method.icon}</span>
                <span className="flex-1">{method.name}</span>
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center">
                  {selectedPayment === method.id && (
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          {/* Coupon Code */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Coupon Code</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter Coupon Code"
                className="flex-1 p-2 border rounded-lg"
                disabled={loading}
              />
              <button
                onClick={handleApplyCoupon}
                disabled={!couponCode || loading}
                className="px-4 py-2 text-red-500 font-semibold disabled:opacity-50"
              >
                {loading ? "Applying..." : "Apply Now"}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            {appliedCoupon && (
              <p className="text-green-500 mt-2 text-sm">
                Coupon applied successfully! {appliedCoupon.description}
              </p>
            )}
          </div>

          {/* Order Summary */}
          <div className="mt-8 border-t pt-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between items-center mb-2">
              <span>Plan Value</span>
              <span>₹{orderDetails.planValue}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Fees & Taxes (18% GST)</span>
              <span>₹{orderDetails.feesAndTaxes}</span>
            </div>
            <div className="flex justify-between items-center mb-2 font-bold">
              <span>Total</span>
              <span>₹{orderDetails.total}</span>
            </div>
            <div className="flex justify-between items-center mt-4 text-green-500">
              <span>{orderDetails.cashback.percentage}</span>
              <span>{orderDetails.cashback.amount}</span>
            </div>
          </div>

          {/* Payment Button */}
          <div className="mt-8">
            <button
              className={`w-full py-3 rounded-lg text-white font-bold ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-red-500"
              }`}
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to Pay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletRecharge;
