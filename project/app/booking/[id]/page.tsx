'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Checkbox } from '../../../components/ui/checkbox';
import { ArrowLeft } from 'lucide-react';
import Search from '@/components/header/Search';
import { useBooking } from '@/context/BookingContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const { bookingData, setConfirmationData } = useBooking();
  const experienceId = params.id as string;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);

  // Redirect if no booking data
  useEffect(() => {
    if (!bookingData) {
      router.push(`/experience/${experienceId}`);
    }
  }, [bookingData, experienceId, router]);

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <p className="text-[#161616]">Loading...</p>
      </div>
    );
  }

  const { experienceName, date, time, quantity, subtotal, taxes, total: initialTotal } = bookingData;
  const total = initialTotal - discount;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoMessage('Please enter a promo code');
      return;
    }

    setIsApplyingPromo(true);
    setPromoMessage('');

    try {
      const response = await fetch(`${API_URL}/api/promo/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: promoCode.toUpperCase(),
          orderAmount: subtotal
        })
      });

      const result = await response.json();

      if (result.success && result.valid) {
        setDiscount(result.discount);
        setPromoMessage(`✅ ${result.message} - Discount: ₹${result.discount}`);
      } else {
        setDiscount(0);
        setPromoMessage(`❌ ${result.message}`);
      }
    } catch (error) {
      console.error('Error validating promo code:', error);
      setPromoMessage('❌ Failed to validate promo code');
      setDiscount(0);
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handlePayAndConfirm = async () => {
    // Validate required fields
    if (!fullName.trim()) {
      alert('Please enter your full name');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    if (!agreedToTerms) {
      alert('Please agree to the terms and safety policy');
      return;
    }

    // Set loading state
    setIsCreatingBooking(true);

    try {
      // Step 1: Create booking payload
      const bookingPayload = {
        experienceId,
        customerName: fullName,
        customerEmail: email.toLowerCase(),
        bookingDate: date,
        bookingTime: time,
        quantity,
        subtotal,
        taxes,
        total,
        promoCode: discount > 0 ? promoCode.toUpperCase() : undefined,
        agreedToTerms
      };
      console.log('Booking payload:', bookingPayload);
      // Step 2: Make API request and wait for response
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload)
      });

      // Step 3: Parse response
      const result = await response.json();
        console.log('Booking response:', result);
      // Step 4: Check if booking was successful
      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || 'Booking failed');
      }

      // Step 5: Extract booking data from response
      const bookingResult = result.data;
      console.log('Booking successful:', bookingResult);
      // Step 6: Validate that we have a reference ID
      if (!bookingResult.referenceId) {
        throw new Error('No reference ID received from server');
      }

      // Step 7: Prepare confirmation data
      const confirmationPayload = {
        referenceId: bookingResult.referenceId,
        experienceName: bookingResult.experienceName || experienceName,
        bookingDate: bookingResult.bookingDate || date,
        bookingTime: bookingResult.bookingTime || time,
        quantity: bookingResult.quantity || quantity,
        total: bookingResult.total || total
      };
      console.log('Confirmation payload:', confirmationPayload);
      // Step 8: Set confirmation data in context
      setConfirmationData(confirmationPayload);
      console.log('Confirmation data set in context');
      // Step 9: Navigate to confirmation page (DON'T clear booking data yet)
      setTimeout(() => {
      console.log('Navigating to confirmation page');
      router.push('/confirmation');
      }, 100);

    } catch (error) {
      // Handle any errors
      console.error('Booking error:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred';
      
      alert(`Booking failed: ${errorMessage}`);
      
    } finally {
      // Reset loading state
      setIsCreatingBooking(false);
    }
  };

  // Show loading overlay when creating booking
  if (isCreatingBooking) {
    return (
      <div className="min-h-screen bg-[#F9F9F9]">
        <Search functional={false} />
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-[#FFD643] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#161616] font-medium text-lg">Processing your booking...</p>
            <p className="text-[#656565] text-sm">Please wait, do not close this page</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Search functional={false} />

      <main className="max-w-[1366px] mx-auto px-4 py-6">
        <Link href={`/experience/${experienceId}`} className="w-[93px] h-[20px] flex items-center gap-2 mb-6">
          <div className="w-[20px] h-[20px] flex items-center justify-center">
            <ArrowLeft className="w-[13px] h-[13px] text-[#000000]" />
          </div>
          <span className="h-[18px] text-[#000000] font-medium text-sm leading-[18px]">
            Checkout
          </span>
        </Link>

        <div className="flex gap-6">
          {/* Left Column - Form */}
          <div className="w-[739px]">
            <div className="bg-[#EFEFEF] rounded-xl px-6 py-5 flex flex-col gap-4">
              <div className="w-[691px] h-[68px] flex gap-6">
                <div className="w-[333.5px] h-[68px] flex flex-col gap-2">
                  <label htmlFor="fullName" className="h-[18px] text-[#5B5B5B] font-normal text-sm leading-[18px]">
                    Full name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-[333.5px] h-[42px] px-4 py-3 bg-[#DDDDDD] rounded-md border-0 outline-none text-[#161616] font-normal text-sm leading-[18px] placeholder:text-[#727272]"
                    required
                  />
                </div>

                <div className="w-[333.5px] h-[68px] flex flex-col gap-2">
                  <label htmlFor="email" className="h-[18px] text-[#5B5B5B] font-normal text-sm leading-[18px]">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[333.5px] h-[42px] px-4 py-3 bg-[#DDDDDD] rounded border-0 outline-none text-[#161616] font-normal text-sm leading-[18px] placeholder:text-[#727272]"
                    required
                  />
                </div>
              </div>

              <div className="w-[691px] flex flex-col gap-2">
                <div className="flex gap-4">
                  <input
                    id="promoCode"
                    type="text"
                    placeholder="Promo code (optional)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="w-[604px] h-[42px] px-4 py-3 bg-[#DDDDDD] rounded-md border-0 outline-none text-[#161616] font-normal text-sm leading-[18px] placeholder:text-[#727272]"
                  />
                  <button 
                    onClick={handleApplyPromo}
                    disabled={isApplyingPromo}
                    className="w-[71px] h-[42px] px-4 py-3 bg-[#161616] rounded-lg flex items-center justify-center hover:bg-[#333333] transition-colors disabled:bg-[#666666]"
                  >
                    <span className="text-[#F9F9F9] font-medium text-sm leading-[18px]">
                      {isApplyingPromo ? '...' : 'Apply'}
                    </span>
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-xs ${promoMessage.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
                    {promoMessage}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="w-[16px] h-[16px] flex-shrink-0 mt-0.5"
                />
                <label
                  htmlFor="terms"
                  className="flex-1 text-[#5B5B5B] font-normal text-xs leading-4 cursor-pointer"
                >
                  I agree to the terms and safety policy
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="w-[387px]">
            <div className="bg-[#EFEFEF] rounded-xl p-6 flex flex-col gap-6">
              <div className="w-[339px] flex flex-col gap-4">
                {/* Experience, Date, Time, Qty */}
                <div className="w-[339px] flex flex-col gap-[10px]">
                  <div className="w-[339px] h-[20px] flex items-center justify-between">
                    <span className="text-[#161616] font-normal text-base leading-5">Experience</span>
                    <span className="text-[#161616] font-normal text-sm leading-5">{experienceName}</span>
                  </div>

                  <div className="w-[339px] h-[20px] flex items-center justify-between">
                    <span className="text-[#161616] font-normal text-base leading-5">Date</span>
                    <span className="text-[#161616] font-normal text-sm leading-5">{date}</span>
                  </div>

                  <div className="w-[339px] h-[20px] flex items-center justify-between">
                    <span className="text-[#161616] font-normal text-base leading-5">Time</span>
                    <span className="text-[#161616] font-normal text-sm leading-5">{time}</span>
                  </div>

                  <div className="w-[339px] h-[20px] flex items-center justify-between">
                    <span className="text-[#161616] font-normal text-base leading-5">Qty</span>
                    <span className="text-[#161616] font-normal text-sm leading-5">{quantity}</span>
                  </div>
                </div>

                {/* Subtotal and Taxes */}
                <div className="w-[339px] flex flex-col gap-[10px]">
                  <div className="flex justify-between">
                    <span className="text-[#161616] font-normal text-base leading-5">Subtotal</span>
                    <span className="text-[#161616] font-normal text-base leading-5">₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#161616] font-normal text-sm leading-5">Taxes</span>
                    <span className="text-[#161616] font-normal text-sm leading-5">₹{taxes}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-green-600 font-normal text-sm leading-5">Discount</span>
                      <span className="text-green-600 font-normal text-sm leading-5">-₹{discount}</span>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="w-[339px] h-[1px] bg-[#D9D9D9]"></div>

                {/* Total */}
                <div className="w-[339px] h-[24px] flex items-center justify-between">
                  <span className="text-[#161616] font-medium text-[20px] leading-6">Total</span>
                  <span className="text-[#161616] font-medium text-[20px] leading-6">₹{total}</span>
                </div>
              </div>

              <button 
                onClick={handlePayAndConfirm}
                disabled={isCreatingBooking}
                className="w-[339px] h-[44px] px-5 py-3 bg-[#FFD643] rounded-lg flex items-center justify-center hover:bg-[#FFC700] transition-colors disabled:bg-[#E0E0E0] disabled:cursor-not-allowed"
              >
                <span className="text-black font-semibold text-base">
                  {isCreatingBooking ? 'Processing...' : 'Pay and Confirm'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
