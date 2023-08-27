import React from 'react'
import styles from "./draft.module.css"

function Draft() {
  return (
    <div className={`${styles.draft}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
        <circle cx="4" cy="4" r="4" fill="#373B53"/>
        </svg>       
        <h1 className={`${styles.draftText}`}>Draft</h1>
    </div>
  )
}

export default Draft