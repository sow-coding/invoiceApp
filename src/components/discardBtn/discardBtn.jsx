import React from 'react'
import styles from "./discardBtn.module.css"
import { useRecoilState } from 'recoil'
import { showInvoiceFormState } from '@/app/showInvoiceFormState'

function DiscardBtn() {
  const [newInvoiceFormDisplay, setNewInvoiceFormDisplat] = useRecoilState(showInvoiceFormState)
  return (
    <button className={`${styles.discardBtn}`} onClick={() => {
      setNewInvoiceFormDisplat(false)
    }}>
        Discard
    </button>
  )
}

export default DiscardBtn