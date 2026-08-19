import { create } from 'zustand';

interface AuthStore {
  email: string;
  setEmail: (f: string) => void;
}

interface PreUrlStore {
  prevAsPath: string;
  setPrevAsPath: (f: string) => void;
}

export const useGetEmailValue = create<AuthStore>((set) => ({
  email: '',
  setEmail: (valueEmail) => set((state) => ({ ...state, email: valueEmail })),
}));

export const usePrevious = create<PreUrlStore>((set) => ({
  prevAsPath: '',
  setPrevAsPath: (preUrl) => set((state) => ({ ...state, prevAsPath: preUrl })),
}));