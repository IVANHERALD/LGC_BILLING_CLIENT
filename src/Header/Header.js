import React from 'react'
import logo from '../assest/Logo_final_no_bg.png'
import '../Header/Header.css'

function Header() {
    return (
        <div>
            <header className="invoice-header">
                <div className='header-content'>
                    <div className='logo_container'>
                        <img src={logo} alt="logo" className='logo'></img>
                    </div>
                    <div className='header-left'>
                        <center> <h4 className='tax_invoice'><u>TAX INVOICE</u></h4>
                            <p className='Lakshmi'>LAKSHMI GRADE CASTINGS</p>
                            <p className='mrfs'>MFRS. QUALITY C.I. ROUGH CASTINGS</p></center>
                        <p className='address'>420/2,V.K.Road,Thanneer Panthal,Peelamedu, Coimbatore - 641 004</p></div>
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