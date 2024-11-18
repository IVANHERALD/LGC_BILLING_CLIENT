import React from 'react'
import '../Footer/Footer.css'

function Footer() {
    return (
        <div>
            <span>
            <footer className="invoice-footer">
                <div className="footer-section information">
                    <p>Terms and Conditions:</p>
                    <p className='information-text'>
                        Goods once sold not to be taken back.Our responsibility ceases after the goods have delivered.Subject to Coimbatore Jurisdiction.No Claim for breakage and shortage during transit.
                        Interest @24% will be charged if the bills are not settled before 30 days.
                    </p>
                </div>
                <div className="vertical_line"></div>
                <div className="footer-section seal">
                    <p className='seal-text'>(Common Seal)</p>
                </div>
                <div className="vertical_line"></div>
                <div className='footer-section signature'>
                    <p>Certified that the particulars given above are true and correct.</p>
                    <p>For <b>LAKSHMI GRADE CASTINGS</b></p>
                    <p className='seal-text'> Authorized Signatory</p>
                </div>

            </footer>

        </span>
        </div>
    )
}

export default Footer