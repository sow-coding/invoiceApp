"use client"
import React from 'react'
import styles from "./invoiceForm.module.css"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SaveAsDraftButton from '../saveAsDraftBtn/saveAsDraftButton';
import SaveAndSendButton from '../saveAndSendBtn/saveAndSendButton';
import DiscardBtn from '../discardBtn/discardBtn';
import SideBar from '../sideBar/sideBar';
import AddNewItemButton from '../addNewItemBtn/addNewItemButton';
import { useRecoilState, useSetRecoilState } from 'recoil'
import { showInvoiceFormState } from '@/app/showInvoiceFormState'
import { invoiceListState } from '@/app/invoiceListState';
import { invoiceState } from '@/app/invoiceState';


//FAIRE SYSTEME DE VALIDATION FORM !
const formSchema = yup.object().shape({
  address: yup.string(),

})


const InvoiceForm = () => {

  const [ newInvoiceFormDisplay, setNewInvoiceFormDisplay ] = useRecoilState(showInvoiceFormState)

    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(formSchema),
    });

    const [invoiceList, setInvoiceList] = useRecoilState(invoiceListState);
    //const [reFetchState, setReFetchState] = useRecoilState(reFetch)
    function generateCustomId() {
      const randomLetters = Array.from({ length: 2 }, () => {
        const randomCharCode = Math.floor(Math.random() * 26) + 65; // A-Z ASCII range
        return String.fromCharCode(randomCharCode);
      }).join('');
    
      const randomNum = Math.floor(Math.random() * 9000) + 1000;
    
      return `#${randomLetters}${randomNum}`;
    }
    
    const invoiceId = generateCustomId()

    const handlePost = async (data) => {
        try {
          
          const response = await fetch('http://localhost:3000/api/invoice', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: invoiceId,
              invoiceClientName: data.clientName,
              invoiceInvoiceDate: data.invoiceDate,
              invoicePrice: data.itemPrice + "€",
              invoiceStatut: "Paid",
            }),
          });
        } catch (error) {
          console.error('Error posting:', error);
        }
      }; 
      
      function onSubmit (data) {
        console.log(data)
        handlePost(data)
        const newInvoiceList = {
          id: invoiceId,
          clientName: data.clientName,
          invoiceDate: data.invoiceDate,
          price: data.itemPrice,
          statut: "Paid"
        }
        setInvoiceList([...invoiceList, newInvoiceList])
        setNewInvoiceFormDisplay(false)
      }

      function ItemList () {
        return (
        <div className={`${styles.itemList}`} >
                <h1 className={`${styles.itemListTitle}`}>Item List</h1>
                <div className={`${styles.inputsItemList}`}>
                  <div className={`${styles.itemNameInListInput}`}>
                    <label htmlFor="itemNameInList">Item Name</label>
                    <input type="text" name='itemNameInList' {...register("itemNameInList")}/>
                  </div>
                <div className={`${styles.itemQuantityInput}`}>
                    <label htmlFor="itemQuantity">Qty.</label>
                    <input type="number" name='itemQuantity' {...register("itemQuantity")}/>
                </div>      
                  <div className={`${styles.itemPriceInput}`}>
                    <label htmlFor="itemPrice">Price</label>
                    <input type="text" name='itemPrice' {...register("itemPrice")}/>
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
    return (

    <div className={`${styles.scrollableContainer}`}>
      <div className={`${styles.newInvoiceFormContainer}`}>
        <SideBar position="relative"/>
        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.invoiceForm}`}>
          <h1 className={`${styles.formTitle}`}>New Invoice</h1>
          <div className={`${styles.invoiceFormTop}`}>
          <h5 className={`${styles.billFromTitle}`}>Bill from</h5>
          <div className={`${styles.billFromTop}`}>
            <label htmlFor="address">Street Address</label>
            <input type="text" name='address' {...register("address")}/>
            {errors.address && <p>{errors.address.message}</p>}
          </div>
            <div className={`${styles.billFromBottom}`}>
              <div className={`${styles.city}`}>
                <label htmlFor="city">City</label>
                <input type="text" name='city' {...register("city")}/>
              </div>
              <div className={`${styles.postCode}`}>
                <label htmlFor="postCode">Postcode</label>
                <input type="text" name='postCode' {...register("postCode")}/>
              </div>
              <div className={`${styles.country}`}>
                <label htmlFor="country">Country</label>
                <input type="text" name='country' {...register("country")}/>
              </div>
            </div>
          </div>
          <div className={`${styles.invoiceFormCenter}`}>
            <div className={`${styles.billToTop}`}>
              <h5 className={`${styles.billToTitle}`}>Bill to</h5>
              <div className={`${styles.clientName}`}>
                <label htmlFor="clientName">Client´s Name</label>
                <input type="text" name='clientName' {...register("clientName")} />
              </div>
              <div className={`${styles.clientEmail}`}>
                <label htmlFor="clientEmail">Client´s Email</label>
                <input type="text" name='clientEmail' {...register("clientEmail")} />
              </div>
              <div className={`${styles.clientStreetAddress}`}>
                <label htmlFor="clientStreetAddress">Street Address</label>
                <input type="text" name='clientStreetAddress' {...register("clientStreetAddress")} />
              </div>
            </div>
            <div className={`${styles.billToCenter}`}>
              <div className={`${styles.clientCity}`}>
                <label htmlFor="clientCity">City</label>
                <input type="text" name='clientCity' {...register("clientCity")}/>
              </div>
              <div className={`${styles.clientPostCode}`}>
                <label htmlFor="clientPostCode">Post Code</label>
                <input type="text" name='clientPostCode' {...register("clientPostCode")}/>
              </div>
              <div className={`${styles.clientCountry}`}>
              <label htmlFor="clientCountry">Country</label>
                <input type="text" name='clientCountry' {...register("clientCountry")}/>
              </div>
            </div>
          </div>
          <div className={`${styles.invoiceFormBottom}`}>
            
            <div className={`${styles.invoiceFormBottomTop}`}>
              <div className={`${styles.invoiceFormBottomTopTop}`}>
                <div className={`${styles.invoiceDate}`}>
                  <label htmlFor="invoiceDate">Invoice Date</label>
                  <input type="date" name="invoiceDate" {...register("invoiceDate")} />
                </div>
                <div className={`${styles.paymentTerms}`}>
                  <label htmlFor="paymentTerms">Payment Terms</label>
                  <input type="number" name='paymentTerms' {...register("paymentTerms")}/>
                </div>
              </div>
              <div className={`${styles.invoiceFormBottomTopBottom}`}>
                <label htmlFor="projectDescription">Project Description</label>
                <input type="text" name='projectDescription' {...register("projectDescription")}/>
              </div> 
            </div>
          </div>
          {/*CREER ITEMLIST ICI MEME*/}
          <ItemList />
          <div className={`${styles.formButtons}`}>
            <div className={`${styles.formButtonsLeft}`}>
              <DiscardBtn />
            </div>
            <div className={`${styles.formButtonsRight}`}>
              <SaveAsDraftButton />
              <SaveAndSendButton />
            </div>
          </div>
          
      </form>
      </div>
      <div className={`${styles.newInvoiceFormQuit}`} onClick={() => {
        setNewInvoiceFormDisplay(false)
      }}>

      </div>
    </div>

    )
}


export default InvoiceForm