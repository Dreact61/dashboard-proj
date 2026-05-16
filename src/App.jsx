import './App.css'
import { useEffect } from 'react';
import classes from './styles/style.module.css'
import { Link } from 'react-router';
import { useDashboardStore } from './components/dashboardStore.ts';

const Dashboard = () => {
  const { values, timeTick, dayTick } = useDashboardStore();
  const { username, lastName, email, phone, id, time, day, balance, notes, apicall } = values;

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
      <h1>Mini Dashboard Project</h1>
      <hr />
      <main className={classes.mainRoot}>
        <div className={classes.dashboardEl}>
          <h3>Personal Data:</h3>
          <div className={classes.container} style={{gap:"0.5rem", padding:"1rem"}}>
            <p>User id: {id}</p>
            <p>Name: {username ? username : <p style={{color:"#666"}}>not provided</p>}</p>
            <p>Last name: {lastName ? lastName : <p style={{color:"#666"}}>not provided</p>}</p>
            <p>Email: {email ? email : <p style={{color:"#666"}}>not provided</p>}</p>
            <p>Phone number: {phone ? phone : <p style={{color:"#666"}}>not provided</p>}</p>
          </div>
            <Link to="/settings" style={{fontStyle:"normal", width:"100%"}}>
              <button className={classes.dashboardBtn} style={{marginTop:"0.5rem"}} type="button">
                Edit
              </button>
            </Link>
        </div>
        
        <div className={classes.dashboardEl}>
          <h3>Current Time:</h3>
          <div className={classes.container} style={{alignItems:"center", gap:"1rem"}}>      
            <p>Local time: {time}</p>
            <p>Date: {day}</p>
          </div>  
        </div>

        <div className={classes.dashboardEl}>
          <h3>Balance:</h3>
          <div className={classes.container} style={{alignItems:'center', fontWeight:"900"}}>
            <p>${Number(balance).toFixed(2)}</p>
          </div>
          <Link to="/balance" style={{fontStyle:"normal", width:"100%"}}>
            <button className={classes.dashboardBtn} type='button'>Balance operations</button>
          </Link>
          
        </div>

        <div className={classes.dashboardEl && classes.notes}>
          <h3>User notes</h3>
          <div className={classes.container}>
            <ul>
              {notes && notes.length > 0 ? notes.map(note => (
                <li key={note.id}>{note.text}</li>
              )) : <li>You have not any notes yet.</li>}
            </ul>
          </div>
          <Link to="/notes" style={{fontStyle:"normal", width:"100%"}}>
              <button className={classes.dashboardBtn} type="button">Edit notes</button>
          </Link>
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