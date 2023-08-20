"use client"
import React, {useState} from 'react'
import styles from "./newInvoiceBtn.module.css"
import { useRecoilState } from 'recoil'
import { showInvoiceFormState } from '@/app/showInvoiceFormState'


function NewInvoiceButton() {
    const [newInvoiceFormDisplay, setNewInvoiceFormDisplat] = useRecoilState(showInvoiceFormState)
  return (
    <div className={`${styles.NewInvoiceButton}`} onClick={() => {
      setNewInvoiceFormDisplat(true)
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="white"/>
            <path d="M17.3131 21.0229V17.3131H21.0229V14.7328H17.3131V11.0229H14.7328V14.7328H11.0229V17.3131H14.7328V21.0229H17.3131Z" fill="#7C5DFA"/>
        </svg>
        <p>New Invoice</p>
    </div>
  )
}

export default NewInvoiceButton