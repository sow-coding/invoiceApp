"use client"
import React from 'react'
import styles from "./saveADraftButton.module.css"

function SaveAsDraftButton() {
  return (
    <button type='submit' className={`${styles.saveAsDraftButton}`}>
        Save as Draft
    </button>
  )
}

export default SaveAsDraftButton