"use client"
import React from 'react'
import styles from "./addNewButton.module.css"

function AddNewItemButton() {
  return (
    <div className={`${styles.addNewItemButton}`}>
        <p>+ Add new item</p>
    </div>
  )
}

export default AddNewItemButton