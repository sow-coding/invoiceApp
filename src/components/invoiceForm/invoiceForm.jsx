"use client"
import React, { useState } from 'react'
import styles from "./invoiceForm.module.css"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SaveAsDraftButton from '../saveAsDraftBtn/saveAsDraftButton';
import SaveAndSendButton from '../saveAndSendBtn/saveAndSendButton';
import DiscardBtn from '../discardBtn/discardBtn';
import SideBar from '../sideBar/sideBar';
import { useRecoilState, useSetRecoilState } from 'recoil'
import { showInvoiceFormState } from '@/app/showInvoiceFormState'
import { invoiceListState } from '@/app/invoiceListState';
import { invoiceState } from '@/app/invoiceState';
import DatePicker, {CalendarContainer} from "react-datepicker";
import { invoiceStatut } from '@/app/invoiceStatut';
import { itemListInDetailsPage } from '@/app/itemListInDetailsPage';


//FAIRE SYSTEME DE VALIDATION FORM !
const formSchema = yup.object().shape({
  address: yup.string(),

})


const InvoiceForm = () => {

  const [ newInvoiceFormDisplay, setNewInvoiceFormDisplay ] = useRecoilState(showInvoiceFormState)

    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(formSchema),
    });
    //const [paymentTermsUnRoll, setPaymentTermsUnRoll] = useState("none")
    const [startDate, setStartDate] = useState(new Date())
    const [invoiceList, setInvoiceList] = useRecoilState(invoiceListState);
    const [statut, setStatut] = useRecoilState(invoiceStatut)
    const [items, setItems] = useState([])
    const [itemTrashHovered, setItemTrashHovered] = useState(false)
    //const [itemListArray, setItemListArray] = useRecoilState(itemListInDetailsPage)
    //Invoice date input params and stuff

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const [selectedValue, setSelectedValue] = useState(null);
  
    const choices = ["Net 1 day", "Net 7 day", "Net 14 day", "Net 30 day"];
  
    const handleChoiceClick = (choice) => {
      setSelectedValue(choice);
      setDropdownOpen(false); 
    };

    function generateCustomId() {
      const randomLetters = Array.from({ length: 2 }, () => {
        const randomCharCode = Math.floor(Math.random() * 26) + 65; // A-Z ASCII range
        return String.fromCharCode(randomCharCode);
      }).join('');
    
      const randomNum = Math.floor(Math.random() * 9000) + 1000;
    
      return `${randomLetters}${randomNum}`;
    }

    const invoiceId = generateCustomId()

    function getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  }

    const handlePost = async (data) => {
      const dynamicKeys = items.map((item, index) => ({
      [`invoiceItemNameInList${index}`]: data['itemNameInList' + index],
      [`invoiceItemQuantity${index}`]: data['itemQuantity' + index],
      [`invoiceItemPrice${index}`]: data['itemPrice' + index],
    }));

    const requestBody = Object.assign(
      {
        id: invoiceId,
        invoiceAdress: data.address,
        invoiceCity: data.city,
        invoiceClientCity: data.clientCity,
        invoiceClientCountry: data.clientCountry,
        invoiceClientEmail: data.clientEmail,
        invoiceClientPostCode: data.clientPostCode,
        invoiceClientStreetAddress: data.clientStreetAddress,
        invoiceCountry: data.country,
        invoicePostCode: data.postCode,
        invoiceProjectDescription: data.projectDescription,
        invoiceClientName: data.clientName,
        invoiceInvoiceDate: data.invoiceDate,
        invoicePaymentTerms: selectedValue,
        invoiceStatut: `Pending`,
      },
      ...dynamicKeys 
    );
        try {
          
          const response = await fetch('http://localhost:3000/api/invoice', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });
        } catch (error) {
          console.error('Error posting:', error);
        }
      }; 
      
      function onSubmit (data) {
        handlePost(data)
        const dynamicKeys = items.map((item, index) => ({
          [`itemNameInList${index}`]: data['itemNameInList' + index],
          [`itemQuantity${index}`]: data['itemQuantity' + index],
          [`price${index}`]: data['itemPrice' + index],
        }));
        {/* STOCKER DYNAMICKEYS DANS UN ARRAY POUR LE MAP PAR INVOICEDATA DANS PAGE POUR AVOIR LE BON
        NOMBRE DE MAPPING POUR CHAQUE !
      */}
        const newInvoiceList = Object.assign(
          {
            id: invoiceId,
            clientName: data.clientName,
            invoiceDate: data.invoiceDate,
            address: data.address,
            city: data.city,
            clientCity: data.clientCity,
            clientCountry: data.clientCountry,
            clientEmail: data.clientEmail,
            clientPostCode: data.clientPostCode,
            clientStreetAddress: data.clientStreetAddress,
            country: data.country,
            postCode: data.postCode,
            projectDescription: data.projectDescription,
            paymentTerms: selectedValue,
            statut: `${statut}`,
            itemListArray: dynamicKeys
          },     
        ) 
          
        
        setInvoiceList([...invoiceList, newInvoiceList])
        setNewInvoiceFormDisplay(false)
        setStatut("Pending")
      }

      function AddNewItemButton() {
        return (
          <div onClick={() => {
            const newItem = {
              itemName: '',
              itemQuantity: 0,
              itemPrice: 0,
            };
            setItems([...items, items + 1])
            //setItemListArray([...itemListArray, newItem])
          }} className={`${styles.addNewItemButton}`}>
              <p>+ Add new item</p>
          </div>
        )
      }

      function ItemList () {
        function deleteItem (index) {
          const updatedItemsList = items.filter((_, i) => i !== index);
          {/* DELETE DANS L'API */}
          setItems(updatedItemsList)         
        }
        return (
        <div className={`${styles.itemList}`} >
                <h1 className={`${styles.itemListTitle}`}>Item List</h1>
                {items.map((i, index) => (
              <div key={index} className={`${styles.item}`}>

                <div className={`${styles.inputsItemList}`}>
                  <div className={`${styles.itemNameInListInput}`}>
                    <label htmlFor="itemNameInList">Item Name</label>
                    {/* METTRE TOUS LES REGISTER ET NOM ETC AVEC LE I POUR CHOPPER TOUTES DATAS DYNAMIQUE */}
                    {/* FAIRE LE SYSTEME DE SUPP EN METTANT CONDIANT I + INDEX OU INDEX - 1 POUR SUPP CELUI CLIQUER */}
                    <input type="text" name='itemNameInList' {...register(`itemNameInList${index}`)}/>
                  </div>
                <div className={`${styles.itemQuantityInput}`}>
                    <label htmlFor="itemQuantity">Qty.</label>
                    <input type="number" name='itemQuantity' {...register(`itemQuantity${index}`)}/>
                </div>      
                  <div className={`${styles.itemPriceInput}`}>
                    <label htmlFor="itemPrice">Price</label>
                    <input type="text" name='itemPrice' {...register(`itemPrice${index}`)}/>
                  </div>    
      
                  <div className={`${styles.total}`}>
                    <div className={`${styles.totalPrice}`}>
                      
                    </div>
                    <svg onClick={() => {deleteItem(index)}} className={`${styles.trash}`} xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
                      <path onClick={() => {deleteItem(index)}} fill-rule="evenodd" clip-rule="evenodd" d="M8.47225 0L9.36117 0.888875H12.4722V2.66667H0.027832V0.888875H3.13892L4.02783 0H8.47225ZM2.6945 16C1.71225 16 0.916707 15.2045 0.916707 14.2222V3.55554H11.5834V14.2222C11.5834 15.2045 10.7878 16 9.80562 16H2.6945Z" fill={itemTrashHovered ? "#EC5757" : "#888EB0"}/>
                    </svg>
                    

                  </div>
                </div>
              
              </div>
                ))}
                {/*<div className={`${styles.inputsItemList}`}>
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
                </div>*/}
                <AddNewItemButton />
          </div>
        )
      }
      const MyContainer = ({ className, children }) => {
        return (
          <div style={{ padding: "16px", background: "#216ba5", color: "#fff" }}>
            <CalendarContainer className={className}>
              <div style={{ background: "#f0f0f0" }}>
                Pick a date:
              </div>
              <div style={{ position: "relative" }}>{children}</div>
            </CalendarContainer>
          </div>
        );
      };

    return (

    <div className={`${styles.scrollableContainer}`}>
      <div className={`${styles.newInvoiceFormContainer} ${styles.slideIn}`}>
        <SideBar position="relative" customClassName={`${styles.customSideBar}`}/>
        <form onClick={() => {
          //paymentTermsUnRoll === "flex" && setPaymentTermsUnRoll("none")
          isDropdownOpen && setDropdownOpen(false)
          }} onSubmit={handleSubmit(onSubmit)} className={`${styles.invoiceForm}`}>
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
                <input type="text" placeholder='e.g. email@example.com' name='clientEmail' {...register("clientEmail")} />
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
                  {/* TROUVER LIBRAIRIE POUR LA CALENDAR PICKER */}
                  <input type="date" defaultValue={getCurrentDate()} name="invoiceDate" {...register("invoiceDate")} />
                </div>

                <div className={`${styles.paymentTerms}`}>
                  <label htmlFor="paymentTerms">Payment Terms</label>
                  <div className={`${styles.paymentTermsInputContainer}`}>
                    <input onClick={() => {
                      //setPaymentTermsUnRoll('flex')
                      setDropdownOpen(!isDropdownOpen)
                    }} value={selectedValue} placeholder='Net 30 days' readOnly className={`${styles.paymentTermsInput}`} type="text" name='paymentTerms' {...register("paymentTerms")}                  
                    />

                    {isDropdownOpen === false ? <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                      <path d="M1 1L5.2279 5.2279L9.4558 1" stroke="#7C5DFA" stroke-width="2"/>
                    </svg>: <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                      <path d="M1 6.22803L5.2279 2.00013L9.4558 6.22803" stroke="#7C5DFA" stroke-width="2"/>
                    </svg>}                          
                  </div>
                  
                  {isDropdownOpen && (
                  <div className={`${styles.options}`}>
                      {choices.map((choice, index) => (
                        <div className={`${styles.option}`} key={index} onClick={() => {
                          handleChoiceClick(choice)
                        }}>{choice}</div>
                      ))}
                    </div>
                    )}
                    
                  {/*<div class={`${styles.options} ${paymentTermsUnRoll}`}>
                    <div onClick={() => {
                      setPaymentTermsUnRoll('none')
                      setPlaceHolder("Net 1 day")
                    }} class={`${styles.option}`} >Net 1 day</div>
                    <div onClick={() => {
                      setPlaceHolder("Net 7 day")
                      setPaymentTermsUnRoll('none')
                    }} class={`${styles.option}`} >Net 7 day</div>
                    <div onClick={() => {
                      setPaymentTermsUnRoll('none')
                      setPlaceHolder("Net 14 day")
                    }} class={`${styles.option}`} >Net 14 day</div>
                    <div onClick={() => {
                      setPaymentTermsUnRoll('none')
                      setPlaceHolder("Net 30 day")
                    }} class={`${styles.option}`} >Net 30 day</div>
                  </div>*/}
                </div>

              </div>
              <div className={`${styles.invoiceFormBottomTopBottom}`}>
                <label htmlFor="projectDescription">Project Description</label>
                <input type="text" placeholder='e.g. Graphic Design Service' name='projectDescription' {...register("projectDescription")}/>
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