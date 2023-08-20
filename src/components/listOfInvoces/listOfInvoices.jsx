"use client"
import styles from "./listOfInvoices.module.css"
import {useRecoilValue} from 'recoil'
import { invoiceListState } from '@/app/invoiceListState'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import Paid from "../states/paid/paid"


function Invoice(props) {
  const {invoiceData} = props

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
          <Paid />
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