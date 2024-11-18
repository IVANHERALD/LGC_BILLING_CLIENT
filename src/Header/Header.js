import React from 'react'
import lgc from '../assest/lgclogo.svg';
import { ReactComponent as Logo } from '../assest/lgclogo.svg'; // Adjust path if necessary
import '../Header/Header.css'

function Header() {
    return (
        <div>
            <header className="invoice-header">
            <div className='header-content'>
                <div className='logo_container'>
                <Logo className="logo" />
                </div>
                <div className='header-left'>
                    

                    <h4 className='tax_invoice'><u>TAX INVOICE</u></h4>
                    <h2 className='Lakshmi'>LAKSHMI GRADE CASTINGS</h2>
                    <p className='mrfs'>MFRS. QUALITY C.I. ROUGH CASTINGS</p>
                    <p className='address'>420/2, V.K. Road, Thanneer Panthal, Peelamedu, Coimbatore - 641 004</p></div>
                    <div className='header_right'>
                    <p>GSTIN:33AVBPS2620N1ZJ</p>
                    <p>PAN: AVBPS2620N</p>
                    <p>Mobile: 93626 96934, 93625 12210</p>
                    </div>
                </div>
            
        </header></div>
    )
}

export default Header