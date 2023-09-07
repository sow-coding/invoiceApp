"use client"
import React, { useEffect, useState } from 'react'
import styles from "../../../components/listOfInvoces/listOfInvoices.module.css"
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import Paid from '@/components/states/paid/paid'
import Draft from '@/components/states/draft/draft'
import Pending from '@/components/states/pending/pending'
import { RecoilRoot, useRecoilValue, useRecoilState } from 'recoil'
import { invoiceStatut } from '@/app/invoiceStatut'
import { itemListInDetailsPage } from '@/app/itemListInDetailsPage'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SaveAsDraftButton from '../../../components/saveAsDraftBtn/saveAsDraftButton';
import SideBar from '../../../components/sideBar/sideBar';
import { showInvoiceFormState } from '@/app/showInvoiceFormState'
import { invoiceListState } from '@/app/invoiceListState';
import { invoiceState } from '@/app/invoiceState';
import DatePicker, {CalendarContainer} from "react-datepicker";

const formSchema = yup.object().shape({
  address: yup.string(),

})

function InvoiceDetails() {
  /* UTILISER LES ROUTES POUR POUVOIR PASSER EN PROPS */
  const [paid, setPaid] = useState("")
  //const [itemListData, setItemListData] = useState(null)
  const [changeStatut, setChangeStatut] = useState(true)
  const [editClicked, setEditClicked] = useState(0)
  const router = useRouter()
  const searchParams = useSearchParams()
  const data = searchParams.get("data")
  const invoiceData = JSON.parse(data)
  const itemListArray = invoiceData.itemListArray
  console.log(itemListArray)
  const [formData, setFormData] = useState(invoiceData)
  const invoicesArray = useRecoilValue(invoiceListState)
  const [items, setItems] = useState([])
  const [selectedValue, setSelectedValue] = useState(null);

  const [invoiceList, setInvoiceList] = useRecoilState(invoiceListState);
  function changeURLWithoutReloading() {
    const newURL = `/invoice/${invoiceData.id}`;
    window.history.pushState({}, '', newURL);
  }

  useEffect(() => {
    changeURLWithoutReloading();
  });

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [editForm, setEditForm] = useState(false)

    function deleteObjectById(e) {
      const updatedInvoiceArray = invoicesArray.filter((obj) => `http://localhost:3000/invoice/${obj.id}` !== e.target.baseURI);
      {/* DELETE DANS L'API */}
      setInvoiceList(updatedInvoiceArray)
    }

    function DeleteButton () {
      const router = useRouter()
      return (
        <div onClick={(e) => {
          router.push("/")
          deleteObjectById(e)
        }} className={`${styles.deleteButton}`}>
          <p>Delete</p>
        </div>
      )
    }

    function MarkAsPaidButton() {
      return (
        <div onClick={() => {
          const dynamicKeys = items.map((item, index) => ({
            [`itemNameInList${index}`]: invoiceData['itemNameInList' + index],
            [`itemQuantity${index}`]: invoiceData['itemQuantity' + index],
            [`price${index}`]: invoiceData['itemPrice' + index],
          }));

          const newInvoiceList = Object.assign(
            {
              id: invoiceData.id,
              clientName: invoiceData.clientName,
              invoiceDate: invoiceData.invoiceDate,
              address: invoiceData.address,
              city: invoiceData.city,
              clientCity: invoiceData.clientCity,
              clientCountry: invoiceData.clientCountry,
              clientEmail: invoiceData.clientEmail,
              clientPostCode: invoiceData.clientPostCode,
              clientStreetAddress: invoiceData.clientStreetAddress,
              country: invoiceData.country,
              postCode: invoiceData.postCode,
              projectDescription: invoiceData.projectDescription,
              paymentTerms: selectedValue,
              statut: `Paid`,
              itemListArray: dynamicKeys
            })

          setInvoiceList([...invoiceList, newInvoiceList])
          setPaid("Paid")
        }
          } className={`${styles.MarkAsPaidButton}`}>
            <p>Mark as Paid</p>
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

    function editBtnClicked () {
      setEditForm(true)
      setEditClicked(editClicked + 1)
    }

    function EditBtn() {
      return (
        <div onClick={() => {editBtnClicked()}} className={`${styles.editButton}`}>
            <p>Edit</p>
        </div>
      )
    }

    function DiscardBtn() {
      return (
        <button className={`${styles.discardBtn}`} onClick={() => {
          setEditForm(false)
        }}>
            Discard
        </button>
      )
    }

    function SaveAndSendButton() {
      return (
        <button className={`${styles.saveAndSendButton}`} type='submit'>Save and Send</button>
      )
    }

    const totalPrice = itemListArray.reduce((accumulator, item, index) => {
      const price = parseFloat(item[`price${index}`]); // Convert price to a number
      const quantity = parseFloat(item[`itemQuantity${index}`]); // Convert quantity to a number
      return accumulator + price * quantity; // Add the product of price and quantity to the accumulator
    }, 0); // Initialize accumulator to 0
  
    const EditInvoiceForm = () => {

      const [ newInvoiceFormDisplay, setNewInvoiceFormDisplay ] = useRecoilState(showInvoiceFormState)
    
        const { register, handleSubmit, formState: { errors } } = useForm({
          resolver: yupResolver(formSchema),
        });
        //const [paymentTermsUnRoll, setPaymentTermsUnRoll] = useState("none")
        const [startDate, setStartDate] = useState(new Date())
        const [statut, setStatut] = useRecoilState(invoiceStatut)
        //const [itemListArray, setItemListArray] = useRecoilState(itemListInDetailsPage)
        //Invoice date input params and stuff
    
        const [isDropdownOpen, setDropdownOpen] = useState(false);
          
        const choices = ["Net 1 day", "Net 7 day", "Net 14 day", "Net 30 day"];
      
        const handleChoiceClick = (choice) => {
          setSelectedValue(choice);
          setDropdownOpen(false); 
        };
    
        const handlePost = async (data) => {
          const dynamicKeys = items.map((item, index) => ({
          [`invoiceItemNameInList${index}`]: data['itemNameInList' + index],
          [`invoiceItemQuantity${index}`]: data['itemQuantity' + index],
          [`invoiceItemPrice${index}`]: data['itemPrice' + index],
        }));
    
        const requestBody = Object.assign(
          {
            id: invoiceData.id,
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
              {/* MODIFIER PATCH ET NON POST */}
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

            const newInvoiceList = Object.assign(
              {
                id: invoiceData.id,
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
            {/* FONCTION DE DELETE CELLE CI */}
            setEditForm(false)
            setStatut("Pending")
            setFormData(data)
            setInvoiceList([...invoiceList, newInvoiceList])
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
            return (
            <div className={`${styles.itemList}`} >
                    <h1 className={`${styles.itemListTitle}`}>Item List</h1>
                    {items.map((i, index) => (
                  <div key={i} className={`${styles.item}`}>
    
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
                          <h5>Total</h5>
                          {/* METTRE UN STATE POUR RETENIR CE QUI EST ECRIT DANS ITEM QTY ET ITEM PRICE */}
                          <p>??</p>
                        </div>
                        <svg className={`${styles.trash}`} xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.47225 0L9.36117 0.888875H12.4722V2.66667H0.027832V0.888875H3.13892L4.02783 0H8.47225ZM2.6945 16C1.71225 16 0.916707 15.2045 0.916707 14.2222V3.55554H11.5834V14.2222C11.5834 15.2045 10.7878 16 9.80562 16H2.6945Z" fill="#888EB0"/>
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
          <div className={`${styles.newInvoiceFormContainer}`}>
            <SideBar position="relative" customClassName={`${styles.customSideBar}`}/>
            <form onClick={() => {
              //paymentTermsUnRoll === "flex" && setPaymentTermsUnRoll("none")
              isDropdownOpen && setDropdownOpen(false)
              }} onSubmit={handleSubmit(onSubmit)} className={`${styles.invoiceForm}`}>
              <h1 className={`${styles.formTitle}`}>Edit <span>#</span>{invoiceData.id}</h1>
              <div className={`${styles.invoiceFormTop}`}>
              <h5 className={`${styles.billFromTitle}`}>Bill from</h5>
              <div className={`${styles.billFromTop}`}>
                <label htmlFor="address">Street Address</label>
                <input defaultValue={invoiceData.address} type="text" name='address' {...register("address")}/>
                {errors.address && <p>{errors.address.message}</p>}
              </div>
                <div className={`${styles.billFromBottom}`}>
                  <div className={`${styles.city}`}>
                    <label htmlFor="city">City</label>
                    <input defaultValue={invoiceData.city} type="text" name='city' {...register("city")}/>
                  </div>
                  <div className={`${styles.postCode}`}>
                    <label htmlFor="postCode">Postcode</label>
                    <input defaultValue={invoiceData.postCode} type="text" name='postCode' {...register("postCode")}/>
                  </div>
                  <div className={`${styles.country}`}>
                    <label htmlFor="country">Country</label>
                    <input defaultValue={invoiceData.country} type="text" name='country' {...register("country")}/>
                  </div>
                </div>
              </div>
              <div className={`${styles.invoiceFormCenter}`}>
                <div className={`${styles.billToTop}`}>
                  <h5 className={`${styles.billToTitle}`}>Bill to</h5>
                  <div className={`${styles.clientName}`}>
                    <label htmlFor="clientName">Client´s Name</label>
                    <input defaultValue={invoiceData.clientName} type="text" name='clientName' {...register("clientName")} />
                  </div>
                  <div className={`${styles.clientEmail}`}>
                    <label htmlFor="clientEmail">Client´s Email</label>
                    <input defaultValue={invoiceData.clientEmail} type="text" placeholder='e.g. email@example.com' name='clientEmail' {...register("clientEmail")} />
                  </div>
                  <div className={`${styles.clientStreetAddress}`}>
                    <label htmlFor="clientStreetAddress">Street Address</label>
                    <input defaultValue={invoiceData.clientStreetAddress} type="text" name='clientStreetAddress' {...register("clientStreetAddress")} />
                  </div>
                </div>
                <div className={`${styles.billToCenter}`}>
                  <div className={`${styles.clientCity}`}>
                    <label htmlFor="clientCity">City</label>
                    <input defaultValue={invoiceData.clientCity} type="text" name='clientCity' {...register("clientCity")}/>
                  </div>
                  <div className={`${styles.clientPostCode}`}>
                    <label htmlFor="clientPostCode">Post Code</label>
                    <input defaultValue={invoiceData.clientPostCode} type="text" name='clientPostCode' {...register("clientPostCode")}/>
                  </div>
                  <div className={`${styles.clientCountry}`}>
                  <label htmlFor="clientCountry">Country</label>
                    <input defaultValue={invoiceData.clientCountry} type="text" name='clientCountry' {...register("clientCountry")}/>
                  </div>
                </div>
              </div>
              <div className={`${styles.invoiceFormBottom}`}>
                
                <div className={`${styles.invoiceFormBottomTop}`}>
                  <div className={`${styles.invoiceFormBottomTopTop}`}>
                    <div className={`${styles.invoiceDate}`}>
                      <label htmlFor="invoiceDate">Invoice Date</label>
                      {/* TROUVER LIBRAIRIE POUR LA CALENDAR PICKER */}
                      <input type="date" defaultValue={invoiceData.invoiceDate} name="invoiceDate" {...register("invoiceDate")} />
                    </div>
    
                    <div className={`${styles.paymentTerms}`}>
                      <label htmlFor="paymentTerms">Payment Terms</label>
                      <div className={`${styles.paymentTermsInputContainer}`}>
                        <input onClick={() => {
                          //setPaymentTermsUnRoll('flex')
                          setDropdownOpen(!isDropdownOpen)
                        }} defaultValue={invoiceData.paymentTerms} value={selectedValue} placeholder='Net 30 days' readOnly className={`${styles.paymentTermsInput}`} type="text" name='paymentTerms' {...register("paymentTerms")}                  
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
                    <input defaultValue={invoiceData.projectDescription} type="text" placeholder='e.g. Graphic Design Service' name='projectDescription' {...register("projectDescription")}/>
                  </div> 
                </div>
              </div>
              {/*CREER ITEMLIST ICI MEME*/}
              <ItemList />
              <div className={`${styles.formButtons}`}>
                <div className={`${styles.formButtonsLeft}`}>
                </div>
                <div className={`${styles.formButtonsRight}`}>
                  <DiscardBtn />
                  <SaveAndSendButton />
                </div>
              </div>
              
          </form>
          </div>
          <div className={`${styles.newInvoiceFormQuit}`} onClick={() => {
            setEditForm(false)
          }}>
    
          </div>
        </div>
    
        )
    }

    return (
    <div className={`${styles.invoiceDetails}`}>
      <div className={`${styles.invoiceDetailsTop}`}>
        <div onClick={() => {
          setChangeStatut(false)
          setPaid('')
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
          {/* REGLER PROBLEME DE STATE ICI */}
          {changeStatut && paid === "Paid" && (invoiceData.statut = "")}
          {changeStatut && invoiceData.statut === "" && <Paid />}
          {invoiceData.statut === "Pending" && <Pending />}
          {invoiceData.statut === "Draft" && <Draft />}
        </div>
        <div className={`${styles.invoiceDetailsCenterRight}`}>
          <EditBtn />

          <div onClick={(e) => {
            console.log(e)
            setShowDeleteConfirmation(true)
          }} className={`${styles.deleteButton}`}>
              <p>Delete</p>
          </div>
          {/* RENDRE CE BTN UNCLICKBLE QUAND C'EST EN MODE DRAFT */}
          <MarkAsPaidButton />
        </div>
      </div>
      <div className={`${styles.invoiceDetailsBottom}`}>
        
        <div className={`${styles.invoiceDetailsBottomTop}`}>
          <div className={`${styles.invoiceDetailsBottomTopLeft}`}>
            <h4><span>#</span>{formData.id}</h4>
            <p>{formData.projectDescription}</p>
          </div>
          <div className={`${styles.invoiceDetailsBottomTopRight}`}>
          <p>{formData.address}</p>
          <p>{formData.city}</p>
          <p>{formData.postCode}</p>
          <p>{formData.country}</p>
        </div>
        </div>

        <div className={`${styles.invoiceDetailsBottomCenter}`}>
          
          <div className={`${styles.invoiceDetailsBottomCenterLeft}`}>
            <div className={`${styles.invoiceDetailsBottomCenterLeftTop}`}>
              <p>Invoice Date</p>
              <h3>{formData.invoiceDate}</h3>
            </div>
            <div className={`${styles.invoiceDetailsBottomCenterLeftBottom}`}>
              <p>Payment Due</p>
              <h3>{formData.paymentTerms}</h3>
            </div>
          </div>

          <div className={`${styles.invoiceDetailsBottomCenterCenter}`}>
            <p>Bill to</p>
            <div className="clientInfos">
              <h3>{formData.clientName}</h3>
              <p>{formData.clientStreetAddress}</p>
              <p>{formData.clientCity}</p>
              <p>{formData.clientPostCode}</p>
              <p>{formData.clientCountry}</p>
            </div>
          </div>

          <div className={`${styles.invoiceDetailsBottomCenterRight}`}>
            <p>Sent to</p>
            {/* SET ICI AVEC LA NOUVELLE VALEUR ASSIGN DANS LE EDIT FORM */}
            <h2>{formData.clientEmail}</h2>
          </div>
        
        </div>
            <div className={`${styles.invoiceDetailsBottomBottom}`}>
              <div className={`${styles.invoicesDetailsBottomBottomItems}`}>
              {itemListArray.map((i, index) => (
              <div key={i} className={`${styles.invoiceDetailsBottomBottomTop}`}>
                <div className={`${styles.invoiceDetailsBottomBottomTopLeft}`}>
                  <p>Item Name</p>
                  <h4>{i[`itemNameInList${index}`]}</h4>
                </div>
                <div className={`${styles.invoiceDetailsBottomBottomTopRight}`}>
                  <div className={`${styles.quantity}`}>
                    <p>QTY.</p>
                    <h4>{i[`itemQuantity${index}`]}</h4>
                  </div>
                  <div className={`${styles.price}`}>
                    <p>Price</p>
                    <h4>{i[`price${index}`]}</h4>
                  </div>
                  <div className={`${styles.total}`}>
                  <p>Total</p>
                  <h4>{i[`itemQuantity${index}`] * i[`price${index}`]}</h4>
                  </div>
                </div>
              </div>
              ))}
              </div>

              <div className={`${styles.invoiceDetailsBottomBottomBottom}`}>
                <p>Amont Due</p>
                <h1>{totalPrice.toFixed(2)} €</h1>
              </div>
            </div>           
          


      </div>
      {showDeleteConfirmation && <DeleteConfirmation />}
      {editForm && <EditInvoiceForm />}
    </div>
    
  )
}

export default InvoiceDetails