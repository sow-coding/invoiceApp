import React from 'react'
import styles from "./itemList.module.css"
import AddNewItemButton from '../addNewItemBtn/addNewItemButton'

function ItemList () {
  return (
  <div className={`${styles.itemList}`} >
          <h1 className={`${styles.itemListTitle}`}>Item List</h1>
          <div className={`${styles.inputsItemList}`}>
            <div className={`${styles.itemNameInListInput}`}>
              <label htmlFor="itemNameInList">Item Name</label>
              <input type="text" name='itemNameInList' />
            </div>
          <div className={`${styles.itemQuantityInput}`}>
              <label htmlFor="itemQuantity">Qty.</label>
              <input type="number" name='itemQuantity' />
          </div>      
            <div className={`${styles.itemPriceInput}`}>
              <label htmlFor="itemPrice">Price</label>
              <input type="text" name='itemPrice' />
            </div>    

            <div className={`${styles.total}`}>
              <div className={`${styles.totalPrice}`}>
                <h5>Total</h5>
                <p>200</p>
              </div>
              <svg className={`${styles.trash}`} xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.47225 0L9.36117 0.888875H12.4722V2.66667H0.027832V0.888875H3.13892L4.02783 0H8.47225ZM2.6945 16C1.71225 16 0.916707 15.2045 0.916707 14.2222V3.55554H11.5834V14.2222C11.5834 15.2045 10.7878 16 9.80562 16H2.6945Z" fill="#888EB0"/>
              </svg>
            </div>
          </div>
          <AddNewItemButton />
    </div>
  )
}

export default ItemList