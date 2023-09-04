"use client"
import styles from "./listOfInvoices.module.css"
import {useRecoilValue} from 'recoil'
import { invoiceListState } from '@/app/invoiceListState'
import Link from 'next/link'
import Paid from "../states/paid/paid"
import Pending from "../states/pending/pending"
import Draft from "../states/draft/draft"
import { invoiceStatut } from "@/app/invoiceStatut"
import { draft } from "@/app/draft"
import { pending } from "@/app/pending"
import { paid } from "@/app/paid"



function Invoice(props) {
  const {invoiceData} = props
  //const paidState = useRecoilValue(invoiceStatut)
  if (!invoiceData) {
    return <div>Loading...</div>;
  }
  return (
   <Link className={`${styles.link}`} href={`/invoice/${invoiceData.id}?data=${JSON.stringify(invoiceData)}`}>
      <div className={`${styles.invoice}`}>
        <div className={`${styles.invoiceLeft}`}>
          <h4><span>#</span>{invoiceData.id}</h4>
          <p>Due {invoiceData.invoiceDate}</p>
          <p>{invoiceData.clientName}</p>
        </div>
        <div className={`${styles.invoiceRight}`}>
          <h2>{invoiceData.price} €</h2>
          {invoiceData.statut === "Pending" && <Pending />}
          {invoiceData.statut === "Draft" && <Draft />}
          {invoiceData.statut === "Paid" && <Paid />}
          <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
            <path d="M1 1L5 5L1 9" stroke="#7C5DFA" stroke-width="2" />
          </svg>
        </div>
      </div>
    </Link>
  );
}


function ListOfInvoices() {
  const draftStatut = useRecoilValue(draft)
  const pendingStatut = useRecoilValue(pending)
  const paidStatut = useRecoilValue(paid)
  const invoicesState = useRecoilValue(invoiceListState);
  function deleteAllButLastWithSameId(objects) {
    const idMap = {}; // Create a map to store objects by ID
  
    // Loop through the array of objects
    for (const obj of objects) {
      const id = obj.id; // Assuming 'id' is the property with the ID
  
      // Update the map with the latest object for each ID
      idMap[id] = obj;
    }
  
    // Convert the map back to an array of objects
    const uniqueObjects = Object.values(idMap);
  
    return uniqueObjects;
  }
  const uniquesInvoice = deleteAllButLastWithSameId(invoicesState)

  const draftDesiredStatut = ['Draft'];
  const filteredDraftInvoices = uniquesInvoice.filter((invoice) => {
    return draftDesiredStatut.includes(invoice.statut);
  })

  const pendingDesiredStatut = ['Pending'];
  const filteredPendingInvoices = uniquesInvoice.filter((invoice) => {
    return pendingDesiredStatut.includes(invoice.statut);
  })

  const paidDesiredStatut = ['Paid'];
  const filteredPaidInvoices = uniquesInvoice.filter((invoice) => {
    return paidDesiredStatut.includes(invoice.statut);
  })

  const invoiceDisplay = (
    <div className={`${styles.listOfInvoices}`}>
      {draftStatut && (
        filteredDraftInvoices.map((invoice) => (
          <Invoice key={invoice.id} invoiceData={invoice} />
        ))
      )}
      {pendingStatut && (
        filteredPendingInvoices.map((invoice) => (
          <Invoice key={invoice.id} invoiceData={invoice} />
        ))
      )}
      {paidStatut && (
        filteredPaidInvoices.map((invoice) => (
          <Invoice key={invoice.id} invoiceData={invoice} />
        ))
      )}
      {!draftStatut && !pendingStatut && !paidStatut && (
        uniquesInvoice.map((invoice) => (
          <Invoice key={invoice.id} invoiceData={invoice} />
        ))
      )}
    </div>
  );

  return invoiceDisplay;
} 

export default ListOfInvoices