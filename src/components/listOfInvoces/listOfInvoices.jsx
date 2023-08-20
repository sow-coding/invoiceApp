"use client"
import React, { memo, useEffect, useState } from 'react'
import styles from "./listOfInvoices.module.css"
import { useRecoilState, useRecoilValue} from 'recoil'
import { invoiceState } from "@/app/invoiceState"
import { showInvoiceFormState } from '@/app/showInvoiceFormState'
import { invoiceListState } from '@/app/invoiceListState'
import { showInvoiceDetails } from '@/app/showInvoiceDetails'
import Link from 'next/link'


/*function InvoiceDetails ({invoiceData}) {
  const [invoiceDetails, setInvoiceDetails] = useRecoilState(showInvoiceDetails)
  return (
    <div className={`${styles.invoiceDetails}`}>
      <div className={`${styles.invoiceDetailsTop}`}>
        <div onClick={() => {setInvoiceDetails(false)}} className={`${styles.back}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none">
          <path d="M4.3418 0.886047L0.113895 5.11395L4.3418 9.34185" stroke="#7C5DFA" stroke-width="2"/>
        </svg>
        <p>Go back</p>        
        </div>
      </div>
      <div className={`${styles.invoiceDetailsCenter}`}>
        {invoiceData.id}
      </div>
      <div className={`${styles.invoiceDetailsBottom}`}>

      </div>
    </div>
  )
}*/

function Invoice(props) {
  const {invoiceData} = props
  const [invoiceDetails, setInvoiceDetails] = useRecoilState(showInvoiceDetails)

  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  return (
    <Link className={`${styles.link}`} href={`/invoice/ ${invoiceData.id}?data=${invoiceData}`}>
      <div className={`${styles.invoice}`}>
        <div className={`${styles.invoiceLeft}`}>
          <h4>{invoiceData.id}</h4>
          <p>Due {invoiceData.invoiceDate}</p>
          <p>{invoiceData.clientName}</p>
        </div>
        <div className={`${styles.invoiceRight}`}>
          <h2>{invoiceData.price}</h2>
          <h1>{invoiceData.statut}</h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
            <path d="M1 1L5 5L1 9" stroke="#7C5DFA" stroke-width="2" />
          </svg>
        </div>
      </div>
    </Link>
  );
}


function ListOfInvoices() {
  const invoicesState = useRecoilValue(invoiceListState);
  const invoiceDisplay = invoicesState.map((invoice) => (
    <Invoice key={invoice.id} invoiceData={invoice}/> 
  ));

  return (
    <div className={`${styles.listOfInvoices}`}>
      {invoiceDisplay}
    </div>
  );
} 

export default ListOfInvoices