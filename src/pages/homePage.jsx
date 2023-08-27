import React from 'react'
import SideBar from "@/components/sideBar/sideBar";
import HomeContent from '@/components/homeContent/homeContent';
import { showInvoiceFormState } from '@/app/showInvoiceFormState';
import InvoiceForm from '@/components/invoiceForm/invoiceForm';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { deleteInvoice } from '@/app/deleteInvoice';

function HomePage() {
    const showInvoiceForm = useRecoilValue(showInvoiceFormState)
return (
        <div className="homePage">
            {showInvoiceForm ? "":<SideBar />}
            {showInvoiceForm && <InvoiceForm/>}  
            <HomeContent />
        </div>  
    )
}

export default HomePage