// store/hotel-console.store.ts
import { create } from 'zustand';
import { 
  getMockHotelConsoleData, 
  HotelConsoleData 
} from '@/services/hotel-console.service';

interface HotelConsoleState {
  hotel: HotelConsoleData | null;
  loading: boolean;
  error: string | null;
  
  fetchHotelData: () => void;
  updateRoomStatus: (roomTypeId: number, roomId: number, newStatus: any) => void;
}

export const useHotelConsoleStore = create<HotelConsoleState>((set) => ({
  hotel: null,
  loading: false,
  error: null,

  fetchHotelData: () => {
    set({ loading: true });
    try {
      const data = getMockHotelConsoleData();
      set({ hotel: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Lỗi tải dữ liệu', loading: false });
    }
  },

  updateRoomStatus: (roomTypeId, roomId, newStatus) => {
    set((state) => {
      if (!state.hotel) return {};
      const updatedRoomTypes = state.hotel.roomTypes.map((type) => {
        if (type.id !== roomTypeId) return type;
        return {
          ...type,
          rooms: type.rooms.map((room) => 
            room.id === roomId ? { ...room, status: newStatus } : room
          ),
        };
      });
      return { hotel: { ...state.hotel, roomTypes: updatedRoomTypes } };
    });
  },
}));