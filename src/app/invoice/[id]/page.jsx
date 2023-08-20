"use client"
import React from 'react'
import styles from "../../../components/listOfInvoces/listOfInvoices.module.css"
import { useRouter } from 'next/router';

function InvoiceDetails() {
    //const router = useRouter();
    //const data = router.query.data
    /*const goBack = () => {
    router.back(); 
    };*/
  return (
    <div className={`${styles.invoiceDetails}`}>
      <div className={`${styles.invoiceDetailsTop}`}>
        <div className={`${styles.back}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none">
          <path d="M4.3418 0.886047L0.113895 5.11395L4.3418 9.34185" stroke="#7C5DFA" stroke-width="2"/>
        </svg>
        <p>Go back</p>        
        </div>
      </div>
      <div className={`${styles.invoiceDetailsCenter}`}>
        {/*data.id*/}
      </div>
      <div className={`${styles.invoiceDetailsBottom}`}>

      </div>
    </div>
  )
}

export default InvoiceDetails