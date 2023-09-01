import React from 'react'
import styles from "./homeContent.module.css"
import MainMenu from '../mainMenu/mainMenu'
import Nothing from '../nothing/nothing'
import ListOfInvoices from '../listOfInvoces/listOfInvoices'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { invoiceListState } from "../../app/invoiceListState"
import { filterMenu } from '@/app/filterMenu'


function HomeContent() {
  const listOfInvoices = useRecoilValue(invoiceListState)
  const [showFilterMenu, setShowFilterMenu] = useRecoilState(filterMenu)
  return (
    <div onClick={() => {
      showFilterMenu && setShowFilterMenu(false)
    }} className={`${styles.homeContentContainer}`}>
        <MainMenu />
        <div className={`${styles.homeContent}`}>
        {listOfInvoices.length === 0 ? <Nothing />:
        <ListOfInvoices />
        }
        </div>
  </div>
  )
}

export default HomeContent