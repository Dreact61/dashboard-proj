import { Link } from "react-router"
import { useDashboardStore } from "../App"
import styles from '../styles/style.module.css'

export default function Settings() {
    const { values } = useDashboardStore()
    const { username, lastName, email, phone, id } = values
    
    return (
        <div>
            <h1>Dashboard Settings</h1>
            <hr />
            <div className={styles.settingsContainer}>
                <label htmlFor="change-my-name"></label>
                <input type="text" id="change-my-name" placeholder={values.id} />
                <label htmlFor="change-my-name"></label>
                <input type="text" id="change-my-name" placeholder={values.username} />
                <label htmlFor="change-my-name"></label>
                <input type="text" id="change-my-name" placeholder={values.lastName} />
                <label htmlFor="change-my-name"></label>
                <input type="text" id="change-my-name" placeholder={values.email} />
                <label htmlFor="change-my-name"></label>
                <input type="text" id="change-my-name" placeholder={values.phone} />
            </div>
        </div>
    )
}