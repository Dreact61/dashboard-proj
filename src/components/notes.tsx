import React, { use } from "react"
import classes from "../styles/style.module.css";
import { useDashboardStore } from "./dashboardStore";
import { Link, Outlet, useLocation } from "react-router";
import { useState } from "react";
import { Note } from "./dashboardStore";

export const Notes: React.FC = () => {
    const {values, trackNotes, noteDelete} = useDashboardStore()
    const {notes, username} = values

    const editMode = useLocation()
    const isEditMode = location.pathname.endsWith('/edit')

    if (isEditMode) return <Outlet />

    else return (
        <div>
            <h1>{username}'s notes</h1>
            <hr />
            <form className={classes.mainRoot} style={{display:"flex",flexDirection:"column"}}>
                <div className={classes.dashboardEl} style={{gap:"1rem"}}>
                    {notes && notes.length > 0 ? notes.map(note => (
                        <div key={note.id}>
                            <p>Note {note.id}</p>
                            <p>{note.text}</p>
                        </div>
                    )) : <p>No Notes provided.</p>}
                    <Link to="/notes/edit" style={{fontStyle:"normal", width:"100%"}}>
                        <button type="button" className={classes.dashboardBtn}>Edit</button>
                    </Link>
                    
                </div>
                
                <Link to="/">
                    <button type="submit" className={classes.dashboardBtn}>Apply</button>
                </Link>


            </form>
            <Outlet />
        </div>
    )
}

export default function EditMenu() {
    const {values, trackNotes, noteDelete} = useDashboardStore()
    const { notes } = values

    const eraseNote = (note:Note):void => {
        noteDelete(note)
    }

    const [textChanges, setTextChanges] = useState("")

    return (
        <div>
            
            <h1>Note editor</h1>
            <hr />
            <section className={classes.mainRoot} style={{display:"flex",flexDirection:"column"}}>
                <p>Editor Mode</p>
                <div className={classes.dashboardEl} style={{gap:"1rem"}}>
                    {notes && notes.length > 0 ? notes.map(note => (
                    <div key={note.id} style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                        #{note.id}
                        <p>{note.text}</p>
                        <button type="button" onClick={() => eraseNote(note)} className={classes.dashboardBtn} style={{width:"30%"}}>Delete</button>
                    </div>
                    )) : <p>You have not any note yet.</p>}
                   
                    <input 
                    type="text" 
                    defaultValue={textChanges} 
                    onBlur={(e) => {
                        trackNotes(e.target.value)
                        e.target.value = ''
                    }} 
                    id="add-note-inp" style={{width:"60%"}} 
                    placeholder="Unfocus this input to create a note" 
                    />


                </div>
                    <Link to="/notes">
                        <button type="button" className={classes.dashboardBtn}>Back</button>
                    </Link>
            </section>
        </div>
    )
}
