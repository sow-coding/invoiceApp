"use client"
import React, { useEffect, useState } from 'react'
import styles from "../../../components/listOfInvoces/listOfInvoices.module.css"
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import Paid from '@/components/states/paid/paid'
import ItemList from '@/components/itemList/itemList'
import EditBtn from '@/components/editBtn/editBtn'
import DeleteButton from '@/components/deleteBtn/deleteButton'
import MarkAsPaidButton from '@/components/markAsPaidBtn/markAsPaidButton'
import Draft from '@/components/states/draft/draft'
import Pending from '@/components/states/pending/pending'


function InvoiceDetails() {
  /* UTILISER LES ROUTES POUR POUVOIR PASSER EN PROPS */
  const router = useRouter()
  const searchParams = useSearchParams()
  const data = searchParams.get("data")
  const invoiceData = JSON.parse(data)

  function changeURLWithoutReloading() {
    const newURL = `/invoice/${invoiceData.id}`; // The URL you want to change to
    window.history.pushState({}, '', newURL);
  }
  useEffect(() => {
    changeURLWithoutReloading()
  })
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

    function DeleteButton () {
      const router = useRouter()
      return (
        <div onClick={() => {
          router.push("/")
        }} className={`${styles.deleteButton}`}>
          <p>Delete</p>
        </div>
      )
    }
    
    function DeleteConfirmation() {
      return (
        <div className={`${styles.deleteConfirmationContainer}`}>
          <div className={`${styles.deleteConfirmation}`}>
          <h1>Confirm Deletion</h1>
            <p className={`${styles.deleteConfirmationText}`}>Are you sure you want to delete invoice #{invoiceData.id}? This action cannot be undone.</p>
            <div className={`${styles.deleteConfirmButton}`}>
                <button onClick={() => {
                  setShowDeleteConfirmation(false)
                }} className={`${styles.cancel}`}>Cancel</button>
                <DeleteButton />
            </div>
          </div>
        </div>
      )
    }

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
          <Paid/>
        </div>
        <div className={`${styles.invoiceDetailsCenterRight}`}>
          <EditBtn />

          <div onClick={() => {
            setShowDeleteConfirmation(true)
          }} className={`${styles.deleteButton}`}>
              <p>Delete</p>
          </div>
          
          <MarkAsPaidButton />
        </div>
      </div>
      <div className={`${styles.invoiceDetailsBottom}`}>
        
        <div className={`${styles.invoiceDetailsBottomTop}`}>
          <div className={`${styles.invoiceDetailsBottomTopLeft}`}>
            <h4><span>#</span>{invoiceData.id}</h4>
            <p>{invoiceData.projectDescription}</p>
          </div>
          <div className={`${styles.invoiceDetailsBottomTopRight}`}>
          <p>{invoiceData.address}</p>
          <p>{invoiceData.city}</p>
          <p>{invoiceData.postCode}</p>
          <p>{invoiceData.country}</p>
        </div>
        </div>

        <div className={`${styles.invoiceDetailsBottomCenter}`}>
          
          <div className={`${styles.invoiceDetailsBottomCenterLeft}`}>
            <div className={`${styles.invoiceDetailsBottomCenterLeftTop}`}>
              <p>Invoice Date</p>
              <h3>{invoiceData.invoiceDate}</h3>
            </div>
            <div className={`${styles.invoiceDetailsBottomCenterLeftBottom}`}>
              <p>Payment Due</p>
              <h3>{invoiceData.paymentTerms}</h3>
            </div>
          </div>

          <div className={`${styles.invoiceDetailsBottomCenterCenter}`}>
            <p>Bill to</p>
            <div className="clientInfos">
              <h3>{invoiceData.clientName}</h3>
              <p>{invoiceData.clientStreetAddress}</p>
              <p>{invoiceData.clientCity}</p>
              <p>{invoiceData.clientPostCode}</p>
              <p>{invoiceData.clientCountry}</p>
            </div>
          </div>

          <div className={`${styles.invoiceDetailsBottomCenterRight}`}>
            <p>Sent to</p>
            <h2>{invoiceData.clientEmail}</h2>
          </div>
        
        </div>

        <div className={`${styles.invoiceDetailsBottomBottom}`}>
          <div className={`${styles.invoiceDetailsBottomBottomTop}`}>
            <div className={`${styles.invoiceDetailsBottomBottomTopLeft}`}>
              <p>Item Name</p>
              <h4>{invoiceData.itemNameInList}</h4>
            </div>
            <div className={`${styles.invoiceDetailsBottomBottomTopRight}`}>
              <div className={`${styles.quantity}`}>
                <p>QTY.</p>
                <h4>{invoiceData.itemQuantity}</h4>
              </div>
              <div className={`${styles.price}`}>
                <p>Price</p>
                <h4>{invoiceData.price}</h4>
              </div>
              <div className={`${styles.total}`}>
              <p>Total</p>
              <h4>{invoiceData.itemQuantity * invoiceData.price}</h4>
              </div>
            </div>
          </div>
          <div className={`${styles.invoiceDetailsBottomBottomBottom}`}>
            <p>Amont Due</p>
            <h1>{invoiceData.price} €</h1>
          </div>
        </div>

      </div>
      {showDeleteConfirmation && <DeleteConfirmation />}
    </div>
    
  )
}

export default InvoiceDetails