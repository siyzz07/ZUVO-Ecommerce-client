import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
      (set) => ({
        theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
        toggleTheme: () => set((state: ThemeState) => ({ 
          theme: state.theme === 'light' ? 'dark' : 'light' 
        })),
      }),
    { name: 'theme-storage' }
  )
);

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  isAnimating: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  triggerAnimation: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
      (set, get) => ({
        items: [],
        isAnimating: false,
        addItem: (item: CartItem) => {
          const items = [...get().items];
          const existing = items.find((i) => i.id === item.id);
          if (existing) {
            existing.qty += 1;
          } else {
            items.push(item);
          }
          set({ items, isAnimating: true });
          // Reset animation after 500ms
          setTimeout(() => set({ isAnimating: false }), 500);
        },
        removeItem: (id: string) => set({ items: get().items.filter((i) => i.id !== id) }),
        updateQty: (id: string, qty: number) => {
          const items = [...get().items];
          const item = items.find((i) => i.id === id);
          if (item) {
            item.qty = Math.max(1, qty);
            set({ items });
          }
        },
        clearCart: () => set({ items: [] }),
        getTotal: () => get().items.reduce((acc: number, item: CartItem) => acc + item.price * item.qty, 0),
        triggerAnimation: () => {
            set({ isAnimating: true });
            setTimeout(() => set({ isAnimating: false }), 500);
        }
      }),
    { name: 'cart-storage' }
  )
);
