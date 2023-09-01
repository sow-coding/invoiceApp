import React from 'react'
import styles from "./markAsPaidButton.module.css"
import { useRecoilState } from 'recoil'
import { invoiceStatut } from '@/app/invoiceStatut'

function MarkAsPaidButton() {
  const [paid, setPaid] = useRecoilState(invoiceStatut)
  return (
    <div onClick={() => {setPaid("Paid")}} className={`${styles.MarkAsPaidButton}`}>
        <p>Mark as Paid</p>
    </div>
  )
}

export default MarkAsPaidButton