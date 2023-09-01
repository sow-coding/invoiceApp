"use client"
import { useRecoilState, useRecoilValue } from "recoil"
import NewInvoiceButton from "../newInvoiceBtn/newInvoiceBtn"
import styles from "./mainMenu.module.css"
import { invoiceState } from "@/app/invoiceState"
import { showInvoiceDetails } from "@/app/showInvoiceDetails"
import { invoiceListState } from "@/app/invoiceListState"
import { useState } from "react"
import { filterMenu } from "@/app/filterMenu"


function MainMenu(props) {
    const display = useRecoilValue(showInvoiceDetails)
    const invoicesState = useRecoilValue(invoiceListState);
    const [filter, setFilter] = useRecoilState(filterMenu)
    return (
    <div className={`${styles.mainMenu} ${display && styles.displayNone}`}>
        <div className={`${styles.mainMenuLeft}`}>
            <h1>Invoices</h1>
            <p>There are {invoicesState.length} total invoices</p>
        </div>
        <div className={`${styles.mainMenuRight}`}>
                <div onClick={() => {setFilter(!filter)}} className={`${styles.filterButton}`} >
                    <p>Filter by status</p>
                    {filter === true ? <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                    <path d="M1 6.22803L5.2279 2.00013L9.4558 6.22803" stroke="#7C5DFA" stroke-width="2"/>
                    </svg> : 
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                        <path d="M1 1L5.2279 5.2279L9.4558 1" stroke="#7C5DFA" stroke-width="2"/>
                    </svg>}
                    
                </div>
                <div className={`${styles.filterMenu} ${filter === true && styles.flex}`}>
                    <div className="draftChoice">
                        <input type="checkbox" name="draft" className="draftCheckbox"/>
                        <p>Draft</p>
                    </div>
                    <div className="pendingChoice">
                        <input type="checkbox" name="pending" className="pendingCheckbox"/>
                        <p>Pending</p>
                    </div>
                    <div className="paidChoice">
                        <input type="checkbox" name="paid" className="paidCheckbox"/>
                        <p>Paid</p>
                    </div>                
                </div>

            <NewInvoiceButton />
        </div>
    </div>
  )
}

export default MainMenu