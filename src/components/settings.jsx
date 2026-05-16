import { Link } from "react-router";
import { useDashboardStore } from "./dashboardStore.jsx";
import classes from "../styles/style.module.css";



export default function Settings() {
  const { values, setUserName, setLastName, setEmail, setPhoneNumber } = useDashboardStore();
  const { username, lastName, email, phone } = values;

    
  return (
    <div>
      <h1>Dashboard Settings</h1>
      <hr />
      <form
        className={classes.mainRoot && classes.settingsContainer}
        style={{
          gridTemplateColumns: "1fr",
          gridTemplateAreas: "none",

        }}
      >
        <div className={classes.dashboardEl} style={{width: "100%"}}>
          <h3>Change your personal info:</h3>
          <div className={classes.container} style={{display:"flex", padding:"1rem", gap:"1rem"}}>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"center", width:"100%", gap:"7rem"}}>
              <label htmlFor="change-username">New name:</label>
              <input
                className={classes.settingsInp}
                type="text"
                id="change-username"
                placeholder="John"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"center", width:"100%", gap:"5rem"}}>
              <label htmlFor="change-lastname">New last name:</label>
              <input
                className={classes.settingsInp}
                type="text"
                id="change-lastname"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"center", width:"100%", gap:"6.9rem"}}>
              <label htmlFor="change-email">New email:</label>
              <input
                className={classes.settingsInp}
                type="email"
                id="change-email"
                placeholder="example@whatever.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"center", width:"100%", gap:"2.6rem"}}>
              <label htmlFor="change-phone">New phone number:</label>
              <input
                className={classes.settingsInp}
                type="text"
                id="change-phone"
                placeholder="+X XXX XXX XX-XX"
                value={phone}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <Link to="/" style={{width:"100%", fontStyle:"normal"}}>

            <button
                className={classes.dashboardBtn}
                style={{ marginTop: "0.5rem",  }}
                type="submit"
            >
                Submit
            </button>
          </Link>


          <Link to="/" style={{ fontStyle: "normal", width: "100%" }}>
            <button
              className={classes.dashboardBtn}
              style={{ marginTop: "0.5rem" }}
              type="button"
            >
              Go back
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
