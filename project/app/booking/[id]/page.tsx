'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Checkbox } from '../../../components/ui/checkbox';
import { ArrowLeft, ChevronDown, Tag } from 'lucide-react';
import Search from '@/components/header/Search';
import { useBooking } from '@/context/BookingContext';
import toast, { Toaster } from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface PromoCode {
  _id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount: number | null;
  validFrom: string;
  validUntil: string;
  maxUses: number | null;
  usedCount: number;
  isActive: boolean;
}

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const { bookingData, setConfirmationData } = useBooking();
  const experienceId = params.id as string;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [showPromoDropdown, setShowPromoDropdown] = useState(false);
  const [loadingPromoCodes, setLoadingPromoCodes] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [termsError, setTermsError] = useState('');

  useEffect(() => {
    if (!bookingData) {
      router.push(`/experience/${experienceId}`);
    }
  }, [bookingData, experienceId, router]);

  useEffect(() => {
    const fetchPromoCodes = async () => {
      if (!bookingData) return;
      
      const currentSubtotal = bookingData.subtotal;
      
      setLoadingPromoCodes(true);
      try {
        const response = await fetch(`${API_URL}/api/promo`);
        const result = await response.json();
        
        if (result.success && result.data) {
          const now = new Date();
          const validCodes = result.data.filter((promo: PromoCode) => {
            const validFrom = new Date(promo.validFrom);
            const validUntil = new Date(promo.validUntil);
            
            return (
              promo.isActive &&
              now >= validFrom &&
              now <= validUntil &&
              currentSubtotal >= promo.minOrderValue
            );
          });
          
          setPromoCodes(validCodes);
        }
      } catch (error) {
        console.error('Error fetching promo codes:', error);
      } finally {
        setLoadingPromoCodes(false);
      }
    };

    fetchPromoCodes();
  }, [bookingData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showPromoDropdown && !target.closest('.promo-dropdown-container')) {
        setShowPromoDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPromoDropdown]);

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-[#F9F9F9]">
        <Search functional={false} />
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 px-4">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-[#FFD643] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-[#161616] text-lg font-medium">Redirecting...</p>
            <p className="text-[#656565] text-sm">No booking data found. Taking you back...</p>
            <p className="text-[#838383] text-xs font-mono mt-4">Experience ID: {experienceId}</p>
          </div>
        </div>
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
        toast.success(`${result.message} - You saved ₹${result.discount}!`, {
          duration: 4000,
          icon: '🎉',
        });
      } else {
        setDiscount(0);
        setPromoMessage(`❌ ${result.message}`);
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error validating promo code:', error);
      const errorMsg = error instanceof Error ? error.message : 'Network error';
      setPromoMessage(`❌ Failed to validate promo code: ${errorMsg}`);
      setDiscount(0);
      toast.error('Failed to validate promo code. Please try again.');
      
      console.error('Promo validation error details:', {
        promoCode: promoCode.toUpperCase(),
        orderAmount: subtotal,
        apiUrl: `${API_URL}/api/promo/validate`,
        error: errorMsg,
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handlePayAndConfirm = async () => {
    setNameError('');
    setEmailError('');
    setTermsError('');

    let hasErrors = false;

    if (!fullName.trim()) {
      setNameError('Please enter your full name');
      hasErrors = true;
    }

    if (!email.trim()) {
      setEmailError('Please enter your email address');
      hasErrors = true;
    } else if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email address');
      hasErrors = true;
    }

    if (!agreedToTerms) {
      setTermsError('You must agree to the terms and safety policy');
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    setIsCreatingBooking(true);
    toast.loading('Processing your booking...', { id: 'booking-process' });

    try {
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
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload)
      });

      const result = await response.json();
      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || 'Booking failed');
      }

      const bookingResult = result.data;
      if (!bookingResult.referenceId) {
        throw new Error('No reference ID received from server');
      }

      const confirmationPayload = {
        referenceId: bookingResult.referenceId,
        experienceName: bookingResult.experienceName || experienceName,
        bookingDate: bookingResult.bookingDate || date,
        bookingTime: bookingResult.bookingTime || time,
        quantity: bookingResult.quantity || quantity,
        total: bookingResult.total || total
      };

      setConfirmationData(confirmationPayload);
      
      // Dismiss loading toast and show success
      toast.success('Booking confirmed successfully!', { 
        id: 'booking-process',
        duration: 2000,
        icon: '✅',
      });
      
      setTimeout(() => {
        router.push('/confirmation');
      }, 500);

    } catch (error) {
      console.error('Booking error:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred';
      
      // Dismiss loading toast and show error
      toast.error(`Booking failed: ${errorMessage}`, {
        id: 'booking-process',
        duration: 5000,
      });

    } finally {
      // Reset loading state
      setIsCreatingBooking(false);
    }
  };

  if (isCreatingBooking) {
    return (
      <div className="min-h-screen bg-[#F9F9F9]">
        <Search functional={false} />
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 flex flex-col items-center gap-4 max-w-md w-full shadow-2xl">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-[#FFD643] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-[#161616] font-semibold text-lg sm:text-xl">Processing Your Booking</p>
              <p className="text-[#656565] text-sm">Please wait, do not close this page</p>
            </div>
            
            {/* Processing steps */}
            <div className="w-full mt-4 space-y-2 text-left">
              <div className="flex items-center gap-2 text-sm text-[#656565]">
                <div className="w-2 h-2 bg-[#FFD643] rounded-full animate-pulse"></div>
                <span>Validating booking details...</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#656565]">
                <div className="w-2 h-2 bg-[#FFD643] rounded-full animate-pulse delay-100"></div>
                <span>Checking slot availability...</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#656565]">
                <div className="w-2 h-2 bg-[#FFD643] rounded-full animate-pulse delay-200"></div>
                <span>Confirming your reservation...</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg w-full">
              <p className="text-xs text-yellow-800 text-center">
                ⚠️ Do not refresh or close this window
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#161616',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            style: {
              background: '#10b981',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10b981',
            },
          },
          error: {
            style: {
              background: '#ef4444',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#ef4444',
            },
          },
          loading: {
            style: {
              background: '#FFD643',
              color: '#161616',
            },
          },
        }}
      />
      <Search functional={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Link href={`/experience/${experienceId}`} className="flex items-center gap-2 mb-4 sm:mb-6">
          <div className="w-[20px] h-[20px] flex items-center justify-center">
            <ArrowLeft className="w-[13px] h-[13px] text-[#000000]" />
          </div>
          <span className="text-[#000000] font-medium text-sm leading-[18px]">
            Checkout
          </span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <div className="w-full lg:flex-1 lg:max-w-[739px]">
            <div className="bg-[#EFEFEF] rounded-xl px-4 sm:px-6 py-4 sm:py-5 flex flex-col gap-4">
              <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="w-full sm:flex-1 flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-[#5B5B5B] font-normal text-sm leading-[18px]">
                    Full name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (nameError) setNameError('');
                    }}
                    className={`w-full h-[42px] px-4 py-3 bg-[#DDDDDD] rounded-md outline-none text-[#161616] font-normal text-sm leading-[18px] placeholder:text-[#727272] ${
                      nameError ? 'border-2 border-red-500' : 'border-0'
                    }`}
                    required
                  />
                  {nameError && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <span>⚠️</span>
                      <span>{nameError}</span>
                    </p>
                  )}
                </div>

                <div className="w-full sm:flex-1 flex flex-col gap-2">
                  <label htmlFor="email" className="text-[#5B5B5B] font-normal text-sm leading-[18px]">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    className={`w-full h-[42px] px-4 py-3 bg-[#DDDDDD] rounded outline-none text-[#161616] font-normal text-sm leading-[18px] placeholder:text-[#727272] ${
                      emailError ? 'border-2 border-red-500' : 'border-0'
                    }`}
                    required
                  />
                  {emailError && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <span>⚠️</span>
                      <span>{emailError}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <div className="flex gap-2 sm:gap-3">
                  <div className="flex-1 relative">
                    <input
                      id="promoCode"
                      type="text"
                      placeholder="Promo code (optional)"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value.toUpperCase());
                        if (promoMessage && !promoMessage.startsWith('✅')) {
                          setPromoMessage('');
                        }
                      }}
                      className="w-full h-[42px] px-4 py-3 bg-[#DDDDDD] rounded-md border-0 outline-none text-[#161616] font-normal text-sm leading-[18px] placeholder:text-[#727272]"
                    />
                  </div>
                  
                  <div className="relative promo-dropdown-container">
                    <button
                      type="button"
                      onClick={() => setShowPromoDropdown(!showPromoDropdown)}
                      disabled={loadingPromoCodes || promoCodes.length === 0}
                      className="h-[42px] px-3 sm:px-4 bg-[#DDDDDD] rounded-md flex items-center justify-center gap-1 hover:bg-[#CCCCCC] active:bg-[#BBBBBB] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 border-0 outline-none"
                      title={promoCodes.length > 0 ? `View ${promoCodes.length} available promo codes` : "No promo codes available"}
                    >
                      <Tag className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#161616]" />
                      <ChevronDown className={`w-3 h-3 text-[#161616] transition-transform ${showPromoDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showPromoDropdown && promoCodes.length > 0 && (
                      <>
                        <div 
                          className="fixed inset-0 bg-black/30 z-40 sm:hidden"
                          onClick={() => setShowPromoDropdown(false)}
                        />
                        
                        <div className="fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 top-[180px] sm:top-[46px] w-auto sm:w-[340px] lg:w-[360px] bg-[#FAFAFA] rounded-lg shadow-xl border border-[#D9D9D9] z-50 max-h-[calc(100vh-200px)] sm:max-h-[420px] overflow-y-auto">
                        <div className="sticky top-0 p-3 sm:p-4 border-b border-[#D9D9D9] bg-[#EFEFEF] rounded-t-lg z-10">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm sm:text-base font-semibold text-[#161616]">Available Promo Codes</p>
                              <p className="text-xs text-[#656565] mt-0.5">Tap to apply instantly</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setShowPromoDropdown(false)}
                              className="sm:hidden w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#DDDDDD] transition-colors"
                              aria-label="Close"
                            >
                              <span className="text-[#161616] text-lg leading-none">×</span>
                            </button>
                          </div>
                        </div>
                        
                        <div className="py-1">
                          {promoCodes.map((promo) => {
                            const discountText = promo.discountType === 'percentage'
                              ? `${promo.discountValue}% OFF${promo.maxDiscount ? ` (max ₹${promo.maxDiscount})` : ''}`
                              : `₹${promo.discountValue} OFF`;
                            
                            return (
                              <button
                                key={promo._id}
                                type="button"
                                onClick={async () => {
                                  setPromoCode(promo.code);
                                  setShowPromoDropdown(false);
                                  setPromoMessage('');
                                  
                                  setIsApplyingPromo(true);
                                  try {
                                    const response = await fetch(`${API_URL}/api/promo/validate`, {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                      body: JSON.stringify({
                                        code: promo.code,
                                        orderAmount: subtotal
                                      })
                                    });

                                    const result = await response.json();

                                    if (result.success && result.valid) {
                                      setDiscount(result.discount);
                                      setPromoMessage(`✅ ${result.message} - Discount: ₹${result.discount}`);
                                      toast.success(`${result.message} - You saved ₹${result.discount}!`, {
                                        duration: 4000,
                                        icon: '🎉',
                                      });
                                    } else {
                                      setDiscount(0);
                                      setPromoMessage(`❌ ${result.message}`);
                                      toast.error(result.message);
                                    }
                                  } catch (error) {
                                    console.error('Error validating promo code:', error);
                                    setDiscount(0);
                                    toast.error('Failed to validate promo code. Please try again.');
                                  } finally {
                                    setIsApplyingPromo(false);
                                  }
                                }}
                                className="w-full px-3 sm:px-4 py-3 sm:py-3.5 hover:bg-[#EFEFEF] active:bg-[#E5E5E5] transition-colors text-left border-b border-[#E5E5E5] last:border-b-0"
                              >
                                <div className="flex flex-col gap-2">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="font-bold text-sm sm:text-base text-[#161616] font-mono tracking-wide">
                                      {promo.code}
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-[#161616] bg-[#FFD643] px-2 sm:px-2.5 py-1 rounded whitespace-nowrap">
                                      {discountText}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
                                    <span className="text-[#656565]">
                                      Min order: <span className="font-medium text-[#161616]">₹{promo.minOrderValue}</span>
                                    </span>
                                    {promo.maxUses && (
                                      <span className="text-[#838383] text-xs">
                                        {promo.maxUses - promo.usedCount} left
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      </>
                    )}
                  </div>
                  
                  <button 
                    onClick={handleApplyPromo}
                    disabled={isApplyingPromo}
                    className="w-[71px] sm:w-[80px] h-[42px] px-3 sm:px-4 py-3 bg-[#161616] rounded-lg flex items-center justify-center hover:bg-[#333333] transition-colors disabled:bg-[#666666] flex-shrink-0"
                  >
                    <span className="text-[#F9F9F9] font-medium text-sm leading-[18px]">
                      {isApplyingPromo ? '...' : 'Apply'}
                    </span>
                  </button>
                </div>
                
                {!showPromoDropdown && promoCodes.length > 0 && !promoMessage && (
                  <p className="text-xs sm:text-sm text-[#656565] flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#FFD643]" />
                    <span className="font-medium">{promoCodes.length} promo code{promoCodes.length !== 1 ? 's' : ''} available</span>
                  </p>
                )}
                
                {promoMessage && (
                  <p className={`text-xs flex items-center gap-1 ${
                    promoMessage.startsWith('✅') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {!promoMessage.startsWith('✅') && !promoMessage.startsWith('❌') && <span>⚠️</span>}
                    <span>{promoMessage}</span>
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => {
                      setAgreedToTerms(checked as boolean);
                      if (termsError && checked) setTermsError('');
                    }}
                    className={`w-[16px] h-[16px] flex-shrink-0 mt-0.5 ${
                      termsError ? 'border-2 border-red-500' : ''
                    }`}
                  />
                  <label
                    htmlFor="terms"
                    className="flex-1 text-[#5B5B5B] font-normal text-xs leading-4 cursor-pointer"
                  >
                    I agree to the terms and safety policy
                  </label>
                </div>
                {termsError && (
                  <p className="text-red-600 text-xs flex items-center gap-1 ml-6">
                    <span>⚠️</span>
                    <span>{termsError}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[387px] lg:flex-shrink-0">
            <div className="bg-[#EFEFEF] rounded-xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
              <div className="w-full flex flex-col gap-4">

                <div className="w-full flex flex-col gap-[10px]">
                  <div className="w-full flex items-center justify-between">
                    <span className="text-[#161616] font-normal text-sm sm:text-base leading-5">Experience</span>
                    <span className="text-[#161616] font-normal text-sm leading-5 text-right">{experienceName}</span>
                  </div>

                  <div className="w-full flex items-center justify-between">
                    <span className="text-[#161616] font-normal text-sm sm:text-base leading-5">Date</span>
                    <span className="text-[#161616] font-normal text-sm leading-5">{date}</span>
                  </div>

                  <div className="w-full flex items-center justify-between">
                    <span className="text-[#161616] font-normal text-sm sm:text-base leading-5">Time</span>
                    <span className="text-[#161616] font-normal text-sm leading-5">{time}</span>
                  </div>

                  <div className="w-full flex items-center justify-between">
                    <span className="text-[#161616] font-normal text-sm sm:text-base leading-5">Qty</span>
                    <span className="text-[#161616] font-normal text-sm leading-5">{quantity}</span>
                  </div>
                </div>


                <div className="w-full flex flex-col gap-[10px]">
                  <div className="flex justify-between">
                    <span className="text-[#161616] font-normal text-sm sm:text-base leading-5">Subtotal</span>
                    <span className="text-[#161616] font-normal text-sm sm:text-base leading-5">₹{subtotal}</span>
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


                <div className="w-full h-[1px] bg-[#D9D9D9]"></div>


                <div className="w-full flex items-center justify-between">
                  <span className="text-[#161616] font-medium text-lg sm:text-[20px] leading-6">Total</span>
                  <span className="text-[#161616] font-medium text-lg sm:text-[20px] leading-6">₹{total}</span>
                </div>
              </div>

              <button 
                onClick={handlePayAndConfirm}
                disabled={isCreatingBooking}
                className="w-full h-[44px] px-5 py-3 bg-[#FFD643] rounded-lg flex items-center justify-center hover:bg-[#FFC700] transition-colors disabled:bg-[#E0E0E0] disabled:cursor-not-allowed"
              >
                <span className="text-black font-semibold text-sm sm:text-base">
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
