import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface BookingState {
  currentBooking: any | null;
  setCurrentBooking: (booking: any) => void;
  clearCurrentBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
  devtools(
    persist(
      (set) => ({
        currentBooking: null,
        setCurrentBooking: (booking) => set({ currentBooking: booking }),
        clearCurrentBooking: () => set({ currentBooking: null }),
      }),
      {
        name: 'booking-storage',
      }
    )
  )
);