import './App.css'
import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import classes from './styles/style.module.css'
import { Link } from 'react-router';


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

const Dashboard = () => {
  const [isMainOn, setIsMainOn] = useState(true)

  const { values, timeTick, dayTick } = useDashboardStore();
  const { username, lastName, email, phone, id, time, day, balance, notes } = values;

  useEffect(() => {
    const tick = setInterval(() => {
      timeTick()
    }, 1000)

    return () => clearInterval(tick)
  }, [timeTick])

  useEffect(() => {
    const tick = setInterval(() => {
      dayTick()
    }, 1000)

    return () => clearInterval(tick)
  }, [dayTick])
  
  return (
    <div>
      <h1>Dashboard</h1>
      <hr />
      <main className={classes.mainRoot}>
        <div className={classes.dashboardEl}>
          <h3>Personal Data:</h3>
          <div className={classes.container}>
            <p>User id: {id}</p>
            <p>Name: {username}</p>
            <p>Last name: {lastName}</p>
            <p>Email: {email}</p>
            <p>Phone number: {phone}</p>
          </div>
          <button className={classes.dashboardBtn} style={{marginTop:"0.5rem"}} type="button">
            <Link to="/settings" style={{fontStyle:"normal"}}>Edit</Link>
          </button>
        </div>
        
        <div className={classes.dashboardEl}>
          <h3>Current Time:</h3>
          <div className={classes.container}>      
            <p>Local time: {time}</p>
            <p>Date: {day}</p>
          </div>  
        </div>

        <div className={classes.dashboardEl}>
          <h3>Balance</h3>
          <div className={classes.container} style={{alignItems:'center', fontWeight:"900"}}>
            <p>${balance.toFixed(2)}</p>
          </div>
          <button className={classes.dashboardBtn} type='button'>Check history</button>
        </div>

        <div className={classes.dashboardEl && classes.notes}>
          <h3>User notes</h3>
          <div className={classes.container}>
            <ul>
              {notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
            <button className={classes.dashboardBtn} type="button">Edit notes</button>
        </div>

      </main>
    </div>
  )
}

function App() {
  return (
    <>
      <Dashboard />
    </>
  )
}
export default App