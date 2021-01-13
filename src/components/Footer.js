import React from 'react';
import './Footer.css'
import { Link } from 'react-router-dom';
import * as Scroll from 'react-scroll';



function Footer() {

  var scroll = Scroll.animateScroll;

  const scrollToTop = () => {
    
    scroll.scrollToTop();
  }
  
  return (
    <div className='footer-container'>
      {/* <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Blah blah 
        </p>
        <p className='footer-subscription-text'>
          Blah blah 
        </p>
        
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About</h2>
          </div>
        </div>
      </div> */}
      <section className='social-media'>
        <div className='social-media-wrap'>
          <Link to='/' className='social-logo' onClick={scrollToTop}>
            <h5>STOLLERSYSTEM</h5><i className="fas fa-globe fa-1x"></i>
          </Link>
          <small className='website-rights'>ⓒ 2021</small>
          <div className='social-icons'>
            <a className='social-icon-link' target='_blank'  rel="noreferrer"  href='https://github.com/StollerSystem'><i className="fab fa-github-square fa-3x"></i></a>
            <a className='social-icon-link' target='_blank'  rel="noreferrer"  href='https://www.linkedin.com/in/ben-stoller/'><i className="fab fa-linkedin fa-3x"></i></a>
            
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer;