import React from 'react'
import styles from "./saveAndSendButton.module.css"


function SaveAndSendButton() {
  return (
    <button className={`${styles.saveAndSendButton}`} type='submit'>Save and Send</button>
  )
}

export default SaveAndSendButton