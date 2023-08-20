"use client"
import React, { useEffect } from 'react'
import styles from "../../../components/listOfInvoces/listOfInvoices.module.css"
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import Paid from '@/components/states/paid/paid'
import ItemList from '@/components/itemList/itemList'

function InvoiceDetails() {
  /* UTILISER LES ROUTES POUR POUVOIR PASSER EN PROPS */
  const router = useRouter()
  const searchParams = useSearchParams()
  const data = searchParams.get("data")
  const invoiceData = JSON.parse(data)

  function changeURLWithoutReloading() {
    const newURL = `/invoice/${invoiceData.id}`; // The URL you want to change to
    window.history.pushState({}, '', newURL);
    console.log("appelle")
  }
  useEffect(() => {
    changeURLWithoutReloading()
  })
  return (
    <div className={`${styles.invoiceDetails}`}>
      <div className={`${styles.invoiceDetailsTop}`}>
        <div onClick={() => {
          router.push('/')
        }} className={`${styles.back}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none">
          <path d="M4.3418 0.886047L0.113895 5.11395L4.3418 9.34185" stroke="#7C5DFA" stroke-width="2"/>
        </svg>
        <p>Go back</p>        
        </div>
      </div>
      <div className={`${styles.invoiceDetailsCenter}`}>
        <div className={`${styles.invoiceDetailsCenterLeft}`}>
          <p>Status</p>
          <Paid />
        </div>
        <div className={`${styles.invoiceDetailsCenterRight}`}>
          <button>Edit</button>
          <button>Delete</button>
          <button>Mark as paid</button>
        </div>
      </div>
      <div className={`${styles.invoiceDetailsBottom}`}>
        
        <div className={`${styles.invoiceDetailsBottomTop}`}>
          <div className={`${styles.invoiceDetailsBottomTopLeft}`}>
            <h4><span>#</span>{invoiceData.id}</h4>
            <p>Graphic Design</p>
          </div>
          <div className={`${styles.invoiceDetailsBottomTopRight}`}>
          <p>19 Union Terrace</p>
          <p>London</p>
          <p>E1 3EZ</p>
          <p>United Kingdom</p>
        </div>
        </div>

        <div className={`${styles.invoiceDetailsBottomCenter}`}>
          
          <div className={`${styles.invoiceDetailsBottomCenterLeft}`}>
            <div className={`${styles.invoiceDetailsBottomCenterLeftTop}`}>
              <p>Invoice Date</p>
              <h3>21 august 2022</h3>
            </div>
            <div className={`${styles.invoiceDetailsBottomCenterLeftBottom}`}>
              <p>Payment Due</p>
              <h3>20 sep 2023</h3>
            </div>
          </div>

          <div className={`${styles.invoiceDetailsBottomCenterCenter}`}>
            <p>Bill to</p>
            <div className="clientInfos">
              <p>Alex Grim</p>
              <p>84 Church Way</p>
              <p>Bradford</p>
              <p>BD1 9PB</p>
              <p>United Kingdom</p>
            </div>
          </div>

          <div className={`${styles.invoiceDetailsBottomCenterRight}`}>
            <p>Sent to</p>
            <h2>alexgrim@gmail.com</h2>
          </div>
        
        </div>

        <div className={`${styles.invoiceDetailsBottomBottom}`}>
          <div className={`${styles.invoiceDetailsBottomBottomTop}`}>

          </div>
          <div className={`${styles.invoiceDetailsBottomBottomBottom}`}>
            <p>Amont Due</p>
            <h1>{invoiceData.price} €</h1>
          </div>
        </div>

      </div>
    </div>
  )
}

export default InvoiceDetails