import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useDashboardStore = create(
    persist(
      (set) => ({
        values: {
          username: 'Sawalda',
          lastName: 'react',
          email: 'example@whatever.com',
          phone: '+1 900 100-00-00',
          id: Math.floor(Math.random() * 10000000),
          time: new Date().toLocaleTimeString(),
          day: new Date().toLocaleDateString(),
          balance: 0,
          notes: ['first note', 'second note']
        },
  
        setUserName: (name) => 
          set((state) => ({
            values: { ...state.values, username: name }
          })),
  
        timeTick: () => 
          set((state) => ({
            values: { ...state.values, time: new Date().toLocaleTimeString() }
          })),
  
        dayTick: () =>
          set((state) => ({
            values: {...state.values, day: new Date().toLocaleDateString()}
          })),
  
        balanceState: (increment) => 
          set((state) => ({
            values: { 
              ...state.values, 
              balance: increment ? state.values.balance + 1 : state.values.balance 
            }
          })),
  
        trackNotes: (note) => 
          set((state) => ({
            values: { 
              ...state.values, 
              notes: [...state.values.notes, note]
            }
          }))
      }),
      { name: 'dashboard-storage' }
    )
  );