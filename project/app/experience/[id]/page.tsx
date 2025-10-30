'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import Search from '@/components/header/Search';
import { useBooking } from '@/context/BookingContext';
import toast, { Toaster } from 'react-hot-toast';
import { formatDateForDisplay } from '@/lib/dateUtils';

interface TimeSlot {
  time: string;
  slots: number;
}

interface AvailableDate {
  date: string;
  times: TimeSlot[];
}

interface ExperienceData {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  taxRate: number;
  image: string;
  category: string;
  aboutText: string;
  minAge: number;
  duration: string;
  availability: AvailableDate[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ExperienceDetails() {
  const params = useParams();
  const router = useRouter();
  const { setBookingData } = useBooking();
  const id = params.id as string;

  const [experience, setExperience] = useState<ExperienceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/experiences/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch experience details');
        }

        const result = await response.json();
        
        if (result.success && result.data) {
          setExperience(result.data);
        } else {
          throw new Error('Invalid API response');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchExperience();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F9F9]">
        <Search functional={false} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-[#FFD643] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-[#161616] text-lg font-medium">Loading Experience Details</p>
              <p className="text-[#656565] text-sm">Please wait while we fetch the information...</p>
              <p className="text-[#838383] text-xs font-mono mt-4">Experience ID: {id}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen bg-[#F9F9F9]">
        <Search functional={false} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="text-center space-y-2 max-w-md">
              <p className="text-red-600 text-xl font-semibold">Error Loading Experience</p>
              <p className="text-[#656565] text-sm">{error || 'Experience not found or no longer available'}</p>
              
              <button
                onClick={() => router.push('/')}
                className="mt-6 px-6 py-3 bg-[#FFD643] text-[#161616] rounded-lg font-medium hover:bg-[#ffd020] transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const taxRate = experience.taxRate;
  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * taxRate);
  const total = subtotal + taxes;

  const selectedDateData = experience.availability.find(d => d.date === selectedDate);
  const availableTimes = selectedDateData?.times || [];

  const handleConfirm = () => {
    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }

    if (!selectedTime) {
      toast.error('Please select a time slot');
      return;
    }

    if (!experience) return;

    const taxRate = experience.taxRate;
    const subtotal = experience.price * quantity;
    const taxes = Math.round(subtotal * taxRate);
    const total = subtotal + taxes;

    // Store booking data in context
    setBookingData({
      experienceId: experience._id,
      experienceName: experience.title,
      date: selectedDate,
      time: selectedTime,
      quantity,
      subtotal,
      taxes,
      total
    });

    setTimeout(() => {
      router.push(`/booking/${experience._id}`);
    }, 500);
  };

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
          },
          error: {
            style: {
              background: '#ef4444',
              color: '#fff',
            },
          },
        }}
      />
      <Search functional={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-[8px] mb-4 sm:mb-6"
        >
          <div className="relative w-[20px] h-[20px]">
            <ArrowLeft 
              className="absolute w-[12.985px] h-[12.645px] top-[3.67px] left-[3.68px]" 
            />
          </div>
          <span 
            className="font-medium text-[#000000] text-[14px] leading-[18px]"
          >
            Details
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div 
              className="relative rounded-xl overflow-hidden mb-6 sm:mb-8 w-full h-[250px] sm:h-[350px] lg:h-[381px]"
            >
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                className="object-cover"
              />
            </div>

            <div 
              className="flex flex-col w-full gap-6 sm:gap-8"
            >
              <div 
                className="flex flex-col w-full gap-[16px]"
              >
                <h1 className="text-2xl sm:text-3xl font-bold">{experience.title}</h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  {experience.description}
                </p>
              </div>

              <div 
                className="flex flex-col w-full gap-[24px]"
              >
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Choose date</h2>
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    {experience.availability.map((dateData) => (
                      <button
                        key={dateData.date}
                        onClick={() => {
                          setSelectedDate(dateData.date);
                          setSelectedTime('');
                        }}
                        className={`px-3 sm:px-5 py-2 rounded border transition-colors text-sm sm:text-base ${
                          selectedDate === dateData.date
                            ? 'bg-[#FFD643] border-[#FFD643] text-black font-medium'
                            : 'bg-white border-gray-300 text-[#838383] hover:border-gray-400'
                        }`}
                      >
                        {formatDateForDisplay(dateData.date)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Choose time</h2>
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    {availableTimes.map((timeSlot) => (
                      <button
                        key={timeSlot.time}
                        onClick={() =>
                          timeSlot.slots > 0 && setSelectedTime(timeSlot.time)
                        }
                        disabled={timeSlot.slots === 0}
                        className={`min-w-[140px] px-3 sm:px-4 py-2 rounded border transition-colors flex items-center justify-center text-sm sm:text-base ${
                          selectedTime === timeSlot.time
                            ? 'bg-[#FFD643] border-[#FFD643] text-black font-medium'
                            : timeSlot.slots === 0
                            ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'bg-white border-gray-300 text-[#838383] hover:border-gray-400'
                        }`}
                      >
                        <span className="whitespace-nowrap">{timeSlot.time}</span>
                        {timeSlot.slots > 0 && timeSlot.slots <= 5 && (
                          <span
                            className={`ml-1 sm:ml-2 text-xs whitespace-nowrap ${
                              selectedTime === timeSlot.time
                                ? 'text-red-600'
                                : 'text-red-500'
                            }`}
                          >
                            {timeSlot.slots} left
                          </span>
                        )}
                        {timeSlot.slots === 0 && (
                          <span className="ml-1 sm:ml-2 text-xs text-gray-500 whitespace-nowrap">
                            Sold out
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3">
                    All times are in IST (GMT +5:30)
                  </p>
                </div>

                <div className="w-full gap-[12px] flex flex-col">
                  <h2 className="text-lg sm:text-xl font-semibold">About</h2>
                  <div className="w-full rounded gap-[10px] pt-[8px] pr-[12px] pb-[8px] pl-[12px] bg-[#EEEEEE]">
                    <p className="text-[#838383] text-[12px] leading-[16px] font-normal break-words">
                      {experience.aboutText} Minimum age {experience.minAge}. Duration: {experience.duration}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div 
              className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-[387px] mx-auto lg:mx-0"
            >
              <div 
                className="flex flex-col w-full gap-[16px]"
              >
                <div 
                  className="flex justify-between items-center w-full"
                >
                  <span 
                    className="text-[#656565] text-sm sm:text-[16px] leading-[20px] font-normal"
                  >
                    Starts at
                  </span>
                  <span 
                    className="text-[#161616] text-base sm:text-[18px] font-medium"
                  >
                    ₹{experience.price}
                  </span>
                </div>

                <div 
                  className="flex justify-between items-center w-full"
                >
                  <span 
                    className="text-[#656565] text-sm sm:text-[16px] leading-[20px] font-normal"
                  >
                    Quantity
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-[16px] h-[16px] rounded flex items-center justify-center hover:bg-gray-50 border-[0.4px] border-[#C9C9C9]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span 
                      className="w-8 text-center text-[#161616] text-[12px] font-normal"
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-[16px] h-[16px] rounded flex items-center justify-center hover:bg-gray-50 border-[0.4px] border-[#C9C9C9]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div 
                  className="flex justify-between items-center w-full"
                >
                  <span 
                    className="text-[#656565] text-sm sm:text-[16px] leading-[20px] font-normal"
                  >
                    Subtotal
                  </span>
                  <span 
                    className="text-[#161616] text-sm sm:text-[14px] font-normal"
                  >
                    ₹{subtotal}
                  </span>
                </div>

                <div 
                  className="flex justify-between items-center w-full"
                >
                  <span 
                    className="text-[#656565] text-sm sm:text-[16px] leading-[20px] font-normal"
                  >
                    Taxes
                  </span>
                  <span 
                    className="text-[#161616] text-sm sm:text-[14px] font-normal"
                  >
                    ₹{taxes}
                  </span>
                </div>

                <div 
                  className="flex justify-between items-center w-full"
                >
                  <span 
                    className="text-[#161616] text-lg sm:text-[20px] leading-[24px] font-medium"
                  >
                    Total
                  </span>
                  <span 
                    className="text-[#161616] text-lg sm:text-[20px] leading-[24px] font-medium"
                  >
                    ₹{total}
                  </span>
                </div>
              </div>

              <button 
                onClick={handleConfirm}
                disabled={!selectedDate || !selectedTime}
                className="group rounded-lg bg-[#D7D7D7] hover:bg-[#FFD643] transition-colors flex items-center justify-center w-full h-[44px] px-[20px] py-[12px] mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span 
                  className="text-[#7F7F7F] group-hover:text-[#161616] text-sm sm:text-[16px] leading-[20px] transition-colors font-medium"
                >
                  Confirm
                </span>
              </button>
              
              {(!selectedDate || !selectedTime) && (
                <p className="text-xs text-[#838383] text-center mt-2">
                  {!selectedDate && !selectedTime 
                    ? 'Please select a date and time to continue'
                    : !selectedDate 
                    ? 'Please select a date'
                    : 'Please select a time slot'}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
