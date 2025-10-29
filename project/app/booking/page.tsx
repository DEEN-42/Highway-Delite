'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Checkbox } from '../../components/ui/checkbox';
import { ArrowLeft } from 'lucide-react';
import Search from '@/components/header/Search';

export default function BookingPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // Booking details
  const experience = 'Kayaking';
  const date = '2025-10-22';
  const time = '09:00 am';
  const quantity = 1;
  const subtotal = 999;
  const taxes = 59;
  const total = 958;

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Search />

      <main className="max-w-[1366px] mx-auto px-4 py-6">
        <Link href="/" className="w-[93px] h-[20px] flex items-center gap-2 mb-6">
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
            <div className="h-[198px] bg-[#EFEFEF] rounded-xl px-6 py-5 flex flex-col gap-4">
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
                  />
                </div>
              </div>

              <div className="w-[691px] h-[42px] flex gap-4">
                <input
                  id="promoCode"
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-[604px] h-[42px] px-4 py-3 bg-[#DDDDDD] rounded-md border-0 outline-none text-[#161616] font-normal text-sm leading-[18px] placeholder:text-[#727272]"
                />
                <button className="w-[71px] h-[42px] px-4 py-3 bg-[#161616] rounded-lg flex items-center justify-center">
                  <span className="text-[#F9F9F9] font-medium text-sm leading-[18px]">
                    Apply
                  </span>
                </button>
              </div>

              <div className="w-[236px] h-[16px] flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="w-[16px] h-[16px] flex-shrink-0"
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
            <div className="h-[349px] bg-[#EFEFEF] rounded-xl p-6 flex flex-col gap-6">
              <div className="w-[339px] h-[233px] flex flex-col gap-4">
                {/* Experience, Date, Time, Qty */}
                <div className="w-[339px] h-[110px] flex flex-col gap-[10px]">
                  <div className="w-[339px] h-[20px] flex items-center justify-between">
                    <span className="w-[84px] h-[20px] text-[#161616] font-normal text-base leading-5">Experience</span>
                    <span className="text-[#161616] font-normal text-sm leading-5">Kayaking</span>
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
                <div className="w-[339px] h-[50px] flex flex-col gap-[10px]">
                  <div className="flex justify-between">
                    <span className="text-[#161616] font-normal text-base leading-5">Subtotal</span>
                    <span className="text-[#161616] font-normal text-base leading-5">₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#161616] font-normal text-sm leading-5">Taxes</span>
                    <span className="text-[#161616] font-normal text-sm leading-5">₹{taxes}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-[339px] h-[1px] bg-[#D9D9D9]"></div>

                {/* Total */}
                <div className="w-[339px] h-[24px] flex items-center justify-between">
                  <span className="w-[48px] h-[24px] text-[#161616] font-medium text-[20px] leading-6">Total</span>
                  <span className="text-[#161616] font-medium text-[20px] leading-6">₹{total}</span>
                </div>
              </div>

              <Link href="/confirmation" className="block w-full">
                <button className="w-[339px] h-[44px] px-5 py-3 bg-[#FFD643] rounded-lg flex items-center justify-center">
                  <span className="text-black font-semibold text-base">
                    Pay and Confirm
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
