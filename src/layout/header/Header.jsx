import React, { useEffect } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import 'aos/dist/aos.css'
import AOS from 'aos'
import { Link } from 'react-scroll'
import hamburger from '../../assets/images/hamburger.png'


function Header() {
    useEffect(() => {
        AOS.init({duration: 2000})
    }, [])
  return (
    <section className="header" id='home'>
        <div className="container">
            <div className="header-content">
                <div className="header-text" data-aos="fade-right">
                    <h1 className='header-title'>
                    <span>
                        <Typewriter
                            words={['Mazali', 'Ishonchli', 'Tez', 'Sifatli']}
                            loop={Infinity}
                            cursor
                            cursorStyle='_'
                            cursorColor='yellow'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={2000}
                        />
                    </span>
                    </h1>
                    <p className="header-subtitle">Sevimli burger ta'mini tanlang!</p>
                    <Link className='header-link' to="burger" smooth={true} offset={0} duration={600}>Bizning menu</Link>
                </div>

                <div className="images">
                    <img src={hamburger} data-aos="flip-up" className='header-img' alt="" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Header