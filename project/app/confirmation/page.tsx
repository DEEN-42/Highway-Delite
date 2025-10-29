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
  // Redirect if no confirmation data is ready
  useEffect(() => {
    console.log('Checking confirmation ready:', isConfirmationReady);
    if (!isConfirmationReady) {
      console.log('No confirmation data, redirecting to home');
      router.push('/');
    }
  }, [isConfirmationReady, router]);

  // Handle back to home button click
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

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-[80px] h-[80px] flex items-center justify-center mb-6">
            <div className="w-[70px] h-[70px] bg-[#24AC39] rounded-full flex items-center justify-center">
              <Check className="w-[45px] h-[45px] text-white stroke-[4]" />
            </div>
          </div>

          <h1 className="h-[40px] text-[#161616] font-medium text-[32px] leading-[40px] mb-4">
            Booking Confirmed
          </h1>
          
          <p className="w-[175px] h-[24px] text-[#656565] font-normal text-[20px] leading-6 mb-10">
            Ref ID: {referenceId}
          </p>

          <button 
            onClick={handleBackToHome}
            className="w-[138px] h-[36px] px-4 py-2 bg-[#E3E3E3] rounded flex items-center justify-center hover:bg-[#D0D0D0] transition-colors"
          >
            <span className="text-[#656565] font-normal text-base leading-5">
              Back to Home
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}
