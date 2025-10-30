'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import Search from '@/components/header/Search';
import { useBooking } from '@/context/BookingContext';

export default function ConfirmationPage() {
  const router = useRouter();
  const { confirmationData, clearConfirmationData, clearBookingData, isConfirmationReady } = useBooking();

  console.log('Confirmation page rendered');
  console.log('isConfirmationReady:', isConfirmationReady);
  console.log('confirmationData:', confirmationData);
  useEffect(() => {
    console.log('Checking confirmation ready:', isConfirmationReady);
    if (!isConfirmationReady) {
      console.log('No confirmation data, redirecting to home');
      router.push('/');
    }
  }, [isConfirmationReady, router]);

  const handleBackToHome = () => {
    clearBookingData();
    clearConfirmationData();
    router.push('/');
  };

  if (!isConfirmationReady || !confirmationData) {
    return null;
  }

  const { referenceId } = confirmationData;

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Search functional={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] flex items-center justify-center mb-4 sm:mb-6">
            <div className="w-[55px] h-[55px] sm:w-[70px] sm:h-[70px] bg-[#24AC39] rounded-full flex items-center justify-center">
              <Check className="w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] text-white stroke-[3] sm:stroke-[4]" />
            </div>
          </div>

          <h1 className="text-[#161616] font-medium text-2xl sm:text-[32px] leading-tight sm:leading-[40px] mb-3 sm:mb-4 px-4">
            Booking Confirmed
          </h1>
          
          <p className="text-[#656565] font-normal text-base sm:text-[20px] leading-6 mb-8 sm:mb-10 px-4">
            Ref ID: {referenceId}
          </p>

          <button 
            onClick={handleBackToHome}
            className="w-full max-w-[200px] sm:w-[138px] h-[40px] sm:h-[36px] px-4 py-2 bg-[#E3E3E3] rounded flex items-center justify-center hover:bg-[#D0D0D0] transition-colors"
          >
            <span className="text-[#656565] font-normal text-sm sm:text-base leading-5">
              Back to Home
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}
