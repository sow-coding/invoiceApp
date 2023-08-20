import React from 'react'
import styles from "./deleteButton.module.css"

function DeleteButton() {
  return (
    <div className={`${styles.deleteButton}`}>
        <p>Delete</p>
    </div>
  )
}

export default DeleteButton