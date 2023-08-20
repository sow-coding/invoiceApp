"use client"
import { useRecoilState, useRecoilValue } from "recoil"
import NewInvoiceButton from "../newInvoiceBtn/newInvoiceBtn"
import styles from "./mainMenu.module.css"
import { invoiceState } from "@/app/invoiceState"
import { showInvoiceDetails } from "@/app/showInvoiceDetails"
import { invoiceListState } from "@/app/invoiceListState"


function MainMenu(props) {
    const display = useRecoilValue(showInvoiceDetails)
    const invoicesState = useRecoilValue(invoiceListState);
    return (
    <div className={`${styles.mainMenu} ${display && styles.displayNone}`}>
        <div className={`${styles.mainMenuLeft}`}>
            <h1>Invoices</h1>
            <p>There are {invoicesState.length} total invoices</p>
        </div>
        <div className={`${styles.mainMenuRight}`}>
            <div className={`${styles.filterButton}`} >
                <p>Filter by status</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                    <path d="M1 1L5.2279 5.2279L9.4558 1" stroke="#7C5DFA" stroke-width="2"/>
                </svg>
            </div>
            <NewInvoiceButton />
        </div>
    </div>
  )
}

export default MainMenu