import React from 'react'
import { Link } from 'react-router-dom'
import Instagram from '../../assets/icons/InstagramIcon'
import Phone from '../../assets/icons/PhoneIcon'

function Footer() {
  return (
    <section className='footer'>
        <div className="container">
            <div className="footer-content">
                <h1 className='footer-title'>Gold Burger</h1>

                <ul className='footer-links'>
                  <a href="/" className='footer-link'>Asosiy</a>
                  <Link to="/about" className='footer-link'>Biz haqimizda</Link>
                  <Link to="/news" className='footer-link'>Yangiliklar</Link>
                  <Link to="/vakansiya" className='footer-link'>Vakansiyalar</Link>
                </ul>

                <div className="footer-social">
                  <a href="https://insta.openinapp.link/wh3my">
                    <Instagram/>
                  </a>
                  <a href="tel: +998915725757">
                    <Phone/>
                  </a>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Footer