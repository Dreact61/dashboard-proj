import { Link } from "react-router";
import { useDashboardStore } from "./dashboardStore.jsx";
import classes from "../styles/style.module.css";



export default function Settings() {
  const { values } = useDashboardStore();
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
          <div className={classes.container}>
            <label htmlFor="change-username">New name:</label>
            <input
              className={classes.settingsInp}
              type="text"
              id="change-username"
              placeholder={username}
              value={username}
              required
            />
            <label htmlFor="change-lastname">New last name:</label>
            <input
              className={classes.settingsInp}
              type="text"
              id="change-lastname"
              placeholder={lastName}
              value={lastName}
              required
            />
            <label htmlFor="change-email">New email:</label>
            <input
              className={classes.settingsInp}
              type="email"
              id="change-email"
              placeholder={email}
              value={email}
              required
            />
            <label htmlFor="change-phone">New phone number:</label>
            <input
              className={classes.settingsInp}
              type="text"
              id="change-phone"
              placeholder={phone}
              value={phone}
              required
            />
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
