import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Transaction = {
  type: 'deposit' | 'withdraw',
  amount: number,
  date: string,
  opTime: string,
  operationId: number
}

export type Note = {
  text: string,
  id: number
}

export interface DashboardSettings {
  username: string,
  lastName: string,
  email: string,
  phone: string,
  id: number,
  time: string,
  day: string,
  balance: number,
  notes: Note[],
  transactions: Transaction[]
}

export interface DashboardStore {
  values: DashboardSettings,
  setUserName: (name:string) => void,
  setLastName: (lastName: string) => void,
  setEmail: (email:string) => void,
  setPhoneNumber: (newPhone: string) => void,
  timeTick: () => void,
  dayTick: () => void,
  balanceDeposit: (num: number) => void,
  balanceWithdraw: (num: number) => void,
  trackTransactionsHistory: (updater: (prev: Transaction[]) => Transaction[]) => void,
  trackNotes: (noteText: string) => void,
  noteDelete: (noteToDelete: Note) => void
}

export const useDashboardStore = create<DashboardStore>()(
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
          notes: [{text: 'Note', id:0}],
          transactions: []
        },
  
        setUserName: (name) => 
          set((state) => ({
            values: { ...state.values, username: name }
          })),

        setLastName: (lastname) =>
          set((state) => ({
            values: {...state.values, lastName: lastname}
          })),

        setEmail: (email) =>
          set((state) => ({
            values: {...state.values, email: email}
          })),

        setPhoneNumber: (newPhone) =>
          set((state) => ({
            values: {...state.values, phone: newPhone}
          })),
  
        timeTick: () => 
          set((state) => ({
            values: { ...state.values, time: new Date().toLocaleTimeString() }
          })),
  
        dayTick: () =>
          set((state) => ({
            values: {...state.values, day: new Date().toLocaleDateString()}
          })),
  
        balanceDeposit: (num) => 
          set((state) => ({
            values: { 
              ...state.values, 
              balance: Number(state.values.balance) + Number(num)
            }
          })),
        
        balanceWithdraw: (num) =>
          set((state) => ({
            values: {
              ...state.values,
              balance: Number(state.values.balance) > num ? Number(state.values.balance) - num : Number(state.values.balance)
            }
          })),

        trackTransactionsHistory: (updater) => 
          set((state) => ({
            values: {
              ...state.values,
              transactions: updater(state.values.transactions)
            }
          })),
  
        trackNotes: (noteText) => 
          set((state) => ({
            values: { 
              ...state.values, 
              notes: [...state.values.notes, {text: noteText, id: state.values.notes.length + 1}]
            }
          })),

        noteDelete: (noteToDelete) => 
          set((state) => ({
            values: {
              ...state.values,
              notes: state.values.notes.filter((note) => note.id !== noteToDelete.id)
            }
          }))
      }),
      { name: 'dashboard-storage' }
    )
  );