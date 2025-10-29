'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookingData {
  experienceId: string;
  experienceName: string;
  date: string;
  time: string;
  quantity: number;
  subtotal: number;
  taxes: number;
  total: number;
}

interface ConfirmationData {
  referenceId: string;
  experienceName: string;
  bookingDate: string;
  bookingTime: string;
  quantity: number;
  total: number;
}

interface BookingContextType {
  bookingData: BookingData | null;
  setBookingData: (data: BookingData) => void;
  clearBookingData: () => void;
  confirmationData: ConfirmationData | null;
  setConfirmationData: (data: ConfirmationData) => void;
  clearConfirmationData: () => void;
  isConfirmationReady: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [confirmationData, setConfirmationDataState] = useState<ConfirmationData | null>(null);
  const [isConfirmationReady, setIsConfirmationReady] = useState(false);

  const setConfirmationData = (data: ConfirmationData) => {
    setConfirmationDataState(data);
    setIsConfirmationReady(true);
  };

  const clearBookingData = () => {
    setBookingData(null);
  };

  const clearConfirmationData = () => {
    setConfirmationDataState(null);
    setIsConfirmationReady(false);
  };

  return (
    <BookingContext.Provider 
      value={{ 
        bookingData, 
        setBookingData, 
        clearBookingData,
        confirmationData,
        setConfirmationData,
        clearConfirmationData,
        isConfirmationReady
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
