import React from 'react'
import styles from "./homeContent.module.css"
import MainMenu from '../mainMenu/mainMenu'
import Nothing from '../nothing/nothing'
import ListOfInvoices from '../listOfInvoces/listOfInvoices'
import { useRecoilValue } from 'recoil';
import { invoiceListState } from "../../app/invoiceListState"


function HomeContent() {
  const listOfInvoices = useRecoilValue(invoiceListState)
  return (
    <div className={`${styles.homeContentContainer}`}>
        <MainMenu />
        <div className={`${styles.homeContent}`}>
        {listOfInvoices.length === 0 ? <Nothing />:<ListOfInvoices />}
        </div>
  </div>
  )
}

export default HomeContent