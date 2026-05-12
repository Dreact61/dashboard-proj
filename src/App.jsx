import './App.css'
import { useEffect } from 'react';
import classes from './styles/style.module.css'
import { Link } from 'react-router';
import { useDashboardStore } from './components/dashboardStore';

const Dashboard = () => {
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
            <Link to="/settings" style={{fontStyle:"normal"}}>
              <button className={classes.dashboardBtn} style={{marginTop:"0.5rem"}} type="button">
                Edit
              </button>
            </Link>
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