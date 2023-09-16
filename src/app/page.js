"use client"
//import HomePage from "@/pages/homePage";
import SideBar from "@/components/sideBar/sideBar";
import HomeContent from '@/components/homeContent/homeContent';
import { showInvoiceFormState } from '@/app/showInvoiceFormState';
import InvoiceForm from '@/components/invoiceForm/invoiceForm';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { deleteInvoice } from '@/app/deleteInvoice';

export default function Home() {
  const showInvoiceForm = useRecoilValue(showInvoiceFormState)

  return (
      //<HomePage />  
              <div className="homePage">
                  {showInvoiceForm ? "":<SideBar />}
                  {showInvoiceForm && <InvoiceForm/>}  
                      <HomeContent />
              </div> 
  )
}
