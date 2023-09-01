"use client"
import React from 'react'
import styles from "./saveADraftButton.module.css"
import { invoiceStatut } from '@/app/invoiceStatut'
import { useRecoilState } from 'recoil'


function SaveAsDraftButton() {
  const [statut, setStatut] = useRecoilState(invoiceStatut)
  return (
    <button onClick={() => {setStatut("Draft")}} type='submit' className={`${styles.saveAsDraftButton}`}>
        Save as Draft
    </button>
  )
}

export default SaveAsDraftButton