'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import Search from '@/components/header/Search';

export default function ExperienceDetails() {
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState('Oct 22');
  const [selectedTime, setSelectedTime] = useState('07:00 am');

  const basePrice = 999;
  const taxRate = 0.059;
  const subtotal = basePrice * quantity;
  const taxes = Math.round(subtotal * taxRate);
  const total = subtotal + taxes;

  const dates = ['Oct 22', 'Oct 23', 'Oct 24', 'Oct 25', 'Oct 26'];
  const times = [
    { time: '07:00 am', slots: 4 },
    { time: '9:00 am', slots: 2 },
    { time: '11:00 am', slots: 3 },
    { time: '1:00 pm', slots: 0 },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Search functional={false} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-[8px] w-[74px] h-[20px]"
        >
          <div className="relative w-[20px] h-[20px]">
            <ArrowLeft 
              className="absolute w-[12.985px] h-[12.645px] top-[3.67px] left-[3.68px]" 
            />
          </div>
          <span 
            className="font-medium text-[#000000] text-[14px] leading-[18px] w-[46px] h-[18px]"
          >
            Details
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div 
              className="relative rounded-xl overflow-hidden mb-8 w-[765px] h-[381px]"
            >
              <Image
                src="https://images.pexels.com/photos/1497225/pexels-photo-1497225.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Kayaking"
                fill
                className="object-cover"
              />
            </div>

            <div 
              className="flex flex-col w-[765px] h-[406px] gap-[32px]"
            >
              <div 
                className="flex flex-col w-[765px] h-[96px] gap-[16px]"
              >
                <h1 className="text-3xl font-bold">Kayaking</h1>
                <p className="text-gray-600">
                  Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.
                </p>
              </div>

              <div 
                className="flex flex-col w-[765px] h-[278px] gap-[24px]"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-4">Choose date</h2>
                  <div className="flex gap-3 flex-wrap">
                    {dates.map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`px-5 py-2 rounded border transition-colors ${
                          selectedDate === date
                            ? 'bg-[#FFD643] border-[#FFD643] text-black font-medium'
                            : 'bg-white border-gray-300 text-[#838383] hover:border-gray-400'
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Choose time</h2>
                  <div className="flex gap-3 flex-wrap">
                    {times.map((timeSlot) => (
                      <button
                        key={timeSlot.time}
                        onClick={() =>
                          timeSlot.slots > 0 && setSelectedTime(timeSlot.time)
                        }
                        disabled={timeSlot.slots === 0}
                        className={`px-5 py-2 rounded border transition-colors relative ${
                          selectedTime === timeSlot.time
                            ? 'bg-[#FFD643] border-[#FFD643] text-black font-medium'
                            : timeSlot.slots === 0
                            ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'bg-white border-gray-300 text-[#838383] hover:border-gray-400'
                        }`}
                      >
                        {timeSlot.time}
                        {timeSlot.slots > 0 && timeSlot.slots <= 4 && (
                          <span
                            className={`ml-2 text-xs ${
                              selectedTime === timeSlot.time
                                ? 'text-red-600'
                                : 'text-red-500'
                            }`}
                          >
                            {timeSlot.slots} left
                          </span>
                        )}
                        {timeSlot.slots === 0 && (
                          <span className="ml-2 text-xs text-gray-500">
                            Sold out
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    All times are in IST (GMT +5:30)
                  </p>
                </div>

                <div className="w-[765px] h-[66px] gap-[12px] flex flex-col">
                  <h2 className="text-xl font-semibold">About</h2>
                  <div className="w-[765px] h-[32px] rounded gap-[10px] pt-[8px] pr-[12px] pb-[8px] pl-[12px] bg-[#EEEEEE]">
                    <p className="text-[#838383] text-[12px] leading-[16px] font-normal">
                      Scenic routes, trained guides, and safety briefing. Minimum age 10.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div 
              className="bg-white rounded-xl p-[24px] w-[387px] h-[303px] gap-[24px]"
            >
              <div 
                className="flex flex-col w-[339px] h-[187px] gap-[16px]"
              >
                {/* Starts at */}
                <div 
                  className="flex justify-between items-center w-[339px] h-[20px]"
                >
                  <span 
                    className="text-[#656565] text-[16px] leading-[20px] font-normal w-[65px] h-[20px]"
                  >
                    Starts at
                  </span>
                  <span 
                    className="text-[#161616] text-[18px] font-medium"
                  >
                    ₹{basePrice}
                  </span>
                </div>

                {/* Quantity */}
                <div 
                  className="flex justify-between items-center w-[339px] h-[20px]"
                >
                  <span 
                    className="text-[#656565] text-[16px] leading-[20px] font-normal"
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

                {/* Subtotal */}
                <div 
                  className="flex justify-between items-center w-[339px] h-[20px]"
                >
                  <span 
                    className="text-[#656565] text-[16px] leading-[20px] font-normal"
                  >
                    Subtotal
                  </span>
                  <span 
                    className="text-[#161616] text-[14px] font-normal"
                  >
                    ₹{subtotal}
                  </span>
                </div>

                {/* Taxes */}
                <div 
                  className="flex justify-between items-center w-[339px] h-[20px]"
                >
                  <span 
                    className="text-[#656565] text-[16px] leading-[20px] font-normal"
                  >
                    Taxes
                  </span>
                  <span 
                    className="text-[#161616] text-[14px] font-normal"
                  >
                    ₹{taxes}
                  </span>
                </div>

                {/* Total */}
                <div 
                  className="flex justify-between items-center w-[339px] h-[24px]"
                >
                  <span 
                    className="text-[#161616] text-[20px] leading-[24px] font-medium w-[48px] h-[24px]"
                  >
                    Total
                  </span>
                  <span 
                    className="text-[#161616] text-[20px] leading-[24px] font-medium"
                  >
                    ₹{total}
                  </span>
                </div>
              </div>

              {/* Confirm Button */}
              <Link href="/booking" className="block mt-[24px]">
                <button 
                  className="group rounded-lg bg-[#D7D7D7] hover:bg-[#FFD643] transition-colors flex items-center justify-center w-[339px] h-[44px] px-[20px] py-[12px]"
                >
                  <span 
                    className="text-[#7F7F7F] group-hover:text-[#161616] text-[16px] leading-[20px] transition-colors font-medium"
                  >
                    Confirm
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
